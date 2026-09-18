/**
 * The single source of truth for shopper-facing tool schemas. Both
 * apps/mcp (MCP tool definitions) and apps/storefront (Vercel AI SDK
 * `tool()` calls) import these — schemas are never redefined locally.
 *
 * WRITE_TOOL_NAMES marks the tools that mutate state (cart, checkout).
 * Every caller MUST treat these as requiring explicit human confirmation
 * in the UI before the underlying adapter call is made — an LLM tool call
 * alone is never sufficient authorization to execute one.
 */

import { z } from "zod";

export const searchProductsInputSchema = z.object({
  query: z
    .string()
    .optional()
    .describe("Free-text search, e.g. product name, description, or tag."),
  first: z.number().int().min(1).max(50).default(10),
  after: z.string().optional().describe("Pagination cursor from a previous result's pageInfo.endCursor."),
  productType: z.string().optional(),
  vendor: z.string().optional(),
  minPrice: z.number().optional().describe("Minor units (e.g. cents)."),
  maxPrice: z.number().optional().describe("Minor units (e.g. cents)."),
});

export const getProductInputSchema = z
  .object({
    id: z.string().optional().describe("Normalized product id."),
    handle: z.string().optional().describe("Product handle/slug."),
  })
  .refine((v) => Boolean(v.id) !== Boolean(v.handle), {
    message: "Provide exactly one of `id` or `handle`.",
  });

export const getCartInputSchema = z.object({
  cartId: z.string(),
});

export const addToCartInputSchema = z.object({
  cartId: z.string().optional().describe("Omit to create a new cart."),
  variantId: z.string(),
  quantity: z.number().int().min(1).default(1),
});

export const updateCartLineInputSchema = z.object({
  cartId: z.string(),
  lineId: z.string(),
  quantity: z.number().int().min(1),
});

export const removeFromCartInputSchema = z.object({
  cartId: z.string(),
  lineId: z.string(),
});

export const createCheckoutInputSchema = z.object({
  cartId: z.string(),
});

export const toolSchemas = {
  search_products: {
    description: "Search the product catalog with optional filters.",
    inputSchema: searchProductsInputSchema,
  },
  get_product: {
    description: "Fetch a single product by id or by handle/slug.",
    inputSchema: getProductInputSchema,
  },
  get_cart: {
    description: "Fetch the current state of a cart by id.",
    inputSchema: getCartInputSchema,
  },
  add_to_cart: {
    description:
      "Add a variant to the cart, creating the cart first if no cartId is given. Requires human confirmation before executing.",
    inputSchema: addToCartInputSchema,
  },
  update_cart_line: {
    description: "Change the quantity of an existing cart line. Requires human confirmation before executing.",
    inputSchema: updateCartLineInputSchema,
  },
  remove_from_cart: {
    description: "Remove a line from the cart. Requires human confirmation before executing.",
    inputSchema: removeFromCartInputSchema,
  },
  create_checkout: {
    description:
      "Create a hosted checkout session for the cart and return its URL. Requires human confirmation before executing; never open the URL automatically.",
    inputSchema: createCheckoutInputSchema,
  },
} as const;

export type ToolName = keyof typeof toolSchemas;

/** Tools that mutate cart/checkout state and must be gated behind a confirmation UI. */
export const WRITE_TOOL_NAMES: ReadonlySet<ToolName> = new Set([
  "add_to_cart",
  "update_cart_line",
  "remove_from_cart",
  "create_checkout",
]);

export function isWriteTool(name: ToolName): boolean {
  return WRITE_TOOL_NAMES.has(name);
}
