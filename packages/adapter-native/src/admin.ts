import type { Connection, Product, ProductStatus } from "@commerce/core";
import { ALL_STATUSES, one, type Catalog } from "./catalog.js";
import { now, transaction, type Db } from "./db.js";
import { NativeCommerceError } from "./errors.js";
import { newId } from "./ids.js";

export interface ProductUpdate {
  title?: string;
  description?: string;
  status?: ProductStatus;
  productType?: string | null;
  vendor?: string | null;
  tags?: string[];
}

export interface VariantUpdate {
  /** Minor units. */
  price?: number;
  compareAtPrice?: number | null;
  inventoryQuantity?: number;
  sku?: string | null;
}

export interface NewProductInput {
  title: string;
  handle?: string;
  description: string;
  productType?: string | null;
  vendor?: string | null;
  tags?: string[];
  status: ProductStatus;
  imageUrl?: string | null;
  /** Minor units. */
  price: number;
  inventoryQuantity: number;
  sku?: string | null;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isNonNegativeInt(n: unknown): n is number {
  return typeof n === "number" && Number.isInteger(n) && n >= 0;
}

/** Back-office catalog management — sees every status, not just active products. */
export class CatalogAdmin {
  constructor(
    private readonly db: Db,
    private readonly catalog: Catalog,
  ) {}

  listProducts(params: { first: number; after?: string; query?: string; status?: ProductStatus }): Connection<Product> {
    return this.catalog.search({ query: params.query }, params.first, params.after, params.status ? [params.status] : ALL_STATUSES);
  }

  getProduct(id: string): Product | null {
    return this.catalog.getById(id, ALL_STATUSES);
  }

  counts(): { productCount: number; activeCount: number } {
    const row = one<{ total: number; active: number }>(
      this.db,
      "SELECT COUNT(*) AS total, COALESCE(SUM(status = 'active'), 0) AS active FROM products",
    )!;
    return { productCount: row.total, activeCount: row.active };
  }

  updateProduct(id: string, update: ProductUpdate): Product {
    const sets: string[] = [];
    const args: (string | null)[] = [];
    if (update.title !== undefined) {
      if (!update.title.trim()) throw new NativeCommerceError("invalid_input", "Title is required.", { title: "Title is required." });
      sets.push("title = ?");
      args.push(update.title.trim());
    }
    if (update.description !== undefined) {
      sets.push("description = ?");
      args.push(update.description);
    }
    if (update.status !== undefined) {
      if (!ALL_STATUSES.includes(update.status)) throw new NativeCommerceError("invalid_input", "Invalid status.");
      sets.push("status = ?");
      args.push(update.status);
    }
    if (update.productType !== undefined) {
      sets.push("product_type = ?");
      args.push(update.productType?.trim() || null);
    }
    if (update.vendor !== undefined) {
      sets.push("vendor = ?");
      args.push(update.vendor?.trim() || null);
    }
    if (update.tags !== undefined) {
      sets.push("tags = ?");
      args.push(JSON.stringify(update.tags.map((t) => t.trim()).filter(Boolean)));
    }

    if (sets.length > 0) {
      const result = this.db
        .prepare(`UPDATE products SET ${sets.join(", ")}, updated_at = ? WHERE id = ?`)
        .run(...args, now(), id);
      if (result.changes === 0) throw new NativeCommerceError("not_found", `Product not found: ${id}`);
    }
    const product = this.getProduct(id);
    if (!product) throw new NativeCommerceError("not_found", `Product not found: ${id}`);
    return product;
  }

