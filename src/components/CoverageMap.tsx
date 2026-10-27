import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ISTANBUL_DISTRICTS, DistrictInfo } from "../data/istanbulDistricts";
import { 
  RotateCcw, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Compass, 
  Navigation,
  Clock,
  ExternalLink,
  Layers,
  Search,
  Radio,
  Zap,
  Car,
  AlertTriangle,
  ChevronRight,
  Maximize2,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";

// Set MapLibre Web Worker explicitly to public asset to prevent Vite bundling 404
if (typeof window !== "undefined") {
  try {
    if (typeof (maplibregl as any).setWorkerUrl === "function") {
      (maplibregl as any).setWorkerUrl("/maplibre-gl-worker.mjs");
    }
    if ((maplibregl as any).config) {
      (maplibregl as any).config.WORKER_URL = "/maplibre-gl-worker.mjs";
    }
  } catch (e) {
    console.warn("Failed to set MapLibre workerUrl:", e);
  }
}

// Precise GPS Coordinates for all 39 Istanbul Districts (lng, lat for MapLibre)
export const DISTRICT_GPS: Record<string, { lat: number; lng: number; defaultStationId: string }> = {
  // Avrupa Yakası
  arnavutkoy: { lat: 41.1852, lng: 28.7410, defaultStationId: "station-beylikduzu" },
  avcilar: { lat: 40.9902, lng: 28.7118, defaultStationId: "station-bakirkoy" },
  bagcilar: { lat: 41.0347, lng: 28.8519, defaultStationId: "station-bakirkoy" },
  bahcelievler: { lat: 41.0003, lng: 28.8638, defaultStationId: "station-bakirkoy" },
  bakirkoy: { lat: 40.9788, lng: 28.8783, defaultStationId: "station-bakirkoy" },
  basaksehir: { lat: 41.0967, lng: 28.8052, defaultStationId: "station-sisli" },
  bayrampasa: { lat: 41.0450, lng: 28.9050, defaultStationId: "station-sisli" },
  besiktas: { lat: 41.0428, lng: 29.0075, defaultStationId: "station-levent" },
  beylikduzu: { lat: 40.9997, lng: 28.6536, defaultStationId: "station-beylikduzu" },
  beyoglu: { lat: 41.0315, lng: 28.9784, defaultStationId: "station-sisli" },
  buyukcekmece: { lat: 41.0183, lng: 28.5914, defaultStationId: "station-beylikduzu" },
  catalca: { lat: 41.1444, lng: 28.4614, defaultStationId: "station-beylikduzu" },
  esenler: { lat: 41.0460, lng: 28.8700, defaultStationId: "station-sisli" },
  esenyurt: { lat: 41.0343, lng: 28.6801, defaultStationId: "station-beylikduzu" },
  eyupsultan: { lat: 41.0478, lng: 28.9338, defaultStationId: "station-sisli" },
  fatih: { lat: 41.0082, lng: 28.9784, defaultStationId: "station-sisli" },
  gaziosmanpasa: { lat: 41.0710, lng: 28.9020, defaultStationId: "station-sisli" },
  gungoren: { lat: 41.0200, lng: 28.8750, defaultStationId: "station-bakirkoy" },
  kagithane: { lat: 41.0818, lng: 28.9742, defaultStationId: "station-sisli" },
  kucukcekmece: { lat: 41.0000, lng: 28.7800, defaultStationId: "station-bakirkoy" },
  sariyer: { lat: 41.1690, lng: 29.0503, defaultStationId: "station-levent" },
  silivri: { lat: 41.0742, lng: 28.2481, defaultStationId: "station-beylikduzu" },
  sultangazi: { lat: 41.1000, lng: 28.8900, defaultStationId: "station-sisli" },
  sisli: { lat: 41.0601, lng: 28.9874, defaultStationId: "station-sisli" },
  zeytinburnu: { lat: 40.9882, lng: 28.9038, defaultStationId: "station-bakirkoy" },

  // Anadolu Yakası
  adalar: { lat: 40.8750, lng: 29.1294, defaultStationId: "station-kadikoy" },
  atasehir: { lat: 40.9833, lng: 29.1167, defaultStationId: "station-umraniye" },
  beykoz: { lat: 41.1167, lng: 29.1000, defaultStationId: "station-umraniye" },
  cekmekoy: { lat: 41.0333, lng: 29.1833, defaultStationId: "station-umraniye" },
  kadikoy: { lat: 40.9910, lng: 29.0270, defaultStationId: "station-kadikoy" },
  kartal: { lat: 40.8900, lng: 29.1880, defaultStationId: "station-kadikoy" },
  maltepe: { lat: 40.9250, lng: 29.1333, defaultStationId: "station-kadikoy" },
  pendik: { lat: 40.8750, lng: 29.2333, defaultStationId: "station-kadikoy" },
  sancaktepe: { lat: 41.0000, lng: 29.2333, defaultStationId: "station-umraniye" },
  sultanbeyli: { lat: 40.9667, lng: 29.2667, defaultStationId: "station-umraniye" },
  sile: { lat: 41.1750, lng: 29.6133, defaultStationId: "station-umraniye" },
  tuzla: { lat: 40.8167, lng: 29.3000, defaultStationId: "station-kadikoy" },
  umraniye: { lat: 41.0167, lng: 29.1167, defaultStationId: "station-umraniye" },
  uskudar: { lat: 41.0250, lng: 29.0167, defaultStationId: "station-kadikoy" },
};

// 6 Strategic Emergency Mobile Electrician Hubs (Ekip Radarı)
export interface FleetHub {
  id: string;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  side: "Avrupa" | "Anadolu";
  activeVehicles: number;
  chiefElectrician: string;
  status: "Devriyede" | "Müdahalede" | "Nöbette";
  radiusKm: number;
}

export const FLEET_HUBS: FleetHub[] = [
  {
    id: "station-sisli",
    name: "Avrupa Merkez Acil Mobil Filosu (Mecidiyeköy)",
    shortName: "Şişli / Mecidiyeköy HUB",
    lat: 41.0660,
    lng: 28.9950,
    side: "Avrupa",
    activeVehicles: 3,
    chiefElectrician: "Hasan Usta & Ekibi",
    status: "Nöbette",
    radiusKm: 7,
  },
  {
    id: "station-levent",
    name: "Levent & Maslak Plazalar Acil Timi",
    shortName: "Levent / Maslak HUB",
    lat: 41.0850,
    lng: 29.0150,
    side: "Avrupa",
    activeVehicles: 2,
    chiefElectrician: "Mustafa Usta",
    status: "Devriyede",
    radiusKm: 6,
  },
  {
    id: "station-bakirkoy",
    name: "Bakırköy - Ataköy Sahil İstasyonu",
    shortName: "Bakırköy / E-5 HUB",
    lat: 40.9850,
    lng: 28.8750,
    side: "Avrupa",
    activeVehicles: 2,
    chiefElectrician: "Ahmet Usta",
    status: "Nöbette",
    radiusKm: 8,
  },
  {
    id: "station-beylikduzu",
    name: "Beylikdüzü & Esenyurt Metropol Filosu",
    shortName: "Beylikdüzü / E-5 HUB",
    lat: 41.0020,
    lng: 28.6550,
    side: "Avrupa",
    activeVehicles: 3,
    chiefElectrician: "Kerem Usta",
    status: "Devriyede",
    radiusKm: 12,
  },
  {
    id: "station-kadikoy",
    name: "Anadolu Merkez Nöbetçi İstasyonu (Kadıköy)",
    shortName: "Kadıköy / Söğütlüçeşme HUB",
    lat: 40.9930,
    lng: 29.0350,
    side: "Anadolu",
    activeVehicles: 3,
    chiefElectrician: "Murat Usta & Ekibi",
    status: "Nöbette",
    radiusKm: 9,
  },
  {
    id: "station-umraniye",
    name: "Ümraniye & Finans Merkezi Acil Timi",
    shortName: "Ümraniye / Finans HUB",
    lat: 41.0200,
    lng: 29.1190,
    side: "Anadolu",
    activeVehicles: 2,
    chiefElectrician: "Ali Usta",
    status: "Devriyede",
    radiusKm: 10,
  },
];

// Default Istanbul Overview Coordinates
const ISTANBUL_CENTER: [number, number] = [28.9784, 41.0200];
const DEFAULT_ZOOM = 10.2;

// Official CARTO Basemaps API Configuration (1,000,000 requests/month)
export const CARTO_API_KEY = "cb1_4v4y_1_97e9c097c3f94e39b3e3b5a3";
export const CARTO_VECTOR_STYLE = `https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json?key=${CARTO_API_KEY}`;
export const CARTO_RASTER_TILE_URL = `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`;

// In-line CARTO raster style fallback in case of GL style or WebGL issue
const CARTO_RASTER_STYLE = {
  version: 8 as const,
  sources: {
    "carto-voyager": {
      type: "raster" as const,
      tiles: [
        `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
        `https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
        `https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
        `https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`
      ],
      tileSize: 256,
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='https://carto.com/'>CARTO</a>"
    }
  },
  layers: [
    {
      id: "carto-voyager-layer",
      type: "raster" as const,
      source: "carto-voyager",
      minzoom: 0,
      maxzoom: 19
    }
  ]
};

// Generates simulated realistic road curvature waypoints between two coordinates
function generateRoadWaypoints(
  startLng: number, 
  startLat: number, 
  endLng: number, 
  endLat: number
): [number, number][] {
  const points: [number, number][] = [];
  const steps = 14;
  
  // Perpendicular deviation to mimic highways and urban avenues
  const dx = endLng - startLng;
  const dy = endLat - startLat;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const perpX = -dy / (dist || 1);
  const perpY = dx / (dist || 1);
  const curvature = (Math.sin((startLng + endLat) * 100) * 0.08) * dist;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Quadratic bezier ease
    const factor = Math.sin(t * Math.PI) * curvature;
    const lng = startLng + dx * t + perpX * factor;
    const lat = startLat + dy * t + perpY * factor;
    points.push([Number(lng.toFixed(6)), Number(lat.toFixed(6))]);
  }
  return points;
}

export default function CoverageMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const [activeSide, setActiveSide] = useState<"Tümü" | "Avrupa" | "Anadolu">("Tümü");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo | null>(() => {
    return ISTANBUL_DISTRICTS.find(d => d.slug === "sisli") || ISTANBUL_DISTRICTS[0];
  });
  const [nearestHub, setNearestHub] = useState<FleetHub>(FLEET_HUBS[0]);
  const [estimatedArrival, setEstimatedArrival] = useState<string>("15 - 20 Dakika");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [radarActive, setRadarActive] = useState(true);
  const [isHudMinimized, setIsHudMinimized] = useState(false);

  // Filter districts based on side and search query
  const filteredDistricts = useMemo(() => {
    return ISTANBUL_DISTRICTS.filter((d) => {
      const matchesSide = activeSide === "Tümü" || d.side === activeSide;
      const matchesSearch = 
        d.name.toLowerCase().includes(searchDistrict.toLowerCase()) ||
        d.neighborhoods.some(n => n.toLowerCase().includes(searchDistrict.toLowerCase()));
      return matchesSide && matchesSearch;
    });
  }, [activeSide, searchDistrict]);

  // Find the closest Fleet Hub to any district
  const findClosestHub = useCallback((distLat: number, distLng: number, side: "Avrupa" | "Anadolu"): FleetHub => {
    // Prefer hubs on the same side of Bosphorus to prevent bridge delay in calculation
    const eligibleHubs = FLEET_HUBS.filter(h => h.side === side);
    const hubsToConsider = eligibleHubs.length > 0 ? eligibleHubs : FLEET_HUBS;

    let closest = hubsToConsider[0];
    let minDistance = Infinity;

    for (const hub of hubsToConsider) {
      const dLat = hub.lat - distLat;
      const dLng = (hub.lng - distLng) * Math.cos((distLat * Math.PI) / 180);
      const d = Math.sqrt(dLat * dLat + dLng * dLng);
      if (d < minDistance) {
        minDistance = d;
        closest = hub;
      }
    }
    return closest;
  }, []);

  // Initialize MapLibre GL Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Ensure worker URL is explicitly set before creating Map instance
    try {
      const workerUrl = `${window.location.origin}/maplibre-gl-worker.mjs`;
      if (typeof (maplibregl as any).setWorkerUrl === "function") {
        (maplibregl as any).setWorkerUrl(workerUrl);
      }
      if ((maplibregl as any).config) {
        (maplibregl as any).config.WORKER_URL = workerUrl;
      }
    } catch (e) {
      console.warn("Could not set worker URL:", e);
    }

    let map: maplibregl.Map;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: CARTO_VECTOR_STYLE,
        center: ISTANBUL_CENTER,
        zoom: DEFAULT_ZOOM,
        pitch: 25,
        bearing: -5,
        attributionControl: false,
        cooperativeGestures: true, // Prevents scroll hijacking on mobile
      });

      // Add navigation and scale controls
      map.addControl(new maplibregl.NavigationControl({ showCompass: true, visualizePitch: true }), "top-right");
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

      map.on("load", () => {
        setIsMapLoaded(true);
        setMapError(null);
        map.resize();
      });

      // Fallback mechanism in case vector GL tiles have an issue
      map.on("error", (e) => {
        console.warn("CARTO Vector style notice, applying CARTO raster fallback if needed:", e);
        try {
          if (!map.isStyleLoaded()) {
            map.setStyle(CARTO_RASTER_STYLE as any);
          }
        } catch (err) {
          console.error("Map style fallback error:", err);
        }
      });

      const handleResize = () => {
        if (mapRef.current) {
          mapRef.current.resize();
        }
      };
      window.addEventListener("resize", handleResize);

      mapRef.current = map;
    } catch (err: any) {
      console.error("MapLibre initialization failure:", err);
      setMapError("Harita motoru başlatılamadı. WebGL desteği kontrol ediliyor...");
    }

    return () => {
      window.removeEventListener("resize", () => {
        if (mapRef.current) mapRef.current.resize();
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Draw and Animate Approach Route when Selected District Changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded || !selectedDistrict) return;

    const coords = DISTRICT_GPS[selectedDistrict.slug];
    if (!coords) return;

    const hub = findClosestHub(coords.lat, coords.lng, selectedDistrict.side);
    setNearestHub(hub);

    // Calculate simulated transit time (between 15-28 mins depending on distance)
    const latDiff = Math.abs(hub.lat - coords.lat);
    const lngDiff = Math.abs(hub.lng - coords.lng);
    const approxDistKm = Math.round(Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111 * 1.3);
    const approxMins = Math.max(12, Math.min(30, 10 + approxDistKm * 1.5));
    setEstimatedArrival(`${Math.round(approxMins - 3)} - ${Math.round(approxMins + 4)} Dakika`);

    const routeWaypoints = generateRoadWaypoints(hub.lng, hub.lat, coords.lng, coords.lat);

    const routeGeoJson: GeoJSON.Feature<GeoJSON.LineString> = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: routeWaypoints,
      },
    };

    // Add or update vector route layers
    const sourceId = "emergency-dispatch-route";
    const haloLayerId = "route-halo";
    const lineLayerId = "route-line";
    const pulsePointId = "route-moving-van";

    if (map.getSource(sourceId)) {
      (map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(routeGeoJson);
    } else {
      map.addSource(sourceId, {
        type: "geojson",
        data: routeGeoJson,
      });

      // Wide neon glow layer
      map.addLayer({
        id: haloLayerId,
        type: "line",
        source: sourceId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ffb703",
          "line-width": 10,
          "line-opacity": 0.35,
          "line-blur": 3,
        },
      });

      // Sharp central route line
      map.addLayer({
        id: lineLayerId,
        type: "line",
        source: sourceId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0b2e59",
          "line-width": 4.5,
          "line-dasharray": [2, 1],
        },
      });
    }

    // Smooth camera flyTo target district with slight 3D tilt
    // On mobile devices, offset latitude slightly south so the target pin stays in the upper visible area above the bottom card
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const targetLat = isMobile ? coords.lat - 0.012 : coords.lat;
    const targetZoom = isMobile ? 12.2 : 12.8;

    map.flyTo({
      center: [coords.lng, targetLat],
      zoom: targetZoom,
      pitch: isMobile ? 25 : 38,
      bearing: isMobile ? -5 : -12,
      duration: 1200,
      essential: true,
    });
  }, [selectedDistrict, isMapLoaded, findClosestHub]);

  // Render DOM Markers for 39 Districts & 6 Fleet Hubs
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // 1. Render 6 Fleet Hub Radar Markers
    FLEET_HUBS.forEach((hub) => {
      const el = document.createElement("div");
      el.className = "group relative cursor-pointer select-none";
      el.innerHTML = `
        <div class="relative flex items-center justify-center">
          ${radarActive ? `
            <div class="absolute w-12 h-12 rounded-full bg-amber-400/25 animate-ping pointer-events-none"></div>
            <div class="absolute w-8 h-8 rounded-full border border-amber-500/40 animate-pulse pointer-events-none"></div>
          ` : ''}
          <div class="w-7 h-7 rounded-full bg-[#0b2e59] border-2 border-[#ffb703] text-white flex items-center justify-center shadow-lg transition-transform transform hover:scale-110">
            <svg class="w-3.5 h-3.5 fill-[#ffb703] text-[#ffb703]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center z-50 pointer-events-none">
            <div class="bg-slate-950 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap border border-amber-400/30 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>${hub.shortName}</span>
              <span class="text-amber-400">(${hub.activeVehicles} Araç)</span>
            </div>
            <div class="w-1.5 h-1.5 bg-slate-950 rotate-45 -mt-0.5"></div>
          </div>
        </div>
      `;

      el.addEventListener("click", () => {
        map.flyTo({
          center: [hub.lng, hub.lat],
          zoom: 13.5,
          pitch: 35,
          duration: 900,
        });
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([hub.lng, hub.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

    // 2. Render 39 Districts Target Markers
    filteredDistricts.forEach((district) => {
      const coords = DISTRICT_GPS[district.slug];
      if (!coords) return;

      const isSelected = selectedDistrict?.slug === district.slug;
      const isAvrupa = district.side === "Avrupa";

      const el = document.createElement("div");
      el.className = `cursor-pointer select-none transition-transform duration-200 ${isSelected ? "z-40 scale-110" : "z-20 hover:scale-105"}`;

      el.innerHTML = `
        <div class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow-md border ${
          isSelected 
            ? "bg-[#ffb703] text-slate-950 border-white ring-2 ring-amber-400 shadow-amber-500/30 font-extrabold" 
            : isAvrupa 
              ? "bg-white/95 text-slate-800 border-slate-200 hover:border-[#ffb703]" 
              : "bg-white/95 text-slate-800 border-slate-200 hover:border-emerald-500"
        }">
          <span class="w-2 h-2 rounded-full ${isSelected ? "bg-[#0b2e59] animate-pulse" : isAvrupa ? "bg-amber-500" : "bg-emerald-600"}"></span>
          <span class="text-[11px] whitespace-nowrap">${district.name}</span>
        </div>
      `;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedDistrict(district);
        setIsHudMinimized(false);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([coords.lng, coords.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

  }, [filteredDistricts, isMapLoaded, selectedDistrict, radarActive]);

  // Reset to Full Istanbul Overview
  const handleResetOverview = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: ISTANBUL_CENTER,
        zoom: DEFAULT_ZOOM,
        pitch: 15,
        bearing: 0,
        duration: 1100,
      });
    }
  };

  return (
    <div className="relative group space-y-3 font-sans">
      {/* 1. Header Toolbar & Real-time Live Radar Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
        {/* Mobile-First Segmented Side Filter */}
        <div className="grid grid-cols-3 gap-1 w-full sm:w-auto p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveSide("Tümü")}
            className={`px-2.5 py-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer min-h-[38px] flex items-center justify-center ${
              activeSide === "Tümü"
                ? "bg-[#0b2e59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tümü (39)
          </button>
          <button
            type="button"
            onClick={() => setActiveSide("Avrupa")}
            className={`px-2.5 py-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer min-h-[38px] flex items-center justify-center ${
              activeSide === "Avrupa"
                ? "bg-[#0b2e59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Avrupa (25)
          </button>
          <button
            type="button"
            onClick={() => setActiveSide("Anadolu")}
            className={`px-2.5 py-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer min-h-[38px] flex items-center justify-center ${
              activeSide === "Anadolu"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Anadolu (14)
          </button>
        </div>

        {/* Live Radar Fleet Indicator & Reset Button */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] sm:text-xs font-bold">
            <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
            <span>6 Ekip İstasyonu Aktif</span>
          </div>

          <button
            type="button"
            onClick={handleResetOverview}
            title="Tüm İstanbul Haritasını Sıfırla"
            className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#0b2e59] px-2.5 py-1.5 rounded-xl hover:bg-slate-100 bg-slate-50 border border-slate-200 sm:border-transparent transition-colors cursor-pointer min-h-[36px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Haritayı Sıfırla</span>
          </button>
        </div>
      </div>

      {/* 2. MapLibre GL Vector Street Map Container */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-300 shadow-xl bg-slate-900">
        {/* District Fast Search Bar directly embedded on top of map */}
        <div className="absolute top-3 left-3 right-14 sm:right-auto sm:w-80 z-20">
          <div className="relative shadow-lg rounded-xl overflow-hidden bg-white/95 backdrop-blur-md border border-slate-200/90">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              placeholder="İlçe veya mahalle ara (örn: Şişli, Kadıköy)..."
              className="w-full pl-9 pr-8 py-2 sm:py-2.5 text-xs text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
            />
            {searchDistrict && (
              <button
                type="button"
                onClick={() => setSearchDistrict("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                title="Aramayı Temizle"
                aria-label="Aramayı Temizle"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {searchDistrict && filteredDistricts.length > 0 && (
            <div className="mt-1 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-48 overflow-y-auto p-1 text-xs divide-y divide-slate-100">
              {filteredDistricts.slice(0, 6).map((d) => (
                <button
                  key={d.slug}
                  onClick={() => {
                    setSelectedDistrict(d);
                    setIsHudMinimized(false);
                    setSearchDistrict("");
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between font-medium text-slate-700 min-h-[40px]"
                >
                  <span className="font-bold text-[#0b2e59]">{d.name}</span>
                  <span className="text-[10px] text-slate-400">{d.side} Yakası</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Real Vector Street Map Canvas - Responsive height */}
        <div
          ref={mapContainerRef}
          className="w-full h-[400px] sm:h-[480px] md:h-[580px] relative touch-pan-y"
        />

        {/* Legend Overlay at bottom-left (hidden on mobile to keep map clean) */}
        <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-3 px-3 py-2 bg-slate-950/85 backdrop-blur-md text-white rounded-xl border border-white/10 text-[11px] shadow-lg pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb703] border border-white"></span>
            <span>Avrupa Usta Ağı</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white"></span>
            <span>Anadolu Usta Ağı</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Zap className="w-3 h-3 fill-amber-400" />
            <span>Nöbetçi Servis İstasyonları</span>
          </div>
        </div>

        {/* 3. Dynamic Emergency Dispatch HUD Card on Desktop (Inside map canvas) */}
        {selectedDistrict && (
          <div className="hidden sm:block absolute sm:bottom-4 sm:right-4 sm:w-96 z-30 pointer-events-auto">
            <div className="bg-white/98 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-2xl animate-fade-in text-slate-900">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      selectedDistrict.side === "Avrupa" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {selectedDistrict.side} Yakası
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Sokak Ekibi Hazır
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0b2e59] mt-0.5">
                    {selectedDistrict.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="text-right mr-1">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Ulaşım Süresi</span>
                    <span className="text-base font-extrabold text-amber-600 flex items-center justify-end gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {estimatedArrival}
                    </span>
                  </div>
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setSelectedDistrict(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Kapat"
                    aria-label="Kapat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Nearest Hub & Active Unit Indicator */}
              <div className="py-2.5 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-[#0b2e59]" /> En Yakın İstasyon:
                  </span>
                  <span className="font-bold text-slate-800">{nearestHub.shortName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Nöbetçi Usta:
                  </span>
                  <span className="font-semibold text-slate-700">{nearestHub.chiefElectrician}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-0.5 leading-relaxed">
                  TSE belgeli ekipman ve arıza tespit cihazlarıyla 30 dakikada adresteyiz.
                </p>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href="tel:+905300695393"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#e0a000] active:scale-[0.98] text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-transform shadow-md shadow-amber-500/20"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hemen Ustayı Ara (7/24)</span>
                </a>
                <Link
                  to={`/hizmet-bolgeleri/${selectedDistrict.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#0b2e59] hover:bg-[#082244] text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors"
                >
                  <span>İlçe Rehberi</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3b. Mobile Dedicated Station Dispatch Card - Placed CLEANLY BELOW the map canvas so the map is 100% visible and interactive */}
      <div className="block sm:hidden">
        {selectedDistrict ? (
          <div className="bg-white rounded-2xl p-4 border-2 border-[#0b2e59]/15 shadow-lg animate-fade-in text-slate-900">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    selectedDistrict.side === "Avrupa" ? "bg-amber-100 text-amber-900 border border-amber-200" : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                  }`}>
                    {selectedDistrict.side} Yakası
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Sokak Ekibi Hazır
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#0b2e59] mt-1">
                  {selectedDistrict.name} Acil Elektrikçi
                </h3>
              </div>

              <div className="flex items-center gap-1">
                <div className="text-right mr-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Varış</span>
                  <span className="text-xs font-black text-amber-600 flex items-center justify-end gap-0.5">
                    <Clock className="w-3 h-3 text-amber-500" />
                    {estimatedArrival}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDistrict(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg bg-slate-100 active:bg-slate-200 transition-colors"
                  title="Kapat"
                  aria-label="Kapat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Station Details */}
            <div className="py-2.5 text-xs space-y-1.5 text-slate-600">
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                  <Car className="w-3.5 h-3.5 text-[#0b2e59]" /> En Yakın İstasyon:
                </span>
                <span className="font-bold text-slate-900">{nearestHub.shortName}</span>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Nöbetçi Ekip Şefi:
                </span>
                <span className="font-bold text-slate-800">{nearestHub.chiefElectrician}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-col gap-2">
              <a
                href="tel:+905300695393"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#ffb703] active:bg-[#e0a000] text-slate-950 font-black py-3 px-4 rounded-xl text-sm shadow-md shadow-amber-500/25 min-h-[48px]"
              >
                <Phone className="w-4 h-4" />
                <span>Hemen Ustayı Ara (0530 069 53 93)</span>
              </a>
              <Link
                to={`/hizmet-bolgeleri/${selectedDistrict.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0b2e59] active:bg-[#082244] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors min-h-[42px]"
              >
                <span>{selectedDistrict.name} Mahalleri & Sayfasını Gör</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <span className="text-base shrink-0">📍</span>
            <span>
              <strong>Haritadaki bir noktaya dokunun</strong> veya aşağıdaki 39 ilçeden seçin; sokak rotası ve nöbetçi ekip kartı açılır.
            </span>
          </div>
        )}
      </div>

      {/* 4. Quick Select District Pills Bar - Smooth Mobile Horizontal Scroll */}
      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2 px-1">
          <span>⚡ Hızlı İlçe Seçimi (Sokak Rota Simülasyonu)</span>
          <span className="text-slate-400 font-medium">Toplam 39 İlçe</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 sm:flex-wrap sm:max-h-24 sm:overflow-y-auto scroll-smooth">
          {filteredDistricts.map((d) => {
            const isSelected = selectedDistrict?.slug === d.slug;
            return (
              <button
                key={d.slug}
                type="button"
                onClick={() => {
                  setSelectedDistrict(d);
                  setIsHudMinimized(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 sm:shrink transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0b2e59] text-white font-bold shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {d.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
