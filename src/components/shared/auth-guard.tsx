"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { UserRole } from "@/types/auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (allowedRoles && !allowedRoles.includes(user?.role as UserRole)) {
        // Redirect to 404 page if the user's role is not allowed
        router.replace("/not-found");
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size={40} />
          <p className="text-sm text-muted-foreground animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (allowedRoles && !allowedRoles.includes(user?.role as UserRole)) return null;

  return <>{children}</>;
}
