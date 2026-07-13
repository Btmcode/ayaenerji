import React, { useEffect, useRef } from "react";
import L from "leaflet";

interface DistrictPin {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

const districtsList: DistrictPin[] = [
  { name: "Arnavutköy", lat: 41.1852, lng: 28.7410, description: "Arnavutköy genelinde 7/24 nöbetçi acil elektrikçi ekibimiz hazır beklemektedir." },
  { name: "Avcılar", lat: 40.9902, lng: 28.7118, description: "Avcılar merkez ve tüm mahallelerinde acil teknik servis hizmeti sunuyoruz." },
  { name: "Bağcılar", lat: 41.0347, lng: 28.8519, description: "Bağcılar bölge mobil ekiplerimizle en geç 25 dakikada adresinizdeyiz." },
  { name: "Bahçelievler", lat: 41.0003, lng: 28.8638, description: "Bahçelievler'de ev ve iş yerleri için kesintisiz elektrik servis desteği." },
  { name: "Bakırköy", lat: 40.9788, lng: 28.8783, description: "Bakırköy sahili ve çevre mahallelerine hızlı servis aracı yönlendirilir." },
  { name: "Başakşehir", lat: 41.0967, lng: 28.8052, description: "Başakşehir ve İkitelli OSB çevresinde uzman endüstriyel müdahale ekibi." },
  { name: "Bayrampaşa", lat: 41.0450, lng: 28.9050, description: "Bayrampaşa bölgesindeki ticari tesis ve konutlara acil elektrik tamiri." },
  { name: "Beşiktaş", lat: 41.0428, lng: 29.0075, description: "Beşiktaş genelinde akıllı ev ve her türlü elektrik arızasına uzman çözüm." },
  { name: "Beylikdüzü", lat: 40.9997, lng: 28.6536, description: "Beylikdüzü'nde lüks siteler ve iş merkezleri için 7/24 hizmetinizdeyiz." },
  { name: "Beyoğlu", lat: 41.0315, lng: 28.9784, description: "Tarihi yapılara özel hassasiyetle, Beyoğlu'nda uzman tesisat desteği." },
  { name: "Büyükçekmece", lat: 41.0183, lng: 28.5914, description: "Büyükçekmece ve yazlık villalar bölgesi için acil nöbetçi elektrikçi." },
  { name: "Çatalca", lat: 41.1444, lng: 28.4614, description: "Çatalca merkez ve çevre köylerine mobil ekiplerimizle ulaşım sağlıyoruz." },
  { name: "Esenler", lat: 41.0460, lng: 28.8700, description: "Esenler tüm mahallelerinde sigorta, kablo ve pano arıza onarımı." },
  { name: "Esenyurt", lat: 41.0343, lng: 28.6801, description: "Esenyurt genelinde kalabalık nufüsa uygun, çoklu mobil destek ağımız." },
  { name: "Eyüpsultan", lat: 41.0478, lng: 28.9338, description: "Eyüpsultan genelinde evsel ve ticari elektrik servis hizmetleri." },
  { name: "Fatih", lat: 41.0082, lng: 28.9784, description: "Tarihi Yarımada Fatih'te tecrübeli ustalarımızla güvence altındasınız." },
  { name: "Gaziosmanpaşa", lat: 41.0710, lng: 28.9020, description: "Gaziosmanpaşa genelinde güvenli ve hızlı elektrikçi kadromuz aktiftir." },
  { name: "Güngören", lat: 41.0200, lng: 28.8750, description: "Güngören bölgesi konut ve tekstil atölyeleri için acil elektrik desteği." },
  { name: "Kağıthane", lat: 41.0818, lng: 28.9742, description: "Kağıthane'de iş yerleri ve gökdelen ofisleri için hızlı teknik ekip." },
  { name: "Küçükçekmece", lat: 41.0000, lng: 28.7800, description: "Küçükçekmece genelinde acil elektrik arıza ihbarlarına anında yanıt." },
  { name: "Sarıyer", lat: 41.1690, lng: 29.0503, description: "Sarıyer sahili, yalılar ve villalar için 7/24 özel servis desteği." },
  { name: "Silivri", lat: 41.0742, lng: 28.2481, description: "Silivri bölgesi boyunca yazlık evler ve fabrikalara 7/24 kesintisiz hizmet." },
  { name: "Sultangazi", lat: 41.1000, lng: 28.8900, description: "Sultangazi'de şalter arızaları, aydınlatma ve tesisat yenileme." },
  { name: "Şişli", lat: 41.0601, lng: 28.9874, description: "Şişli Merkez ve tüm ara sokaklarında 7/24 elektrik bakım onarım." },
  { name: "Zeytinburnu", lat: 40.9882, lng: 28.9038, description: "Zeytinburnu sanayi ve sitelerinde anında profesyonel elektrik müdahale." }
];

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if it hasn't been initialized yet
    if (!mapInstance.current) {
      // Create map focusing on center of Istanbul's European Side (between Çatalca/Silivri and Beşiktaş)
      mapInstance.current = L.map(mapRef.current, {
        center: [41.0700, 28.6900],
        zoom: 9.5,
        zoomControl: true,
        scrollWheelZoom: false, // Prevent accidental scrolling when browsing page
      });

      // Add gorgeous CartoDB light_all clean map style tile layer via our secure proxy
      L.tileLayer(
        "/api/tiles/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 20,
        },
      ).addTo(mapInstance.current);

      // Create interactive pins for all 25 districts
      districtsList.forEach((dist) => {
        // Create an awesome custom branded pulsating marker using leaflet HTML L.divIcon
        const customIcon = L.divIcon({
          className: "custom-map-pin",
          html: `
            <div class="relative flex items-center justify-center">
              <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#ffb703]/30 opacity-75"></span>
              <div class="relative flex items-center justify-center rounded-full h-6 w-6 bg-[#0b2e59] border-2 border-white shadow-md">
                <span class="h-2 w-2 rounded-full bg-[#ffb703]"></span>
              </div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        // Setup Marker with Popups
        L.marker([dist.lat, dist.lng], { icon: customIcon }).addTo(
          mapInstance.current!,
        ).bindPopup(`
            <div style="font-family: inherit; font-size: 14px; padding: 4px; min-width: 180px;">
              <strong style="color: #0b2e59; font-size: 15px; display: block; margin-bottom: 4px;">${dist.name} Bölgesi</strong>
              <p style="color: #475569; margin: 0; line-height: 1.4; font-size: 13px;">${dist.description}</p>
              <div style="margin-top: 8px; font-weight: bold; color: #ffb703; display: flex; align-items: center; gap: 4px; font-size: 12px;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #22c55e;"></span> Nöbetçi Ekip Aktif
              </div>
            </div>
          `);
      });
    }

    // Clean up
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 isolation-auto z-10"
      />
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 text-xs font-bold rounded-lg shadow-md border border-slate-200 z-20 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-[#0b2e59]">7/24 Canlı Mobil Takip Aktif</span>
      </div>
    </div>
  );
}
