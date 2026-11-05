import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
  Wifi,
  Server,
  Network,
  Cpu,
  ArrowRight,
  ExternalLink,
  Layers,
  Activity
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";
import { getWhatsAppLink } from "../utils/whatsapp";
import cat7NetworkImg from "../assets/images/aya_cat7_patch_panel_network_1793035684216.webp";

export default function TelekomNetworkPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phoneNumber = "+905300695393";
  const displayPhone = "0530 069 53 93";
  const mapsLink = "https://share.google/35HQ6oDqAvoNMUweP";

  const whatsAppUrl = getWhatsAppLink(
    "Merhaba Aya Elektrik, ofis/ev için internet altyapısı, Cat6/Cat7 kablolama, fiber sonlandırma ve rack kabinet düzenlemesi hakkında keşif ve teklif almak istiyorum."
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": "https://ayaelektrik.com/hizmetler/telekomunikasyon-network-altyapi#service",
        "name": "Telekomünikasyon, İnternet & Network Altyapı Hizmetleri | Aya Elektrik",
        "serviceType": "Telekomünikasyon İşleri Yüklenicisi",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Aya Elektrik",
          "telephone": "+905300695393",
          "url": "https://ayaelektrik.com/",
          "sameAs": ["https://share.google/35HQ6oDqAvoNMUweP"]
        },
        "areaServed": "İstanbul (39 İlçe)",
        "description": "İstanbul genelinde kurumsal ve bireysel Cat6/Cat7 yapısal kablolama, fiber optik sonlandırma, sistem odası ve rack kabinet düzenlemesi, modem yer değişimi ve kesintisiz internet altyapısı montajı."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Helmet>
        <title>Telekomünikasyon, Cat6/Cat7 Kablolama & Fiber Altyapı | Aya Elektrik İstanbul</title>
        <meta
          name="description"
          content="İstanbul geneli telekomünikasyon işleri yüklenicisi. Cat6/Cat7 ethernet kablolama, fiber optik sonlandırma, sistem odası ve rack kabinet düzenleme, modem yer değişimi ve internet arıza servisi."
        />
        <meta
          name="keywords"
          content="telekomünikasyon yüklenicisi, cat6 kablo çekimi, fiber optik sonlandırma, patch panel montajı, rack kabinet düzenleme, internet kablo arızası, sistem odası kablolama istanbul"
        />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/telekomunikasyon-network-altyapi" />
        <meta property="og:title" content="Telekomünikasyon & Network Altyapı Hizmetleri | Aya Elektrik" />
        <meta property="og:description" content="Yapısal kablolama, Cat6/Cat7, fiber optik, rack kabinet ve sistem odası çözümleri. 7/24 teknik altyapı desteği." />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/network-og.jpg" />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/telekomunikasyon-network-altyapi" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-[#0b2e59]">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/hizmetler" className="hover:text-[#0b2e59]">Hizmetlerimiz</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Telekomünikasyon & Network</span>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#091b33] via-[#0b2e59] to-[#0e3b68] text-white py-16 lg:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffb703_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffb703]/20 border border-[#ffb703]/40 text-[#ffb703] text-xs font-bold uppercase tracking-wider">
                  <Wifi className="w-4 h-4" />
                  Google İşletme Onaylı Telekomünikasyon İşleri Yüklenicisi
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Telekomünikasyon, <span className="text-[#ffb703]">Cat6/Cat7 Kablolama</span> & Fiber Altyapı
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Ofisler, plazalar, fabrikalar ve evler için <strong>gigabit hızında Cat6 / Cat7 yapısal kablolama</strong>, 
                  <strong> fiber optik sonlandırma</strong>, patch panel etiketleme, sistem odası rack kabinet düzenlemesi ve 
                  <strong> internet prizi yer değişimi</strong> hizmetleri sunuyoruz.
                </p>

                {/* Stat pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-[#ffb703] font-black text-lg">10 Gbps Uyumlu</div>
                    <div className="text-xs text-slate-300">Cat6A / Cat7 Kablolama</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-emerald-400 font-black text-lg">Fluke Testi</div>
                    <div className="text-xs text-slate-300">Sertifikalı Hat Ölçümü</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-sky-400 font-black text-lg">Rack Kabinet</div>
                    <div className="text-xs text-slate-300">Kusursuz Düzen & Havalandırma</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-4 rounded-2xl font-black text-base shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Network & Altyapı Teklifi İste
                  </a>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="inline-flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#ffb703]/90 text-[#0b2e59] px-6 py-4 rounded-2xl font-black text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <PhoneCall className="w-5 h-5 fill-[#0b2e59]" />
                    Hemen Ara: {displayPhone}
                  </a>
                </div>
              </div>

              {/* Media Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] bg-slate-800">
                  <img
                    src={cat7NetworkImg}
                    alt="Patch panel ve rack kabinet yapısal kablolama montajı"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-[#0b2e59] shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Server className="w-5 h-5 text-indigo-600" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-600">Sistem Odası Standartları</span>
                      </div>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">EMO Onaylı</span>
                    </div>
                    <p className="text-xs font-semibold mt-1 text-slate-700">
                      Sinyal parazitini önleyen FTP/SFTP korumalı kablo ve düzenli port numaralandırması ile sıfır veri kaybı sağlıyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2e59]">
              Telekomünikasyon ve Veri İletişim Hizmetlerimiz
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Kesintisiz internet hızı ve modern kurumsal ağ altyapısı için sunduğumuz çözümler.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0b2e59] mb-3">Yapısal Cat6 / Cat7 Kablolama</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Ofis çalışma masalarına, toplantı odalarına ve serverlara tava veya süpürgelik üzerinden korumalı bakır veri hattı çekimi.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Keystone jack ve priz sonlandırma
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Kablo karmaşasını ortadan kaldıran kanallama
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0b2e59] mb-3">Patch Panel & Rack Kabinet</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Karışmış kabloların temizlenmesi, renk kodlu patch cord bağlantısı, havalandırma fanları ve etiketleme.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  12U'dan 42U'ya rack kabinet montajı
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Kablo bağı ve düzenleyici organizasyonu
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0b2e59] mb-3">Fiber & Modem Yer Değişimi</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Bina girişindeki fiber kutusundan daireye fiber kıl kablo çekimi, modem yerinin taşınması ve sinyal güçlendiriciler.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Kopuk internet kablosu ekleme ve onarımı
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Access Point (Wi-Fi 6) tavana montaj
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Google Reviews Trust Strip */}
        <section className="py-12 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-y border-amber-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 font-black text-lg">
                ★★★★★ <span className="text-slate-800 text-sm ml-2">4.9 / 5.0 Google Puanı</span>
              </div>
              <h3 className="text-xl font-black text-[#0b2e59]">
                İstanbul'un Önde Gelen Ofis ve Şirketlerinin Tercihi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Aya Elektrik, Levent, Maslak, Şişli ve İkitelli OSB'de yüzlerce kurumsal firmaya kesintisiz data altyapısı sağladı.
              </p>
            </div>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0b2e59] text-white hover:bg-[#ffb703] hover:text-[#0b2e59] px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all shrink-0"
            >
              Google Harita Profilimizi Görün
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Bottom CTA Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-[#0b2e59] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black">
                Ağ Altyapınızı Hızlandırın ve Güvene Alın
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Sistem odası düzenleme, yeni kablo çekimi veya internet arızaları için hemen bize ulaşın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-2xl font-black text-base shadow-lg transition-all hover:scale-105"
                >
                  WhatsApp'tan Yazın
                </a>
                <a
                  href={`tel:${phoneNumber}`}
                  className="bg-[#ffb703] hover:bg-[#ffb703]/90 text-[#0b2e59] px-8 py-4 rounded-2xl font-black text-base shadow-lg transition-all hover:scale-105"
                >
                  0530 069 53 93
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}
