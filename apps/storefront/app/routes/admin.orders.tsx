import type { OrderStatus } from "@commerce/adapter-native";
import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { OrderStatusBadge } from "../components/OrderStatusBadge.js";
import { requireNativeBackend } from "../lib/adapters.js";
import { requireAdmin } from "../lib/admin-auth.server.js";
import { formatMoney } from "../lib/format.js";

const PAGE_SIZE = 20;
const FILTERS: { status: OrderStatus | null; label: string }[] = [
  { status: null, label: "All" },
  { status: "paid", label: "To fulfill" },
  { status: "fulfilled", label: "Fulfilled" },
  { status: "cancelled", label: "Cancelled" },
];

function parseStatus(value: string | null): OrderStatus | undefined {
  return value === "paid" || value === "fulfilled" || value === "cancelled" ? value : undefined;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const native = requireNativeBackend();
  await requireAdmin(request);
  const url = new URL(request.url);
  const status = parseStatus(url.searchParams.get("status"));
  const after = url.searchParams.get("after") ?? undefined;
  const page = native.orders.list({ first: PAGE_SIZE, after, status });
  return { orders: page.edges.map((e) => e.node), pageInfo: page.pageInfo, status: status ?? null };
}

export default function AdminOrders() {
  const { orders, pageInfo, status } = useLoaderData<typeof loader>();
  const qs = (params: Record<string, string | null>) => {
    const search = new URLSearchParams(Object.entries(params).filter((e): e is [string, string] => e[1] != null));
    const str = search.toString();
    return str ? `?${str}` : "";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Orders</h1>

      <nav aria-label="Filter orders by status" className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.label}
            to={qs({ status: f.status })}
            aria-current={f.status === status ? "page" : undefined}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
              f.status === status
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-neutral-800"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Orders, newest first</caption>
          <thead className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Order</th>
              <th scope="col" className="px-4 py-3 font-medium">Date</th>
              <th scope="col" className="px-4 py-3 font-medium">Customer</th>
              <th scope="col" className="px-4 py-3 font-medium">Status</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-neutral-500 dark:text-neutral-400">
                  No orders{status ? " with this status" : " yet"}.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <th scope="row" className="px-4 py-3 font-medium">
                    <Link to={`/admin/orders/${order.id}`} className="text-indigo-600 hover:underline dark:text-indigo-400">
                      #{order.number}
                    </Link>
                  </th>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{new Date(order.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{order.email}</td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-neutral-900 dark:text-neutral-100">{formatMoney(order.total)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between text-sm">
        {pageInfo.hasPreviousPage ? (
          <Link to={qs({ status })} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            ← Newest
          </Link>
        ) : (
          <span />
        )}
        {pageInfo.hasNextPage && pageInfo.endCursor ? (
          <Link to={qs({ status, after: pageInfo.endCursor })} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Older →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
