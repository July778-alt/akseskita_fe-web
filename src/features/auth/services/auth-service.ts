import { api, unwrap } from "@/lib/api";
import { AuthResponseData } from "@/types/auth";
import { LoginDTO, RegisterDTO } from "@/features/auth/types";

export const AuthService = {
  async login(data: LoginDTO): Promise<AuthResponseData> {
    const response = await api.post("/auth/login", data);
    return unwrap(response);
  },

  async register(data: RegisterDTO): Promise<AuthResponseData> {
    const response = await api.post("/auth/register", data);
    return unwrap(response);
  },

  async getMe(): Promise<AuthResponseData["user"]> {
    const response = await api.get("/users/me");
    return unwrap(response);
  },
};
