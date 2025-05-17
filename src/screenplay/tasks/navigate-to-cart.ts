import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { env } from "../../helpers/env.helper";
import { HandleCookieConsent } from "./handle-cookie-consent";

export class NavigateToCart implements Task {
  private constructor() {}

  static fromPLP(): NavigateToCart {
    return new NavigateToCart();
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    await actor.attemptsTo(HandleCookieConsent.ifPresent());

    await page.click('button[data-fs-cart-toggle="true"]');
    await page.waitForTimeout(env.defaultTimeout);

    await page.click('button[data-fs-button-pay="true"]');
    await page.waitForTimeout(env.defaultTimeout);
  }
}
