import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(
  dotenv.config({ path: '.env', override: false })
);

export const env = {
  baseUrl:  process.env.BASE_URL!,
  pdpSlug:  process.env.PDP_SLUG!,
  plpSlug:  process.env.PLP_SLUG!,
  pdpName:  process.env.PDP_NAME!,
  pdpQty:   process.env.PDP_QTY_DEFAULT || '1'
};
