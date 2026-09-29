import type { Product } from "@commerce/core";
import { beforeEach, describe, expect, it } from "vitest";
import { createNativeBackend, TEST_DECLINE_CARD, type CompleteCheckoutInput, type NativeBackend } from "../src/index.js";

const VALID_INPUT: CompleteCheckoutInput = {
  email: "shopper@example.com",
  shippingAddress: { name: "Ada Lovelace", line1: "1 Main St", line2: "", city: "Springfield", region: "IL", postalCode: "62701", country: "US" },
  shippingRateId: "standard",
  card: { number: "4242 4242 4242 4242", expiry: "12/40", cvc: "123", name: "Ada Lovelace" },
};

let backend: NativeBackend;
let product: Product;

beforeEach(async () => {
  backend = createNativeBackend({ databasePath: ":memory:", config: { taxRateBasisPoints: 1000 } });
  product = (await backend.commerce.getProduct({ handle: "midnight-runner-hoodie" }))!;
});

async function cartWith(quantity: number, variantIndex = 0) {
  const cart = await backend.commerce.createCart();
  return backend.commerce.addCartLine(cart.id, product.variants[variantIndex]!.id, quantity);
}

async function inventoryOf(variantIndex = 0): Promise<number> {
  const p = await backend.commerce.getProduct({ id: product.id });
  return p!.variants[variantIndex]!.inventoryQuantity;
}

describe("catalog", () => {
  it("hides draft products from shoppers but not from the admin", async () => {
    const drafts = backend.admin.listProducts({ first: 50, status: "draft" });
    expect(drafts.edges.length).toBe(1);
    const draft = drafts.edges[0]!.node;
    expect(await backend.commerce.getProduct({ id: draft.id })).toBeNull();
    expect(backend.admin.getProduct(draft.id)?.id).toBe(draft.id);
  });

  it("pages through the whole catalog without gaps or repeats", async () => {
    const seen: string[] = [];
    let after: string | undefined;
    do {
      const page = await backend.commerce.searchProducts({ first: 7, after });
      seen.push(...page.edges.map((e) => e.node.id));
      after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor! : undefined;
    } while (after);
    expect(seen.length).toBe(24);
    expect(new Set(seen).size).toBe(24);
  });

  it("treats LIKE wildcards in a search query literally", async () => {
    const page = await backend.commerce.searchProducts({ first: 50, filters: { query: "%" } });
    expect(page.edges.length).toBe(0);
  });
});

describe("cart", () => {
  it("rejects adding more than is in stock", async () => {
    const stock = await inventoryOf();
    await expect(cartWith(stock + 1)).rejects.toMatchObject({ code: "insufficient_inventory" });
  });

  it("reads prices live from the variant", async () => {
    const cart = await cartWith(1);
    backend.admin.updateVariant(product.variants[0]!.id, { price: 1234 });
    const fresh = await backend.commerce.getCart(cart.id);
    expect(fresh!.lines[0]!.unitPrice.amount).toBe(1234);
  });
});

describe("checkout", () => {
  it("places an order: charges the right total, decrements stock, closes the cart", async () => {
    const before = await inventoryOf();
    const cart = await cartWith(2);
    const session = await backend.commerce.createCheckout(cart.id);
    expect(session.url).toMatch(/\/checkout\/checkout_/);

    const { orderId } = await backend.checkouts.complete(session.id, VALID_INPUT);
    const order = backend.orders.get(orderId)!;

    const subtotal = cart.subtotal.amount;
    const shipping = subtotal >= 7500 ? 0 : 599;
    const tax = Math.round(subtotal * 0.1);
    expect(order.subtotal.amount).toBe(subtotal);
    expect(order.shipping.amount).toBe(shipping);
    expect(order.tax.amount).toBe(tax);
    expect(order.total.amount).toBe(subtotal + shipping + tax);
    expect(order.number).toBe(1001);
    expect(order.status).toBe("paid");
    expect(order.payment).toEqual({ brand: "Visa", last4: "4242" });
    expect(order.lines).toHaveLength(1);

    expect(await inventoryOf()).toBe(before - 2);
    expect(await backend.commerce.getCart(cart.id)).toBeNull();
    await expect(backend.commerce.addCartLine(cart.id, product.variants[0]!.id, 1)).rejects.toMatchObject({ code: "cart_closed" });
  });

  it("is idempotent: completing twice returns the same order and charges once", async () => {
    const cart = await cartWith(1);
    const session = await backend.commerce.createCheckout(cart.id);
    const first = await backend.checkouts.complete(session.id, VALID_INPUT);
    const second = await backend.checkouts.complete(session.id, VALID_INPUT);
    expect(second.orderId).toBe(first.orderId);
    expect(backend.orders.stats().orderCount).toBe(1);
  });

  it("releases reserved stock when the card is declined", async () => {
    const before = await inventoryOf();
    const cart = await cartWith(1);
    const session = await backend.commerce.createCheckout(cart.id);
    await expect(
      backend.checkouts.complete(session.id, { ...VALID_INPUT, card: { ...VALID_INPUT.card, number: TEST_DECLINE_CARD } }),
    ).rejects.toMatchObject({ code: "payment_declined" });

    expect(await inventoryOf()).toBe(before);
    expect(backend.checkouts.get(session.id)!.status).toBe("open");
    // The shopper can retry with another card.
    await expect(backend.checkouts.complete(session.id, VALID_INPUT)).resolves.toHaveProperty("orderId");
  });

  it("returns per-field errors for invalid input without touching stock", async () => {
    const before = await inventoryOf();
    const cart = await cartWith(1);
    const session = await backend.commerce.createCheckout(cart.id);
    const err = await backend.checkouts
      .complete(session.id, {
        email: "nope",
        shippingAddress: { ...VALID_INPUT.shippingAddress, city: " ", country: "" },
        shippingRateId: "teleport",
        card: { number: "4242 4242 4242 4241", expiry: "01/20", cvc: "1", name: "" },
      })
      .catch((e: unknown) => e);
    expect(err).toMatchObject({ code: "invalid_input" });
    expect(Object.keys((err as { fieldErrors: object }).fieldErrors).sort()).toEqual(
      ["cardCvc", "cardExpiry", "cardName", "cardNumber", "city", "country", "email", "shippingRate"].sort(),
    );
    expect(await inventoryOf()).toBe(before);
  });

  it("refuses to oversell when stock drops after the item was carted", async () => {
    const cart = await cartWith(2);
    backend.admin.updateVariant(product.variants[0]!.id, { inventoryQuantity: 1 });
    const session = await backend.commerce.createCheckout(cart.id);
    await expect(backend.checkouts.complete(session.id, VALID_INPUT)).rejects.toMatchObject({ code: "insufficient_inventory" });
    expect(await inventoryOf()).toBe(1);
  });
});

