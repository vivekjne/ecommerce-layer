import { existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

export type Db = DatabaseSync;

const MIGRATIONS: string[] = [
  `
  CREATE TABLE products (
    id               TEXT PRIMARY KEY,
    handle           TEXT NOT NULL UNIQUE,
    title            TEXT NOT NULL,
    description      TEXT NOT NULL DEFAULT '',
    description_html TEXT,
    vendor           TEXT,
    product_type     TEXT,
    status           TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    tags             TEXT NOT NULL DEFAULT '[]',
    options          TEXT NOT NULL DEFAULT '[]',
    position         INTEGER NOT NULL UNIQUE,
    created_at       TEXT NOT NULL,
    updated_at       TEXT NOT NULL
  );

  CREATE TABLE product_images (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url        TEXT NOT NULL,
    alt_text   TEXT,
    position   INTEGER NOT NULL
  );
  CREATE INDEX product_images_product ON product_images(product_id, position);

  CREATE TABLE variants (
    id                 TEXT PRIMARY KEY,
    product_id         TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    title              TEXT NOT NULL,
    sku                TEXT,
    price              INTEGER NOT NULL CHECK (price >= 0),
    compare_at_price   INTEGER CHECK (compare_at_price IS NULL OR compare_at_price >= 0),
    inventory_quantity INTEGER NOT NULL DEFAULT 0 CHECK (inventory_quantity >= 0),
    selected_options   TEXT NOT NULL DEFAULT '[]',
    position           INTEGER NOT NULL
  );
  CREATE INDEX variants_product ON variants(product_id, position);

  CREATE TABLE carts (
    id         TEXT PRIMARY KEY,
    status     TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'completed')),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE cart_lines (
    id         TEXT PRIMARY KEY,
    cart_id    TEXT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    variant_id TEXT NOT NULL REFERENCES variants(id),
    quantity   INTEGER NOT NULL CHECK (quantity > 0),
    UNIQUE (cart_id, variant_id)
  );

  CREATE TABLE checkouts (
    id               TEXT PRIMARY KEY,
    cart_id          TEXT NOT NULL REFERENCES carts(id),
    status           TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'processing', 'completed')),
    order_id         TEXT,
    created_at       TEXT NOT NULL,
    updated_at       TEXT NOT NULL
  );

  CREATE TABLE orders (
    id                TEXT PRIMARY KEY,
    number            INTEGER NOT NULL UNIQUE,
    checkout_id       TEXT NOT NULL UNIQUE REFERENCES checkouts(id),
    status            TEXT NOT NULL CHECK (status IN ('paid', 'fulfilled', 'cancelled')),
    email             TEXT NOT NULL,
    shipping_address  TEXT NOT NULL,
    shipping_method   TEXT NOT NULL,
    currency_code     TEXT NOT NULL,
    subtotal          INTEGER NOT NULL,
    shipping          INTEGER NOT NULL,
    tax               INTEGER NOT NULL,
    total             INTEGER NOT NULL,
    payment_reference TEXT NOT NULL,
    payment_brand     TEXT NOT NULL,
    payment_last4     TEXT NOT NULL,
    created_at        TEXT NOT NULL,
    fulfilled_at      TEXT,
    cancelled_at      TEXT
  );
  CREATE INDEX orders_status ON orders(status, number);

  CREATE TABLE order_lines (
    id            TEXT PRIMARY KEY,
    order_id      TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variant_id    TEXT NOT NULL,
    product_id    TEXT NOT NULL,
    title         TEXT NOT NULL,
    variant_title TEXT NOT NULL,
    sku           TEXT,
    quantity      INTEGER NOT NULL CHECK (quantity > 0),
    unit_price    INTEGER NOT NULL,
    line_total    INTEGER NOT NULL,
    image_url     TEXT,
    position      INTEGER NOT NULL
  );
  CREATE INDEX order_lines_order ON order_lines(order_id, position);
  `,
];

function migrate(db: Db): void {
  const { user_version: current } = db.prepare("PRAGMA user_version").get() as { user_version: number };
  for (let version = current; version < MIGRATIONS.length; version++) {
    transaction(db, () => {
      db.exec(MIGRATIONS[version]!);
      db.exec(`PRAGMA user_version = ${version + 1}`);
    });
  }
}

/** Walks up from cwd to the pnpm workspace root, so every app shares one dev database. */
function workspaceRoot(): string {
  let dir = process.cwd();
  while (true) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return process.cwd();
    dir = parent;
  }
}

export function defaultDatabasePath(): string {
  return process.env.DATABASE_PATH ?? join(workspaceRoot(), "data", "commerce.db");
}

export function openDatabase(path: string = defaultDatabasePath()): Db {
  if (path !== ":memory:") mkdirSync(dirname(resolve(path)), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec("PRAGMA foreign_keys = ON");
  if (path !== ":memory:") {
    db.exec("PRAGMA journal_mode = WAL");
    db.exec("PRAGMA busy_timeout = 5000");
  }
  migrate(db);
  return db;
}

/**
 * Runs `fn` inside a single write transaction. node:sqlite is synchronous,
 * so `fn` must be too — never await inside it, or another request on the
 * same connection could interleave statements into this transaction.
 */
export function transaction<T>(db: Db, fn: () => T): T {
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}

export function now(): string {
  return new Date().toISOString();
}
