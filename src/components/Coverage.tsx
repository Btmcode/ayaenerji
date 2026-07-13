import React from 'react';
import { MapPin } from 'lucide-react';
import CoverageMap from './CoverageMap';

const districts = [
  "Arnavutköy", "Avcılar", "Bağcılar", "Bahçelievler", 
  "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", 
  "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", 
  "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", 
  "Gaziosmanpaşa", "Güngören", "Kağıthane", "Küçükçekmece", 
  "Sarıyer", "Silivri", "Sultangazi", "Şişli", "Zeytinburnu"
];

export default function Coverage() {
  return (
    <section id="bolgeler" className="scroll-mt-24 py-20 md:py-28 px-6 bg-white overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-4">Hizmet Bölgelerimiz</h2>
          <div className="w-20 h-1.5 bg-[#ffb703] rounded-full mx-auto"></div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Gezici servis araçlarımızla Avrupa Yakası'nın tüm noktalarına maksimum 45 dakika içinde ulaşıyoruz.
          </p>
        </div>

        <div className="mb-12">
          <CoverageMap />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {districts.map((district) => (
            <div 
              key={district} 
              className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-[#0b2e59]/5 hover:border-[#0b2e59]/20 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#ffb703] flex-shrink-0" />
              <span className="font-semibold text-[#0b2e59]">{district}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
