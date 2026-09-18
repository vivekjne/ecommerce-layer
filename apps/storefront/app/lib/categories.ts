import type { CommerceAdapter } from "@commerce/core";

/**
 * The adapter has no dedicated "list categories" operation, so this derives
 * distinct product types from a broad product sample. Fine for a catalog
 * this size; a larger one would want a real facet/aggregation query.
 */
export async function listProductTypes(commerce: CommerceAdapter): Promise<string[]> {
  const page = await commerce.searchProducts({ first: 50 });
  const types = new Set<string>();
  for (const edge of page.edges) {
    if (edge.node.productType) types.add(edge.node.productType);
  }
  return [...types].sort();
}
