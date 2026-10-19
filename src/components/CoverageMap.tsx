import React, { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ISTANBUL_DISTRICTS, DistrictInfo } from "../data/istanbulDistricts";
import { 
  RotateCcw, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Compass, 
  LayoutGrid, 
  Map as MapIcon, 
  Navigation,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  Search,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

// Precise coordinates for all 39 Istanbul districts
const DISTRICT_COORDINATES: Record<string, { lat: number; lng: number; x: number; y: number }> = {
  // Avrupa Yakası (x, y normalized on 1000x560 canvas)
  arnavutkoy: { lat: 41.1852, lng: 28.7410, x: 280, y: 150 },
  avcilar: { lat: 40.9902, lng: 28.7118, x: 270, y: 380 },
  bagcilar: { lat: 41.0347, lng: 28.8519, x: 380, y: 310 },
  bahcelievler: { lat: 41.0003, lng: 28.8638, x: 385, y: 360 },
  bakirkoy: { lat: 40.9788, lng: 28.8783, x: 400, y: 410 },
  basaksehir: { lat: 41.0967, lng: 28.8052, x: 340, y: 220 },
  bayrampasa: { lat: 41.0450, lng: 28.9050, x: 420, y: 300 },
  besiktas: { lat: 41.0428, lng: 29.0075, x: 505, y: 290 },
  beylikduzu: { lat: 40.9997, lng: 28.6536, x: 210, y: 380 },
  beyoglu: { lat: 41.0315, lng: 28.9784, x: 485, y: 320 },
  buyukcekmece: { lat: 41.0183, lng: 28.5914, x: 150, y: 350 },
  catalca: { lat: 41.1444, lng: 28.4614, x: 80, y: 220 },
  esenler: { lat: 41.0460, lng: 28.8700, x: 395, y: 285 },
  esenyurt: { lat: 41.0343, lng: 28.6801, x: 235, y: 320 },
  eyupsultan: { lat: 41.0478, lng: 28.9338, x: 445, y: 240 },
  fatih: { lat: 41.0082, lng: 28.9784, x: 470, y: 360 },
  gaziosmanpasa: { lat: 41.0710, lng: 28.9020, x: 420, y: 250 },
  gungoren: { lat: 41.0200, lng: 28.8750, x: 395, y: 335 },
  kagithane: { lat: 41.0818, lng: 28.9742, x: 475, y: 245 },
  kucukcekmece: { lat: 41.0000, lng: 28.7800, x: 320, y: 370 },
  sariyer: { lat: 41.1690, lng: 29.0503, x: 535, y: 150 },
  silivri: { lat: 41.0742, lng: 28.2481, x: 30, y: 310 },
  sultangazi: { lat: 41.1000, lng: 28.8900, x: 410, y: 210 },
  sisli: { lat: 41.0601, lng: 28.9874, x: 490, y: 270 },
  zeytinburnu: { lat: 40.9882, lng: 28.9038, x: 430, y: 390 },

  // Anadolu Yakası
  adalar: { lat: 40.8750, lng: 29.1294, x: 620, y: 520 },
  atasehir: { lat: 40.9833, lng: 29.1167, x: 615, y: 375 },
  beykoz: { lat: 41.1167, lng: 29.1000, x: 585, y: 180 },
  cekmekoy: { lat: 41.0333, lng: 29.1833, x: 680, y: 300 },
  kadikoy: { lat: 40.9910, lng: 29.0270, x: 545, y: 395 },
  kartal: { lat: 40.8900, lng: 29.1880, x: 675, y: 465 },
  maltepe: { lat: 40.9250, lng: 29.1333, x: 625, y: 435 },
  pendik: { lat: 40.8750, lng: 29.2333, x: 740, y: 440 },
  sancaktepe: { lat: 41.0000, lng: 29.2333, x: 715, y: 360 },
  sultanbeyli: { lat: 40.9667, lng: 29.2667, x: 750, y: 385 },
  sile: { lat: 41.1750, lng: 29.6133, x: 890, y: 160 },
  tuzla: { lat: 40.8167, lng: 29.3000, x: 810, y: 470 },
  umraniye: { lat: 41.0167, lng: 29.1167, x: 625, y: 330 },
  uskudar: { lat: 41.0250, lng: 29.0167, x: 535, y: 345 },
};

const DEFAULT_CENTER: [number, number] = [41.0350, 28.9850];
const DEFAULT_ZOOM = 10;

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [viewMode, setViewMode] = useState<"interactive" | "osm" | "grid">("interactive");
  const [activeSide, setActiveSide] = useState<"Tümü" | "Avrupa" | "Anadolu">("Tümü");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo | null>(() => {
    return ISTANBUL_DISTRICTS.find(d => d.slug === "sisli") || ISTANBUL_DISTRICTS[0];
  });
  const [osmTileError, setOsmTileError] = useState(false);

  const filteredDistricts = useMemo(() => {
    return ISTANBUL_DISTRICTS.filter((d) => {
      const matchesSide = activeSide === "Tümü" || d.side === activeSide;
      const matchesSearch = d.name.toLowerCase().includes(searchDistrict.toLowerCase()) ||
        d.neighborhoods.some(n => n.toLowerCase().includes(searchDistrict.toLowerCase()));
      return matchesSide && matchesSearch;
    });
  }, [activeSide, searchDistrict]);

  const handleResetView = () => {
    if (mapInstance.current) {
      mapInstance.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM, { animate: true });
    }
  };

  // Setup Leaflet Map only when OSM mode is chosen
  useEffect(() => {
    if (viewMode !== "osm") {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      return;
    }

    if (!mapRef.current) return;

    // Reset container if previously initialized to avoid Leaflet "Map container is already initialized" error
    const container = mapRef.current as any;
    if (container._leaflet_id && mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
      container._leaflet_id = null;
    }

    try {
      const map = L.map(mapRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: true,
        scrollWheelZoom: false,
        trackResize: true,
      });
      mapInstance.current = map;

      // Multi-layer open-source resilient architecture:
      // Primary: Official OpenStreetMap Tile Server
      const osmStandard = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        crossOrigin: true,
      });

      // Secondary fallback: CARTO Voyager
      const cartoVoyager = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; CARTO &amp; OpenStreetMap',
        subdomains: ["a", "b", "c", "d"],
        maxZoom: 19,
      });

      osmStandard.addTo(map);

      let tileFailCount = 0;
      osmStandard.on("tileerror", () => {
        tileFailCount++;
        if (tileFailCount > 3 && !map.hasLayer(cartoVoyager)) {
          setOsmTileError(true);
          cartoVoyager.addTo(map);
        }
      });

      // Add 39 District Markers
      ISTANBUL_DISTRICTS.forEach((district) => {
        const coords = DISTRICT_COORDINATES[district.slug];
        if (!coords) return;
        const isAvrupa = district.side === "Avrupa";

        const customIcon = L.divIcon({
          className: "custom-map-pin",
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full ${
                isAvrupa ? "bg-amber-400/40" : "bg-emerald-400/40"
              } opacity-75"></span>
              <div class="relative flex items-center justify-center rounded-full h-5 w-5 ${
                isAvrupa ? "bg-[#0b2e59]" : "bg-emerald-700"
              } border-2 border-white shadow-md transition-transform group-hover:scale-125">
                <span class="h-1.5 w-1.5 rounded-full ${
                  isAvrupa ? "bg-[#ffb703]" : "bg-emerald-200"
                }"></span>
              </div>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        const popupContent = `
          <div style="font-family: inherit; font-size: 13px; padding: 4px; min-width: 230px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: #0b2e59; font-size: 15px;">${district.name}</strong>
              <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 9999px; background-color: ${
                isAvrupa ? "#fef3c7; color: #92400e" : "#dcfce7; color: #166534"
              }">${district.side}</span>
            </div>
            <p style="color: #475569; margin: 0 0 8px 0; font-size: 12px; line-height: 1.4;">${district.description.substring(0, 100)}...</p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: #64748b; margin-bottom: 3px;">
                <span>Ulaşım Süresi:</span>
                <strong style="color: #0f172a;">${district.averageArrivalTime}</strong>
              </div>
              <div style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: #16a34a; font-weight: 600;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #22c55e;"></span>
                7/24 Nöbetçi Ekip Hazır
              </div>
            </div>
            <div style="display: flex; gap: 6px;">
              <a href="tel:+905300695393" style="flex: 1; text-align: center; background-color: #ffb703; color: #0b2e59; font-weight: 700; font-size: 12px; padding: 7px 8px; border-radius: 6px; text-decoration: none;">
                Hemen Keşif İste
              </a>
              <a href="/hizmet-bolgeleri/${district.slug}" style="flex: 1; text-align: center; background-color: #0b2e59; color: white; font-weight: 600; font-size: 12px; padding: 7px 8px; border-radius: 6px; text-decoration: none;">
                İlçe Rehberi
              </a>
            </div>
          </div>
        `;

        L.marker([coords.lat, coords.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent);
      });

      // Ensure zero-gray screen: Trigger invalidateSize on multiple layout frames
      const trigger = () => {
        if (mapInstance.current) {
          mapInstance.current.invalidateSize();
        }
      };

      trigger();
      const t1 = setTimeout(trigger, 80);
      const t2 = setTimeout(trigger, 250);
      const t3 = setTimeout(trigger, 600);
      const t4 = setTimeout(trigger, 1200);

      const resizeObserver = new ResizeObserver(() => trigger());
      if (mapRef.current) resizeObserver.observe(mapRef.current);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        resizeObserver.disconnect();
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    } catch (err) {
      console.error("Leaflet harita başlatma hatası:", err);
      setViewMode("interactive");
    }
  }, [viewMode]);

  return (
    <div className="relative group space-y-4 font-sans">
      {/* Top View Toggle Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 p-1 bg-slate-100 rounded-xl max-w-full">
          <button
            type="button"
            onClick={() => setViewMode("interactive")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
              viewMode === "interactive"
                ? "bg-[#0b2e59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#ffb703] shrink-0" />
            <span>İnteraktif Harita</span>
            <span className="hidden xs:inline text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded">
              %100 Canlı
            </span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("osm")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
              viewMode === "osm"
                ? "bg-[#0b2e59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Sokak (OSM)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#0b2e59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
            <span>İlçe Tablosu ({filteredDistricts.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-slate-800">39 İlçe 7/24 Aktif Mobil Usta Filosu</span>
        </div>
      </div>

      {/* 1. Bulletproof Interactive Vector Map (Zero Network Failure, Zero Gray Screen) */}
      {viewMode === "interactive" && (
        <div className="bg-slate-900 rounded-3xl p-4 md:p-6 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

          {/* District Filter & Search Toolbar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveSide("Tümü")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSide === "Tümü" ? "bg-[#ffb703] text-slate-950 font-extrabold shadow-sm" : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Tümü (39)
              </button>
              <button
                type="button"
                onClick={() => setActiveSide("Avrupa")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSide === "Avrupa" ? "bg-amber-400 text-slate-950 font-extrabold shadow-sm" : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Avrupa (25)
              </button>
              <button
                type="button"
                onClick={() => setActiveSide("Anadolu")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSide === "Anadolu" ? "bg-emerald-400 text-slate-950 font-extrabold shadow-sm" : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Anadolu (14)
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                placeholder="İlçe veya mahalle ara..."
                className="w-full pl-9 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb703]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Interactive SVG Canvas */}
            <div className="lg:col-span-8 relative bg-slate-950/70 rounded-2xl border border-white/10 p-2 md:p-4 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-white/60 mb-2 px-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ffb703]"></span> Avrupa (25)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Anadolu (14)
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#ffb703] font-semibold">
                  Noktaya Tıklayarak Ulaşım Süresini İnceleyin
                </span>
              </div>

              <svg
                viewBox="0 0 1000 560"
                className="w-full h-auto select-none"
                style={{ maxHeight: "460px", minHeight: "300px", touchAction: "pan-y" }}
              >
                <defs>
                  <linearGradient id="marmaraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#082242" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#030e1d" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Marmara Sea / Coast Watermark */}
                <rect width="1000" height="560" fill="url(#marmaraGrad)" rx="16" />
                
                {/* Istanbul Waterways (Black Sea Top, Marmara Bottom, Bosphorus Strait) */}
                <path
                  d="M 520,50 Q 515,160 500,220 T 525,330 Q 550,400 535,520"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="18"
                  strokeOpacity="0.35"
                  strokeLinecap="round"
                />
                <text x="515" y="275" fill="#38bdf8" opacity="0.6" fontSize="11" fontWeight="700" textAnchor="middle" transform="rotate(-75 515 275)">
                  İSTANBUL BOĞAZI
                </text>

                {/* Bridges */}
                {/* 15 Temmuz Köprüsü */}
                <line x1="495" y1="310" x2="540" y2="330" stroke="#ffb703" strokeWidth="2.5" strokeDasharray="3 2" opacity="0.8" />
                {/* Fatih Sultan Mehmet Köprüsü */}
                <line x1="510" y1="210" x2="560" y2="230" stroke="#ffb703" strokeWidth="2.5" strokeDasharray="3 2" opacity="0.8" />
                {/* Yavuz Sultan Selim Köprüsü */}
                <line x1="520" y1="90" x2="570" y2="105" stroke="#ffb703" strokeWidth="2.5" strokeDasharray="3 2" opacity="0.8" />

                {/* Halic (Golden Horn) */}
                <path
                  d="M 490,325 Q 450,330 430,305"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="8"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />

                {/* District Coverage Beacons */}
                {filteredDistricts.map((district) => {
                  const coords = DISTRICT_COORDINATES[district.slug];
                  if (!coords) return null;
                  const isSelected = selectedDistrict?.slug === district.slug;
                  const isAvrupa = district.side === "Avrupa";

                  return (
                    <g
                      key={district.slug}
                      transform={`translate(${coords.x}, ${coords.y})`}
                      className="cursor-pointer transition-all"
                      onClick={() => setSelectedDistrict(district)}
                    >
                      {/* Pulse Circle for active districts */}
                      <circle
                        r={isSelected ? "18" : "10"}
                        fill={isAvrupa ? "#ffb703" : "#34d399"}
                        opacity={isSelected ? "0.35" : "0.15"}
                        className={isSelected ? "animate-ping" : ""}
                      />

                      {/* Main Node Point */}
                      <circle
                        r={isSelected ? "8" : "5"}
                        fill={isAvrupa ? "#ffb703" : "#10b981"}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? "2.5" : "1.5"}
                        filter={isSelected ? "url(#glowEffect)" : undefined}
                      />

                      {/* District Label */}
                      <text
                        y={coords.y > 450 ? -10 : 16}
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : isAvrupa ? "#fef08a" : "#a7f3d0"}
                        fontSize={isSelected ? "12" : "10"}
                        fontWeight={isSelected ? "800" : "600"}
                        className="pointer-events-none drop-shadow"
                      >
                        {district.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected District Fast Response Card */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
              {selectedDistrict ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedDistrict.side === "Avrupa" ? "bg-amber-400/20 text-amber-300" : "bg-emerald-400/20 text-emerald-300"
                      }`}>
                        {selectedDistrict.side} Yakası Hizmet Bölgesi
                      </span>
                      <h3 className="text-2xl font-extrabold text-white mt-1">
                        {selectedDistrict.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/50 block">Varış Süresi</span>
                      <span className="text-base font-extrabold text-[#ffb703] flex items-center gap-1 justify-end">
                        <Clock className="w-3.5 h-3.5" />
                        {selectedDistrict.averageArrivalTime}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed">
                    {selectedDistrict.description}
                  </p>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Mobil Acil Müdahale Ekibi Hazır</span>
                    </div>
                    <div className="text-white/60 text-[11px]">
                      Öncelikli Mahalleler: {selectedDistrict.neighborhoods.slice(0, 4).join(", ")}...
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <a
                      href="tel:+905300695393"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#ffb703] text-slate-950 font-bold px-4 py-3 rounded-xl text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Hemen Keşif İste</span>
                    </a>
                    <Link
                      to={`/hizmet-bolgeleri/${selectedDistrict.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl text-xs transition-colors"
                    >
                      <span>İlçe Rehberi</span>
                      <ExternalLink className="w-3 h-3 text-white/60" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-white/50 text-xs">
                  Detayları görmek için haritadaki ilçelerden birine tıklayın.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. OpenStreetMap / Leaflet View Mode (With Fail-Safe Recovery) */}
      {viewMode === "osm" && (
        <div className="relative">
          {osmTileError && (
            <div className="p-3 mb-2 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs flex items-center justify-between">
              <span>Harita sağlayıcısı yanıt veremediğinde otomatik alternatif yedek CDN devreye alınmıştır.</span>
              <button
                type="button"
                onClick={() => setViewMode("interactive")}
                className="font-bold underline text-[#0b2e59]"
              >
                Vektör Haritaya Geç
              </button>
            </div>
          )}

          <div
            ref={mapRef}
            style={{ minHeight: "480px", width: "100%", height: "520px" }}
            className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 z-10 bg-slate-100"
          />

          {/* Floating Top Status Card */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-bold rounded-xl shadow-md border border-slate-200/90 z-20 flex items-center gap-3 pointer-events-auto">
            <div className="flex items-center gap-1.5 text-[#0b2e59]">
              <span className="w-2 h-2 rounded-full bg-[#0b2e59]"></span> Avrupa (25)
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800 border-l border-slate-200 pl-3">
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span> Anadolu (14)
            </div>
          </div>

          {/* Re-center button */}
          <button
            onClick={handleResetView}
            title="Haritayı İstanbul Merkezine Sıfırla"
            className="absolute bottom-6 left-4 bg-white/95 hover:bg-white text-[#0b2e59] text-xs font-semibold px-3 py-2 rounded-xl shadow-md border border-slate-200 z-20 flex items-center gap-1.5 transition-all hover:shadow-lg active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#ffb703]" />
            <span>Haritayı Ortala</span>
          </button>
        </div>
      )}

      {/* 3. District Grid View */}
      {viewMode === "grid" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveSide("Tümü")}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeSide === "Tümü" ? "bg-[#0b2e59] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Tümü (39)
              </button>
              <button
                type="button"
                onClick={() => setActiveSide("Avrupa")}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeSide === "Avrupa" ? "bg-[#0b2e59] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Avrupa (25)
              </button>
              <button
                type="button"
                onClick={() => setActiveSide("Anadolu")}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeSide === "Anadolu" ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Anadolu (14)
              </button>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                placeholder="İlçe ara (örn: Beşiktaş, Kadıköy)..."
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDistricts.map((district) => (
              <div
                key={district.slug}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-[#0b2e59]/30 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-sm">{district.name}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        district.side === "Avrupa"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {district.side}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {district.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-3">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ortalama Varış: {district.averageArrivalTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <a
                    href="tel:+905300695393"
                    className="flex-1 inline-flex items-center justify-center gap-1 bg-[#ffb703] text-slate-950 font-bold py-1.5 px-2 rounded-lg text-xs hover:bg-amber-400 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Hemen Keşif İste</span>
                  </a>
                  <Link
                    to={`/hizmet-bolgeleri/${district.slug}`}
                    className="flex-1 text-center bg-[#0b2e59] text-white font-semibold py-1.5 px-2 rounded-lg text-xs hover:bg-[#082244] transition-colors"
                  >
                    İlçe Rehberi
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
