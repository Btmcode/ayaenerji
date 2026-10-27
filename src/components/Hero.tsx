import React from "react";
import {
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Clock,
  Zap,
} from "lucide-react";
import { getWhatsAppLink } from "../utils/whatsapp";
import heroMobileWebp from "../assets/images/turkish_electrician_hero_mobile.webp";
import heroDesktopWebp from "../assets/images/turkish_electrician_hero.webp";
import heroImg from "../assets/images/turkish_electrician_hero_1782073722580.jpg";

export default function Hero() {
  return (
    <section className="relative bg-[#0b2e59] text-white overflow-hidden">
      {/* Background Image with Responsive WebP Picture Tag */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobileWebp} type="image/webp" />
          <source srcSet={heroDesktopWebp} type="image/webp" />
          <img
            src={heroImg}
            alt="İstanbul acil elektrik servisi ve yetkili elektrik ustası"
            width={1600}
            height={900}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2e59]/95 to-[#0b2e59]/80 mix-blend-multiply"></div>
      </div>

      {/* Circuit Board Trace Pattern Overlay (Inspired by our business card) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <g stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round">
            {/* Trace 1 */}
            <path d="M-100,600 L400,600 L550,750 L800,750" />
            <circle cx="800" cy="750" r="4" fill="rgba(255, 255, 255, 0.6)" stroke="none" />
            
            {/* Trace 2 */}
            <path d="M-50,450 L300,450 L380,530 L600,530 L680,450 L900,450" />
            <circle cx="900" cy="450" r="4" fill="rgba(255, 255, 255, 0.6)" stroke="none" />

            {/* Trace 3 */}
            <path d="M1500,200 L1100,200 L950,50 L800,50" />
            <circle cx="800" cy="50" r="4" fill="rgba(255, 255, 255, 0.6)" stroke="none" />

            {/* Trace 4 */}
            <path d="M1600,400 L1200,400 L1100,300 L900,300" />
            <circle cx="900" cy="300" r="4" fill="rgba(255, 255, 255, 0.6)" stroke="none" />

            {/* Trace 5 */}
            <path d="M1200,850 L1050,700 L850,700 L770,620 L600,620" />
            <circle cx="600" cy="620" r="4" fill="rgba(255, 255, 255, 0.6)" stroke="none" />

            {/* Trace Nodes */}
            <circle cx="400" cy="600" r="2.5" fill="rgba(255,255,255,0.4)" />
            <circle cx="300" cy="450" r="2.5" fill="rgba(255,255,255,0.4)" />
            <circle cx="1100" cy="200" r="2.5" fill="rgba(255,255,255,0.4)" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-28 lg:py-36 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ffb703] font-medium text-xs sm:text-sm mb-4 sm:mb-6 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb703] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffb703]"></span>
          </span>
          7/24 Acil Elektrik Servisi
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight max-w-4xl">
          İstanbul Avrupa &amp; Anadolu <br className="hidden md:block" />
          <span className="text-[#ffb703]">Nöbetçi Elektrikçi</span>
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 max-w-2xl leading-relaxed">
          Evinizde veya iş yerinizde meydana gelen ani elektrik arızaları,
          tesisat problemleri ve pano kurulum işlemleri için alanında uzman,
          yetki belgeli ustalarımızla dakikalar içinde yanınızdayız.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8">
          <a
            href="tel:+905300695393"
            className="flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-extrabold text-base sm:text-lg transition-transform active:scale-95 shadow-xl shadow-[#ffb703]/20 min-h-[48px]"
          >
            <PhoneCall className="w-5 h-5 flex-shrink-0" />
            Hemen Ara: 0530 069 53 93
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebc59] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-transform active:scale-95 shadow-xl shadow-[#25D366]/20 min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            WhatsApp Destek
          </a>
        </div>

        {/* Mobile Fast-Triage Service Chips */}
        <div className="w-full max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="text-[11px] uppercase font-bold text-amber-300/80 mb-2.5 tracking-wider flex items-center justify-center gap-1.5">
            <Zap className="w-3 h-3 fill-amber-300" />
            <span>Sık Karşılaşılan Acil Talepler</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <a
              href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, sigorta atması ve şalter arızası için acil usta talep ediyorum. Konumum: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all flex items-center gap-1 min-h-[36px]"
            >
              <span>⚡ Sigorta Atması</span>
            </a>
            <a
              href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, klima/kombi için bağımsız elektrik hattı çektirmek istiyorum. Adresim: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all flex items-center gap-1 min-h-[36px]"
            >
              <span>❄️ Klima/Kombi Hattı</span>
            </a>
            <a
              href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, kaçak akım rölesi ve priz arızası için usta rica ediyorum. Konumum: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all flex items-center gap-1 min-h-[36px]"
            >
              <span>🔌 Kaçak Akım / Priz</span>
            </a>
            <a
              href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, fuar ve kurumsal etkinlik elektrik kurulumu için teknik teklif almak istiyoruz: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all flex items-center gap-1 min-h-[36px]"
            >
              <span>🏢 Fuar &amp; Stand</span>
            </a>
          </div>
        </div>

        {/* Trust Badges - 3-Column on mobile and desktop */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-4xl mx-auto border-t border-white/10 pt-5 sm:pt-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3 bg-white/5 rounded-xl p-2.5 sm:p-4 backdrop-blur-sm border border-white/5">
            <div className="bg-green-500/20 p-1.5 sm:p-2 rounded-full border border-green-500/30 shrink-0">
              <ShieldCheck className="text-green-400 w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-extrabold text-white text-xs sm:text-sm leading-tight">
                TSE Belgeli
              </div>
              <div className="text-white/60 text-[10px] sm:text-xs hidden xs:block">Yetkili Ustalar</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3 bg-white/5 rounded-xl p-2.5 sm:p-4 backdrop-blur-sm border border-white/5">
            <div className="bg-[#ffb703]/20 p-1.5 sm:p-2 rounded-full border border-[#ffb703]/30 shrink-0">
              <Clock className="text-[#ffb703] w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-extrabold text-white text-xs sm:text-sm leading-tight">
                7/24 Nöbetçi
              </div>
              <div className="text-white/60 text-[10px] sm:text-xs hidden xs:block">Kesintisiz Destek</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3 bg-white/5 rounded-xl p-2.5 sm:p-4 backdrop-blur-sm border border-white/5">
            <div className="bg-sky-500/20 p-1.5 sm:p-2 rounded-full border border-sky-500/30 shrink-0">
              <Zap className="text-sky-400 w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-extrabold text-white text-xs sm:text-sm leading-tight">
                15-30 Dk.
              </div>
              <div className="text-white/60 text-[10px] sm:text-xs hidden xs:block">Hızlı Müdahale</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
