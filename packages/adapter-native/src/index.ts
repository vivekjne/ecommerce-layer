import { CatalogAdmin } from "./admin.js";
import { Carts } from "./carts.js";
import { Catalog } from "./catalog.js";
import { Checkouts } from "./checkout.js";
import { DEFAULT_CONFIG, type NativeStoreConfig } from "./config.js";
import { openDatabase, type Db } from "./db.js";
import { NativeCommerceAdapter } from "./commerceAdapter.js";
import { NativeMerchantAdapter } from "./merchantAdapter.js";
import { Orders } from "./orders.js";
import { TestPaymentProvider, type PaymentProvider } from "./payments.js";
import { seedIfEmpty } from "./seed.js";

export { NativeCommerceAdapter } from "./commerceAdapter.js";
export { NativeMerchantAdapter } from "./merchantAdapter.js";
export { NativeCommerceError, isNativeCommerceError, type NativeErrorCode } from "./errors.js";
export { TEST_DECLINE_CARD, TestPaymentProvider, type CardDetails, type PaymentProvider } from "./payments.js";
export { shippingPrice, taxFor, type Checkout, type CheckoutStatus, type CompleteCheckoutInput, type ShippingOption } from "./checkout.js";
export type { Address, Order, OrderLine, OrderStats, OrderStatus, ListOrdersParams } from "./orders.js";
export type { NewProductInput, ProductUpdate, VariantUpdate } from "./admin.js";
export type { NativeStoreConfig, ShippingRate } from "./config.js";
export { defaultDatabasePath } from "./db.js";

export interface NativeBackendOptions {
  /** SQLite file path, or ":memory:". Defaults to $DATABASE_PATH, else <workspace>/data/commerce.db. */
  databasePath?: string;
  config?: Partial<NativeStoreConfig>;
  payments?: PaymentProvider;
  /** Load the starter catalog into an empty database. Default true. */
  seed?: boolean;
}

export interface NativeBackend {
  commerce: NativeCommerceAdapter;
  merchant: NativeMerchantAdapter;
  checkouts: Checkouts;
  orders: Orders;
  admin: CatalogAdmin;
  config: NativeStoreConfig;
  db: Db;
  close(): void;
}

/**
 * The native commerce backend: our own catalog, carts, checkout and
 * orders, persisted in SQLite. `commerce`/`merchant` are the standard
 * adapter-contract surface every app uses; `checkouts`/`orders`/`admin`
 * are this platform's own hosted-checkout and back-office services, the
 * equivalent of Shopify's checkout pages and admin.
 */
export function createNativeBackend(options: NativeBackendOptions = {}): NativeBackend {
  const config: NativeStoreConfig = { ...DEFAULT_CONFIG, ...options.config };
  const db = openDatabase(options.databasePath);
  if (options.seed ?? true) seedIfEmpty(db);

  const payments = options.payments ?? new TestPaymentProvider();
  const catalog = new Catalog(db, config.currencyCode);
  const carts = new Carts(db, config.currencyCode);
  const checkouts = new Checkouts(db, carts, payments, config);

  return {
    commerce: new NativeCommerceAdapter(catalog, carts, checkouts),
    merchant: new NativeMerchantAdapter(db, catalog),
    checkouts,
    orders: new Orders(db, payments, config.currencyCode),
    admin: new CatalogAdmin(db, catalog),
    config,
    db,
    close: () => db.close(),
  };
}
