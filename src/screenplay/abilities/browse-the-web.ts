import { Ability } from "./ability";
import { Page } from "@playwright/test";

export class BrowseTheWeb implements Ability {
  constructor(private page: Page) {}

  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  getPage(): Page {
    return this.page;
  }

  getName(): string {
    return "BrowseTheWeb";
  }

  canPerform(): boolean {
    return this.page !== undefined;
  }
}
