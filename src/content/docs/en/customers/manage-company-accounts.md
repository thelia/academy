---
translatedFrom: '6701baf56c13'
title: Manage the company accounts of your business customers
description: Create a company, attach or invite buyers, set their roles and spending limits, share addresses, and see what the buyer finds in their account.
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

A company groups several buyers of the same business: each one signs in with their own account, has a role and, if you want, a spending limit. Orders belong to the company, whoever placed them. For example, an office supplies business whose three colleagues order from you.

**Before you start:** the **Companies** and **Buyer roles** screens need the right on companies (`admin.company`): without it they do not appear. On the storefront side, this tutorial describes the Flexy theme. A shop without any company works as before.

## Step 1: create the company

1. In the left menu, open **Customers**, then click **Companies**.
2. Click **Add a company**.
3. In the **Create a new company** window, type the **Name** (for example Bureau Plus), then the **SIRET** and the **VAT number** if you have them.
4. Click **Create**.

The company sheet opens with four tabs: **Details**, **Buyers**, **Addresses** and **Orders**. It carries the **Active** badge.

## Step 2: give the company a first buyer

A buyer is an ordinary customer account, attached to one company only. There are two ways to attach one.

1. Open the **Buyers** tab.
2. For a customer who already has an account: in **Attach an existing account**, type the exact e-mail address or the reference, choose the **Role**, then click **Attach**. A part of a name or of an address finds nothing.
3. For a person with no account: in **Create a buyer**, type the **First name**, the **Last name** and the **E-mail address**, choose the **Role**, then click **Create the buyer**. They choose their password with the lost password link.

Choose **Company administrator** for the first one: they will invite their colleagues from their account (step 7). A guest account, with no password, cannot join a company. A customer who already belongs to a company is refused.

## Step 3: understand the roles

The role says what a buyer may do. Three roles are provided and cannot be edited:

| Role | What it allows |
|------|----------------|
| **Company administrator** | place orders, see their own orders and those of the company, manage the shared addresses, the buyers and the company sheet |
| **Buyer** | place orders and see their own orders |
| **Approver** | see their own orders and those of the company, without placing any |

The **Approve orders** permission exists, but this version has no approval screen: for now, the **Approver** role is for reading. A company always keeps at least one administrator.

## Step 4: set the spending limits

On the **Buyers** tab, each row has two limits:

- **Limit per order**: the highest amount of one order;
- **Limit per period**, with the **Period** (**Week**, **Month** or **Year**): the highest total ordered over the period.

1. Type the amounts, for example 500 per order and 2000 per **Month**.
2. Click **Save** at the end of the row.

Amounts include taxes and delivery, in the default currency. Leave a field empty for no limit. The period is the calendar week, month or year, and cancelled or refunded orders do not count.

With these limits and 1800 already ordered this month, an order of 600 is refused (order limit), so is one of 300 (monthly limit), and one of 150 goes through. The buyer sees the refusal when ordering. Two orders placed at the same moment cannot exceed the limit together.

## Step 5: build your own roles

If the three roles are not enough, create your own.

1. In the **Configuration** menu, open **Buyer roles**.
2. Click **Add a role**.
3. Type a **Code** in lowercase letters, digits, dots, dashes or underscores (it cannot change afterwards), then a **Title**.
4. In the **Granted** column, tick the permissions you want: **Place orders**, **See own orders**, **See the orders of the company**, **Approve orders**, **Manage the shared addresses**, **Manage the buyers of the company**, **Edit the company**.
5. Click **Save the role**.

A change of permissions applies at once to the buyers who hold the role. A role still given to a buyer cannot be deleted: give them another role first. For a role reserved for one company, use the **Roles of this company** block of its **Buyers** tab.

## Step 6: share addresses and set the billing address

A shared address is visible to every buyer of the company, who can pick it when ordering. The buyer shares it from their account (see [what the buyer sees](#what-the-buyer-sees)). You find them on the **Addresses** tab of the company.

The billing address of the company replaces the one the buyer chose: invoices are made out to this address, with the name, the SIRET and the VAT number of the company.

1. Wait for a buyer to share the billing address.
2. Open the **Details** tab of the company.
3. In **Billing address**, choose this address. The list only offers shared addresses.
4. If needed, fill in the **Parent company** (a mere marker), the **Notification e-mail address**, which receives a copy of the order e-mails, and the **Internal note**, which the company never sees.
5. Click **Save**.

As long as the company has no billing address, its buyers cannot order: the checkout step tells them why.

## Step 7: let the administrator invite colleagues

You can do everything from the back office, but the administrator of the company can also invite on their own.

1. Signed in, they open their account, then **My company**, then the **Buyers** tab.
2. In **Invite a buyer**, they type the **E-mail address**, choose the **Role**, the limits if needed, then click **Send the invitation**.

The invited person receives an e-mail with a link reserved for their address, valid for seven days and usable once. On the **Join** page followed by the company name, they click **Create my account and join**, or **Accept the invitation** if they are already signed in with that account. If they already have an account, a **Log in** button is shown first.

The administrator cannot give a role or limits above their own. With no limit typed, the invited buyer starts with the administrator's limits. Beyond 20 invitations an hour for a company, or 10 an hour for one administrator, sending is refused.

## What the buyer sees

In their account, a buyer of a company has a **My company** entry in the menu, right after **My addresses**. A customer with no company does not have it.

- **Company details**: the name, the registration number, the VAT number and the copy e-mail address. They can edit them with the **Edit the company** permission. Once an order of the company has been placed without VAT, these two numbers can only be changed by contacting you.
- **Buyers** (**Manage the buyers of the company** permission): the list with roles and limits, the **Save** and **Remove from the company** buttons, and the invitation form. A buyer who has more rights than they do cannot be edited.
- **My addresses**: two groups, **My personal addresses** and **Addresses of my company**. When creating an address, the **Share this address with my company** box makes it visible to colleagues, with the **Shared with the company** badge. Only its creator, or a buyer allowed to manage shared addresses, edits it.
- **My orders**: an **Orders of the company** tab appears for the roles that see the company orders, with **Placed by** on each order.

If you suspend the company, its buyers stay signed in, a banner warns them in their account, and ordering is closed to them.

## Step 8: follow the company in the back office

1. On the sheet of a company, the **Orders** tab lists its orders, with the **Placed by** column. The sheet of an order carries a **Company** card.
2. On the sheet of a customer, the **Company** section gives their company, role and limits.
3. In the **Customers** list, filter by **Membership of a company** to keep the customers attached or not, and by company by searching its name or SIRET.
4. To stop the orders of a company, open its sheet and click **Suspend**; **Reactivate** opens them again. Its buyers and history are kept.

A company that has orders cannot be deleted: suspend it. To remove a buyer, click **Detach** on the **Buyers** tab: they become an ordinary customer again, and their orders stay with the company.

## The result

The company appears in **Customers**, **Companies** with its buyers, their roles and their limits. Its orders are attached to it, invoiced to its billing address, and each one says which buyer placed it. The order e-mail goes to the buyer, with a copy to the notification address of the company.
