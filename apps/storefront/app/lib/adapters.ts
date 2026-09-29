import { createMockAdapters } from "@commerce/adapter-mock";
import { createNativeBackend, type NativeBackend } from "@commerce/adapter-native";
import type { CommerceAdapter, MerchantAdapter } from "@commerce/core";

type PlatformChoice = "native" | "mock";

interface Adapters {
  commerce: CommerceAdapter;
  merchant: MerchantAdapter;
  /** The native backend's own checkout/order/admin services — null on any other platform. */
  native: NativeBackend | null;
}

let cached: Adapters | undefined;

function platformFromEnv(): PlatformChoice {
  const value = process.env.COMMERCE_PLATFORM ?? "native";
  if (value === "native" || value === "mock") return value;
  throw new Error(`Unsupported COMMERCE_PLATFORM "${value}" — expected "native" or "mock".`);
}

/** Resolves the active platform once per process from COMMERCE_PLATFORM (default "native"). */
export function getAdapters(): Adapters {
  if (!cached) {
    if (platformFromEnv() === "mock") {
      cached = { ...createMockAdapters(), native: null };
    } else {
      const native = createNativeBackend();
      cached = { commerce: native.commerce, merchant: native.merchant, native };
    }
  }
  return cached;
}

/**
 * For the routes that *are* the native platform's own surfaces — hosted
 * checkout, order status, admin. On any other platform those pages belong
 * to that platform (e.g. Shopify's checkout and admin), so they 404 here.
 */
export function requireNativeBackend(): NativeBackend {
  const { native } = getAdapters();
  if (!native) throw new Response("Not found", { status: 404 });
  return native;
}
