#!/usr/bin/env node
// Replays the capture manifests (captures/**/*.yaml) against a Thelia instance
// and writes src/assets/captures/<locale>/<page>/<shot>.png, French and English.
//
//   ACADEMY_BASE_URL=https://my-thelia.ddev.site \
//   ACADEMY_ADMIN_LOGIN=… ACADEMY_ADMIN_PASSWORD=… \
//   npm run capture -- [captures/catalog/create-product.yaml …] [--locale fr]
//
// Needs a Thelia install with demo data (--with-demo). Chrome or Chromium must be installed;
// CHROME_PATH points to it when it is not /usr/bin/google-chrome.
//
// A manifest may list in `prepare` the states the demo data lacks (a product without combination,
// a disabled module…). Each one is described once in captures/_prepare/<state>.yaml, created through
// the back office before the shots, and skipped when it already exists: replaying is safe.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { chromium } from 'playwright-core';
import YAML from 'yaml';
import { CAPTURES_OUT, CAPTURES_SRC, LOCALES, parseArgs } from './lib.mjs';

const { options, positional } = parseArgs(process.argv.slice(2));
const baseUrl = (process.env.ACADEMY_BASE_URL ?? '').replace(/\/$/, '');
if (!baseUrl) {
	console.error('ACADEMY_BASE_URL is required (the Thelia instance to capture).');
	process.exit(1);
}
const locales = options.locale ? String(options.locale).split(',') : LOCALES;

function manifests(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (name.startsWith('_')) return [];
		if (statSync(path).isDirectory()) return manifests(path);
		return name.endsWith('.yaml') ? [path] : [];
	});
}

const files = positional.length > 0 ? positional : manifests(CAPTURES_SRC);
// Back-office pages take the interface language from ?lang=, even before login.
function urlFor(url, locale) {
	const path = typeof url === 'object' ? url[locale] : url;
	if (!path.startsWith('/admin') || /[?&]lang=/.test(path)) return baseUrl + path;
	return `${baseUrl}${path}${path.includes('?') ? '&' : '?'}lang=${locale}`;
}

async function adminLogin(page) {
	const login = process.env.ACADEMY_ADMIN_LOGIN;
	const password = process.env.ACADEMY_ADMIN_PASSWORD;
	if (!login || !password) throw new Error('ACADEMY_ADMIN_LOGIN and ACADEMY_ADMIN_PASSWORD are required for admin screens.');
	await page.goto(`${baseUrl}/admin/login`);
	await page.getByTestId('login-username').fill(login);
	await page.getByTestId('login-password').fill(password);
	await Promise.all([page.waitForURL((url) => !url.pathname.endsWith('/login')), page.getByTestId('login-submit').click()]);
}

async function runAction(page, action) {
	if (action.goto) await page.goto(baseUrl + action.goto);
	if (action.click) await page.locator(action.click).first().click();
	if (action.hover) await page.locator(action.hover).first().hover();
	if (action.fill) await page.locator(action.fill.selector).first().fill(String(action.fill.value));
	if (action.select) await page.locator(action.select.selector).first().selectOption(String(action.select.value));
	if (action.check) await page.locator(action.check).first().check();
	if (action.uncheck) await page.locator(action.uncheck).first().uncheck();
	if (action.waitFor) await page.locator(action.waitFor).first().waitFor();
	if (action.waitForUrl) await page.waitForURL(new RegExp(action.waitForUrl));
}

// "{{name}}" in a manifest is replaced by the value a prepared state saved under that name.
function withVars(value, vars) {
	if (typeof value === 'string') {
		return value.replace(/\{\{(\w+)\}\}/g, (_, name) => {
			if (!(name in vars)) throw new Error(`{{${name}}} is not saved by any prepared state of this run`);
			return vars[name];
		});
	}
	if (Array.isArray(value)) return value.map((item) => withVars(item, vars));
	if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withVars(item, vars)]));
	return value;
}

// The `done` selector on the `done` page says the state exists. Missing, the steps create it
// (they may save forms), then the check runs again. `vars` are read on the `done` page.
async function prepareState(page, name, state, vars) {
	const isDone = async () => {
		await page.goto(urlFor(state.done.url, 'fr'));
		if (state.done.waitFor) await page.locator(state.done.waitFor).first().waitFor();
		return (await page.locator(state.done.selector).count()) > 0;
	};
	if (await isDone()) {
		console.log(`kept  ${name}`);
	} else {
		for (const step of state.steps) {
			await page.goto(urlFor(step.url, 'fr'));
			for (const action of step.actions ?? []) await runAction(page, action);
		}
		if (!(await isDone())) throw new Error(`still missing after its steps`);
		console.log(`made  ${name}`);
	}
	for (const [key, source] of Object.entries(state.vars ?? {})) {
		const element = page.locator(source.selector).first();
		const text = source.attribute ? await element.getAttribute(source.attribute) : await element.textContent();
		const match = String(text ?? '').match(new RegExp(source.pattern ?? '^[\\s\\S]*$'));
		if (!match) throw new Error(`${key}: "${text}" does not match ${source.pattern}`);
		vars[key] = (match[1] ?? match[0]).trim();
	}
}

