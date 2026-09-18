/**
 * The two interfaces every platform integration implements.
 *
 * CommerceAdapter = shopper-facing, safe to call with a storefront/public
 * API token (Shopify Storefront API, BigCommerce Storefront/Catalog APIs).
 *
 * MerchantAdapter = back-office operations that require an admin-scoped
 * token (Shopify Admin GraphQL API, BigCommerce Admin/V3 API). Never call
 * these from the shopper-facing chat.
 *
 * Both are implemented per platform under packages/adapter-<platform>/.
 * No other package may call a platform's HTTP API directly.
 */

import type {
  AuditCatalogParams,
  AuditCatalogResult,
  Cart,
  CheckoutSession,
  Connection,
  GetLowStockParams,
  LowStockItem,
  Platform,
  Product,
  ProductLookup,
  SearchProductsParams,
} from "./types.js";

export interface CommerceAdapter {
  readonly platform: Platform;

  searchProducts(params: SearchProductsParams): Promise<Connection<Product>>;

  /** Look up by normalized id OR by handle/slug — exactly one is provided. */
  getProduct(lookup: ProductLookup): Promise<Product | null>;

  createCart(): Promise<Cart>;

  getCart(cartId: string): Promise<Cart | null>;

  addCartLine(cartId: string, variantId: string, quantity: number): Promise<Cart>;

  updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart>;

  removeCartLine(cartId: string, lineId: string): Promise<Cart>;

  /** Returns a hosted checkout URL for the given cart. */
  createCheckout(cartId: string): Promise<CheckoutSession>;
}

export interface MerchantAdapter {
  readonly platform: Platform;

  /** Variants at or below `threshold` units in stock, cursor-paginated. */
  getLowStock(params: GetLowStockParams): Promise<Connection<LowStockItem>>;

  /** Scans the catalog for data-quality issues (missing images, thin copy, etc). */
  auditCatalog(params?: AuditCatalogParams): Promise<AuditCatalogResult>;
}
