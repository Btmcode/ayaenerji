import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Zap,
  ShieldCheck,
  Calculator,
  Building2,
  BatteryCharging,
  Camera,
  Network,
  Sun,
  FileText,
  Users,
  MapPin,
  MessageCircle,
  HelpCircle,
  Award,
  Sparkles
} from "lucide-react";
import Logo from "./Logo";
import { getWhatsAppLink } from "../utils/whatsapp";

interface SubItem {
  label: string;
  href: string;
  desc?: string;
  icon?: React.ReactNode;
}

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleDropdownEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuName);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const toggleMobileAccordion = (name: string) => {
    setMobileAccordion((prev) => (prev === name ? null : name));
  };

  const servicesItems: SubItem[] = [
    {
      label: "Acil Elektrik Arıza (7/24)",
      href: "/hizmetler/acil-elektrik-ariza",
      desc: "İstanbul genelinde 30 dakikada nöbetçi usta servisi",
      icon: <Zap className="w-4 h-4 text-amber-500" />
    },
    {
      label: "EV Şarj İstasyonu (Wallbox)",
      href: "/hizmetler/elektrikli-arac-sarj-istasyonu",
      desc: "Togg, Tesla uyumlu 11kW/22kW Tip-B korumalı kurulum",
      icon: <BatteryCharging className="w-4 h-4 text-emerald-500" />
    },
    {
      label: "Güvenlik Kamerası & Diafon",
      href: "/hizmetler/guvenlik-sistemleri-kamera-diafon",
      desc: "IP gece görüşlü kamera, Audio & Netelsan diafon sistemleri",
      icon: <Camera className="w-4 h-4 text-blue-500" />
    },
    {
      label: "Elektrik Panosu & Şalt Yenileme",
      href: "/hizmetler/pano-yenileme",
      desc: "Yangın önleyici kaçak akım rölesi ve kompakt şalter değişimi",
      icon: <ShieldCheck className="w-4 h-4 text-indigo-500" />
    },
    {
      label: "Telekom, Cat6 & Fiber Altyapı",
      href: "/hizmetler/telekomunikasyon-network-altyapi",
      desc: "Yapısal data kablolaması, rack kabinet ve fiber sonlandırma",
      icon: <Network className="w-4 h-4 text-cyan-500" />
    },
    {
      label: "Güneş Paneli (Solar GES) Bakımı",
      href: "/hizmetler/gunes-paneli-solar-enerji",
      desc: "Çatı GES solar invertör onarımı, termal test ve DC parafudr",
      icon: <Sun className="w-4 h-4 text-amber-600" />
    },
    {
      label: "Klima & Kombi Bağımsız Linye",
      href: "/hizmetler/klima-kombi-elektrik-altyapisi",
      desc: "Yüksek akım korumalı bağımsız linye ve sigorta çekimi",
      icon: <Sparkles className="w-4 h-4 text-teal-500" />
    },
    {
      label: "Fuar & Etkinlik Elektrik Altyapısı",
      href: "/hizmetler/fuar-etkinlik-elektrik-kurulumu",
      desc: "İFM Yeşilköy, TÜYAP, Lütfi Kırdar geçici stant panoları",
      icon: <Building2 className="w-4 h-4 text-purple-500" />
    }
  ];

  const engineeringTools: SubItem[] = [
    {
      label: "Kablo Kesiti & Gerilim Düşümü",
      href: "/hesaplama-araclari",
      desc: "Monofaze/Trifaze bakır ve alüminyum iletken hesabı",
      icon: <Calculator className="w-4 h-4 text-amber-500" />
    },
    {
      label: "EV Wallbox Şarj Süresi",
      href: "/hesaplama-araclari",
      desc: "Batarya kapasitesi ve şarj gücü simülasyonu",
      icon: <BatteryCharging className="w-4 h-4 text-emerald-500" />
    },
    {
      label: "Pano Kurulu Güç & Sigorta Hesabı",
      href: "/hesaplama-araclari",
      desc: "Talep faktörü ve otomatik sigorta amperajı",
      icon: <ShieldCheck className="w-4 h-4 text-blue-500" />
    },
    {
      label: "Güneş Paneli (Solar GES) Üretim",
      href: "/hesaplama-araclari",
      desc: "Marmara ışınım katsayısıyla yıllık kWh hesabı",
      icon: <Sun className="w-4 h-4 text-orange-500" />
    },
    {
      label: "LED Aydınlatma & Lümen İhtiyacı",
      href: "/hesaplama-araclari",
      desc: "EN 12464-1 standartlarına uygun oda lümen hesabı",
      icon: <Sparkles className="w-4 h-4 text-teal-500" />
    }
  ];

  const corporateItems: SubItem[] = [
    {
      label: "Hakkımızda",
      href: "/hakkimizda",
      desc: "Aya Elektrik kurumsal profili ve deneyimli usta kadromuz",
      icon: <Building2 className="w-4 h-4 text-blue-500" />
    },
    {
      label: "Kariyer & Ekibimize Katıl",
      href: "/ekibimize-katil",
      desc: "Elektrik ustası ve teknisyen istihdam olanaklarımız",
      icon: <Users className="w-4 h-4 text-emerald-500" />
    },
    {
      label: "Editoryal İlkeler (E-E-A-T)",
      href: "/editoryal-ilkeler",
      desc: "Uzman usta denetimli yayın politikası ve doğruluk standardı",
      icon: <Award className="w-4 h-4 text-amber-500" />
    },
    {
      label: "Sıkça Sorulan Sorular (SSS)",
      href: "/sss",
      desc: "Fiyatlandırma, servis süresi ve garanti koşulları",
      icon: <HelpCircle className="w-4 h-4 text-indigo-500" />
    }
  ];

  const isCurrentSection = (basePath: string) => {
    if (basePath === "/") return location.pathname === "/";
    return location.pathname.startsWith(basePath);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 
        TOP BAR CONTRACT:
        Exact 1-row, 3-zone contract separated by gap-8:
        [Brand wordmark, one line] — [4–5 clean nav links, single-line] — [1 primary action]
      */}
      <nav
        className={`w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs py-3 border-b border-slate-200/90"
            : "bg-white py-3.5 border-b border-slate-100"
        }`}
        aria-label="Ana Gezinti"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          
          {/* ZONE 1: BRAND LOGO (Single Wordmark Element) */}
          <Link
            to="/"
            className="shrink-0 flex items-center group py-0.5"
            aria-label="Aya Elektrik Anasayfa"
          >
            <Logo
              variant="dark"
              className="w-36 sm:w-44 h-auto transition-transform duration-200 group-hover:scale-[1.01]"
            />
          </Link>

          {/* ZONE 2: NAVIGATION LINKS (Single-line, clean typography with subtle dropdowns) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* 1. Hizmetlerimiz (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("hizmetler")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "hizmetler" ? null : "hizmetler")}
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold tracking-tight rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isCurrentSection("/hizmetler")
                    ? "text-[#0b2e59] bg-slate-100 font-bold"
                    : "text-slate-700 hover:text-[#0b2e59] hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "hizmetler"}
              >
                <span>Hizmetlerimiz</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    activeDropdown === "hizmetler" ? "rotate-180 text-amber-500" : "text-slate-400"
                  }`}
                />
              </button>

              {/* Services Mega-Dropdown */}
              {activeDropdown === "hizmetler" && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[620px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in duration-100">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-amber-50 text-[#0b2e59] transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-slate-900 group-hover:text-[#0b2e59] transition-colors truncate">
                          {item.label}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <div className="col-span-2 mt-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2">
                    <span className="text-xs text-slate-500">
                      TSE standartlarına uygun garantili elektrik arıza, bakım ve onarım.
                    </span>
                    <Link
                      to="/hizmetler"
                      className="text-xs font-bold text-[#0b2e59] hover:text-amber-600 flex items-center gap-1 group"
                    >
                      <span>Tüm Hizmetler</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Hesaplama Araçları (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("hesaplama")}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/hesaplama-araclari"
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold tracking-tight rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isCurrentSection("/hesaplama-araclari")
                    ? "text-[#0b2e59] bg-slate-100 font-bold"
                    : "text-slate-700 hover:text-[#0b2e59] hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "hesaplama"}
              >
                <span>Hesaplama Araçları</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    activeDropdown === "hesaplama" ? "rotate-180 text-amber-500" : "text-slate-400"
                  }`}
                />
              </Link>

              {activeDropdown === "hesaplama" && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 flex flex-col gap-1 z-50 animate-in fade-in duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    5 İnteraktif Hesaplama Modülü
                  </div>
                  {engineeringTools.map((tool) => (
                    <Link
                      key={tool.label}
                      to={tool.href}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-slate-900 group-hover:text-[#0b2e59] transition-colors truncate">
                          {tool.label}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                          {tool.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/hesaplama-araclari"
                    className="mt-1 pt-2 border-t border-slate-100 text-center text-xs font-bold text-[#0b2e59] hover:text-amber-600 block py-1"
                  >
                    Tüm Hesaplama Araçlarına Git →
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Kurumsal (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("kurumsal")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "kurumsal" ? null : "kurumsal")}
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold tracking-tight rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isCurrentSection("/hakkimizda") ||
                  isCurrentSection("/kunye") ||
                  isCurrentSection("/editoryal-ilkeler") ||
                  isCurrentSection("/ekibimize-katil")
                    ? "text-[#0b2e59] bg-slate-100 font-bold"
                    : "text-slate-700 hover:text-[#0b2e59] hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "kurumsal"}
              >
                <span>Kurumsal</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    activeDropdown === "kurumsal" ? "rotate-180 text-amber-500" : "text-slate-400"
                  }`}
                />
              </button>

              {activeDropdown === "kurumsal" && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 flex flex-col gap-1 z-50 animate-in fade-in duration-100">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Kurumsal Kimlik & İlkeler
                  </div>
                  {corporateItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 text-[#0b2e59] group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-slate-900 group-hover:text-[#0b2e59] transition-colors truncate">
                          {item.label}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Bölgelerimiz */}
            <Link
              to="/bolgelerimiz"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-tight rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isCurrentSection("/bolgelerimiz") || isCurrentSection("/hizmet-bolgeleri")
                  ? "text-[#0b2e59] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#0b2e59] hover:bg-slate-50"
              }`}
            >
              Bölgelerimiz
            </Link>

            {/* 5. Blog */}
            <Link
              to="/blog"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-tight rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isCurrentSection("/blog")
                  ? "text-[#0b2e59] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#0b2e59] hover:bg-slate-50"
              }`}
            >
              Blog
            </Link>

            {/* 6. İletişim */}
            <Link
              to="/iletisim"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-tight rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isCurrentSection("/iletisim")
                  ? "text-[#0b2e59] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#0b2e59] hover:bg-slate-50"
              }`}
            >
              İletişim
            </Link>
          </div>

          {/* ZONE 3: 1 PRIMARY ACTION (Top Bar Contract: Exactly 1 action button) */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="tel:+905300695393"
              className="flex items-center gap-2 bg-[#ffb703] hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow-sm active:scale-95 whitespace-nowrap shrink-0"
              aria-label="7/24 Acil Elektrikçi Hattını Arayın: 0530 069 53 93"
            >
              <Phone className="w-3.5 h-3.5 fill-slate-950" />
              <span>0530 069 53 93 · Hemen Ara</span>
            </a>
          </div>

          {/* MOBILE ACTION ZONE (< 1024px) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <a
              href="tel:+905300695393"
              aria-label="Acil Ara: 0530 069 53 93"
              className="flex items-center gap-1.5 bg-[#ffb703] text-slate-950 px-3 py-2 rounded-xl font-bold text-xs shadow-xs min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 fill-slate-950" />
              <span>0530 069 53 93</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMobileOpen ? "Menüyü Kapat" : "Menüyü Aç"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE SLIDE-OVER DRAWER (Touches, ergonomics and zero overflow) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 lg:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[86%] max-w-sm bg-white z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-200 ease-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center"
          >
            <Logo variant="dark" className="w-32 h-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-slate-100">
          
          <div className="py-2">
            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
            >
              <span>Ana Sayfa</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Accordion: Hizmetlerimiz */}
          <div className="py-2">
            <button
              type="button"
              onClick={() => toggleMobileAccordion("hizmetler")}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Hizmetlerimiz
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  mobileAccordion === "hizmetler" ? "rotate-180 text-amber-500" : ""
                }`}
              />
            </button>

            {mobileAccordion === "hizmetler" && (
              <div className="mt-1 pl-3 pr-1 py-1 flex flex-col gap-1 border-l-2 border-amber-400 ml-3">
                {servicesItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors min-h-[40px]"
                  >
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
                <Link
                  to="/hizmetler"
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 px-2.5 text-xs font-bold text-[#0b2e59] hover:underline"
                >
                  Tüm Hizmetler Sayfası →
                </Link>
              </div>
            )}
          </div>

          {/* Accordion: Hesaplama Araçları */}
          <div className="py-2">
            <button
              type="button"
              onClick={() => toggleMobileAccordion("hesaplama")}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-500" />
                Hesaplama Araçları
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                5 Araç
              </span>
            </button>

            {mobileAccordion === "hesaplama" && (
              <div className="mt-1 pl-3 pr-1 py-1 flex flex-col gap-1 border-l-2 border-amber-400 ml-3">
                {engineeringTools.map((tool) => (
                  <Link
                    key={tool.label}
                    to={tool.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors min-h-[40px]"
                  >
                    <span>{tool.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
                <Link
                  to="/hesaplama-araclari"
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 px-2.5 text-xs font-bold text-[#0b2e59] hover:underline"
                >
                  Tüm Hesaplama Araçlarını Aç →
                </Link>
              </div>
            )}
          </div>

          {/* Accordion: Kurumsal */}
          <div className="py-2">
            <button
              type="button"
              onClick={() => toggleMobileAccordion("kurumsal")}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-500" />
                Kurumsal
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  mobileAccordion === "kurumsal" ? "rotate-180 text-amber-500" : ""
                }`}
              />
            </button>

            {mobileAccordion === "kurumsal" && (
              <div className="mt-1 pl-3 pr-1 py-1 flex flex-col gap-1 border-l-2 border-slate-300 ml-3">
                {corporateItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors min-h-[40px]"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct link: Bölgelerimiz */}
          <div className="py-2">
            <Link
              to="/bolgelerimiz"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                İstanbul Bölgeleri
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Direct link: Blog */}
          <div className="py-2">
            <Link
              to="/blog"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                Blog & Rehberler
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Direct link: İletişim */}
          <div className="py-2">
            <Link
              to="/iletisim"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                İletişim & Harita
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Drawer Footer CTA Group */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-3 rounded-xl font-bold text-xs shadow-xs active:scale-95 transition-transform min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:+905300695393"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-[#ffb703] text-slate-950 py-3 rounded-xl font-extrabold text-xs shadow-xs active:scale-95 transition-transform min-h-[44px]"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>Hemen Ara</span>
            </a>
          </div>
        </div>

      </div>
    </header>
  );
}
