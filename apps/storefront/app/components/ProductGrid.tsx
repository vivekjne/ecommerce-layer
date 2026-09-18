import type { Product } from "@commerce/core";
import { Link } from "react-router";
import { formatMoney } from "../lib/format.js";

function priceLabel(product: Product): string {
  if (product.minPrice.amount === product.maxPrice.amount) return formatMoney(product.minPrice);
  return `${formatMoney(product.minPrice)} – ${formatMoney(product.maxPrice)}`;
}

export function ProductGridCard({ product }: { product: Product }) {
  const image = product.images[0];
  const inStock = product.totalInventory > 0;

  return (
    <Link to={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
        {image ? (
          // Empty alt: the visible title text right below is this link's
          // accessible name already, so the image is decorative here.
          <img
            src={image.url}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full w-full items-center justify-center text-xs text-neutral-400 dark:text-neutral-600">
            No image
          </div>
        )}
        {!inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="mt-3">
        {product.vendor && <div className="text-xs text-neutral-400 dark:text-neutral-500">{product.vendor}</div>}
        <div className="mt-0.5 text-sm font-medium text-neutral-900 group-hover:text-indigo-600 dark:text-neutral-100 dark:group-hover:text-indigo-400">
          {product.title}
        </div>
        <div className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">{priceLabel(product)}</div>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p role="status" className="py-16 text-center text-sm text-neutral-400 dark:text-neutral-500">
        No products found.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductGridCard product={product} />
        </li>
      ))}
    </ul>
  );
}
