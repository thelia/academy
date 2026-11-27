---
title: Rembourser le paiement d'une commande
description: Rendre à un client tout ou partie de ce qu'il a payé depuis la fiche commande, ou noter un remboursement fait par chèque ou virement.
sidebar:
  order: 85
thelia: '3.5'
verified: 2026-11-27
sources:
  - thelia/thelia:CHANGELOG.md:53
  - thelia/thelia:CHANGELOG.md:55
  - thelia/thelia:CHANGELOG.md:59
  - thelia/thelia:CHANGELOG.md:83
  - thelia/thelia:core/lib/Thelia/Module/PaymentModuleWithRefundInterface.php:34
  - thelia/thelia:core/lib/Thelia/Module/PaymentModuleRefundingInFullInterface.php:27
  - thelia/thelia:core/lib/Thelia/Domain/Payment/Enum/RefundReason.php:21
  - thelia/thelia:core/lib/Thelia/Domain/Payment/Service/PaymentRefundService.php:60
  - thelia/thelia:core/lib/Thelia/Domain/Payment/Service/PaymentRefundService.php:117
  - thelia/thelia:core/lib/Thelia/Domain/Payment/Service/PaymentRefundService.php:184
  - thelia/thelia:core/lib/Thelia/Domain/Payment/Service/PaymentRefundService.php:249
  - thelia/thelia:core/lib/Thelia/Domain/Payment/EventListener/MoveOrderOnPaymentTransactionListener.php:172
  - thelia/thelia:core/lib/Thelia/Core/Security/Resource/AdminResources.php:106
  - thelia/thelia:setup/update/sql/3.5.0.sql:434
  - thelia/thelia:setup/update/sql/3.5.0.sql:453
  - thelia-templates/default-twig:order/_payment_journal.html.twig:49
  - thelia-templates/default-twig:order/_payment_journal.html.twig:56
  - thelia-templates/default-twig:order/_payment_refund_modal.html.twig:18
  - thelia-templates/default-twig:order/_payment_refund_modal.html.twig:28
  - thelia-templates/default-twig:order/_payment_refund_modal.html.twig:40
  - thelia-templates/default-twig:order/_payment_refund_modal.html.twig:45
  - thelia-templates/default-twig:translations/messages.fr_FR.php:458
  - thelia-templates/default-twig:translations/messages.fr_FR.php:1674
  - thelia-templates/default-twig:translations/messages.fr_FR.php:1688
  - thelia-templates/default-twig:translations/messages.fr_FR.php:1689
  - thelia-templates/default-twig:translations/messages.fr_FR.php:1701
  - thelia-templates/default-twig:translations/messages.fr_FR.php:1703
---

Cette page vous montre comment rendre de l'argent à un client depuis la fiche de sa commande, sans passer par l'espace de votre banque. Le remboursement est daté et gardé dans le journal des paiements, avec son motif.

**Avant de commencer :** une commande payée, et un compte administrateur qui a le droit de rembourser (étape 4). Pour que l'argent reparte chez le prestataire de paiement, le module de paiement de la commande doit savoir rembourser. Sans cela, la page décrit comment noter un remboursement fait à côté.

## Étape 1 : ouvrir la carte Paiement

1. Dans le menu de gauche, cliquez sur **Commandes**, puis ouvrez la commande.
2. Dans la colonne de droite, repérez la carte **Paiement**.
3. Lisez **Remboursé** et **Reste remboursable** : ce sont le total déjà rendu et ce qu'il est encore possible de rendre.

Le reste remboursable est ce qui a été encaissé, moins ce qui a déjà été remboursé. Il se lit dans le journal des paiements (voir [Suivre les paiements d'une commande](/orders/payment-journal/)), pas dans le total de la commande.

## Étape 2 : rembourser chez le prestataire

Quand le module de paiement sait rembourser, le bouton s'appelle **Remboursement**.

1. Cliquez sur **Remboursement**.
2. Dans la fenêtre, vérifiez **Encaissé**, **Remboursé** et **Reste remboursable**.
3. Dans **Montant à rembourser**, gardez le montant proposé pour tout rendre, ou saisissez un montant plus petit pour un remboursement partiel.
4. Dans **Motif**, choisissez la raison : **Articles retournés**, **Articles manquants ou abîmés**, **Geste commercial**, **Commande annulée** ou **Autre motif**.
5. Écrivez au besoin un **Commentaire (facultatif)** de 255 caractères au plus.
6. Cliquez sur **Rembourser maintenant**.

La boutique refuse un montant nul, négatif ou supérieur au reste remboursable. Certains prestataires ne rendent un paiement qu'en totalité, tant qu'il n'est pas encore remis à la banque. La fenêtre le dit (**Pour l'instant, le prestataire ne rembourse ce paiement qu'en totalité.**) et le montant n'est pas modifiable.

Si vous cliquez deux fois, un seul remboursement part : le bouton se bloque à l'envoi. La boutique refuse aussi de rembourser le même montant deux fois en moins d'une minute.

## Étape 3 : noter un remboursement fait à côté

Quand le module de paiement ne sait pas rembourser, par exemple pour un paiement par chèque ou par virement, le bouton s'appelle **Enregistrer un remboursement**.

1. Faites d'abord le remboursement par le moyen de votre choix (virement, nouveau chèque).
2. Cliquez sur **Enregistrer un remboursement**. Un avertissement vous rappelle qu'aucun argent n'est envoyé.
3. Indiquez le montant, le motif et un commentaire éventuel, comme à l'étape 2.
4. Cliquez sur **Enregistrer le remboursement**.

La ligne du journal s'intitule **Remboursement fait hors du prestataire**. Elle compte dans le total remboursé, comme un remboursement fait par le prestataire.

## Étape 4 : donner le droit de rembourser

Rembourser est un droit à part, **Remboursement du paiement d'une commande**. Après la mise à jour vers la 3.5, aucun profil ne l'a : seul le super-administrateur rembourse. Ajoutez ce droit, en création, aux profils qui doivent rembourser.

Sans ce droit, un administrateur voit les totaux mais pas le bouton, et la demande est refusée.

## Ce qui se passe ensuite

- **Remboursement accepté.** Un message affiche le montant, et la référence du prestataire s'il y en a une. Pour un remboursement noté à la main, le message donne le montant seul. La ligne apparaît dans le journal.
- **Remboursement partiel.** La commande reste **Payée**. **Reste remboursable** baisse du montant rendu.
- **Tout l'encaissé rendu.** Une commande **Payée** passe en **Remboursé**. Si une action d'envoi d'e-mail au client est réglée sur ce statut, elle s'exécute comme pour tout changement de statut.
- **Refus du prestataire ou pas de réponse.** Aucun message de réussite ne s'affiche. La ligne du journal porte l'état **En échec** ou **En attente**, et la commande ne change pas.

## Le résultat

La carte **Paiement** de la commande affiche le montant remboursé et le reste remboursable. Le journal garde une ligne par remboursement. Une commande entièrement remboursée est au statut **Remboursé**.
