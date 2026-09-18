import type { Connection, Product } from "@commerce/core";
import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { Form, Link, useFetcher, useLoaderData } from "react-router";
import { ProductGrid } from "../components/ProductGrid.js";
import { SearchIcon } from "../components/icons.js";
import { getAdapters } from "../lib/adapters.js";
import { listProductTypes } from "../lib/categories.js";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const type = url.searchParams.get("type") ?? "";
  const after = url.searchParams.get("after") ?? undefined;

  const { commerce } = getAdapters();
  const [page, types] = await Promise.all([
    commerce.searchProducts({ first: 12, after, filters: { query: q || undefined, productType: type || undefined } }),
    listProductTypes(commerce),
  ]);

  return { page, types, q, type };
}

function Filters({ q, type, types }: { q: string; type: string; types: string[] }) {
  return (
    <div className="space-y-4">
      <Form method="get" className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <SearchIcon className="h-4 w-4 shrink-0 text-neutral-400" />
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search products…"
          className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-neutral-100"
        />
        {type && <input type="hidden" name="type" value={type} />}
        <button type="submit" className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-neutral-900">
          Search
        </button>
      </Form>

      <div className="flex flex-wrap gap-2">
        <Link
          to={q ? `/products?q=${encodeURIComponent(q)}` : "/products"}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            !type
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-neutral-200 text-neutral-600 hover:border-indigo-300 hover:text-indigo-700 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-indigo-800 dark:hover:text-indigo-400"
          }`}
        >
          All
        </Link>
        {types.map((t) => {
          const params = new URLSearchParams();
          if (q) params.set("q", q);
          params.set("type", t);
          return (
            <Link
              key={t}
              to={`/products?${params.toString()}`}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                type === t
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-indigo-300 hover:text-indigo-700 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-indigo-800 dark:hover:text-indigo-400"
              }`}
            >
              {t}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ProductResults({ initial, q, type }: { initial: Connection<Product>; q: string; type: string }) {
  const [edges, setEdges] = useState(initial.edges);
  const [pageInfo, setPageInfo] = useState(initial.pageInfo);
  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    if (fetcher.data) {
      setEdges((prev) => [...prev, ...fetcher.data!.page.edges]);
      setPageInfo(fetcher.data.page.pageInfo);
    }
  }, [fetcher.data]);

  function loadMore() {
    if (!pageInfo.endCursor) return;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (type) params.set("type", type);
    params.set("after", pageInfo.endCursor);
    fetcher.load(`/products?${params.toString()}`);
  }

  return (
    <>
      <div className="mt-6">
        <ProductGrid products={edges.map((e) => e.node)} />
      </div>
      {pageInfo.hasNextPage && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={fetcher.state !== "idle"}
            className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-700 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
          >
            {fetcher.state !== "idle" ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}

export default function ProductsRoute() {
  const { page, types, q, type } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Shop</h1>
      <div className="mt-6">
        <Filters q={q} type={type} types={types} />
      </div>
      <ProductResults key={`${q}:${type}`} initial={page} q={q} type={type} />
    </div>
  );
}
