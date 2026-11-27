import apiClient from "./client";
import type { AppNotification } from "../types";

// Retrieve notifications for the logged-in user.
export const getNotifications = async (): Promise<AppNotification[]> => {
  const response = await apiClient.get("/notifications");

  return response.data;
};

// Mark one notification as read.
export const markNotificationAsRead = async (
  notificationId: string,
): Promise<void> => {
  await apiClient.patch(
    `/notifications/${encodeURIComponent(notificationId)}/read`,
  );
};

// Mark all notifications as read.
export const markAllNotificationsAsRead = async (): Promise<void> => {
  await apiClient.patch("/notifications/read-all");
};

// Delete a notification.
export const deleteNotification = async (
  notificationId: string,
): Promise<void> => {
  await apiClient.delete(
    `/notifications/${encodeURIComponent(notificationId)}`,
  );
};
