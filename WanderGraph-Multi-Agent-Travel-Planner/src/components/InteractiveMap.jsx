import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Hotel, Compass, Maximize2 } from 'lucide-react';

// Fix standard marker icon issue in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const DAY_COLORS = ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#f43f5e', '#a855f7', '#ec4899'];

export default function InteractiveMap({ 
  markers = [], 
  center = [35.6762, 139.6503], 
  destinationName = 'Destination',
  focusedCoords = null 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map instance
      const map = L.map(mapContainerRef.current, {
        center: center || [35.6762, 139.6503],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // CartoDB Voyager or DarkMatter modern clean tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    if (markers && markers.length > 0) {
      const bounds = [];

      markers.forEach((m) => {
        if (!m.coords || m.coords.length < 2) return;
        bounds.push(m.coords);

        const isHotel = m.type === 'accommodation' || m.category === 'Hotel';
        const color = isHotel ? '#f43f5e' : (DAY_COLORS[(m.day || 1) % DAY_COLORS.length]);

        const customHtml = `
          <div style="
            background: ${color};
            color: #ffffff;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 11px;
            box-shadow: 0 3px 8px rgba(0,0,0,0.35);
            border: 2px solid #ffffff;
          ">
            ${isHotel ? '🏨' : (m.day || '📍')}
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-leaflet-pin',
          html: customHtml,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -18]
        });

        const popupContent = `
          <div style="font-family: system-ui, sans-serif; min-width: 180px; padding: 4px;">
            <div style="font-size: 10px; text-transform: uppercase; font-weight: 700; color: ${color}; margin-bottom: 2px;">
              ${isHotel ? 'BASECAMP STAY' : `DAY ${m.day} • ${m.category || 'ACTIVITY'}`}
            </div>
            <strong style="font-size: 13px; color: #0f172a; display: block; margin-bottom: 4px;">${m.title}</strong>
            <div style="font-size: 11px; color: #475569;">${m.details || ''}</div>
          </div>
        `;

        const marker = L.marker(m.coords, { icon: customIcon }).bindPopup(popupContent);
        layerGroup.addLayer(marker);
      });

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }

    // Invalidate size on mount to avoid partial tile renders
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, [markers, center]);

  // Handle focus changes when user clicks "View on Map" in DayCard
  useEffect(() => {
    if (focusedCoords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(focusedCoords, 15, { duration: 1.2 });
    }
  }, [focusedCoords]);

  const handleRecenter = () => {
    if (mapInstanceRef.current && markers.length > 0) {
      const bounds = markers.map(m => m.coords).filter(Boolean);
      if (bounds.length > 0) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  };

  return (
    <div className="interactive-map-container">
      <div className="map-overlay-header">
        <div className="map-title-chip">
          <MapPin size={14} className="text-accent" />
          <span>Geo-Clustered Route Map • {destinationName}</span>
        </div>
        <button 
          className="map-recenter-btn"
          onClick={handleRecenter}
          title="Reset Map Bounds"
        >
          <Maximize2 size={14} />
          <span>Fit All Pins</span>
        </button>
      </div>

      <div ref={mapContainerRef} className="leaflet-map-element" />

      <div className="map-legend-bar">
        <div className="legend-pin-item">
          <span className="legend-sample-pin hotel">🏨</span> Hotel Base
        </div>
        {DAY_COLORS.slice(0, 4).map((c, i) => (
          <div key={i} className="legend-pin-item">
            <span className="legend-sample-pin" style={{ backgroundColor: c }}>{i + 1}</span> Day {i + 1} Sights
          </div>
        ))}
      </div>
    </div>
  );
}
