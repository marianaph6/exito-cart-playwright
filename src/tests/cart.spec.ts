import { expect, test } from '@playwright/test';
import { PDPPage } from '../pages/pdp.page';
import { CheckoutPage } from '../pages/checkout.page';
import { env } from '../helpers/env.helper';
import { expectCartSync, getOrderForm } from '../helpers/orderForm.helper';

test.describe('HU: agregar producto y validar orderForm', () => {

  test('CP1 – TV Samsung agregado desde PDP', async ({ page }) => {
    const pdp = new PDPPage(page);
    const checkout = new CheckoutPage(page);

    await pdp.open();
    await pdp.addToCart();
    await pdp.chooseNoWarrantyAndGoToCart();

    await checkout.expectItem();
    await expectCartSync(page, env.pdpName, Number(env.pdpQty));
  });
});
