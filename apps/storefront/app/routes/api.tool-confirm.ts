import { handleToolConfirmRequest } from "@commerce/chat-sdk";
import type { ActionFunctionArgs } from "react-router";
import { getAdapters } from "../lib/adapters.js";
import { cartCookie, getCartId } from "../lib/cart-cookie.js";

export async function action({ request }: ActionFunctionArgs) {
  const { commerce } = getAdapters();
  const defaultCartId = await getCartId(request);

  // Peek at which tool this is without consuming the body the handler needs.
  const { tool } = (await request.clone().json()) as { tool?: string };
  const response = await handleToolConfirmRequest({ request: request.clone(), commerce, defaultCartId });

  // Only add_to_cart can hand back a brand-new cart id worth remembering —
  // create_checkout's output also has an `id` field, but it's a checkout id.
  if (defaultCartId || tool !== "add_to_cart") return response;

  const body = (await response.clone().json()) as { output?: { id?: string } };
  const newCartId = body.output?.id;
  if (typeof newCartId !== "string") return response;

  const headers = new Headers(response.headers);
  headers.append("Set-Cookie", await cartCookie.serialize(newCartId));
  return new Response(response.body, { status: response.status, headers });
}
