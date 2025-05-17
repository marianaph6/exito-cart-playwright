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

    const isModalVisible = await page
      .locator(".styles_fsCookiesModal__0jD9C")
      .isVisible();

    if (isModalVisible) {
      await cookieButton.waitFor({
        state: "visible",
        timeout: env.defaultTimeout,
      });
      await cookieButton.scrollIntoViewIfNeeded();
      await cookieButton.click({ force: true, timeout: env.defaultTimeout });

      await page.waitForSelector(".styles_fsCookiesModal__0jD9C", {
        state: "hidden",
        timeout: env.defaultTimeout,
      });

      await page.waitForTimeout(1000);
    }
  }
}
