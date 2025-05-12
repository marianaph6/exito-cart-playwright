import { expect, Page } from '@playwright/test';

type OrderForm = {
  items: { name: string; quantity: number }[];
  // … añade los campos que necesites validar
};

/**
 * Obtiene y parsea el `orderForm` guardado en sessionStorage.
 */
export async function getOrderForm(page: Page): Promise<OrderForm> {
  const raw = await page.evaluate(() => sessionStorage.getItem('orderForm'));
  if (!raw) throw new Error('orderForm no encontrado en sessionStorage');
  return JSON.parse(raw) as OrderForm;
}

/**
 * Valida que el resumen del checkout coincida con el `orderForm`.
 */
export async function expectCartSync(
  page: Page,
  productName: string,
  quantity = 1
) {
  const of = await getOrderForm(page);
  const item = of.items.find(i => i.name.includes(productName));
  expect(item).toBeTruthy();
  expect(item!.quantity).toBe(quantity);
}
