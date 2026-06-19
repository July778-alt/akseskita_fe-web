import { api, unwrap } from "@/lib/api";
import { Notification } from "../types";

export const NotificationService = {
  async getMyNotifications(): Promise<Notification[]> {
    const response = await api.get("/notifications");
    return unwrap(response);
  },

  async markAllAsRead(): Promise<void> {
    await api.patch("/notifications/mark-all-read");
  },

  async markAsRead(id: string): Promise<void> {
    await api.patch(`/notifications/${id}/read`);
  },

  async deleteNotification(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`);
  },

  async clearAll(): Promise<void> {
    await api.delete("/notifications/clear-all");
  },
};
