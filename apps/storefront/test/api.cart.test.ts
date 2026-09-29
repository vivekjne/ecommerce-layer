import { beforeAll, describe, expect, it } from "vitest";
import type { ActionFunctionArgs } from "react-router";
import { getAdapters } from "../app/lib/adapters.js";
import { action } from "../app/routes/api.cart.js";

// Variant ids are opaque to everything outside the adapter, so take real ones from the catalog.
let variantIds: string[];
beforeAll(async () => {
  const page = await getAdapters().commerce.searchProducts({ first: 10, filters: { availableForSale: true } });
  variantIds = page.edges.flatMap((e) => e.node.variants.filter((v) => v.inventoryQuantity >= 3).map((v) => v.id));
});

function postForm(fields: Record<string, string>, cookie?: string): Promise<Response> {
  const body = new URLSearchParams(fields);
  const headers: Record<string, string> = { "Content-Type": "application/x-www-form-urlencoded" };
  if (cookie) headers.Cookie = cookie;
  const request = new Request("http://localhost/api/cart", { method: "POST", body, headers });
  return action({ request, params: {}, context: {} } as unknown as ActionFunctionArgs) as Promise<Response>;
}

describe("api.cart action", () => {
  it("add creates a cart and sets a cart_id cookie", async () => {
    const response = await postForm({ intent: "add", variantId: variantIds[0]!, quantity: "2" });
    expect(response.status).toBe(200);

    const body = (await response.json()) as { cart: { lines: { quantity: number }[] } };
    expect(body.cart.lines.length).toBe(1);
    expect(body.cart.lines[0]!.quantity).toBe(2);
    expect(response.headers.get("Set-Cookie")).toMatch(/^cart_id=/);
  });

  it("update and remove reject a request with no cart cookie", async () => {
    const res = await postForm({ intent: "update", lineId: "x", quantity: "1" });
    expect(res.status).toBe(400);
  });

  it("reports insufficient stock as a 409 with a shopper-facing message", async () => {
    const res = await postForm({ intent: "add", variantId: variantIds[0]!, quantity: "100000" });
    expect(res.status).toBe(409);
    expect(((await res.json()) as { error: string }).error).toMatch(/left in stock|sold out/);
  });

  it("runs a full add -> update -> remove -> checkout flow via the returned cookie", async () => {
    const addRes = await postForm({ intent: "add", variantId: variantIds[1]!, quantity: "1" });
    const cookiePair = addRes.headers.get("Set-Cookie")!.split(";")[0]!;
    const addBody = (await addRes.json()) as { cart: { id: string; lines: { id: string }[] } };
    const lineId = addBody.cart.lines[0]!.id;

    const updateRes = await postForm({ intent: "update", lineId, quantity: "3" }, cookiePair);
    const updateBody = (await updateRes.json()) as { cart: { lines: { quantity: number }[] } };
    expect(updateBody.cart.lines[0]!.quantity).toBe(3);

    const removeRes = await postForm({ intent: "remove", lineId }, cookiePair);
    const removeBody = (await removeRes.json()) as { cart: { lines: unknown[] } };
    expect(removeBody.cart.lines.length).toBe(0);

    const emptyCheckout = await postForm({ intent: "checkout" }, cookiePair);
    expect(emptyCheckout.status).toBe(400);

    await postForm({ intent: "add", variantId: variantIds[1]!, quantity: "1" }, cookiePair);
    const checkoutRes = await postForm({ intent: "checkout" }, cookiePair);
    expect(checkoutRes.status).toBe(302);
    expect(checkoutRes.headers.get("Location")).toMatch(/\/checkout\/checkout_/);
  });
});
