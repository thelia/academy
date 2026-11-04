---
title: Mettre en route l'IA de la boutique
description: Connecter un fournisseur d'IA, choisir ses modèles et débloquer les fonctions IA de vos modules depuis l'onglet Mise en route.
sidebar:
  order: 130
thelia: '3.3'
verified: 2026-11-04
sources:
  - thelia-templates/default-twig:src/Controller/Configuration/Ai/AiSetupController.php:51
  - thelia-templates/default-twig:src/Controller/Configuration/Ai/AiSetupController.php:87
  - thelia-templates/default-twig:src/Service/Configuration/Ai/AiSetupGuide.php:35
  - thelia-templates/default-twig:src/Service/Configuration/Ai/AiSetupGuide.php:41
  - thelia-templates/default-twig:src/Service/Configuration/Ai/AiSetupGuide.php:66
  - thelia-templates/default-twig:configuration/ai/setup/index.html.twig
  - thelia-templates/default-twig:configuration/ai/_tabs.html.twig:36
  - thelia-templates/default-twig:configuration/index.html.twig:78
  - thelia-templates/default-twig:translations/messages.fr_FR.php
---

Une fonction IA d'un module, par exemple un assistant qui répond à vos visiteurs, ne tourne que si trois choses sont en place. L'onglet **Mise en route** les réunit sur une seule page et vous dit, fonction par fonction, ce qui manque.

**Avant de commencer :** il vous faut un compte administrateur, un compte chez un fournisseur d'IA et la clé qu'il vous a remise. Votre boutique paie ce fournisseur directement.

## Étape 1 : connecter un fournisseur

1. Dans le menu à gauche, cliquez sur **Configuration**.
2. Dans le groupe **Système**, cliquez sur **Intelligence artificielle**.
3. Cliquez sur l'onglet **Mise en route**.
4. Dans **Connecter un fournisseur d'IA**, choisissez le fournisseur dans la liste **Fournisseur**. La liste propose Mistral AI, Anthropic et OpenAI, avec l'indication de leur lieu d'hébergement.
5. Collez la clé dans **Clé d'API**.
6. Cliquez sur **Enregistrer et tester**.

La clé est enregistrée chiffrée et n'est plus jamais affichée. Un autre fournisseur (Scaleway, OVHcloud, votre propre serveur) se règle par le lien **Réglages avancés**.

Le test envoie une vraie demande au fournisseur. S'il réussit, un message le confirme et la connexion affiche **Réussi le** suivi de la date.

S'il échoue, la connexion est tout de même enregistrée. La page explique la raison du refus, puis vous invite à saisir la clé de nouveau pour la remplacer. Le bouton **Tester à nouveau** rejoue le test. Si vous enchaînez trop de tests, la page demande d'attendre quelques minutes.

## Étape 2 : choisir un modèle par gamme

Un modèle est le programme d'IA qui répond. Une fonction ne demande jamais un modèle précis, elle demande une gamme : rapide et économique, standard ou avancée. Vous choisissez ici, une fois, le modèle de chaque gamme. Si vous le changez plus tard, toutes les fonctions suivent.

1. Dans chaque ligne de gamme, regardez la liste **Utilisée par** : elle nomme les fonctions qui s'appuient sur cette gamme.
2. Ouvrez la liste de la gamme et choisissez un modèle.
3. Cliquez sur **Utiliser ces modèles**.

Seules les gammes qu'une fonction utilise sont à remplir. Les autres sont rangées dans le bloc **Facultatif : les gammes qu'aucune fonction n'utilise encore**.

Pour Mistral AI, Anthropic et OpenAI, la page présélectionne un modèle par gamme et l'indique par **Modèle suggéré pour cette gamme. Rien n'est enregistré tant que vous ne validez pas.** Rien n'est écrit avant votre clic sur **Utiliser ces modèles**.

Tant qu'aucun fournisseur n'est connecté, cette étape demande de le faire d'abord.

## Étape 3 : débloquer les fonctions de vos modules

Chaque fonction affiche **Prête** ou **À terminer**. Quand elle est à terminer, la ligne dit ce qui manque :

- **L'IA est coupée pour toute la boutique** : cliquez sur **Autoriser de nouveau l'IA dans la boutique**.
- **Aucun modèle ne sert encore cette fonction** : choisissez un modèle pour sa gamme à l'étape 2. Le lien **Aller à l'étape 2** y mène.
- **La connexion « … » a échoué à son dernier test** : corrigez la clé à l'étape 1. Le lien **Aller à l'étape 1** y mène.
- **Vous avez coupé cette fonction** : le lien **Ouvrir la fonction pour la rallumer** ouvre son réglage. Elle ne compte pas comme bloquée.
- **Un budget mensuel manque** : une fonction qui s'adresse à vos visiteurs ne démarre pas sans budget.

Pour le budget, saisissez un montant en dollars US supérieur à zéro, par exemple 10, dans **Budget mensuel (dollars US)**, puis cliquez sur **Enregistrer**. Quand le mois a consommé ce montant, la fonction s'arrête jusqu'au mois suivant : vous ne payez rien de plus.

Si un module vous renvoie vers cette page depuis un bouton, la ligne de la fonction concernée est surlignée.

## Le résultat

En haut de la page, la barre indique **3 sur 3 étapes terminées** et le message **Tout est prêt : vos fonctions IA peuvent fonctionner.** s'affiche. Tant qu'une fonction ne peut pas tourner, un bandeau sur les autres onglets de l'IA le signale, avec le lien **Voir la mise en route**.
