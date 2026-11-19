---
title: Accorder un avoir et le faire utiliser
description: Créer un avoir à partir d'une commande facturée, choisir comment le client peut le dépenser, et savoir ce qui se passe quand il règle une commande avec.
sidebar:
  order: 110
thelia: '3.3'
verified: 2026-11-19
sources:
  - thelia-modules/CreditNote:Readme.md
  - thelia-modules/CreditNote:CHANGELOG.md
  - thelia-modules/CreditNote:I18n/backOffice/default-twig/fr_FR.php
  - thelia-modules/CreditNote:I18n/frontOffice/default/fr_FR.php
  - thelia-modules/CreditNote:templates/backOffice/default-twig/CreditNote/includes/credit-note-modal.html.twig
  - thelia-modules/CreditNote:templates/backOffice/default-twig/CreditNote/hook/order.tab.html.twig
---

Un avoir est une somme que la boutique doit à un client, par exemple après un retour de produit ou une erreur de facturation. Le client peut la dépenser sur une prochaine commande, en une fois ou en plusieurs.

**Avant de commencer :** il vous faut le module CreditNote 5.0 ou plus récent, installé et activé (voir [Gérer les modules](/settings/manage-modules/)), le thème Flexy pour la boutique, et un droit d'accès aux commandes et au module dans votre profil d'administrateur.

## Étape 1 : ouvrir la commande concernée

Un avoir se crée en général à partir d'une commande déjà facturée.

1. Dans le menu de gauche, cliquez sur **Commandes**, puis ouvrez la commande.
2. Cliquez sur l'onglet **Avoir**.
3. Cliquez sur **Ajouter un nouvel avoir**.

Une commande qui n'a jamais été facturée est refusée, avec le message « Vous ne pouvez pas créer d'avoir pour cette commande, elle n'est pas facturée ».

Tous les avoirs sont aussi listés dans le menu **Avoirs**, qui s'affiche sous **Commandes**.

## Étape 2 : remplir l'avoir

Une fenêtre s'ouvre.

1. Choisissez le **Type** de l'avoir, par exemple **Retour produit**.
2. Indiquez les produits remboursés et leur **Quantité**.
3. Pour un geste commercial qui ne rembourse pas un produit, ajoutez un **Montant libre**.
4. Écrivez au besoin un **Commentaire interne**, que le client ne voit pas.

Le total des avoirs d'une commande ne peut pas dépasser le total de cette commande, livraison et réduction comprises. Un produit ne peut pas non plus être remboursé plus de fois qu'il a été commandé. Si vous accordez des gestes au-delà de la commande, désactivez la limite dans la configuration du module.

## Étape 3 : choisir comment le client dépense l'avoir

Le champ **Utilisation :** propose deux choix.

- **Utilisable en plusieurs fois** : le client dépense l'avoir en plusieurs achats. Ce qui n'est pas utilisé reste sur l'avoir.
- **Utilisable en une seule fois, pour tout son solde** : l'avoir règle un seul achat, pour tout son montant.

Un avoir à usage unique est refusé sur un panier qui vaut moins que lui. Choisissez ce réglage avant la première utilisation : une fois qu'une commande a été réglée avec l'avoir, il ne se modifie plus.

## Étape 4 : accepter l'avoir

1. Réglez le statut de l'avoir sur **Accepté**.
2. Cliquez sur **Créer l'avoir**.

Un avoir accepté reçoit un numéro comptable et un document PDF. Un avoir proposé ou refusé reste un brouillon : le client ne le voit pas et ne peut pas le dépenser.

La colonne **Solde** de la liste montre ce qu'il reste à dépenser sur chaque avoir accepté.

## Ce que fait le client

Le client retrouve ses avoirs dans son compte, avec leur solde, et peut télécharger le document.

À l'étape de paiement, un bloc liste ses avoirs qui ont encore un solde. Il coche ceux qu'il veut utiliser, et la page indique le montant réglé et ce qu'il reste à payer.

- Plusieurs avoirs peuvent régler la même commande. Ceux à usage unique sont dépensés en premier, puis les autres, du plus ancien au plus récent.
- Si les avoirs couvrent toute la commande, aucun autre moyen de paiement n'est demandé.
- Sinon, le client choisit un moyen de paiement pour le reste. Ce moyen doit pouvoir encaisser un solde : le module de carte bancaire Stripe le peut à partir de sa version 6.
- Un avoir ne règle jamais plus que la commande. Le surplus reste sur l'avoir.

Régler avec un avoir est un paiement, pas une réduction : la facture garde son total complet.

## Ce qu'il faut savoir

- Un avoir n'est utilisable que dans sa devise. Il n'est pas proposé sur une commande dans une autre.
- Si le client a mis un avoir dans son panier et que celui-ci est dépensé ailleurs ou n'est plus accepté, il est retiré du panier et le client en est averti.
- Si les avoirs du panier ont changé pendant que le client regardait l'étape de paiement, la commande est refusée une fois. Il revient à l'étape de paiement, lit les nouveaux montants et valide de nouveau.
- Annuler une commande payée avec un avoir rend l'avoir. La rembourser ne le rend pas : si besoin, créez un nouvel avoir.
- Un groupe de clients limité à certains moyens de paiement doit avoir CreditNote dans sa liste pour utiliser ses avoirs.
- La ligne « payé par avoir » sous le total de la facture PDF viendra avec la prochaine version du thème PDF.

## Le résultat

L'avoir apparaît dans la liste **Avoirs** avec son solde, et dans le compte du client. Une commande réglée avec lui l'affiche sous ses lignes, avec le montant que chaque avoir a réglé.
