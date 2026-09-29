# @commerce/adapter-native

Our own commerce backend: catalog, carts, checkout, orders and inventory,
persisted in SQLite via Node's built-in `node:sqlite` (Node ≥ 22.13; no
native module to compile). It is a platform like Shopify or BigCommerce,
so every app reaches it through the same `CommerceAdapter` /
`MerchantAdapter` contract, and it passes `packages/core/test/contract.ts`.

```ts
import { createNativeBackend } from "@commerce/adapter-native";

const native = createNativeBackend(); // $DATABASE_PATH, else <workspace>/data/commerce.db
native.commerce; // CommerceAdapter: search, products, carts, createCheckout
native.merchant; // MerchantAdapter: low stock, catalog audit
native.checkouts; // hosted checkout: get, complete (validate → reserve stock → charge → order)
native.orders; // get, list, stats, fulfill, cancel (restock + refund)
native.admin; // product/variant editing, product creation
```

The last three are this platform's own services. Shopify hosts its own
checkout and admin; this backend's checkout and admin are rendered by
`apps/storefront` (`/checkout/:id`, `/orders/:id`, `/admin`).

## Behavior worth knowing

- **Ids** are random (`cart_…`, `checkout_…`, `order_…`), never sequential,
  because carts, checkouts and order-status pages are reachable by id
  alone. Orders also get a human-facing `number` (#1001, …) that is never
  used for lookup.
- **Prices** in a cart are read live from the variant. An order snapshots
  the price at purchase time.
- **Stock** is checked when an item is added to or updated in a cart. At
  checkout it is re-checked and reserved (decremented) in one transaction
  before the card is charged, so two shoppers can't both buy the last
  unit. A declined card releases the reservation, and cancelling an order
  restocks it. Completing a checkout twice returns the same order.
- **Payments** go through a `PaymentProvider` interface. The default
  `TestPaymentProvider` moves no money: any Luhn-valid card is approved
  except `4000 0000 0000 0002`, which is always declined. Only the brand
  and last 4 digits are stored. A real integration (e.g. Stripe) should
  take a client-side token so card numbers never reach this server.
- **Tax** is a flat rate on merchandise (`TAX_RATE_BASIS_POINTS`, default
  0). **Shipping** is Standard ($5.99, free over $75) or Express ($14.99),
  set in `config.ts`.
- **Pagination** is keyset-based behind opaque cursors (product position,
  order number, `[inventory, variantId]` for low stock), never offsets.
- The database is migrated on open (`PRAGMA user_version`) and seeded
  from `src/fixtures/products.json` when empty.

## Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `DATABASE_PATH` | `<workspace>/data/commerce.db` | SQLite file, or `:memory:` |
| `PUBLIC_STOREFRONT_URL` | `http://localhost:5173` | Origin used to build absolute checkout URLs |
| `TAX_RATE_BASIS_POINTS` | `0` | Flat tax rate (825 = 8.25%) |

SQLite needs a persistent disk, so deploy to a host with a volume
(Railway, Fly, Render). It won't run on Cloudflare Workers or other
filesystem-less serverless runtimes.
