import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { env } from '../helpers/env.helper';

export class PDPPage extends BasePage {
  private addToCartBtn: Locator;
  private noWarrantyBtn: Locator;
  private goToCartBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartBtn = page.locator('//div[@data-fs-container-buybutton]//span[contains(text(),"Agregar")]//parent::button')
    this.noWarrantyBtn = page.locator('//button/label[@for="modalUI_empty"]')
    this.goToCartBtn = page.locator('//button/span[contains(text(),"Ir al carrito")]')}

  async open() {
    await this.page.goto(`${env.baseUrl}${env.pdpSlug}`);
    await this.waitForPath(env.pdpSlug);
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async chooseNoWarrantyAndGoToCart() {
    await this.page.waitForTimeout(5000)
    await this.noWarrantyBtn.click();
    await this.goToCartBtn.click();
    await this.waitForPath('/checkout');
  }
}