  updateVariant(id: string, update: VariantUpdate): Product {
    const sets: string[] = [];
    const args: (string | number | null)[] = [];
    if (update.price !== undefined) {
      if (!isNonNegativeInt(update.price)) throw new NativeCommerceError("invalid_input", "Price must be a non-negative amount.", { price: "Enter a valid price." });
      sets.push("price = ?");
      args.push(update.price);
    }
    if (update.compareAtPrice !== undefined) {
      if (update.compareAtPrice !== null && !isNonNegativeInt(update.compareAtPrice)) {
        throw new NativeCommerceError("invalid_input", "Compare-at price must be a non-negative amount.", { compareAtPrice: "Enter a valid price." });
      }
      sets.push("compare_at_price = ?");
      args.push(update.compareAtPrice);
    }
    if (update.inventoryQuantity !== undefined) {
      if (!isNonNegativeInt(update.inventoryQuantity)) {
        throw new NativeCommerceError("invalid_input", "Inventory must be a whole number, 0 or more.", { inventoryQuantity: "Enter 0 or more." });
      }
      sets.push("inventory_quantity = ?");
      args.push(update.inventoryQuantity);
    }
    if (update.sku !== undefined) {
      sets.push("sku = ?");
      args.push(update.sku?.trim() || null);
    }

    const variant = one<{ product_id: string }>(this.db, "SELECT product_id FROM variants WHERE id = ?", [id]);
    if (!variant) throw new NativeCommerceError("not_found", `Variant not found: ${id}`);
    if (sets.length > 0) {
      transaction(this.db, () => {
        this.db.prepare(`UPDATE variants SET ${sets.join(", ")} WHERE id = ?`).run(...args, id);
        this.db.prepare("UPDATE products SET updated_at = ? WHERE id = ?").run(now(), variant.product_id);
      });
    }
    return this.getProduct(variant.product_id)!;
  }

  /** Creates a single-variant product — multi-option products come from seed data or a future editor. */
  createProduct(input: NewProductInput): Product {
    const fieldErrors: Record<string, string> = {};
    const title = input.title.trim();
    const handle = slugify(input.handle?.trim() || title);
    if (!title) fieldErrors.title = "Title is required.";
    if (!handle) fieldErrors.handle = "Handle is required.";
    else if (one(this.db, "SELECT 1 FROM products WHERE handle = ?", [handle])) fieldErrors.handle = `The handle "${handle}" is already taken.`;
    if (!isNonNegativeInt(input.price)) fieldErrors.price = "Enter a valid price.";
    if (!isNonNegativeInt(input.inventoryQuantity)) fieldErrors.inventoryQuantity = "Enter 0 or more.";
    if (input.imageUrl) {
      try {
        const url = new URL(input.imageUrl);
        if (url.protocol !== "https:" && url.protocol !== "http:") fieldErrors.imageUrl = "Image URL must be http(s).";
      } catch {
        fieldErrors.imageUrl = "Enter a valid image URL.";
      }
    }
    if (Object.keys(fieldErrors).length > 0) throw new NativeCommerceError("invalid_input", "Please correct the highlighted fields.", fieldErrors);

    const id = newId("product");
    const ts = now();
    transaction(this.db, () => {
      const { position } = one<{ position: number }>(this.db, "SELECT COALESCE(MAX(position), 0) + 1 AS position FROM products")!;
      this.db
        .prepare(
          `INSERT INTO products (id, handle, title, description, vendor, product_type, status, tags, options, position, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, '[]', ?, ?, ?)`,
        )
        .run(
          id,
          handle,
          title,
          input.description,
          input.vendor?.trim() || null,
          input.productType?.trim() || null,
          input.status,
          JSON.stringify((input.tags ?? []).map((t) => t.trim()).filter(Boolean)),
          position,
          ts,
          ts,
        );
      this.db
        .prepare(
          `INSERT INTO variants (id, product_id, title, sku, price, inventory_quantity, selected_options, position)
           VALUES (?, ?, 'Default Title', ?, ?, ?, '[]', 0)`,
        )
        .run(newId("variant"), id, input.sku?.trim() || null, input.price, input.inventoryQuantity);
      if (input.imageUrl) {
        this.db.prepare("INSERT INTO product_images (product_id, url, alt_text, position) VALUES (?, ?, ?, 0)").run(id, input.imageUrl, title);
      }
    });
    return this.getProduct(id)!;
  }
}
