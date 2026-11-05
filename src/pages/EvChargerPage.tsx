import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Clock,
  Zap,
  CheckCircle2,
  ChevronRight,
  Car,
  BatteryCharging,
  Flame,
  ArrowRight,
  Sparkles,
  HelpCircle,
  MapPin,
  ExternalLink
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";
import AdBanner from "../components/AdBanner";
import { getWhatsAppLink } from "../utils/whatsapp";
import evChargingImg from "../assets/images/aya_ev_charging_1792144276050.webp";

interface EvPackage {
  title: string;
  power: string;
  cable: string;
  breaker: string;
  suitableFor: string;
  highlight: string;
}

const EV_PACKAGES: EvPackage[] = [
  {
    title: "Monofaze Ev Tipi Wallbox",
    power: "7.4 kW (32 Amper)",
    cable: "3 x 6 mm² veya 3 x 10 mm² Halogen Free",
    breaker: "40A C Tipi Sigorta + 30mA B Tipi Kaçak Akım",
    suitableFor: "Müstakil evler, tek fazlı daire otoparkları (Togg T10X, Tesla Model Y, Megane E-Tech)",
    highlight: "Geceden sabaha tam şarj imkanı"
  },
  {
    title: "Trifaze Site & Villa Wallbox (Önerilen)",
    power: "11 kW / 22 kW (3x16A veya 3x32A)",
    cable: "5 x 6 mm² veya 5 x 10 mm² XLPE / NYY",
    breaker: "Trifaze C-Otomat + DC Kaçak Algılamalı B Tipi RCD",
    suitableFor: "Kapalı otoparklı siteler, villalar, şirket otoparkları ve ticari filolar",
    highlight: "3 kat daha hızlı, dengeli faz yükü"
  },
  {
    title: "Müstakil Sayaç Panosu Güç Hattı",
    power: "Özel Bağımsız Linye",
    cable: "Sayaçtan otopark alanına zırhlı tava/çelik spiral hat",
    breaker: "Kofana bağlantılı aşırı akım & parafudr yıldırım koruması",
    suitableFor: "Site yönetim onaylı bağımsız sayaç çekimi gerektiren durumlar",
    highlight: "Bina ana tesisatına sıfır yük riski"
  }
];

