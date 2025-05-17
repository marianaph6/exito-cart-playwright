import { Task } from "./task";
import { Actor } from "../actor";
import { BrowseTheWeb } from "../abilities/browse-the-web";
import { env } from "../../helpers/env.helper";

export class NavigateTo implements Task {
  private constructor(private url: string) {}

  static page(slug: string): NavigateTo {
    return new NavigateTo(`${env.baseUrl}/${slug}`);
  }

  static checkoutPage(): NavigateTo {
    return new NavigateTo(`${env.tiendaUrl}/checkout-io/`);
  }

  async performAs(actor: Actor): Promise<void> {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    await browseTheWeb.getPage().goto(this.url);
  }
}
