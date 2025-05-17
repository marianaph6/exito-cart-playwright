import { test } from "@playwright/test";
import { Actor } from "../screenplay/actor";
import { BrowseTheWeb } from "../screenplay/abilities/browse-the-web";
import { AddProductToCart } from "../screenplay/tasks/add-product-to-cart";
import { NavigateTo } from "../screenplay/tasks/navigate-to";
import { ValidateCart } from "../screenplay/tasks/validate-cart";
import { RemoveProductFromCart } from "../screenplay/tasks/remove-product-from-cart";
import { env } from "../helpers/env.helper";

test.describe("Cart Management", () => {
  test("CP1: Validar cantidad en carrito vs orderForm", async ({ page }) => {
    // Given: el usuario está en el PDP de Televisor SAMSUNG 60″ UHD4K Smart TV
    const actor = Actor.named("Customer").whoCan(BrowseTheWeb.using(page));
    await actor.attemptsTo(NavigateTo.productDetailPage(env.pdpSlug));

    // When: agrega 1 al carrito
    // And: viaja al checkout
    await actor.attemptsTo(AddProductToCart.withoutWarranty());

    // Then: la cantidad que se ve en el summary coincide con la del orderForm
    await actor.attemptsTo(
      ValidateCart.containsProduct(env.pdpName, Number(env.pdpQty))
    );
  });
});
