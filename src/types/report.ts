import { User } from "./user";
import { Category } from "./category";

export type ReportStatus =
  | "pending"
  | "verified"
  | "in_progress"
  | "resolved"
  | "rejected";

export interface Report {
  id: string;
  title: string;
  description: string;
  category_id: string;
  user_id: string;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  image_url: string | null;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
  
  // Relations
  category?: Category;
  user?: Partial<User>;
  category_name?: string;
  full_name?: string;
}

export interface ReportHistory {
  id: string;
  report_id: string;
  old_status: ReportStatus;
  new_status: ReportStatus;
  comment: string | null;
  full_name?: string;
  created_at: string;
}

export interface CreateReportDTO {
  title: string;
  description: string;
  category_id: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  image?: File;
}

export type UpdateReportDTO = Partial<CreateReportDTO>;

export interface UpdateReportStatusDTO {
  status: ReportStatus;
  comment?: string;
}

export interface CreateReportHistoryDTO {
  report_id: string;
  old_status?: ReportStatus | null;
  new_status: ReportStatus;
  changed_by: string;
}
