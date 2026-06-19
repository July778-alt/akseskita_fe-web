import { UserRole } from "@/types/auth";

export const PERMISSIONS = {
  MANAGE_USERS: ["super_admin"] as UserRole[],
  MANAGE_CATEGORIES: ["admin", "super_admin"] as UserRole[],
  MODERATE_REPORTS: ["admin", "super_admin"] as UserRole[],
  CREATE_REPORTS: ["user"] as UserRole[],
  VIEW_STAFF_DASHBOARD: ["admin", "super_admin"] as UserRole[],
};

export function can(userRole: UserRole | undefined, permission: keyof typeof PERMISSIONS): boolean {
  if (!userRole) return false;
  return PERMISSIONS[permission].includes(userRole);
}
