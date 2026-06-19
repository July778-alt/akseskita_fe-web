"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "@/types/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth, clearAuth, setLoading } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        const storedUser = localStorage.getItem("auth-storage");

        if (token) {
          const decoded = jwtDecode<JWTPayload>(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            clearAuth();
          } else if (storedUser) {
            // Restore token to store (it's not persisted in zustand localstorage)
            const parsed = JSON.parse(storedUser);
            if (parsed.state.user) {
              useAuthStore.setState({ token, isAuthenticated: true });
            }
          }
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Auth init error:", error);
        clearAuth();
      } finally {
        setLoading(false);
        setIsHydrated(true);
      }
    };

    initAuth();
  }, [setAuth, clearAuth, setLoading]);

  // Prevent hydration mismatch: don't render until client-side hydration is complete
  if (!isHydrated) {
    return null; // Or a global loading spinner
  }

  return <>{children}</>;
}
