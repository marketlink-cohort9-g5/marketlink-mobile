export interface CartItem {
  id: string;
  wholesalerId: string;
  storeProductId: string;
  productName: string;
  packLabel: string;
  quantity: number;
  unitPrice: number;
}

export type CartAction =
  | { type: "cart/addToCart"; payload: CartItem }
  | { type: "cart/removeFromCart"; payload: string }
  | { type: "cart/clearCart" };

/**
 * Action creator for adding a product item to the retailer cart.
 */
export function addToCart(item: CartItem): CartAction {
  return { type: "cart/addToCart", payload: item };
}

/**
 * Action creator for removing a product item by id from the retailer cart.
 */
export function removeFromCart(id: string): CartAction {
  return { type: "cart/removeFromCart", payload: id };
}

/**
 * Action creator for clearing all items in the retailer cart.
 */
export function clearCart(): CartAction {
  return { type: "cart/clearCart" };
}
