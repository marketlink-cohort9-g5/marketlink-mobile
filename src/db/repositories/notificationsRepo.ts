import type { SQLiteDatabase } from "expo-sqlite";
import type { AppNotification } from "../../types";

export const saveNotification = async (
  db: SQLiteDatabase,
  notification: AppNotification,
): Promise<void> => {
  await db.runAsync(
    `INSERT INTO notifications (
      id, type, title, body, route, read, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      type = excluded.type,
      title = excluded.title,
      body = excluded.body,
      route = excluded.route,
      read = excluded.read,
      created_at = excluded.created_at;`,
    notification.id,
    notification.type,
    notification.title,
    notification.body,
    notification.route ?? null,
    notification.read ? 1 : 0,
    notification.createdAt,
  );
};

export const getNotifications = async (
  db: SQLiteDatabase,
): Promise<AppNotification[]> => {
  const rows = await db.getAllAsync<{
    id: string;
    type: string;
    title: string;
    body: string;
    route: string | null;
    read: number;
    created_at: string;
  }>(
    `SELECT *
     FROM notifications
     ORDER BY created_at DESC;`,
  );

  return rows.map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title,
    body: row.body,
    route: row.route ?? undefined,
    read: row.read === 1,
    createdAt: row.created_at,
  }));
};

export const markAsRead = async (
  db: SQLiteDatabase,
  notificationId: string,
): Promise<void> => {
  await db.runAsync(
    `UPDATE notifications
     SET read = 1
     WHERE id = ?;`,
    notificationId,
  );
};

export const markAllAsRead = async (db: SQLiteDatabase): Promise<void> => {
  await db.runAsync(`UPDATE notifications SET read = 1;`);
};

export const deleteNotification = async (
  db: SQLiteDatabase,
  notificationId: string,
): Promise<void> => {
  await db.runAsync(`DELETE FROM notifications WHERE id = ?;`, notificationId);
};

export const clearNotifications = async (db: SQLiteDatabase): Promise<void> => {
  await db.runAsync(`DELETE FROM notifications;`);
};

export const getUnreadCount = async (db: SQLiteDatabase): Promise<number> => {
  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) AS count
     FROM notifications
     WHERE read = 0;`,
  );

  return result?.count ?? 0;
};
