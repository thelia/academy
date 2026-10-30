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
import { mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
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
	if (action.waitFor) await page.locator(action.waitFor).first().waitFor();
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
			...(shot.hide ?? []).map((selector) => `${selector} { visibility: hidden !important; }`),
			...(shot.highlight ? [`${shot.highlight} { outline: 4px solid #f26041 !important; outline-offset: 4px !important; }`] : []),
		].join('\n'),
	});
	mkdirSync(dirname(output), { recursive: true });
	if (shot.clip) await page.locator(shot.clip).first().screenshot({ path: output });
	else await page.screenshot({ path: output, fullPage: Boolean(shot.fullPage) });
}

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome' });
let failures = 0;
try {
	for (const file of files) {
		const manifest = YAML.parse(readFileSync(file, 'utf8'));
		for (const locale of locales) {
			const context = await browser.newContext({
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
	await browser.close();
}
process.exit(failures > 0 ? 1 : 0);
