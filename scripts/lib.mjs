// Helpers shared by the maintenance scripts: page discovery, front matter, fingerprints.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const DOCS = join(ROOT, 'src/content/docs');
export const CAPTURES_SRC = join(ROOT, 'captures');
export const CAPTURES_OUT = join(ROOT, 'src/assets/captures');
export const LOCALES = ['fr', 'en'];
export const DEFAULT_LOCALE = 'fr';

function walk(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		return statSync(path).isDirectory() ? walk(path) : [path];
	});
}

export function splitFrontMatter(text) {
	const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!match) return { data: {}, body: text, raw: '' };
	return { data: YAML.parse(match[1]) ?? {}, body: text.slice(match[0].length), raw: match[1] };
}

// One entry per page: locale, id shared by both languages ("catalog/create-product"), file path.
export function listPages() {
	return walk(DOCS)
		.filter((path) => /\.mdx?$/.test(path))
		.map((path) => {
			const rel = relative(DOCS, path).split(sep).join('/');
			const locale = rel.startsWith('en/') ? 'en' : DEFAULT_LOCALE;
			const id = (locale === 'en' ? rel.slice(3) : rel).replace(/\.mdx?$/, '');
			const text = readFileSync(path, 'utf8');
			return { path, rel, locale, id, text, ...splitFrontMatter(text) };
		});
}

// A tutorial lives in a section folder; the home page and the publisher page do not.
export const isTutorial = (page) => page.id.includes('/');

// Fingerprint of what a translation must follow: title, description and body of the French page.
export function fingerprint(page) {
	const hash = createHash('sha256');
	hash.update(String(page.data.title ?? ''));
	hash.update('\0');
	hash.update(String(page.data.description ?? ''));
	hash.update('\0');
	hash.update(page.body);
	return hash.digest('hex').slice(0, 12);
}

export function relativeFromPage(pagePath, target) {
	const from = pagePath.split(sep).slice(0, -1).join(sep);
	const rel = relative(from, target).split(sep).join('/');
	return rel.startsWith('.') ? rel : `./${rel}`;
}

export function parseArgs(argv) {
	const options = {};
	const positional = [];
	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (!arg.startsWith('--')) {
			positional.push(arg);
			continue;
		}
		const [key, inline] = arg.slice(2).split('=');
		if (inline !== undefined) options[key] = inline;
		else if (argv[index + 1] && !argv[index + 1].startsWith('--')) options[key] = argv[++index];
		else options[key] = true;
	}
	return { options, positional };
}
