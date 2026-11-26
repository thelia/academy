---
title: Gérer les comptes société de ses clients professionnels
description: Créer une société, y rattacher ou inviter des acheteurs, régler leurs rôles et leurs plafonds de dépense, partager des adresses, et voir ce que l'acheteur trouve dans son compte.
sidebar:
  order: 30
thelia: '3.5.0'
verified: 2026-11-26
sources:
  - thelia/thelia:CHANGELOG.md
  - thelia/thelia:setup/update/sql/3.5.0.sql:268
  - thelia-templates/default-twig:_side_nav.html.twig:48
  - thelia-templates/default-twig:_side_nav.html.twig:69
  - thelia-templates/default-twig:company/list.html.twig:22
  - thelia-templates/default-twig:company/list.html.twig:101
  - thelia-templates/default-twig:company/view.html.twig:43
  - thelia-templates/default-twig:company/_infos.html.twig:30
  - thelia-templates/default-twig:company/_buyers.html.twig:89
  - thelia-templates/default-twig:company/_buyers.html.twig:110
  - thelia-templates/default-twig:company/_buyers.html.twig:142
  - thelia-templates/default-twig:company/_buyer_fields.html.twig:3
  - thelia-templates/default-twig:company/_addresses.html.twig
  - thelia-templates/default-twig:company/_orders.html.twig:9
  - thelia-templates/default-twig:configuration/index.html.twig:63
  - thelia-templates/default-twig:configuration/company-role/list.html.twig
  - thelia-templates/default-twig:company/_role_form.html.twig:25
  - thelia-templates/default-twig:customer/edit.html.twig:314
  - thelia-templates/default-twig:customer/list.html.twig:337
  - thelia-templates/default-twig:order/_company_card.html.twig:2
  - thelia-templates/default-twig:translations/messages.fr_FR.php:4006
  - thelia-templates/default-twig:translations/messages.fr_FR.php:4045
  - thelia-templates/default-twig:translations/messages.fr_FR.php:4120
  - thelia-templates/flexy:src/AccountMenu/CompanyAccountMenuItemProvider.php:32
  - thelia-templates/flexy:account-company.html.twig:28
  - thelia-templates/flexy:account-company-buyers.html.twig:22
  - thelia-templates/flexy:account-company-invitation.html.twig:14
  - thelia-templates/flexy:account-addresses.html.twig:40
  - thelia-templates/flexy:account-orders.html.twig:17
  - thelia-templates/flexy:components/Layouts/AccountCompanyBuyers/Base.html.twig:82
  - thelia-templates/flexy:translations/messages.fr_FR.yaml:774
  - thelia-templates/email:I18n/fr_FR.php
---

Une société regroupe plusieurs acheteurs d'une même entreprise : chacun se connecte avec son propre compte, a un rôle et, si vous le voulez, un plafond de dépense. Les commandes appartiennent à la société, quel que soit l'acheteur. Par exemple, une entreprise de bureautique dont trois collègues commandent chez vous.

**Avant de commencer :** les écrans **Sociétés** et **Rôles des acheteurs** demandent le droit sur les sociétés (`admin.company`) : sans lui, ils n'apparaissent pas. Côté boutique, ce tutoriel décrit le thème Flexy. Une boutique sans société fonctionne comme avant.

## Étape 1 : créer la société

1. Dans le menu de gauche, ouvrez **Clients**, puis cliquez sur **Sociétés**.
2. Cliquez sur **Ajouter une société**.
3. Dans la fenêtre **Créer une nouvelle société**, saisissez le **Nom** (par exemple Bureau Plus), puis le **SIRET** et le **Numéro de TVA** si vous les avez.
4. Cliquez sur **Créer**.

La fiche de la société s'ouvre avec quatre onglets : **Détails**, **Acheteurs**, **Adresses** et **Commandes**. Elle porte le badge **Actif**.

## Étape 2 : donner un premier acheteur à la société

Un acheteur est un compte client ordinaire, rattaché à une seule société. Deux façons de le rattacher.

