"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  LogOut, 
  User as UserIcon, 
  Search 
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "@/features/notifications/components/notification-dropdown";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: React.ReactNode;
  basePath: string; // e.g., "" for user, "/staff" for staff if they have different prefixes
}

export function DashboardLayout({ children, basePath }: DashboardLayoutProps) {
  const { user, clearAuth } = useAuthStore();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredNav = NAVIGATION_ITEMS.filter((item) =>
    item.roles.includes(user?.role as any)
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary">AksesKita</h2>
        <p className="text-xs text-muted-foreground mt-1 capitalize">
          {user?.role?.replace("_", " ")} Panel
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href || (
            item.href !== "/" && 
            pathname.startsWith(item.href) && 
            // Ensure this is the most specific match
            !filteredNav.some(other => 
              other.href !== item.href && 
              pathname.startsWith(other.href) && 
              other.href.length > item.href.length
            )
          );
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <div className="h-9 w-9 rounded-full bg-muted overflow-hidden">
                {user?.profile_picture ? (
                  <img 
                    src={user.profile_picture} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                 <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    <UserIcon size={16} />
                 </div>
               )}
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.full_name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={clearAuth}
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-end px-8 h-20 bg-background/50 backdrop-blur-md sticky top-0 z-40 border-b">
           <div className="flex items-center gap-4">
              <NotificationDropdown />
           </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-card border-b sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu />
            </Button>
            <h2 className="text-lg font-bold text-primary">AksesKita</h2>
          </div>
          <div className="flex items-center gap-2">
            <NotificationDropdown />
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-72 h-full bg-card z-50 lg:hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end p-4">
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X />
                  </Button>
                </div>
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
