"use client";

import React, { useEffect, useState } from "react";
import { Search, UserPlus, Trash2, Mail, Shield, UserCircle } from "lucide-react";
import { UserService } from "@/features/users/services/user-service";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DataTable } from "@/components/shared/data-table";
import { useTableParams } from "@/hooks/use-table-params";
import { EmptyState, LoadingState } from "@/components/shared/ux-states";
import { cn } from "@/lib/utils";

import { useUsersQuery, useDeleteUserMutation, useUpdateUserRoleMutation } from "@/features/users/queries/user-queries";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { toast } from "sonner";

export default function UsersPage() {
  const { params, onSearch, updateParams } = useTableParams();
  const { data, isLoading } = useUsersQuery(params);
  const users = data?.users || [];
  const pagination = data?.pagination;

  const { mutate: deleteUser } = useDeleteUserMutation();
  const { mutate: updateRole, isPending: isUpdating } = useUpdateUserRoleMutation();
  const { user: currentUser } = useAuthStore();
  
  const isSuperAdmin = currentUser?.role === 'super_admin';

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  if (!isSuperAdmin && currentUser?.role !== 'admin' && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-500">
        <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-6">
          <Shield size={40} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Access Denied</h2>
        <p className="text-muted-foreground mt-3 max-w-xs mx-auto text-lg">
          You do not have the required permissions to manage users.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage system users and their roles.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search users by name or email..." 
            className="pl-10 h-11"
            defaultValue={params.search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={[
          {
            header: "User",
            cell: (user) => (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden border shrink-0">
                  {user.profile_picture ? (
                    <img src={user.profile_picture} className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle size={24} />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{user.full_name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail size={12} />
                    {user.email}
                  </p>
                </div>
              </div>
            ),
          },
          {
            header: "Role",
            cell: (user: any) => (
              isSuperAdmin && user.id !== currentUser?.id ? (
                <div className="flex items-center gap-2">
                  <select 
                    className="text-xs font-medium border rounded-md px-2 py-1 bg-background focus:ring-1 focus:ring-primary outline-none"
                    defaultValue={user.role}
                    onChange={(e) => {
                      const newRole = e.target.value;
                      if (window.confirm(`Change ${user.full_name}'s role to ${newRole}?`)) {
                        updateRole({ id: user.id, role: newRole });
                      }
                    }}
                    disabled={isUpdating}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              ) : (
                <Badge 
                  variant="outline"
                  className={cn(
                    "capitalize font-bold px-3 py-1 rounded-full border-none",
                    user.role === 'super_admin' && "bg-purple-100 text-purple-700 hover:bg-purple-100",
                    user.role === 'admin' && "bg-blue-100 text-blue-700 hover:bg-blue-100",
                    user.role === 'user' && "bg-slate-100 text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {user.role === 'super_admin' ? (
                     <span className="flex items-center gap-1.5"><Shield size={12} /> Super Admin</span>
                  ) : user.role === 'admin' ? (
                     <span className="flex items-center gap-1.5"><Shield size={12} /> Admin</span>
                  ) : (
                     user.role
                  )}
                </Badge>
              )
            ),
          },
          {
            header: "Joined Date",
            cell: (user) => (
              <div className="text-sm text-muted-foreground font-medium">
                {format(new Date(user.created_at), "MMM d, yyyy")}
              </div>
            ),
          },
          {
            header: "Actions",
            className: "text-right",
            cell: (user) => {
              const isCurrentUser = user.id === currentUser?.id;
              const isTargetAdmin = user.role === 'admin' || user.role === 'super_admin';
              const canDelete = !isCurrentUser && (isSuperAdmin || (currentUser?.role === 'admin' && !isTargetAdmin));

              return canDelete ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    setUserToDelete(user.id);
                    setIsConfirmOpen(true);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground opacity-50 cursor-not-allowed"
                  disabled
                >
                  <Trash2 size={16} />
                </Button>
              );
            },
          },
        ]}
        data={users}
        pagination={pagination}
        onPageChange={(page) => updateParams({ page })}
        isLoading={isLoading}
        emptyMessage="No users found matching your search."
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => { if (userToDelete) deleteUser(userToDelete); }}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone and will permanently remove their access to the platform."
        variant="destructive"
        confirmText="Delete"
      />
    </div>
  );
}
