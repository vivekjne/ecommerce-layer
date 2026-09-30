import { useFetcher } from "react-router";
import type { action } from "~/routes/cart";

export function AddToCart({
  slug,
  soldOut = false,
}: {
  slug: string;
  soldOut?: boolean;
}) {
  const fetcher = useFetcher<typeof action>();
  const busy = fetcher.state !== "idle";
  // optimistic: the moment the form is submitted, show the next state
  const added = busy || (fetcher.data && "ok" in fetcher.data);

  return (
    <div>
      <fetcher.Form method="post" action="/cart">
        <input type="hidden" name="intent" value="add" />
        <input type="hidden" name="slug" value={slug} />
        <button
          disabled={soldOut || busy}
          className={
            "w-full rounded-lg px-4 py-2 font-semibold text-white transition " +
            (soldOut
              ? "bg-slate-400"
              : added
                ? "bg-emerald-600"
                : "bg-indigo-600 hover:bg-indigo-500")
          }
        >
          {soldOut
            ? "Sold out"
            : busy
              ? "Adding..."
              : added
                ? "Added to cart"
                : "Add to cart"}
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
