---
title: Vendre par lot, avec un minimum ou à la mesure
description: Exiger une quantité minimale, vendre par lot de 6 ou au poids, afficher l'unité et le prix au litre ou au kilo.
sidebar:
  order: 320
thelia: '3.4'
verified: 2026-11-13
sources:
  - thelia-templates/default-twig:catalog/product/_combinations_tab.html.twig:28
  - thelia-templates/default-twig:catalog/product/_combinations_tab.html.twig:177
  - thelia-templates/default-twig:catalog/product/_combinations_tab.html.twig:683
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:13
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:19
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:27
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:38
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:50
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:58
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:67
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:73
  - thelia-templates/default-twig:catalog/product/_combination_quantity_rules.html.twig:81
  - thelia-templates/default-twig:translations/messages.fr_FR.php:3618
  - thelia-templates/default-twig:translations/messages.fr_FR.php:3631
  - thelia/thelia:core/lib/Thelia/Domain/Catalog/Quantity/QuantityRule.php:35
  - thelia/thelia:core/lib/Thelia/Domain/Catalog/Quantity/QuantityRule.php:49
  - thelia/thelia:core/lib/Thelia/Domain/Catalog/Quantity/QuantityScale.php:27
  - thelia/thelia:core/lib/Thelia/Domain/Catalog/Quantity/UnitCode.php:21
  - thelia/thelia:CHANGELOG.md:45
  - thelia/thelia:CHANGELOG.md:51
  - thelia/thelia:CHANGELOG.md:52
---

Par défaut, un client commande n'importe quel nombre d'unités. Vous pouvez fixer une règle pour chaque combinaison : une quantité minimale, une vente par lot, ou une vente au poids ou à la mesure.

Une combinaison est une variante du produit, par exemple une contenance. Exemples : des verres vendus par 6, une peinture dont la quantité minimale est de 3 pots, un tissu vendu au mètre, un fromage vendu au kilo.

**Avant de commencer :** le produit existe. Voir [Créer un produit](/catalog/create-product/) et [Fixer le prix, la TVA et le stock d'un produit](/catalog/set-price-stock/). Une boutique mise à jour ne change pas tant que vous ne réglez rien : le minimum de départ est 1, vendu par 1, sans décimale et sans unité.

## Étape 1 : afficher les réglages de quantité

1. Dans le menu de gauche, cliquez sur **Catalogue**, puis sur **Produits**.
2. Ouvrez le produit.
3. Cliquez sur l'onglet **Combinaisons**.
4. Activez le commutateur **Vendu à la mesure, par lot ou à partir d'un minimum**.

Le commutateur est déjà activé si une combinaison a déjà une règle. Une icône de règle apparaît alors sur chaque ligne de combinaison.

5. Sur la ligne de la combinaison, cliquez sur l'icône de règle (son infobulle dit **Conditionnement et unités**).

Pour un produit sans combinaison, le même bloc **Conditionnement et unités** apparaît sous les champs du produit, dans l'onglet **Combinaisons**.

## Étape 2 : vendre par lot ou à partir d'un minimum

1. Dans **Quantité minimale**, saisissez la plus petite quantité qu'un client peut commander, par exemple `6`.
2. Dans **Vendu par**, saisissez le pas de vente, par exemple `6`. Toute quantité est alors un multiple de ce nombre : 6, 12, 18.
3. Laissez **Décimales d'une quantité** sur **0, vendu à la pièce**.
4. Enregistrez avec le bouton **Enregistrer les modifications**.

Pour un minimum seul, mettez `3` dans **Quantité minimale** et laissez **Vendu par** à `1` : le client peut commander 3, 4, 5 et plus.

Si la quantité minimale n'est pas un multiple du pas, la boutique démarre au premier multiple au-dessus. Avec un minimum de 4 et un pas de 6, la plus petite quantité est 6.

Le minimum et le pas doivent être supérieurs à zéro. Si l'un des deux est à zéro, ou s'il a plus de décimales que la déclinaison n'en accepte, l'enregistrement est refusé et le message cite la déclinaison.

## Étape 3 : vendre à la mesure

Une vente à la mesure accepte des quantités avec décimales, par exemple 4,25 kg.

1. Dans **Décimales d'une quantité**, choisissez **1, vendu à la mesure**, **2, vendu à la mesure** ou **3, vendu à la mesure**. Trois décimales au plus, par exemple 2 pour des quantités au centième.
2. Dans **Unité**, choisissez l'unité : pièce, kilogramme, gramme, litre, millilitre, mètre, centimètre, mètre carré ou mètre cube. **Aucune unité** écrit la quantité sans unité.
3. Dans **Vendu par**, saisissez le pas, par exemple `0,25`.
4. Dans **Quantité minimale**, saisissez le minimum, par exemple `0,5`.
5. Enregistrez.

Le pas et le minimum ne peuvent pas avoir plus de décimales que le réglage de **Décimales d'une quantité**. Avec 2 décimales, `0,25` est accepté et `0,125` est refusé.

## Étape 4 : afficher le prix au litre ou au kilo

Le prix à l'unité de référence permet de comparer des conditionnements différents. Une bouteille de 75 cl à 9,99 € s'affiche 13,32 € / l.

1. Choisissez l'**Unité** de la combinaison, ici litre.
2. Dans **Contenance d'une unité vendue**, saisissez ce que contient une unité, ici `0,75`.
3. Dans **Prix affiché pour**, saisissez la quantité de référence, ici `1`. Vide, le champ vaut 1.

La ligne **Prix à l'unité de référence, TTC** montre le résultat, calculé avec la taxe et la promotion en cours. Elle affiche un tiret tant que le calcul n'a pas de quoi se faire.

Pour donner les mêmes réglages à toutes les combinaisons du produit, cliquez sur **Appliquer ces réglages à toutes les déclinaisons et enregistrer**.

## Ce que voit le client

- Sur la page du produit, la quantité démarre au minimum. Un lot se choisit dans une liste (6, 12, 18). Une quantité à la mesure avance par pas, avec ses décimales et son unité.
- Le prix à l'unité de référence apparaît sous le prix, sur la page du produit et sur les cartes de produit.
- Dans le panier, les boutons plus et moins changent la quantité d'un pas. Le client peut saisir `1,5` ou `1.5`.
- Une quantité qui ne respecte pas la règle est refusée avec la liste des quantités permises.
- Le panier, le récapitulatif de commande, le compte client, les e-mails de commande, la facture, le bon de livraison et le document de retour écrivent « 1,25 kg » pour une vente à la mesure. Une vente à la pièce reste écrite « 1 ».

Quand vous modifiez une règle, un panier déjà rempli est corrigé à sa prochaine lecture : une ligne hors règle descend à la quantité valable en dessous, ou disparaît. Le client en est prévenu et le tunnel de commande s'arrête une fois pour qu'il voie les nouvelles quantités avant de payer.

La commande garde l'unité et les décimales du moment de l'achat : une facture lit toujours « 1,25 kg », même si la règle change ensuite.

## Ce que cette fonction ne fait pas

- Elle ne fixe pas de quantité maximale par ligne, ni de règle par client ou par groupe de clients.
- La commande rapide et les listes d'achat n'acceptent pas de décimales : une combinaison vendue à la mesure se commande depuis sa page produit.
- Les composants d'un pack gardent leur quantité brute sur les documents PDF.

## Le résultat

Chaque combinaison se vend selon sa règle : minimum, lot ou mesure. Le client voit l'unité et le prix au litre ou au kilo, et votre facture écrit la quantité comme vous l'avez vendue.
