import type { SQLiteDatabase } from "expo-sqlite";

import type { Product, PackSize, Wholesaler, StoreProduct } from "../../types";

// Search filters
export interface CatalogueFilters {
  category?: string;
  wholesalerId?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Product comparison result
export interface ComparisonResult {
  productId: string;
  productName: string;
  brand: string | null;
  wholesalerId: string;
  wholesalerName: string;
  verified: number;
  rating: number;
  price: number;
  pricePerUnit: number;
  moq: number;
  stockLevel: string;
  priceUpdatedAt: string;
  packLabel: string;
  unit: string;
  quantityValue: number;
}

// Save products
export const upsertProducts = async (
  db: SQLiteDatabase,
  products: Product[],
): Promise<void> => {
  for (const product of products) {
    await db.runAsync(
      `INSERT INTO products
       (id, name, brand, category, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         name = excluded.name,
         brand = excluded.brand,
         category = excluded.category,
         updated_at = excluded.updated_at;`,
      [
        product.id,
        product.name,
        product.brand,
        product.category,
        product.updatedAt,
      ],
    );
  }
};

// Save pack sizes
export const upsertPackSizes = async (
  db: SQLiteDatabase,
  packSizes: PackSize[],
): Promise<void> => {
  for (const pack of packSizes) {
    await db.runAsync(
      `INSERT INTO pack_sizes
       (id, product_id, unit, quantity_value, label)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         product_id = excluded.product_id,
         unit = excluded.unit,
         quantity_value = excluded.quantity_value,
         label = excluded.label;`,
      [pack.id, pack.productId, pack.unit, pack.quantity, pack.label],
    );
  }
};

// Save wholesalers
export const upsertWholesalers = async (
  db: SQLiteDatabase,
  wholesalers: Wholesaler[],
): Promise<void> => {
  for (const wholesaler of wholesalers) {
    await db.runAsync(
      `INSERT INTO wholesalers
       (id, name, verified, rating, market_location,
        distance_km, delivery_zones_json, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         name = excluded.name,
         verified = excluded.verified,
         rating = excluded.rating,
         market_location = excluded.market_location,
         distance_km = excluded.distance_km,
         delivery_zones_json = excluded.delivery_zones_json,
         updated_at = excluded.updated_at;`,
      [
        wholesaler.id,
        wholesaler.name,
        wholesaler.verified ? 1 : 0,
        wholesaler.rating,
        wholesaler.location,
        wholesaler.distanceKm,
        JSON.stringify(wholesaler.deliveryZones),
        new Date().toISOString(),
      ],
    );
  }
};

// Save wholesaler product prices
export const upsertStoreProducts = async (
  db: SQLiteDatabase,
  storeProducts: StoreProduct[],
): Promise<void> => {
  for (const item of storeProducts) {
    await db.runAsync(
      `INSERT INTO store_products
       (id, wholesaler_id, product_id, pack_size_id,
        price, price_per_unit, moq, stock_level, price_updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         price = excluded.price,
         price_per_unit = excluded.price_per_unit,
         moq = excluded.moq,
         stock_level = excluded.stock_level,
         price_updated_at = excluded.price_updated_at;`,
      [
        item.id,
        item.wholesalerId,
        item.productId,
        item.packSizeId,
        item.price,
        item.pricePerUnit,
        item.moq,
        item.stock,
        item.updatedAt,
      ],
    );
  }
};

// Search cached products
export const searchProducts = async (
  db: SQLiteDatabase,
  query: string,
  filters: CatalogueFilters = {},
): Promise<ComparisonResult[]> => {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (query.trim()) {
    conditions.push("(p.name LIKE ? OR p.brand LIKE ? OR p.category LIKE ?)");

    const searchTerm = `%${query.trim()}%`;

    params.push(searchTerm, searchTerm, searchTerm);
  }

  if (filters.category) {
    conditions.push("p.category = ?");
    params.push(filters.category);
  }

  if (filters.wholesalerId) {
    conditions.push("sp.wholesaler_id = ?");
    params.push(filters.wholesalerId);
  }

  if (filters.minPrice !== undefined) {
    conditions.push("sp.price >= ?");
    params.push(filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    conditions.push("sp.price <= ?");
    params.push(filters.maxPrice);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  return db.getAllAsync<ComparisonResult>(
    `SELECT
       p.id AS productId,
       p.name AS productName,
       p.brand,
       w.id AS wholesalerId,
       w.name AS wholesalerName,
       w.verified,
       w.rating,
       sp.price,
       sp.price_per_unit AS pricePerUnit,
       sp.moq,
       sp.stock_level AS stockLevel,
       sp.price_updated_at AS priceUpdatedAt,
       ps.label AS packLabel,
       ps.unit,
       ps.quantity_value AS quantityValue

     FROM products p

     JOIN store_products sp
       ON p.id = sp.product_id

     JOIN wholesalers w
       ON sp.wholesaler_id = w.id

     JOIN pack_sizes ps
       ON sp.pack_size_id = ps.id

     ${whereClause}

     ORDER BY p.name ASC, sp.price ASC;`,
    ...params,
  );
};

// Compare prices for a particular product
export const getComparison = async (
  db: SQLiteDatabase,
  productId: string,
): Promise<ComparisonResult[]> => {
  return db.getAllAsync<ComparisonResult>(
    `SELECT
       p.id AS productId,
       p.name AS productName,
       p.brand,
       w.id AS wholesalerId,
       w.name AS wholesalerName,
       w.verified,
       w.rating,
       sp.price,
       sp.price_per_unit AS pricePerUnit,
       sp.moq,
       sp.stock_level AS stockLevel,
       sp.price_updated_at AS priceUpdatedAt,
       ps.label AS packLabel,
       ps.unit,
       ps.quantity_value AS quantityValue

     FROM products p

     JOIN store_products sp
       ON p.id = sp.product_id

     JOIN wholesalers w
       ON sp.wholesaler_id = w.id

     JOIN pack_sizes ps
       ON sp.pack_size_id = ps.id

     WHERE p.id = ?

     ORDER BY sp.price ASC;`,
    productId,
  );
};

// Remove wholesaler prices older than 14 days
export const pruneStale = async (db: SQLiteDatabase): Promise<void> => {
  await db.runAsync(
    `DELETE FROM store_products
     WHERE price_updated_at < datetime('now', '-14 days');`,
  );
};
