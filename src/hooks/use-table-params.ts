"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useTableParams(options?: { defaultLimit?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || options?.defaultLimit || 10,
      search: searchParams.get("search") || "",
      category_id: searchParams.get("category_id") || "",
      status: searchParams.get("status") || "",
    };
  }, [searchParams]);

  const updateParams = useCallback(
    (newParams: Partial<typeof params>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      // Reset to page 1 if search/filter changes
      if (newParams.search !== undefined || newParams.category_id !== undefined || newParams.status !== undefined) {
        if (!newParams.page) {
          current.set("page", "1");
        }
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    },
    [router, pathname, searchParams]
  );

  const onSearch = useDebouncedCallback((value: string) => {
    updateParams({ search: value, page: 1 });
  }, 500);

  const filterByCategory = (id: string | null) => updateParams({ category_id: id || "", page: 1 });
  const filterByStatus = (status: string | null) => updateParams({ status: status || "", page: 1 });

  return {
    params,
    updateParams,
    onSearch,
    filterByCategory,
    filterByStatus,
  };
}
