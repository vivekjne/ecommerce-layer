import { Suspense } from "react";
import { Await, data, isRouteErrorResponse, Link } from "react-router";
import type { Route } from "./+types/product";
import { CATALOG_URL, formatPrice, type Product, type Review } from "~/lib/types";
import { ProductArt } from "~/components/product-art";
import { AddToCart } from "~/components/add-to-cart";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`${CATALOG_URL}/products/${params.slug}`);
  if (res.status === 404) throw data("Product not found", { status: 404 });
  const product: Product = await res.json();

  // not awaited: the slow reviews stream in after the page renders
  const reviews: Promise<Review[]> = fetch(`${CATALOG_URL}/products/${params.slug}/reviews`).then((r) => r.json());

  return { product, reviews };
}

export async function clientLoader({ serverLoader, params }: Route.ClientLoaderArgs) {
  const recent: string[] = JSON.parse(localStorage.getItem("recent") ?? "[]");
  localStorage.setItem("recent", JSON.stringify([params.slug, ...recent.filter((s) => s !== params.slug)].slice(0, 3)));
  return serverLoader();
}

export default function ProductPage({ loaderData }: Route.ComponentProps) {
  const { product, reviews } = loaderData;

  return (
    <div>
      <title>{`${product.name} | Nova Market`}</title>
      <meta name="description" content={product.description} />
      <Link to="/products" className="text-sm text-indigo-700">← All products</Link>
      <div className="mt-4 grid grid-cols-2 gap-8">
        <ProductArt product={product} className="h-64 rounded-3xl" />
        <div>
          <h1 className="text-4xl font-black">{product.name}</h1>
          <p className="mt-1 text-2xl text-slate-700">{formatPrice(product.price)}</p>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <p className="mt-2 text-sm text-slate-500">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
          <div className="mt-5 max-w-xs"><AddToCart slug={product.slug} soldOut={product.stock === 0} /></div>
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-black">Reviews</h2>
      <Suspense fallback={<div className="mt-3 animate-pulse rounded-xl bg-slate-200 p-6 text-slate-500">Loading reviews...</div>}>
        <Await resolve={reviews}>
          {(list) => (
            <ul className="mt-3 space-y-3">
              {list.map((r) => (
                <li key={r.author} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="font-bold">{r.author} <span className="text-amber-500">{"★".repeat(r.stars)}</span></p>
                  <p className="text-slate-600">{r.text}</p>
                </li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

// the layout and header stay; only this part of the page shows the error
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-10 text-center">
      <h1 className="text-2xl font-black text-rose-700">{isRouteErrorResponse(error) ? `${error.status}: ${error.data}` : "Could not load this product"}</h1>
      <Link to="/products" className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">Browse all products</Link>
    </div>
  );
}
