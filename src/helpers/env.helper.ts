import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config({ path: ".env", override: false }));

export const env = {
  baseUrl: process.env.BASE_URL || "https://www.exito.com",
  tiendaUrl: process.env.TIENDA_URL || "https://www.exito.com/tienda",
  pdpSlug: process.env.PDP_SLUG || "/televisor-samsung-60-uhd4k-smart-tv/p",
  plpSlug: process.env.PLP_SLUG || "/tecnologia/televisores",
  plpAseoSlug: process.env.PLP_ASEO_SLUG || "/mercado/aseo-del-hogar",
  pdpName: process.env.PDP_NAME || "Televisor SAMSUNG 60″ UHD4K Smart TV",
  pdpQty: process.env.PDP_QTY || "1",
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT) || 7000,
};
