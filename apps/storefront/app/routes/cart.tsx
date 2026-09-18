import type { Cart, CartLine, CheckoutSession } from "@commerce/core";
import { Link, useFetcher, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { QuantityStepper } from "../components/QuantityStepper.js";
import { ExternalLinkIcon, TrashIcon } from "../components/icons.js";
import { getAdapters } from "../lib/adapters.js";
import { getCartId } from "../lib/cart-cookie.js";
import { formatMoney } from "../lib/format.js";

export async function loader({ request }: LoaderFunctionArgs) {
  const { commerce } = getAdapters();
  const cartId = await getCartId(request);
  const cart = cartId ? await commerce.getCart(cartId) : null;
  return { cart };
}

function CartLineRow({ line }: { line: CartLine }) {
  const fetcher = useFetcher<{ cart?: Cart }>();
  const pendingQuantity = fetcher.formData?.get("quantity");
  const quantity = pendingQuantity ? Number(pendingQuantity) : line.quantity;
  const removing = fetcher.formData?.get("intent") === "remove";

  function updateQuantity(next: number) {
    fetcher.submit({ intent: "update", lineId: line.id, quantity: String(next) }, { method: "post", action: "/api/cart" });
  }

  function remove() {
    fetcher.submit({ intent: "remove", lineId: line.id }, { method: "post", action: "/api/cart" });
  }

  return (
    <div className={`flex items-center gap-4 py-5 transition-opacity ${removing ? "opacity-40" : ""}`}>
      {line.image ? (
        <img src={line.image.url} alt={line.image.altText ?? line.title} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
      ) : (
        <div className="h-20 w-20 shrink-0 rounded-xl bg-neutral-100 dark:bg-neutral-900" />
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{line.title}</div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">{line.variantTitle}</div>
        <div className="mt-2">
          <QuantityStepper value={quantity} onChange={updateQuantity} disabled={fetcher.state !== "idle"} />
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-sm font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">{formatMoney(line.lineTotal)}</div>
        <button
          type="button"
          onClick={remove}
          disabled={fetcher.state !== "idle"}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
        >
          <TrashIcon className="h-3 w-3" />
          Remove
        </button>
      </div>
    </div>
  );
}

function CheckoutButton({ cartId }: { cartId: string }) {
  const fetcher = useFetcher<{ checkout?: CheckoutSession; error?: string }>();
  const checkout = fetcher.data?.checkout;

  if (checkout) {
    return (
      <a
        href={checkout.url}
        target="_blank"
        rel="noreferrer"
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500"
      >
        Go to checkout
        <ExternalLinkIcon className="h-4 w-4" />
      </a>
    );
  }

  return (
    <fetcher.Form method="post" action="/api/cart">
      <input type="hidden" name="intent" value="checkout" />
      <input type="hidden" name="cartId" value={cartId} />
      <button
        type="submit"
        disabled={fetcher.state !== "idle"}
        className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-neutral-900"
      >
        {fetcher.state !== "idle" ? "Preparing checkout…" : "Checkout"}
      </button>
    </fetcher.Form>
  );
}

export default function CartRoute() {
  const { cart } = useLoaderData<typeof loader>();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Your cart is empty</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Find something you like and it'll show up here.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Your cart</h1>

      <div className="mt-6 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white px-5 dark:divide-neutral-900 dark:border-neutral-800 dark:bg-neutral-950">
        {cart.lines.map((line) => (
          <CartLineRow key={line.id} line={line} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatMoney(cart.subtotal)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <span>Total</span>
          <span className="tabular-nums">{formatMoney(cart.total)}</span>
        </div>
        <div className="mt-5">
          <CheckoutButton cartId={cart.id} />
        </div>
      </div>
    </div>
  );
}
