import React from "react";
import { Search, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl bg-muted/5">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Search size={40} className="text-muted-foreground/30" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {description && <p className="text-muted-foreground mt-2 max-w-sm">{description}</p>}
      {action && (
        <Button onClick={action.onClick} className="mt-8 rounded-full">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({ title, description, action }: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border rounded-3xl bg-destructive/5">
      <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <AlertCircle size={40} className="text-destructive/50" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {description && <p className="text-muted-foreground mt-2 max-w-sm">{description}</p>}
      {action && (
        <Button variant="outline" onClick={action.onClick} className="mt-8 rounded-full border-destructive text-destructive hover:bg-destructive/10">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function LoadingState({ title = "Loading data..." }: { title?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <Loader2 size={40} className="text-primary animate-spin mb-4" />
      <p className="text-muted-foreground font-medium animate-pulse">{title}</p>
    </div>
  );
}
