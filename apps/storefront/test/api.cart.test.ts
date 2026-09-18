import { describe, expect, it } from "vitest";
import type { ActionFunctionArgs } from "react-router";
import { action } from "../app/routes/api.cart.js";

function postForm(fields: Record<string, string>, cookie?: string): Promise<Response> {
  const body = new URLSearchParams(fields);
  const headers: Record<string, string> = { "Content-Type": "application/x-www-form-urlencoded" };
  if (cookie) headers.Cookie = cookie;
  const request = new Request("http://localhost/api/cart", { method: "POST", body, headers });
  return action({ request, params: {}, context: {} } as unknown as ActionFunctionArgs) as Promise<Response>;
}

describe("api.cart action", () => {
  it("add creates a cart and sets a cart_id cookie", async () => {
    const response = await postForm({ intent: "add", variantId: "mock:variant:p1-v1", quantity: "2" });
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

  it("runs a full add -> update -> checkout -> remove flow via the returned cookie", async () => {
    const addRes = await postForm({ intent: "add", variantId: "mock:variant:p2-v1", quantity: "1" });
    const cookiePair = addRes.headers.get("Set-Cookie")!.split(";")[0]!;
    const addBody = (await addRes.json()) as { cart: { id: string; lines: { id: string }[] } };
    const lineId = addBody.cart.lines[0]!.id;

    const updateRes = await postForm({ intent: "update", lineId, quantity: "3" }, cookiePair);
    const updateBody = (await updateRes.json()) as { cart: { lines: { quantity: number }[] } };
    expect(updateBody.cart.lines[0]!.quantity).toBe(3);

    const checkoutRes = await postForm({ intent: "checkout" }, cookiePair);
    const checkoutBody = (await checkoutRes.json()) as { checkout: { url: string } };
    expect(() => new URL(checkoutBody.checkout.url)).not.toThrow();

    const removeRes = await postForm({ intent: "remove", lineId }, cookiePair);
    const removeBody = (await removeRes.json()) as { cart: { lines: unknown[] } };
    expect(removeBody.cart.lines.length).toBe(0);
  });
});
