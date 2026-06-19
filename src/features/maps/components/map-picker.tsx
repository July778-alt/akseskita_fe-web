"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";

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

interface MapPickerProps {
  value?: { lat: number; lng: number };
  onChange: (value: { lat: number; lng: number }) => void;
}

// Helper to handle map click and recenter
function MapEvents({ onChange }: { onChange: (val: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng);
    },
  });
  return null;
}

export function MapPicker({ value, onChange }: MapPickerProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-75 bg-muted animate-pulse rounded-xl" />;
  }

  const defaultCenter: [number, number] = value ? [value.lat, value.lng] : [-6.2088, 106.8456];

  return (
    <div className="w-full h-75 rounded-xl overflow-hidden border">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onChange={onChange} />
        {value && <Marker position={[value.lat, value.lng]} />}
      </MapContainer>
    </div>
  );
}
