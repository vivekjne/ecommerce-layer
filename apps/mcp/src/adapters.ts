import { createMockAdapters } from "@commerce/adapter-mock";
import type { CommerceAdapter, MerchantAdapter } from "@commerce/core";

let cached: { commerce: CommerceAdapter; merchant: MerchantAdapter } | undefined;

/**
 * Only the mock adapter exists so far, so this always resolves to it.
 * Once packages/adapter-shopify/adapter-bigcommerce exist, this is where
 * a PLATFORM env var picks between them.
 */
export function getAdapters(): { commerce: CommerceAdapter; merchant: MerchantAdapter } {
  cached ??= createMockAdapters();
  return cached;
}
