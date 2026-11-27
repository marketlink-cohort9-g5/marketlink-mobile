import type { SQLiteDatabase } from "expo-sqlite";

import {
  CREATE_PRODUCTS_TABLE,
  CREATE_PACK_SIZES_TABLE,
  CREATE_WHOLESALERS_TABLE,
  CREATE_STORE_PRODUCTS_TABLE,
  CREATE_CART_ITEMS_TABLE,
  CREATE_SAVED_PRODUCTS_TABLE,
  CREATE_ORDERS_TABLE,
  CREATE_ORDER_ITEMS_TABLE,
  CREATE_NOTIFICATIONS_TABLE,
  CREATE_SETTINGS_TABLE,
  CREATE_INDEXES,
} from "./schema";

// Current database version
const DATABASE_VERSION = 1;

// Run database migrations
export const runMigrations = async (db: SQLiteDatabase): Promise<void> => {
  // Check the current database version
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version;",
  );

  const currentVersion = result?.user_version ?? 0;

  // No migration needed
  if (currentVersion >= DATABASE_VERSION) {
    console.log("Database is already up to date.");
    return;
  }

  // Run migration inside a transaction
  await db.withTransactionAsync(async () => {
    // Version 1: Create all application tables
    if (currentVersion < 1) {
      await db.execAsync(CREATE_PRODUCTS_TABLE);
      await db.execAsync(CREATE_PACK_SIZES_TABLE);
      await db.execAsync(CREATE_WHOLESALERS_TABLE);
      await db.execAsync(CREATE_STORE_PRODUCTS_TABLE);
      await db.execAsync(CREATE_CART_ITEMS_TABLE);
      await db.execAsync(CREATE_SAVED_PRODUCTS_TABLE);
      await db.execAsync(CREATE_ORDERS_TABLE);
      await db.execAsync(CREATE_ORDER_ITEMS_TABLE);
      await db.execAsync(CREATE_NOTIFICATIONS_TABLE);
      await db.execAsync(CREATE_SETTINGS_TABLE);

      // Create database indexes
      for (const index of CREATE_INDEXES) {
        await db.execAsync(index);
      }

      // Mark migration as completed
      await db.execAsync("PRAGMA user_version = 1;");

      console.log("Database migration v1 completed.");
    }
  });
};
