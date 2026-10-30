---
title: Mettre un produit en ligne ou hors ligne
description: Cacher un produit à vos clients sans le supprimer, ou le rendre visible à nouveau.
sidebar:
  order: 50
thelia: '3.3'
verified: 2026-10-30
sources:
  - capture:catalog/publish-product
  - thelia-templates/default-twig:catalog/product/list.html.twig:213
  - thelia-templates/default-twig:catalog/product/list.html.twig:227
  - thelia-templates/default-twig:assets/controllers/bo-bulk-action-picker_controller.js:41
  - thelia-templates/default-twig:catalog/product/list.html.twig:276
  - thelia-templates/default-twig:components/DataTable/cells/toggle.html.twig:6
  - thelia-templates/default-twig:components/DataTable/cells/toggle.html.twig:13
  - thelia-templates/default-twig:catalog/product/edit.html.twig:135
  - thelia-templates/default-twig:src/Controller/Catalog/ProductController.php:281
  - thelia-templates/default-twig:src/Controller/Catalog/ProductController.php:590
  - thelia-templates/default-twig:src/Controller/Catalog/ProductController.php:331
  - thelia/thelia:core/lib/Thelia/Action/Product.php:524
  - thelia/thelia:core/lib/Thelia/Action/Product.php:1143
  - thelia/thelia:core/lib/Thelia/Action/Product.php:1162
  - thelia/thelia:core/lib/Thelia/Core/View/ViewRenderer.php:75
  - thelia-templates/flexy:category.html.twig:63
  - thelia-templates/flexy:search.html.twig:20
  - thelia-templates/flexy:components/Layouts/ProductListing/Base.php:323
  - thelia-templates/flexy:src/Service/ProductSearch.php:158
---

Un produit hors ligne reste dans votre catalogue, mais vos clients ne peuvent plus ouvrir sa page. C'est utile pour un produit en rupture, de saison, ou dont la fiche n'est pas finie. Rien n'est supprimé : vous le remettez en ligne quand vous voulez.

**Avant de commencer :** il vous faut un produit existant (voir [Créer un produit](/catalog/create-product/)).

## Méthode 1 : depuis la liste des produits

1. Dans le menu de gauche, cliquez sur **Catalogue**, puis sur **Produits**.
2. Repérez la colonne **En ligne**. Une pastille verte cochée signifie que le produit est en ligne. Un rond gris vide signifie qu'il est hors ligne.
3. Cliquez sur la pastille de la ligne du produit.

![Colonne En ligne de la liste des produits](../../../assets/captures/fr/catalog/publish-product/list.png)

Le changement est immédiat : il n'y a ni confirmation ni bouton **Enregistrer**. Pour revenir en arrière, cliquez à nouveau sur la pastille.

Sur cette capture, le produit **TAB-CHENE-01**, créé pour l'exemple, est hors ligne : sa pastille est un rond gris vide. La liste affiche les titres dans la langue par défaut de la boutique, ici l'anglais.

![Un produit hors ligne dans la liste, avec son rond gris](../../../assets/captures/fr/catalog/publish-product/offline.png)

## Méthode 2 : depuis la fiche du produit

1. Dans la liste, cliquez sur le titre du produit pour ouvrir sa fiche.
2. Dans l'onglet **Général**, repérez la case **Ce produit est en ligne**, à droite.
3. Cochez la case pour mettre le produit en ligne, décochez-la pour le mettre hors ligne.
4. Cliquez sur **Enregistrer**.

![Case Ce produit est en ligne sur la fiche produit](../../../assets/captures/fr/catalog/publish-product/card.png)

Ici, rien ne change tant que vous n'avez pas cliqué sur **Enregistrer**.

## Méthode 3 : plusieurs produits à la fois

1. Dans la liste des produits, cochez la case au début de chaque ligne concernée.
2. Une barre apparaît au-dessus du tableau avec le nombre de produits sélectionnés.
3. Ouvrez la liste **Actions groupées**.
4. Choisissez **Mettre en ligne** ou **Mettre hors ligne**. Le changement s'applique dès votre choix, sans confirmation.

![Barre d'actions groupées, deux produits sélectionnés](../../../assets/captures/fr/catalog/publish-product/bulk.png)

Pour abandonner la sélection, cliquez sur **Annuler la sélection**.

## Ce que voit le client

Quand un produit est hors ligne, il n'apparaît plus dans les pages de catégorie ni dans les résultats de recherche de la boutique. Un client qui ouvre l'adresse de sa page voit une erreur « page introuvable » (404) au lieu de la fiche.

## Le résultat

Dans **Catalogue**, **Produits**, la colonne **En ligne** affiche une pastille verte pour un produit visible et un rond gris pour un produit caché. Le produit n'a pas bougé du catalogue : sa fiche, son prix et son stock sont intacts.
