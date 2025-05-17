import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { expect } from "@playwright/test";
import { env } from "../../helpers/env.helper";
import { getOrderForm } from "../../helpers/orderForm.helper";

export class ValidateEmptyCart implements Task {
  private constructor() {}

  static inCheckout(): ValidateEmptyCart {
    return new ValidateEmptyCart();
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    const orderForm = await getOrderForm(page);
    expect(orderForm.items.length).toBe(0);

    await page.waitForSelector(".exito-checkout-io-0-x-emptyCartPage", {
      timeout: env.defaultTimeout,
    });
    const emptyCartTitle = await page.textContent(
      ".exito-checkout-io-0-x-emptyCartPageTitle"
    );
    expect(emptyCartTitle).toBe("Tu carrito está vacío");

    const emptyCartDescription = await page.textContent(
      ".exito-checkout-io-0-x-emptyCartPageDescription"
    );
    expect(emptyCartDescription).toBe(
      "En Éxito tenemos más de 100 mil productos para que elijas lo que más te gusta."
    );
  }
}
