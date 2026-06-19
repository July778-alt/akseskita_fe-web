"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "../services/category-service";
import { toast } from "sonner";
import { CategoryFormValues } from "../schemas/category-schemas";
import { queryKeys } from "@/constants/query-keys";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => CategoryService.getAll(),
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryFormValues) => CategoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success("Category created successfully");
    },
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormValues }) => CategoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success("Category updated");
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success("Category deleted");
    },
  });
}
