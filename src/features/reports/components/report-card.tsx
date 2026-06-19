"use client";

import React from "react";
import { Report } from "@/types/report";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Tag, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { Button } from "@/components/ui/button";

import Link from "next/link";

interface ReportCardProps {
  report: Report;
  href?: string;
  onClick?: () => void;
  onDelete?: (e: React.MouseEvent, id: string) => void;
}

const statusVariants: Record<string, "default" | "secondary" | "destructive" | "outline" | "success" | "warning"> = {
  pending: "warning",
  verified: "default",
  in_progress: "secondary",
  resolved: "success",
  rejected: "destructive",
};

export function ReportCard({ report, href, onClick, onDelete }: ReportCardProps) {
  const { user } = useAuthStore();
  const isOwner = user?.id === report.user_id;

  const content = (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md h-full flex flex-col group",
        (onClick || href) && "cursor-pointer active:scale-[0.98]"
      )}
      onClick={onClick}
    >
      <div className="aspect-video relative overflow-hidden bg-muted">
        {report.image_url ? (
          <img 
            src={report.image_url} 
            alt={report.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Tag size={40} className="text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={statusVariants[report.status]}>
            {report.status.replace("_", " ")}
          </Badge>
        </div>
        
        {isOwner && onDelete && (
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="destructive" 
              size="icon" 
              className="h-8 w-8 rounded-full shadow-lg"
              onClick={(e) => onDelete(e, report.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg line-clamp-1 truncate">{report.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2 break-words truncate">
          {report.description}
        </p>
        
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
            <Tag size={14} className="shrink-0" />
            <span className="truncate">{report.category_name || "Uncategorized"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{report.address || "No address provided"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
            <Calendar size={14} className="shrink-0" />
            <span className="truncate">{format(new Date(report.created_at), "PPP")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
