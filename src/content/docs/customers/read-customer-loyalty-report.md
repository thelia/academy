---
title: Lire la fidélité de ses clients
description: Ouvrir le rapport Fidélité clients, lire les cohortes, la valeur vie et les segments de clients, régler le seuil de dormance et exporter ce qui est affiché.
sidebar:
  order: 20
thelia: '3.5.0'
verified: 2026-11-23
sources:
  - thelia-templates/default-twig:_side_nav.html.twig:107
  - thelia-templates/default-twig:_side_nav.html.twig:123
  - thelia-templates/default-twig:reports/customers.html.twig:43
  - thelia-templates/default-twig:reports/customers.html.twig:65
  - thelia-templates/default-twig:reports/customers.html.twig:71
  - thelia-templates/default-twig:reports/customers.html.twig:83
  - thelia-templates/default-twig:reports/customers.html.twig:92
  - thelia-templates/default-twig:reports/customers.html.twig:104
  - thelia-templates/default-twig:reports/customers.html.twig:116
  - thelia-templates/default-twig:reports/customers.html.twig:126
  - thelia-templates/default-twig:reports/customers.html.twig:132
  - thelia-templates/default-twig:reports/customers.html.twig:142
  - thelia-templates/default-twig:reports/customers.html.twig:149
  - thelia-templates/default-twig:reports/customers.html.twig:184
  - thelia-templates/default-twig:reports/customers.html.twig:242
  - thelia-templates/default-twig:reports/customers.html.twig:252
  - thelia-templates/default-twig:src/Controller/ReportsController.php:116
  - thelia-templates/default-twig:src/Controller/ReportsController.php:137
  - thelia-templates/default-twig:src/Service/Report/CustomerReportProvider.php:53
  - thelia-templates/default-twig:src/Service/Report/CustomerReportProvider.php:62
  - thelia-templates/default-twig:src/Service/Report/CustomerReportProvider.php:148
  - thelia-templates/default-twig:src/Service/Report/CustomerReportProvider.php:305
  - thelia-templates/default-twig:src/Service/Report/ReportScreen.php:74
  - thelia-templates/default-twig:translations/messages.fr_FR.php:3981
  - thelia-templates/default-twig:translations/messages.fr_FR.php:3988
  - thelia/thelia:core/lib/Thelia/Domain/Report/Customer/CustomerDormancy.php:29
  - thelia/thelia:core/lib/Thelia/Domain/Report/Customer/CustomerLifetimeCalculator.php:62
  - thelia/thelia:core/lib/Thelia/Domain/Report/Customer/CustomerLifetimeCalculator.php:180
  - thelia/thelia:core/lib/Thelia/Domain/Report/Customer/CustomerLifetimeCalculator.php:200
  - thelia/thelia:core/lib/Thelia/Domain/Report/Customer/CustomerLifetimeCalculator.php:268
  - thelia/thelia:core/lib/Thelia/Config/Resources/export.xml:28
  - thelia/thelia:setup/update/sql/3.5.0.sql:12
---

Le rapport Fidélité clients montre si vos clients reviennent : combien repassent commande, combien ils dépensent au fil du temps, et lesquels vous avez perdus. Il sert à juger l'effet d'une opération commerciale ou d'un site de plus en plus fréquenté.

**Avant de commencer :** la boutique a des commandes. Le menu et les trois onglets demandent le droit sur les clients (`admin.customer`) : sans lui, l'entrée n'est pas proposée. Le bouton **Exporter** demande le droit d'export, le lien vers le seuil de dormance le droit sur la configuration.

## Étape 1 : ouvrir le rapport

1. Dans le menu de gauche, cliquez sur **Rapports**.
2. Cliquez sur **Fidélité clients**.

L'écran s'ouvre sur l'onglet **Cohortes**. Les onglets **Valeur vie** et **Segments** sont à côté, puis **Meilleurs clients**, qui renvoie au rapport des ventes.

## Étape 2 : choisir les commandes comptées

Deux boutons règlent ce qui est compté :

- **Toutes les commandes** (réglage de départ) compte toutes les commandes, sauf les annulées et les remboursées ;
- **Commandes encaissées** ne compte que les commandes payées, en traitement ou expédiées.

1. Cliquez sur **Commandes encaissées** pour ne garder que l'argent réellement perçu.

Une phrase à côté des boutons rappelle ce qui est compté. Les montants sont du chiffre d'affaires TTC, pas de la marge. Un administrateur rattaché à certaines unités de vente ne voit que les commandes de ces unités.

## Étape 3 : lire les cohortes

Une cohorte regroupe les clients dont la première commande date du même mois. Par exemple, la cohorte de 2026-03 est faite des clients qui ont commandé pour la première fois en mars 2026.

1. Sur l'onglet **Cohortes**, choisissez **12 mois**, **24 mois** (réglage de départ) ou **36 mois** de premières commandes.
2. Si la boutique a peu de commandes, cliquez sur **Par trimestre** : une cohorte devient alors un trimestre. **Par mois** revient au réglage de départ.

