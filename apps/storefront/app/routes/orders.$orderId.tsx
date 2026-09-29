import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { OrderStatusBadge } from "../components/OrderStatusBadge.js";
import { requireNativeBackend } from "../lib/adapters.js";
import { formatMoney } from "../lib/format.js";
import { SITE_NAME } from "../lib/seo.js";

export async function loader({ params }: LoaderFunctionArgs) {
  const order = requireNativeBackend().orders.get(params.orderId!);
  if (!order) throw new Response("Order not found", { status: 404 });
  return { order };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data ? `Order #${data.order.number} — ${SITE_NAME}` : `Order not found — ${SITE_NAME}` },
  { name: "robots", content: "noindex, nofollow" },
];

const STATUS_COPY = {
  paid: "We've received your order and are getting it ready to ship.",
  fulfilled: "Your order is on its way.",
  cancelled: "This order was cancelled and your payment has been refunded.",
} as const;

export default function OrderRoute() {
  const { order } = useLoaderData<typeof loader>();
  const address = order.shippingAddress;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Order #{order.number}</p>
      <h1 className="mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {order.status === "cancelled" ? "Order cancelled" : "Thank you for your order!"}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
        <OrderStatusBadge status={order.status} />
        <span>{STATUS_COPY[order.status]}</span>
      </div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Contact email: <strong className="text-neutral-900 dark:text-neutral-100">{order.email}</strong>. Bookmark this page to check on your order.
      </p>

      <section aria-labelledby="items-heading" className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 id="items-heading" className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Items
        </h2>
        <ul className="mt-2 divide-y divide-neutral-100 dark:divide-neutral-900">
          {order.lines.map((line) => (
            <li key={line.id} className="flex items-center gap-3 py-3">
              {line.imageUrl ? (
                <img src={line.imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
              ) : (
                <div aria-hidden="true" className="h-14 w-14 shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-900" />
              )}
              <div className="min-w-0 flex-1 text-sm">
                <div className="font-medium text-neutral-900 dark:text-neutral-100">{line.title}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {line.variantTitle} · Qty {line.quantity} · {formatMoney(line.unitPrice)} each
                </div>
              </div>
              <div className="text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-100">{formatMoney(line.lineTotal)}</div>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-2 border-t border-neutral-100 pt-3 text-sm dark:border-neutral-900">
          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <dt>Shipping ({order.shippingMethod.title})</dt>
            <dd className="tabular-nums">{order.shipping.amount === 0 ? "Free" : formatMoney(order.shipping)}</dd>
          </div>
          {order.tax.amount > 0 ? (
            <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
              <dt>Tax</dt>
              <dd className="tabular-nums">{formatMoney(order.tax)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between text-base font-semibold text-neutral-900 dark:text-neutral-100">
            <dt>Total</dt>
            <dd data-testid="order-total" className="tabular-nums">
              {formatMoney(order.total)}
            </dd>
          </div>
        </dl>
      </section>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section aria-labelledby="ship-to-heading" className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm dark:border-neutral-800 dark:bg-neutral-950">
          <h2 id="ship-to-heading" className="font-semibold text-neutral-900 dark:text-neutral-100">
            Shipping to
          </h2>
          <address className="mt-2 not-italic leading-relaxed text-neutral-600 dark:text-neutral-400">
            {address.name}
            <br />
            {address.line1}
            {address.line2 ? (
              <>
                <br />
                {address.line2}
              </>
            ) : null}
            <br />
            {address.city}, {address.region} {address.postalCode}
            <br />
            {address.country}
          </address>
        </section>
        <section aria-labelledby="payment-heading" className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm dark:border-neutral-800 dark:bg-neutral-950">
          <h2 id="payment-heading" className="font-semibold text-neutral-900 dark:text-neutral-100">
            Payment
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {order.payment.brand} ending in {order.payment.last4}
          </p>
        </section>
      </div>

      <Link to="/products" className="mt-8 inline-flex rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Continue shopping
      </Link>
    </div>
  );
}
