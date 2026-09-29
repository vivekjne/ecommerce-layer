import type { Money } from "@commerce/core";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { OrderStatusBadge } from "../components/OrderStatusBadge.js";
import { requireNativeBackend } from "../lib/adapters.js";
import { requireAdmin } from "../lib/admin-auth.server.js";
import { toUserError } from "../lib/errors.js";
import { formatMoney } from "../lib/format.js";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const native = requireNativeBackend();
  await requireAdmin(request);
  const order = native.orders.get(params.orderId!);
  if (!order) throw new Response("Order not found", { status: 404 });
  return { order };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const native = requireNativeBackend();
  await requireAdmin(request);
  const intent = (await request.formData()).get("intent");
  try {
    if (intent === "fulfill") native.orders.fulfill(params.orderId!);
    else if (intent === "cancel") await native.orders.cancel(params.orderId!);
    else return Response.json({ error: "Unknown action." }, { status: 400 });
    return { ok: true as const };
  } catch (err) {
    const { message, status } = toUserError(err);
    return Response.json({ error: message }, { status });
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

export default function AdminOrder() {
  const { order } = useLoaderData<typeof loader>();
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const busy = navigation.state !== "idle";
  const a = order.shippingAddress;

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin/orders" className="text-sm text-neutral-500 hover:underline dark:text-neutral-400">
          ← Orders
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Order #{order.number}</h1>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Placed {formatDate(order.createdAt)}
          {order.fulfilledAt ? ` · Fulfilled ${formatDate(order.fulfilledAt)}` : ""}
          {order.cancelledAt ? ` · Cancelled ${formatDate(order.cancelledAt)}` : ""}
        </p>
      </div>

      {actionData?.error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {actionData.error}
        </p>
      ) : null}

      {order.status === "paid" ? (
        <div className="flex flex-wrap gap-3">
          <Form method="post">
            <button
              type="submit"
              name="intent"
              value="fulfill"
              disabled={busy}
              className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-neutral-900"
            >
              Mark as fulfilled
            </button>
          </Form>
          <Form
            method="post"
            onSubmit={(event) => {
              if (!confirm(`Cancel order #${order.number}? Items are restocked and the payment is refunded.`)) event.preventDefault();
            }}
          >
            <button
              type="submit"
              name="intent"
              value="cancel"
              disabled={busy}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:ring-red-900 dark:hover:bg-red-950/40"
            >
              Cancel &amp; refund
            </button>
          </Form>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section aria-labelledby="lines-heading" className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 id="lines-heading" className="font-semibold text-neutral-900 dark:text-neutral-100">
            Items
          </h2>
          <ul className="mt-2 divide-y divide-neutral-100 dark:divide-neutral-800">
            {order.lines.map((line) => (
              <li key={line.id} className="flex items-center gap-3 py-3 text-sm">
                <div className="min-w-0 flex-1">
                  <Link to={`/admin/products/${line.productId}`} className="font-medium text-neutral-900 hover:underline dark:text-neutral-100">
                    {line.title}
                  </Link>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {line.variantTitle}
                    {line.sku ? ` · SKU ${line.sku}` : ""}
                  </div>
                </div>
                <div className="tabular-nums text-neutral-600 dark:text-neutral-400">
                  {formatMoney(line.unitPrice)} × {line.quantity}
                </div>
                <div className="w-24 text-right tabular-nums text-neutral-900 dark:text-neutral-100">{formatMoney(line.lineTotal)}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1.5 border-t border-neutral-100 pt-3 text-sm dark:border-neutral-800">
            {(
              [
                ["Subtotal", order.subtotal],
                [`Shipping (${order.shippingMethod.title})`, order.shipping],
                ["Tax", order.tax],
              ] satisfies [string, Money][]
            ).map(([label, amount]) => (
              <div key={label} className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <dt>{label}</dt>
                <dd className="tabular-nums">{formatMoney(amount)}</dd>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-neutral-900 dark:text-neutral-100">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatMoney(order.total)}</dd>
            </div>
          </dl>
        </section>

        <div className="space-y-6">
          <section aria-labelledby="customer-heading" className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 id="customer-heading" className="font-semibold text-neutral-900 dark:text-neutral-100">
              Customer
            </h2>
            <p className="mt-2 break-all text-neutral-600 dark:text-neutral-400">{order.email}</p>
            <h3 className="mt-4 font-medium text-neutral-900 dark:text-neutral-100">Ship to</h3>
            <address className="mt-1 not-italic leading-relaxed text-neutral-600 dark:text-neutral-400">
              {a.name}
              <br />
              {a.line1}
              {a.line2 ? (
                <>
                  <br />
                  {a.line2}
                </>
              ) : null}
              <br />
              {a.city}, {a.region} {a.postalCode}
              <br />
              {a.country}
            </address>
          </section>
          <section aria-labelledby="payment-heading" className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 id="payment-heading" className="font-semibold text-neutral-900 dark:text-neutral-100">
              Payment
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              {order.payment.brand} ···· {order.payment.last4}
              {order.status === "cancelled" ? " · Refunded" : ""}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