1. Ouvrez l'onglet **Acheteurs**.
2. Pour un client qui a déjà un compte : dans **Rattacher un compte existant**, saisissez son adresse e-mail exacte ou sa référence, choisissez le **Rôle**, puis cliquez sur **Rattacher**. Un bout de nom ou d'adresse ne trouve rien.
3. Pour une personne sans compte : dans **Créer un acheteur**, saisissez le **Prénom**, le **Nom** et l'**Adresse e-mail**, choisissez le **Rôle**, puis cliquez sur **Créer l'acheteur**. Il choisira son mot de passe avec le lien de mot de passe perdu.

Choisissez **Administrateur de la société** pour le premier : c'est lui qui invitera ses collègues depuis son compte (étape 7). Un compte invité, sans mot de passe, ne peut pas rejoindre une société. Un client qui appartient déjà à une société est refusé.

## Étape 3 : comprendre les rôles

Le rôle dit ce qu'un acheteur peut faire. Trois rôles sont fournis et ne se modifient pas :

| Rôle | Ce qu'il permet |
|------|-----------------|
| **Administrateur de la société** | passer des commandes, voir ses commandes et celles de la société, gérer les adresses partagées, les acheteurs et la fiche de la société |
| **Acheteur** | passer des commandes et voir ses propres commandes |
| **Valideur** | voir ses commandes et celles de la société, sans en passer |

La permission **Valider des commandes** existe, mais cette version ne propose aucun écran de validation : le rôle **Valideur** sert pour l'instant à consulter. Une société garde toujours au moins un administrateur.

## Étape 4 : régler les plafonds de dépense

Sur l'onglet **Acheteurs**, chaque ligne a deux plafonds :

- **Plafond par commande** : le montant maximal d'une commande ;
- **Plafond par période**, avec la **Période** (**Semaine**, **Mois** ou **Année**) : le total maximal commandé sur la période.

1. Saisissez les montants, par exemple 500 par commande et 2000 par **Mois**.
2. Cliquez sur **Enregistrer** en bout de ligne.

Les montants sont TTC, livraison comprise, dans la devise par défaut. Laissez un champ vide pour ne pas plafonner. La période est le mois, la semaine ou l'année du calendrier, et les commandes annulées ou remboursées ne comptent pas.

Avec ces plafonds et 1800 déjà commandés ce mois-ci, une commande de 600 est refusée (plafond par commande), une de 300 aussi (plafond du mois), une de 150 passe. L'acheteur voit le refus au moment de commander. Deux commandes passées au même instant ne peuvent pas dépasser le plafond ensemble.

## Étape 5 : composer ses propres rôles

Si les trois rôles ne suffisent pas, créez le vôtre.

1. Dans le menu **Configuration**, ouvrez **Rôles des acheteurs**.
2. Cliquez sur **Ajouter un rôle**.
3. Saisissez un **Code** en minuscules, chiffres, points, tirets ou soulignés (il ne change plus ensuite), puis un **Titre**.
4. Cochez dans la colonne **Accordée** les permissions voulues : **Passer des commandes**, **Voir ses propres commandes**, **Voir les commandes de la société**, **Valider des commandes**, **Gérer les adresses partagées**, **Gérer les acheteurs de la société**, **Modifier la société**.
5. Cliquez sur **Enregistrer le rôle**.

Un changement de permissions s'applique tout de suite aux acheteurs qui ont ce rôle. Un rôle encore donné à un acheteur ne se supprime pas : donnez-lui d'abord un autre rôle. Pour un rôle réservé à une seule société, utilisez le bloc **Rôles de cette société** de son onglet **Acheteurs**.

## Étape 6 : partager des adresses et fixer l'adresse de facturation

