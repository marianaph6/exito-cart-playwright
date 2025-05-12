import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { env } from '../helpers/env.helper';

export class CheckoutPage extends BasePage {
  private title: Locator;
  private qty: Locator;

  constructor(page:Page) {
    super(page);
    this.title = page.locator('//div[@data-molecule-product-detail-name]/span');
    this.qty   = page.locator('//span[@data-molecule-quantity-und-value]');
  }

  async expectItem(product = env.pdpName, quantity = env.pdpQty) {
    await expect(this.title).toHaveText(product);
    await expect(this.qty).toHaveText(String(quantity));
  }
}
