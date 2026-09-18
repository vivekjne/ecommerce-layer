import type { Cart } from "@commerce/core";
import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useFetcher, useLoaderData } from "react-router";
import { QuantityStepper } from "../components/QuantityStepper.js";
import { getAdapters } from "../lib/adapters.js";
import { formatMoney } from "../lib/format.js";
import { defaultSelection, findVariant } from "../lib/variants.js";

export async function loader({ params }: LoaderFunctionArgs) {
  const { commerce } = getAdapters();
  const product = await commerce.getProduct({ handle: params.handle! });
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return { product };
}

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const [selected, setSelected] = useState<Record<string, string>>(() => defaultSelection(product));
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const fetcher = useFetcher<{ cart?: Cart; error?: string }>();

  const variant = findVariant(product, selected);
  const available = variant?.availableForSale ?? false;
  const price = variant?.price ?? product.minPrice;
  const image = product.images[0];
  const busy = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && "cart" in fetcher.data) {
      setJustAdded(true);
      const timeout = setTimeout(() => setJustAdded(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [fetcher.state, fetcher.data]);

  function handleAddToCart() {
    if (!variant) return;
    fetcher.submit({ intent: "add", variantId: variant.id, quantity: String(quantity) }, { method: "post", action: "/api/cart" });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
          {image ? (
            <img src={image.url} alt={image.altText ?? product.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400 dark:text-neutral-600">No image</div>
          )}
        </div>

        <div>
          {product.vendor && <div className="text-sm text-neutral-400 dark:text-neutral-500">{product.vendor}</div>}
          <h1 className="mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{product.title}</h1>
          <div className="mt-2 text-xl font-semibold text-indigo-600 dark:text-indigo-400">{formatMoney(price)}</div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{product.description}</p>

          {product.options.map((option) => (
            <div key={option.name} className="mt-6">
              <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{option.name}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selected[option.name] === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelected((prev) => ({ ...prev, [option.name]: value }))}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-neutral-200 text-neutral-700 hover:border-indigo-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-indigo-800"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Quantity</span>
            <QuantityStepper value={quantity} onChange={setQuantity} max={variant?.inventoryQuantity} disabled={!available} />
          </div>

          {variant && !available && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">This option is out of stock.</p>}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!variant || !available || busy}
            className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-10"
          >
            {!variant || !available ? "Out of stock" : busy ? "Adding…" : justAdded ? "Added to cart ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
