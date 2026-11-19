---
translatedFrom: '8346de6d289d'
title: Grant a credit note and let customers spend it
description: Create a credit note from an invoiced order, choose how the customer can spend it, and know what happens when they pay an order with it.
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

A credit note is an amount the store owes a customer, for example after a returned product or a billing error. The customer can spend it on a later order, in one go or over several purchases.

**Before you start:** you need the CreditNote module, version 5.0 or later, installed and active (see [Manage modules](/en/settings/manage-modules/)), the Flexy theme on the storefront, and the right on orders and on the module in your administrator profile.

## Step 1: open the order

A credit note is usually created from an order that has already been invoiced.

1. In the left menu, click **Orders**, then open the order.
2. Click the **Credit note** tab.
3. Click **Add a new credit note**.

An order that was never invoiced is refused, with the message "You can not create a credit note for this order because it is not invoiced".

All credit notes are also listed in the **Credit Notes** menu, shown below **Orders**.

## Step 2: fill in the credit note

A window opens.

1. Choose the **Type** of the credit note, for example **Product return**.
2. Enter the products refunded and their **Quantity**.
3. For a commercial gesture that does not refund a product, add a **Free amount**.
4. If needed, write an **Internal comment**, which the customer does not see.

The credit notes of an order cannot exceed the total of that order, postage and discount included. A product cannot be refunded more times than it was ordered, either. If you grant gestures beyond the order, turn the limit off in the module settings.

## Step 3: choose how the customer spends it

The **Use :** field offers two choices.

- **Usable in several purchases**: the customer spends the credit note over several purchases. What is not used stays on the credit note.
- **Usable in a single purchase, for its whole balance**: the credit note pays one purchase, for its whole amount.

A single-purchase credit note is refused on a cart worth less than it. Choose this setting before the first use: once an order has been paid with the credit note, it can no longer be changed.

## Step 4: accept the credit note

1. Set the status of the credit note to **Accepted**.
2. Click **Create credit note**.

An accepted credit note gets an accounting number and a PDF document. A proposed or refused credit note stays a draft: the customer does not see it and cannot spend it.

The **Balance** column of the list shows what is left to spend on each accepted credit note.

## What the customer does

The customer finds their credit notes in their account, with their balance, and can download the document.

On the payment step, a block lists the credit notes that still have a balance. The customer ticks the ones to use, and the page shows the amount paid and what is left to pay.

- Several credit notes can pay the same order. Single-purchase ones are spent first, then the others, oldest first.
- If the credit notes cover the whole order, no other payment method is asked for.
- Otherwise, the customer chooses a payment method for the rest. That method must be able to charge a balance: the Stripe card payment module can, from its version 6.
- A credit note never pays more than the order. The surplus stays on the credit note.

Paying with a credit note is a payment, not a discount: the invoice keeps its full total.

## What to know

- A credit note can only be used in its own currency. It is not offered on an order in another currency.
- If a customer put a credit note in their cart and it is spent elsewhere or is no longer accepted, it is taken off the cart and the customer is told.
- If the credit notes of the cart changed while the customer was on the payment step, the order is refused once. They come back to the payment step, read the new amounts and confirm again.
- Cancelling an order paid with a credit note gives the credit note back. Refunding it does not: if needed, create a new credit note.
- A customer group limited to certain payment methods must have CreditNote in its list to use its credit notes.
- The PDF invoice of an order paid with credit notes prints, under its total, one line per credit note with the amount it paid, then the balance the other payment method charged. This needs version 1.4.2 of the PDF theme, or a later one.

## The result

The credit note appears in the **Credit Notes** list with its balance, and in the customer's account. An order paid with it shows it under its lines, with the amount each credit note paid.
