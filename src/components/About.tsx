import React from 'react';
import { ShieldCheck, UserCheck, Clock4, Truck } from 'lucide-react';

export default function About() {
  const features = [
    { icon: Clock4, title: '7/24 Kesintisiz Hizmet', desc: 'Gece veya gündüz fark etmeksizin elektrik arızalarınıza acil müdahale.' },
    { icon: UserCheck, title: 'Uzman ve Belgeli Kadro', desc: 'Gerekli tüm mesleki yeterlilik belgelerine sahip, tecrübeli teknisyenler.' },
    { icon: ShieldCheck, title: 'Garantili İşçilik', desc: 'TSE onaylı kaliteli malzemeler ve yapılan uygulamalarda %100 memnuniyet garantisi.' },
    { icon: Truck, title: 'Anında Müdahale', desc: 'Avrupa yakasının tüm ilçelerine tam donanımlı mobil araçlarımızla hızlı ulaşım.' },
  ];

  return (
    <section id="hakkimizda" className="scroll-mt-24 py-20 md:py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="flex-1 space-y-6 text-slate-700">
            <div className="mb-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-4">Hakkımızda</h2>
              <div className="w-20 h-1.5 bg-[#ffb703] rounded-full"></div>
            </div>
            
            <p className="text-lg leading-relaxed">
              <strong className="text-[#0b2e59]">Aya Elektrik</strong> olarak uzun yıllara dayanan tecrübemiz ve donanımlı usta kadromuzla İstanbul Avrupa Yakası'nda profesyonel elektrik servisi hizmeti sunuyoruz.
            </p>
            <p className="text-lg leading-relaxed">
              Elektrik tesisatının şakaya gelmeyeceğinin bilincindeyiz. Bu nedenle yaptığımız her arıza tespiti, kablo çekimi veya pano montajı işleminde en yüksek güvenlik standartlarını uyguluyoruz. Müşteri memnuniyetini ön planda tutan şeffaf fiyatlandırma politikamızla güvenilir hizmet veriyoruz.
            </p>
          </div>

          {/* Features Grid */}
          <div className="flex-1 w-full grid sm:grid-cols-2 gap-6">
            {features.map((opt, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#ffb703]/30 transition-all group">
                <div className="w-12 h-12 bg-[#0b2e59]/5 text-[#0b2e59] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#ffb703] group-hover:text-[#0b2e59] transition-colors">
                  <opt.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0b2e59] mb-2">{opt.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
