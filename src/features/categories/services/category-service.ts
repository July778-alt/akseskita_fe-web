import { api, unwrap } from "@/lib/api";
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "@/types/category";

export const CategoryService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get("/categories");
    return unwrap(response);
  },

  async create(data: CreateCategoryDTO): Promise<Category> {
    const response = await api.post("/categories", data);
    return unwrap(response);
  },

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    const response = await api.put(`/categories/${id}`, data);
    return unwrap(response);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
