import type { Route } from "./+types/api-products";
import { CATALOG_URL } from "~/lib/types";

export async function loader(_: Route.LoaderArgs) {
  const res = await fetch(`${CATALOG_URL}/products`);
  return Response.json(await res.json(), { headers: { "Cache-Control": "max-age=60" } });
}
