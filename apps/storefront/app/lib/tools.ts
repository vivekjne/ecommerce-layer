import {
  addToCartInputSchema,
  createCheckoutInputSchema,
  getCartInputSchema,
  getProductInputSchema,
  removeFromCartInputSchema,
  searchProductsInputSchema,
  toolSchemas,
  updateCartLineInputSchema,
  type CommerceAdapter,
} from "@commerce/core";
import { tool, type ToolSet } from "ai";
import type { z } from "zod";

/**
 * The tool set the chat model sees. Read tools carry `execute` and run
 * immediately. Write tools (add_to_cart, update_cart_line, remove_from_cart,
 * create_checkout) deliberately have NO `execute` — streamText then stops
 * after emitting the call instead of running it, so the client renders a
 * ConfirmCard. Only a confirmed call reaches createWriteToolExecutors below.
 */
export function createShopperTools(commerce: CommerceAdapter): ToolSet {
  return {
    search_products: tool({
      description: toolSchemas.search_products.description,
      inputSchema: searchProductsInputSchema,
      execute: async (input) =>
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
    }),
    get_product: tool({
      description: toolSchemas.get_product.description,
      inputSchema: getProductInputSchema,
      execute: async (input) => commerce.getProduct(input.id !== undefined ? { id: input.id } : { handle: input.handle! }),
    }),
    get_cart: tool({
      description: toolSchemas.get_cart.description,
      inputSchema: getCartInputSchema,
      execute: async (input) => commerce.getCart(input.cartId),
    }),
    add_to_cart: tool({
      description: toolSchemas.add_to_cart.description,
      inputSchema: addToCartInputSchema,
    }),
    update_cart_line: tool({
      description: toolSchemas.update_cart_line.description,
      inputSchema: updateCartLineInputSchema,
    }),
    remove_from_cart: tool({
      description: toolSchemas.remove_from_cart.description,
      inputSchema: removeFromCartInputSchema,
    }),
    create_checkout: tool({
      description: toolSchemas.create_checkout.description,
      inputSchema: createCheckoutInputSchema,
    }),
  };
}

/** The actual adapter calls behind write tools, run only after ConfirmCard approval. */
export function createWriteToolExecutors(commerce: CommerceAdapter) {
  return {
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

export type WriteToolExecutors = ReturnType<typeof createWriteToolExecutors>;
