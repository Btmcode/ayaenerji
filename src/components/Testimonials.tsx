import React from "react";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
import oldPanel from "../assets/images/old_messy_electrical_panel_1781958501365.jpg";
import newPanel from "../assets/images/new_clean_electrical_panel_1781958517638.jpg";

export default function Testimonials() {
  const reviews = [
    {
      name: "Ahmet Yılmaz",
      district: "Şişli",
      comment:
        "Gece saat 02:00'de atan ana şalter ve koku sebebiyle aradık. 30 dakika içinde gelip TSE onaylı malzemeyle değiştirdiler. Ailem güvende, çok teşekkürler.",
      rating: 5,
      date: "3 hafta önce",
    },
    {
      name: "Ceren K.",
      district: "Beşiktaş",
      comment:
        "Ofisimizin tüm sistem odası ve ethernet kablolamasını sıfırdan sorunsuz hallettiler. Belgeli ustalarla çalışmanın farkı belli oluyor. İşçilikleri inanılmaz temiz.",
      rating: 5,
      date: "1 ay önce",
    },
    {
      name: "Murat Demir",
      district: "Beylikdüzü",
      comment:
        "Lüks avize montajı için çağırdık. Hem zamanında geldiler hem de montaj alanında en ufak bir beton tozu bırakmadan çalışıp tertemiz teslim ettiler.",
      rating: 5,
      date: "2 ay önce",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <div className="w-20 h-1.5 bg-[#ffb703] rounded-full mx-auto"></div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Hizmet kalitemizi daha önce bizi tercih etmiş olan yüzlerce memnun
            müşterimizden dinleyin.
          </p>
        </div>

        {/* Before / After Showcase */}
        <div className="mb-24 bg-gradient-to-br from-slate-50 to-[#f8f9fa] rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Star className="w-64 h-64 rotate-12" />
          </div>

          <div className="text-center mb-12 relative z-10">
            <span className="bg-[#0b2e59]/10 text-[#0b2e59] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
              Farkı Görün
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#0b2e59] flex items-center justify-center gap-3">
              Elektrik Panosu Yenileme Sürecimiz
            </h3>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              Eski, yıpranmış ve yangın riski taşıyan panoları; TSE
              standartlarında, tamamen güvenli ve düzenli sistemlerle
              değiştiriyoruz.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 relative z-10 w-full max-w-5xl mx-auto">
            {/* Before */}
            <div className="flex flex-col flex-1 bg-white p-4 rounded-3xl shadow-md border border-slate-100 group">
              <div className="relative rounded-2xl overflow-hidden shadow-inner aspect-[4/3] bg-slate-100 w-full">
                <img
                  src={oldPanel}
                  alt="İstanbul elektrik panosu yenileme öncesi eski pano"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white px-5 py-2 rounded-xl text-sm font-black tracking-wide shadow-lg border border-red-400">
                  ÖNCE
                </div>
              </div>
              <div className="p-4 md:p-6 text-center">
                <h4 className="font-bold text-slate-800 text-lg mb-2">
                  Tehlikeli & Düzensiz
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Karmaşık, eski tip yanmaya müsait güvensiz kablolama ve ısınan
                  sigortalar.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center -my-4 md:my-0 md:-mx-4 z-20">
              <div className="bg-[#ffb703] p-4 rounded-full shadow-xl text-[#0b2e59] rotate-90 md:rotate-0 border-4 border-white">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </div>
            </div>

            {/* After */}
            <div className="flex flex-col flex-1 bg-white p-4 rounded-3xl shadow-md border border-slate-100 group">
              <div className="relative rounded-2xl overflow-hidden shadow-inner aspect-[4/3] bg-slate-100 w-full">
                <img
                  src={newPanel}
                  alt="Elektrik panosu yenileme sonrası güvenli ve düzenli pano"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-[#25D366]/90 backdrop-blur-sm text-white px-5 py-2 rounded-xl text-sm font-black tracking-wide shadow-lg border border-[#25D366]">
                  SONRA
                </div>
              </div>
              <div className="p-4 md:p-6 text-center">
                <h4 className="font-bold text-slate-800 text-lg mb-2">
                  Güvenli & Düzenli
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  TSE onaylı Siemens koruyucular, güvenli gruplama, etiketleme
                  ve estetik görünüm.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex text-[#ffb703] mb-4">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 italic leading-relaxed mb-6">
                "{review.comment}"
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                <div>
                  <h4 className="font-bold text-[#0b2e59]">{review.name}</h4>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {review.district}
                  </span>
                </div>
                <div className="text-xs text-slate-400 border border-slate-200 px-2.5 py-1 rounded-md">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
