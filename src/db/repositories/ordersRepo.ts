import type { SQLiteDatabase } from "expo-sqlite";
import type { Order, OrderItem } from "../../types";

export const saveOrder = async (
  db: SQLiteDatabase,
  order: Order,
): Promise<void> => {
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO orders (
        id, wholesaler_id, status, payment_status, total,
        fulfilment, time_slot, delivery_fee, eta,
        created_at, updated_at, payload_json
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        status = excluded.status,
        payment_status = excluded.payment_status,
        total = excluded.total,
        updated_at = excluded.updated_at,
        payload_json = excluded.payload_json;`,
      order.id,
      order.wholesalerId,
      order.status,
      order.paymentStatus,
      order.total,
      order.fulfilment,
      order.timeSlot ?? null,
      order.deliveryFee,
      order.eta ?? null,
      order.createdAt,
      order.updatedAt,
      JSON.stringify(order),
    );

    await db.runAsync(`DELETE FROM order_items WHERE order_id = ?;`, order.id);

    for (const item of order.items) {
      await db.runAsync(
        `INSERT INTO order_items (
          id, order_id, store_product_id, name,
          pack_label, quantity, adjusted_quantity, unit_price
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        item.id,
        order.id,
        item.storeProductId,
        item.name,
        item.packLabel,
        item.quantity,
        item.adjustedQuantity ?? null,
        item.unitPrice,
      );
    }
  });
};

export const getOrders = async (db: SQLiteDatabase): Promise<Order[]> => {
  const rows = await db.getAllAsync<{
    payload_json: string | null;
  }>(
    `SELECT payload_json
     FROM orders
     ORDER BY created_at DESC;`,
  );

  return rows
    .filter((row) => row.payload_json !== null)
    .map((row) => JSON.parse(row.payload_json!) as Order);
};

export const getOrderById = async (
  db: SQLiteDatabase,
  orderId: string,
): Promise<Order | null> => {
  const row = await db.getFirstAsync<{
    payload_json: string | null;
  }>(
    `SELECT payload_json
     FROM orders
     WHERE id = ?;`,
    orderId,
  );

  if (!row?.payload_json) {
    return null;
  }

  return JSON.parse(row.payload_json) as Order;
};

export const updateOrderStatus = async (
  db: SQLiteDatabase,
  orderId: string,
  status: Order["status"],
  updatedAt: string,
): Promise<void> => {
  await db.runAsync(
    `UPDATE orders
     SET status = ?, updated_at = ?
     WHERE id = ?;`,
    status,
    updatedAt,
    orderId,
  );
};

export const updatePaymentStatus = async (
  db: SQLiteDatabase,
  orderId: string,
  paymentStatus: Order["paymentStatus"],
  updatedAt: string,
): Promise<void> => {
  await db.runAsync(
    `UPDATE orders
     SET payment_status = ?, updated_at = ?
     WHERE id = ?;`,
    paymentStatus,
    updatedAt,
    orderId,
  );
};

export const clearOrders = async (db: SQLiteDatabase): Promise<void> => {
  await db.withTransactionAsync(async () => {
    await db.runAsync(`DELETE FROM order_items;`);
    await db.runAsync(`DELETE FROM orders;`);
  });
};
