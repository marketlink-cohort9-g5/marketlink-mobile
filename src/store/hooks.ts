import { useCartContext } from "./CartContext";

/**
 * Returns the cart dispatch function matching the app store interface.
 */
export function useAppDispatch() {
  return useCartContext().dispatch;
}

/**
 * Returns the current cart items array.
 */
export function useCartItems() {
  return useCartContext().items;
}
