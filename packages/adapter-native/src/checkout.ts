import type { CartLine, CheckoutSession, Money } from "@commerce/core";
import type { CartLineDetail, Carts } from "./carts.js";
import { money, one } from "./catalog.js";
import type { NativeStoreConfig, ShippingRate } from "./config.js";
import { now, transaction, type Db } from "./db.js";
import { NativeCommerceError } from "./errors.js";
import { newId } from "./ids.js";
import type { Address } from "./orders.js";
import { validateCard, type CardDetails, type PaymentProvider } from "./payments.js";

export type CheckoutStatus = "open" | "processing" | "completed";

export interface ShippingOption {
  id: string;
  title: string;
  description: string;
  price: Money;
}

export interface Checkout {
  id: string;
  cartId: string;
  status: CheckoutStatus;
  orderId: string | null;
  lines: CartLine[];
  subtotal: Money;
  shippingOptions: ShippingOption[];
  /** Tax on merchandise only, so it doesn't depend on the shipping method chosen. */
  tax: Money;
  currencyCode: string;
}

export interface CompleteCheckoutInput {
  email: string;
  shippingAddress: Address;
  shippingRateId: string;
  card: CardDetails;
}

interface CheckoutRow {
  id: string;
  cart_id: string;
  status: CheckoutStatus;
  order_id: string | null;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function shippingPrice(rate: ShippingRate, subtotal: number): number {
  return rate.freeOverSubtotal != null && subtotal >= rate.freeOverSubtotal ? 0 : rate.amount;
}

/** Tax on merchandise only, rounded half-up to the nearest minor unit. */
export function taxFor(subtotal: number, basisPoints: number): number {
  return Math.round((subtotal * basisPoints) / 10_000);
}

function validateAddress(address: Address): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!address.name.trim()) errors.name = "Enter your full name.";
  if (!address.line1.trim()) errors.line1 = "Enter your street address.";
  if (!address.city.trim()) errors.city = "Enter your city.";
  if (!address.region.trim()) errors.region = "Enter your state or region.";
  if (!address.postalCode.trim()) errors.postalCode = "Enter your postal code.";
  if (!/^[A-Z]{2}$/.test(address.country)) errors.country = "Choose a country.";
  return errors;
}

/**
 * The native backend's hosted checkout. Shopify/BigCommerce host their own
 * checkout pages; this backend's is rendered by whichever app sets
 * `checkoutBaseUrl`, and drives this service.
 */
export class Checkouts {
  constructor(
    private readonly db: Db,
    private readonly carts: Carts,
    private readonly payments: PaymentProvider,
    private readonly config: NativeStoreConfig,
  ) {}

  create(cartId: string): CheckoutSession {
    const cart = one<{ status: string }>(this.db, "SELECT status FROM carts WHERE id = ?", [cartId]);
    if (!cart) throw new NativeCommerceError("not_found", `Cart not found: ${cartId}`);
    if (cart.status !== "open") throw new NativeCommerceError("cart_closed", "This cart has already been checked out.");
    if (this.carts.lineDetails(cartId).length === 0) throw new NativeCommerceError("invalid_input", "Your cart is empty.");

    const id = newId("checkout");
    const ts = now();
    this.db
      .prepare("INSERT INTO checkouts (id, cart_id, status, created_at, updated_at) VALUES (?, ?, 'open', ?, ?)")
      .run(id, cartId, ts, ts);
    return { id, cartId, url: new URL(`/checkout/${id}`, this.config.checkoutBaseUrl).toString() };
  }

