import React from 'react';
import { PhoneCall } from 'lucide-react';

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-white border-t border-slate-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden">
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-500 uppercase">Acil Elektrikçi</span>
          <span className="text-[#0b2e59] font-black text-sm">30 Dk. İçinde Kapınızda</span>
        </div>
        <a
          href="tel:+905300695393"
          aria-label="Hemen Arayın"
          className="flex items-center gap-2 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-6 py-2.5 rounded-lg font-bold text-base transition-colors shadow-md animate-pulse"
        >
          <PhoneCall className="w-5 h-5 fill-[#0b2e59]" />
          Hemen Ara
        </a>
      </div>
    </div>
  );
}
