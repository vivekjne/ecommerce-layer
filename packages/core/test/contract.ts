/**
 * The adapter contract. Every packages/adapter-* implementation is judged
 * against this suite — call `runCommerceContractTests` from that adapter's
 * own test file, e.g.:
 *
 *   import { runCommerceContractTests } from "@commerce/core/test/contract";
 *   runCommerceContractTests("mock", () => ({
 *     commerce: new MockCommerceAdapter(),
 *     merchant: new MockMerchantAdapter(),
 *   }));
 *
 * Tests are written against the normalized contract only — no adapter is
 * assumed to have specific products, prices, or inventory levels. Fixtures
 * needed for cart/checkout tests (a purchasable variant) are discovered by
 * searching the adapter's own catalog in `beforeAll`.
 */

import { beforeAll, describe, expect, it } from "vitest";
import type { CommerceAdapter, MerchantAdapter } from "../src/adapter.js";
import type { Product, Variant } from "../src/types.js";

export interface ContractAdapters {
  commerce: CommerceAdapter;
  merchant: MerchantAdapter;
}

export interface ContractOptions {
  /** How many products to pull when searching for test fixtures. Default 25. */
  catalogSampleSize?: number;
  /** Threshold used to exercise getLowStock. Default 5. */
  lowStockThreshold?: number;
}

function findPurchasableVariant(products: Product[]): { product: Product; variant: Variant } | null {
  for (const product of products) {
    const variant = product.variants.find((v) => v.availableForSale && v.inventoryQuantity > 0);
    if (variant) return { product, variant };
  }
  return null;
}

function assertMoney(money: unknown, label: string): void {
  expect(money, label).toBeTruthy();
  const m = money as { amount: number; currencyCode: string };
  expect(Number.isInteger(m.amount), `${label}.amount must be an integer (minor units)`).toBe(true);
  expect(m.amount, `${label}.amount must be >= 0`).toBeGreaterThanOrEqual(0);
  expect(typeof m.currencyCode, `${label}.currencyCode must be a string`).toBe("string");
  expect(m.currencyCode.length, `${label}.currencyCode looks like ISO 4217`).toBeGreaterThanOrEqual(3);
}