async function shoot(page, shot, locale, output) {
	await page.goto(urlFor(shot.url, locale));
	for (const action of shot.actions ?? []) await runAction(page, action);
	if (shot.waitFor) await page.locator(shot.waitFor).first().waitFor();
	await page.addStyleTag({
		content: [
			'*, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }',
			// Symfony debug toolbar of a dev install: never part of what a merchant sees.
			'.sf-toolbar, .sf-minitoolbar { display: none !important; }',
			// Version number of the capture instance: the pages state the version they apply to in their front matter.
			'[data-testid="bo-thelia-version"] { visibility: hidden !important; }',
			...(shot.hide ?? []).map((selector) => `${selector} { visibility: hidden !important; }`),
			...(shot.highlight ? [`${shot.highlight} { outline: 4px solid #f26041 !important; outline-offset: 4px !important; }`] : []),
		].join('\n'),
	});
	mkdirSync(dirname(output), { recursive: true });
	if (shot.clip) await page.locator(shot.clip).first().screenshot({ path: output });
	else await page.screenshot({ path: output, fullPage: Boolean(shot.fullPage) });
}

// One browser per locale: the native controls (file input button…) follow the browser language, not the page locale.
const browsers = new Map();
async function browserFor(locale) {
	if (!browsers.has(locale)) {
		const language = locale === 'fr' ? 'fr-FR' : 'en-US';
		browsers.set(locale, await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome', args: [`--lang=${language}`], env: { ...process.env, LANG: `${language.replace('-', '_')}.UTF-8`, LANGUAGE: language.replace('-', '_') } }));
	}
	return browsers.get(locale);
}
const PREPARE_DIR = join(CAPTURES_SRC, '_prepare');
const states = Object.fromEntries(
	(existsSync(PREPARE_DIR) ? readdirSync(PREPARE_DIR).filter((name) => name.endsWith('.yaml')).sort() : []).map((name) => [
		name.slice(0, -'.yaml'.length),
		YAML.parse(readFileSync(join(PREPARE_DIR, name), 'utf8')),
	]),
);
const parsed = files.map((file) => ({ file, manifest: YAML.parse(readFileSync(file, 'utf8')) }));
const needed = new Set(parsed.flatMap(({ manifest }) => manifest.prepare ?? []));
for (const name of needed) if (!states[name]) throw new Error(`prepare: "${name}" has no file captures/_prepare/${name}.yaml`);

let failures = 0;
try {
	const vars = {};
	if (needed.size > 0) {
		const context = await (await browserFor('fr')).newContext({ viewport: { width: 1440, height: 900 }, locale: 'fr-FR', ignoreHTTPSErrors: true });
		const page = await context.newPage();
		// A confirmation box ("Are you sure?") must be accepted, not dismissed, for the state to be saved.
		page.on('dialog', (dialog) => dialog.accept());
		await adminLogin(page);
		// In file name order, so a state can use what an earlier one saved.
		for (const name of Object.keys(states).filter((key) => needed.has(key))) {
			try {
				await prepareState(page, name, withVars(states[name], vars), vars);
			} catch (error) {
				failures += 1;
				console.log(`FAIL  prepare ${name}: ${error.message.split('\n')[0]}`);
			}
		}
		await context.close();
	}
	for (const { file, manifest: raw } of parsed) {
		let manifest;
		try {
			manifest = withVars(raw, vars);
		} catch (error) {
			failures += 1;
			console.log(`FAIL  ${relative(process.cwd(), file)}: ${error.message}`);
			continue;
		}
		for (const locale of locales) {
			const context = await (await browserFor(locale)).newContext({
				viewport: manifest.viewport ?? { width: 1440, height: 900 },
				locale: locale === 'fr' ? 'fr-FR' : 'en-US',
				ignoreHTTPSErrors: true,
			});
			const page = await context.newPage();
			let loggedIn = false;
			for (const shot of manifest.shots) {
				const output = join(CAPTURES_OUT, locale, manifest.page, `${shot.name}.png`);
				try {
					if ((shot.login ?? manifest.login) === 'admin' && !loggedIn) {
						await adminLogin(page);
						loggedIn = true;
					}
					await shoot(page, shot, locale, output);
					console.log(`ok    ${relative(process.cwd(), output)}`);
				} catch (error) {
					failures += 1;
					console.log(`FAIL  ${relative(process.cwd(), output)}: ${error.message.split('\n')[0]}`);
				}
			}
			await context.close();
		}
	}
} finally {
	for (const browser of browsers.values()) await browser.close();
}
process.exit(failures > 0 ? 1 : 0);
