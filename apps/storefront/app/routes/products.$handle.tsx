import type { Cart } from "@commerce/core";
import { useEffect, useId, useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, useFetcher, useLoaderData } from "react-router";
import { QuantityStepper } from "../components/QuantityStepper.js";
import { getAdapters } from "../lib/adapters.js";
import { formatMoney } from "../lib/format.js";
import { absoluteUrl, SITE_NAME } from "../lib/seo.js";
import { defaultSelection, findVariant } from "../lib/variants.js";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { commerce } = getAdapters();
  const product = await commerce.getProduct({ handle: params.handle! });
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  const url = absoluteUrl(request, `/products/${product.handle}`);
  return { product, url };
}

export const meta: MetaFunction<typeof loader> = ({ data, error }) => {
  if (!data) {
    // 404/thrown response — a generic, non-indexable fallback rather than nothing.
    return [{ title: `Product not found — ${SITE_NAME}` }, { name: "robots", content: "noindex" }];
  }

  const { product, url } = data;
  const description = product.description || `${product.title} — available at ${SITE_NAME}.`;
  const image = product.images[0]?.url;
  const inStock = product.totalInventory > 0;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description,
      sku: product.variants[0]?.sku ?? undefined,
      ...(product.vendor ? { brand: { "@type": "Brand", name: product.vendor } } : {}),
      ...(image ? { image: [image] } : {}),
      offers: {
        "@type": "AggregateOffer",
        url,
        priceCurrency: product.minPrice.currencyCode,
        lowPrice: (product.minPrice.amount / 100).toFixed(2),
        highPrice: (product.maxPrice.amount / 100).toFixed(2),
        availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: url.replace(/\/products\/.*$/, "/") },
        { "@type": "ListItem", position: 2, name: "Shop", item: url.replace(/\/products\/.*$/, "/products") },
        { "@type": "ListItem", position: 3, name: product.title, item: url },
      ],
    },
  ];

  return [
    { title: `${product.title} — ${SITE_NAME}` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "product" },
    { property: "og:title", content: product.title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    ...(image ? [{ property: "og:image", content: image }] : []),
    { property: "product:price:amount", content: (product.minPrice.amount / 100).toFixed(2) },
    { property: "product:price:currency", content: product.minPrice.currencyCode },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { "script:ld+json": jsonLd },
  ];
};

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const [selected, setSelected] = useState<Record<string, string>>(() => defaultSelection(product));
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const fetcher = useFetcher<{ cart?: Cart; error?: string }>();
  const optionGroupId = useId();

  const variant = findVariant(product, selected);
  const available = variant?.availableForSale ?? false;
  const price = variant?.price ?? product.minPrice;
  const image = product.images[0];
  const busy = fetcher.state !== "idle";
  const addError = fetcher.state === "idle" ? fetcher.data?.error : undefined;

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
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-neutral-700 dark:text-neutral-300">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
          {image ? (
            <img src={image.url} alt={image.altText ?? product.title} className="h-full w-full object-cover" />
          ) : (
            <div aria-hidden="true" className="flex h-full w-full items-center justify-center text-sm text-neutral-400 dark:text-neutral-600">
              No image
            </div>
          )}
        </div>

        <div>
          {product.vendor && <div className="text-sm text-neutral-400 dark:text-neutral-500">{product.vendor}</div>}
          <h1 className="mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{product.title}</h1>
          <div className="mt-2 text-xl font-semibold text-indigo-600 dark:text-indigo-400">{formatMoney(price)}</div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{product.description}</p>

          {product.options.map((option) => (
            <fieldset key={option.name} className="mt-6">
              <legend className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{option.name}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const inputId = `${optionGroupId}-${option.name}-${value}`;
                  const isSelected = selected[option.name] === value;
                  return (
                    <div key={value}>
                      <input
                        type="radio"
                        id={inputId}
                        name={`${optionGroupId}-${option.name}`}
                        value={value}
                        checked={isSelected}
                        onChange={() => setSelected((prev) => ({ ...prev, [option.name]: value }))}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={inputId}
                        className="cursor-pointer select-none rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-indigo-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-500 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-indigo-800"
                      >
                        {value}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <div className="mt-6 flex items-center gap-4">
            <span id={`${optionGroupId}-qty-label`} className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Quantity
            </span>
            <QuantityStepper value={quantity} onChange={setQuantity} max={variant?.inventoryQuantity} disabled={!available} label={product.title} />
          </div>

          {variant && !available && (
            <p role="alert" className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
              This option is out of stock.
            </p>
          )}

          {addError && (
            <p role="alert" className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
              {addError}
            </p>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!variant || !available || busy}
            className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-10"
          >
            {!variant || !available ? "Out of stock" : busy ? "Adding…" : justAdded ? "Added to cart ✓" : "Add to cart"}
          </button>
          <div role="status" aria-live="polite" className="sr-only">
            {justAdded ? `Added ${quantity} ${product.title} to cart` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
