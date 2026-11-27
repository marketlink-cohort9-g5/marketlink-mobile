import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "../../types";

interface OrdersState {
  items: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
      state.error = null;
    },

    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.unshift(action.payload);
    },

    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.items.findIndex(
        (order) => order.id === action.payload.id,
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      } else {
        state.items.unshift(action.payload);
      }
    },

    updateOrderStatus: (
      state,
      action: PayloadAction<{
        orderId: string;
        status: OrderStatus;
      }>,
    ) => {
      const order = state.items.find(
        (item) => item.id === action.payload.orderId,
      );

      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
      }
    },

    removeOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((order) => order.id !== action.payload);
    },

    setOrdersLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setOrdersError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearOrders: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrder,
  updateOrderStatus,
  removeOrder,
  setOrdersLoading,
  setOrdersError,
  clearOrders,
} = ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) =>
  state.orders.items;

export const selectOrdersLoading = (state: { orders: OrdersState }) =>
  state.orders.isLoading;

export const selectOrdersError = (state: { orders: OrdersState }) =>
  state.orders.error;

export default ordersSlice.reducer;
