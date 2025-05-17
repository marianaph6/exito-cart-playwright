import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { HandleCookieConsent } from "./handle-cookie-consent";
import { env } from "../../helpers/env.helper";

export class RemoveFromMinicart implements Task {
  private constructor(private readonly quantity: number = 1) {}

  static product(quantity: number = 1): RemoveFromMinicart {
    return new RemoveFromMinicart(quantity);
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    await actor.attemptsTo(HandleCookieConsent.ifPresent());

    const cartToggleButton = page.locator('button[data-fs-cart-toggle="true"]');
    await cartToggleButton.waitFor({ state: "visible" });

    await cartToggleButton.click({ force: true });

    for (let i = 0; i < this.quantity; i++) {
      await page.click('button:has(svg path[d^="M5.111 19.775"])');
      await page.waitForTimeout(env.defaultTimeout);
    }

    await page.click('button:has(svg use[href$="#CloseMyAccount"])');
    await page.waitForTimeout(env.defaultTimeout);
  }
}
