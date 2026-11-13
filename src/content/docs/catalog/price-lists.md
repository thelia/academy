---
title: Créer des grilles tarifaires et des assortiments
description: Donner à un groupe de clients ou à un client ses propres prix, lui réserver une partie du catalogue et choisir qui voit les prix.
sidebar:
  order: 330
thelia: '3.4'
verified: 2026-11-13
sources:
  - thelia-templates/default-twig:_side_nav.html.twig:156
  - thelia-templates/default-twig:pricing/price-list/list.html.twig
  - thelia-templates/default-twig:pricing/price-list/view.html.twig
  - thelia-templates/default-twig:pricing/price-list/_lines.html.twig
  - thelia-templates/default-twig:pricing/price-list/_assignments.html.twig
  - thelia-templates/default-twig:pricing/price-list/import.html.twig
  - thelia-templates/default-twig:pricing/catalog-restriction/list.html.twig
  - thelia-templates/default-twig:pricing/catalog-restriction/new.html.twig
  - thelia-templates/default-twig:catalog/product/_price_display_mode.html.twig
  - thelia-templates/default-twig:catalog/product/_effective_prices.html.twig
  - thelia-templates/default-twig:src/Form/Pricing/PriceListType.php
  - thelia-templates/default-twig:src/Form/Configuration/ConfigStoreType.php:226
  - thelia-templates/default-twig:translations/messages.fr_FR.php:3420
  - thelia-templates/flexy:components/Molecules/PriceBlock/Base.html.twig
  - thelia-templates/flexy:translations/messages.fr_FR.yaml:705
  - thelia/thelia:CHANGELOG.md:109
  - thelia/thelia:CHANGELOG.md:111
  - thelia/thelia:CHANGELOG.md:112
  - thelia/thelia:CHANGELOG.md:113
  - thelia/thelia:CHANGELOG.md:117
  - thelia/thelia:CHANGELOG.md:118
---

Une grille tarifaire donne à un groupe de clients, ou à un client précis, des prix négociés. Un assortiment réserve une partie du catalogue à ceux qui y ont droit. C'est utile pour vendre à des professionnels : chacun voit son catalogue à ses tarifs.

Exemple : une grille « Revendeurs » avec le produit A à 50 € et le produit B à 60 €, affectée au groupe des revendeurs.

**Avant de commencer :** les produits et leurs combinaisons existent, avec une référence (voir [Créer un produit](/catalog/create-product/)). Les groupes de clients existent (voir [Créer des groupes de clients](/customers/customer-groups/)). Une boutique mise à jour ne change pas tant que vous ne créez ni grille, ni règle d'assortiment, et que l'affichage des prix reste sur **Visible**.

Une combinaison est une variante du produit, par exemple une contenance.

## Comment la boutique choisit un prix

Un client peut être concerné par plusieurs grilles. La boutique les consulte par priorité, la plus petite d'abord. À priorité égale, la grille affectée au client passe avant celle de son groupe.

La première grille qui a une ligne pour la combinaison et la quantité commandée fixe le prix. Ce prix est définitif : aucun prix de groupe, remise de groupe, règle de prix catalogue, vente réservée ou remise client ne s'ajoute.

Exemple : une grille de groupe (priorité 30) donne 50 pour A et 60 pour B. Une grille du client (priorité 10) donne 45 pour A. Le client paie 45 pour A, 60 pour B et le prix catalogue pour le reste.

## Étape 1 : créer la grille

1. Dans le menu de gauche, cliquez sur **Prix et assortiments**, puis sur **Grilles tarifaires**.
2. Cliquez sur **Ajouter une grille tarifaire**.
3. Dans **Code**, saisissez un nom sans espace, par exemple `revendeurs`. Lettres, chiffres, points, tirets et tirets bas sont acceptés.
4. Dans **Titre**, saisissez un nom lisible, par exemple `Revendeurs`.
5. Dans **Devise**, choisissez la devise des prix. Elle ne peut plus changer dès que la grille a des lignes.
6. Dans **Priorité**, saisissez un nombre. Le plus petit est consulté en premier. La valeur de départ est `100`.
7. Dans **Début** et **Fin**, saisissez une période de validité, ou laissez vides pour une grille sans limite.
8. Cochez **Exclusive** pour réserver l'achat aux seuls produits de la grille (voir l'encadré plus bas).
9. Laissez **Actif** coché. Une grille désactivée ne s'applique à personne.
10. Cliquez sur **Créer**.

