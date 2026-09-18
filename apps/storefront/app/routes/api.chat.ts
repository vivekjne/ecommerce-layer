import { handleChatRequest } from "@commerce/chat-sdk";
import type { ActionFunctionArgs } from "react-router";
import { getAdapters } from "../lib/adapters.js";
import { getCartId } from "../lib/cart-cookie.js";

export async function action({ request }: ActionFunctionArgs) {
  const { commerce } = getAdapters();
  const cartId = await getCartId(request);
  return handleChatRequest({ request, commerce, cartId });
}
