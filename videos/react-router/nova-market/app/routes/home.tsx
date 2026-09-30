import {
  Link,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import type { Route } from "./+types/home";
import {
  CATALOG_URL,
  formatPrice,
  type Product,
} from "~/lib/types";
import { ProductArt } from "~/components/product-art";

export async function loader() {
  const res = await fetch(`${CATALOG_URL}/products`);
  const products: Product[] = await res.json();
  return { featured: products.slice(0, 3) };
}

// browser only: adds data from localStorage
export async function clientLoader({
  serverLoader,
}: Route.ClientLoaderArgs) {
  const { featured } = await serverLoader();
  const recent: string[] = JSON.parse(
    localStorage.getItem("recent") ?? "[]",
  );
  return { featured, recent };
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return (
    <p className="py-20 text-center text-slate-500">
      Loading the shop...
    </p>
  );
}

// cart changes never affect this page
export function shouldRevalidate({
  formAction,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  if (formAction === "/cart") return false;
  return defaultShouldRevalidate;
}

export default function Home({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-pink-500 p-10 text-white">
        <h1 className="text-4xl font-black">
          Everyday things, well made.
        </h1>
        <p className="mt-2 max-w-md text-indigo-100">
          Free shipping over $50. Thirty day returns.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-full bg-white px-5 py-2 font-bold text-indigo-700"
        >
          Shop all products
        </Link>
      </section>
      <h2 className="mt-10 text-2xl font-black">Featured</h2>
      <div className="mt-4 grid grid-cols-3 gap-5">
        {loaderData.featured.map((p) => (
          <Link
            key={p.slug}
            to={`/products/${p.slug}`}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <ProductArt product={p} className="h-40" />
            <div className="p-4">
              <p className="font-bold">{p.name}</p>
              <p className="text-slate-600">
                {formatPrice(p.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {loaderData.recent.length > 0 && (
        <p className="mt-8 text-slate-600">
          Recently viewed: {loaderData.recent.join(", ")}
        </p>
      )}
    </div>
  );
}
