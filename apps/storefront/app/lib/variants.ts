import type { Product, Variant } from "@commerce/core";

/** The variant matching a chosen value per option (e.g. { Color: "Cobalt Blue", Size: "M" }). */
export function findVariant(product: Product, selected: Record<string, string>): Variant | undefined {
  return product.variants.find(
    (variant) =>
      variant.selectedOptions.length === Object.keys(selected).length &&
      variant.selectedOptions.every((opt) => selected[opt.name] === opt.value),
  );
}

/** Prefers an available variant so the PDP doesn't default to a sold-out combination. */
export function defaultSelection(product: Product): Record<string, string> {
  const first = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  if (!first) return {};
  return Object.fromEntries(first.selectedOptions.map((o) => [o.name, o.value]));
}
