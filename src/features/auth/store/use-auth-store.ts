import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/features/auth/types";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user, token) => {
        Cookies.set("token", token, { expires: 7 });
        set({ user, token, isAuthenticated: true, isLoading: false });
      },

      clearAuth: () => {
        Cookies.remove("token");
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      },

      setLoading: (isLoading) => set({ isLoading }),

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
    }),
    {
      name: "auth-storage",
      // Only persist user data, token is in cookies for middleware/SSR support
      partialize: (state) => ({ user: state.user }),
    }
  )
);
