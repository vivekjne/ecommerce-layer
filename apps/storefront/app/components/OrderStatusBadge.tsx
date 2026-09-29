import type { OrderStatus } from "@commerce/adapter-native";

const STYLES: Record<OrderStatus, { label: string; className: string }> = {
  paid: { label: "Paid · Unfulfilled", className: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300" },
  fulfilled: { label: "Fulfilled", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" },
  cancelled: { label: "Cancelled", className: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, className } = STYLES[status];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{label}</span>;
}
