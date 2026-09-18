import { createCookie } from "react-router";

/**
 * Tracks the shopper's cart id across page navigations and chat turns.
 * Unsigned: a mock cart id isn't sensitive, and there's nothing to protect
 * against forging (worst case, someone points their own cookie at a cart
 * id that already exists).
 */
export const cartCookie = createCookie("cart_id", {
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 30,
});

export async function getCartId(request: Request): Promise<string | undefined> {
  const value = (await cartCookie.parse(request.headers.get("Cookie"))) as unknown;
  return typeof value === "string" ? value : undefined;
}
