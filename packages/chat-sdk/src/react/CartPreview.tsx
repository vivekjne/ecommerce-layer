import type { Cart } from "@commerce/core";
import { formatMoney } from "./format.js";
import { CartIcon } from "./icons.js";

export function CartPreview({ cart }: { cart: Cart }) {
  if (cart.lines.length === 0) {
    return (
      <p role="status" className="flex items-center gap-2 rounded-2xl border border-dashed border-neutral-300 p-4 text-sm text-neutral-400 dark:border-neutral-700 dark:text-neutral-500">
        <CartIcon aria-hidden="true" className="h-4 w-4" />
        Cart is empty.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {cart.lines.map((line) => (
          <li key={line.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            {line.image ? (
              <img src={line.image.url} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
            ) : (
              <div aria-hidden="true" className="h-12 w-12 shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{line.title}</div>
              <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                {line.variantTitle} · Qty {line.quantity} × {formatMoney(line.unitPrice)}
              </div>
            </div>
            <div className="shrink-0 text-sm font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
              {formatMoney(line.lineTotal)}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-3 text-sm font-semibold text-neutral-900 dark:border-neutral-800 dark:text-neutral-100">
        <span>Total</span>
        <span className="tabular-nums">{formatMoney(cart.total)}</span>
      </div>
    </div>
  );
}
