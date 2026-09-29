import { randomUUID } from "node:crypto";

export type IdKind = "product" | "variant" | "cart" | "line" | "checkout" | "order" | "order_line";

/**
 * Random, unguessable ids. Carts, checkouts and orders are reachable by id
 * alone (cookie, checkout URL, order status page), so they must not be
 * enumerable the way sequential ids would be.
 */
export function newId(kind: IdKind): string {
  return `${kind}_${randomUUID().replaceAll("-", "")}`;
}
