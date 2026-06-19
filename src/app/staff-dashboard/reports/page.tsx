"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Eye, MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react";
import { ReportService } from "@/features/reports/services/report-service";
import { Report, ReportStatus } from "@/types/report";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DataTable } from "@/components/shared/data-table";
import { useTableParams } from "@/hooks/use-table-params";
import { EmptyState } from "@/components/shared/ux-states";

const statusConfig: Record<ReportStatus, { label: string, color: string, icon: any }> = {
  pending: { label: "Pending", color: "text-amber-500 bg-amber-500/10", icon: Clock },
  verified: { label: "Verified", color: "text-blue-500 bg-blue-500/10", icon: CheckCircle },
  in_progress: { label: "In Progress", color: "text-purple-500 bg-purple-500/10", icon: Clock },
  resolved: { label: "Resolved", color: "text-emerald-500 bg-emerald-500/10", icon: CheckCircle },
  rejected: { label: "Rejected", color: "text-destructive bg-destructive/10", icon: XCircle },
};

import { useReportsQuery, useUpdateStatusMutation } from "@/features/reports/queries/report-queries";

export default function StaffReportsPage() {
  const { params, onSearch, updateParams } = useTableParams();
  const { data, isLoading } = useReportsQuery(params);
  const { mutate: updateStatus } = useUpdateStatusMutation();

  const reports = data?.reports || [];
  const pagination = data?.pagination || undefined;

  const handleStatusUpdate = (id: string, status: ReportStatus) => {
    updateStatus({ id, status });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report Management</h1>
        <p className="text-muted-foreground mt-1">
          Review, moderate, and track the status of public reports.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search reports by title or description..." 
            className="pl-10 h-11"
            defaultValue={params.search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={[
          {
            header: "Report",
            cell: (report) => (
              <div className="max-w-[300px] lg:max-w-[400px]">
                <p className="font-semibold truncate">{report.title}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {report.description}
                </p>
              </div>
            ),
          },
          {
            header: "Category",
            cell: (report) => (
              <Badge variant="outline" className="font-normal border-primary/20 bg-primary/5 text-primary">
                {report.category_name || "Uncategorized"}
              </Badge>
            ),
          },
          {
            header: "Status",
            cell: (report) => {
              const config = statusConfig[report.status];
              const StatusIcon = config.icon;
              return (
                <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold", config.color)}>
                  <StatusIcon size={12} />
                  {config.label}
                </div>
              );
            },
          },
          {
            header: "Created",
            cell: (report) => (
              <div className="text-xs font-medium text-muted-foreground">
                {format(new Date(report.created_at), "MMM d, HH:mm")}
              </div>
            ),
          },
          {
            header: "Actions",
            className: "text-right",
            cell: (report) => (
              <div className="flex justify-end gap-2">
                <Link href={`/staff-dashboard/reports/${report.id}`}>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                    <Eye size={16} />
                  </Button>
                </Link>
                <div className="relative group">
                  <Button variant="ghost" size="icon" className="hover:bg-muted">
                    <MoreHorizontal size={16} />
                  </Button>
                  <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-50 bg-popover border rounded-xl shadow-2xl min-w-[160px] overflow-hidden p-1">
                      <button onClick={() => handleStatusUpdate(report.id, 'verified')} className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-blue-500/10 hover:text-blue-500">Mark Verified</button>
                      <button onClick={() => handleStatusUpdate(report.id, 'in_progress')} className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-purple-500/10 hover:text-purple-500">In Progress</button>
                      <button onClick={() => handleStatusUpdate(report.id, 'resolved')} className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500">Resolve Issue</button>
                      <button onClick={() => handleStatusUpdate(report.id, 'rejected')} className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-destructive hover:bg-destructive/10">Reject Report</button>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        data={reports}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={(page) => updateParams({ page })}
        emptyMessage="No reports matching your criteria were found."
      />
    </div>
  );
}
