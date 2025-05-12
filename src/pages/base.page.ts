import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async waitForPath(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }
}
