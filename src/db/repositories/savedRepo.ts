import type { SQLiteDatabase } from "expo-sqlite";

export interface SavedProduct {
  id: string;
  name: string;
  brand: string | null;
  category: string;
  savedAt: string;
  lastSeenPrice: number | null;
}

export const save = async (
  db: SQLiteDatabase,
  productId: string,
): Promise<void> => {
  await db.runAsync(
    `INSERT INTO saved_products (product_id, saved_at)
     VALUES (?, ?)
     ON CONFLICT(product_id) DO NOTHING;`,
    productId,
    new Date().toISOString(),
  );
};

export const unsave = async (
  db: SQLiteDatabase,
  productId: string,
): Promise<void> => {
  await db.runAsync(
    `DELETE FROM saved_products WHERE product_id = ?;`,
    productId,
  );
};

export const listSaved = async (
  db: SQLiteDatabase,
): Promise<SavedProduct[]> => {
  return db.getAllAsync<SavedProduct>(
    `SELECT
       p.id,
       p.name,
       p.brand,
       p.category,
       sp.saved_at AS savedAt,
       sp.last_seen_price AS lastSeenPrice
     FROM saved_products sp
     JOIN products p ON p.id = sp.product_id
     ORDER BY sp.saved_at DESC;`,
  );
};

export const setLastSeenPrice = async (
  db: SQLiteDatabase,
  productId: string,
  price: number,
): Promise<void> => {
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Price must be a valid non-negative number.");
  }

  await db.runAsync(
    `UPDATE saved_products
     SET last_seen_price = ?
     WHERE product_id = ?;`,
    price,
    productId,
  );
};
