"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/user-service";
import { toast } from "sonner";
import { queryKeys } from "@/constants/query-keys";

export function useUsersQuery(params?: any) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => UserService.getAll(params),
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UserService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user. Check your permissions.");
    },
  });
}

export function useUpdateUserRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => 
      UserService.updateRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("User role updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update user role");
    },
  });
}
