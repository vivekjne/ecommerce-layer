import { createMockAdapters } from "@commerce/adapter-mock";
import { describe, expect, it } from "vitest";
import { createToolHandlers } from "../src/handlers.js";

describe("MCP tool handlers", () => {
  it("search_products returns normalized products", async () => {
    const { commerce } = createMockAdapters();
    const handlers = createToolHandlers(commerce);

    const result = await handlers.search_products({ first: 5 });
    expect(result.edges.length).toBeGreaterThan(0);
    expect(result.edges.length).toBeLessThanOrEqual(5);
  });

  it("get_product resolves by id", async () => {
    const { commerce } = createMockAdapters();
    const handlers = createToolHandlers(commerce);

    const search = await handlers.search_products({ first: 1 });
    const id = search.edges[0]!.node.id;

    const product = await handlers.get_product({ id });
    expect(product?.id).toBe(id);
  });

  it("add_to_cart creates a cart when none is given, and the proposed line is priced correctly", async () => {
    const { commerce } = createMockAdapters();
    const handlers = createToolHandlers(commerce);

    const search = await handlers.search_products({ first: 1 });
    const variantId = search.edges[0]!.node.variants[0]!.id;

    const cart = await handlers.add_to_cart({ variantId, quantity: 2 });
    expect(cart.lines.length).toBe(1);
    expect(cart.lines[0]!.quantity).toBe(2);
    expect(cart.lines[0]!.lineTotal.amount).toBe(cart.lines[0]!.unitPrice.amount * 2);
  });

  it("create_checkout returns a URL for the cart", async () => {
    const { commerce } = createMockAdapters();
    const handlers = createToolHandlers(commerce);

    const search = await handlers.search_products({ first: 1 });
    const variantId = search.edges[0]!.node.variants[0]!.id;
    const cart = await handlers.add_to_cart({ variantId, quantity: 1 });

    const checkout = await handlers.create_checkout({ cartId: cart.id });
    expect(checkout.cartId).toBe(cart.id);
    expect(() => new URL(checkout.url)).not.toThrow();
  });
});
