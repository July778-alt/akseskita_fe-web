"use client";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mx-auto h-24 w-24 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground/50 rotate-3">
          <FileQuestion size={48} />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">404</h1>
          <h2 className="text-2xl font-bold">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>
        <div className="pt-4">
        </div>
      </div>
    </div>
  );
}
