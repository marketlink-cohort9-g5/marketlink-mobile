import apiClient from "./client";
import type { Order } from "../types";

// Data required to place an order.
export interface CreateOrderData {
  wholesalerId: string;
  items: {
    storeProductId: string;
    quantity: number;
  }[];
  fulfilment: "pickup" | "delivery";
  timeSlot?: string;
  deliveryAddress?: string;
}

// Retrieve all orders belonging to the logged-in user.
export const getOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get("/orders");

  return response.data;
};

// Retrieve one order using its ID.
export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await apiClient.get(
    `/orders/${encodeURIComponent(orderId)}`,
  );

  return response.data;
};

// Place an order while online.
export const placeOrder = async (data: CreateOrderData): Promise<Order> => {
  const response = await apiClient.post("/orders", data);

  return response.data;
};

// Accept or reject an adjusted order.
export const respondToAdjustment = async (
  orderId: string,
  accept: boolean,
): Promise<Order> => {
  const response = await apiClient.post(
    `/orders/${encodeURIComponent(orderId)}/adjustment-response`,
    { accept },
  );

  return response.data;
};

// Cancel an order where cancellation is permitted.
export const cancelOrder = async (orderId: string): Promise<Order> => {
  const response = await apiClient.post(
    `/orders/${encodeURIComponent(orderId)}/cancel`,
  );

  return response.data;
};

// Upload a payment receipt after an order is confirmed.
export const uploadPaymentReceipt = async (
  orderId: string,
  receiptUri: string,
): Promise<Order> => {
  const formData = new FormData();

  formData.append("receipt", {
    uri: receiptUri,
    name: "payment-receipt.jpg",
    type: "image/jpeg",
  } as unknown as Blob);

  const response = await apiClient.post(
    `/orders/${encodeURIComponent(orderId)}/receipt`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

// Confirm payment after verifying the uploaded receipt.
export const confirmPayment = async (orderId: string): Promise<Order> => {
  const response = await apiClient.post(
    `/orders/${encodeURIComponent(orderId)}/confirm-payment`,
  );

  return response.data;
};
