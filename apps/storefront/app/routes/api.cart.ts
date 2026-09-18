import type { ActionFunctionArgs } from "react-router";
import { getAdapters } from "../lib/adapters.js";
import { cartCookie, getCartId } from "../lib/cart-cookie.js";

/**
 * Direct, human-clicked cart mutations — Add to Cart on a PDP, quantity
 * steppers and remove buttons on the cart page, checkout. These execute
 * immediately: the click itself is the human confirmation. Only the AI
 * chat's proposed mutations (api.tool-confirm.ts) need an extra
 * confirmation step, since there nobody clicked the actual cart button.
 */
export async function action({ request }: ActionFunctionArgs) {
  const { commerce } = getAdapters();
  const formData = await request.formData();
  const intent = formData.get("intent");
  const existingCartId = await getCartId(request);

  switch (intent) {
    case "add": {
      const variantId = String(formData.get("variantId"));
      const quantity = Number(formData.get("quantity") ?? 1);
      const cartId = existingCartId ?? (await commerce.createCart()).id;
      const cart = await commerce.addCartLine(cartId, variantId, quantity);
      return Response.json({ cart }, { headers: { "Set-Cookie": await cartCookie.serialize(cart.id) } });
    }
    case "update": {
      if (!existingCartId) return Response.json({ error: "No cart yet." }, { status: 400 });
      const lineId = String(formData.get("lineId"));
      const quantity = Number(formData.get("quantity"));
      const cart = await commerce.updateCartLine(existingCartId, lineId, quantity);
      return Response.json({ cart });
    }
    case "remove": {
      if (!existingCartId) return Response.json({ error: "No cart yet." }, { status: 400 });
      const lineId = String(formData.get("lineId"));
      const cart = await commerce.removeCartLine(existingCartId, lineId);
      return Response.json({ cart });
    }
    case "checkout": {
      if (!existingCartId) return Response.json({ error: "No cart yet." }, { status: 400 });
      const checkout = await commerce.createCheckout(existingCartId);
      return Response.json({ checkout });
    }
    default:
      return Response.json({ error: `Unknown intent: ${String(intent)}` }, { status: 400 });
  }
}