export default function EvChargerPage() {
  const [selectedPkg, setSelectedPkg] = useState<number>(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phoneNumber = "+905300695393";
  const displayPhone = "0530 069 53 93";
  const mapsLink = "https://share.google/35HQ6oDqAvoNMUweP";

  const whatsAppUrl = getWhatsAppLink(
    "Merhaba Aya Elektrik, elektrikli araç şarj istasyonu (Wallbox) kurulumu ve bağımsız elektrik hattı için ücretsiz keşif/fiyat teklifi almak istiyorum."
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": "https://ayaelektrik.com/hizmetler/elektrikli-arac-sarj-istasyonu#service",
        "name": "Elektrikli Araç Şarj İstasyonu (Wallbox) Kurulumu & Güç Hattı | Aya Elektrik",
        "serviceType": "Elektrikli Araç Şarj İstasyonu Yüklenicisi",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Aya Elektrik",
          "telephone": "+905300695393",
          "url": "https://ayaelektrik.com/",
          "sameAs": ["https://share.google/35HQ6oDqAvoNMUweP"]
        },
        "areaServed": "İstanbul (39 İlçe - Avrupa & Anadolu)",
        "description": "Togg, Tesla ve tüm elektrikli araçlar için ev, site ve ofis otoparklarına sertifikalı Wallbox şarj ünitesi montajı, zırhlı güç kablosu çekimi, Tip-B kaçak akım korumalı şarj panosu kurulumu."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Helmet>
        <title>Elektrikli Araç Şarj İstasyonu Kurulumu | Wallbox & Togg-Tesla Şarj Hattı - Aya Elektrik</title>
        <meta
          name="description"
          content="İstanbul geneli elektrikli araç şarj istasyonu (Wallbox) kurulumu. Togg, Tesla, BMW, Porsche için sayaçtan bağımsız linye çekimi, B tipi kaçak akım korumalı şarj panosu ve yetkili elektrikçi garantisi."
        />
        <meta
          name="keywords"
          content="elektrikli araç şarj istasyonu, wallbox montajı, togg şarj istasyonu kurulumu, tesla wall connector montajı, ev tipi şarj ünitesi elektrik hattı, otopark elektrikli araç şarj panosu, istanbul elektrikçi"
        />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/elektrikli-arac-sarj-istasyonu" />
        <meta property="og:title" content="Elektrikli Araç Şarj İstasyonu Kurulumu & Wallbox Montajı | Aya Elektrik" />
        <meta property="og:description" content="Togg ve Tesla uyumlu ev & site tipi Wallbox montajı, bağımsız güç hattı çekimi ve şarj panosu. İstanbul geneli 7/24 keşif ve montaj." />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/ev-charging-og.jpg" />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/elektrikli-arac-sarj-istasyonu" />
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
          <span className="text-slate-800 font-semibold">Elektrikli Araç Şarj İstasyonu</span>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#071c35] via-[#0b2e59] to-[#0d3b66] text-white py-16 lg:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffb703_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffb703]/20 border border-[#ffb703]/40 text-[#ffb703] text-xs font-bold uppercase tracking-wider">
                  <BatteryCharging className="w-4 h-4 animate-pulse" />
                  Google İşletme Onaylı Şarj İstasyonu Yüklenicisi
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Elektrikli Araç Şarj İstasyonu (Wallbox) <span className="text-[#ffb703]">Montajı & Güç Hattı</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Togg, Tesla, Volvo, Porsche ve tüm EV modelleri için evinizin, villanızın veya sitenizin otoparkına 
                  <strong> 11 kW / 22 kW sertifikalı Wallbox montajı</strong>, ana sayaçtan müstakil zırhlı kablo çekimi ve 
                  <strong> Tip-B DC kaçak akım korumalı şarj panosu</strong> kurulumu yapıyoruz.
                </p>

                {/* Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-[#ffb703] font-black text-lg">Togg & Tesla</div>
                    <div className="text-xs text-slate-300">%100 Uyumlu Kurulum</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-emerald-400 font-black text-lg">Tip-B RCD</div>
                    <div className="text-xs text-slate-300">DC Kaçak Koruma</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-sky-400 font-black text-lg">7/24 Keşif</div>
                    <div className="text-xs text-slate-300">İstanbul 39 İlçe</div>
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
                    WhatsApp ile Keşif & Teklif İste
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

              {/* Image Frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] bg-slate-800">
                  <img
                    src={evChargingImg}
                    alt="Elektrikli Araç Şarj İstasyonu Wallbox montajı ve şarj panosu bağlantısı"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-[#0b2e59] shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-600">Teknik Güvence</span>
                      </div>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">TSE Onaylı</span>
                    </div>
                    <p className="text-xs font-semibold mt-1 text-slate-700">
                      Standart prizden şarj yangın riski doğurur. Kesiti hesaplanmış özel linye ve yangın korumalı kablo kullanıyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Dedicated EV Line Is Critical */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#0b2e59] bg-[#0b2e59]/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Hayati Güvenlik Bilgisi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2e59] mt-3">
              Elektrikli Aracınızı Neden Standart Prizden Şarj Etmemelisiniz?
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              Bir elektrikli araç saatlerce aralıksız 2.3 kW ile 22 kW arasında yüksek akım çeker. Evinizdeki standart prizler 
              yalnızca kısa süreli kullanımlar için tasarlanmıştır.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-800 text-lg mb-2">Kablo Aşırı Isınması & Yangın</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yetersiz kesitteki kablolar ve buat ek noktaları saatlerce yüksek akım altında 80°C üzerine çıkarak izolasyon erimesine ve ark yangınına yol açar.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-800 text-lg mb-2">DC Kaçak Akım Riski</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Araç bataryaları DC (Doğru Akım) depolar. Standart AC kaçak akım röleleri (Tip-AC) DC kaçaklarını göremez ve kilitlenir; bu da gövdeye elektrik kaçağında çarpmaya neden olur.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-800 text-lg mb-2">Aya Elektrik Çözümü</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ana sayaç panosundan aracın şarj istasyonuna doğrudan kesintisiz 5x6mm² veya 5x10mm² zırhlı kablo, bağımsız C-otomat ve Tip-B DC kaçak akım koruma panosu tesis ediyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Packages Table / Cards */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2e59]">
                Kurulum Tipleri ve Teknik Şartnameler
              </h2>
              <p className="text-slate-600 mt-2 text-sm">
                Otoparkınızın altyapısına ve aracınızın şarj kapasitesine göre en verimli çözümü belirliyoruz.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {EV_PACKAGES.map((pkg, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPkg(idx)}
                  className={`rounded-3xl p-6 cursor-pointer transition-all border-2 flex flex-col justify-between ${
                    selectedPkg === idx
                      ? "border-[#ffb703] bg-gradient-to-b from-amber-50/50 to-white shadow-xl scale-[1.02]"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#0b2e59] text-white">
                        {pkg.power}
                      </span>
                      {idx === 1 && (
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#ffb703] text-[#0b2e59]">
                          En Çok Tercih Edilen
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-[#0b2e59] mb-3">{pkg.title}</h3>
                    <p className="text-xs text-slate-500 mb-4">{pkg.suitableFor}</p>

                    <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                      <div>
                        <span className="font-bold text-slate-700 block">Kablo Kesiti:</span>
                        <span className="text-slate-600">{pkg.cable}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 block">Sigorta & Koruma:</span>
                        <span className="text-slate-600">{pkg.breaker}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 block">Avantaj:</span>
                        <span className="text-emerald-700 font-semibold">{pkg.highlight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href={getWhatsAppLink(`Merhaba, ${pkg.title} (${pkg.power}) için ücretsiz keşif ve montaj teklifi almak istiyorum.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-[#0b2e59] text-white hover:bg-[#ffb703] hover:text-[#0b2e59] transition-all"
                    >
                      Bu Paket İçin Teklif Al
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Installation Process */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2e59]">
              4 Adımda Güvenli Şarj İstasyonu Kurulumu
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Keşiften devreye almaya kadar her aşamayı EMO (Elektrik Mühendisleri Odası) standartlarında yürütüyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-[#0b2e59] text-[#ffb703] font-black text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Yerinde Güç Keşfi</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Bina ana besleme kapasitesi, sayaç panosu mesafesi ve mevcut topraklama direnci (Ohm testi) ölçülür.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-[#0b2e59] text-[#ffb703] font-black text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Müstakil Kablo Çekimi</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Kapalı otopark tavası, çelik zırhlı spiral veya kanal içerisinden yangın geciktirici (halogen free) kablo çekilir.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-[#0b2e59] text-[#ffb703] font-black text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Koruma Panosu Montajı</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Wallbox'ın hemen yanına IP65 korumalı şarj panosu, B Tipi kaçak akım ve parafudr bağlantısı yapılır.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-[#0b2e59] text-[#ffb703] font-black text-lg flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Test & Devreye Alma</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Araç simülatörüyle voltaj düşümü, şarj akımı ve acil durdurma test edilerek eksiksiz teslim edilir.
              </p>
            </div>
          </div>
        </section>

        {/* Google Reviews & Trust Banner */}
        <section className="py-12 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-y border-amber-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 font-black text-lg">
                ★★★★★ <span className="text-slate-800 text-sm ml-2">4.9 / 5.0 (120+ Google İncelemesi)</span>
              </div>
              <h3 className="text-xl font-black text-[#0b2e59]">
                Google İşletme Profilimizden Doğrulanmış Müşteri Yorumları
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Aya Elektrik, İstanbul Avrupa ve Anadolu Yakası'nda yüzlerce Togg ve Tesla kullanıcısına sorunsuz şarj kurulumu sağladı.
              </p>
            </div>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0b2e59] text-white hover:bg-[#ffb703] hover:text-[#0b2e59] px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all shrink-0"
            >
              Google Haritalar'da İncele & Yorum Yaz
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-[#0b2e59] mb-8">
            Elektrikli Araç Şarj Kurulumu Sıkça Sorulan Sorular
          </h2>

          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm group">
              <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center text-sm sm:text-base">
                Apartman veya sitede şarj istasyonu kurmak için yönetimden izin almam gerekir mi?
                <span className="text-[#0b2e59] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kat Mülkiyeti Kanunu uyarınca, kendi bağımsız elektrik sayacınızdan kapalı otoparktaki tahsisli araç park yerinize çekilecek yangın korumalı bağımsız hatlar için site yönetimine bildirimde bulunmanız yeterlidir. Ortak sayaç kullanılacaksa alt sayaç takılması için yönetim kurulu kararı gereklidir. Ekiplerimiz yönetim onayına uygun teknik dosya hazırlamaktadır.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm group">
              <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center text-sm sm:text-base">
                Togg T10X veya Tesla Model Y evde kaç saatte şarj olur?
                <span className="text-[#0b2e59] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                11 kW trifaze Wallbox ile Togg T10X (88.5 kWh batarya) yaklaşık 6-7 saatte %20'den %80'e şarj olur. Standart 2.3 kW ev tipi prizle bu süre 35-40 saati bulabilmektedir. 22 kW kurulumlarda ise aracınızın dahili AC şarj inverter kapasitesine bağlı olarak en yüksek hız elde edilir.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm group">
              <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center text-sm sm:text-base">
                Bina ana panosunda güç artırımı (sözleşme gücü) yaptırmam gerekir mi?
                <span className="text-[#0b2e59] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mevcut aboneliğiniz monofaze ise ve 11-22 kW trifaze şarj ünitesi taktırmak istiyorsanız BEDAŞ / AYEDAŞ üzerinden trifazeye geçiş veya güç artırımı talep edilmesi gerekebilir. Ekiplerimiz ana panonuzdaki mevcut yükü ölçerek güç artırımına ihtiyaç olup olmadığını keşif esnasında ücretsiz tespit eder.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm group">
              <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center text-sm sm:text-base">
                Hangi marka Wallbox cihazlarının montajını yapıyorsunuz?
                <span className="text-[#0b2e59] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tesla Wall Connector, Trugo, Vestel EVC04, ABB Terra AC, Schneider EVlink, Siemens VersiCharge, Legrand, Ensto ve diğer tüm Tip-2 soketli şarj ünitelerinin montajını ve altyapı güç kablolamasını yapıyoruz. Cihazınızı kendiniz temin etmiş olsanız bile sadece montaj ve hat çekimi hizmeti veriyoruz.
              </p>
            </details>
          </div>
        </section>

        {/* Bottom CTA Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-[#0b2e59] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black">
                Elektrikli Aracınız İçin Hemen Ücretsiz Keşif Randevusu Alın
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                İstanbul'un tüm 39 ilçesinde nöbetçi mobil ekiplerimizle aynı gün keşif ve projelendirme yapıyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-2xl font-black text-base shadow-lg transition-all hover:scale-105"
                >
                  WhatsApp'tan Hemen Yazın
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
