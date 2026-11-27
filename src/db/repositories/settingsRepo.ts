import type { SQLiteDatabase } from "expo-sqlite";

export const setSetting = async (
  db: SQLiteDatabase,
  key: string,
  value: string,
): Promise<void> => {
  await db.runAsync(
    `INSERT INTO settings (key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET
       value = excluded.value;`,
    key,
    value,
  );
};

export const getSetting = async (
  db: SQLiteDatabase,
  key: string,
): Promise<string | null> => {
  const result = await db.getFirstAsync<{ value: string }>(
    `SELECT value
     FROM settings
     WHERE key = ?;`,
    key,
  );

  return result?.value ?? null;
};

export const getAllSettings = async (
  db: SQLiteDatabase,
): Promise<Record<string, string>> => {
  const rows = await db.getAllAsync<{
    key: string;
    value: string;
  }>(`SELECT key, value FROM settings;`);

  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
};

export const deleteSetting = async (
  db: SQLiteDatabase,
  key: string,
): Promise<void> => {
  await db.runAsync(`DELETE FROM settings WHERE key = ?;`, key);
};

export const clearSettings = async (db: SQLiteDatabase): Promise<void> => {
  await db.runAsync(`DELETE FROM settings;`);
};
