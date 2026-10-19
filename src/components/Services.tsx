import React from 'react';
import { Zap, Cable, Lightbulb, Server, Wifi, ShieldAlert } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Elektrik Arıza Servisi',
    desc: 'Priz yanması, şalter atması, sigorta arızaları ve kaçak akım rölesi problemlerine dakikalar içinde cihazla arıza tespiti ve tamir imkanı.'
  },
  {
    icon: Cable,
    title: 'Tesisat Çekimi ve Yenileme',
    desc: 'Sıfır binalara elektrik tesisatı çekimi, eski yapıların tehlike arz eden kablo altyapılarının standartlara uygun şekilde yenilenmesi.'
  },
  {
    icon: Lightbulb,
    title: 'Aydınlatma ve LED Çözümleri',
    desc: 'Ev ve iş yerleri için avize montajı, gizli ışık, LED şerit, spot aydınlatma ve mağaza vitrin aydınlatma sistemleri kurulumu.'
  },
  {
    icon: Server,
    title: 'Elektrik Panosu Bakım',
    desc: 'Bina, ofis ve işletmeler için ana dağıtım panoları, sayaç panoları ve sigorta kutusu kurulumu, kablo düzenlemesi ve periyodik bakımı.'
  },
  {
    icon: Wifi,
    title: 'İnternet ve Uydu Kablolama',
    desc: 'Modem yer değişimi, fiber veya CAT6 internet kablosu çekimi, merkezi uydu sistemleri santral kurulumu ve hat tespiti.'
  },
  {
    icon: ShieldAlert,
    title: 'Diafon ve Güvelik Sistemleri',
    desc: 'Bina akıllı kapı zilleri, görüntülü diafon montajı, şifreli kapı geçiş sistemleri onarımı ve kamera altyapı kablolama işlemleri.'
  }
];

export default function Services() {
  return (
    <section id="hizmetler" className="scroll-mt-24 py-20 md:py-28 px-6 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-4">Uzmanlık Alanlarımız</h2>
          <div className="w-20 h-1.5 bg-[#ffb703] rounded-full mx-auto"></div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Evsel ve ticari tüm elektrik İhtiyaçlarınız için profesyonel çözümler üretiyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border-t-4 border-[#0b2e59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 hover:border-[#ffb703] transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-[#0b2e59]" />
              </div>
              <h3 className="text-xl font-bold text-[#0b2e59] mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
