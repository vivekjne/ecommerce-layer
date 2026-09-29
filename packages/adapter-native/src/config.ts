export interface ShippingRate {
  id: string;
  title: string;
  description: string;
  /** Minor units. */
  amount: number;
  /** Subtotal (minor units) at or above which this rate is free. */
  freeOverSubtotal?: number;
}

export interface NativeStoreConfig {
  currencyCode: string;
  /**
   * Public origin of the app that renders this backend's hosted checkout
   * (`/checkout/:id`), e.g. https://shop.example.com. CheckoutSession.url
   * must be absolute per the adapter contract, and the backend has no
   * request of its own to derive it from.
   */
  checkoutBaseUrl: string;
  shippingRates: ShippingRate[];
  /** Flat tax rate applied to the merchandise subtotal, in basis points (825 = 8.25%). */
  taxRateBasisPoints: number;
}

export const DEFAULT_CONFIG: NativeStoreConfig = {
  currencyCode: "USD",
  checkoutBaseUrl: process.env.PUBLIC_STOREFRONT_URL ?? "http://localhost:5173",
  shippingRates: [
    { id: "standard", title: "Standard", description: "3–5 business days", amount: 599, freeOverSubtotal: 7500 },
    { id: "express", title: "Express", description: "1–2 business days", amount: 1499 },
  ],
  taxRateBasisPoints: Number(process.env.TAX_RATE_BASIS_POINTS ?? 0),
};
