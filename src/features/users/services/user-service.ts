import { api, unwrap } from "@/lib/api";
import { User } from "@/types/user";
import { PaginationMeta } from "@/types/api";

export const UserService = {
  async getAll(params?: any): Promise<{ users: User[], pagination: PaginationMeta }> {
    const response = await api.get("/users", { params });
    return {
      users: response.data.data,
      pagination: response.data.meta!
    };
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async updateProfile(data: FormData): Promise<User> {
    const response = await api.put("/users/me", data);
    return unwrap(response);
  },

  async updateRole(id: string, role: string): Promise<User> {
    const response = await api.patch(`/users/${id}/role`, { role });
    return unwrap(response);
  },
};
