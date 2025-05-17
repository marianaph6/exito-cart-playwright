import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { env } from "../../helpers/env.helper";
import { HandleCookieConsent } from "./handle-cookie-consent";

export class AddProductToCart implements Task {
  private constructor(
    private withWarranty: boolean = false,
    private continueShopping: boolean = false
  ) {}

  static withoutWarranty(continueShopping: boolean = false): AddProductToCart {
    return new AddProductToCart(false, continueShopping);
  }

  static withWarranty(): AddProductToCart {
    return new AddProductToCart(true);
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    await actor.attemptsTo(HandleCookieConsent.ifPresent());

    await page.click(
      '//div[@data-fs-container-buybutton]//span[contains(text(),"Agregar")]//parent::button'
    );

    if (!this.withWarranty) {
      await page.waitForTimeout(env.defaultTimeout);
      await page.click('//button/label[@for="modalUI_empty"]');
      if (this.continueShopping) {
        await page.getByRole("button", { name: "Seguir comprando" }).click();
      } else {
        await page.click('//button/span[contains(text(),"Ir al carrito")]');
      }
      await page.waitForTimeout(env.defaultTimeout);
    }
  }
}
