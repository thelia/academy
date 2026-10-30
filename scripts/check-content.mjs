#!/usr/bin/env node
// Content gate, run in CI and before every commit.
//
//   npm run check                         errors block, warnings are listed
//   npm run check -- --release 3.4        also blocks on stale or missing translations
//                                         and lists pages not yet checked against 3.4
//   npm run check -- --stamp en/catalog/create-product
//                                         records that the English page matches the current French one
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fingerprint, isTutorial, listPages, parseArgs } from './lib.mjs';

const { options } = parseArgs(process.argv.slice(2));
const pages = listPages();
const errors = [];
const warnings = [];
const byId = (locale) => new Map(pages.filter((page) => page.locale === locale).map((page) => [page.id, page]));
const french = byId('fr');
const english = byId('en');

if (options.stamp) {
	const id = String(options.stamp).replace(/^en\//, '').replace(/\.mdx?$/, '');
	const target = english.get(id);
	const source = french.get(id);
	if (!target || !source) {
		console.error(`No French/English pair for "${id}".`);
		process.exit(1);
	}
	const stamped = `translatedFrom: ${fingerprint(source)}`;
	const text = /^translatedFrom:.*$/m.test(target.raw)
		? target.text.replace(/^translatedFrom:.*$/m, stamped)
		: target.text.replace(/^---\n/, `---\n${stamped}\n`);
	writeFileSync(target.path, text);
	console.log(`${target.rel}: ${stamped}`);
	process.exit(0);
}

// Wording the style guide rules out (docs/style-guide.md). Matched outside code blocks.
const banned = {
	fr: [
		/n['’]hésitez pas/i,
		/il est (important|essentiel) de (noter|souligner)/i,
		/il convient de/i,
		/\bplongeons\b/i,
		/découvrons ensemble/i,
		/en quelques clics/i,
		/\b(simplement|facilement)\b/i,
		/\b(puissant|robuste|incontournable|révolutionnaire)e?s?\b/i,
	],
	en: [
		/feel free/i,
		/\b(simply|easily|seamless(ly)?|robust|powerful|leverage|delve)\b/i,
		/it is (important|worth) (to note|noting)/i,
	],
};

function prose(body) {
	return body
		.replace(/```[\s\S]*?```/g, '')
		.replace(/^import .*$/gm, '')
		.replace(/`[^`]*`/g, '');
}

for (const page of pages) {
	const where = page.rel;
	const { data } = page;
	if (!data.title) errors.push(`${where}: missing title`);
	if (!data.description) errors.push(`${where}: missing description`);

	if (isTutorial(page) && page.locale === 'fr') {
		if (!data.thelia) errors.push(`${where}: missing "thelia" (version the page was checked against)`);
		if (!data.verified) errors.push(`${where}: missing "verified" (date of the last check)`);
		if (!Array.isArray(data.sources) || data.sources.length === 0)
			errors.push(`${where}: missing "sources" (code or capture behind each statement)`);
		if (options.release && data.thelia && String(data.thelia) !== String(options.release))
			warnings.push(`${where}: checked against ${data.thelia}, re-check for ${options.release}`);
	}

	const text = prose(page.body);
	if (text.includes('—')) errors.push(`${where}: em dash "—" (style guide)`);
	for (const pattern of banned[page.locale]) {
		const hit = text.match(pattern);
		if (hit) errors.push(`${where}: "${hit[0]}" (style guide)`);
	}
	for (const paragraph of text.split(/\n\s*\n/)) {
		const words = paragraph.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
		if (words > 70 && !/^\s*([-*]|\d+\.|\|)/.test(paragraph))
			warnings.push(`${where}: paragraph of ${words} words, split it (style guide: 70 max)`);
	}

	for (const [, src] of page.body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) {
		if (/^https?:/.test(src)) continue;
		if (!existsSync(resolve(dirname(page.path), src))) errors.push(`${where}: image not found: ${src}`);
	}
}

for (const [id, page] of english) {
	const source = french.get(id);
	if (!source) {
		errors.push(`${page.rel}: English page without a French original`);
		continue;
	}
	if (!page.data.translatedFrom) {
		(options.release ? errors : warnings).push(`${page.rel}: never stamped, run "npm run check -- --stamp en/${id}" once translated`);
	} else if (page.data.translatedFrom !== fingerprint(source)) {
		(options.release ? errors : warnings).push(`${page.rel}: French page changed since translation, update it then stamp`);
	}
}
for (const [id, page] of french) {
	// The 404 page is shared by both languages (Starlight renders a single one).
	if (id === '404') continue;
	if (!english.has(id)) (options.release ? errors : warnings).push(`${page.rel}: no English translation yet`);
}

for (const line of warnings) console.log(`warning  ${line}`);
for (const line of errors) console.log(`error    ${line}`);
console.log(`\n${pages.length} pages, ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length > 0 ? 1 : 0);
