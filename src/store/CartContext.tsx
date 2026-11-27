import React, { createContext, useCallback, useContext, useMemo, useReducer } from "react";

import type { CartAction, CartItem } from "./slices/cartSlice";

interface CartState {
  items: CartItem[];
}

interface CartContextValue {
  items: CartItem[];
  dispatch: (action: CartAction) => void;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "cart/addToCart": {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "cart/removeFromCart":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "cart/clearCart":
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Provides in-memory retailer cart state and dispatch to the app tree.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, rawDispatch] = useReducer(cartReducer, { items: [] });

  const dispatch = useCallback((action: CartAction) => {
    rawDispatch(action);
  }, []);

  const value = useMemo(
    () => ({ items: state.items, dispatch }),
    [state.items, dispatch],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Returns the current cart state and dispatch helper.
 */
export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return ctx;
}
