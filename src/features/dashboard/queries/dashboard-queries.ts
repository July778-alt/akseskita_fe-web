"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../services/dashboard-service";
import { queryKeys } from "@/constants/query-keys";

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats,
    queryFn: () => DashboardService.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
