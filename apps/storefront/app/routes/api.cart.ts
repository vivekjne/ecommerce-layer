import { redirect, type ActionFunctionArgs } from "react-router";
import { getAdapters } from "../lib/adapters.js";
import { cartCookie, getCartId } from "../lib/cart-cookie.js";
import { toUserError } from "../lib/errors.js";

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
  const cookieCartId = await getCartId(request);

  try {
    switch (intent) {
      case "add": {
        const variantId = String(formData.get("variantId"));
        const quantity = Number(formData.get("quantity") ?? 1);
        // A cookie can point at a cart that's since been checked out — start a fresh one.
        const existing = cookieCartId ? await commerce.getCart(cookieCartId) : null;
        const cartId = existing?.id ?? (await commerce.createCart()).id;
        const cart = await commerce.addCartLine(cartId, variantId, quantity);
        const headers = cartId === cookieCartId ? undefined : { "Set-Cookie": await cartCookie.serialize(cart.id) };
        return Response.json({ cart }, { headers });
      }
      case "update": {
        if (!cookieCartId) return Response.json({ error: "No cart yet." }, { status: 400 });
        const lineId = String(formData.get("lineId"));
        const quantity = Number(formData.get("quantity"));
        const cart = await commerce.updateCartLine(cookieCartId, lineId, quantity);
        return Response.json({ cart });
      }
      case "remove": {
        if (!cookieCartId) return Response.json({ error: "No cart yet." }, { status: 400 });
        const lineId = String(formData.get("lineId"));
        const cart = await commerce.removeCartLine(cookieCartId, lineId);
        return Response.json({ cart });
      }
      case "checkout": {
        if (!cookieCartId) return Response.json({ error: "No cart yet." }, { status: 400 });
        const checkout = await commerce.createCheckout(cookieCartId);
        return redirect(checkout.url);
      }
      default:
        return Response.json({ error: `Unknown intent: ${String(intent)}` }, { status: 400 });
    }
  } catch (err) {
    const { message, status } = toUserError(err);
    return Response.json({ error: message }, { status });
  }
}
