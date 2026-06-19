import { api, unwrap } from "@/lib/api";
import { Report, CreateReportDTO, UpdateReportStatusDTO, ReportHistory } from "@/types/report";
import { Category } from "@/types/category";
import { PaginationMeta } from "@/types/api";

export const ReportService = {
  async getAll(params?: any): Promise<{ reports: Report[], pagination: PaginationMeta }> {
    const response = await api.get("/reports", { params });
    return {
      reports: response.data.data,
      pagination: response.data.meta!
    };
  },

  async getById(id: string): Promise<Report> {
    const response = await api.get(`/reports/${id}`);
    return unwrap(response);
  },

  async create(data: CreateReportDTO): Promise<Report> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    const response = await api.post("/reports", formData);
    return unwrap(response);
  },

  async updateStatus(id: string, data: UpdateReportStatusDTO): Promise<Report> {
    const response = await api.patch(`/reports/${id}/status`, data);
    return unwrap(response);
  },

  async getHistories(id: string): Promise<ReportHistory[]> {
    const response = await api.get(`/reports/${id}/histories`);
    return unwrap(response);
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get("/categories");
    return unwrap(response);
  },
  
  async delete(id: string): Promise<void> {
    await api.delete(`/reports/${id}`);
  },
};
