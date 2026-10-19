import React from "react";
import {
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Clock,
  Zap,
} from "lucide-react";
import { getWhatsAppLink } from "../utils/whatsapp";
import heroImg from "../assets/images/turkish_electrician_hero_1782073722580.jpg";

export default function Hero() {
  return (
    <section className="relative bg-[#0b2e59] text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="İstanbul acil elektrik servisi ve uzman elektrik ustası"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ffb703] font-medium text-sm mb-6 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb703] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffb703]"></span>
          </span>
          7/24 Acil Elektrik Servisi
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl">
          İstanbul Avrupa Yakası <br className="hidden md:block" />
          <span className="text-[#ffb703]">Nöbetçi Elektrikçi</span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
          Evinizde veya iş yerinizde meydana gelen ani elektrik arızaları,
          tesisat problemleri ve pano kurulum işlemleri için alanında uzman,
          yetki belgeli ustalarımızla dakikalar içinde yanınızdayız.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <a
            href="tel:+905300695393"
            className="flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-xl shadow-[#ffb703]/20"
          >
            <PhoneCall className="w-5 h-5 flex-shrink-0" />
            Hemen Ara: 0530 069 53 93
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebc59] text-white px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-xl shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            WhatsApp Destek
          </a>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mx-auto border-t border-white/10 pt-10">
          <div className="flex items-center justify-center gap-3 bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5">
            <div className="bg-green-500/20 p-2 rounded-full border border-green-500/30">
              <ShieldCheck className="text-green-400 w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-sm">
                Sertifikalı Ustalar
              </div>
              <div className="text-white/60 text-xs">TSE Normlarına Uygun</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5">
            <div className="bg-[#ffb703]/20 p-2 rounded-full border border-[#ffb703]/30">
              <Clock className="text-[#ffb703] w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-sm">
                7/24 Kesintisiz Destek
              </div>
              <div className="text-white/60 text-xs">
                Pazar Günleri Dahil Açık
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5">
            <div className="bg-sky-500/20 p-2 rounded-full border border-sky-500/30">
              <Zap className="text-sky-400 w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-sm">Hızlı Müdahale</div>
              <div className="text-white/60 text-xs">Ortalama 30-45 Dk.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
