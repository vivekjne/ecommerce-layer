import type { Cart, CartLine } from "@commerce/core";
import { all, money, one } from "./catalog.js";
import { now, transaction, type Db } from "./db.js";
import { NativeCommerceError } from "./errors.js";
import { newId } from "./ids.js";

interface LineRow {
  id: string;
  variant_id: string;
  product_id: string;
  quantity: number;
  title: string;
  variant_title: string;
  sku: string | null;
  price: number;
  inventory_quantity: number;
  product_status: string;
  image_url: string | null;
  image_alt: string | null;
}

export interface CartLineDetail extends CartLine {
  sku: string | null;
  inventoryQuantity: number;
  productStatus: string;
}

const LINE_SELECT = `
  SELECT l.id, l.variant_id, v.product_id, l.quantity, p.title, v.title AS variant_title, v.sku, v.price,
         v.inventory_quantity, p.status AS product_status,
         (SELECT url FROM product_images i WHERE i.product_id = p.id ORDER BY i.position LIMIT 1) AS image_url,
         (SELECT alt_text FROM product_images i WHERE i.product_id = p.id ORDER BY i.position LIMIT 1) AS image_alt
  FROM cart_lines l
  JOIN variants v ON v.id = l.variant_id
  JOIN products p ON p.id = v.product_id
  WHERE l.cart_id = ?
  ORDER BY l.rowid`;

function stockMessage(title: string, variantTitle: string, available: number): string {
  const name = variantTitle && variantTitle !== "Default Title" ? `${title} (${variantTitle})` : title;
  return available === 0 ? `${name} is sold out.` : `Only ${available} of ${name} left in stock.`;
}

/**
 * Cart state. Prices are always read live from the variant, never stored on
 * the line — a price change in the admin shows up in open carts
 * immediately, and the order snapshots whatever price was current at
 * purchase time.
 */
export class Carts {
  constructor(
    private readonly db: Db,
    private readonly currencyCode: string,
  ) {}

  lineDetails(cartId: string): CartLineDetail[] {
    return all<LineRow>(this.db, LINE_SELECT, [cartId]).map((r) => ({
      id: r.id,
      variantId: r.variant_id,
      productId: r.product_id,
      title: r.title,
      variantTitle: r.variant_title,
      quantity: r.quantity,
      unitPrice: money(r.price, this.currencyCode),
      lineTotal: money(r.price * r.quantity, this.currencyCode),
      image: r.image_url ? { url: r.image_url, altText: r.image_alt, width: null, height: null } : null,
      sku: r.sku,
      inventoryQuantity: r.inventory_quantity,
      productStatus: r.product_status,
    }));
  }

  private build(cartId: string): Cart {
    const lines: CartLine[] = this.lineDetails(cartId).map(
      ({ sku: _sku, inventoryQuantity: _inv, productStatus: _status, ...line }) => line,
    );
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal.amount, 0);
    return {
      id: cartId,
      lines,
      subtotal: money(subtotal, this.currencyCode),
      total: money(subtotal, this.currencyCode),
      // Tax depends on the shipping address, so it's only known at checkout.
      totalTax: null,
      currencyCode: this.currencyCode,
    };
  }

  private requireOpen(cartId: string): void {
    const row = one<{ status: string }>(this.db, "SELECT status FROM carts WHERE id = ?", [cartId]);
    if (!row) throw new NativeCommerceError("not_found", `Cart not found: ${cartId}`);
    if (row.status !== "open") throw new NativeCommerceError("cart_closed", "This cart has already been checked out.");
  }

  private touch(cartId: string): void {
    this.db.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").run(now(), cartId);
  }

  private assertStock(variantId: string, requested: number): void {
    const v = one<{ title: string; variant_title: string; inventory_quantity: number; status: string }>(
      this.db,
      `SELECT p.title, v.title AS variant_title, v.inventory_quantity, p.status
       FROM variants v JOIN products p ON p.id = v.product_id WHERE v.id = ?`,
      [variantId],
    );
    if (!v || v.status !== "active") throw new NativeCommerceError("not_found", `Variant not found: ${variantId}`);
    if (requested > v.inventory_quantity) {
      throw new NativeCommerceError("insufficient_inventory", stockMessage(v.title, v.variant_title, v.inventory_quantity));
    }
  }

  create(): Cart {
    const id = newId("cart");
    const ts = now();
    this.db.prepare("INSERT INTO carts (id, status, created_at, updated_at) VALUES (?, 'open', ?, ?)").run(id, ts, ts);
    return this.build(id);
  }

  /** Open carts only — a checked-out cart reads as gone, so callers start a fresh one. */
  get(cartId: string): Cart | null {
    const row = one<{ status: string }>(this.db, "SELECT status FROM carts WHERE id = ?", [cartId]);
    return row?.status === "open" ? this.build(cartId) : null;
  }

  addLine(cartId: string, variantId: string, quantity: number): Cart {
    if (!Number.isInteger(quantity) || quantity < 1) throw new NativeCommerceError("invalid_input", "Quantity must be at least 1.");
    return transaction(this.db, () => {
      this.requireOpen(cartId);
      const existing = one<{ id: string; quantity: number }>(
        this.db,
        "SELECT id, quantity FROM cart_lines WHERE cart_id = ? AND variant_id = ?",
        [cartId, variantId],
      );
      this.assertStock(variantId, (existing?.quantity ?? 0) + quantity);
      if (existing) {
        this.db.prepare("UPDATE cart_lines SET quantity = quantity + ? WHERE id = ?").run(quantity, existing.id);
      } else {
        this.db
          .prepare("INSERT INTO cart_lines (id, cart_id, variant_id, quantity) VALUES (?, ?, ?, ?)")
          .run(newId("line"), cartId, variantId, quantity);
      }
      this.touch(cartId);
      return this.build(cartId);
    });
  }

  updateLine(cartId: string, lineId: string, quantity: number): Cart {
    if (!Number.isInteger(quantity)) throw new NativeCommerceError("invalid_input", "Quantity must be a whole number.");
    return transaction(this.db, () => {
      this.requireOpen(cartId);
      const line = one<{ variant_id: string }>(this.db, "SELECT variant_id FROM cart_lines WHERE id = ? AND cart_id = ?", [
        lineId,
        cartId,
      ]);
      if (!line) throw new NativeCommerceError("not_found", `Cart line not found: ${lineId}`);
      if (quantity <= 0) {
        this.db.prepare("DELETE FROM cart_lines WHERE id = ?").run(lineId);
      } else {
        this.assertStock(line.variant_id, quantity);
        this.db.prepare("UPDATE cart_lines SET quantity = ? WHERE id = ?").run(quantity, lineId);
      }
      this.touch(cartId);
      return this.build(cartId);
    });
  }

  removeLine(cartId: string, lineId: string): Cart {
    return transaction(this.db, () => {
      this.requireOpen(cartId);
      this.db.prepare("DELETE FROM cart_lines WHERE id = ? AND cart_id = ?").run(lineId, cartId);
      this.touch(cartId);
      return this.build(cartId);
    });
  }
}
