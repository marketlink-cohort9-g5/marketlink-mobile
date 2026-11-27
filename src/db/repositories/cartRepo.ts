import type { SQLiteDatabase } from "expo-sqlite";
import type { CartItem } from "../../types";

// Retrieve all saved cart items
export const getCart = async (db: SQLiteDatabase): Promise<CartItem[]> => {
  return db.getAllAsync<CartItem>(
    `SELECT
       ci.id,
       ci.wholesaler_id AS wholesalerId,
       ci.store_product_id AS storeProductId,
       p.name AS productName,
       ps.label AS packLabel,
       ci.quantity,
       sp.price AS unitPrice

     FROM cart_items ci

     JOIN store_products sp
       ON ci.store_product_id = sp.id

     JOIN products p
       ON sp.product_id = p.id

     JOIN pack_sizes ps
       ON sp.pack_size_id = ps.id

     ORDER BY ci.added_at DESC;`,
  );
};

// Add a product to the cart
export const addItem = async (
  db: SQLiteDatabase,
  item: CartItem,
): Promise<void> => {
  // Check whether this product already exists in the cart.
  const existingItem = await db.getFirstAsync<{
    id: string;
    quantity: number;
  }>(
    `SELECT id, quantity
     FROM cart_items
     WHERE store_product_id = ?;`,
    item.storeProductId,
  );

  if (existingItem) {
    // Increase the existing item's quantity.
    await db.runAsync(
      `UPDATE cart_items
       SET quantity = ?
       WHERE id = ?;`,
      existingItem.quantity + item.quantity,
      existingItem.id,
    );
  } else {
    // Insert a new cart item.
    await db.runAsync(
      `INSERT INTO cart_items
       (id, wholesaler_id, store_product_id, quantity, added_at)
       VALUES (?, ?, ?, ?, ?);`,
      item.id,
      item.wholesalerId,
      item.storeProductId,
      item.quantity,
      new Date().toISOString(),
    );
  }
};

// Update the quantity of an existing cart item
export const updateQuantity = async (
  db: SQLiteDatabase,
  id: string,
  quantity: number,
): Promise<void> => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantity must be a positive whole number.");
  }

  await db.runAsync(
    `UPDATE cart_items
     SET quantity = ?
     WHERE id = ?;`,
    quantity,
    id,
  );
};

// Remove an individual cart item
export const removeItem = async (
  db: SQLiteDatabase,
  id: string,
): Promise<void> => {
  await db.runAsync(
    `DELETE FROM cart_items
     WHERE id = ?;`,
    id,
  );
};

// Clear the entire cart
export const clearCart = async (db: SQLiteDatabase): Promise<void> => {
  await db.runAsync("DELETE FROM cart_items;");
};
