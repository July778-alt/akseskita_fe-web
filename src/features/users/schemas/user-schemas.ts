import { z } from "zod";

export const updateProfileSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters").optional(),
  email: z.string().email("Invalid email").optional(),
});

export const inviteAdminSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
export type InviteAdminFormValues = z.infer<typeof inviteAdminSchema>;
