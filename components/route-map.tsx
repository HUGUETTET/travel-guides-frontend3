"use client"

import { useEffect, useState } from "react"
import type { Route } from "@/lib/sanity"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"
import L from "leaflet"

interface RouteMapProps {
  route: Route
  onStopClick?: (stopIndex: number) => void
  onTransportClick?: (transportIndex: number) => void
}

// 🟠 Crear ícono numérico para los lugares
function createNumberedIcon(number: number) {
  return L.divIcon({
    html: `<div style="
      background-color: #f97316;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      border: 2px solid white;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
    ">${number}</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

// 🟦 Crear ícono de transporte con emoji
function createTransportIcon(emoji: string) {
  return L.divIcon({
    html: `<div style="
      background-color: white;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      border: 2px solid #3b82f6;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
    ">${emoji}</div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

// Ajuste automático de límites del mapa
function MapBounds({ stops }: { stops: Route["stops"] }) {
  const map = useMap()

  useEffect(() => {
    if (map && stops?.length) {
      const bounds = L.latLngBounds(stops.map((s) => [s.latitude, s.longitude]))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map, stops])

  return null
}

export function RouteMap({ route, onStopClick, onTransportClick }: RouteMapProps) {
const [isClient, setIsClient] = useState(false)

    useEffect(() => {
    setIsClient(true)
    }, [])

    if (!isClient || !route.stops?.length) {
        return (
          <div className="w-full h-[500px] bg-blue-50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        )
      }    

  const centerLat = route.stops.reduce((sum, stop) => sum + stop.latitude, 0) / route.stops.length
  const centerLng = route.stops.reduce((sum, stop) => sum + stop.longitude, 0) / route.stops.length
  const polylinePositions = route.stops.map((stop) => [stop.latitude, stop.longitude] as [number, number])

  const transportMidpoints = route.stops.slice(0, -1).map((stop, i) => {
    const next = route.stops[i + 1]
    return {
      lat: (stop.latitude + next.latitude) / 2,
      lng: (stop.longitude + next.longitude) / 2,
      transport: route.transportation?.[i],
      index: i,
    }
  })

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-blue-200 shadow-lg">
      <MapContainer
        style={{ height: "100%", width: "100%", zIndex: 1}}
        scrollWheelZoom={true}
        center={[centerLat, centerLng]}
        zoom={route.mapZoom || 6}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapBounds stops={route.stops} />

        <Polyline
          positions={polylinePositions}
          color="#3b82f6"
          weight={3}
          opacity={0.7}
          dashArray="10, 10"
        />

        {route.stops.map((stop, index) => (
          <Marker
            key={`stop-${index}`}
            position={[stop.latitude, stop.longitude]}
            icon={createNumberedIcon(index + 1)}
            eventHandlers={{
              click: () => onStopClick?.(index),
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{stop.destination}</h3>
                <p className="text-sm text-muted-foreground">{stop.country}</p>
                {stop.description && <p className="text-sm mt-2">{stop.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        {transportMidpoints.map(
          (mid) =>
            mid.transport && (
              <Marker
                key={`transport-${mid.index}`}
                position={[mid.lat, mid.lng]}
                icon={createTransportIcon(mid.transport.emoji)}
                eventHandlers={{
                  click: () => onTransportClick?.(mid.index),
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{mid.transport.method}</h3>
                    {mid.transport.duration && <p><strong>Duración:</strong> {mid.transport.duration}</p>}
                    {mid.transport.cost && <p><strong>Costo:</strong> {mid.transport.cost}</p>}
                    {mid.transport.description && <p>{mid.transport.description}</p>}
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  )
}

