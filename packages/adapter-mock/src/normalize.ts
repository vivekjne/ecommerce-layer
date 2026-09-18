import type { Product, ProductOption, ProductStatus, SelectedOption, Variant } from "@commerce/core";

export const MOCK_CURRENCY = "USD";

export interface RawVariant {
  id: string;
  title: string;
  sku?: string | null;
  price: number;
  compareAtPrice?: number | null;
  inventoryQuantity: number;
  selectedOptions: SelectedOption[];
}

export interface RawProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string | null;
  vendor?: string | null;
  productType?: string | null;
  status?: ProductStatus;
  tags?: string[];
  images?: { url: string; altText?: string | null }[];
  options?: ProductOption[];
  variants: RawVariant[];
}

export function productId(rawId: string): string {
  return `mock:product:${rawId}`;
}

export function variantId(rawId: string): string {
  return `mock:variant:${rawId}`;
}

export function normalizeProduct(raw: RawProduct): Product {
  const variants: Variant[] = raw.variants.map((v) => ({
    id: variantId(v.id),
    productId: productId(raw.id),
    title: v.title,
    sku: v.sku ?? null,
    price: { amount: v.price, currencyCode: MOCK_CURRENCY },
    compareAtPrice: v.compareAtPrice != null ? { amount: v.compareAtPrice, currencyCode: MOCK_CURRENCY } : null,
    availableForSale: v.inventoryQuantity > 0,
    inventoryQuantity: v.inventoryQuantity,
    selectedOptions: v.selectedOptions,
    image: null,
  }));

  const prices = variants.map((v) => v.price.amount);
  const minAmount = prices.length > 0 ? Math.min(...prices) : 0;
  const maxAmount = prices.length > 0 ? Math.max(...prices) : 0;
  const totalInventory = variants.reduce((sum, v) => sum + v.inventoryQuantity, 0);

  return {
    id: productId(raw.id),
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml ?? null,
    images: (raw.images ?? []).map((img) => ({
      url: img.url,
      altText: img.altText ?? null,
      width: null,
      height: null,
    })),
    options: raw.options ?? [],
    variants,
    tags: raw.tags ?? [],
    vendor: raw.vendor ?? null,
    productType: raw.productType ?? null,
    status: raw.status ?? "active",
    minPrice: { amount: minAmount, currencyCode: MOCK_CURRENCY },
    maxPrice: { amount: maxAmount, currencyCode: MOCK_CURRENCY },
    totalInventory,
  };
}
