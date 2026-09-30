import type { Route } from "./+types/account-orders";
import { orders } from "~/db.server";
import { userContext } from "~/context";
import { formatPrice } from "~/lib/types";

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  return {
    orders: [...orders.values()].filter(
      (o) => o.userEmail === user?.email,
    ),
  };
}

export default function AccountOrders({
  loaderData,
}: Route.ComponentProps) {
  if (loaderData.orders.length === 0)
    return <p className="text-slate-500">No orders yet.</p>;
  return (
    <ul className="space-y-3">
      {loaderData.orders.map((o) => (
        <li
          key={o.id}
          className="rounded-xl border border-slate-200 bg-white p-4"
        >
          Order #{o.id} · {formatPrice(o.total)}
        </li>
      ))}
    </ul>
  );
}
