import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4">
      <LoadingSpinner size={48} className="text-primary" />
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold animate-pulse">Loading AksesKita</h3>
        <p className="text-sm text-muted-foreground">Preparing your dashboard...</p>
      </div>
    </div>
  );
}
