import type { Connection, Product } from "@commerce/core";
import { useEffect, useId, useRef, useState } from "react";
import type { LoaderFunctionArgs, MetaDescriptor, MetaFunction } from "react-router";
import { Form, Link, useFetcher, useLoaderData } from "react-router";
import { ProductGrid } from "../components/ProductGrid.js";
import { SearchIcon } from "../components/icons.js";
import { getAdapters } from "../lib/adapters.js";
import { listProductTypes } from "../lib/categories.js";
import { absoluteUrl, SITE_NAME } from "../lib/seo.js";

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

  return { page, types, q, type, canonicalUrl: absoluteUrl(request, type ? `/products?type=${encodeURIComponent(type)}` : "/products") };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const { q, type, canonicalUrl } = data;

  const title = type ? `${type} — Shop` : "Shop";
  const description = type
    ? `Browse our ${type.toLowerCase()} collection.`
    : "Browse the full catalog — search or filter by category.";

  const tags: MetaDescriptor[] = [
    { title: `${title} — ${SITE_NAME}` },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];

  // A free-text search results page isn't a stable page worth indexing;
  // a category listing is, so only that gets a canonical + crawl signal.
  if (q) {
    tags.push({ name: "robots", content: "noindex, follow" });
  } else {
    tags.push({ tagName: "link", rel: "canonical", href: canonicalUrl });
    tags.push({ property: "og:url", content: canonicalUrl });
  }

  return tags;
};

function Filters({ q, type, types }: { q: string; type: string; types: string[] }) {
  const searchInputId = useId();

  return (
    <div className="space-y-4">
      <Form
        method="get"
        role="search"
        aria-label="Search products"
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      >
        <SearchIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-neutral-400" />
        <label htmlFor={searchInputId} className="sr-only">
          Search products
        </label>
        <input
          id={searchInputId}
          type="search"
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

      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        <Link
          to={q ? `/products?q=${encodeURIComponent(q)}` : "/products"}
          aria-current={!type ? "true" : undefined}
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
              aria-current={type === t ? "true" : undefined}
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
  const announceRef = useRef<HTMLDivElement>(null);

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
      <div ref={announceRef} role="status" aria-live="polite" className="sr-only">
        {edges.length} product{edges.length === 1 ? "" : "s"} shown
      </div>
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
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{type || "Shop"}</h1>
      <div className="mt-6">
        <Filters q={q} type={type} types={types} />
      </div>
      <ProductResults key={`${q}:${type}`} initial={page} q={q} type={type} />
    </div>
  );
}
