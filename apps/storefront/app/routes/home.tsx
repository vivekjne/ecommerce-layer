import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { ProductGrid } from "../components/ProductGrid.js";
import { getAdapters } from "../lib/adapters.js";
import { listProductTypes } from "../lib/categories.js";

export async function loader(_args: LoaderFunctionArgs) {
  const { commerce } = getAdapters();
  const [featured, types] = await Promise.all([commerce.searchProducts({ first: 8 }), listProductTypes(commerce)]);

  return { featured: featured.edges.map((e) => e.node), types };
}

export default function Home() {
  const { featured, types } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Gear built for the trail and the everyday</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-indigo-100 sm:text-base">
          Browse the catalog yourself, or ask our shopping assistant — bottom right — to find it for you.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition-transform hover:scale-105"
        >
          Shop the collection
        </Link>
      </section>

      {types.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Shop by category</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {types.map((type) => (
              <Link
                key={type}
                to={`/products?type=${encodeURIComponent(type)}`}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-indigo-800 dark:hover:text-indigo-400"
              >
                {type}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Featured</h2>
          <Link to="/products" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            View all
          </Link>
        </div>
        <div className="mt-4">
          <ProductGrid products={featured} />
        </div>
      </section>
    </div>
  );
}
