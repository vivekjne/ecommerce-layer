import { MockCommerceAdapter } from "./commerceAdapter.js";
import { MockMerchantAdapter } from "./merchantAdapter.js";
import { MockStore } from "./store.js";

export { MockCommerceAdapter } from "./commerceAdapter.js";
export { MockMerchantAdapter } from "./merchantAdapter.js";
export { MockStore } from "./store.js";

export function createMockAdapters(): {
  commerce: MockCommerceAdapter;
  merchant: MockMerchantAdapter;
  store: MockStore;
} {
  const store = new MockStore();
  return {
    commerce: new MockCommerceAdapter(store),
    merchant: new MockMerchantAdapter(store),
    store,
  };
}
