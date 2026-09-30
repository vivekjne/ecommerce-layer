import { data } from "react-router";
import type { Route } from "./+types/invoice";
import { orders } from "~/db.server";
import { formatPrice } from "~/lib/types";

function invoiceText(
  order: NonNullable<ReturnType<typeof orders.get>>,
) {
  const lines = order.items.map(
    (i) =>
      `${i.quantity} x ${i.name}  ${formatPrice(i.price * i.quantity)}`,
  );
  return [
    `Invoice #${order.id}`,
    ...lines,
    `Total ${formatPrice(order.total)}`,
  ].join("\n");
}

export async function loader({ params }: Route.LoaderArgs) {
  const order = orders.get(params.id);
  if (!order) throw data("Invoice not found", { status: 404 });
  return new Response(invoiceText(order), {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": "attachment; filename=invoice.txt",
    },
  });
}
