import React from "react";
import { CheckCircle2, Clock, XCircle, ArrowRight, User } from "lucide-react";
import { ReportHistory } from "@/types/report";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface StatusTimelineProps {
  histories: ReportHistory[];
}

const statusConfig: Record<string, { label: string, color: string, icon: any }> = {
  pending: { label: "Pending", color: "text-amber-500", icon: Clock },
  verified: { label: "Verified", color: "text-blue-500", icon: CheckCircle2 },
  in_progress: { label: "In Progress", color: "text-purple-500", icon: Clock },
  resolved: { label: "Resolved", color: "text-emerald-500", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "text-destructive", icon: XCircle },
};

export function StatusTimeline({ histories }: StatusTimelineProps) {
  if (!histories || histories.length === 0) return null;

  return (
    <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-muted">
      {histories.map((item, idx) => {
        const config = statusConfig[item.new_status] || statusConfig.pending;
        const Icon = config.icon;

        return (
          <div key={item.id} className="relative pl-8 animate-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className={cn(
              "absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-background flex items-center justify-center z-10",
              config.color.replace("text-", "bg-")
            )}>
              <Icon size={12} className="text-white" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-bold", config.color)}>
                  {config.label}
                </span>
                <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase font-medium">
                  {format(new Date(item.created_at), "MMM d, HH:mm")}
                </span>
              </div>
              {item.comment && (
                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-xl border border-muted/50 italic">
                  &quot;{item.comment}&quot;
                </p>
              )}
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                <User size={12} />
                <span>Updated by {item.full_name || "Staff"}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
