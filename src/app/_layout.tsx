import { Stack } from "expo-router";

import { CartProvider } from "@/store/CartContext";

/**
 * Root navigator wrapping the app in global providers.
 */
export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