Une adresse partagée est visible par tous les acheteurs de la société, qui peuvent la choisir à la commande. C'est l'acheteur qui la partage depuis son compte (voir [ce que voit l'acheteur](#ce-que-voit-lacheteur)). Vous les retrouvez sur l'onglet **Adresses** de la société.

L'adresse de facturation de la société remplace celle que l'acheteur a choisie : les factures sont établies à cette adresse, avec le nom, le SIRET et le numéro de TVA de la société.

1. Attendez qu'un acheteur ait partagé l'adresse de facturation.
2. Ouvrez l'onglet **Détails** de la société.
3. Dans **Adresse de facturation**, choisissez cette adresse. La liste ne propose que des adresses partagées.
4. Complétez si besoin la **Société mère** (un simple repère), l'**Adresse e-mail de notification**, qui reçoit une copie des e-mails de commande, et la **Note interne**, que la société ne voit jamais.
5. Cliquez sur **Enregistrer**.

Tant que la société n'a pas d'adresse de facturation, ses acheteurs ne peuvent pas commander : l'étape de commande leur dit pourquoi.

## Étape 7 : laisser l'administrateur inviter ses collègues

Vous pouvez tout faire depuis le back-office, mais l'administrateur de la société sait aussi inviter lui-même.

1. Connecté, il ouvre son compte puis **Ma société**, puis l'onglet **Acheteurs**.
2. Dans **Inviter un acheteur**, il saisit l'**Adresse e-mail**, choisit le **Rôle**, les plafonds si besoin, puis clique sur **Envoyer l'invitation**.

L'invité reçoit un e-mail avec un lien réservé à son adresse, valable sept jours et utilisable une fois. Sur la page **Rejoindre** suivie du nom de la société, il clique sur **Créer mon compte et rejoindre la société**, ou sur **Accepter l'invitation** s'il est déjà connecté avec ce compte. S'il a déjà un compte, un bouton **Se connecter** s'affiche d'abord.

L'administrateur ne peut pas donner un rôle ou des plafonds supérieurs aux siens. Sans plafond saisi, l'invité démarre avec les plafonds de l'administrateur. Au-delà de 20 invitations par heure pour une société, ou 10 par heure pour un même administrateur, l'envoi est refusé.

## Ce que voit l'acheteur

Dans son compte, un acheteur de société a une entrée **Ma société** dans le menu, juste après **Mes adresses**. Un client sans société ne l'a pas.

- **Informations de la société** : le nom, le numéro d'immatriculation, le numéro de TVA et l'adresse e-mail de copie. Il peut les modifier avec la permission **Modifier la société**. Une fois qu'une commande de la société a été passée sans TVA, ces deux numéros se changent en vous contactant.
- **Acheteurs** (permission **Gérer les acheteurs de la société**) : la liste avec rôles et plafonds, les boutons **Enregistrer** et **Retirer de la société**, et le formulaire d'invitation. Un acheteur qui a plus de droits que lui n'est pas modifiable.
- **Mes adresses** : deux groupes, **Mes adresses personnelles** et **Adresses de ma société**. En créant une adresse, la case **Partager cette adresse avec ma société** la rend visible des collègues, avec le badge **Partagée avec la société**. Seul son créateur, ou un acheteur autorisé à gérer les adresses partagées, la modifie.
- **Mes commandes** : un onglet **Commandes de la société** apparaît pour les rôles qui voient les commandes de la société, avec **Passée par** pour chaque commande.

Si vous suspendez la société, ses acheteurs restent connectés, un bandeau les prévient dans leur compte, et la commande leur est fermée.

## Étape 8 : suivre la société au back-office

1. Sur la fiche d'une société, l'onglet **Commandes** liste ses commandes, avec la colonne **Passée par**. La fiche d'une commande porte un encart **Entreprise**.
2. Sur la fiche d'un client, la section **Entreprise** donne sa société, son rôle et ses plafonds.
3. Dans la liste des **Clients**, filtrez par **Appartenance à une société** pour garder les clients rattachés ou non, et par société en cherchant son nom ou son SIRET.
4. Pour interrompre les commandes d'une société, ouvrez sa fiche et cliquez sur **Suspendre** ; **Réactiver** les rouvre. Ses acheteurs et son historique sont gardés.

Une société qui a des commandes ne se supprime pas : suspendez-la. Pour retirer un acheteur, cliquez sur **Détacher** sur l'onglet **Acheteurs** : il redevient un client ordinaire, et ses commandes restent à la société.

## Le résultat

La société apparaît dans **Clients**, **Sociétés** avec ses acheteurs, leurs rôles et leurs plafonds. Ses commandes sont rattachées à elle, facturées à son adresse de facturation, et chacune dit quel acheteur l'a passée. L'e-mail de commande part à l'acheteur, avec copie à l'adresse de notification de la société.
