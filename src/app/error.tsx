"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="mx-auto h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
          <AlertCircle size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
          <p className="text-muted-foreground">
            An unexpected error occurred while rendering this page. We've been notified and are working on a fix.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button onClick={() => reset()} className="w-full sm:w-auto">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button variant="ghost" onClick={() => window.location.href = "/"} className="w-full sm:w-auto">
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
