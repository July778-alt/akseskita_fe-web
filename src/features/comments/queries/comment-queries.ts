"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentService } from "../services/comment-service";
import { toast } from "sonner";
import { queryKeys } from "@/constants/query-keys";
import { CreateCommentDTO } from "@/types/comment";

export function useCommentsQuery(reportId: string) {
  return useQuery({
    queryKey: queryKeys.comments.byReport(reportId),
    queryFn: () => CommentService.getCommentsByReportId(reportId),
    enabled: !!reportId,
  });
}

export function useAddCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, data }: { reportId: string; data: CreateCommentDTO }) =>
      CommentService.addComment(reportId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byReport(variables.reportId) });
      toast.success("Comment added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add comment");
    },
  });
}

export function useDeleteCommentMutation(reportId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CommentService.deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byReport(reportId) });
      toast.success("Comment deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete comment");
    },
  });
}
