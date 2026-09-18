import type { Product } from "@commerce/core";
import { formatMoney } from "../lib/format.js";

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
    <div className="product-card">
      {image ? (
        <img src={image.url} alt={image.altText ?? product.title} className="product-card-image" />
      ) : (
        <div className="product-card-image product-card-image-placeholder">No image</div>
      )}
      <div className="product-card-body">
        <div className="product-card-title">{product.title}</div>
        <div className="product-card-price">{priceLabel(product)}</div>
        {!inStock && <div className="product-card-oos">Out of stock</div>}
      </div>
    </div>
  );
}

export function ProductCards({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="empty-state">No products found.</div>;
  }

  return (
    <div className="product-cards">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
