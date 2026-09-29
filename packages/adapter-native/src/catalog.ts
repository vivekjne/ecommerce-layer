import type {
  Connection,
  Image,
  Money,
  Product,
  ProductFilters,
  ProductOption,
  ProductStatus,
  SelectedOption,
  Variant,
} from "@commerce/core";
import type { SQLInputValue } from "node:sqlite";
import type { Db } from "./db.js";
import { decodeCursor, isNumber, mapConnection, toConnection } from "./pagination.js";

export interface ProductRow {
  id: string;
  handle: string;
  title: string;
  description: string;
  description_html: string | null;
  vendor: string | null;
  product_type: string | null;
  status: ProductStatus;
  tags: string;
  options: string;
  position: number;
}

export interface VariantRow {
  id: string;
  product_id: string;
  title: string;
  sku: string | null;
  price: number;
  compare_at_price: number | null;
  inventory_quantity: number;
  selected_options: string;
}

interface ImageRow {
  product_id: string;
  url: string;
  alt_text: string | null;
}

export function all<T>(db: Db, sql: string, params: SQLInputValue[] = []): T[] {
  return db.prepare(sql).all(...params) as T[];
}

export function one<T>(db: Db, sql: string, params: SQLInputValue[] = []): T | undefined {
  return db.prepare(sql).get(...params) as T | undefined;
}

export function money(amount: number, currencyCode: string): Money {
  return { amount, currencyCode };
}

function placeholders(n: number): string {
  return Array.from({ length: n }, () => "?").join(", ");
}

function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`);
}

export const SHOPPER_STATUSES: readonly ProductStatus[] = ["active"];
export const ALL_STATUSES: readonly ProductStatus[] = ["active", "draft", "archived"];

export class Catalog {
  constructor(
    private readonly db: Db,
    readonly currencyCode: string,
  ) {}

  private toVariant(row: VariantRow, image: Image | null): Variant {
    return {
      id: row.id,
      productId: row.product_id,
      title: row.title,
      sku: row.sku,
      price: money(row.price, this.currencyCode),
      compareAtPrice: row.compare_at_price != null ? money(row.compare_at_price, this.currencyCode) : null,
      availableForSale: row.inventory_quantity > 0,
      inventoryQuantity: row.inventory_quantity,
      selectedOptions: JSON.parse(row.selected_options) as SelectedOption[],
      image,
    };
  }

  /** Batch-loads variants and images for a page of product rows (2 queries, not 2N). */
  hydrate(rows: ProductRow[]): Product[] {
    if (rows.length === 0) return [];
    const ids = rows.map((r) => r.id);
    const variantRows = all<VariantRow>(
      this.db,
      `SELECT * FROM variants WHERE product_id IN (${placeholders(ids.length)}) ORDER BY product_id, position`,
      ids,
    );
    const imageRows = all<ImageRow>(
      this.db,
      `SELECT product_id, url, alt_text FROM product_images WHERE product_id IN (${placeholders(ids.length)}) ORDER BY product_id, position`,
      ids,
    );

    const imagesByProduct = new Map<string, Image[]>();
    for (const img of imageRows) {
      const list = imagesByProduct.get(img.product_id) ?? [];
      list.push({ url: img.url, altText: img.alt_text, width: null, height: null });
      imagesByProduct.set(img.product_id, list);
    }
    const variantsByProduct = new Map<string, VariantRow[]>();
    for (const v of variantRows) {
      const list = variantsByProduct.get(v.product_id) ?? [];
      list.push(v);
      variantsByProduct.set(v.product_id, list);
    }

    return rows.map((row) => {
      const images = imagesByProduct.get(row.id) ?? [];
      const variants = (variantsByProduct.get(row.id) ?? []).map((v) => this.toVariant(v, null));
      const prices = variants.map((v) => v.price.amount);
      return {
        id: row.id,
        handle: row.handle,
        title: row.title,
        description: row.description,
        descriptionHtml: row.description_html,
        images,
        options: JSON.parse(row.options) as ProductOption[],
        variants,
        tags: JSON.parse(row.tags) as string[],
        vendor: row.vendor,
        productType: row.product_type,
        status: row.status,
        minPrice: money(prices.length > 0 ? Math.min(...prices) : 0, this.currencyCode),
        maxPrice: money(prices.length > 0 ? Math.max(...prices) : 0, this.currencyCode),
        totalInventory: variants.reduce((sum, v) => sum + v.inventoryQuantity, 0),
      };
    });
  }

  getById(id: string, statuses: readonly ProductStatus[] = SHOPPER_STATUSES): Product | null {
    const row = one<ProductRow>(
      this.db,
      `SELECT * FROM products WHERE id = ? AND status IN (${placeholders(statuses.length)})`,
      [id, ...statuses],
    );
    return row ? this.hydrate([row])[0]! : null;
  }

  getByHandle(handle: string, statuses: readonly ProductStatus[] = SHOPPER_STATUSES): Product | null {
    const row = one<ProductRow>(
      this.db,
      `SELECT * FROM products WHERE handle = ? AND status IN (${placeholders(statuses.length)})`,
      [handle, ...statuses],
    );
    return row ? this.hydrate([row])[0]! : null;
  }

  search(
    filters: ProductFilters | undefined,
    first: number,
    after: string | undefined,
    statuses: readonly ProductStatus[] = SHOPPER_STATUSES,
  ): Connection<Product> {
    const where: string[] = [`p.status IN (${placeholders(statuses.length)})`];
    const params: SQLInputValue[] = [...statuses];
    const f = filters ?? {};

    if (f.query) {
      const like = `%${escapeLike(f.query)}%`;
      where.push(`(
        p.title LIKE ? ESCAPE '\\' OR p.description LIKE ? ESCAPE '\\' OR
        p.vendor LIKE ? ESCAPE '\\' OR p.product_type LIKE ? ESCAPE '\\' OR
        EXISTS (SELECT 1 FROM json_each(p.tags) t WHERE t.value LIKE ? ESCAPE '\\')
      )`);
      params.push(like, like, like, like, like);
    }
    if (f.productType) {
      where.push("p.product_type = ?");
      params.push(f.productType);
    }
    if (f.vendor) {
      where.push("p.vendor = ?");
      params.push(f.vendor);
    }
    for (const tag of f.tags ?? []) {
      where.push("EXISTS (SELECT 1 FROM json_each(p.tags) t WHERE t.value = ?)");
      params.push(tag);
    }
    if (f.minPrice != null) {
      where.push("(SELECT MIN(v.price) FROM variants v WHERE v.product_id = p.id) >= ?");
      params.push(f.minPrice);
    }
    if (f.maxPrice != null) {
      where.push("(SELECT MAX(v.price) FROM variants v WHERE v.product_id = p.id) <= ?");
      params.push(f.maxPrice);
    }
    if (f.availableForSale != null) {
      where.push(
        `(SELECT COALESCE(SUM(v.inventory_quantity), 0) FROM variants v WHERE v.product_id = p.id) ${f.availableForSale ? ">" : "="} 0`,
      );
    }
    if (after) {
      where.push("p.position > ?");
      params.push(decodeCursor(after, isNumber));
    }

    const rows = all<ProductRow>(
      this.db,
      `SELECT p.* FROM products p WHERE ${where.join(" AND ")} ORDER BY p.position LIMIT ?`,
      [...params, first + 1],
    );
    const conn = toConnection(rows, first, Boolean(after), (r) => r.position);
    return mapConnection(conn, (nodes) => this.hydrate(nodes));
  }
}
