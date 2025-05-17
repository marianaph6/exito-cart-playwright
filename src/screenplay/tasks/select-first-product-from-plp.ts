import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { env } from "../../helpers/env.helper";
import { HandleCookieConsent } from "./handle-cookie-consent";

export class SelectFirstProductFromPLP implements Task {
  private constructor() {}

  static andAddToCart(): SelectFirstProductFromPLP {
    return new SelectFirstProductFromPLP();
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    await actor.attemptsTo(HandleCookieConsent.ifPresent());

    await page
      .locator('ul[data-fs-product-grid-list="true"] > li')
      .first()
      .locator('button:has-text("Agregar")')
      .click();

    await page.waitForTimeout(env.defaultTimeout);
  }
}
