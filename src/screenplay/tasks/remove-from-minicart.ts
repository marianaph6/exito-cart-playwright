import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { HandleCookieConsent } from "./handle-cookie-consent";

export class RemoveFromMinicart implements Task {
  private constructor() {}

  static product(): RemoveFromMinicart {
    return new RemoveFromMinicart();
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    await actor.attemptsTo(HandleCookieConsent.ifPresent());

    const cartToggleButton = page.locator('button[data-fs-cart-toggle="true"]');
    await cartToggleButton.waitFor({ state: "visible" });

    await cartToggleButton.click({ force: true });

    await page.click('button:has(svg path[d^="M5.111 19.775"])');

    await page.click('button:has(svg use[href$="#CloseMyAccount"])');
  }
}
