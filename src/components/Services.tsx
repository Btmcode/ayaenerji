import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Settings, 
  Lightbulb, 
  Server, 
  Wifi, 
  ShieldCheck, 
  Wind, 
  Building2,
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  PhoneCall,
  Sparkles
} from 'lucide-react';

import burnedSocketImg from '../assets/images/burned_electrical_socket_1781970414292.jpg';
import panelRenovateImg from '../assets/images/aya_panel_renovate_1792144825909.jpg';
import klimaAltyapiImg from '../assets/images/aya_elektrik_klima_altyapi_1793030870764.jpg';
import waterHeaterImg from '../assets/images/aya_water_heater_1792144826018.jpg';
import rcdBreakerImg from '../assets/images/aya_rcd_breaker_1792144826116.jpg';
import lightingImg from '../assets/images/aya_lighting_lux_1792144290773.jpg';
import cat7NetworkImg from '../assets/images/aya_cat7_patch_panel_network_1793035684216.jpg';
import fuarStandImg from '../assets/images/aya_fuar_stand_elektrik_1793030886897.jpg';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  path: string;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  badgeColor: string;
}

const services: ServiceItem[] = [
  {
    id: "acil-ariza",
    title: "7/24 Acil Elektrik Arıza",
    subtitle: "15-30 Dk Motorize Servis",
    desc: "Priz yanması, şalter cızırtısı, sigorta atması ve ani elektrik kesintilerinde cihazlı tespit ve anında tamir.",
    path: "/hizmetler/acil-elektrik-ariza",
    imageUrl: burnedSocketImg,
    icon: Zap,
    tag: "Acil Müdahale",
    badgeColor: "bg-red-500"
  },
  {
    id: "pano-yenileme",
    title: "Elektrik Panosu Yenileme",
    subtitle: "Aşırı Akım & Yangın Koruması",
    desc: "Eski, tehlike arz eden sigorta kutularının ve bina dağıtım panolarının güncel yönetmeliklere uygun montajı.",
    path: "/hizmetler/pano-yenileme",
    imageUrl: panelRenovateImg,
    icon: Server,
    tag: "TSE & EMO Onaylı",
    badgeColor: "bg-blue-600"
  },
  {
    id: "klima-kombi",
    title: "Klima & Kombi Altyapısı",
    subtitle: "Panodan Bağımsız Hat",
    desc: "Yüksek akım çeken iklimlendirme ünitelerine 3x2.5mm / 3x4mm yangın korumalı kablo ve özel sigorta çekimi.",
    path: "/hizmetler/klima-kombi-elektrik-altyapisi",
    imageUrl: klimaAltyapiImg,
    icon: Wind,
    tag: "Özel Linye",
    badgeColor: "bg-amber-600"
  },
  {
    id: "kacak-akim",
    title: "Kaçak Akım Rölesi Montajı",
    subtitle: "30mA Hayat Koruma",
    desc: "Sürekli atan veya devreye girmeyen kaçak akım rölelerinin miliamper kaçak testi ve garantili değişimi.",
    path: "/hizmetler/kacak-akim-rolesi",
    imageUrl: rcdBreakerImg,
    icon: ShieldCheck,
    tag: "Can Güvenliği",
    badgeColor: "bg-emerald-600"
  },
  {
    id: "sofben-montaj",
    title: "Şofben & Termosifon Montajı",
    subtitle: "Kalın Kesitli Güç Hattı",
    desc: "Banyo elektrikli ani su ısıtıcıları için topraklama hattı, yüksek amperaj sigorta ve sızdırmaz montaj.",
    path: "/hizmetler/sofben-montaji",
    imageUrl: waterHeaterImg,
    icon: Settings,
    tag: "Garanti Belgeli",
    badgeColor: "bg-sky-600"
  },
  {
    id: "aydinlatma-led",
    title: "Aydınlatma & LED Sistemleri",
    subtitle: "Modern & Düşük Tüketim",
    desc: "Gizli tavan LED ışık havuzları, spot armatür montajı, ray spot sistemleri ve mağaza vitrin aydınlatması.",
    path: "/hizmetler/elektrik-tesisati",
    imageUrl: lightingImg,
    icon: Lightbulb,
    tag: "Dekoratif Tasarım",
    badgeColor: "bg-yellow-600"
  },
  {
    id: "fuar-etkinlik",
    title: "Fuar & Stand Elektriği",
    subtitle: "İFM & TÜYAP Teknik Servis",
    desc: "Fuar stant dağıtım panoları, jeneratör besleme hatları, trifaze makineler ve 7/24 teknik nöbetçi kadro.",
    path: "/hizmetler/fuar-etkinlik-elektrik-kurulumu",
    imageUrl: fuarStandImg,
    icon: Building2,
    tag: "Fuar Alanları",
    badgeColor: "bg-purple-600"
  },
  {
    id: "network-kablo",
    title: "İnternet & Zayıf Akım",
    subtitle: "CAT6 / Fiber Altyapı",
    desc: "Fiber sonlandırma, CAT6 patch panel kablolama, modem yer değişimi, görüntülü diafon ve santral tespiti.",
    path: "/hizmetler/elektrik-tesisati",
    imageUrl: cat7NetworkImg,
    icon: Wifi,
    tag: "Yüksek Hızlı İletim",
    badgeColor: "bg-indigo-600"
  }
];

