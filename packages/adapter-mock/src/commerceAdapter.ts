import type { Cart, CheckoutSession, CommerceAdapter, Connection, Product, ProductLookup, SearchProductsParams } from "@commerce/core";
import { paginate } from "./pagination.js";
import type { MockStore } from "./store.js";

/** Products visible through the shopper-facing CommerceAdapter (draft/archived are merchant-only). */
function shopperVisible(store: MockStore): Product[] {
  return [...store.products.values()].filter((p) => p.status === "active");
}

export class MockCommerceAdapter implements CommerceAdapter {
  readonly platform = "mock" as const;

  constructor(private readonly store: MockStore) {}

  async searchProducts(params: SearchProductsParams): Promise<Connection<Product>> {
    let results = shopperVisible(this.store);
    const f = params.filters;

    if (f?.query) {
      const q = f.query.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          (p.vendor ?? "").toLowerCase().includes(q) ||
          (p.productType ?? "").toLowerCase().includes(q),
      );
    }
    if (f?.productType) results = results.filter((p) => p.productType === f.productType);
    if (f?.vendor) results = results.filter((p) => p.vendor === f.vendor);
    if (f?.tags && f.tags.length > 0) {
      const tags = f.tags;
      results = results.filter((p) => tags.every((t) => p.tags.includes(t)));
    }
    if (f?.minPrice != null) results = results.filter((p) => p.minPrice.amount >= f.minPrice!);
    if (f?.maxPrice != null) results = results.filter((p) => p.maxPrice.amount <= f.maxPrice!);
    if (f?.availableForSale != null) {
      results = results.filter((p) => (p.totalInventory > 0) === f.availableForSale);
    }

    return paginate(results, params.first, params.after);
  }

  async getProduct(lookup: ProductLookup): Promise<Product | null> {
    let product: Product | undefined;
    if ("id" in lookup) {
      product = this.store.products.get(lookup.id);
    } else {
      const id = this.store.productsByHandle.get(lookup.handle);
      product = id ? this.store.products.get(id) : undefined;
    }
    if (!product || product.status !== "active") return null;
    return product;
  }

  async createCart(): Promise<Cart> {
    return this.store.createCart();
  }

  async getCart(cartId: string): Promise<Cart | null> {
    return this.store.carts.get(cartId) ?? null;
  }

  async addCartLine(cartId: string, variantId: string, quantity: number): Promise<Cart> {
    return this.store.addCartLine(cartId, variantId, quantity);
  }

  async updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
    return this.store.updateCartLine(cartId, lineId, quantity);
  }

  async removeCartLine(cartId: string, lineId: string): Promise<Cart> {
    return this.store.removeCartLine(cartId, lineId);
  }

  async createCheckout(cartId: string): Promise<CheckoutSession> {
    return this.store.createCheckout(cartId);
  }
}
