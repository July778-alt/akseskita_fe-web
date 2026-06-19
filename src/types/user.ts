import { UserRole } from "./auth";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  profile_picture: string | null;
  created_at: string;
  updated_at?: string;
}

export interface UpdateProfileDTO {
  full_name?: string;
  avatar?: File;
}
