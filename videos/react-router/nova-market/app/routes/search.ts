import type { Route } from "./+types/search";
import { CATALOG_URL, type Product } from "~/lib/types";

// no default export: a resource route that only returns data
export async function loader({ request }: Route.LoaderArgs) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  if (q.trim() === "") return [] as Pick<Product, "slug" | "name">[];
  const res = await fetch(
    `${CATALOG_URL}/products?q=${encodeURIComponent(q)}`,
  );
  const products: Product[] = await res.json();
  return products.slice(0, 5).map(({ slug, name }) => ({ slug, name }));
}
