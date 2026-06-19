export type NotificationType = "report_status" | "admin_message" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  reference_id?: string;
  created_at: string;
}
