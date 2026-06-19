"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileFormValues } from "../schemas/user-schemas";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { UserService } from "../services/user-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/shared/file-uploader";
import { toast } from "sonner";
import { Loader2, UserCircle, Mail, Shield, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfileForm() {
  const { user, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: user?.full_name,
      email: user?.email,
    },
  });

  const onSubmit = async (data: UpdateProfileFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (data.full_name) formData.append("full_name", data.full_name);
      if (avatar) formData.append("avatar", avatar);

      const updatedUser = await UserService.updateProfile(formData);
      updateUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("Failed to update profile", {
        description: error.response?.data?.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
        <div className="h-32 bg-primary/10 w-full" />
        <CardContent className="px-8 pb-8 -mt-12 relative">
          <div className="flex flex-col sm:flex-row items-end gap-6 mb-8">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-4 border-background bg-muted overflow-hidden">
                  {avatarPreview || user?.profile_picture ? (
                    <img 
                      src={(avatarPreview || user?.profile_picture) ?? undefined} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                   <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      <UserCircle size={64} />
                   </div>
                 )}
              </div>
              <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground border-2 border-background shadow-sm cursor-pointer hover:scale-105 transition-transform">
                <Camera size={16} />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAvatar(file);
                      const reader = new FileReader();
                      reader.onloadend = () => setAvatarPreview(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <div className="flex-1 pb-2">
               <h2 className="text-2xl font-bold">{user?.full_name}</h2>
               <p className="text-muted-foreground flex items-center gap-2">
                  <Mail size={14} />
                  {user?.email}
               </p>
            </div>
            <Badge variant="secondary" className="mb-2 capitalize">
               {user?.role.replace("_", " ")}
            </Badge>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input {...register("full_name")} placeholder="Your full name" />
                {errors.full_name && <p className="text-xs text-destructive">{errors.full_name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address (Read Only)</label>
                <Input value={user?.email} disabled className="bg-muted/50" />
              </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto px-8" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-bold",
      variant === "secondary" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
      className
    )}>
      {children}
    </span>
  );
}
