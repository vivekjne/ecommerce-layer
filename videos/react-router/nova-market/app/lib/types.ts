export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number; // integer cents
  stock: number;
  color: string;
  art: "shoe" | "mug" | "lamp" | "bag" | "phones";
  description: string;
};

export type Review = {
  author: string;
  stars: number;
  text: string;
};

export const CATALOG_URL = "http://localhost:4000";

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
