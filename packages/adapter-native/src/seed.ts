import type { ProductOption, ProductStatus, SelectedOption } from "@commerce/core";
import { now, transaction, type Db } from "./db.js";
import productsFixture from "./fixtures/products.json" with { type: "json" };
import { newId } from "./ids.js";

interface SeedProduct {
  handle: string;
  title: string;
  description: string;
  vendor?: string | null;
  productType?: string | null;
  status?: ProductStatus;
  tags?: string[];
  images?: { url: string; altText?: string | null }[];
  options?: ProductOption[];
  variants: {
    title: string;
    sku?: string | null;
    price: number;
    compareAtPrice?: number | null;
    inventoryQuantity: number;
    selectedOptions: SelectedOption[];
  }[];
}

/** Loads the starter catalog into an empty database. No-op once any product exists. */
export function seedIfEmpty(db: Db, products: SeedProduct[] = productsFixture as SeedProduct[]): boolean {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM products").get() as { count: number };
  if (count > 0) return false;

  transaction(db, () => {
    const ts = now();
    const insertProduct = db.prepare(
      `INSERT INTO products (id, handle, title, description, vendor, product_type, status, tags, options, position, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    const insertImage = db.prepare("INSERT INTO product_images (product_id, url, alt_text, position) VALUES (?, ?, ?, ?)");
    const insertVariant = db.prepare(
      `INSERT INTO variants (id, product_id, title, sku, price, compare_at_price, inventory_quantity, selected_options, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    products.forEach((p, position) => {
      const productId = newId("product");
      insertProduct.run(
        productId,
        p.handle,
        p.title,
        p.description,
        p.vendor ?? null,
        p.productType ?? null,
        p.status ?? "active",
        JSON.stringify(p.tags ?? []),
        JSON.stringify(p.options ?? []),
        position + 1,
        ts,
        ts,
      );
      (p.images ?? []).forEach((img, i) => insertImage.run(productId, img.url, img.altText ?? null, i));
      p.variants.forEach((v, i) =>
        insertVariant.run(
          newId("variant"),
          productId,
          v.title,
          v.sku ?? null,
          v.price,
          v.compareAtPrice ?? null,
          v.inventoryQuantity,
          JSON.stringify(v.selectedOptions),
          i,
        ),
      );
    });
  });
  return true;
}
