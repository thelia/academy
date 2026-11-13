---
translatedFrom: 'ead27c3438bd'
title: Sell by pack, with a minimum or by measure
description: Require a minimum quantity, sell by packs of 6 or by weight, and show the unit and the price per litre or per kilo.
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

By default, a customer orders any number of units. You can set a rule for each combination: a minimum quantity, sale by pack, or sale by weight or measure.

A combination is a variant of the product, for example a volume. Examples: glasses sold by 6, a paint with a minimum of 3 tins, a fabric sold by the metre, a cheese sold by the kilo.

**Before you start:** the product exists. See [Create a product](/en/catalog/create-product/) and [Set the price, VAT and stock of a product](/en/catalog/set-price-stock/). A shop that is updated does not change until you set something: the starting values are a minimum of 1, sold by 1, no decimals and no unit.

## Step 1: show the quantity settings

1. In the left menu, click **Catalog**, then **Products**.
2. Open the product.
3. Click the **Combinations** tab.
4. Turn on the **Sold by measure, by pack or from a minimum** switch.

The switch is already on if a combination has a rule. A rule icon then appears on each combination row.

5. On the combination row, click the rule icon (its tooltip reads **Quantity rules and units**).

For a product with no combination, the same **Quantity rules and units** block appears under the product fields, in the **Combinations** tab.

## Step 2: sell by pack or from a minimum

1. In **Minimum quantity**, enter the smallest quantity a customer can order, for example `6`.
2. In **Sold by**, enter the selling step, for example `6`. Every quantity is then a multiple of that number: 6, 12, 18.
3. Leave **Decimals of a quantity** on **0, sold by the piece**.
4. Save with the **Save changes** button.

For a minimum only, enter `3` in **Minimum quantity** and leave **Sold by** at `1`: the customer can order 3, 4, 5 and more.

If the minimum quantity is not a multiple of the step, the shop starts at the first multiple above it. With a minimum of 4 and a step of 6, the smallest quantity is 6.

The minimum and the step must be greater than zero. If one of them is zero, or has more decimals than the combination accepts, saving is refused and the message names the combination.

## Step 3: sell by measure

A sale by measure accepts quantities with decimals, for example 4.25 kg.

1. In **Decimals of a quantity**, choose **1, sold by measure**, **2, sold by measure** or **3, sold by measure**. Three decimals at most, for example 2 for quantities to the hundredth.
2. In **Unit**, choose the unit: piece, kilogram, gram, litre, millilitre, metre, centimetre, square metre or cubic metre. **No unit** writes the quantity without a unit.
3. In **Sold by**, enter the step, for example `0.25`.
4. In **Minimum quantity**, enter the minimum, for example `0.5`.
5. Save.

The step and the minimum cannot have more decimals than the **Decimals of a quantity** setting. With 2 decimals, `0.25` is accepted and `0.125` is refused.

## Step 4: show the price per litre or per kilo

The price per reference unit lets customers compare different pack sizes. A 75 cl bottle at 9.99 shows 13.32 € / l.

1. Choose the **Unit** of the combination, here litre.
2. In **Content of one unit sold**, enter what one unit holds, here `0.75`.
3. In **Price shown per**, enter the reference quantity, here `1`. When empty, the field counts as 1.

The **Price per reference unit, incl. tax** line shows the result, calculated with the tax and the current promotion. It shows a dash until the calculation has what it needs.

To give the same settings to every combination of the product, click **Apply these settings to every combination and save**.

## What the customer sees

- On the product page, the quantity starts at the minimum. A pack is chosen from a list (6, 12, 18). A quantity sold by measure moves by step, with its decimals and its unit.
- The price per reference unit appears under the price, on the product page and on product cards.
- In the cart, the plus and minus buttons change the quantity by one step. The customer can type `1,5` or `1.5`.
- A quantity that breaks the rule is refused, with the list of allowed quantities.
- The cart, the order summary, the customer account, the order e-mails, the invoice, the delivery note and the return document write "1.25 kg" for a sale by measure. A sale by the piece stays written "1".

When you change a rule, a cart that is already filled is corrected the next time it is read: a line outside the rule goes down to the valid quantity below it, or disappears. The customer is told, and the checkout stops once so they see the new quantities before paying.

The order keeps the unit and the decimals of the time of purchase: an invoice always reads "1.25 kg", even if the rule changes later.

## What this feature does not do

- It sets no maximum quantity per line, and no rule per customer or customer group.
- The quick order and the purchase lists do not accept decimals: a combination sold by measure is ordered from its product page.
- The components of a bundle keep their raw quantity on PDF documents.

## The result

Each combination sells by its rule: minimum, pack or measure. The customer sees the unit and the price per litre or per kilo, and your invoice writes the quantity as you sold it.
