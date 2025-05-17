import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { env } from "../../helpers/env.helper";

export class UpdateProductQuantity implements Task {
  private constructor(private readonly quantity: number) {}

  static to(quantity: number): UpdateProductQuantity {
    return new UpdateProductQuantity(quantity);
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();

    const quantityInput = page
      .locator("#container-buybutton")
      .getByRole("textbox");
    await quantityInput.waitFor({ state: "visible" });
    await quantityInput.fill(this.quantity.toString());
    await page.keyboard.press("Enter");
    await page.waitForTimeout(env.defaultTimeout);
  }
}
