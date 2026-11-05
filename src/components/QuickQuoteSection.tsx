import React, { useState } from "react";
import { MessageCircle, PhoneCall, Zap, ShieldCheck, MapPin, CheckCircle2, ChevronRight, Star } from "lucide-react";
import { ISTANBUL_DISTRICTS } from "../data/istanbulDistricts";
import { getWhatsAppLink } from "../utils/whatsapp";

const SERVICES_LIST = [
  { id: "ev-charging", name: "Elektrikli Araç Şarj İstasyonu (Wallbox Montajı)" },
  { id: "acil-ariza", name: "7/24 Acil Elektrik Arıza & Sigorta Tamiri" },
  { id: "guvenlik", name: "Güvenlik Kamerası & Görüntülü Diafon Montajı" },
  { id: "network", name: "Telekomünikasyon, Cat6/Cat7 & Fiber Altyapı" },
  { id: "gunes-paneli", name: "Güneş Paneli (GES) & İnvertör Bakımı" },
  { id: "klima-kombi", name: "Klima, Kombi & Şofben Bağımsız Güç Hattı" },
  { id: "pano-yenileme", name: "Elektrik Panosu & Kaçak Akım Rölesi Değişimi" },
  { id: "tesisat-tadilat", name: "Komple Ev / İş Yeri Elektrik Tesisatı Tadilatı" }
];

export default function QuickQuoteSection() {
  const [selectedService, setSelectedService] = useState(SERVICES_LIST[0].name);
  const [selectedDistrict, setSelectedDistrict] = useState("Zeytinburnu");
  const [buildingType, setBuildingType] = useState("Site / Daire");
  const [customNote, setCustomNote] = useState("");

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Merhaba Aya Elektrik, web sitenizden teklif/keşif talebinde bulunuyorum:
• Hizmet: ${selectedService}
• İlçe: ${selectedDistrict} / İstanbul
• Mekan: ${buildingType}
${customNote ? `• Detay/Not: ${customNote}` : ""}
Fiyat teklifi veya en erken keşif saati hakkında bilgi alabilir miyim?`;

    const url = getWhatsAppLink(message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="hizli-teklif" className="py-14 sm:py-20 bg-gradient-to-b from-slate-900 via-[#0b2e59] to-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffb703]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Hızlı Keşif &amp; Şeffaf Fiyatlandırma
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight [text-wrap:balance]">
              İhtiyacınız Olan Hizmeti Seçin, <span className="text-[#ffb703]">Anında Teklif Alın</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Google İşletme onaylı uzman kadromuzla elektrikli araç şarjı, güvenlik sistemleri, data altyapısı ve acil arızalar için İstanbul geneli <strong>30 dakikada mobil keşif</strong> yapıyoruz.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Ücretsiz ön keşif ve malzeme standartları bilgilendirmesi</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>TSE ve EMO normlarına uygun garantili işçilik</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Google'da 4.9/5 müşteri memnuniyet skoru (450+ Doğrulanmış Yorum)</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <a
                href="https://share.google/35HQ6oDqAvoNMUweP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#ffb703] transition-colors underline"
              >
                Google Haritalar Profilimizi Görüntüleyin →
              </a>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSendQuote}
              className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-[#0b2e59]">Hızlı Teklif &amp; Keşif Formu</h3>
                  <p className="text-xs text-slate-500">Bilgileri doldurun, WhatsApp üzerinden anında yanıtlansın.</p>
                </div>
                <span className="hidden sm:inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  Nöbetçi Servis Aktif
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {/* Service Selection */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Talep Ettiğiniz Hizmet *
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0b2e59] focus:ring-2 focus:ring-[#0b2e59]/20 text-sm font-medium bg-slate-50 transition-all"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.name}>
                        {srv.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    İstanbul İlçesi *
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0b2e59] focus:ring-2 focus:ring-[#0b2e59]/20 text-sm font-medium bg-slate-50 transition-all"
                  >
                    {ISTANBUL_DISTRICTS.map((d) => (
                      <option key={d.slug} value={d.name}>
                        {d.name} ({d.side})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Building Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mekan / Yapı Tipi
                  </label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0b2e59] focus:ring-2 focus:ring-[#0b2e59]/20 text-sm font-medium bg-slate-50 transition-all"
                  >
                    <option value="Daire / Apartman">Daire / Apartman</option>
                    <option value="Kapalı Otoparklı Site">Kapalı Otoparklı Site</option>
                    <option value="Müstakil Villa">Müstakil Villa</option>
                    <option value="Ofis / Plaza Katı">Ofis / Plaza Katı</option>
                    <option value="Dükkan / Mağaza">Dükkan / Mağaza</option>
                    <option value="Fabrika / Depo / Atölye">Fabrika / Depo / Atölye</option>
                  </select>
                </div>

                {/* Custom Note */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Arıza veya Proje Detayı (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Örn: Tesla Model Y için otoparka hat çekilecek veya 4 adet IP kamera"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0b2e59] focus:ring-2 focus:ring-[#0b2e59]/20 text-sm bg-slate-50 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-4 px-6 rounded-2xl font-black text-base shadow-lg shadow-emerald-950/10 transition-all hover:scale-[1.01] active:scale-98"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp ile Hemen Fiyat / Keşif İste
                </button>
                <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                  <span>🔒 Bilgileriniz gizli tutulur</span>
                  <a href="tel:+905300695393" className="text-[#0b2e59] font-bold hover:underline">
                    Veya Doğrudan Arayın: 0530 069 53 93
                  </a>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
