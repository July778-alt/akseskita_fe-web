export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

/**
 * Specifically for list responses that include a 'pagination' object
 * inside the 'data' property.
 */
export interface PaginatedData<T> {
  [key: string]: any; // To support 'reports', 'users', etc.
  pagination: PaginationMeta;
}

export type PaginatedResponse<T, K extends string> = ApiResponse<{
  [P in K]: T[];
} & {
  pagination: PaginationMeta;
}>;

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
