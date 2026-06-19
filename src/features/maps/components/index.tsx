"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const MapPicker = dynamic(
  () => import("./map-picker").then((mod) => mod.MapPicker),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-75 rounded-xl" />,
  }
);

export const MapView = dynamic(
  () => import("./map-view").then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-75 rounded-xl" />,
  }
);
