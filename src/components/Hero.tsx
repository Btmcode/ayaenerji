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
import heroImg from "../assets/images/turkish_electrician_hero_1782073722580.webp";

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32 text-center flex flex-col items-center">
        {/* Clean Editorial Kicker (No Pill Enclosure, No Fake Pulse) */}
        <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-300 mb-3 sm:mb-4">
          İstanbul Geneli 39 İlçe · 7/24 Kesintisiz Elektrik Servisi
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight max-w-4xl [text-wrap:balance]">
          İstanbul Avrupa &amp; Anadolu <br className="hidden md:block" />
          <span className="text-[#ffb703]">7/24 Nöbetçi Elektrikçi</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-200 mb-6 sm:mb-8 max-w-2xl leading-relaxed [text-wrap:pretty]">
          Evinizde, sitenizde veya iş yerinizde meydana gelen ani elektrik arızaları,
          sigorta atması, pano tamiri, avize/priz montajı ve kablo çekimi için yetkili
          ustalarımızla 30 dakikada kapınızdayız.
        </p>

        {/* Primary Dominant Visual Anchor */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8">
          <a
            href="tel:+905300695393"
            className="flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-amber-400 text-slate-950 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-extrabold text-sm sm:text-base transition-transform active:scale-95 shadow-lg shadow-amber-500/20 min-h-[48px] whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 shrink-0 fill-slate-950" />
            <span>0530 069 53 93 · Hemen Usta Çağır</span>
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-colors active:scale-95 backdrop-blur-xs min-h-[48px] whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0 fill-white" />
            <span>WhatsApp ile Fotoğraf Gönder</span>
          </a>
        </div>

        {/* Clean Fast-Triage Service Navigation (No Emoji Clutter) */}
        <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="text-[11px] uppercase font-bold text-slate-300 mb-2.5 tracking-wider">
            Sık Karşılaşılan Acil Talepler
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, sigorta atması ve şalter arızası için acil usta talep ediyorum. Konumum: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-medium backdrop-blur-xs border border-white/10 transition-colors min-h-[38px] flex items-center"
            >
              Sigorta &amp; Şalter Arızası
            </a>
            <a
              href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, klima/kombi için bağımsız elektrik hattı çektirmek istiyorum. Adresim: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-medium backdrop-blur-xs border border-white/10 transition-colors min-h-[38px] flex items-center"
            >
              Klima &amp; Kombi Bağımsız Linye
            </a>
            <a
              href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, kaçak akım rölesi ve priz arızası için usta rica ediyorum. Konumum: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-medium backdrop-blur-xs border border-white/10 transition-colors min-h-[38px] flex items-center"
            >
              Kaçak Akım Rölesi Değişimi
            </a>
            <a
              href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, EV araç şarj istasyonu kurulumu için keşif talep ediyoruz: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-medium backdrop-blur-xs border border-white/10 transition-colors min-h-[38px] flex items-center"
            >
              EV Wallbox Şarj Kurulumu
            </a>
          </div>
        </div>

        {/* Quantitative Proof & Trust Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-4xl mx-auto border-t border-white/10 pt-6 sm:pt-8 text-left">
          <div className="border border-white/10 bg-white/5 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono tabular-nums">
              30 Dk.
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
              Ortalama Varış
            </div>
            <div className="text-[11px] text-slate-300 hidden sm:block">
              İstanbul 39 ilçede mobil ekip
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <div className="text-lg sm:text-2xl font-black text-emerald-400 font-mono tabular-nums">
              ★ 4.9 / 5
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
              Doğrulanmış Puan
            </div>
            <div className="text-[11px] text-slate-300 hidden sm:block">
              450+ Google Haritalar yorumu
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <div className="text-lg sm:text-2xl font-black text-amber-300 font-mono tabular-nums">
              %100
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
              Garantili İşçilik
            </div>
            <div className="text-[11px] text-slate-300 hidden sm:block">
              TSE &amp; EMO normlu malzeme
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
