import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppNotification } from "../../types";

interface NotificationsState {
  items: AppNotification[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  items: [],
  isLoading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,

  reducers: {
    setNotifications: (state, action: PayloadAction<AppNotification[]>) => {
      state.items = action.payload;
      state.error = null;
    },

    addNotification: (state, action: PayloadAction<AppNotification>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (!exists) {
        state.items.unshift(action.payload);
      }
    },

    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(
        (item) => item.id === action.payload,
      );

      if (notification) {
        notification.read = true;
      }
    },

    markAllNotificationsRead: (state) => {
      state.items.forEach((notification) => {
        notification.read = true;
      });
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    setNotificationsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setNotificationsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearNotifications: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  setNotificationsLoading,
  setNotificationsError,
  clearNotifications,
} = notificationsSlice.actions;

export const selectNotifications = (state: {
  notifications: NotificationsState;
}) => state.notifications.items;

export const selectUnreadCount = (state: {
  notifications: NotificationsState;
}) =>
  state.notifications.items.filter((notification) => !notification.read).length;

export const selectNotificationsLoading = (state: {
  notifications: NotificationsState;
}) => state.notifications.isLoading;

export default notificationsSlice.reducer;
