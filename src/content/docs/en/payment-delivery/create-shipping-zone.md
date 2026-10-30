---
translatedFrom: 9d95c45e4efa
title: Create a shipping zone
description: Group countries into a zone, to say where your carriers deliver.
sidebar:
  order: 40
thelia: '3.3'
verified: 2026-10-30
sources:
  - capture:payment-delivery/create-shipping-zone
  - thelia-templates/default-twig:configuration/index.html.twig:36
  - thelia-templates/default-twig:configuration/area/list.html.twig:22
  - thelia-templates/default-twig:configuration/area/list.html.twig:52
  - thelia-templates/default-twig:configuration/area/edit.html.twig:40
  - thelia-templates/default-twig:configuration/area/edit.html.twig:60
  - thelia-templates/default-twig:configuration/area/edit.html.twig:67
  - thelia-templates/default-twig:configuration/shipping-zone/list.html.twig:22
  - thelia-templates/default-twig:src/Controller/Configuration/AreaController.php:104
  - thelia-templates/default-twig:src/Controller/Configuration/AreaController.php:174
  - thelia-templates/default-twig:src/Controller/Configuration/AreaController.php:213
  - thelia-templates/default-twig:src/Controller/Configuration/AreaController.php:268
  - thelia-templates/default-twig:configuration/area/edit.html.twig:85
  - thelia-templates/default-twig:configuration/area/edit.html.twig:99
  - thelia-templates/default-twig:assets/controllers/bo-area-edit_controller.js:96
  - thelia-templates/default-twig:assets/controllers/bo-area-edit_controller.js:143
  - thelia-templates/default-twig:assets/controllers/bo-area-edit_controller.js:164
  - thelia/thelia:core/lib/Thelia/Model/CountryAreaQuery.php:28
  - thelia/thelia:core/lib/Thelia/Model/AreaDeliveryModuleQuery.php:48
  - thelia/thelia:core/lib/Thelia/Domain/Shipping/Service/DeliveryModuleEligibilityChecker.php:86
  - thelia/thelia:core/lib/Thelia/Domain/Shipping/ShippingFacade.php:243
---

A shipping zone is a group of countries, for example "France" or "Europe". You create your zones once, then tell each delivery method which zones it delivers to. At checkout, customers only see the delivery methods whose zones include the country of their address.

**Before you start:** you need access to the back office (see [Discover the back office](/en/getting-started/back-office-tour/)). The demo store already contains zones: you can look at them without changing anything.

## Step 1: open the shipping zones

1. In the left menu, click **Configuration**.
2. In the **Shipping** section, click the **Shipping zones management** card.

![The Shipping zones management card on the Configuration page](../../../../assets/captures/en/payment-delivery/create-shipping-zone/configuration-hub.png)

Do not confuse it with the **Shipping configuration** card next to it, which attaches zones to delivery methods (see [Enable a delivery method](/en/payment-delivery/enable-delivery/)).

The **Shipping zones management** page lists the existing zones, with their countries and the delivery modules attached to them.

![List of shipping zones](../../../../assets/captures/en/payment-delivery/create-shipping-zone/zones-list.png)

## Step 2: name the zone

1. Click **Add a new shipping zone**.
2. In **Shipping zone name**, enter the name of the zone, for example `Overseas`.
3. Click **Create this shipping zone**.

![Window for creating a zone](../../../../assets/captures/en/payment-delivery/create-shipping-zone/create-modal.png)

The zone page opens. It does not contain any country yet.

## Step 3: add countries

The zone page has two columns. On the left, the countries you can add. On the right, **Countries assigned to this zone**. The screenshot shows the demo store's **France** zone.

1. In the **filter country** field, type the name of the country. The list gets shorter.
2. Click a country. To pick several, hold down the Ctrl key (Cmd on Mac) while clicking.
3. Click **Add selected countries**.

![The block for adding countries](../../../../assets/captures/en/payment-delivery/create-shipping-zone/add-countries.png)

Some countries expand into states or provinces (for example Argentina, with **All States** followed by the list of states). Select **All States** to deliver to the whole country, or a single state to deliver to that part of the country only.

To select all the countries that are in no zone at once, click **Select unassigned countries**, then **Add selected countries**.

## Step 4: remove a country or rename the zone

To remove countries:

1. In the right column, tick the countries to remove. The **All**, **None** and **Reverse** links tick, untick or invert the whole column.
2. Click **Delete selected countries**.

![The block of countries included in the zone](../../../../assets/captures/en/payment-delivery/create-shipping-zone/zone-edit.png)

To rename the zone:

1. Change the name in the field at the top left, for example `Overseas territories`.
2. Click **Update**.

## The result

The zone's countries appear in the right column of the zone page, and in the **Included countries** column of the list. You still need to attach the zone to a delivery method: a zone with no delivery method is flagged by a warning in **Shipping configuration**.
