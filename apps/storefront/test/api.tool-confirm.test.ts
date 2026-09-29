import { describe, expect, it } from "vitest";
import type { ActionFunctionArgs } from "react-router";
import { getAdapters } from "../app/lib/adapters.js";
import { action } from "../app/routes/api.tool-confirm.js";

function confirm(tool: string, input: unknown, cookie?: string): Promise<Response> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cookie) headers.Cookie = cookie;
  const request = new Request("http://localhost/api/tool-confirm", { method: "POST", headers, body: JSON.stringify({ tool, input }) });
  return action({ request, params: {}, context: {} } as unknown as ActionFunctionArgs) as Promise<Response>;
}

// The chat SDK's confirmed write path, end to end against the native backend.
describe("chat tool confirmation against the native backend", () => {
  it("add_to_cart creates a real cart (and cookie); create_checkout hands back a hosted checkout URL", async () => {
    const { commerce } = getAdapters();
    const page = await commerce.searchProducts({ first: 5, filters: { availableForSale: true } });
    const variant = page.edges.flatMap((e) => e.node.variants).find((v) => v.inventoryQuantity > 0)!;

    const addRes = await confirm("add_to_cart", { variantId: variant.id, quantity: 1 });
    expect(addRes.status).toBe(200);
    const { output: cart } = (await addRes.json()) as { output: { id: string; lines: { variantId: string }[] } };
    expect(cart.lines[0]!.variantId).toBe(variant.id);
    const cookie = addRes.headers.get("Set-Cookie")!.split(";")[0]!;
    expect(cookie).toMatch(/^cart_id=/);

    const checkoutRes = await confirm("create_checkout", { cartId: cart.id }, cookie);
    const { output: checkout } = (await checkoutRes.json()) as { output: { url: string; cartId: string } };
    expect(checkout.cartId).toBe(cart.id);
    expect(new URL(checkout.url).pathname).toMatch(/^\/checkout\/checkout_/);
  });

  it("surfaces the backend's stock error to the chat instead of a generic failure", async () => {
    const { commerce } = getAdapters();
    const page = await commerce.searchProducts({ first: 5, filters: { availableForSale: true } });
    const variant = page.edges[0]!.node.variants[0]!;

    const res = await confirm("add_to_cart", { variantId: variant.id, quantity: 100_000 });
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: string }).error).toMatch(/left in stock|sold out/);
  });
});
