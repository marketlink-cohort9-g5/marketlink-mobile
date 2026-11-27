import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";

import type { ReactNode } from "react";

import { runMigrations } from "./migrations";

// Database name
export const DATABASE_NAME = "marketlink.db";

// Configure the database when the app opens it.
export const initializeDatabase = async (
  db: SQLiteDatabase
): Promise<void> => {
  // Enable Write-Ahead Logging.
  await db.execAsync("PRAGMA journal_mode = WAL;");

  // Enforce foreign key relationships.
  await db.execAsync("PRAGMA foreign_keys = ON;");

  // Run pending database migrations.
  await runMigrations(db);

  console.log("MarketLink database is ready!");
};

// Reusable database provider.
export const DatabaseProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      onInit={initializeDatabase}
    >
      {children}
    </SQLiteProvider>
  );
};

// Helper hook for accessing the database.
export const useDatabase = (): SQLiteDatabase => {
  return useSQLiteContext();
};