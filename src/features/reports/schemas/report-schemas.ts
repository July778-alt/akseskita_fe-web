import { z } from "zod";

export const createReportSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category_id: z.string().uuid("Please select a category"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.string().optional(),
  image: z.any().optional(),
});

export const updateReportSchema = createReportSchema.partial();

export const updateStatusSchema = z.object({
  status: z.enum([
    "pending",
    "verified",
    "in_progress",
    "resolved",
    "rejected",
  ]),
  comment: z.string().optional(),
});

export type CreateReportFormValues = z.infer<typeof createReportSchema>;
export type UpdateReportFormValues = z.infer<typeof updateReportSchema>;
export type UpdateStatusFormValues = z.infer<typeof updateStatusSchema>;
