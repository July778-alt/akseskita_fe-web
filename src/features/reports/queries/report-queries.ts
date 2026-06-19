"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReportService } from "../services/report-service";
import { toast } from "sonner";
import { ReportStatus } from "@/types/report";
import { queryKeys } from "@/constants/query-keys";

export function useReportsQuery(params?: any) {
  return useQuery({
    queryKey: queryKeys.reports.list(params),
    queryFn: () => ReportService.getAll(params),
  });
}

export function useReportQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.reports.detail(id),
    queryFn: () => ReportService.getById(id),
    enabled: !!id,
  });
}

export function useUpdateStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReportStatus }) =>
      ReportService.updateStatus(id, { status }),
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.reports.all });

      // Snapshot the previous value
      const previousReports = queryClient.getQueryData(queryKeys.reports.all);

      // Optimistically update to the new value
      queryClient.setQueriesData({ queryKey: queryKeys.reports.lists() }, (old: any) => {
        if (!old || !old.reports) return old;
        return {
          ...old,
          reports: old.reports.map((r: any) => r.id === id ? { ...r, status } : r)
        };
      });

      return { previousReports };
    },
    onSuccess: (_, variables) => {
      toast.success(`Report status updated to ${variables.status}`);
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousReports) {
        queryClient.setQueryData(queryKeys.reports.all, context.previousReports);
      }
      toast.error("Failed to update report status");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
  });
}

export function useCreateReportMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: any) => ReportService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
      toast.success("Report submitted successfully!", {
        description: "An administrator will review your report shortly.",
      });
      router.push("/reports");
    },
    onError: (error: any) => {
      toast.error("Failed to submit report", {
        description: error.response?.data?.message || "Please try again.",
      });
    },
  });
}

export function useDeleteReportMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ReportService.delete(id),
    onSuccess: () => {
      toast.success("Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
    onError: () => {
      toast.error("Failed to delete report");
    },
  });
}
