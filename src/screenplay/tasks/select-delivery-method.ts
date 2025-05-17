import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { env } from "../../helpers/env.helper";
import { HandleCookieConsent } from "./handle-cookie-consent";

export class SelectDeliveryMethod implements Task {
  private constructor() {}

  static pickup(): SelectDeliveryMethod {
    return new SelectDeliveryMethod();
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    await actor.attemptsTo(HandleCookieConsent.ifPresent());

    // Opción 1: click directo
    await page.click(
      'button[data-testid="store-button"][data-fs-delivery="desktop"]'
    );

    // Si tras el click esperas un modal:
    await page.waitForSelector(
      'header[data-fs-modal-exito-headermodal="true"]'
    );

    // Seleccionar ciudad
    const cityDropdown = page.locator('div[class*="css-bpafbg-control"]');
    await cityDropdown.click();
    await page.locator('div[role="option"]').first().click();

    // Seleccionar tienda
    const storeDropdown = page.locator(
      'div[class*="css-bpafbg-control"]:has(input#react-select-3-input)'
    );
    await storeDropdown.click();
    await page.locator('div[role="option"]').first().click();

    // Confirmar selección
    await page
      .locator('button[data-testid="store-button"][type="submit"]', {
        hasText: "Confirmar",
      })
      .click();

    await page.waitForTimeout(env.defaultTimeout);
  }
}
