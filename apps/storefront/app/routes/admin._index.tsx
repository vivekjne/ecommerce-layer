import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { OrderStatusBadge } from "../components/OrderStatusBadge.js";
import { requireNativeBackend } from "../lib/adapters.js";
import { requireAdmin } from "../lib/admin-auth.server.js";
import { formatMoney } from "../lib/format.js";

const LOW_STOCK_THRESHOLD = 5;

export async function loader({ request }: LoaderFunctionArgs) {
  const native = requireNativeBackend();
  await requireAdmin(request);
  const [lowStock, audit] = await Promise.all([
    native.merchant.getLowStock({ threshold: LOW_STOCK_THRESHOLD, first: 8 }),
    native.merchant.auditCatalog(),
  ]);
  return {
    stats: native.orders.stats(),
    counts: native.admin.counts(),
    recentOrders: native.orders.list({ first: 5 }).edges.map((e) => e.node),
    lowStock: lowStock.edges.map((e) => e.node),
    issueCount: audit.issues.length,
  };
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <dt className="text-sm text-neutral-500 dark:text-neutral-400">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">{value}</dd>
    </div>
  );
}

export default function AdminDashboard() {
  const { stats, counts, recentOrders, lowStock, issueCount } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Dashboard</h1>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Revenue" value={formatMoney(stats.revenue)} />
        <Stat label="Orders" value={stats.orderCount} />
        <Stat label="To fulfill" value={stats.openOrderCount} />
        <Stat label="Active products" value={`${counts.activeCount} / ${counts.productCount}`} />
      </dl>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="recent-heading" className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <h2 id="recent-heading" className="font-semibold text-neutral-900 dark:text-neutral-100">
              Recent orders
            </h2>
            <Link to="/admin/orders" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
              View all
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">No orders yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-neutral-100 dark:divide-neutral-800">
              {recentOrders.map((order) => (
                <li key={order.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <Link to={`/admin/orders/${order.id}`} className="font-medium text-neutral-900 hover:underline dark:text-neutral-100">
                    #{order.number}
                  </Link>
                  <span className="min-w-0 flex-1 truncate text-neutral-500 dark:text-neutral-400">{order.email}</span>
                  <OrderStatusBadge status={order.status} />
                  <span className="tabular-nums text-neutral-900 dark:text-neutral-100">{formatMoney(order.total)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="stock-heading" className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 id="stock-heading" className="font-semibold text-neutral-900 dark:text-neutral-100">
            Low stock <span className="font-normal text-neutral-500">(≤ {LOW_STOCK_THRESHOLD})</span>
          </h2>
          {lowStock.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">Everything is well stocked.</p>
          ) : (
            <ul className="mt-3 divide-y divide-neutral-100 dark:divide-neutral-800">
              {lowStock.map((item) => (
                <li key={item.variantId} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <Link to={`/admin/products/${item.productId}`} className="min-w-0 flex-1 truncate text-neutral-900 hover:underline dark:text-neutral-100">
                    {item.productTitle} <span className="text-neutral-500">· {item.variantTitle}</span>
                  </Link>
                  <span className={`tabular-nums font-medium ${item.inventoryQuantity === 0 ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {item.inventoryQuantity} left
                  </span>
                </li>
              ))}
            </ul>
          )}
          {issueCount > 0 ? (
            <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
              Catalog audit found {issueCount} data-quality {issueCount === 1 ? "issue" : "issues"} (missing images, thin descriptions, etc).
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
