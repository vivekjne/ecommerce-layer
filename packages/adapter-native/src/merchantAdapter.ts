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
import { ALL_STATUSES, all, type Catalog, type ProductRow } from "./catalog.js";
import type { Db } from "./db.js";
import { decodeCursor, isNumberStringPair, toConnection } from "./pagination.js";

const SHORT_DESCRIPTION_LENGTH = 40;

interface LowStockRow {
  product_id: string;
  product_title: string;
  variant_id: string;
  variant_title: string;
  sku: string | null;
  inventory_quantity: number;
}

function issue(product: Product, type: CatalogIssueType, severity: CatalogIssueSeverity, message: string): CatalogIssue {
  return { productId: product.id, productHandle: product.handle, productTitle: product.title, type, severity, message };
}

export class NativeMerchantAdapter implements MerchantAdapter {
  readonly platform = "native" as const;

  constructor(
    private readonly db: Db,
    private readonly catalog: Catalog,
  ) {}

  async getLowStock(params: GetLowStockParams): Promise<Connection<LowStockItem>> {
    const args: (string | number)[] = [params.threshold];
    let keyset = "";
    if (params.after) {
      const [qty, id] = decodeCursor(params.after, isNumberStringPair);
      keyset = "AND (v.inventory_quantity > ? OR (v.inventory_quantity = ? AND v.id > ?))";
      args.push(qty, qty, id);
    }
    const rows = all<LowStockRow>(
      this.db,
      `SELECT p.id AS product_id, p.title AS product_title, v.id AS variant_id, v.title AS variant_title, v.sku, v.inventory_quantity
       FROM variants v JOIN products p ON p.id = v.product_id
       WHERE p.status != 'archived' AND v.inventory_quantity <= ? ${keyset}
       ORDER BY v.inventory_quantity, v.id
       LIMIT ?`,
      [...args, params.first + 1],
    );
    const conn = toConnection(rows, params.first, Boolean(params.after), (r) => [r.inventory_quantity, r.variant_id]);
    return {
      pageInfo: conn.pageInfo,
      edges: conn.edges.map(({ cursor, node: r }) => ({
        cursor,
        node: {
          productId: r.product_id,
          productTitle: r.product_title,
          variantId: r.variant_id,
          variantTitle: r.variant_title,
          sku: r.sku,
          inventoryQuantity: r.inventory_quantity,
          threshold: params.threshold,
        },
      })),
    };
  }

  async auditCatalog(params: AuditCatalogParams = {}): Promise<AuditCatalogResult> {
    const limit = params.first ?? -1;
    const rows = all<ProductRow>(
      this.db,
      `SELECT * FROM products WHERE status IN (${ALL_STATUSES.map(() => "?").join(", ")}) ORDER BY position LIMIT ?`,
      [...ALL_STATUSES, limit],
    );
    const products = this.catalog.hydrate(rows);
    const issues: CatalogIssue[] = [];

    for (const product of products) {
      if (product.images.length === 0) issues.push(issue(product, "missing_image", "warning", "Product has no images."));
      if (product.description.trim().length < SHORT_DESCRIPTION_LENGTH) {
        issues.push(issue(product, "short_description", "warning", `Description is shorter than ${SHORT_DESCRIPTION_LENGTH} characters.`));
      }
      if (product.variants.length === 0) {
        issues.push(issue(product, "no_variants", "error", "Product has no purchasable variants."));
        continue;
      }
      if (product.variants.some((v) => v.price.amount <= 0)) {
        issues.push(issue(product, "missing_price", "error", "One or more variants have no price set."));
      }
      if (product.totalInventory === 0) issues.push(issue(product, "out_of_stock", "warning", "All variants are out of stock."));
    }

    return { issues, scannedCount: products.length };
  }
}
