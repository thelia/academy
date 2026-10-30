#!/usr/bin/env node
// Scaffolds a tutorial so that writing starts from the house template.
//
//   npm run new -- catalog/create-product "Créer un produit"
//       French page + capture manifest captures/catalog/create-product.yaml
//   npm run new -- catalog/create-product --en
//       English copy of the French page, image paths switched to the English captures,
//       ready to translate (then: npm run check -- --stamp en/catalog/create-product)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { CAPTURES_OUT, CAPTURES_SRC, DOCS, parseArgs, relativeFromPage } from './lib.mjs';
import { sections } from '../sidebar.config.mjs';

const { options, positional } = parseArgs(process.argv.slice(2));
const [id, title] = positional;
if (!id || !/^[a-z0-9-]+\/[a-z0-9-]+$/.test(id)) {
	console.error('Usage: npm run new -- <section>/<slug> "<French title>"   |   npm run new -- <section>/<slug> --en');
	process.exit(1);
}
const [section] = id.split('/');
if (!sections.some(({ directory }) => directory === section)) {
	console.error(`Unknown section "${section}". Sections: ${sections.map(({ directory }) => directory).join(', ')}`);
	process.exit(1);
}

function write(path, content) {
	if (existsSync(path)) {
		console.error(`Already exists: ${path}`);
		process.exit(1);
	}
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, content);
	console.log(`created ${path}`);
}

const frenchPath = join(DOCS, `${id}.md`);

if (options.en) {
	if (!existsSync(frenchPath)) {
		console.error(`French page not found: ${frenchPath}`);
		process.exit(1);
	}
	const englishPath = join(DOCS, 'en', `${id}.md`);
	const frenchCaptures = relativeFromPage(frenchPath, join(CAPTURES_OUT, 'fr', id));
	const englishCaptures = relativeFromPage(englishPath, join(CAPTURES_OUT, 'en', id));
	const text = readFileSync(frenchPath, 'utf8').split(frenchCaptures).join(englishCaptures);
	write(englishPath, text);
	process.exit(0);
}

if (!title) {
	console.error('A French title is required.');
	process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
const captures = relativeFromPage(frenchPath, join(CAPTURES_OUT, 'fr', id));

write(
	frenchPath,
	`---
title: ${title}
description: À compléter, une phrase qui dit ce que le lecteur saura faire.
thelia: '3.3'
verified: ${today}
sources:
  - capture:${id}
---

Ce que vous allez faire, en une ou deux phrases.

**Avant de commencer :** ce qu'il faut avoir (accès, données, module).

## Étape 1 : verbe à l'infinitif

1. Dans le menu, cliquez sur **Libellé exact de l'écran**.
2. Une action par ligne.

![Ce que montre la capture](${captures}/step-1.png)

## Le résultat

Ce que le lecteur voit quand c'est réussi, et où le retrouver ensuite.
`,
);

write(
	join(CAPTURES_SRC, `${id}.yaml`),
	`# Screens of src/content/docs/${id}.md, replayed by "npm run capture".
page: ${id}
login: admin
shots:
  - name: step-1
    url: /admin
    waitFor: main
`,
);
