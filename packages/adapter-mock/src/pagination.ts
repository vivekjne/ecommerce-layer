import type { Connection } from "@commerce/core";

function encodeCursor(index: number): string {
  return Buffer.from(String(index), "utf8").toString("base64");
}

function decodeCursor(cursor: string): number {
  return Number(Buffer.from(cursor, "base64").toString("utf8"));
}

export function paginate<T>(items: T[], first: number, after?: string): Connection<T> {
  const start = after ? decodeCursor(after) + 1 : 0;
  const slice = items.slice(start, start + first);
  const edges = slice.map((node, i) => ({ cursor: encodeCursor(start + i), node }));

  return {
    edges,
    pageInfo: {
      hasNextPage: start + slice.length < items.length,
      hasPreviousPage: start > 0,
      startCursor: edges.length > 0 ? edges[0]!.cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1]!.cursor : null,
    },
  };
}