Une grille dans une autre devise que celle de la navigation du client ne tarife rien.

### Grille exclusive

Avec une grille exclusive, le client ne peut acheter que les combinaisons qu'elle contient. Les autres restent visibles au prix catalogue, mais ne s'ajoutent pas au panier. Si une grille de rang supérieur tarife la combinaison, elle reste achetable.

## Étape 2 : ajouter les lignes

Une ligne donne, pour une combinaison et une quantité minimale, un prix ou une remise.

1. Ouvrez la grille, puis l'onglet **Lignes**.
2. Dans **Ajouter une ligne**, saisissez la référence de la combinaison dans **Référence de la combinaison**, par exemple `TSHIRT-M`.
3. Dans **Quantité minimale**, saisissez un entier, `1` ou plus.
4. Saisissez soit un **Prix (HT)**, soit une **Remise (%)** sur le prix catalogue. Jamais les deux.
5. Cliquez sur le bouton d'ajout.

Pour un prix dégressif, ajoutez plusieurs lignes pour la même combinaison : `1` à 50, `10` à 45, `50` à 40. La boutique retient la ligne dont la quantité minimale est la plus grande sans dépasser la quantité commandée. Le panier reprend le prix de chaque ligne quand la quantité change.

La même combinaison avec la même quantité minimale ne peut figurer qu'une fois.

### Importer les lignes depuis un fichier

Pour une grille longue, importez un fichier CSV de 5 Mo au plus.

1. Dans l'onglet **Lignes**, repérez **Importer des lignes depuis un fichier CSV**.
2. Préparez un fichier avec les colonnes `pse_ref` (ou `pse_id`), `min_quantity`, et `price` ou `discount_percent`.
3. Choisissez le fichier, puis cliquez sur **Prévisualiser l'import**.
4. Lisez les chiffres : **Lignes à créer**, **Lignes à mettre à jour**, **Lignes refusées**, avec la raison de chaque refus et son numéro de ligne dans le fichier.
5. Cliquez sur **Confirmer l'import**, ou sur **Abandonner**.

Rien n'est écrit avant la confirmation.

## Étape 3 : affecter la grille

1. Ouvrez la grille, puis l'onglet **Affectations**.
2. Pour un groupe : dans **Groupes auxquels la grille est affectée**, sélectionnez un ou plusieurs groupes (Ctrl ou Cmd + clic pour en choisir plusieurs), puis cliquez sur **Enregistrer les groupes**. Tous les clients du groupe reçoivent la grille.
3. Pour un client : dans **Trouver un client (nom, e-mail ou référence)**, saisissez au moins 3 caractères, cliquez sur **Recherche**, puis sur **Affecter** en face du bon client.

Pour retirer une affectation, cliquez sur **Retirer** en face du client, ou désélectionnez le groupe et enregistrez. La liste des clients n'apparaît que si votre compte administrateur peut consulter les clients.

## Étape 4 : réserver une partie du catalogue

Une règle d'assortiment ouvre ou ferme une catégorie, une marque ou un produit pour un groupe ou un client.

1. Dans le menu de gauche, cliquez sur **Prix et assortiments**, puis sur **Assortiments**.
2. Cliquez sur **Ajouter une règle**.
3. Dans **À qui s'applique la règle**, choisissez **Groupes de clients** (une règle est créée par groupe) ou **Un client**.
4. Dans **Ce que vise la règle**, choisissez **Une catégorie et ses sous-catégories**, **Une marque** ou **Un produit**, puis la cible.
5. Dans **Dans quel sens**, choisissez **Interdire** ou **Autoriser**.
6. Cliquez sur **Mettre à jour le récapitulatif**, vérifiez, puis cliquez sur **Créer la règle**.

