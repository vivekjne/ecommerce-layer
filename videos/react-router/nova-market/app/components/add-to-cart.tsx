import { useFetcher } from "react-router";
import type { action } from "~/routes/cart";

type Props = { slug: string; soldOut?: boolean };

function buttonLabel(
  soldOut: boolean,
  busy: boolean,
  added: boolean,
) {
  if (soldOut) return "Sold out";
  if (busy) return "Adding...";
  return added ? "Added to cart" : "Add to cart";
}

function buttonStyle(soldOut: boolean, active: boolean) {
  const base =
    "w-full rounded-lg px-4 py-2 font-semibold text-white transition ";
  if (soldOut) return base + "bg-slate-400";
  return (
    base +
    (active
      ? "bg-emerald-600"
      : "bg-indigo-600 hover:bg-indigo-500")
  );
}

export function AddToCart({ slug, soldOut = false }: Props) {
  const fetcher = useFetcher<typeof action>();
  const busy = fetcher.state !== "idle";
  const added = Boolean(fetcher.data && "ok" in fetcher.data);

  return (
    <div>
      <fetcher.Form method="post" action="/cart">
        <input type="hidden" name="intent" value="add" />
        <input type="hidden" name="slug" value={slug} />
        <button
          disabled={soldOut || busy}
          className={buttonStyle(soldOut, busy || added)}
        >
          {buttonLabel(soldOut, busy, added)}
        </button>
      </fetcher.Form>
      {fetcher.data && "error" in fetcher.data && (
        <p className="mt-1 text-sm text-rose-600">
          {fetcher.data.error}
        </p>
      )}
    </div>
  );
}
