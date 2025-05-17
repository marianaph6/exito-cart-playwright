import { test } from "@playwright/test";
import { Actor } from "../screenplay/actor";
import { BrowseTheWeb } from "../screenplay/abilities/browse-the-web";
import { AddProductToCart } from "../screenplay/tasks/add-product-to-cart";
import { NavigateTo } from "../screenplay/tasks/navigate-to";
import { ValidateCart } from "../screenplay/tasks/validate-cart";
import { NavigateToCart } from "../screenplay/tasks/navigate-to-cart";
import { ValidateEmptyCart } from "../screenplay/tasks/validate-empty-cart";
import { RemoveFromMinicart } from "../screenplay/tasks/remove-from-minicart";
import { SelectFirstProductFromPLP } from "../screenplay/tasks/select-first-product-from-plp";
import { env } from "../helpers/env.helper";

test.describe("Cart Management", () => {
  test("CP1: Validar cantidad en carrito vs orderForm", async ({ page }) => {
    // Given: el usuario está en el PDP de Televisor SAMSUNG 60″ UHD4K Smart TV
    const actor = Actor.named("Customer").whoCan(BrowseTheWeb.using(page));
    await actor.attemptsTo(NavigateTo.page(env.pdpSlug));

    // When: agrega 1 al carrito
    // And: viaja al checkout
    await actor.attemptsTo(AddProductToCart.withoutWarranty());

    // Then: la cantidad que se ve en el summary coincide con la del orderForm
    await actor.attemptsTo(
      ValidateCart.containsProduct(env.pdpName, Number(env.pdpQty))
    );
  });

  test("CP2: Validar carrito vacío en orderForm", async ({ page }) => {
    // Given: el usuario está en el PLP
    // And: no tiene items en el carrito
    const actor = Actor.named("Customer").whoCan(BrowseTheWeb.using(page));
    await actor.attemptsTo(NavigateTo.page(env.plpSlug));

    // When: viaja al summary del checkout
    await actor.attemptsTo(NavigateToCart.fromPLP());

    // Then: no debe visualizarse nada en el arreglo de items del orderForm
    await actor.attemptsTo(ValidateEmptyCart.inCheckout());
  });

  /* test("CP3: Validar eliminación de producto desde minicart", async ({
    page,
  }) => {
    // Given: el usuario está en el PLP
    const actor = Actor.named("Customer").whoCan(BrowseTheWeb.using(page));
    await actor.attemptsTo(NavigateTo.page(env.plpSlug));

    // And: tiene un producto en el minicart
    await actor.attemptsTo(SelectFirstProductFromPLP.andAddToCart());

    // When: lo elimina desde el minicart
    await actor.attemptsTo(RemoveFromMinicart.product());

    // And: viaja al checkout
    await actor.attemptsTo(NavigateToCart.fromPLP());

    // Then: el producto no debe estar en el summary
    // And: no debe aparecer en el arreglo de items del orderForm
    await actor.attemptsTo(ValidateEmptyCart.inCheckout());
  }); */
});
