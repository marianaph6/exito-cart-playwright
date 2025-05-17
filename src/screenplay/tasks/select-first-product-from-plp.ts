import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { env } from "../../helpers/env.helper";
import { HandleCookieConsent } from "./handle-cookie-consent";

export class SelectFirstProductFromPLP implements Task {
  private constructor(private quantity: number) {}

  static andAddToCart(quantity: number = 1): SelectFirstProductFromPLP {
    return new SelectFirstProductFromPLP(quantity);
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    await actor.attemptsTo(HandleCookieConsent.ifPresent());

    const productGrid = page.locator('ul[data-fs-product-grid-list="true"]');
    await productGrid.waitFor({
      state: "visible",
      timeout: env.defaultTimeout,
    });

    for (let i = 0; i < this.quantity; i++) {
      const addButton = productGrid
        .locator("li")
        .nth(i)
        .locator('button:has-text("Agregar")');

      await addButton.waitFor({
        state: "visible",
        timeout: env.defaultTimeout,
      });
      await addButton.click({ force: true });
      await page.waitForTimeout(env.defaultTimeout);
    }
  }
}
