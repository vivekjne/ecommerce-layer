import { data, Link, useFetcher } from "react-router";
import type { Route } from "./+types/cart";
import { getSession, commitSession } from "~/sessions.server";
import { CATALOG_URL, formatPrice, type Product } from "~/lib/types";
import { ProductArt } from "~/components/product-art";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = session.get("cart") ?? {};

  // one request per cart line, all started together
  const items = await Promise.all(
    Object.entries(cart).map(async ([slug, quantity]) => {
      const res = await fetch(`${CATALOG_URL}/products/${slug}`);
      const product: Product = await res.json();
      return { product, quantity };
    }),
  );
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  return { items, total };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = session.get("cart") ?? {};
  const form = await request.formData();
  const intent = String(form.get("intent"));
  const slug = String(form.get("slug"));

  const res = await fetch(`${CATALOG_URL}/products/${slug}`);
  if (!res.ok) return data({ error: "Unknown product" }, { status: 404 });
  const product: Product = await res.json();

  if (intent === "add" || intent === "increase") {
    if ((cart[slug] ?? 0) + 1 > product.stock) {
      return data({ error: `Only ${product.stock} left in stock` }, { status: 400 });
    }
    cart[slug] = (cart[slug] ?? 0) + 1;
  } else if (intent === "decrease") {
    cart[slug] = Math.max(1, (cart[slug] ?? 1) - 1);
  } else if (intent === "remove") {
    delete cart[slug];
  }

  session.set("cart", cart);
  return data({ ok: true }, { headers: { "Set-Cookie": await commitSession(session) } });
}

function CartLine({ product, quantity }: { product: Product; quantity: number }) {
  const fetcher = useFetcher<typeof action>();
  // optimistic UI: use the submitted intent to show the next quantity right away
  const intent = fetcher.formData?.get("intent");
  const shown = intent === "increase" ? quantity + 1 : intent === "decrease" ? Math.max(1, quantity - 1) : quantity;
  if (intent === "remove") return null;

  return (
    <li className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3">
      <ProductArt product={product} className="h-16 w-16 rounded-xl" />
      <div className="flex-1">
        <p className="font-bold">{product.name}</p>
        <p className="text-slate-500">{formatPrice(product.price)}</p>
        {fetcher.data && "error" in fetcher.data && <p className="text-sm text-rose-600">{fetcher.data.error}</p>}
      </div>
      <fetcher.Form method="post" className="flex items-center gap-2">
        <input type="hidden" name="slug" value={product.slug} />
        <button name="intent" value="decrease" className="h-8 w-8 rounded-full bg-slate-100 font-bold">−</button>
        <span className="w-6 text-center font-bold">{shown}</span>
        <button name="intent" value="increase" className="h-8 w-8 rounded-full bg-slate-100 font-bold">+</button>
        <button name="intent" value="remove" className="ml-3 text-sm text-rose-600">Remove</button>
      </fetcher.Form>
    </li>
  );
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { items, total } = loaderData;
  return (
    <div>
      <title>Your cart | Nova Market</title>
      <h1 className="text-3xl font-black">Your cart</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-slate-500">Your cart is empty. <Link to="/products" className="text-indigo-700 underline">Find something you like.</Link></p>
      ) : (
        <>
          <ul className="mt-6 space-y-3">{items.map((i) => <CartLine key={i.product.slug} {...i} />)}</ul>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-xl font-black">Total {formatPrice(total)}</p>
            <Link to="/checkout" className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white">Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}
