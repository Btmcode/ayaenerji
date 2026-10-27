import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, MapPin, ChevronRight, Zap, Award, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { getWhatsAppLink } from "../utils/whatsapp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Hizmetlerimiz", href: "/hizmetler" },
    { label: "Bölgelerimiz", href: "/bolgelerimiz" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
  ];

  const handleNavClick = () => setIsOpen(false);

  const isCurrentPath = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Dynamic SEO & Info Bar */}
      <div className={`w-full bg-[#0b2e59] text-white py-2 px-6 transition-transform duration-300 ${scrolled ? "-translate-y-full absolute" : "relative"}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs font-semibold tracking-wide">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              İstanbul Geneli (39 İlçe) 7/24 Kesintisiz Hizmet
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1 sm:mt-0 opacity-90">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#ffb703]" /> Güvenilir & Uzman Elektrik Teknisyenleri
            </span>
            <span className="hidden md:inline text-white/50">|</span>
            <Link to="/ekibimize-katil" className="hover:text-[#ffb703] transition-colors flex items-center gap-0.5">
              Kariyer <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Glassmorphic Navbar Wrapper */}
      <div className={`w-full px-4 sm:px-6 py-3 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100" : "bg-white border-b border-slate-100"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex-shrink-0 flex items-center group" aria-label="Aya Elektrik Anasayfa">
            <Logo
              variant="dark"
              className="w-32 sm:w-44 h-auto transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all ${
                  isCurrentPath(item.href)
                    ? "bg-[#0b2e59] text-white shadow-md shadow-slate-900/10"
                    : "text-slate-600 hover:text-[#0b2e59] hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase tracking-widest text-[#ffb703] font-extrabold flex items-center gap-1 justify-end">
                <Zap className="w-3 h-3 animate-bounce fill-[#ffb703] text-[#ffb703]" /> 45 Dk'da Kapınızda
              </span>
              <a href="tel:+905300695393" aria-label="Acil Destek Hattını Ara" className="text-base font-black text-[#0b2e59] tracking-tight hover:text-[#ffb703] transition-colors leading-none mt-1">
                0530 069 53 93
              </a>
            </div>
            
            <a
              href="tel:+905300695393"
              aria-label="Hemen Arayın"
              className="flex items-center gap-2 bg-[#ffb703] hover:bg-[#ffb703]/95 text-[#0b2e59] px-5 py-3 rounded-2xl font-black text-sm tracking-wide shadow-md transition-all hover:scale-[1.02] active:scale-95"
            >
              <Phone className="w-4 h-4 fill-[#0b2e59]" />
              HEMEN ARA
            </a>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+905300695393"
              className="flex items-center gap-1.5 bg-[#ffb703] text-[#0b2e59] px-3.5 py-2 rounded-xl font-extrabold text-xs tracking-wider"
              aria-label="Telefonla Arayın"
            >
              <Phone className="w-3.5 h-3.5 fill-[#0b2e59]" />
              ARA
            </a>
            <button
              className="p-2.5 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menüyü Aç"
            >
              {isOpen ? <X className="w-6 h-6 animate-spin-once" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Backdrop Overlay when menu is open */}
      {isOpen && (
        <div
          onClick={handleNavClick}
          className="lg:hidden fixed inset-0 top-16 bg-slate-950/50 backdrop-blur-xs z-30 animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* Refined Mobile Navigation Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl flex flex-col transition-all duration-300 ease-in-out origin-top z-40 ${
          isOpen ? "max-h-[85vh] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        } overflow-y-auto`}
      >
        <div className="p-4 flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              onClick={handleNavClick}
              to={item.href}
              className={`flex items-center justify-between font-extrabold text-sm uppercase tracking-wide p-3.5 rounded-xl transition-all min-h-[48px] ${
                isCurrentPath(item.href)
                  ? "bg-[#0b2e59] text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 active:bg-slate-200"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {isCurrentPath(item.href) && <span className="w-2 h-2 rounded-full bg-[#ffb703] animate-ping" />}
                {item.label}
              </span>
              <ChevronRight className={`w-4 h-4 ${isCurrentPath(item.href) ? "text-amber-400" : "text-slate-400"}`} />
            </Link>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-3 mt-auto">
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="p-2.5 bg-amber-50 text-amber-700 rounded-lg shrink-0">
              <Zap className="w-5 h-5 fill-amber-500 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-black text-[#0b2e59] uppercase tracking-wider">
                7/24 Nöbetçi Elektrik Servisi
              </div>
              <div className="text-slate-600 text-[11px] font-semibold">
                İstanbul 39 İlçe · 15-30 Dk. Varış
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              aria-label="WhatsApp Destek Hattı"
              className="flex items-center justify-center gap-1.5 bg-[#25D366] active:bg-[#1ebc59] text-white py-3 rounded-xl font-extrabold text-xs shadow-sm min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:+905300695393"
              onClick={handleNavClick}
              aria-label="Acil Destek Hattını Ara"
              className="flex items-center justify-center gap-1.5 bg-[#ffb703] active:bg-[#e0a000] text-slate-950 py-3 rounded-xl font-black text-xs shadow-sm min-h-[46px]"
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
