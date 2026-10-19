import React from 'react';
import { PhoneCall } from 'lucide-react';

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white/98 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between py-2 px-3 sm:px-4 max-w-lg mx-auto gap-2">
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="truncate">Acil Elektrikçi</span>
          </div>
          <span className="text-[#0b2e59] font-black text-xs sm:text-sm tracking-tight truncate block leading-snug">
            30 Dk. İçinde Kapınızda
          </span>
        </div>
        <a
          href="tel:+905300695393"
          aria-label="Hemen Arayın: 0530 069 53 93"
          className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#ffb703] active:bg-[#e0a000] text-[#0b2e59] px-3.5 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-transform active:scale-95 shadow-md shadow-amber-500/30 whitespace-nowrap shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#0b2e59] shrink-0" />
          <span>Hemen Ara</span>
        </a>
      </div>
    </div>
  );
}
