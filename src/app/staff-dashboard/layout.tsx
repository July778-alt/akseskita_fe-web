import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { AuthGuard } from "@/components/shared/auth-guard";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={["admin", "super_admin"]}>
      <DashboardLayout basePath="">{children}</DashboardLayout>
    </AuthGuard>
  );
}
