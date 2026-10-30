---
translatedFrom: b8b44f8e69cf
title: Print the invoice and the delivery slip
description: Display, print or download as PDF an order's invoice and its delivery slip.
sidebar:
  order: 50
thelia: '3.3'
verified: 2026-10-30
sources:
  - capture:orders/print-documents
  - thelia-templates/default-twig:order/detail.html.twig:64
  - thelia-templates/default-twig:order/detail.html.twig:72
  - thelia-templates/default-twig:order/detail.html.twig:85
  - thelia-templates/default-twig:src/Controller/Order/OrderController.php:168
  - thelia-templates/default-twig:src/Controller/Order/OrderController.php:459
  - thelia-templates/default-twig:src/Controller/Order/OrderController.php:465
  - thelia-templates/default-twig:src/Service/Pdf/OrderPdfRenderer.php:134
  - thelia-templates/default-twig:assets/controllers/bo-print-iframe_controller.js:9
  - thelia-templates/default-twig:src/Service/Order/OrderListRowPresenter.php:336
  - thelia-templates/default-twig:translations/messages.fr_FR.php:1039
  - thelia-templates/default-twig:translations/messages.fr_FR.php:1042
  - thelia-templates/default-twig:translations/messages.fr_FR.php:1668
  - thelia-templates/default-twig:translations/messages.fr_FR.php:2162
  - thelia/thelia:core/lib/Thelia/Model/Order.php:149
  - thelia/thelia:core/lib/Thelia/Model/OrderStatus.php:76
  - thelia/thelia:core/lib/Thelia/Model/OrderStatus.php:36
  - thelia/thelia:core/lib/Thelia/Domain/Invoice/InvoiceRefAllocator.php:39
  - thelia/thelia:core/lib/Thelia/Domain/Invoice/InvoiceRefAllocator.php:75
  - thelia/thelia:core/lib/Thelia/Domain/Invoice/EventListener/AllocateInvoiceRefListener.php:53
  - thelia/thelia:setup/insert.sql:85
  - thelia/thelia:setup/update/sql/3.0.0-alpha1.sql:287
  - thelia-templates/pdf:invoice.html.twig:148
  - thelia-templates/pdf:invoice.html.twig:199
  - thelia-templates/pdf:invoice.html.twig:154
  - thelia-templates/pdf:delivery.html.twig:143
  - thelia-templates/pdf:delivery.html.twig:146
  - thelia-templates/pdf:delivery.html.twig:161
  - thelia-templates/pdf:translations/pdf.fr_FR.php:28
---

The invoice is the document you give the customer for a paid order. The delivery slip goes with it in the parcel. This tutorial shows where to display them, print them and save them as PDF.

**Before you start:** you need an order, see [Track your orders](/en/orders/list-orders/). For the invoice, the order must be paid.

## Step 1: open the order

1. In the menu on the left, click **Orders**, then **All orders**.
2. Click the order reference, for example **ORD000000000004**.

The buttons are at the top of the page, under the order status.

![Order with the document buttons](../../../../assets/captures/en/orders/print-documents/order.png)

## Step 2: display, print or download the invoice

The **Invoice** group contains three buttons.

![Invoice buttons](../../../../assets/captures/en/orders/print-documents/invoice.png)

1. Click **Invoice** to open the PDF in a new tab. The tooltip reads **View invoice PDF**.
2. Click the printer icon to open your browser's print window (**Print invoice**).
3. Click the download icon to save the PDF on your computer (**Download invoice as PDF**). The file is named `invoice-` followed by the order reference, for example `invoice-ORD000000000004.pdf`.

The invoice shows the invoice date, the invoice number, the customer number, and the delivery and billing addresses.

## Step 3: display, print or download the delivery slip

The **Delivery slip** group works the same way.

![Delivery slip buttons](../../../../assets/captures/en/orders/print-documents/delivery.png)

1. Click **Delivery slip** to open the PDF in a new tab.
2. Click the printer icon to print it.
3. Click the download icon to save it. The file is named `delivery-` followed by the reference, for example `delivery-ORD000000000004.pdf`.

The delivery slip shows the invoice date, the order number, the customer number and both addresses. It is always available, whether the order is paid or not.

The tooltips of these three buttons say "purchase order" (**View purchase order as PDF**): it is the same document.

## Step 4: understand when the invoice is available

The **Invoice** button does not appear on every order. It is shown in two cases:

- the order is **Paid**, **Processing**, **Sent** or **Partially shipped**;
- or it already has an invoice date, for example because it was paid before being refunded.

On a **Not paid** order, there is only the delivery slip.

![Unpaid order: only the delivery slip is offered](../../../../assets/captures/en/orders/print-documents/unpaid.png)

The invoice date is set the first time the order moves to a paid status. A paid order therefore always has its invoice.

The invoice number is assigned at that moment, in sequence: `2026-000001`, `2026-000002`, and so on. Each year starts a new series at `000001`. This numbering is active on a freshly installed store.

When a paid order has no recorded invoice number, the PDF builds one from the order number. This is the case for the demo orders: the invoice of ORD000000000004 carries the number `FA000000000004`.

To find the documents without opening the order, the order list offers the same PDFs in the **ACTIONS** column: **Download invoice PDF** and **Download delivery slip PDF**. Note that the list offers the invoice even for an unpaid order: that PDF has no invoice date and no invoice number.

## The result

The PDF opens in a tab, goes to the printer, or lands in your browser's downloads folder. It carries the order's information.
