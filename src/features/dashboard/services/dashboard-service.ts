import { api, unwrap } from "@/lib/api";

export interface DashboardStats {
  total_reports: string | number;
  pending_reports: string | number;
  verified_reports: string | number;
  in_progress_reports: string | number;
  resolved_reports: string | number;
  rejected_reports: string | number;
  total_users: string | number;
  total_categories: string | number;
  most_reported_category: {
    name: string;
    total: string | number;
  } | null;
  reports_per_month: {
    month: string;
    total: string | number;
  }[];
}

export const DashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get("/dashboard");
    return unwrap(response);
  },
};
