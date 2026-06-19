import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { env } from "./env";
import { ApiResponse } from "@/types/api";
import { logger } from "./logger";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Auto-switch to multipart/form-data if data is FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors and Unwrapping
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    logger.api(
      response.config.method?.toUpperCase() || "GET",
      response.config.url || "",
      response.status,
      response.data
    );
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    const status = error.response?.status || 500;
    
    logger.api(
      error.config?.method?.toUpperCase() || "GET",
      error.config?.url || "",
      status,
      error.response?.data
    );

    // Handle Unauthorized
    if (status === 401) {
      Cookies.remove("token");
      localStorage.removeItem("user");
      
      // Prevent infinite redirect loop
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login?error=session_expired";
      }
    }

    // Global error message extraction
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    console.error(`[API Error] ${status}: ${message}`);

    return Promise.reject(error);
  }
);

/**
 * Utility for unwrapping API responses
 */
export const unwrap = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  return response.data.data;
};

export default api;
