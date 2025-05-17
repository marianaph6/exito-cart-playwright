import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { env } from "../../helpers/env.helper";

export class HandleCookieConsent implements Task {
  private constructor() {}

  static ifPresent(): HandleCookieConsent {
    return new HandleCookieConsent();
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    const cookieButton = page.locator(
      'button[data-fs-cookies-modal-button="true"]'
    );
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
      await page.waitForTimeout(env.defaultTimeout);
    }
  }
}
