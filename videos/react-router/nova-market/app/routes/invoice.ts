import { data } from "react-router";
import type { Route } from "./+types/invoice";
import { orders } from "~/db.server";
import { formatPrice } from "~/lib/types";

export async function loader({ params }: Route.LoaderArgs) {
  const order = orders.get(params.id);
  if (!order) throw data("Invoice not found", { status: 404 });
  const lines = order.items.map((i) => `${i.quantity} x ${i.name}  ${formatPrice(i.price * i.quantity)}`);
  return new Response([`Invoice #${order.id}`, ...lines, `Total ${formatPrice(order.total)}`].join("\n"), {
    headers: { "Content-Type": "text/plain", "Content-Disposition": `attachment; filename="invoice-${order.id}.txt"` },
  });
}
