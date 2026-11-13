---
translatedFrom: '2ebe8fa86cae'
title: Create price lists and assortments
description: Give a customer group or a customer their own prices, reserve part of the catalog for them and choose who sees the prices.
sidebar:
  order: 330
thelia: '3.4'
verified: 2026-11-13
sources:
  - thelia-templates/default-twig:_side_nav.html.twig:156
  - thelia-templates/default-twig:pricing/price-list/list.html.twig
  - thelia-templates/default-twig:pricing/price-list/view.html.twig
  - thelia-templates/default-twig:pricing/price-list/_lines.html.twig
  - thelia-templates/default-twig:pricing/price-list/_assignments.html.twig
  - thelia-templates/default-twig:pricing/price-list/import.html.twig
  - thelia-templates/default-twig:pricing/catalog-restriction/list.html.twig
  - thelia-templates/default-twig:pricing/catalog-restriction/new.html.twig
  - thelia-templates/default-twig:catalog/product/_price_display_mode.html.twig
  - thelia-templates/default-twig:catalog/product/_effective_prices.html.twig
  - thelia-templates/default-twig:src/Form/Pricing/PriceListType.php
  - thelia-templates/default-twig:src/Form/Configuration/ConfigStoreType.php:226
  - thelia-templates/default-twig:translations/messages.fr_FR.php:3420
  - thelia-templates/flexy:components/Molecules/PriceBlock/Base.html.twig
  - thelia-templates/flexy:translations/messages.fr_FR.yaml:705
  - thelia/thelia:CHANGELOG.md:109
  - thelia/thelia:CHANGELOG.md:111
  - thelia/thelia:CHANGELOG.md:112
  - thelia/thelia:CHANGELOG.md:113
  - thelia/thelia:CHANGELOG.md:117
  - thelia/thelia:CHANGELOG.md:118
---

A price list gives a customer group, or a single customer, negotiated prices. An assortment reserves part of the catalog for the people who are entitled to it. This is useful for selling to businesses: each one sees their own catalog at their own prices.

Example: a "Resellers" list with product A at 50 and product B at 60, assigned to the resellers group.

**Before you start:** the products and their combinations exist, with a reference (see [Create a product](/en/catalog/create-product/)). The customer groups exist (see [Create customer groups](/en/customers/customer-groups/)). A shop that is updated does not change until you create a list or an assortment rule, and as long as the price display stays on **Visible**.

A combination is a variant of the product, for example a volume.

## How the shop picks a price

A customer can be covered by several lists. The shop looks them up by priority, the smallest number first. At equal priority, the list assigned to the customer comes before the list of their group.

The first list that has a line for the combination and the quantity ordered sets the price. That price is final: no group price, group discount, catalog price rule, reserved sale or customer discount is added on top.

Example: a group list (priority 30) gives 50 for A and 60 for B. A customer list (priority 10) gives 45 for A. The customer pays 45 for A, 60 for B and the catalog price for everything else.

## Step 1: create the list

1. In the left menu, click **Prices and assortments**, then **Price lists**.
2. Click **Add a price list**.
3. In **Code**, enter a name without spaces, for example `resellers`. Letters, digits, dots, dashes and underscores are accepted.
4. In **Title**, enter a readable name, for example `Resellers`.
5. In **Currency**, choose the currency of the prices. It can no longer change once the list has lines.
6. In **Priority**, enter a number. The smallest is looked up first. The starting value is `100`.
7. In **Starts at** and **Ends at**, enter a validity period, or leave them empty for a list with no limit.
8. Tick **Exclusive** to limit purchases to the products of the list (see the section below).
9. Leave **Active** ticked. A list that is turned off applies to nobody.
10. Click **Create**.

A list in another currency than the one the customer is browsing prices nothing.

### Exclusive list

With an exclusive list, the customer can buy only the combinations it contains. The others stay visible at the catalog price, but cannot be added to the cart. If a list of higher rank prices the combination, it stays purchasable.

## Step 2: add the lines

A line gives, for a combination and a minimum quantity, a price or a discount.

1. Open the list, then the **Lines** tab.
2. In **Add a line**, enter the reference of the combination in **Reference of the combination**, for example `TSHIRT-M`.
3. In **Minimum quantity**, enter a whole number, `1` or more.
4. Enter either a **Price (excl. taxes)** or a **Discount (%)** on the catalog price. Never both.
5. Click the add button.

