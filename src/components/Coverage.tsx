import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import CoverageMap from './CoverageMap';
import { ISTANBUL_DISTRICTS } from '../data/istanbulDistricts';

export default function Coverage() {
  const [selectedSide, setSelectedSide] = useState<'all' | 'Avrupa' | 'Anadolu'>('all');

  const filteredDistricts = ISTANBUL_DISTRICTS.filter(d => {
    if (selectedSide === 'all') return true;
    return d.side === selectedSide;
  });

  return (
    <section id="bolgeler" className="scroll-mt-24 py-14 sm:py-20 md:py-28 px-3.5 sm:px-6 bg-white overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b2e59]/5 border border-[#0b2e59]/10 text-[#0b2e59] text-xs font-bold mb-3 sm:mb-4">
            <Zap className="w-3.5 h-3.5 text-[#ffb703]" />
            İstanbul Geneli 39 İlçe Kapsamı
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-3 sm:mb-4">
            Hizmet Bölgelerimiz & Mobil Nöbetçi İstasyonları
          </h2>
          <div className="w-20 h-1.5 bg-[#ffb703] rounded-full mx-auto"></div>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Gezici mobil servis filomuzla İstanbul'un <strong className="text-[#0b2e59]">tüm 39 ilçesinde</strong> 7/24 nöbetçi ekiplerimizle ortalama <strong className="text-[#0b2e59]">20-30 dakika</strong> içinde kapınızdayız.
          </p>

          {/* Side Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-5 sm:mt-8 px-1 max-w-full">
            <button
              onClick={() => setSelectedSide('all')}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all min-h-[40px] ${
                selectedSide === 'all'
                  ? 'bg-[#0b2e59] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tüm İstanbul (39 İlçe)
            </button>
            <button
              onClick={() => setSelectedSide('Avrupa')}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all min-h-[40px] ${
                selectedSide === 'Avrupa'
                  ? 'bg-[#0b2e59] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Avrupa Yakası (25)
            </button>
            <button
              onClick={() => setSelectedSide('Anadolu')}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all min-h-[40px] ${
                selectedSide === 'Anadolu'
                  ? 'bg-[#0b2e59] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Anadolu Yakası (14)
            </button>
          </div>
        </div>

        <div className="mb-10 sm:mb-12">
          <CoverageMap />
        </div>

        {/* 39 Districts Interactive Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3.5">
          {filteredDistricts.map((d) => (
            <Link
              key={d.slug}
              to={`/hizmet-bolgeleri/${d.slug}`}
              className="group p-2.5 sm:p-3.5 bg-slate-50 border border-slate-200 hover:border-[#ffb703] rounded-xl hover:shadow-md hover:bg-white transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-1 mb-2">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb703] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-[#0b2e59] text-xs sm:text-sm truncate">
                    {d.name}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-600 shrink-0">
                  {d.side}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 font-medium truncate">
                  <Clock className="w-3 h-3 text-[#ffb703] shrink-0" />
                  <span>{d.averageArrivalTime}</span>
                </span>
                <span className="text-amber-600 group-hover:translate-x-0.5 transition-transform font-bold shrink-0 ml-1">
                  Usta &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Trust Band */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0b2e59] flex items-center justify-center text-[#ffb703] shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0b2e59] text-sm sm:text-base">
                İstanbul'un Her Noktasına Faturalı & Garantili Elektrikçi
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                Tüm mobil ekiplerimiz Mesleki Yeterlilik ve TSE onaylı sertifikalara sahiptir. 
              </p>
            </div>
          </div>
          <a
            href="tel:+905300695393"
            className="w-full sm:w-auto px-5 py-3 bg-[#0b2e59] hover:bg-[#133e73] text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shrink-0 transition-colors shadow-sm"
          >
            Nöbetçi Santrali Ara: 0530 069 53 93
          </a>
        </div>
      </div>
    </section>
  );
}
