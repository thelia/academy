---
translatedFrom: 8b3e2ead31fe
title: Set up AI for your store
description: Connect an AI provider, choose its models and unblock the AI features of your modules from the Getting started tab.
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

An AI feature of a module, for example an assistant that answers your visitors, only runs when three things are in place. The **Getting started** tab brings them together on one page and tells you, feature by feature, what is missing.

**Before you start:** you need an administrator account, an account with an AI provider and the key it gave you. Your store pays this provider directly.

## Step 1: connect a provider

1. In the left menu, click **Configuration**.
2. In the **System** group, click **Artificial intelligence**.
3. Click the **Getting started** tab.
4. In **Connect an AI provider**, pick the provider in the **Provider** list. The list offers Mistral AI, Anthropic and OpenAI, with where each one hosts your data.
5. Paste the key in **API key**.
6. Click **Save and test**.

The key is stored encrypted and is never shown again. Another provider (Scaleway, OVHcloud, your own server) is set up from the **Advanced settings** link.

The test sends a real request to the provider. If it works, a message says so and the connection shows **Worked on** followed by the date.

If it fails, the connection is still saved. The page explains why the provider refused it, then asks you to type the key again to replace it. The **Test it again** button replays the test. If you run too many tests in a row, the page asks you to wait a few minutes.

## Step 2: choose a model for each range

A model is the AI program that answers. A feature never asks for a precise model, it asks for a range: fast and economical, standard or advanced. You choose, once, the model of each range. If you change it later, every feature follows.

1. In each range, look at the **Used by:** list: it names the features that rely on this range.
2. Open the range's list and choose a model.
3. Click **Use these models**.

Only the ranges that a feature uses have to be filled in. The others are kept in the **Optional: the ranges no feature uses yet** block.

For Mistral AI, Anthropic and OpenAI, the page preselects one model per range and says so with **Suggested for this range. Nothing is saved until you confirm.** Nothing is written before you click **Use these models**.

While no provider is connected, this step asks you to connect one first.

## Step 3: unblock the features of your modules

Each feature shows **Ready** or **To finish**. When it is to finish, its line says what is missing:

- **AI is switched off for the whole shop**: click **Allow AI in the shop again**.
- **No model serves this feature yet**: choose a model for its range in step 2. The **Go to step 2** link takes you there.
- **The connection "…" failed its last test**: fix the key in step 1. The **Go to step 1** link takes you there.
- **You switched this feature off**: the **Open the feature to switch it back on** link opens its settings. It is not counted as blocked.
- **A monthly budget is missing**: a feature that talks to your visitors does not start without one.

For the budget, enter an amount in US dollars above zero, for example 10, in **Monthly budget (US dollars)**, then click **Save**. When the month has used this amount, the feature stops until the next month: you pay nothing more.

If a module sends you to this page from a button, the line of the feature concerned is highlighted.

## The result

At the top of the page, the bar shows **3 of 3 steps done** and the message **Everything is ready: your AI features can run.** appears. While a feature cannot run, a banner on the other AI tabs says so, with the **See the getting started page** link.