Les règles se lisent ainsi :

- **Interdire** ferme la cible. Il l'emporte toujours sur une autorisation.
- **Autoriser** ouvre la cible. Dès qu'un client a une règle **Autoriser**, tout ce qu'aucune règle d'autorisation n'ouvre lui est fermé.
- Un produit sans catégorie est fermé, sauf si lui ou sa marque est autorisé.
- Les règles s'ajoutent à la liste de catégories d'un groupe restreint : un produit est visible quand les deux l'ouvrent.

Un produit fermé n'apparaît ni dans les listes, ni dans la recherche, ni dans le plan du site. Son adresse affiche une page introuvable. Il ne peut pas être ajouté au panier.

Pour savoir combien de produits il reste à un groupe ou à un client, utilisez le bloc **Produits restant visibles** de la même page, puis **Compter**.

## Étape 5 : choisir qui voit les prix

L'affichage des prix se règle pour toute la boutique, puis se remplace produit par produit.

1. Dans le menu de gauche, cliquez sur **Configuration**.
2. Dans le bloc **Système**, cliquez sur **Informations de la boutique**.
3. Dans la carte **Prix**, choisissez **Affichage des prix** :
   - **Visible** : tout visiteur voit les prix et peut acheter.
   - **Clients identifiés seulement** : un visiteur ne voit aucun prix et est invité à se connecter.
   - **Sur demande** : personne ne voit de prix, une demande de tarif est proposée à la place.
4. Enregistrez.

Pour un produit seul, ouvrez-le, cliquez sur l'onglet **Combinaisons**, repérez **Affichage des prix**, choisissez une option dans **Affichage pour ce produit** et enregistrez. **Comme la boutique** suit le réglage général.

Dans les deux modes qui masquent le prix, le produit s'affiche sans prix et sans bouton d'achat, et l'ajout au panier est refusé même par un appel direct. En mode **Sur demande**, un bouton de demande de prix mène au formulaire de contact, prérempli avec la référence du produit. Les tris et filtres par prix ne révèlent pas les prix cachés.

## Étape 6 : vérifier ce que voit un client

1. Ouvrez un produit, puis l'onglet **Combinaisons**.
2. Dans **Prix effectifs**, saisissez au moins 3 caractères du nom, de l'e-mail ou de la référence d'un client, puis cliquez sur **Recherche**. Pour un visiteur non connecté, cliquez sur **Voir ce que paie un visiteur**.

Le tableau donne, pour chaque combinaison : le prix retenu (hors taxes), sa **Source** (grille, règle ou prix catalogue), si elle est **Achetable**, et ses **Paliers**. Ce bloc n'apparaît que si votre compte peut consulter les prix et les clients.

## Ce que voit le client

- Sur la page produit, le client voit son prix et, quand le prix change avec la quantité, la liste **Prix par quantité** (« À partir de 10 : … »).
- Un visiteur d'une boutique en mode **Clients identifiés seulement** lit « Connectez-vous pour voir les prix » avec un bouton de connexion. En mode **Sur demande**, il lit « Prix sur demande » avec le bouton **Demander un tarif**.
- Un client dont la grille est exclusive voit les autres produits avec la mention « Non disponible à l'achat », sans bouton d'ajout.
- Quand une grille est désactivée, ou quand un visiteur se connecte et possède une grille, le panier est de nouveau tarifé avant le paiement.

## Ce que cette fonction ne fait pas

- Une grille ne s'affecte pas à une société : seulement à un groupe ou à un client.
- La commande rapide sans panier et les listes d'achat choisissent le palier d'après la quantité saisie seule.
- Une ligne de panier garde la trace d'une grille supprimée jusqu'à ce que le panier soit utilisé ou purgé.

## Le résultat

Chaque client voit le catalogue et les prix qui lui sont réservés. Vous contrôlez ce résultat dans **Prix effectifs**, produit par produit.
