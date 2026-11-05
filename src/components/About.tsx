import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, UserCheck, Clock4, Truck, ArrowRight, Award, Zap } from "lucide-react";

export default function About() {
  const pillars = [
    {
      title: "Yetki Belgeli Ustalar",
      subtitle: "Mesleki Yeterlilik Belgeli Kadro",
      desc: "Tüm arıza tamir ve montaj işlemleri belgeli, deneyimli elektrik ustalarımız tarafından yürütülür.",
      icon: UserCheck
    },
    {
      title: "TSE & CE Onaylı Malzeme",
      subtitle: "Siemens, Schneider, Viko Garantisi",
      desc: "Kullanılan her şalter, klemens ve yangın koruma rölesi orijinal üretici garantili ve faturalıdır.",
      icon: ShieldCheck
    },
    {
      title: "Motorize Hızlı Müdahale",
      subtitle: "Ortalama 30 Dakikada Adreste",
      desc: "İstanbul'un 39 ilçesinde trafiğe takılmayan donanımlı acil arıza ekiplerimiz hazır bekler.",
      icon: Truck
    },
    {
      title: "Şeffaf & Yazılı Fiyatlandırma",
      subtitle: "Sürpriz Maliyet Yok",
      desc: "İşlem başlamadan önce yazılı keşif özeti verilir, müşteri onayı olmaksızın ek maliyet çıkarılmaz.",
      icon: Award
    }
  ];

  return (
    <section id="hakkimizda" className="scroll-mt-24 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text & Editorial Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              7/24 Elektrik Servis İlkelerimiz
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b2e59] tracking-tight leading-tight [text-wrap:balance]">
              Güvenli Tesisat, Temiz İşçilik ve Zamanında Müdahale
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed [text-wrap:pretty]">
              <strong className="text-[#0b2e59]">Aya Elektrik</strong>, evinizde, sitenizde veya dükkanınızda meydana gelen tüm elektrik arıza, bakım ve montaj işlerinde İstanbul genelinde 7/24 kesintisiz hizmet veren deneyimli bir elektrikçi firmasıdır.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed [text-wrap:pretty]">
              Elektrik tesisatında yapılan en ufak bir hatanın yangın veya can güvenliği riski doğuracağını biliyoruz. Bu nedenle sigorta değişiminden şofben ve priz montajına kadar her işi TSE onaylı kaliteli malzemeler ve garantili ustalıkla yapıyoruz.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/hakkimizda"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0b2e59] hover:text-amber-600 transition-colors"
              >
                <span>Şirket Profilimiz &amp; Tarihçe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                to="/kunye"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Yasal Sicil &amp; Bilgiler
              </Link>
            </div>
          </div>

          {/* Right Asymmetric Pillars Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-[#0b2e59]/30 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0b2e59] group-hover:bg-[#0b2e59] group-hover:text-amber-400 group-hover:border-[#0b2e59] flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                    0{index + 1}. {item.subtitle}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
