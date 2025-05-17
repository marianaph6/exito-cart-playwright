import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { expect } from "@playwright/test";
import { getOrderForm } from "../../helpers/orderForm.helper";
import { env } from "../../helpers/env.helper";

const SELECTORS = {
  quantityValue: '[data-molecule-quantity-und-value="true"]',
} as const;

export class ValidateCart implements Task {
  private constructor(
    private expectedProductName?: string,
    private expectedQuantity?: number
  ) {}

  static containsProduct(name: string, quantity: number): ValidateCart {
    return new ValidateCart(name, quantity);
  }

  static isEmpty(): ValidateCart {
    return new ValidateCart();
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    const page = browseTheWeb.getPage();
    const orderForm = await getOrderForm(page);

    if (this.expectedProductName && this.expectedQuantity) {
      const mainProduct = orderForm.items.find((item) => !item.isGift);
      expect(mainProduct).toBeTruthy();
      expect(mainProduct!.name).toBe(this.expectedProductName);
      expect(mainProduct!.quantity).toBe(this.expectedQuantity);

      const giftItem = orderForm.items.find((item) => item.isGift);
      expect(giftItem).toBeTruthy();
      expect(giftItem!.quantity).toBe(1);

      const quantityElement = await page.waitForSelector(
        SELECTORS.quantityValue,
        {
          timeout: env.defaultTimeout,
        }
      );
      const displayedQuantity = await quantityElement.textContent();
      expect(displayedQuantity?.trim()).toBe(this.expectedQuantity.toString());
    } else {
      expect(orderForm.items.length).toBe(0);
    }
  }
}
