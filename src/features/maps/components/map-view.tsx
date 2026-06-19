"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Next.js
const DefaultIcon = typeof window !== "undefined" ? L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
}) : null;

if (typeof window !== "undefined") {
  L.Marker.prototype.options.icon = DefaultIcon as L.Icon;
}

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
  title?: string;
}

export function MapView({ lat, lng, zoom = 15, title }: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-muted animate-pulse rounded-xl" />;
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          {title && <Popup>{title}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