For a volume price, add several lines for the same combination: `1` at 50, `10` at 45, `50` at 40. The shop keeps the line whose minimum quantity is the greatest without exceeding the quantity ordered. The cart takes the price of each line again when the quantity changes.

The same combination with the same minimum quantity can appear only once.

### Import the lines from a file

For a long list, import a CSV file of 5 MB at most.

1. In the **Lines** tab, find **Import lines from a CSV file**.
2. Prepare a file with the columns `pse_ref` (or `pse_id`), `min_quantity`, and `price` or `discount_percent`.
3. Choose the file, then click **Preview the import**.
4. Read the figures: **Lines to create**, **Lines to update**, **Lines refused**, with the reason for each refusal and its line number in the file.
5. Click **Confirm the import**, or **Abandon**.

Nothing is written before you confirm.

## Step 3: assign the list

1. Open the list, then the **Assignments** tab.
2. For a group: in **Groups the list is assigned to**, select one or more groups (Ctrl or Cmd + click to pick several), then click **Save the groups**. Every customer of the group gets the list.
3. For a customer: in **Find a customer (name, e-mail or reference)**, enter at least 3 characters, click **Search**, then click **Assign** next to the right customer.

To remove an assignment, click **Remove** next to the customer, or deselect the group and save. The list of customers appears only if your administrator account may view customers.

## Step 4: reserve part of the catalog

An assortment rule opens or closes a category, a brand or a product for a group or a customer.

1. In the left menu, click **Prices and assortments**, then **Assortments**.
2. Click **Add a rule**.
3. In **Who the rule applies to**, choose **Customer groups** (one rule is created per group) or **A customer**.
4. In **What the rule is about**, choose **A category and its sub-categories**, **A brand** or **A product**, then the target.
5. In **Which way**, choose **Deny** or **Allow**.
6. Click **Update the summary**, check it, then click **Create the rule**.

The rules read as follows:

- **Deny** closes the target. It always wins over an allow rule.
- **Allow** opens the target. As soon as a customer has an **Allow** rule, everything that no allow rule opens is closed to them.
- A product with no category is closed, unless it or its brand is allowed.
- The rules add to the category list of a restricted group: a product is visible when both open it.

A closed product appears in no list, no search and no sitemap. Its address shows a page not found. It cannot be added to the cart.

To see how many products a group or a customer is left with, use the **Products left visible** block on the same page, then **Count**.

## Step 5: choose who sees the prices

The price display is set for the whole shop, then overridden product by product.

1. In the left menu, click **Configuration**.
2. In the **System** block, click **Store info**.
3. In the **Prices** card, choose **Display of the prices**:
   - **Visible**: every visitor sees the prices and may buy.
   - **Identified customers only**: a visitor sees no price and is asked to sign in.
   - **On request**: nobody sees a price, a price request is offered instead.
4. Save.

For a single product, open it, click the **Combinations** tab, find **Display of the prices**, choose an option in **Display for this product** and save. **Like the shop** follows the general setting.

In the two modes that hide the price, the product shows no price and no buy button, and adding it to the cart is refused even by a direct call. In **On request** mode, a price request button leads to the contact form, filled in with the product reference. Sorting and filtering by price do not reveal hidden prices.

## Step 6: check what a customer sees

1. Open a product, then the **Combinations** tab.
2. In **Effective prices**, enter at least 3 characters of a customer's name, e-mail or reference, then click **Search**. For a visitor who is not signed in, click **See what a visitor pays**.

The table gives, for each combination: the price kept (excluding taxes), its **Source** (list, rule or catalog price), whether it can be bought (**Can be bought**), and its **Tiers**. This block appears only if your account may view prices and customers.

## What the customer sees

- On the product page, the customer sees their price and, when the price changes with the quantity, the **Price by quantity** list ("From 10: ...").
- A visitor of a shop in **Identified customers only** mode reads "Log in to see the prices" with a sign-in button. In **On request** mode, the visitor reads "Price on request" with the **Request a price** button.
- A customer whose list is exclusive sees the other products marked "Not available for purchase", with no add button.
- When a list is turned off, or when a visitor signs in and has a list, the cart is priced again before payment.

## What this feature does not do

- A list is not assigned to a company: only to a group or to a customer.
- The quick order without a cart and the shopping lists pick the tier from the typed quantity alone.
- A cart line keeps the trace of a deleted list until the cart is used or purged.

## The result

Each customer sees the catalog and the prices reserved for them. You check the result in **Effective prices**, product by product.
