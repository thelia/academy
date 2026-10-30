# States the demo data lacks

A capture sometimes needs something the demo data does not have: a product without combination, a disabled module, a shipped order. Each such state lives in its own file here, named after the state (`offline-product.yaml` is the state `offline-product`). A manifest lists the states it needs:

```yaml
page: catalog/set-price-stock
login: admin
prepare: [offline-product]
```

`npm run capture` plays the states its manifests need before any shot, in French, through the back office, in file name order. A state file holds:

| Key | Use |
|---|---|
| `done: { url, selector, waitFor? }` | the state exists when `selector` is on the page at `url`; its steps are then skipped |
| `steps: [{ url, actions }]` | the gestures a merchant would make, with the actions of a manifest shot (plus `check`, `uncheck`, `waitForUrl`); confirmation boxes are accepted |
| `vars: { name: { selector, attribute?, pattern } }` | read on the `done` page, first group of `pattern`; `{{name}}` in a manifest is replaced by the value |

Replaying is safe: a state that already exists is kept, and a state still missing after its steps fails the run. A state creates a new object, or changes a demo object that no other manifest shows. It never adds a country to a shipping zone: that cannot be undone from the back office ([thelia/thelia#4269](https://github.com/thelia/thelia/issues/4269)).
