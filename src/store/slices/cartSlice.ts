import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.storeProductId === newItem.storeProductId,
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload.id,
      );

      if (item && Number.isInteger(action.payload.quantity)) {
        if (action.payload.quantity > 0) {
          item.quantity = action.payload.quantity;
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
