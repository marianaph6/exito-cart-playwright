import { expect, Page } from "@playwright/test";

type OrderForm = {
  id: string;
  items: {
    name: string;
    quantity: number;
    isGift?: boolean;
    price?: number;
    sellingPrice?: number;
  }[];
};

export async function getOrderForm(
  page: Page,
  key = "orderform"
): Promise<OrderForm> {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  if (!raw) {
    throw new Error(`No se encontró "${key}" en localStorage`);
  }
  return JSON.parse(raw) as OrderForm;
}

export async function expectCartSync(
  page: Page,
  productName: string,
  quantity = 1
) {
  const of = await getOrderForm(page);
  const item = of.items.find((i) => i.name.includes(productName));

  expect(item).toBeTruthy();
  expect(item!.quantity).toBe(quantity);
}
