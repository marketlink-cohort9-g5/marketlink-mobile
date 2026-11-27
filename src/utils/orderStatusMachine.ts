import type { OrderStatus, PaymentStatus, Fulfilment } from "../types";

// Define the allowed transitions for each order status.
const transitions: Record<OrderStatus, OrderStatus[]> = {
  Placed: ["Accepted", "Adjusted", "Declined", "Expired"],

  Accepted: ["Confirmed"],

  Adjusted: ["Confirmed", "Cancelled"],

  Confirmed: ["Ready", "Expired"],

  Ready: ["Dispatched", "Collected"],

  Dispatched: ["Completed"],

  Collected: ["Completed"],

  Completed: [],

  Declined: [],

  Cancelled: [],

  Expired: [],
};

// Check whether a status transition is allowed.
export const canTransition = (
  currentStatus: OrderStatus,
  nextStatus: OrderStatus,
): boolean => {
  return transitions[currentStatus].includes(nextStatus);
};

// Check whether an order can become Ready.
export const canMarkAsReady = (
  paymentStatus: PaymentStatus,
  fulfilment: Fulfilment,
): boolean => {
  if (fulfilment === "pickup") {
    return true;
  }

  return paymentStatus === "PaymentConfirmed";
};

// Check whether an unpaid confirmed order has expired.
export const isOrderExpired = (
  status: OrderStatus,
  paymentStatus: PaymentStatus,
  createdAt: string,
  timeLimitHours: number,
): boolean => {
  if (status !== "Confirmed" || paymentStatus !== "Unpaid") {
    return false;
  }

  const created = new Date(createdAt).getTime();
  const now = Date.now();

  const elapsed = now - created;
  const timeLimit = timeLimitHours * 60 * 60 * 1000;

  return elapsed > timeLimit;
};

// Validate whether an order can move to Ready.
export const canProceedToReady = (
  currentStatus: OrderStatus,
  paymentStatus: PaymentStatus,
  fulfilment: Fulfilment,
): boolean => {
  return (
    canTransition(currentStatus, "Ready") &&
    canMarkAsReady(paymentStatus, fulfilment)
  );
};
