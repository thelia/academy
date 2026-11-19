---
translatedFrom: '90b2ad70cba4'
title: Clear the store cache
description: Use the three buttons of the Advanced configuration page and know what each one clears.
sidebar:
  order: 120
thelia: '3.4'
verified: 2026-11-19
sources:
  - capture:settings/clear-cache
  - thelia-templates/default-twig:src/Controller/Configuration/AdvancedConfigurationController.php:59
  - thelia-templates/default-twig:src/Controller/Configuration/AdvancedConfigurationController.php:69
  - thelia-templates/default-twig:src/Controller/Configuration/AdvancedConfigurationController.php:75
  - thelia-templates/default-twig:src/Controller/Configuration/AdvancedConfigurationController.php:85
  - thelia-templates/default-twig:src/Controller/Configuration/AdvancedConfigurationController.php:95
  - thelia-templates/default-twig:src/Controller/Configuration/AdvancedConfigurationController.php:139
  - thelia-templates/default-twig:configuration/advanced/index.html.twig
  - thelia-templates/default-twig:configuration/index.html.twig:81
  - thelia-templates/default-twig:translations/messages.fr_FR.php
  - thelia/thelia:core/lib/Thelia/Action/Cache.php:136
  - thelia/thelia:core/lib/Thelia/Action/Image.php:133
  - thelia/thelia:core/lib/Thelia/Action/Document.php:82
  - thelia/thelia:core/lib/Thelia/Core/EventListener/DeletedMediaCopiesListener.php:26
  - thelia/thelia:core/lib/Thelia/Core/Template/Assets/AssetManager.php:194
  - thelia-templates/default-twig:config/packages/asset_mapper.yaml:1
  - thelia-templates/flexy:docs/stimulus-and-assets.md:209
  - thelia-templates/flexy:components/Organisms/ProductCard/Base.html.twig:48
---

The cache is a copy of pages and files that the store keeps aside to display faster. When you change something, the old copy can stay on screen: clearing the cache deletes it, and the store rebuilds it on demand.

**Before you start:** you need an administrator account.

## Step 1: open the page

1. In the left menu, click **Configuration**.
2. In the **System** group, click **Advanced configuration**.

![The three flush buttons of Advanced configuration](../../../../assets/captures/en/settings/clear-cache/buttons.png)

The page offers three cards, each with its own button.

## Step 2: choose the right button

- **Flush cache** (card **Application cache**): deletes the application's cache directory. The card text says what it covers: templates, container, routing. A confirmation window warns that the next pages load more slowly while the cache is rebuilt.
- **Flush assets** (card **Module and theme assets**): deletes the copies of the module and theme assets, kept in the `frontOffice`, `backOffice`, `pdf` and `email` folders of `public/assets`. The confirmation window says so: **Flush the copies of the module and theme assets? The compiled assets are kept.** These copies are made again when a page needs them.
- **Flush images/documents** (card **Images and documents**): deletes the copies of images and documents already generated, by default in `public/cache/images` and `public/cache/documents`. The original files are kept, as the confirmation window says. The copies are regenerated the next time they are displayed.

Only use **Flush assets** if the person who looks after your site asks you to.

The compiled assets, that is the styles and scripts prepared at launch for the store and the back office, are kept: this button does not delete them.

## Step 3: flush

1. Click the button you chose.
2. In the confirmation window, click the button with the same label.

When you return to the page, a message shows the result: **Application cache cleared.**, **Web assets cache cleared.** or **Images and documents cache cleared.** An error message appears instead if the flush fails.

## When to use it

When a theme change made by the person who looks after your site does not show up, try **Flush cache** first. For an image or a document that does not update, try **Flush images/documents**. This button does not touch the thumbnails in the `public/media/cache` folder, such as those of the store's product cards. In both cases, reload the store page in your browser afterwards.

Do not flush after every change: after a flush, pages are slower until the cache is rebuilt.

## The result

You know which button clears what, and which one to try first. After a flush, the confirmation message appears at the top of the page. The cache and the image copies are rebuilt as visitors browse.
