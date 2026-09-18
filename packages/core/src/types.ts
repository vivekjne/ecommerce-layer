/**
 * Normalized commerce types shared by every adapter, app, and MCP tool.
 * Platform-specific fields never leak past packages/adapter-* — if a
 * platform exposes something these types don't capture, it gets mapped
 * or dropped in the adapter, not bolted on here.
 */

// ---------------------------------------------------------------------------
// Money — always integer minor units (e.g. cents). Never a float dollar amount.
// ---------------------------------------------------------------------------

export interface Money {
  /** Integer minor units, e.g. 1999 for $19.99. */
  amount: number;
  /** ISO 4217 currency code, e.g. "USD". */
  currencyCode: string;
}

// ---------------------------------------------------------------------------
// Cursor-based pagination
// ---------------------------------------------------------------------------

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

export interface ForwardPaginationArgs {
  first: number;
  after?: string;
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export interface Image {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Variant {
  id: string;
  productId: string;
  title: string;
  sku: string | null;
  price: Money;
  compareAtPrice: Money | null;
  availableForSale: boolean;
  inventoryQuantity: number;
  selectedOptions: SelectedOption[];
  image: Image | null;
}

export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string | null;
  images: Image[];
  options: ProductOption[];
  variants: Variant[];
  tags: string[];
  vendor: string | null;
  productType: string | null;
  status: ProductStatus;
  /** Lowest variant price; convenience for list views. */
  minPrice: Money;
  /** Highest variant price; convenience for list views. */
  maxPrice: Money;
  totalInventory: number;
}

export interface ProductFilters {
  /** Free-text search across title/description/tags. */
  query?: string;
  productType?: string;
  vendor?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  availableForSale?: boolean;
}

export type SearchProductsParams = ForwardPaginationArgs & {
  filters?: ProductFilters;
};

export type ProductLookup = { id: string } | { handle: string };

// ---------------------------------------------------------------------------
// Cart & checkout
// ---------------------------------------------------------------------------

export interface CartLine {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
  image: Image | null;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  subtotal: Money;
  total: Money;
  totalTax: Money | null;
  currencyCode: string;
}

export interface CheckoutSession {
  id: string;
  cartId: string;
  /** Hosted checkout URL the shopper is redirected to. Never auto-opened. */
  url: string;
}

// ---------------------------------------------------------------------------
// Merchant operations
// ---------------------------------------------------------------------------

export interface LowStockItem {
  productId: string;
  productTitle: string;
  variantId: string;
  variantTitle: string;
  sku: string | null;
  inventoryQuantity: number;
  threshold: number;
}

export type GetLowStockParams = ForwardPaginationArgs & {
  threshold: number;
};

export type CatalogIssueType =
  | "missing_image"
  | "short_description"
  | "missing_price"
  | "no_variants"
  | "out_of_stock";

export type CatalogIssueSeverity = "warning" | "error";

export interface CatalogIssue {
  productId: string;
  productHandle: string;
  productTitle: string;
  type: CatalogIssueType;
  severity: CatalogIssueSeverity;
  message: string;
}

export interface AuditCatalogParams {
  first?: number;
}

export interface AuditCatalogResult {
  issues: CatalogIssue[];
  scannedCount: number;
}

// ---------------------------------------------------------------------------
// Platform identity
// ---------------------------------------------------------------------------

export type Platform = "shopify" | "bigcommerce" | "mock";