  get(checkoutId: string): Checkout | null {
    const row = one<CheckoutRow>(this.db, "SELECT id, cart_id, status, order_id FROM checkouts WHERE id = ?", [checkoutId]);
    if (!row) return null;
    const details = this.carts.lineDetails(row.cart_id);
    const lines: CartLine[] = details.map(({ sku: _s, inventoryQuantity: _i, productStatus: _p, ...line }) => line);
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal.amount, 0);
    const { currencyCode } = this.config;
    return {
      id: row.id,
      cartId: row.cart_id,
      status: row.status,
      orderId: row.order_id,
      lines,
      subtotal: money(subtotal, currencyCode),
      shippingOptions: this.config.shippingRates.map((rate) => ({
        id: rate.id,
        title: rate.title,
        description: rate.description,
        price: money(shippingPrice(rate, subtotal), currencyCode),
      })),
      tax: money(taxFor(subtotal, this.config.taxRateBasisPoints), currencyCode),
      currencyCode,
    };
  }

  /**
   * Places the order. Stock is reserved (decremented) in one transaction
   * before the card is charged, so two shoppers can't both buy the last
   * unit; a declined card releases the reservation. Calling this again for
   * an already-completed checkout returns the existing order id instead of
   * charging twice.
   */
  async complete(checkoutId: string, input: CompleteCheckoutInput): Promise<{ orderId: string }> {
    const email = input.email.trim();
    const address: Address = {
      name: input.shippingAddress.name.trim(),
      line1: input.shippingAddress.line1.trim(),
      line2: input.shippingAddress.line2.trim(),
      city: input.shippingAddress.city.trim(),
      region: input.shippingAddress.region.trim(),
      postalCode: input.shippingAddress.postalCode.trim(),
      country: input.shippingAddress.country.trim().toUpperCase(),
    };
    const rate = this.config.shippingRates.find((r) => r.id === input.shippingRateId);

    const fieldErrors: Record<string, string> = {
      ...(EMAIL_PATTERN.test(email) ? {} : { email: "Enter a valid email address." }),
      ...validateAddress(address),
      ...(rate ? {} : { shippingRate: "Choose a shipping method." }),
      ...validateCard(input.card),
    };
    if (Object.keys(fieldErrors).length > 0 || !rate) {
      throw new NativeCommerceError("invalid_input", "Please correct the highlighted fields.", fieldErrors);
    }

    const reserved = transaction(this.db, () => {
      const row = one<CheckoutRow>(this.db, "SELECT id, cart_id, status, order_id FROM checkouts WHERE id = ?", [checkoutId]);
      if (!row) throw new NativeCommerceError("not_found", `Checkout not found: ${checkoutId}`);
      if (row.status === "completed") return { kind: "completed" as const, orderId: row.order_id! };
      if (row.status === "processing") throw new NativeCommerceError("checkout_closed", "This order is already being processed.");

      const cartStatus = one<{ status: string }>(this.db, "SELECT status FROM carts WHERE id = ?", [row.cart_id])!.status;
      if (cartStatus !== "open") throw new NativeCommerceError("cart_closed", "This cart has already been checked out.");

      const lines = this.carts.lineDetails(row.cart_id);
      if (lines.length === 0) throw new NativeCommerceError("invalid_input", "Your cart is empty.");
      for (const line of lines) {
        if (line.productStatus !== "active") {
          throw new NativeCommerceError("insufficient_inventory", `${line.title} is no longer available. Remove it from your cart to continue.`);
        }
        if (line.quantity > line.inventoryQuantity) {
          const left = line.inventoryQuantity === 0 ? "is sold out" : `only has ${line.inventoryQuantity} left`;
          throw new NativeCommerceError("insufficient_inventory", `${line.title} (${line.variantTitle}) ${left}. Update your cart to continue.`);
        }
      }

      const decrement = this.db.prepare("UPDATE variants SET inventory_quantity = inventory_quantity - ? WHERE id = ?");
      for (const line of lines) decrement.run(line.quantity, line.variantId);
      this.db.prepare("UPDATE checkouts SET status = 'processing', updated_at = ? WHERE id = ?").run(now(), checkoutId);

      const subtotal = lines.reduce((sum, l) => sum + l.lineTotal.amount, 0);
      const shipping = shippingPrice(rate, subtotal);
      const tax = taxFor(subtotal, this.config.taxRateBasisPoints);
      return { kind: "reserved" as const, cartId: row.cart_id, lines, subtotal, shipping, tax, total: subtotal + shipping + tax };
    });

    if (reserved.kind === "completed") return { orderId: reserved.orderId };

    const { currencyCode } = this.config;
    let payment;
    try {
      payment = await this.payments.charge(money(reserved.total, currencyCode), input.card);
    } catch (err) {
      this.release(checkoutId, reserved.lines);
      throw err;
    }

    const orderId = transaction(this.db, () => this.insertOrder(checkoutId, reserved, email, address, rate, payment));
    return { orderId };
  }

  private release(checkoutId: string, lines: CartLineDetail[]): void {
    transaction(this.db, () => {
      const restock = this.db.prepare("UPDATE variants SET inventory_quantity = inventory_quantity + ? WHERE id = ?");
      for (const line of lines) restock.run(line.quantity, line.variantId);
      this.db.prepare("UPDATE checkouts SET status = 'open', updated_at = ? WHERE id = ?").run(now(), checkoutId);
    });
  }

  private insertOrder(
    checkoutId: string,
    reserved: { cartId: string; lines: CartLineDetail[]; subtotal: number; shipping: number; tax: number; total: number },
    email: string,
    address: Address,
    rate: ShippingRate,
    payment: { reference: string; brand: string; last4: string },
  ): string {
    const orderId = newId("order");
    const ts = now();
    const { number } = one<{ number: number }>(this.db, "SELECT COALESCE(MAX(number), 1000) + 1 AS number FROM orders")!;

    this.db
      .prepare(
        `INSERT INTO orders (id, number, checkout_id, status, email, shipping_address, shipping_method, currency_code,
           subtotal, shipping, tax, total, payment_reference, payment_brand, payment_last4, created_at)
         VALUES (?, ?, ?, 'paid', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        orderId,
        number,
        checkoutId,
        email,
        JSON.stringify(address),
        JSON.stringify({ id: rate.id, title: rate.title }),
        this.config.currencyCode,
        reserved.subtotal,
        reserved.shipping,
        reserved.tax,
        reserved.total,
        payment.reference,
        payment.brand,
        payment.last4,
        ts,
      );

    const insertLine = this.db.prepare(
      `INSERT INTO order_lines (id, order_id, variant_id, product_id, title, variant_title, sku, quantity, unit_price, line_total, image_url, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    reserved.lines.forEach((line, i) => {
      insertLine.run(
        newId("order_line"),
        orderId,
        line.variantId,
        line.productId,
        line.title,
        line.variantTitle,
        line.sku,
        line.quantity,
        line.unitPrice.amount,
        line.lineTotal.amount,
        line.image?.url ?? null,
        i,
      );
    });

    this.db.prepare("UPDATE checkouts SET status = 'completed', order_id = ?, updated_at = ? WHERE id = ?").run(orderId, ts, checkoutId);
    this.db.prepare("UPDATE carts SET status = 'completed', updated_at = ? WHERE id = ?").run(ts, reserved.cartId);
    return orderId;
  }
}
