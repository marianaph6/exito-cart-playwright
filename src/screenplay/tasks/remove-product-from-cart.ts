import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";

export class RemoveProductFromCart implements Task {
  private constructor() {}

  static fromMiniCart(): RemoveProductFromCart {
    return new RemoveProductFromCart();
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    await page.click(
      ".QuantitySelectorDefault_custom-quantity-selector__input__IHd9p"
    );
  }
}
