import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  className?: string;
}

export function AnalyticsCard({
  title,
  value,
  icon,
  trend,
  trendType = "neutral",
  className,
}: AnalyticsCardProps) {
  return (
    <Card className={cn("rounded-3xl border-none shadow-sm transition-all hover:shadow-md bg-card", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-2xl bg-primary/5 text-primary">
            {icon}
          </div>
          {trend && (
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full",
              trendType === "positive" ? "bg-emerald-500/10 text-emerald-500" :
              trendType === "negative" ? "bg-destructive/10 text-destructive" :
              "bg-muted text-muted-foreground"
            )}>
              {trend}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1 tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
