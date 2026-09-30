import { Suspense } from "react";
import { Await, data, isRouteErrorResponse, Link } from "react-router";
import type { Route } from "./+types/product";
import {
  CATALOG_URL,
  formatPrice,
  type Product,
  type Review,
} from "~/lib/types";
import { ProductArt } from "~/components/product-art";
import { AddToCart } from "~/components/add-to-cart";
import { ErrorCard } from "~/components/error-card";
import { ReviewList, ReviewsSkeleton } from "~/components/reviews";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`${CATALOG_URL}/products/${params.slug}`);
  if (res.status === 404)
    throw data("Product not found", { status: 404 });
  const product: Product = await res.json();

  // not awaited: the slow reviews stream in after the page renders
  const reviews: Promise<Review[]> = fetch(
    `${CATALOG_URL}/products/${params.slug}/reviews`,
  ).then((r) => r.json());

  return { product, reviews };
}

export const handle = { breadcrumb: "Product" };

export async function clientLoader({
  serverLoader,
  params,
}: Route.ClientLoaderArgs) {
  const recent: string[] = JSON.parse(
    localStorage.getItem("recent") ?? "[]",
  );
  localStorage.setItem(
    "recent",
    JSON.stringify(
      [params.slug, ...recent.filter((s) => s !== params.slug)].slice(
        0,
        3,
      ),
    ),
  );
  return serverLoader();
}

export default function ProductPage({
  loaderData,
}: Route.ComponentProps) {
  const { product, reviews } = loaderData;

  return (
    <div>
      <title>{`${product.name} | Nova Market`}</title>
      <meta name="description" content={product.description} />
      <Link to="/products" className="text-sm text-indigo-700">
        ← All products
      </Link>
      <div className="mt-4 grid grid-cols-2 gap-8">
        <ProductArt product={product} className="h-64 rounded-3xl" />
        <div>
          <h1 className="text-4xl font-black">{product.name}</h1>
          <p className="mt-1 text-2xl text-slate-700">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <p className="mt-2 text-sm text-slate-500">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>
          <div className="mt-5 max-w-xs">
            <AddToCart
              slug={product.slug}
              soldOut={product.stock === 0}
            />
          </div>
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-black">Reviews</h2>
      <Suspense fallback={<ReviewsSkeleton />}>
        <Await resolve={reviews}>
          {(list) => <ReviewList reviews={list} />}
        </Await>
      </Suspense>
    </div>
  );
}

// the layout and header stay; only this part of the page shows the error
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const message = isRouteErrorResponse(error)
    ? `${error.status}: ${error.data}`
    : "Could not load this product";
  return <ErrorCard message={message} />;
}
