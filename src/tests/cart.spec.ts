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
import { SelectDeliveryMethod } from "../screenplay/tasks/select-delivery-method";
import { UpdateProductQuantity } from "../screenplay/tasks/update-product-quantity";

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

  test("CP3: Validar eliminación de producto desde minicart", async ({
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
  });

  test("CP4: Validar agregar múltiples productos al carrito", async ({
    page,
  }) => {
    // Given: el usuario está en el PLP de aseo del hogar
    const actor = Actor.named("Customer").whoCan(BrowseTheWeb.using(page));
    await actor.attemptsTo(NavigateTo.page(env.plpAseoSlug));

    // And: selecciona el método de entrega
    await actor.attemptsTo(SelectDeliveryMethod.pickup());

    // When: agrega 3 productos diferentes al carrito
    await actor.attemptsTo(SelectFirstProductFromPLP.andAddToCart(3));

    // And: navega al checkout
    await actor.attemptsTo(NavigateToCart.fromPLP());

    // Then: debe ver los tres productos en el carrito
    await actor.attemptsTo(ValidateCart.hasItems(3));
  });

  test("CP5: Validar persistencia del carrito tras recargar página", async ({
    page,
  }) => {
    // Given: el usuario está en el PLP
    const actor = Actor.named("Customer").whoCan(BrowseTheWeb.using(page));
    await actor.attemptsTo(NavigateTo.page(env.plpSlug));

    // When: agrega un producto al carrito
    await actor.attemptsTo(SelectFirstProductFromPLP.andAddToCart());

    // And: recarga la página
    await page.reload();

    // And: navega al checkout
    await actor.attemptsTo(NavigateToCart.fromPLP());

    // Then: el producto debe seguir en el carrito
    await actor.attemptsTo(ValidateCart.hasItems(1));
  });

  test("CP6: Validar cambio de cantidad de producto en el PDP", async ({
    page,
  }) => {
    // Given: el usuario está en el PDP
    const actor = Actor.named("Customer").whoCan(BrowseTheWeb.using(page));
    await actor.attemptsTo(NavigateTo.page(env.pdpSlug));

    // When: agrega un producto al carrito y continúa comprando
    await actor.attemptsTo(AddProductToCart.withoutWarranty(true));

    // And: cambia la cantidad del producto a 3
    await actor.attemptsTo(UpdateProductQuantity.to(3));

    // And: navega al checkout
    await actor.attemptsTo(NavigateToCart.fromPLP());

    // Then: debe ver el producto con cantidad 3 en el carrito
    await actor.attemptsTo(ValidateCart.containsProduct(env.pdpName, 3));
  });
});
