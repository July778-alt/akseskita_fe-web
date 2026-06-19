"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "../services/notification-service";
import { queryKeys } from "@/constants/query-keys";
import { toast } from "sonner";

export function useNotificationsQuery() {
  return useQuery({
    queryKey: queryKeys.notifications.my(),
    queryFn: NotificationService.getMyNotifications,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useMarkAsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => NotificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.my() });
    },
  });
}

export function useMarkAllAsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => NotificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.my() });
      toast.success("All notifications marked as read");
    },
  });
}

export function useDeleteNotificationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => NotificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.my() });
      toast.success("Notification deleted");
    },
  });
}

export function useClearAllNotificationsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => NotificationService.clearAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.my() });
      toast.success("All notifications cleared");
    },
  });
}
