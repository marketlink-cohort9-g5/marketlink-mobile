import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import catalogueReducer from "./slices/catalogueSlice";
import notificationsReducer from "./slices/notificationsSlice";
import ordersReducer from "./slices/ordersSlice";
import savedReducer from "./slices/savedSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    catalogue: catalogueReducer,
    orders: ordersReducer,
    saved: savedReducer,
    notifications: notificationsReducer,
  },
});

// Infer the application's state and dispatch types.
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
