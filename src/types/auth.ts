import { User } from "@/types/user";

export type UserRole = "user" | "admin" | "super_admin";

export interface AuthResponseData {
  user: User;
  token: string;
}

export interface JWTPayload {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}
