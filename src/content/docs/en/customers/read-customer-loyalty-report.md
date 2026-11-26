---
translatedFrom: 'df5119faf6dc'
title: Read your customer loyalty
description: Open the Customer loyalty report, read the cohorts, the lifetime value and the customer segments, set the dormancy threshold and export what is shown.
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

The Customer loyalty report shows whether your customers come back: how many order again, how much they spend over time, and which ones you have lost. It helps you judge the effect of a promotion or of a growing audience.

**Before you start:** the shop has orders. The menu entry and the three tabs need the customer permission (`admin.customer`): without it, the entry is not shown. The **Export** button needs the export permission, and the link to the dormancy threshold needs the configuration permission.

## Step 1: open the report

1. In the left menu, click **Reports**.
2. Click **Customer loyalty**.

The screen opens on the **Cohorts** tab. The **Lifetime value** and **Segments** tabs sit next to it, then **Top customers**, which leads to the sales report.

## Step 2: choose the orders counted

Two buttons set what is counted:

- **All orders** (the default) counts every order except the cancelled and refunded ones;
- **Paid orders** counts only the orders that are paid, in processing or sent.

1. Click **Paid orders** to keep only the money actually received.

A sentence next to the buttons recalls what is counted. The amounts are revenue including tax, not margin. An administrator attached to some sale units sees the orders of those units only.

## Step 3: read the cohorts

A cohort gathers the customers whose first order fell in the same month. For example, the 2026-03 cohort is made of the customers who ordered for the first time in March 2026.

1. On the **Cohorts** tab, choose **12 months**, **24 months** (the default) or **36 months** of first orders.
2. If the shop has few orders, click **By quarter**: a cohort is then a quarter. **By month** goes back to the default.

Each line is a cohort, with its number of **Customers**. Each column counts the time elapsed since the first order: **M0** is the month of the first order, **M3** the third month after it. By quarter, the columns are named **Q0**, **Q1**, and so on.

Each cell gives the share of the cohort that ordered in that month, and the number of customers below it. **M0** is always 100%. The higher the share, the darker the cell. A month that has not come yet stays empty.

Three rules to know:

- a customer is in the cohort of their first order, not of their sign-up: an account that never ordered is in no cohort;
- the first order is looked for in the whole history: a customer who ordered before the first cohort of the table is in none of its cohorts;
- a customer anonymized by the data purge keeps their cohort and their amounts.

## Step 4: read the lifetime value

The lifetime value of a customer is what they have spent since their first order.

1. Click the **Lifetime value** tab.

Four figures show at the top, for the customers of the cohorts in the table:

| Figure | Meaning |
|--------|---------|
| **Average lifetime value incl. tax** | what a customer has spent on average since their first order |
| **Average lifespan** | average number of days between the first and the last order, 0 for a customer who ordered once |
| **Repeat rate** | share of the customers who ordered more than once |
| **Customers** | customers whose first order falls in the table |

Below, a line per cohort gives what its customers spent, per customer, at the end of each month elapsed. The amount never goes down from one month to the next. The **Lifetime value** column repeats the last month that has come. The **12 months**, **24 months**, **36 months**, **By month** and **By quarter** buttons also work on this tab.

## Step 5: read the segments

The segments put each customer in a group, according to their last order and the period chosen.

1. Click the **Segments** tab.
2. Click **Today**, **7 days**, **30 days**, **90 days**, **This month** or **This year**. For exact dates, enter them in **From** and **to**, then click **Apply**.

The table has four lines:

| Segment | Customers |
|---------|-----------|
| **New customers** | first order in the period, last order more recent than the dormancy threshold |
| **Returning customers** | an order in the period and one before it, last order more recent than the threshold |
| **Lapsing customers** | no order in the period, last order more recent than the threshold |
| **Dormant customers** | last order older than the threshold at the end of the period |

A dormant customer is dormant even if they ordered early in the period: if their last order is more than 180 days old at the end of the period, they are dormant. Each customer who ordered up to the end of the period is in one segment only.

Each line gives the **Customers**, the **Revenue of the period incl. tax** and its **Share**, then the **Revenue since the first order incl. tax** and its **Share**. Both shares add up to 100%.

## Step 6: set the dormancy threshold

The threshold is the number of days without an order after which a customer is dormant. It is 180 days by default.

1. On the **Segments** tab, click **Change the threshold (customer_dormant_after_days)**.
2. In the window that opens, change the value of the `customer_dormant_after_days` variable.
3. Save, then go back to the report.

A value that is not a positive number of days is read as 180. If your profile has no permission on the configuration, the link does not show.

## Step 7: see the top customers

1. Click **Top customers**.

The sales report opens on its **By customer** tab, for the same days as the screen and on the paid orders. Its totals are those of the customer list. See [Read your sales by category, product and customer](/en/orders/read-sales-reports/).

## Step 8: export

1. Click **Export**.

The browser downloads a CSV file of the tab on screen, in the same unit and on the same orders as the screen. A spreadsheet opens it: a month that has not come yet is an empty cell. Each report also has its place in the **Reports** category of the export screen, and can be sent by e-mail on a fixed date: see [Schedule reports by e-mail](/en/orders/schedule-email-reports/).

## The result

You read the loyalty of your customers: the share of each cohort that comes back, the value of a customer over time and the number of customers to win back before they are lost.

The calculation can take a few seconds. The screen keeps its figures for 15 minutes, shows **Computed at** the time of the calculation, and **Compute again** refreshes them. A placed, updated or deleted order renews them by itself.
