---
translatedFrom: cbc4fd14061e
title: Put a product online or offline
description: Hide a product from your customers without deleting it, or make it visible again.
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

An offline product stays in your catalog, but your customers can no longer open its page. This is useful for a product that is out of stock, seasonal, or whose page is not finished. Nothing is deleted: you put it back online whenever you want.

**Before you start:** you need an existing product (see [Create a product](/en/catalog/create-product/)).

## Method 1: from the product list

1. In the left menu, click **Catalog**, then **Products**.
2. Find the **Online** column. A green dot with a check mark means the product is online. An empty gray circle means it is offline.
3. Click the dot in the product's line.

![Online column of the product list](../../../../assets/captures/en/catalog/publish-product/list.png)

The change is immediate: there is no confirmation and no **Save** button. To undo it, click the dot again.

In this screenshot, the product **TAB-CHENE-01**, created for this example, is offline: its dot is an empty gray circle. The list shows titles in the store's default language, here English.

![An offline product in the list, with its gray circle](../../../../assets/captures/en/catalog/publish-product/offline.png)

## Method 2: from the product page

1. In the list, click the product title to open its page.
2. In the **General** tab, find the **This product is online** box, on the right.
3. Tick the box to put the product online, untick it to put it offline.
4. Click **Save**.

![This product is online box on the product page](../../../../assets/captures/en/catalog/publish-product/card.png)

Here, nothing changes until you click **Save**.

## Method 3: several products at once

1. In the product list, tick the box at the start of each line concerned.
2. A bar appears above the table with the number of selected products.
3. Open the **Bulk actions** list.
4. Choose **Put online** or **Take offline**. The change applies as soon as you choose, without confirmation.

![Bulk actions bar, two products selected](../../../../assets/captures/en/catalog/publish-product/bulk.png)

To drop the selection, click **Clear selection**.

## What the customer sees

When a product is offline, it no longer appears in the store's category pages or search results. A customer who opens the address of its page sees a "page not found" error (404) instead of the product.

## The result

Under **Catalog**, **Products**, the **Online** column shows a green dot for a visible product and a gray circle for a hidden one. The product has not left the catalog: its page, price and stock are untouched.