Chaque ligne est une cohorte, avec son nombre de **Clients**. Chaque colonne compte le temps écoulé depuis la première commande : **M0** est le mois de la première commande, **M3** le troisième mois après. Par trimestre, les colonnes s'appellent **T0**, **T1**, et ainsi de suite.

Chaque case donne la part de la cohorte qui a commandé ce mois-là, et dessous le nombre de clients. **M0** vaut toujours 100 %. Plus la case est foncée, plus la part est forte. Un mois qui n'est pas encore arrivé reste vide.

Trois règles à connaître :

- un client est dans la cohorte de sa première commande, pas de son inscription : un compte qui n'a jamais commandé n'est dans aucune cohorte ;
- la première commande est cherchée dans tout l'historique : un client qui a commandé avant la première cohorte du tableau n'est dans aucune de ses cohortes ;
- un client anonymisé par la purge des données garde sa cohorte et ses montants.

## Étape 4 : lire la valeur vie

La valeur vie d'un client est ce qu'il a dépensé depuis sa première commande.

1. Cliquez sur l'onglet **Valeur vie**.

Quatre chiffres s'affichent en haut, pour les clients des cohortes du tableau :

| Chiffre | Sens |
|---------|------|
| **Valeur vie moyenne TTC** | ce qu'un client a dépensé en moyenne depuis sa première commande |
| **Durée de vie moyenne** | nombre de jours moyen entre la première et la dernière commande, 0 pour un client qui n'a commandé qu'une fois |
| **Taux de réachat** | part des clients qui ont commandé plus d'une fois |
| **Clients** | clients dont la première commande tombe dans le tableau |

Dessous, une ligne par cohorte donne ce que ses clients ont dépensé, par client, à la fin de chaque mois écoulé. Le montant ne baisse jamais d'un mois à l'autre. La colonne **Valeur vie** reprend le dernier mois arrivé. Les boutons **12 mois**, **24 mois**, **36 mois**, **Par mois** et **Par trimestre** valent aussi sur cet onglet.

## Étape 5 : lire les segments

Les segments rangent chaque client dans un groupe, selon sa dernière commande et la période choisie.

1. Cliquez sur l'onglet **Segments**.
2. Cliquez sur **Aujourd'hui**, **7 jours**, **30 jours**, **90 jours**, **Ce mois-ci** ou **Cette année**. Pour des dates précises, saisissez-les dans **De** et **à**, puis cliquez sur **Appliquer**.

Le tableau a quatre lignes :

| Segment | Clients |
|---------|---------|
| **Nouveaux clients** | première commande dans la période, dernière commande plus récente que le seuil de dormance |
| **Clients récurrents** | une commande dans la période et une avant, dernière commande plus récente que le seuil |
| **Clients pas encore dormants** | aucune commande dans la période, dernière commande plus récente que le seuil |
| **Clients dormants** | dernière commande plus ancienne que le seuil à la fin de la période |

Un client dormant l'est même s'il a commandé au début de la période : si sa dernière commande date de plus de 180 jours à la fin de la période, il est dormant. Chaque client qui a commandé jusqu'à la fin de la période est dans un seul segment.

Chaque ligne donne les **Clients**, le **CA de la période TTC** et sa **Part**, puis le **CA depuis la première commande TTC** et sa **Part**. Les deux parts totalisent 100 %.

## Étape 6 : régler le seuil de dormance

Le seuil est le nombre de jours sans commande après lesquels un client est dormant. Il vaut 180 jours au départ.

1. Sur l'onglet **Segments**, cliquez sur **Modifier le seuil (customer_dormant_after_days)**.
2. Dans la fenêtre qui s'ouvre, changez la valeur de la variable `customer_dormant_after_days`.
3. Enregistrez, puis revenez au rapport.

Une valeur qui n'est pas un nombre de jours positif est lue comme 180. Si votre profil n'a pas le droit sur la configuration, le lien n'apparaît pas.

## Étape 7 : voir les meilleurs clients

1. Cliquez sur **Meilleurs clients**.

Le rapport des ventes s'ouvre sur son onglet **Par client**, pour les mêmes jours que l'écran et sur les commandes encaissées. Ses totaux sont ceux de la liste des clients. Voir [Lire ses ventes par catégorie, produit et client](/orders/read-sales-reports/).

## Étape 8 : exporter

1. Cliquez sur **Exporter**.

Le navigateur télécharge un fichier CSV de l'onglet affiché, dans la même unité et sur les mêmes commandes que l'écran. Un tableur l'ouvre : un mois qui n'est pas encore arrivé est une case vide. Chaque rapport a aussi sa place dans la catégorie **Rapports** de l'écran d'export, et peut être envoyé par e-mail à date fixe : voir [Programmer l'envoi de rapports par e-mail](/orders/schedule-email-reports/).

## Le résultat

Vous lisez la fidélité de vos clients : la part de chaque cohorte qui revient, la valeur d'un client sur la durée et le nombre de clients à relancer avant qu'ils soient perdus. Le calcul peut prendre quelques secondes. L'écran garde ses chiffres 15 minutes, indique **Calculé à** l'heure du calcul, et **Recalculer** les refait. Une commande passée, modifiée ou supprimée les renouvelle d'elle-même.