export default function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

      const card = carouselRef.current.querySelector('article');
      if (card) {
        const cardWidth = card.clientWidth + 16; // width + gap
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(services.length - 1, Math.max(0, index)));
      }
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      updateScrollState();
      return () => el.removeEventListener('scroll', updateScrollState);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('article');
      const cardWidth = card ? card.clientWidth + 16 : 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('article');
      const cardWidth = card ? card.clientWidth + 16 : 320;
      carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section id="hizmetler" className="scroll-mt-24 py-12 sm:py-16 md:py-24 bg-slate-50 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teknik Hizmet Kataloğu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b2e59] tracking-tight">
              Uzmanlık Alanlarımız ve Teknik Servisler
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              İstanbul Avrupa ve Anadolu Yakası'nda TSE standartlarında garantili malzeme, termal ölçüm ve 7/24 nöbetçi mobil usta kadrosu.
            </p>
          </div>

          {/* Controls: Prev/Next Buttons + All Services Link */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <Link
              to="/hizmetler"
              className="text-xs font-bold text-[#0b2e59] hover:text-amber-600 transition-colors pr-2 hidden sm:inline-flex items-center gap-1"
            >
              <span>Tüm Hizmetler</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? "bg-white text-slate-900 border-slate-200 shadow-xs hover:bg-slate-50 active:scale-95"
                    : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50"
                }`}
                aria-label="Önceki hizmetler"
                title="Önceki"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? "bg-[#0b2e59] text-white border-[#0b2e59] shadow-sm hover:bg-[#123e75] active:scale-95"
                    : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50"
                }`}
                aria-label="Sonraki hizmetler"
                title="Sonraki"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Cue Banner (visible on mobile only) */}
        <div className="md:hidden flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Kartları parmağınızla yana kaydırın</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {activeIndex + 1} / {services.length}
          </span>
        </div>

        {/* Horizontal Carousel Container:
            - Mobile: Full touch swipeable snap carousel with peek of next card
            - Desktop: Smooth multi-column scrollable track or grid
        */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-4 sm:gap-6 pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isCardActive = activeIndex === index;

            return (
              <article
                key={service.id}
                className={`snap-center shrink-0 w-[84vw] sm:w-[320px] md:w-[340px] lg:w-[360px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group select-none`}
              >
                {/* Prominent High-Fidelity Service Visual */}
                <Link 
                  to={service.path}
                  className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-900"
                >
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Floating Micro-Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#0b2e59] text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-amber-500" />
                    <span>{service.tag}</span>
                  </div>

                  {/* Subtitle tag on bottom visual edge */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-amber-300 tracking-wide block">
                      {service.subtitle}
                    </span>
                  </div>
                </Link>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={service.path} className="block group-hover:text-[#0b2e59] transition-colors mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {service.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                      {service.desc}
                    </p>
                  </div>

                  {/* Bottom Touch-Friendly Actions (≥44px height for mobile ergonomics) */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      to={service.path}
                      className="min-h-[44px] px-3.5 py-2 text-xs font-bold text-[#0b2e59] hover:text-amber-600 hover:bg-slate-50 rounded-xl transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Hizmet Detayı</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href="tel:05300695393"
                      className="min-h-[44px] px-3.5 py-2 text-xs font-black text-slate-950 bg-[#ffb703] hover:bg-[#e0a000] active:scale-95 rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 shrink-0"
                      title="Nöbetçi Ustayla Görüş"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Usta Çağır</span>
                    </a>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-5">
          {services.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? "w-6 bg-[#0b2e59]" 
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Hizmet ${idx + 1}'e git`}
            />
          ))}
        </div>

        {/* Bottom Fast Support Strip */}
        <div className="mt-10 sm:mt-14 bg-gradient-to-r from-[#0b2e59] to-[#082242] rounded-2xl p-4 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="text-center sm:text-left">
            <h4 className="font-extrabold text-sm sm:text-base text-white">
              Aradığınız teknik hizmeti bulamadınız mı?
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Özel pano projeleri, jeneratör bağlantıları veya büyük ölçekli tesisat işleriniz için mühendisimizle görüşün.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/hizmetler"
              className="flex-1 sm:flex-initial text-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/20"
            >
              Tüm Hizmet Listesi
            </Link>
            <a
              href="tel:05300695393"
              className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl bg-[#ffb703] hover:bg-[#e0a000] text-slate-950 font-black text-xs transition-colors shadow-sm"
            >
              0530 069 53 93
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
