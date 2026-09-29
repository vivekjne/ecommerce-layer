import type { Connection, Money } from "@commerce/core";
import { all, money, one } from "./catalog.js";
import { now, transaction, type Db } from "./db.js";
import { NativeCommerceError } from "./errors.js";
import { decodeCursor, isNumber, toConnection } from "./pagination.js";
import type { PaymentProvider } from "./payments.js";

export interface Address {
  name: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2, e.g. "US". */
  country: string;
}

export type OrderStatus = "paid" | "fulfilled" | "cancelled";

export interface OrderLine {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  sku: string | null;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
  imageUrl: string | null;
}

export interface Order {
  id: string;
  /** Human-facing sequential number (#1001, #1002, …). Never used for lookup — `id` is. */
  number: number;
  status: OrderStatus;
  email: string;
  shippingAddress: Address;
  shippingMethod: { id: string; title: string };
  subtotal: Money;
  shipping: Money;
  tax: Money;
  total: Money;
  currencyCode: string;
  payment: { brand: string; last4: string };
  lines: OrderLine[];
  createdAt: string;
  fulfilledAt: string | null;
  cancelledAt: string | null;
}

export interface OrderRow {
  id: string;
  number: number;
  status: OrderStatus;
  email: string;
  shipping_address: string;
  shipping_method: string;
  currency_code: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  payment_reference: string;
  payment_brand: string;
  payment_last4: string;
  created_at: string;
  fulfilled_at: string | null;
  cancelled_at: string | null;
}

interface OrderLineRow {
  id: string;
  order_id: string;
  variant_id: string;
  product_id: string;
  title: string;
  variant_title: string;
  sku: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
  image_url: string | null;
}

export interface ListOrdersParams {
  first: number;
  after?: string;
  status?: OrderStatus;
}

export interface OrderStats {
  orderCount: number;
  openOrderCount: number;
  revenue: Money;
}

export class Orders {
  constructor(
    private readonly db: Db,
    private readonly payments: PaymentProvider,
    private readonly currencyCode: string,
  ) {}

  private hydrate(rows: OrderRow[]): Order[] {
    if (rows.length === 0) return [];
    const ids = rows.map((r) => r.id);
    const lineRows = all<OrderLineRow>(
      this.db,
      `SELECT * FROM order_lines WHERE order_id IN (${ids.map(() => "?").join(", ")}) ORDER BY order_id, position`,
      ids,
    );
    return rows.map((r) => ({
      id: r.id,
      number: r.number,
      status: r.status,
      email: r.email,
      shippingAddress: JSON.parse(r.shipping_address) as Address,
      shippingMethod: JSON.parse(r.shipping_method) as { id: string; title: string },
      subtotal: money(r.subtotal, r.currency_code),
      shipping: money(r.shipping, r.currency_code),
      tax: money(r.tax, r.currency_code),
      total: money(r.total, r.currency_code),
      currencyCode: r.currency_code,
      payment: { brand: r.payment_brand, last4: r.payment_last4 },
      lines: lineRows
        .filter((l) => l.order_id === r.id)
        .map((l) => ({
          id: l.id,
          variantId: l.variant_id,
          productId: l.product_id,
          title: l.title,
          variantTitle: l.variant_title,
          sku: l.sku,
          quantity: l.quantity,
          unitPrice: money(l.unit_price, r.currency_code),
          lineTotal: money(l.line_total, r.currency_code),
          imageUrl: l.image_url,
        })),
      createdAt: r.created_at,
      fulfilledAt: r.fulfilled_at,
      cancelledAt: r.cancelled_at,
    }));
  }

  get(orderId: string): Order | null {
    const row = one<OrderRow>(this.db, "SELECT * FROM orders WHERE id = ?", [orderId]);
    return row ? this.hydrate([row])[0]! : null;
  }

  /** Newest first. */
  list(params: ListOrdersParams): Connection<Order> {
    const where: string[] = [];
    const args: (string | number)[] = [];
    if (params.status) {
      where.push("status = ?");
      args.push(params.status);
    }
    if (params.after) {
      where.push("number < ?");
      args.push(decodeCursor(params.after, isNumber));
    }
    const rows = all<OrderRow>(
      this.db,
      `SELECT * FROM orders ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY number DESC LIMIT ?`,
      [...args, params.first + 1],
    );
    const conn = toConnection(rows, params.first, Boolean(params.after), (r) => r.number);
    const hydrated = this.hydrate(conn.edges.map((e) => e.node));
    return { edges: conn.edges.map((e, i) => ({ cursor: e.cursor, node: hydrated[i]! })), pageInfo: conn.pageInfo };
  }

  stats(): OrderStats {
    const row = one<{ order_count: number; open_count: number; revenue: number }>(
      this.db,
      `SELECT COUNT(*) AS order_count,
              COALESCE(SUM(status = 'paid'), 0) AS open_count,
              COALESCE(SUM(CASE WHEN status != 'cancelled' THEN total ELSE 0 END), 0) AS revenue
       FROM orders`,
    )!;
    return { orderCount: row.order_count, openOrderCount: row.open_count, revenue: money(row.revenue, this.currencyCode) };
  }

  fulfill(orderId: string): Order {
    transaction(this.db, () => {
      const order = one<{ status: OrderStatus }>(this.db, "SELECT status FROM orders WHERE id = ?", [orderId]);
      if (!order) throw new NativeCommerceError("not_found", `Order not found: ${orderId}`);
      if (order.status !== "paid") throw new NativeCommerceError("invalid_state", `Only paid orders can be fulfilled (this one is ${order.status}).`);
      this.db.prepare("UPDATE orders SET status = 'fulfilled', fulfilled_at = ? WHERE id = ?").run(now(), orderId);
    });
    return this.get(orderId)!;
  }

  /** Cancels an unfulfilled order: restocks every line and refunds the payment. */
  async cancel(orderId: string): Promise<Order> {
    const row = transaction(this.db, () => {
      const order = one<OrderRow>(this.db, "SELECT * FROM orders WHERE id = ?", [orderId]);
      if (!order) throw new NativeCommerceError("not_found", `Order not found: ${orderId}`);
      if (order.status !== "paid") throw new NativeCommerceError("invalid_state", `Only unfulfilled paid orders can be cancelled (this one is ${order.status}).`);
      const lines = all<{ variant_id: string; quantity: number }>(this.db, "SELECT variant_id, quantity FROM order_lines WHERE order_id = ?", [orderId]);
      const restock = this.db.prepare("UPDATE variants SET inventory_quantity = inventory_quantity + ? WHERE id = ?");
      for (const line of lines) restock.run(line.quantity, line.variant_id);
      this.db.prepare("UPDATE orders SET status = 'cancelled', cancelled_at = ? WHERE id = ?").run(now(), orderId);
      return order;
    });
    await this.payments.refund(row.payment_reference, money(row.total, row.currency_code));
    return this.get(orderId)!;
  }
}
