import type { ProductStatus } from "@commerce/core";
import { Form, Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { requireNativeBackend } from "../lib/adapters.js";
import { requireAdmin } from "../lib/admin-auth.server.js";
import { formatMoney } from "../lib/format.js";

const PAGE_SIZE = 25;

function parseStatus(value: string | null): ProductStatus | undefined {
  return value === "active" || value === "draft" || value === "archived" ? value : undefined;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const native = requireNativeBackend();
  await requireAdmin(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() || undefined;
  const status = parseStatus(url.searchParams.get("status"));
  const after = url.searchParams.get("after") ?? undefined;
  const page = native.admin.listProducts({ first: PAGE_SIZE, after, query, status });
  return { products: page.edges.map((e) => e.node), pageInfo: page.pageInfo, query: query ?? "", status: status ?? "" };
}

const STATUS_STYLE: Record<ProductStatus, string> = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  draft: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  archived: "bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-500",
};

export default function AdminProducts() {
  const { products, pageInfo, query, status } = useLoaderData<typeof loader>();
  const nextParams = new URLSearchParams({ ...(query ? { q: query } : {}), ...(status ? { status } : {}), after: pageInfo.endCursor ?? "" });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Products</h1>
        <Link to="/admin/products/new" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Add product
        </Link>
      </div>

      <Form method="get" role="search" aria-label="Filter products" className="mt-5 flex flex-wrap gap-2">
        <label htmlFor="product-q" className="sr-only">
          Search products
        </label>
        <input
          id="product-q"
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search products"
          className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
        />
        <label htmlFor="product-status" className="sr-only">
          Status
        </label>
        <select
          id="product-status"
          name="status"
          defaultValue={status}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <button type="submit" className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">
          Filter
        </button>
      </Form>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Products</caption>
          <thead className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Product</th>
              <th scope="col" className="px-4 py-3 font-medium">Status</th>
              <th scope="col" className="px-4 py-3 font-medium">Inventory</th>
              <th scope="col" className="px-4 py-3 font-medium">Type</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-neutral-500 dark:text-neutral-400">
                  No products match.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <th scope="row" className="px-4 py-3 font-medium">
                    <Link to={`/admin/products/${p.id}`} className="flex items-center gap-3 text-neutral-900 hover:underline dark:text-neutral-100">
                      {p.images[0] ? (
                        <img src={p.images[0].url} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                      ) : (
                        <span aria-hidden="true" className="h-10 w-10 shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
                      )}
                      {p.title}
                    </Link>
                  </th>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                  </td>
                  <td className={`px-4 py-3 tabular-nums ${p.totalInventory === 0 ? "text-red-600 dark:text-red-400" : "text-neutral-600 dark:text-neutral-400"}`}>
                    {p.totalInventory} in stock · {p.variants.length} {p.variants.length === 1 ? "variant" : "variants"}
                  </td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{p.productType ?? "—"}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-neutral-900 dark:text-neutral-100">
                    {p.minPrice.amount === p.maxPrice.amount ? formatMoney(p.minPrice) : `${formatMoney(p.minPrice)} – ${formatMoney(p.maxPrice)}`}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageInfo.hasNextPage ? (
        <div className="mt-4 text-right text-sm">
          <Link to={`?${nextParams.toString()}`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Next page →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
