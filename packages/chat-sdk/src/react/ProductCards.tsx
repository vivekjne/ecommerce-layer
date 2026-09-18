import type { Product } from "@commerce/core";
import { formatMoney } from "./format.js";

function priceLabel(product: Product): string {
  if (product.minPrice.amount === product.maxPrice.amount) {
    return formatMoney(product.minPrice);
  }
  return `${formatMoney(product.minPrice)} – ${formatMoney(product.maxPrice)}`;
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const inStock = product.totalInventory > 0;

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400 dark:text-neutral-600">No image</div>
        )}
        {!inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="line-clamp-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">{product.title}</div>
        <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{priceLabel(product)}</div>
      </div>
    </div>
  );
}

export function ProductCards({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p role="status" className="text-sm text-neutral-400 dark:text-neutral-500">
        No products found.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
