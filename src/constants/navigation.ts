import { LayoutDashboard, FileText, FolderTree, Users, UserCircle, PlusCircle } from "lucide-react";
import { UserRole } from "@/types/auth";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles: UserRole[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  // User Items
  {
    title: "My Reports",
    href: "/reports",
    icon: FileText,
    roles: ["user"],
  },
  {
    title: "Create Report",
    href: "/reports/create",
    icon: PlusCircle,
    roles: ["user"],
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: UserCircle,
    roles: ["user"],
  },
  
  // Staff/Admin Items
  {
    title: "Overview",
    href: "/staff-dashboard/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "super_admin"],
  },
  {
    title: "Manage Reports",
    href: "/staff-dashboard/reports",
    icon: FileText,
    roles: ["admin", "super_admin"],
  },
  {
    title: "Categories",
    href: "/staff-dashboard/categories",
    icon: FolderTree,
    roles: ["admin", "super_admin"],
  },
  {
    title: "Manage Users",
    href: "/staff-dashboard/users",
    icon: Users,
    roles: ["admin", "super_admin"],
  },
];
