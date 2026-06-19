"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStatusFormValues, updateStatusSchema } from "../schemas/report-schemas";
import { ReportStatus } from "@/types/report";
import { ReportService } from "../services/report-service";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Clock, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusUpdateFormProps {
  reportId: string;
  currentStatus: ReportStatus;
  onSuccess: (newStatus: ReportStatus) => void;
}

export function StatusUpdateForm({ reportId, currentStatus, onSuccess }: StatusUpdateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const STATUS_RANKS: Record<string, number> = {
    pending: 1,
    verified: 2,
    in_progress: 3,
    resolved: 4,
    rejected: 4,
  };

  const currentRank = STATUS_RANKS[currentStatus] || 0;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<UpdateStatusFormValues>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const selectedStatus = watch("status");

  const onSubmit = async (data: UpdateStatusFormValues) => {
    setIsSubmitting(true);
    try {
      await ReportService.updateStatus(reportId, data);
      toast.success("Report status updated successfully");
      onSuccess(data.status);
    } catch (error: any) {
      toast.error("Failed to update status", {
        description: error.response?.data?.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Strict sequential flow: pending → verified → in_progress → resolved
  // Reject is allowed at any non-final stage
  const SEQUENTIAL_NEXT: Record<string, ReportStatus | null> = {
    pending: "verified",
    verified: "in_progress",
    in_progress: "resolved",
    resolved: null,
    rejected: null,
  };

  const nextStatus = SEQUENTIAL_NEXT[currentStatus];
  const isFinalState = currentStatus === "resolved" || currentStatus === "rejected";

  const actionOptions: { value: ReportStatus; label: string; icon: any; color: string; description: string }[] = [
    {
      value: "verified",
      label: "Verify",
      icon: CheckCircle,
      color: "hover:bg-blue-500/10 hover:text-blue-500 border-blue-500/20",
      description: "Confirm report is valid",
    },
    {
      value: "in_progress",
      label: "Progress",
      icon: Clock,
      color: "hover:bg-purple-500/10 hover:text-purple-500 border-purple-500/20",
      description: "Being handled",
    },
    {
      value: "resolved",
      label: "Resolve",
      icon: CheckCircle,
      color: "hover:bg-emerald-500/10 hover:text-emerald-500 border-emerald-500/20",
      description: "Issue resolved",
    },
    {
      value: "rejected",
      label: "Reject",
      icon: XCircle,
      color: "hover:bg-destructive/10 hover:text-destructive border-destructive/20",
      description: "Reject this report",
    },
  ];

  // Steps for the linear progress indicator (excluding rejected)
  const linearSteps: ReportStatus[] = ["pending", "verified", "in_progress", "resolved"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Sequential Steps Progress Indicator */}
      <div className="flex items-center justify-between">
        {linearSteps.map((step, idx) => {
          const stepRank = STATUS_RANKS[step];
          const isPast = stepRank < currentRank;
          const isCurrent = step === currentStatus;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                    isPast
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isCurrent
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-muted border-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {isPast ? <CheckCircle size={13} /> : idx + 1}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wide",
                    isPast
                      ? "text-emerald-500"
                      : isCurrent
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {step === "in_progress" ? "Progress" : step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
              </div>
              {idx < linearSteps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1 rounded transition-all",
                    isPast ? "bg-emerald-500" : "bg-muted-foreground/20"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {isFinalState ? (
        <div className="text-center py-4 text-muted-foreground text-sm bg-muted/30 rounded-2xl">
          <p className="font-medium">
            {currentStatus === "resolved"
              ? "✅ This report has been resolved."
              : "❌ This report has been rejected."}
          </p>
          <p className="text-xs mt-1 opacity-70">No further status changes are available.</p>
        </div>
      ) : (
        <>
          {/* Next step hint */}
          <div className="text-xs text-muted-foreground bg-muted/40 rounded-xl px-3 py-2">
            <span className="font-semibold">Next required step: </span>
            {nextStatus === "verified" && "You must Verify the report before proceeding."}
            {nextStatus === "in_progress" && "Mark as In Progress to indicate work has started."}
            {nextStatus === "resolved" && "Mark as Resolved once the issue has been fully fixed."}
          </div>

          {/* Action buttons — only next sequential step + Reject */}
          <div className="grid grid-cols-2 gap-2">
            {actionOptions
              .filter((opt) => opt.value === nextStatus || opt.value === "rejected")
              .map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setValue("status", opt.value)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-xs font-bold gap-1.5",
                    opt.color,
                    selectedStatus === opt.value
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-background text-muted-foreground"
                  )}
                >
                  <opt.icon size={16} />
                  {opt.label}
                  <span className="text-[9px] font-normal opacity-70">{opt.description}</span>
                </button>
              ))}
          </div>

          <div className="space-y-2 pt-1">
            <label className="text-sm font-medium">Resolution Comment (Optional)</label>
            <Textarea
              placeholder="Explain the reason for this status change..."
              {...register("comment")}
              className="rounded-xl bg-muted/30 border-none min-h-[90px]"
            />
            {errors.comment && (
              <p className="text-xs text-destructive">{errors.comment.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-full"
            disabled={isSubmitting || selectedStatus === currentStatus}
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin mr-2" />
            ) : (
              <Send size={18} className="mr-2" />
            )}
            Update Lifecycle Status
          </Button>
        </>
      )}
    </form>
  );
}
