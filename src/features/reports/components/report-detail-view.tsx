"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Report, ReportHistory } from "@/types/report";
import { ReportService } from "../services/report-service";
import { StatusTimeline } from "./status-timeline";
import { MapView } from "@/features/maps/components";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Tag, User, Loader2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { LoadingState } from "@/components/shared/ux-states";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { can } from "@/constants/permissions";
import { StatusUpdateForm } from "./status-update-form";
import { ReportStatus } from "@/types/report";
import { useDeleteReportMutation } from "../queries/report-queries";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentList } from "@/features/comments/components/comment-list";

export function ReportDetailView() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [report, setReport] = useState<Report | null>(null);
  const [histories, setHistories] = useState<ReportHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const deleteReport = useDeleteReportMutation();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      deleteReport.mutate(report?.id as string, {
        onSuccess: () => {
          router.push(user?.role === "user" ? "/reports" : "/staff-dashboard/dashboard");
        }
      });
    }
  };
  
  const isOwner = user?.id === report?.user_id;
  const isAdmin = user?.role === "admin" || user?.role === "super_admin";

  const fetchHistories = async () => {
    try {
      const historyData = await ReportService.getHistories(id as string);
      setHistories(historyData);
    } catch (error) {
      console.error("Failed to fetch histories", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [reportData, historyData] = await Promise.all([
          ReportService.getById(id as string),
          ReportService.getHistories(id as string),
        ]);
        setReport(reportData);
        setHistories(historyData);
      } catch (error) {
        toast.error("Failed to load report details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <LoadingState title="Loading report details..." />;
  if (!report) return <div className="text-center py-20">Report not found</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent -mb-2">
            <ArrowLeft size={16} className="mr-2" />
            Back to previous page
          </Button>
        </div>
        {/* Main Content */}
        <div className="space-y-6">
           <div className="aspect-video rounded-3xl overflow-hidden border shadow-sm bg-muted">
              {report.image_url ? (
                <img 
                  src={report.image_url} 
                  alt={report.title} 
                  className="w-full h-full object-contain bg-black/5 backdrop-blur-sm" 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground italic">No image provided</div>
              )}
           </div>

           <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight break-words">{report.title}</h1>
              <div className="flex flex-wrap gap-3">
                 <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                    {report.category_name || "Uncategorized"}
                 </Badge>
                 <Badge className="px-3 py-1 text-sm font-medium capitalize">
                    {report.status.replace("_", " ")}
                 </Badge>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
                {report.description}
              </p>
           </div>
        </div>

        {/* Map Section */}
        {report.latitude && report.longitude && (
          <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
             <CardHeader className="bg-muted/30">
                <CardTitle className="text-lg flex items-center gap-2">
                   <MapPin size={20} className="text-primary" />
                   Location Details
                </CardTitle>
             </CardHeader>
             <CardContent className="p-0 h-[400px]">
                <MapView 
                  lat={Number(report.latitude)} 
                  lng={Number(report.longitude)} 
                  title={report.title} 
                />
                {report.address && (
                  <div className="p-4 bg-background border-t">
                    <p className="text-sm font-medium">{report.address}</p>
                  </div>
                )}
             </CardContent>
          </Card>
        )}

        <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
           <CardContent className="p-6">
              <CommentList reportId={report.id} />
           </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        {/* Info Sidebar */}
        {can(user?.role, "MODERATE_REPORTS") && (
          <Card className="rounded-3xl border-none shadow-sm bg-primary/5 border border-primary/10">
             <CardHeader>
                <CardTitle className="text-lg">Moderate Report</CardTitle>
             </CardHeader>
             <CardContent>
                <StatusUpdateForm 
                  reportId={report.id} 
                  currentStatus={report.status} 
                  onSuccess={(newStatus) => {
                    setReport(prev => prev ? { ...prev, status: newStatus as ReportStatus } : null);
                    fetchHistories();
                  }}
                />
             </CardContent>
          </Card>
        )}

        <Card className="rounded-3xl border-none shadow-sm">
           <CardHeader>
              <CardTitle className="text-lg">Report Info</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                 <Calendar className="text-muted-foreground" size={18} />
                 <div>
                    <p className="text-muted-foreground text-xs uppercase font-bold tracking-wider">Reported On</p>
                    <p className="font-medium">{format(new Date(report.created_at), "PPP")}</p>
                 </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                 <User className="text-muted-foreground" size={18} />
                 <div>
                    <p className="text-muted-foreground text-xs uppercase font-bold tracking-wider">Reporter</p>
                    <p className="font-medium">{report.full_name || "Anonymous User"}</p>
                 </div>
              </div>
           </CardContent>
           
           {(isOwner || isAdmin) && (
             <div className="px-6 pb-6 pt-2 border-t mt-4 flex justify-center">
                <Button 
                  variant="ghost" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full rounded-2xl gap-2"
                  onClick={handleDelete}
                  disabled={deleteReport.isPending}
                >
                  {deleteReport.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  Delete Report
                </Button>
             </div>
           )}
        </Card>

        {/* Status History */}
        <Card className="rounded-3xl border-none shadow-sm">
           <CardHeader>
              <CardTitle className="text-lg">Status History</CardTitle>
           </CardHeader>
           <CardContent>
              <StatusTimeline histories={histories} />
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
