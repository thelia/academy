# Guide de rédaction

Le lecteur gère une boutique. Il ne connaît ni Thelia ni le vocabulaire du e-commerce. Il lit pour faire une tâche, pas pour apprendre le logiciel en entier.

`npm run check` contrôle les règles marquées ✓.

## Une page

- Une page = une tâche. Le titre commence par un verbe à l'infinitif : « Créer un produit », pas « Les produits ».
- Ouverture en deux phrases au plus : ce que le lecteur va faire, puis pourquoi c'est utile.
- **Avant de commencer :** ce qu'il faut avoir (accès, données, module). Une ligne.
- Des étapes `## Étape N : verbe`, chacune avec une liste numérotée, une action par ligne.
- Une capture chaque fois que l'écran change. Pas de capture décorative.
- `## Le résultat` : ce que le lecteur voit quand c'est réussi. Une ou deux phrases.
- Paragraphes de 70 mots au plus ✓. Au-delà, une liste ou deux paragraphes.

## Les mots

- Les libellés de l'écran s'écrivent en **gras**, recopiés à la lettre, fautes comprises. Si un libellé est mauvais, on le signale comme bug du logiciel, on ne le corrige pas dans la page.
- Un terme du métier (TVA, panier moyen, déclinaison) est expliqué à sa première apparition, ou renvoie au lexique.
- Phrases courtes, voix active, « vous ».
- Bannis ✓ : tiret cadratin « — », « n'hésitez pas », « il convient de », « simplement », « facilement », « en quelques clics », « puissant », « robuste », « incontournable ».
- Pas d'emphase, pas de point d'exclamation, pas de conclusion qui répète la page.
- Neutre : aucun nom de prestataire, d'agence ou d'hébergeur dans un tutoriel. L'éditeur n'est cité que dans le pied de page et la page qui lui est dédiée.

## La preuve

Chaque affirmation se vérifie sur le code ou sur un écran réel, jamais de mémoire.

- `sources` ✓ liste ce qui prouve la page : `capture:<page>` pour les écrans, `<owner>/<repo>:<fichier>[:<ligne>]` pour le code. `npm run impacted` s'en sert à chaque version.
- `thelia` ✓ : version sur laquelle la page a été vérifiée. `verified` ✓ : date de la vérification.
- Une règle chiffrée (48 heures, 5 unités) se lit dans le code, avec sa ligne dans `sources`.
- Ce qui ne se vérifie pas ne s'écrit pas.

## Les captures

- Produites par `npm run capture` à partir de `captures/<section>/<page>.yaml`, jamais à la main : elles se refont toutes en une commande à chaque version.
- Instance Thelia avec les données de démonstration, fenêtre de 1440 × 900.
- `highlight` encadre en orange l'élément dont parle l'étape. `clip` recadre sur un bloc.
- La même capture existe en français et en anglais (le script fait les deux).

## L'anglais

- Le français fait foi. L'anglais traduit fidèlement, sans ajouter ni retirer.
- Les libellés en gras sont ceux de l'interface anglaise, relevés sur la capture anglaise.
- Une page traduite se tamponne : `npm run check -- --stamp en/<section>/<page>`. Si le français change ensuite, `npm run check` le signale ✓.
- Tant qu'une page n'est pas traduite, le site affiche la version française avec un bandeau « pas encore traduit ».
