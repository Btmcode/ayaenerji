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
  Sun,
  Flame,
  ArrowRight,
  ExternalLink,
  Wrench,
  Thermometer,
  Gauge
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";
import { getWhatsAppLink } from "../utils/whatsapp";
import solarImg from "../assets/images/solar_panel_ges_maintenance_1793229413190.webp";

export default function GunesPaneliPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phoneNumber = "+905300695393";
  const displayPhone = "0530 069 53 93";
  const mapsLink = "https://share.google/35HQ6oDqAvoNMUweP";

  const whatsAppUrl = getWhatsAppLink(
    "Merhaba Aya Elektrik, çatı tipi güneş paneli (GES) arıza tespiti, solar invertör bakımı ve topraklama ölçümü için servis talep etmek istiyorum."
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": "https://ayaelektrik.com/hizmetler/gunes-paneli-solar-enerji#service",
        "name": "Güneş Paneli Bakım ve Onarım Hizmeti | Aya Elektrik",
        "serviceType": "Güneş Paneli Bakım Hizmeti",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Aya Elektrik",
          "telephone": "+905300695393",
          "url": "https://ayaelektrik.com/",
          "sameAs": ["https://share.google/35HQ6oDqAvoNMUweP"]
        },
        "areaServed": "İstanbul (39 İlçe - Avrupa & Anadolu)",
        "description": "Çatı GES ve güneş enerji santralleri için solar invertör tamiri, DC string arıza tespiti, termal kamera ile hotspot kontrolü, parafudr ve topraklama bakımı."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Helmet>
        <title>Güneş Paneli Bakımı & Solar İnvertör Tamiri | GES Servisi - Aya Elektrik</title>
        <meta
          name="description"
          content="İstanbul geneli çatı GES ve güneş paneli bakım servisi. Solar invertör arıza onarımı, DC izolasyon kaçağı testi, termal hotspot tespiti, topraklama ve periyodik GES elektriksel bakımı."
        />
        <meta
          name="keywords"
          content="güneş paneli bakımı, solar invertör arızası, ges bakım servisi istanbul, çatı ges elektrik ustası, solar dc parafudr, güneş enerjisi topraklama testi"
        />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/gunes-paneli-solar-enerji" />
        <meta property="og:title" content="Güneş Paneli Bakım & GES Elektrik Servisi | Aya Elektrik" />
        <meta property="og:description" content="Çatı tipi GES sistemlerinde solar invertör arızası, DC string kontrolü ve periyodik bakım. 7/24 uzman elektrikçi." />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/solar-og.jpg" />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/gunes-paneli-solar-enerji" />
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
          <span className="text-slate-800 font-semibold">Güneş Paneli Bakım Hizmeti</span>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#091b33] via-[#0b2e59] to-[#0e3b68] text-white py-16 lg:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffb703_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffb703]/20 border border-[#ffb703]/40 text-[#ffb703] text-xs font-bold uppercase tracking-wider">
                  <Sun className="w-4 h-4 text-amber-300" />
                  Google İşletme Onaylı Güneş Paneli Bakım Hizmeti
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Güneş Paneli Bakımı & <span className="text-[#ffb703]">Solar İnvertör Tamiri</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Villa çatıları, fabrika ve işletmeler için <strong>çatı GES elektriksel bakım</strong>, 
                  <strong> solar invertör arıza tespiti</strong>, termal kamera ile hotspot kontrolü, DC/AC parafudr 
                  yıldırım koruması ve <strong>topraklama direnci ölçümü</strong> yapıyoruz.
                </p>

                {/* Stat pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-[#ffb703] font-black text-lg">%100 Güvenlik</div>
                    <div className="text-xs text-slate-300">DC Ark ve Yangın Önleme</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-emerald-400 font-black text-lg">Maksimum Verim</div>
                    <div className="text-xs text-slate-300">İnvertör Optimizasyonu</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-sky-400 font-black text-lg">Termal Rapor</div>
                    <div className="text-xs text-slate-300">Hücre Isı Taraması</div>
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
                    GES Bakım Teklifi Al
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
                    src={solarImg}
                    alt="Çatı tipi güneş paneli ve solar invertör bakımı yapan lisanslı elektrikçi"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-[#0b2e59] shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-amber-600" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-600">Ölçüm & Sertifikasyon</span>
                      </div>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">EMO Normları</span>
                    </div>
                    <p className="text-xs font-semibold mt-1 text-slate-700">
                      Yüksek gerilim DC hatlarda gevşek klemens ark oluşumunu engellemek için tork anahtarlı kontrol ve izolasyon testi yapıyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Scope */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2e59]">
              Güneş Paneli Bakım Paketimizde Neler Var?
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Çatınızdaki güneş enerjisi yatırımınızın güvenle ve tam kapasiteyle elektrik üretmesini sağlıyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0b2e59] mb-3">Solar İnvertör & Pano Bakımı</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                İnvertör hata kodlarının (Error/Alarm) okunması, fan temizliği, klemens sıkılık kontrolü ve yazılım güncellemesi.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Huawei, SMA, Fronius, Sungrow, Solis servisi
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  DC sigorta ve şalter değişimi
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-5">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0b2e59] mb-3">Termal Kamera & Hotspot Testi</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Gözle görünmeyen çatlak veya kısa devre hücrelerin termal kamera ile tespiti. Yangın riski önceden engellenir.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  MC4 soket ısınma tespiti
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Bypass diyot arızası onarımı
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0b2e59] mb-3">Topraklama & Parafudr Koruması</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Yıldırım ve şebeke dalgalanmalarına karşı Tip 1+2 DC/AC parafudr denetimi ve eşpotansiyel topraklama meger ölçümü.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Ohm cinsinden topraklama raporlaması
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Statik elektrik boşaltma hattı kontrolü
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
                ★★★★★ <span className="text-slate-800 text-sm ml-2">4.9 / 5.0 Google İşletme Skoru</span>
              </div>
              <h3 className="text-xl font-black text-[#0b2e59]">
                Google İşletme Profilimizde Müşteri Memnuniyeti
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Güneş paneli ve elektrik tesisatı hizmetlerimiz hakkında gerçek müşteri değerlendirmelerini inceleyin.
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
                Güneş Enerjisi Sisteminizin Güvenliğini Şansa Bırakmayın
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Yılda en az 1 kez yapılan periyodik elektriksel kontrol, invertör ömrünü uzatır ve yangın riskini sıfıra indirir.
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
