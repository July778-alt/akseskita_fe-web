import { ReportForm } from "@/features/reports/components/report-form";

export default function CreateReportPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Report</h1>
        <p className="text-muted-foreground mt-2">
          Help us improve our community by reporting issues you encounter.
        </p>
      </div>
      
      <ReportForm />
    </div>
  );
}
