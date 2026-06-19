"use client";

import { 
  BarChart3, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Users as UsersIcon,
  TrendingUp,
  AlertCircle,
  XCircle,
  Layers
} from "lucide-react";
import { AnalyticsCard } from "@/features/dashboard/components/analytics-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStatsQuery } from "@/features/dashboard/queries/dashboard-queries";

export default function StaffDashboardPage() {
  const { data: stats, isLoading } = useDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-3xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] rounded-3xl" />
          <Skeleton className="h-[400px] rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor community activity and platform performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard 
          title="Total Reports" 
          value={stats.total_reports} 
          icon={<FileText size={20} />} 
          trend="Lifetime"
        />
        <AnalyticsCard 
          title="Pending Approval" 
          value={stats.pending_reports} 
          icon={<Clock size={20} />} 
          trend="Attention needed"
          trendType="negative"
        />
        <AnalyticsCard 
          title="Issues Resolved" 
          value={stats.resolved_reports} 
          icon={<CheckCircle2 size={20} />} 
          trend="Successful cases"
          trendType="positive"
        />
        <AnalyticsCard 
          title="Total Citizens" 
          value={stats.total_users} 
          icon={<UsersIcon size={20} />} 
          trend="Community size"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <AnalyticsCard 
          title="Verified" 
          value={stats.verified_reports} 
          icon={<CheckCircle2 className="text-blue-500" size={18} />} 
          className="bg-blue-500/5 border border-blue-500/10"
        />
        <AnalyticsCard 
          title="In Progress" 
          value={stats.in_progress_reports} 
          icon={<TrendingUp className="text-purple-500" size={18} />} 
          className="bg-purple-500/5 border border-purple-500/10"
        />
        <AnalyticsCard 
          title="Rejected" 
          value={stats.rejected_reports} 
          icon={<XCircle className="text-destructive" size={18} />} 
          className="bg-destructive/5 border border-destructive/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-3xl border-none shadow-sm bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} />
              Monthly Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-end justify-between gap-2 pt-6">
            {stats.reports_per_month.length > 0 ? (
              stats.reports_per_month.map((m, i) => {
                const max = Math.max(...stats.reports_per_month.map(rm => Number(rm.total)));
                const height = max === 0 ? 0 : (Number(m.total) / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="relative w-full flex justify-center h-full items-end">
                      <div 
                        className="w-full max-w-[40px] bg-primary/20 group-hover:bg-primary transition-all rounded-t-lg relative"
                        style={{ height: `${height}%` }}
                      >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {m.total} reports
                         </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">{m.month}</span>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full h-full text-muted-foreground italic">
                No monthly data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Layers className="text-primary" size={20} />
              Hot Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px] space-y-4">
             {stats.most_reported_category ? (
               <>
                 <div className="h-32 w-32 rounded-full border-[8px] border-primary flex items-center justify-center text-center p-4">
                    <div>
                      <p className="text-2xl font-bold">{stats.most_reported_category.total}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Reports</p>
                    </div>
                 </div>
                 <div className="text-center">
                    <h3 className="text-xl font-bold">{stats.most_reported_category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Is currently the most reported category</p>
                 </div>
               </>
             ) : (
               <div className="text-muted-foreground italic">No category data yet</div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
