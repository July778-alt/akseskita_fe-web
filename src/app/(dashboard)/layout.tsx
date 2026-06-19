import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { AuthGuard } from "@/components/shared/auth-guard";
import "leaflet/dist/leaflet.css";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={["user"]}>
      <DashboardLayout basePath="">{children}</DashboardLayout>
    </AuthGuard>
  );
}
