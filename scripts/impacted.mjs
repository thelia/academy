#!/usr/bin/env node
// Lists the pages to re-check after a release or a merge, from the "sources" of their front matter.
//
//   npm run impacted -- --repo thelia/thelia=../thelia --from 3.3.0 --to 3.4.0
//   npm run impacted -- --repo thelia/backoffice-default-twig-template=../default-twig --from 1.3.0 --to main
//
// --repo takes "<owner>/<repo>=<path to a local clone>" and can be repeated.
// A page is listed when a file it cites changed between the two refs, or no longer exists at --to.
import { execFileSync } from 'node:child_process';
import { listPages } from './lib.mjs';

const argv = process.argv.slice(2);
const repos = new Map();
let from;
let to = 'HEAD';
for (let index = 0; index < argv.length; index += 1) {
	if (argv[index] === '--repo') {
		const [name, path] = argv[++index].split('=');
		repos.set(name, path);
	} else if (argv[index] === '--from') from = argv[++index];
	else if (argv[index] === '--to') to = argv[++index];
}
if (repos.size === 0 || !from) {
	console.error('Usage: npm run impacted -- --repo <owner>/<repo>=<local clone> [--repo …] --from <ref> [--to <ref>]');
	process.exit(1);
}

function git(path, ...args) {
	try {
		return execFileSync('git', ['-C', path, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
	} catch (error) {
		console.error(`git ${args.join(' ')} failed in ${path}:\n${error.stderr}`);
		process.exit(1);
	}
}
const changed = new Map();
const present = new Map();
for (const [name, path] of repos) {
	changed.set(name, new Set(git(path, 'diff', '--name-only', `${from}..${to}`).split('\n').filter(Boolean)));
	present.set(name, new Set(git(path, 'ls-tree', '-r', '--name-only', to).split('\n').filter(Boolean)));
}

let count = 0;
for (const page of listPages().filter((page) => page.locale === 'fr')) {
	const reasons = new Set();
	for (const source of page.data.sources ?? []) {
		const match = String(source).match(/^([^:]+\/[^:]+):([^:]+)/);
		if (!match || !repos.has(match[1])) continue;
		const [, repo, file] = match;
		if (!present.get(repo).has(file)) reasons.add(`${repo}:${file} no longer exists`);
		else if (changed.get(repo).has(file)) reasons.add(`${repo}:${file} changed`);
	}
	if (reasons.size === 0) continue;
	count += 1;
	console.log(`${page.rel}\n  ${[...reasons].join('\n  ')}`);
}
console.log(`\n${count} page(s) to re-check between ${from} and ${to}.`);
