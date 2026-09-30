import { data, Form, Link, useNavigation } from "react-router";
import type { Route } from "./+types/products";
import {
  CATALOG_URL,
  formatPrice,
  type Product,
} from "~/lib/types";
import { ProductArt } from "~/components/product-art";
import { AddToCart } from "~/components/add-to-cart";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const res = await fetch(
    `${CATALOG_URL}/products?q=${encodeURIComponent(q)}`,
  );
  if (!res.ok)
    throw data("Catalog unavailable", { status: 502 });
  const products: Product[] = await res.json();
  return { products, q };
}

export function headers() {
  return { "Cache-Control": "max-age=60" };
}

export const handle = { breadcrumb: "Products" };

export default function Products({
  loaderData,
}: Route.ComponentProps) {
  const { products, q } = loaderData;
  const navigation = useNavigation();
  const searching =
    navigation.location?.pathname === "/products";

  return (
    <div>
      <title>All products | Nova Market</title>
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-black">All products</h1>
        <Form method="get" className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="Filter by name"
            className="rounded-lg border border-slate-300 px-3 py-1.5"
          />
          <button className="rounded-lg bg-slate-900 px-4 py-1.5 font-semibold text-white">
            Search
          </button>
        </Form>
      </div>
      <div
        className={
          "mt-6 grid grid-cols-3 gap-5 transition-opacity " +
          (searching ? "opacity-40" : "")
        }
      >
        {products.map((p) => (
          <div
            key={p.slug}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <Link to={`/products/${p.slug}`}>
              <ProductArt product={p} className="h-40" />
            </Link>
            <div className="space-y-3 p-4">
              <div className="flex justify-between">
                <p className="font-bold">{p.name}</p>
                <p className="text-slate-600">
                  {formatPrice(p.price)}
                </p>
              </div>
              <AddToCart
                slug={p.slug}
                soldOut={p.stock === 0}
              />
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <p className="mt-10 text-slate-500">
          No products match "{q}".
        </p>
      )}
    </div>
  );
}
