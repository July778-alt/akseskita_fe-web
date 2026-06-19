"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Upload, X, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPicker } from "@/features/maps/components";
import { ReportService } from "../services/report-service";
import { Category } from "@/types/category";
import { createReportSchema, CreateReportFormValues } from "../schemas/report-schemas";
import { useCreateReportMutation } from "../queries/report-queries";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export function ReportForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutateAsync: createReport, isPending: isLoading } = useCreateReportMutation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<CreateReportFormValues | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateReportFormValues>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      latitude: -6.2088,
      longitude: 106.8456,
    }
  });

  useEffect(() => {
    ReportService.getCategories()
      .then(setCategories)
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: CreateReportFormValues) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Title</label>
                <Input
                  placeholder="e.g., Broken streetlight on Main St"
                  {...register("title")}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Provide details about the issue..."
                  rows={5}
                  {...register("description")}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  {...register("category_id")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.category_id && <p className="text-xs text-destructive">{errors.category_id.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <Controller
                control={control}
                name="latitude"
                render={({ field: latField }) => (
                  <Controller
                    control={control}
                    name="longitude"
                    render={({ field: lngField }) => (
                      <MapPicker
                        value={{ 
                          lat: latField.value || -6.2088, 
                          lng: lngField.value || 106.8456 
                        }}
                        onChange={(pos) => {
                          latField.onChange(pos.lat);
                          lngField.onChange(pos.lng);
                        }}
                      />
                    )}
                  />
                )}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Detailed Address (Optional)</label>
                <Input placeholder="House number, landmark, etc." {...register("address")} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / Upload */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Photo</CardTitle>
            </CardHeader>
            <CardContent>
              {imagePreview ? (
                <div className="relative aspect-square rounded-xl overflow-hidden border">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setValue("image", undefined);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all">
                  <Upload className="mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                </label>
              )}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={async () => {
          if (formData) {
            await createReport(formData as any);
          }
        }}
        title="Submit Report"
        description="Are you sure you want to submit this report? Please make sure all information and location are correct."
        confirmText="Submit"
        variant="default"
      />
    </form>
  );
}
