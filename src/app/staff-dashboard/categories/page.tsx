"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Category } from "@/types/category";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryFormValues } from "@/features/categories/schemas/category-schemas";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/ux-states";

// Schema moved to features/categories/schemas/category-schemas.ts

import { 
  useCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation 
} from "@/features/categories/queries/category-queries";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategoriesQuery();
  const { mutate: createCategory, isPending: isCreating } = useCreateCategoryMutation();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategoryMutation();
  const { mutate: deleteCategory } = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setValue("name", category.name);
    setIsModalOpen(true);
  };

  const onSubmit = (data: CategoryFormValues) => {
    if (editingCategory) {
      updateCategory({ id: editingCategory.id, data }, {
        onSuccess: () => handleCloseModal()
      });
    } else {
      createCategory(data, {
        onSuccess: () => handleCloseModal()
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    reset();
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Manage report categories and classifications.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-full">
          <Plus className="mr-2" size={18} />
          New Category
        </Button>
      </div>

      <DataTable
        columns={[
          {
            header: "Category Name",
            accessorKey: "name",
            className: "font-semibold",
          },

          {
            header: "Actions",
            className: "text-right",
            cell: (category) => (
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(category)} className="hover:bg-primary/10 hover:text-primary">
                  <Pencil size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10" 
                  onClick={() => {
                    setCategoryToDelete(category.id);
                    setIsConfirmOpen(true);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ),
          },
        ]}
        data={categories}
        isLoading={isLoading}
        emptyMessage="No categories created yet."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? "Edit Category" : "New Category"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input 
              placeholder="e.g., Infrastructure, Sanitation" 
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {editingCategory ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          if (categoryToDelete) deleteCategory(categoryToDelete);
        }}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone and may affect existing reports."
        variant="destructive"
        confirmText="Delete"
      />
    </div>
  );
}
