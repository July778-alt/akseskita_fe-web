"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, MessageSquare, Info, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Notification } from "../types";
import { 
  useNotificationsQuery, 
  useMarkAllAsReadMutation, 
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation
} from "../queries/notification-queries";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/use-auth-store";

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();
  
  const { data: notifications = [] } = useNotificationsQuery();
  const markAllAsReadMutation = useMarkAllAsReadMutation();
  const markAsReadMutation = useMarkAsReadMutation();
  const deleteNotificationMutation = useDeleteNotificationMutation();
  const clearAllNotificationsMutation = useClearAllNotificationsMutation();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAllAsRead = () => {
    if (unreadCount > 0) {
      markAllAsReadMutation.mutate();
    }
  };

  const handleDeleteNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotificationMutation.mutate(id);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      clearAllNotificationsMutation.mutate();
    }
  };

  const handleNotificationClick = (n: Notification) => {
    if (!n.is_read) {
      markAsReadMutation.mutate(n.id);
    }
    setIsOpen(false);
    
    if (n.reference_id) {
      if (user?.role === "admin" || user?.role === "super_admin") {
        router.push(`/staff-dashboard/reports/${n.reference_id}`);
      } else {
        router.push(`/reports/${n.reference_id}`);
      }
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-popover border rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b flex items-center justify-between bg-muted/50">
                <h3 className="font-bold">Notifications</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0 || markAllAsReadMutation.isPending}
                    className="text-xs text-primary hover:underline font-medium disabled:opacity-50 disabled:hover:no-underline"
                  >
                    Mark all as read
                  </button>
                  {notifications.length > 0 && (
                    <button 
                      onClick={handleClearAll}
                      disabled={clearAllNotificationsMutation.isPending}
                      className="text-xs text-destructive hover:underline font-medium disabled:opacity-50 disabled:hover:no-underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-100 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => handleNotificationClick(n)}
                      className={cn(
                        "p-4 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer flex items-start justify-between gap-4 group/item",
                        !n.is_read && "bg-primary/5"
                      )}
                    >
                      <div className="flex gap-4 flex-1">
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                          n.type === "report_status" ? "bg-emerald-500/10 text-emerald-500" :
                          n.type === "admin_message" ? "bg-blue-500/10 text-blue-500" :
                          "bg-muted text-muted-foreground"
                        )}>
                          {n.type === "report_status" ? <CheckCircle2 size={18} /> : 
                           n.type === "admin_message" ? <MessageSquare size={18} /> : 
                           <Info size={18} />}
                        </div>
                        <div className="space-y-1">
                          <p className={cn("text-sm font-semibold", !n.is_read && "text-primary")}>{n.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteNotification(e, n.id)}
                        disabled={deleteNotificationMutation.isPending}
                        className="p-1 rounded-md text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-colors md:opacity-0 group-hover/item:opacity-100 disabled:opacity-50"
                        title="Delete notification"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell size={40} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">All caught up!</p>
                  </div>
                )}
              </div>

              <div className="p-3 border-t text-center bg-muted/30">
                <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                  View all notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
