import type { Connection } from "@commerce/core";

export function encodeCursor(key: unknown): string {
  return Buffer.from(JSON.stringify(key), "utf8").toString("base64url");
}

export function decodeCursor<T>(cursor: string, isValid: (v: unknown) => v is T): T {
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
  } catch {
    parsed = undefined;
  }
  if (!isValid(parsed)) throw new Error("Invalid pagination cursor.");
  return parsed;
}

/**
 * Builds a Connection from a keyset query that fetched `first + 1` rows —
 * the extra row only signals whether there's a next page.
 */
export function toConnection<T>(rows: T[], first: number, hasPrevious: boolean, cursorKey: (node: T) => unknown): Connection<T> {
  const page = rows.slice(0, first);
  const edges = page.map((node) => ({ cursor: encodeCursor(cursorKey(node)), node }));
  return {
    edges,
    pageInfo: {
      hasNextPage: rows.length > first,
      hasPreviousPage: hasPrevious,
      startCursor: edges[0]?.cursor ?? null,
      endCursor: edges.at(-1)?.cursor ?? null,
    },
  };
}

export function mapConnection<A, B>(conn: Connection<A>, fn: (nodes: A[]) => B[]): Connection<B> {
  const mapped = fn(conn.edges.map((e) => e.node));
  return { edges: conn.edges.map((e, i) => ({ cursor: e.cursor, node: mapped[i]! })), pageInfo: conn.pageInfo };
}

export const isNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
export const isNumberStringPair = (v: unknown): v is [number, string] =>
  Array.isArray(v) && v.length === 2 && isNumber(v[0]) && typeof v[1] === "string";
