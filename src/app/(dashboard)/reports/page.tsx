"use client";

import React from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { ReportCard } from "@/features/reports/components/report-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { EmptyState } from "@/components/shared/ux-states";
import { useTableParams } from "@/hooks/use-table-params";
import { useReportsQuery, useDeleteReportMutation } from "@/features/reports/queries/report-queries";

export default function UserReportsPage() {
  const { user } = useAuthStore();
  const { params, onSearch, updateParams } = useTableParams({ defaultLimit: 12 });

  const { data, isLoading } = useReportsQuery({
    ...params,
    user_id: user?.id
  });

  const deleteReport = useDeleteReportMutation();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      deleteReport.mutate(id);
    }
  };

  const reports = data?.reports || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Reports</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track the status of your reported issues.
          </p>
        </div>
        <Button asChild className="rounded-full shadow-lg shadow-primary/20">
          <Link href="/reports/create">
            <Plus className="mr-2" size={18} />
            New Report
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search reports..."
            className="pl-10 h-11"
            defaultValue={params.search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[380px] rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : reports.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                href={`/reports/${report.id}`}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateParams({ page: pagination.page - 1 })}
                disabled={pagination.page <= 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.total_pages }).map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={pagination.page === i + 1 ? "default" : "ghost"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => updateParams({ page: i + 1 })}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateParams({ page: pagination.page + 1 })}
                disabled={pagination.page >= pagination.total_pages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="No reports found"
          description={params.search ? "We couldn't find any reports matching your search." : "You haven't submitted any reports yet. Start by creating one!"}
          action={!params.search ? {
            label: "Create Your First Report",
            onClick: () => window.location.href = "/reports/create"
          } : undefined}
        />
      )}
    </div>
  );
}