export function runCommerceContractTests(
  label: string,
  getAdapters: () => ContractAdapters | Promise<ContractAdapters>,
  options: ContractOptions = {},
): void {
  const catalogSampleSize = options.catalogSampleSize ?? 25;
  const lowStockThreshold = options.lowStockThreshold ?? 5;

  describe(`CommerceAdapter contract (${label})`, () => {
    let commerce: CommerceAdapter;
    let sampleProducts: Product[];
    let fixture: { product: Product; variant: Variant };

    beforeAll(async () => {
      ({ commerce } = await getAdapters());
      const page = await commerce.searchProducts({ first: catalogSampleSize });
      sampleProducts = page.edges.map((e) => e.node);
      const found = findPurchasableVariant(sampleProducts);
      if (!found) {
        throw new Error(
          "Contract fixture error: no product in the sampled catalog has a variant with " +
            "availableForSale=true and inventoryQuantity>0. Seed data must include at least one.",
        );
      }
      fixture = found;
    });

    describe("searchProducts", () => {
      it("returns at least one result and a well-formed connection", async () => {
        const page = await commerce.searchProducts({ first: catalogSampleSize });
        expect(page.edges.length).toBeGreaterThan(0);
        expect(page.pageInfo).toHaveProperty("hasNextPage");
        expect(page.pageInfo).toHaveProperty("hasPreviousPage");
        for (const edge of page.edges) {
          expect(typeof edge.cursor).toBe("string");
          assertMoney(edge.node.minPrice, "product.minPrice");
          assertMoney(edge.node.maxPrice, "product.maxPrice");
          expect(Array.isArray(edge.node.variants)).toBe(true);
        }
      });

      it("paginates forward via cursor without repeating results", async () => {
        const first = await commerce.searchProducts({ first: 1 });
        expect(first.edges.length).toBe(1);
        if (!first.pageInfo.hasNextPage) return; // catalog too small to page; not a failure
        expect(first.pageInfo.endCursor).toBeTruthy();
        const second = await commerce.searchProducts({ first: 1, after: first.pageInfo.endCursor! });
        expect(second.edges.length).toBe(1);
        expect(second.edges[0]!.node.id).not.toBe(first.edges[0]!.node.id);
      });

      it("supports a free-text query without throwing", async () => {
        await expect(commerce.searchProducts({ first: 5, filters: { query: "a" } })).resolves.toBeDefined();
      });
    });

    describe("getProduct", () => {
      it("round-trips a known product by id", async () => {
        const reference = sampleProducts[0]!;
        const found = await commerce.getProduct({ id: reference.id });
        expect(found).not.toBeNull();
        expect(found!.id).toBe(reference.id);
        expect(found!.title).toBe(reference.title);
      });

      it("round-trips a known product by handle", async () => {
        const reference = sampleProducts[0]!;
        const found = await commerce.getProduct({ handle: reference.handle });
        expect(found).not.toBeNull();
        expect(found!.id).toBe(reference.id);
        expect(found!.handle).toBe(reference.handle);
      });

      it("returns null for an id that doesn't exist", async () => {
        const found = await commerce.getProduct({ id: "definitely-not-a-real-id-000000" });
        expect(found).toBeNull();
      });
    });

    describe("cart lifecycle", () => {
      it("creates an empty cart", async () => {
        const cart = await commerce.createCart();
        expect(typeof cart.id).toBe("string");
        expect(cart.lines).toEqual([]);
        assertMoney(cart.total, "cart.total");
      });

      it("adds a line, updates its quantity, removes it, and totals stay consistent throughout", async () => {
        const cart = await commerce.createCart();

        const afterAdd = await commerce.addCartLine(cart.id, fixture.variant.id, 2);
        expect(afterAdd.lines.length).toBe(1);
        const line = afterAdd.lines[0]!;
        expect(line.variantId).toBe(fixture.variant.id);
        expect(line.quantity).toBe(2);
        expect(line.lineTotal.amount).toBe(line.unitPrice.amount * line.quantity);
        expect(afterAdd.total.amount).toBeGreaterThanOrEqual(line.lineTotal.amount);

        const afterUpdate = await commerce.updateCartLine(cart.id, line.id, 5);
        const updatedLine = afterUpdate.lines.find((l) => l.id === line.id);
        expect(updatedLine).toBeDefined();
        expect(updatedLine!.quantity).toBe(5);
        expect(updatedLine!.lineTotal.amount).toBe(updatedLine!.unitPrice.amount * 5);

        const afterRemove = await commerce.removeCartLine(cart.id, line.id);
        expect(afterRemove.lines.find((l) => l.id === line.id)).toBeUndefined();
      });

      it("getCart reflects the current state and returns null for an unknown id", async () => {
        const cart = await commerce.createCart();
        await commerce.addCartLine(cart.id, fixture.variant.id, 1);

        const fetched = await commerce.getCart(cart.id);
        expect(fetched).not.toBeNull();
        expect(fetched!.lines.length).toBe(1);

        const missing = await commerce.getCart("definitely-not-a-real-cart-id-000000");
        expect(missing).toBeNull();
      });
    });

    describe("createCheckout", () => {
      it("returns a hosted checkout URL for the cart", async () => {
        const cart = await commerce.createCart();
        await commerce.addCartLine(cart.id, fixture.variant.id, 1);

        const checkout = await commerce.createCheckout(cart.id);
        expect(checkout.cartId).toBe(cart.id);
        expect(typeof checkout.url).toBe("string");
        expect(() => new URL(checkout.url)).not.toThrow();
      });
    });
  });

  describe(`MerchantAdapter contract (${label})`, () => {
    let merchant: MerchantAdapter;

    beforeAll(async () => {
      ({ merchant } = await getAdapters());
    });

    describe("getLowStock", () => {
      it("only returns variants at or below the given threshold", async () => {
        const page = await merchant.getLowStock({ threshold: lowStockThreshold, first: catalogSampleSize });
        expect(page.pageInfo).toHaveProperty("hasNextPage");
        for (const edge of page.edges) {
          expect(edge.node.inventoryQuantity).toBeLessThanOrEqual(lowStockThreshold);
          expect(edge.node.threshold).toBe(lowStockThreshold);
          expect(typeof edge.node.productId).toBe("string");
          expect(typeof edge.node.variantId).toBe("string");
        }
      });

      it("returns a subset when the threshold is tightened", async () => {
        const loose = await merchant.getLowStock({ threshold: lowStockThreshold, first: catalogSampleSize });
        const tight = await merchant.getLowStock({ threshold: 0, first: catalogSampleSize });
        const looseIds = new Set(loose.edges.map((e) => e.node.variantId));
        for (const edge of tight.edges) {
          expect(looseIds.has(edge.node.variantId)).toBe(true);
        }
      });
    });

    describe("auditCatalog", () => {
      it("returns issues in the defined shape", async () => {
        const result = await merchant.auditCatalog({ first: catalogSampleSize });
        expect(typeof result.scannedCount).toBe("number");
        expect(result.scannedCount).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(result.issues)).toBe(true);

        const allowedTypes = new Set([
          "missing_image",
          "short_description",
          "missing_price",
          "no_variants",
          "out_of_stock",
        ]);
        const allowedSeverities = new Set(["warning", "error"]);

        for (const issue of result.issues) {
          expect(typeof issue.productId).toBe("string");
          expect(typeof issue.productHandle).toBe("string");
          expect(typeof issue.productTitle).toBe("string");
          expect(allowedTypes.has(issue.type)).toBe(true);
          expect(allowedSeverities.has(issue.severity)).toBe(true);
          expect(issue.message.length).toBeGreaterThan(0);
        }
      });
    });
  });
}
