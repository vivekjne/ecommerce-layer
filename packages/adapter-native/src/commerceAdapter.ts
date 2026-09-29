import type { Cart, CheckoutSession, CommerceAdapter, Connection, Product, ProductLookup, SearchProductsParams } from "@commerce/core";
import type { Carts } from "./carts.js";
import type { Catalog } from "./catalog.js";
import type { Checkouts } from "./checkout.js";

export class NativeCommerceAdapter implements CommerceAdapter {
  readonly platform = "native" as const;

  constructor(
    private readonly catalog: Catalog,
    private readonly carts: Carts,
    private readonly checkouts: Checkouts,
  ) {}

  async searchProducts(params: SearchProductsParams): Promise<Connection<Product>> {
    return this.catalog.search(params.filters, params.first, params.after);
  }

  async getProduct(lookup: ProductLookup): Promise<Product | null> {
    return "id" in lookup ? this.catalog.getById(lookup.id) : this.catalog.getByHandle(lookup.handle);
  }

  async createCart(): Promise<Cart> {
    return this.carts.create();
  }

  async getCart(cartId: string): Promise<Cart | null> {
    return this.carts.get(cartId);
  }

  async addCartLine(cartId: string, variantId: string, quantity: number): Promise<Cart> {
    return this.carts.addLine(cartId, variantId, quantity);
  }

  async updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
    return this.carts.updateLine(cartId, lineId, quantity);
  }

  async removeCartLine(cartId: string, lineId: string): Promise<Cart> {
    return this.carts.removeLine(cartId, lineId);
  }

  async createCheckout(cartId: string): Promise<CheckoutSession> {
    return this.checkouts.create(cartId);
  }
}
