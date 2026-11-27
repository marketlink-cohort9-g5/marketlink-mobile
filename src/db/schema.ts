export const CREATE_PRODUCTS_TABLE = `
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT,
    category TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`;

export const CREATE_PACK_SIZES_TABLE = `
  CREATE TABLE IF NOT EXISTS pack_sizes (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    unit TEXT NOT NULL,
    quantity_value REAL NOT NULL,
    label TEXT NOT NULL,

    FOREIGN KEY (product_id)
      REFERENCES products(id)
      ON DELETE CASCADE
  );
`;

export const CREATE_WHOLESALERS_TABLE = `
  CREATE TABLE IF NOT EXISTS wholesalers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    verified INTEGER NOT NULL DEFAULT 0,
    rating REAL DEFAULT 0,
    market_location TEXT,
    distance_km REAL,
    delivery_zones_json TEXT,
    updated_at TEXT NOT NULL
  );
`;

export const CREATE_STORE_PRODUCTS_TABLE = `
  CREATE TABLE IF NOT EXISTS store_products (
    id TEXT PRIMARY KEY,
    wholesaler_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    pack_size_id TEXT NOT NULL,
    price REAL NOT NULL,
    price_per_unit REAL NOT NULL,
    moq INTEGER NOT NULL,
    stock_level TEXT NOT NULL,
    price_updated_at TEXT NOT NULL,

    FOREIGN KEY (wholesaler_id)
      REFERENCES wholesalers(id),

    FOREIGN KEY (product_id)
      REFERENCES products(id),

    FOREIGN KEY (pack_size_id)
      REFERENCES pack_sizes(id)
  );
`;

export const CREATE_CART_ITEMS_TABLE = `
  CREATE TABLE IF NOT EXISTS cart_items (
    id TEXT PRIMARY KEY,
    wholesaler_id TEXT NOT NULL,
    store_product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    added_at TEXT NOT NULL,

    FOREIGN KEY (store_product_id)
      REFERENCES store_products(id)
  );
`;

export const CREATE_SAVED_PRODUCTS_TABLE = `
  CREATE TABLE IF NOT EXISTS saved_products (
    product_id TEXT PRIMARY KEY,
    saved_at TEXT NOT NULL,
    last_seen_price REAL,

    FOREIGN KEY (product_id)
      REFERENCES products(id)
  );
`;

export const CREATE_ORDERS_TABLE = `
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    wholesaler_id TEXT NOT NULL,
    status TEXT NOT NULL,
    payment_status TEXT NOT NULL,
    total REAL NOT NULL,
    fulfilment TEXT NOT NULL,
    time_slot TEXT,
    delivery_fee REAL DEFAULT 0,
    eta TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    payload_json TEXT,

    FOREIGN KEY (wholesaler_id)
      REFERENCES wholesalers(id)
  );
`;

export const CREATE_ORDER_ITEMS_TABLE = `
  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    store_product_id TEXT NOT NULL,
    name TEXT NOT NULL,
    pack_label TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    adjusted_quantity INTEGER,
    unit_price REAL NOT NULL,

    FOREIGN KEY (order_id)
      REFERENCES orders(id)
      ON DELETE CASCADE
  );
`;

export const CREATE_NOTIFICATIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    route TEXT,
    read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
`;

export const CREATE_SETTINGS_TABLE = `
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`;

// DATABASE INDEXES

export const CREATE_INDEXES = [
  `CREATE INDEX IF NOT EXISTS idx_products_name
   ON products(name);`,

  `CREATE INDEX IF NOT EXISTS idx_store_products_price
   ON store_products(product_id, price);`,

  `CREATE INDEX IF NOT EXISTS idx_orders_status
   ON orders(status);`,

  `CREATE INDEX IF NOT EXISTS idx_notifications_read
   ON notifications(read, created_at);`,
];
