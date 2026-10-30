# Maintenance

L'académie suit le logiciel. Deux moments la font bouger : une fonctionnalité qui arrive, une version qui sort.

## Une fonctionnalité arrive

Seulement ce qu'un marchand voit ou utilise : nouvel écran, nouveau réglage, nouveau module. Une correction de bug, un changement technique ou un détail d'affichage ne demandent rien.

1. Chercher la page qui en parle déjà : `grep -ril "<mot-clé>" src/content/docs`. La compléter plutôt que d'en créer une.
2. Sinon, `npm run new -- <section>/<page> "<Titre>"`.
3. Décrire les écrans dans `captures/<section>/<page>.yaml`, puis `npm run capture -- captures/<section>/<page>.yaml`.
4. Écrire la page en français, chaque affirmation vérifiée et citée dans `sources` (voir le [guide de rédaction](style-guide.md)).
5. Traduire : `npm run new -- <section>/<page> --en`, traduire, puis `npm run check -- --stamp en/<section>/<page>`.
6. `npm run check && npm run build`, puis une PR.

Une fonctionnalité fusionnée mais pas encore publiée dans une version porte `thelia: '<version à venir>'`.

## Une version sort

1. Mettre l'instance de captures sur la version publiée, avec les données de démonstration.
2. Lister les pages touchées par le changement :
   `npm run impacted -- --repo thelia/thelia=<clone> --repo thelia-templates/default-twig=<clone> --from <version précédente> --to <version>`
3. Relire chaque page listée contre le code et l'écran. Corriger, passer `thelia` à la nouvelle version, mettre `verified` à jour.
4. Refaire toutes les captures : `npm run capture`. Regarder le diff des images dans la PR, un écran qui change doit correspondre à un texte relu.
5. `npm run check -- --release <version>` doit passer : aucune traduction manquante ou en retard.
6. Fusionner, puis déployer (workflow « Deploy »).

## Variables du script de captures

| Variable | Rôle |
|---|---|
| `ACADEMY_BASE_URL` | adresse de l'instance Thelia à capturer |
| `ACADEMY_ADMIN_LOGIN`, `ACADEMY_ADMIN_PASSWORD` | compte administrateur de cette instance |
| `CHROME_PATH` | Chrome ou Chromium, si ce n'est pas `/usr/bin/google-chrome` |
