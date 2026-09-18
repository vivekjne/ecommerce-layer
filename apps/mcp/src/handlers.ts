import {
  addToCartInputSchema,
  createCheckoutInputSchema,
  getCartInputSchema,
  getProductInputSchema,
  removeFromCartInputSchema,
  searchProductsInputSchema,
  updateCartLineInputSchema,
  type CommerceAdapter,
} from "@commerce/core";
import type { z } from "zod";

/**
 * The actual execution behind each MCP tool, keyed to match ToolName from
 * packages/core/src/tools.ts. write actions (add_to_cart, update_cart_line,
 * remove_from_cart, create_checkout) run as soon as they're called here —
 * the human-confirmation gate CLAUDE.md requires is the MCP client's own
 * "allow this tool call?" prompt (e.g. Claude Desktop), not something this
 * server implements itself.
 */
export function createToolHandlers(commerce: CommerceAdapter) {
  return {
    search_products: (input: z.infer<typeof searchProductsInputSchema>) =>
      commerce.searchProducts({
        first: input.first,
        after: input.after,
        filters: {
          query: input.query,
          productType: input.productType,
          vendor: input.vendor,
          minPrice: input.minPrice,
          maxPrice: input.maxPrice,
        },
      }),

    get_product: (input: z.infer<typeof getProductInputSchema>) =>
      commerce.getProduct(input.id !== undefined ? { id: input.id } : { handle: input.handle! }),

    get_cart: (input: z.infer<typeof getCartInputSchema>) => commerce.getCart(input.cartId),

    add_to_cart: async (input: z.infer<typeof addToCartInputSchema>) => {
      const cartId = input.cartId ?? (await commerce.createCart()).id;
      return commerce.addCartLine(cartId, input.variantId, input.quantity);
    },

    update_cart_line: (input: z.infer<typeof updateCartLineInputSchema>) =>
      commerce.updateCartLine(input.cartId, input.lineId, input.quantity),

    remove_from_cart: (input: z.infer<typeof removeFromCartInputSchema>) =>
      commerce.removeCartLine(input.cartId, input.lineId),

    create_checkout: (input: z.infer<typeof createCheckoutInputSchema>) => commerce.createCheckout(input.cartId),
  } as const;
}

export type ToolHandlers = ReturnType<typeof createToolHandlers>;
