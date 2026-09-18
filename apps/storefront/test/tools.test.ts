import { createMockAdapters } from "@commerce/adapter-mock";
import { describe, expect, it } from "vitest";
import { createShopperTools, createWriteToolExecutors } from "../app/lib/tools.js";

describe("createShopperTools", () => {
  it("exposes all 7 tools with read tools carrying execute and write tools not", () => {
    const { commerce } = createMockAdapters();
    const tools = createShopperTools(commerce);

    expect(Object.keys(tools).sort()).toEqual(
      [
        "search_products",
        "get_product",
        "get_cart",
        "add_to_cart",
        "update_cart_line",
        "remove_from_cart",
        "create_checkout",
      ].sort(),
    );

    expect(typeof tools.search_products?.execute).toBe("function");
    expect(typeof tools.get_product?.execute).toBe("function");
    expect(typeof tools.get_cart?.execute).toBe("function");
    expect(tools.add_to_cart?.execute).toBeUndefined();
    expect(tools.update_cart_line?.execute).toBeUndefined();
    expect(tools.remove_from_cart?.execute).toBeUndefined();
    expect(tools.create_checkout?.execute).toBeUndefined();
  });
});

describe("createWriteToolExecutors", () => {
  it("runs the real adapter calls once a write action is confirmed", async () => {
    const { commerce } = createMockAdapters();
    const executors = createWriteToolExecutors(commerce);

    const search = await commerce.searchProducts({ first: 1 });
    const variantId = search.edges[0]!.node.variants[0]!.id;

    const cart = await executors.add_to_cart({ variantId, quantity: 2 });
    expect(cart.lines.length).toBe(1);
    expect(cart.lines[0]!.quantity).toBe(2);

    const updated = await executors.update_cart_line({ cartId: cart.id, lineId: cart.lines[0]!.id, quantity: 5 });
    expect(updated.lines[0]!.quantity).toBe(5);

    const checkout = await executors.create_checkout({ cartId: cart.id });
    expect(checkout.cartId).toBe(cart.id);
    expect(() => new URL(checkout.url)).not.toThrow();

    const removed = await executors.remove_from_cart({ cartId: cart.id, lineId: cart.lines[0]!.id });
    expect(removed.lines.length).toBe(0);
  });
});
