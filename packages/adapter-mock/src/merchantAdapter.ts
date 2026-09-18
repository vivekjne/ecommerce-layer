import type {
  AuditCatalogParams,
  AuditCatalogResult,
  CatalogIssue,
  CatalogIssueSeverity,
  CatalogIssueType,
  Connection,
  GetLowStockParams,
  LowStockItem,
  MerchantAdapter,
  Product,
} from "@commerce/core";
import { paginate } from "./pagination.js";
import type { MockStore } from "./store.js";

const SHORT_DESCRIPTION_LENGTH = 40;

function issue(product: Product, type: CatalogIssueType, severity: CatalogIssueSeverity, message: string): CatalogIssue {
  return {
    productId: product.id,
    productHandle: product.handle,
    productTitle: product.title,
    type,
    severity,
    message,
  };
}

export class MockMerchantAdapter implements MerchantAdapter {
  readonly platform = "mock" as const;

  constructor(private readonly store: MockStore) {}

  async getLowStock(params: GetLowStockParams): Promise<Connection<LowStockItem>> {
    const items: LowStockItem[] = [];
    for (const product of this.store.products.values()) {
      for (const variant of product.variants) {
        if (variant.inventoryQuantity <= params.threshold) {
          items.push({
            productId: product.id,
            productTitle: product.title,
            variantId: variant.id,
            variantTitle: variant.title,
            sku: variant.sku,
            inventoryQuantity: variant.inventoryQuantity,
            threshold: params.threshold,
          });
        }
      }
    }
    items.sort((a, b) => a.inventoryQuantity - b.inventoryQuantity || a.variantId.localeCompare(b.variantId));
    return paginate(items, params.first, params.after);
  }

  async auditCatalog(params: AuditCatalogParams = {}): Promise<AuditCatalogResult> {
    const all = [...this.store.products.values()];
    const scanned = params.first != null ? all.slice(0, params.first) : all;
    const issues: CatalogIssue[] = [];

    for (const product of scanned) {
      if (product.images.length === 0) {
        issues.push(issue(product, "missing_image", "warning", "Product has no images."));
      }
      if (product.description.trim().length < SHORT_DESCRIPTION_LENGTH) {
        issues.push(
          issue(product, "short_description", "warning", `Description is shorter than ${SHORT_DESCRIPTION_LENGTH} characters.`),
        );
      }
      if (product.variants.length === 0) {
        issues.push(issue(product, "no_variants", "error", "Product has no purchasable variants."));
        continue;
      }
      if (product.variants.some((v) => v.price.amount <= 0)) {
        issues.push(issue(product, "missing_price", "error", "One or more variants have no price set."));
      }
      if (product.totalInventory === 0) {
        issues.push(issue(product, "out_of_stock", "warning", "All variants are out of stock."));
      }
    }

    return { issues, scannedCount: scanned.length };
  }
}
