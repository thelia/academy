---
translatedFrom: '111c914da48d'
title: Refund an order's payment
description: Give a customer back all or part of what they paid from the order page, or record a refund made by cheque or bank transfer.
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

This page shows how to give money back to a customer from their order page, without going through your bank's own space. The refund is dated and kept in the payment journal, with its reason.

**Before you start:** a paid order, and an administrator account that has the right to refund (step 4). For the money to go back through the payment provider, the order's payment module must be able to refund. Otherwise, this page also explains how to record a refund made another way.

## Step 1: open the Payment card

1. In the left-hand menu, click **Orders**, then open the order.
2. In the right-hand column, find the **Payment** card.
3. Read **Refunded** and **Left to refund**: the total already given back and what can still be given back.

What is left to refund is what was collected, minus what was already refunded. It is read in the payment journal (see [Follow an order's payments](/en/orders/payment-journal/)), not in the order total.

## Step 2: refund through the provider

When the payment module can refund, the button is called **Refund**.

1. Click **Refund**.
2. In the window, check **Collected**, **Refunded** and **Left to refund**.
3. In **Amount to refund**, keep the proposed amount to give everything back, or enter a smaller amount for a partial refund.
4. In **Reason**, choose why: **Goods returned**, **Goods missing or damaged**, **Commercial gesture**, **Order cancelled** or **Other reason**.
5. Write a **Comment (optional)** of 255 characters at most if you need one.
6. Click **Refund now**.

The shop refuses a zero amount, a negative amount, or one above what is left to refund. Some providers give a payment back in full only, as long as it has not yet been passed on to the bank. The window says so (**For now the provider gives this payment back in full only.**) and the amount cannot be edited.

If you click twice, only one refund goes out: the button locks when you submit. The shop also refuses to refund the same amount twice within a minute.

## Step 3: record a refund made another way

When the payment module cannot refund, for example for a payment by cheque or bank transfer, the button is called **Record a refund**.

1. First make the refund by whatever means you choose (bank transfer, new cheque).
2. Click **Record a refund**. A warning reminds you that no money is sent.
3. Enter the amount, the reason and a comment if you wish, as in step 2.
4. Click **Record the refund**.

The journal line is called **Refund made outside the provider**. It counts in the refunded total, like a refund made by the provider.

## Step 4: grant the right to refund

Refunding is a right of its own, **Order payment refund**. After the update to 3.5, no profile has it: only the super-administrator can refund. Add this right, with create access, to the profiles that need to refund.

Without this right, an administrator sees the totals but not the button, and the request is refused.

## What happens next

- **Refund accepted.** A message shows the amount, and the provider's reference if there is one. For a refund recorded by hand, the message gives the amount alone. The line appears in the journal.
- **Partial refund.** The order stays **Paid**. **Left to refund** goes down by the amount given back.
- **Everything collected given back.** A **Paid** order becomes **Refunded**. If an action that emails the customer is set on that status, it runs as it does for any status change.
- **Provider refusal or no answer.** No success message appears. The journal line is **Failed** or **Pending**, and the order does not change.

## The result

The order's **Payment** card shows the refunded amount and what is left to refund. The journal keeps one line per refund. A fully refunded order has the status **Refunded**.
