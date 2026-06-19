"use client";

import React, { useState, useRef } from "react";
import { Upload, X, FileImage, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FileUploaderProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  onRemove: () => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  label?: string;
}

export function FileUploader({
  value,
  onChange,
  onRemove,
  accept = "image/*",
  maxSize = 5,
  className,
  label = "Upload Image",
}: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let file: File | undefined;
    
    if ('files' in e.target && e.target.files?.[0]) {
      file = e.target.files[0];
    } else if ('dataTransfer' in e && e.dataTransfer.files?.[0]) {
      file = e.dataTransfer.files[0];
    }

    if (!file) return;

    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${maxSize}MB`);
      return;
    }

    onChange(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setPreview(null);
    onRemove();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={cn("space-y-2", className)}>
      {preview ? (
        <div className="relative aspect-video rounded-2xl overflow-hidden border bg-muted group">
          <img 
            src={preview.startsWith("http") || preview.startsWith("data:") ? preview : `http://localhost:5000${preview}`} 
            alt="Preview" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
             <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white text-black rounded-full hover:bg-white/90"
              >
                <FileImage size={18} />
              </button>
              <button
                type="button"
                onClick={clearFile}
                className="p-2 bg-destructive text-white rounded-full hover:bg-destructive/90"
              >
                <X size={18} />
              </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e); }}
          className={cn(
            "flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed transition-all group cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
            <Upload className={cn("transition-colors", isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary")} size={24} />
          </div>
          <span className="text-sm font-medium">{isDragging ? "Drop to upload" : label}</span>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to {maxSize}MB</p>
        </div>
      )}
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept={accept} 
        onChange={handleFileChange} 
      />
    </div>
  );
}
