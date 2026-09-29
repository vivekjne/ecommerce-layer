import { createMockAdapters } from "@commerce/adapter-mock";
import { createNativeBackend } from "@commerce/adapter-native";
import type { CommerceAdapter, MerchantAdapter } from "@commerce/core";

let cached: { commerce: CommerceAdapter; merchant: MerchantAdapter } | undefined;

/** COMMERCE_PLATFORM picks the backend: "native" (default, SQLite) or "mock" (in-memory). */
export function getAdapters(): { commerce: CommerceAdapter; merchant: MerchantAdapter } {
  if (!cached) {
    const platform = process.env.COMMERCE_PLATFORM ?? "native";
    if (platform === "mock") cached = createMockAdapters();
    else if (platform === "native") cached = createNativeBackend();
    else throw new Error(`Unsupported COMMERCE_PLATFORM "${platform}" — expected "native" or "mock".`);
  }
  return cached;
}
