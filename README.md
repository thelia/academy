# Thelia Academy

Step-by-step tutorials for merchants and webmasters who run a [Thelia](https://thelia.net) store. French first, English second. Published at <https://academy.thelia.net>.

Developer documentation lives elsewhere: <https://doc.thelia.net>. The academy explains how to *use* a store, not how to code for it.

## Run it locally

Node 22.12 or later (see `.nvmrc`).

```bash
npm ci
npm run dev      # http://localhost:4321
npm run check    # content rules: front matter, style, images, translations
npm run build    # static site in dist/, internal links validated
```

## Layout

| Path | What it holds |
|---|---|
| `src/content/docs/<section>/<page>.md` | French pages (the reference) |
| `src/content/docs/en/<section>/<page>.md` | English translations, same path |
| `captures/<section>/<page>.yaml` | screens of a page, replayed by `npm run capture` |
| `src/assets/captures/<fr\|en>/…` | the PNG files produced from those manifests |
| `sidebar.config.mjs` | sections and their order; a section shows up once its folder exists |
| `src/styles/theme.css` | Thelia 2026 charter (colours, fonts) |
| `scripts/` | maintenance scripts, described below |
| `docs/` | style guide and maintenance procedure |

## Scripts

| Command | Use |
|---|---|
| `npm run new -- catalog/create-product "Créer un produit"` | French page from the template + its capture manifest |
| `npm run new -- catalog/create-product --en` | English copy to translate, image paths switched |
| `npm run capture` | replays every manifest against a Thelia instance, French and English |
| `npm run check -- --stamp en/catalog/create-product` | marks an English page as up to date with the French one |
| `npm run check -- --release 3.4` | release gate: stale translations block, pages checked against an older version are listed |
| `npm run impacted -- --repo thelia/thelia=../thelia --from 3.3.0 --to 3.4.0` | pages whose cited source files changed between two versions |

Writing rules: [docs/style-guide.md](docs/style-guide.md). Procedures per feature and per release: [docs/maintenance.md](docs/maintenance.md).

## License

GPL-3.0, like Thelia and its developer documentation. See [LICENSE](LICENSE).
