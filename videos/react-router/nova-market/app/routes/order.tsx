import { data, Link } from "react-router";
import type { Route } from "./+types/order";
import { orders } from "~/db.server";
import { formatPrice } from "~/lib/types";

export async function loader({ params }: Route.LoaderArgs) {
  const order = orders.get(params.id);
  if (!order) throw data("Order not found", { status: 404 });
  return { order };
}

export default function Order({ loaderData }: Route.ComponentProps) {
  const { order } = loaderData;
  return (
    <div className="mx-auto max-w-lg text-center">
      <title>{`Order ${order.id} | Nova Market`}</title>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white">
        ✓
      </div>
      <h1 className="mt-4 text-3xl font-black">
        Thank you, {order.name}!
      </h1>
      <p className="mt-1 text-slate-600">
        Order #{order.id} · {formatPrice(order.total)}
      </p>
      {/* a resource route is a file download, not a page: use a normal navigation */}
      <Link
        reloadDocument
        to={`/invoices/${order.id}`}
        className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-2 font-semibold text-white"
      >
        Download invoice
      </Link>
    </div>
  );
}