describe("orders", () => {
  async function placeOrder(quantity = 1): Promise<string> {
    const cart = await cartWith(quantity);
    const session = await backend.commerce.createCheckout(cart.id);
    return (await backend.checkouts.complete(session.id, VALID_INPUT)).orderId;
  }

  it("cancelling restocks every line; fulfilled orders can't be cancelled", async () => {
    const before = await inventoryOf();
    const orderId = await placeOrder(3);
    expect(await inventoryOf()).toBe(before - 3);

    const cancelled = await backend.orders.cancel(orderId);
    expect(cancelled.status).toBe("cancelled");
    expect(await inventoryOf()).toBe(before);

    const other = await placeOrder(1);
    backend.orders.fulfill(other);
    await expect(backend.orders.cancel(other)).rejects.toMatchObject({ code: "invalid_state" });
  });

  it("lists newest first with cursor pagination, and stats exclude cancelled revenue", async () => {
    const ids = [await placeOrder(), await placeOrder(), await placeOrder()];
    const page1 = backend.orders.list({ first: 2 });
    expect(page1.edges.map((e) => e.node.id)).toEqual([ids[2], ids[1]]);
    const page2 = backend.orders.list({ first: 2, after: page1.pageInfo.endCursor! });
    expect(page2.edges.map((e) => e.node.id)).toEqual([ids[0]]);
    expect(page2.pageInfo.hasNextPage).toBe(false);

    const totalBefore = backend.orders.stats().revenue.amount;
    const cancelled = await backend.orders.cancel(ids[0]!);
    expect(backend.orders.stats().revenue.amount).toBe(totalBefore - cancelled.total.amount);
  });
});

describe("admin", () => {
  it("creates a single-variant product that shoppers can buy", async () => {
    const created = backend.admin.createProduct({
      title: "Trail Mug",
      description: "Enamel camp mug that survives being dropped on rocks.",
      status: "active",
      price: 1800,
      inventoryQuantity: 4,
    });
    expect(created.handle).toBe("trail-mug");
    const found = await backend.commerce.getProduct({ handle: "trail-mug" });
    expect(found?.variants[0]?.price.amount).toBe(1800);

    let duplicate: unknown;
    try {
      backend.admin.createProduct({ title: "Trail Mug", description: "", status: "active", price: 1, inventoryQuantity: 1 });
    } catch (err) {
      duplicate = err;
    }
    expect(duplicate).toMatchObject({ code: "invalid_input", fieldErrors: { handle: expect.stringMatching(/already taken/) } });
  });

  it("low-stock pages via keyset cursor without repeats", async () => {
    const seen: string[] = [];
    let after: string | undefined;
    do {
      const page = await backend.merchant.getLowStock({ threshold: 10, first: 3, after });
      seen.push(...page.edges.map((e) => e.node.variantId));
      after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor! : undefined;
    } while (after);
    expect(new Set(seen).size).toBe(seen.length);
    const all = await backend.merchant.getLowStock({ threshold: 10, first: 500 });
    expect(seen.length).toBe(all.edges.length);
  });
});
