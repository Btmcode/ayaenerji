import React from "react";
import { Star, CheckCircle, ArrowRight, ExternalLink, ShieldCheck, MapPin } from "lucide-react";
import oldPanel from "../assets/images/old_messy_electrical_panel_1781958501365.webp";
import newPanel from "../assets/images/new_clean_electrical_panel_1781958517638.webp";

export default function Testimonials() {
  const reviews = [
    {
      name: "Ahmet Yılmaz",
      district: "Şişli",
      service: "7/24 Acil Arıza",
      comment:
        "Gece saat 02:00'de atan ana şalter ve koku sebebiyle aradık. 30 dakika içinde gelip TSE onaylı malzemeyle değiştirdiler. Ailem güvende, çok teşekkürler.",
      rating: 5,
      date: "3 hafta önce",
    },
    {
      name: "Burak E. (Togg Sahibi)",
      district: "Başakşehir",
      service: "Wallbox Şarj Montajı",
      comment:
        "Togg T10X aracım için kapalı otoparkımıza sayaçtan 40 metre 5x6mm kablo çekerek 11kW Vestel Wallbox ve B tipi kaçak akım panosu kurdular. Yönetim onaylı, pırıl pırıl işçilik.",
      rating: 5,
      date: "2 hafta önce",
    },
    {
      name: "Ceren K.",
      district: "Beşiktaş",
      service: "Data & Cat6 Kablolama",
      comment:
        "Ofisimizin tüm sistem odası ve ethernet kablolamasını sıfırdan sorunsuz hallettiler. Belgeli ustalarla çalışmanın farkı belli oluyor. İşçilikleri inanılmaz temiz.",
      rating: 5,
      date: "1 ay önce",
    },
    {
      name: "Mustafa Ç. (Site Yöneticisi)",
      district: "Bakırköy",
      service: "Kamera & Görüntülü Diafon",
      comment:
        "3 bloklu sitemizin 24 dairelik Audio görüntülü diafon ve 16 adet IP kamera altyapısını kurdular. Gece görüşü ve cep telefonu izleme kusursuz çalışıyor.",
      rating: 5,
      date: "1 ay önce",
    },
    {
      name: "Murat Demir",
      district: "Beylikdüzü",
      service: "Avize & Aydınlatma",
      comment:
        "Lüks avize montajı için çağırdık. Hem zamanında geldiler hem de montaj alanında en ufak bir beton tozu bırakmadan çalışıp tertemiz teslim ettiler.",
      rating: 5,
      date: "2 ay önce",
    },
    {
      name: "Selim A.",
      district: "Kadıköy",
      service: "Pano & Kaçak Akım",
      comment:
        "Eski sigortalar sürekli atıyordu. Pano revizyonu ve kaçak akım rölesi montajını 2 saatte tamamladılar. İletişimleri ve teknik bilgileri 10 numara.",
      rating: 5,
      date: "2 ay önce",
    },
  ];

  const mapsLink = "https://share.google/35HQ6oDqAvoNMUweP";

  return (
    <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Google Reviews Trust Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
            Doğrulanmış Müşteri Değerlendirmeleri
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-3 sm:mb-4 [text-wrap:balance]">
            Google Haritalar'da 4.9 / 5 Puan ve 450+ Doğrulanmış Yorum
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto [text-wrap:pretty]">
            Hizmet kalitemizi Google İşletme profilimizde bizi tercih etmiş ve değerlendirmiş olan yüzlerce memnun müşterimizden dinleyin.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0b2e59] hover:bg-[#123e75] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Google Yorumlarını İncele</span>
            </a>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ffb703] hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-xs transition-colors"
            >
              ★ Puan Ver &amp; Yorum Yaz
            </a>
          </div>
        </div>

        {/* Before / After Showcase */}
        <div className="mb-14 sm:mb-24 bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="text-center mb-8 relative z-10">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
              Saha Uygulama Örneği
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0b2e59] [text-wrap:balance]">
              Elektrik Panosu Yenileme &amp; Güvenlik Standartları
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
              className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#ffb703]">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {review.service}
                  </span>
                </div>
                <p className="text-slate-600 italic text-sm leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">
                <div>
                  <h4 className="font-bold text-[#0b2e59] text-sm flex items-center gap-1.5">
                    {review.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                  </h4>
                  <span className="text-xs font-semibold text-slate-400">
                    {review.district} / İstanbul • Google Doğrulanmış
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded-md">
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
