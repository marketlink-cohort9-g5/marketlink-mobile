import type { Order } from "../types";

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    wholesalerId: "wh-001",
    items: [
      {
        id: "item-001",
        storeProductId: "sp-001",
        name: "Rice",
        packLabel: "50kg Bag",
        quantity: 2,
        unitPrice: 85000,
      },
      {
        id: "item-002",
        storeProductId: "sp-004",
        name: "Beans",
        packLabel: "50kg Bag",
        quantity: 1,
        unitPrice: 72000,
      },
    ],
    status: "Confirmed",
    paymentStatus: "Unpaid",
    total: 242000,
    fulfilment: "pickup",
    deliveryFee: 0,
    timeSlot: "10:00 AM - 12:00 PM",
    history: [
      {
        status: "Placed",
        note: "Order submitted successfully.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        status: "Accepted",
        note: "Wholesaler accepted the order.",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        status: "Confirmed",
        note: "Order confirmed. Awaiting fulfilment.",
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ORD-002",
    wholesalerId: "wh-002",
    items: [
      {
        id: "item-003",
        storeProductId: "sp-005",
        name: "Vegetable Oil",
        packLabel: "25 Litres",
        quantity: 3,
        unitPrice: 65000,
      },
    ],
    status: "Placed",
    paymentStatus: "Unpaid",
    total: 195000,
    fulfilment: "delivery",
    deliveryFee: 5000,
    eta: "Tomorrow, 2:00 PM",
    history: [
      {
        status: "Placed",
        note: "Order submitted. Awaiting wholesaler response.",
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
