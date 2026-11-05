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
  Camera,
  BellRing,
  Lock,
  ArrowRight,
  ExternalLink,
  Eye,
  Server
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";
import { getWhatsAppLink } from "../utils/whatsapp";
import cctvIntercomImg from "../assets/images/security_cctv_intercom_1793229413342.webp";

interface SecurityService {
  title: string;
  badge: string;
  desc: string;
  features: string[];
}

const SECURITY_SERVICES: SecurityService[] = [
  {
    title: "IP & AHD Güvenlik Kamera Sistemleri",
    badge: "Gece Görüş & Uzaktan İzleme",
    desc: "Ev, apartman, villa, dükkan ve otoparklar için 4K/2K yüksek çözünürlüklü güvenlik kamerası kurulumu.",
    features: [
      "Cep telefonundan 7/24 kesintisiz canlı izleme & bildirim",
      "Karanlıkta renkli gece görüşü (ColorVu / Full-color)",
      "NVR / DVR kayıt cihazı, sesli kayıt ve hareket algılama",
      "Kablo kopukluğu, adaptör yanması ve sinyal kaybı anında onarım"
    ]
  },
  {
    title: "Görüntülü Apartman & Villa Diafon Sistemleri",
    badge: "Audio, Netelsan, Multitek",
    desc: "Bina ana kapısı ile daireler arası yüksek çözünürlüklü görüntülü konuşma, kapı açma ve güvenlik bağlantısı.",
    features: [
      "Apartman zili ve eski sesli diafonların görüntülüye dönüşümü",
      "Şifreli ve RFID kartlı bina giriş panelleri",
      "Daireler arası ve güvenlik görevlisiyle dahili görüşme",
      "Zil çalmama, ekran kararması ve kapı açmama arıza tamiri"
    ]
  },
  {
    title: "Akıllı Geçiş & Manyetik Kilit Sistemleri",
    badge: "Bina & Ofis Güvenliği",
    desc: "Manyetik kapı tutucular, şifreli geçiş panelleri, yangın çıkış kapısı acil bas-aç butonları ve otomasyon.",
    features: [
      "Bina ana giriş kapısı trafolu elektrikli kilit karşılığı montajı",
      "Ofisler için parmak izi, yüz tanıma ve kartlı personel takip (PDKS)",
      "Kesintisiz akülü güç kaynağı (Elektrik kesilse dahi kilit açık kalmaz)",
      "Kapı hidroliği ve kilit ayarı ile tam kapanma garantisi"
    ]
  }
];

export default function GuvenlikSistemleriPage() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phoneNumber = "+905300695393";
  const displayPhone = "0530 069 53 93";
  const mapsLink = "https://share.google/35HQ6oDqAvoNMUweP";

  const whatsAppUrl = getWhatsAppLink(
    "Merhaba Aya Elektrik, güvenlik kamerası ve görüntülü diafon sistemi kurulumu / arıza tamiri için keşif ve fiyat teklifi almak istiyorum."
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": "https://ayaelektrik.com/hizmetler/guvenlik-sistemleri-kamera-diafon#service",
        "name": "Güvenlik Kamerası & Görüntülü Diafon Kurulum Hizmeti | Aya Elektrik",
        "serviceType": "Güvenlik Sistemi Kurulum Hizmeti",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Aya Elektrik",
          "telephone": "+905300695393",
          "url": "https://ayaelektrik.com/",
          "sameAs": ["https://share.google/35HQ6oDqAvoNMUweP"]
        },
        "areaServed": "İstanbul (39 İlçe)",
        "description": "İstanbul genelinde ev, apartman ve iş yerleri için IP kamera, gece görüşlü CCTV sistemleri, Audio/Netelsan görüntülü diafon montajı, şifreli kapı kilitleri ve 7/24 zayıf akım arıza onarımı."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Helmet>
        <title>Güvenlik Kamerası & Görüntülü Diafon Montajı | İstanbul Zayıf Akım - Aya Elektrik</title>
        <meta
          name="description"
          content="İstanbul genelinde 7/24 güvenlik kamerası (CCTV / IP) kurulumu, Audio & Netelsan görüntülü diafon sistemleri, şifreli bina kapı kilitleri montajı ve arıza servisi. Ücretsiz yerinde keşif."
        />
        <meta
          name="keywords"
          content="güvenlik kamerası montajı, görüntülü diafon tamiri, istanbul cctv kamera kurulumu, audio görüntülü diafon, netelsan diafon, apartman kamera sistemi, şifreli kapı kilidi, zayıf akım elektrikçi"
        />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/guvenlik-sistemleri-kamera-diafon" />
        <meta property="og:title" content="Güvenlik Kamerası & Görüntülü Diafon Kurulum Hizmeti | Aya Elektrik" />
        <meta property="og:description" content="IP kamera sistemleri, görüntülü diafon, apartman zili ve şifreli kapı otomatikleri kurulum & tamiri. İstanbul 39 ilçe 7/24 servis." />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/security-cctv-og.jpg" />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/guvenlik-sistemleri-kamera-diafon" />
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
          <span className="text-slate-800 font-semibold">Güvenlik Sistemleri & Diafon</span>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#081d36] via-[#0b2e59] to-[#0e3b68] text-white py-16 lg:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffb703_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffb703]/20 border border-[#ffb703]/40 text-[#ffb703] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Google İşletme Onaylı Güvenlik Sistemi Kurulum Hizmeti
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Güvenlik Kamerası & <span className="text-[#ffb703]">Görüntülü Diafon</span> Sistemleri
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Ev, apartman, villa ve iş yerleriniz için <strong>IP/AHD gece görüşlü kamera sistemleri</strong>, 
                  <strong> Audio ve Netelsan görüntülü diafon montajı</strong>, şifreli kapı otomatikleri ve 
                  kesintisiz zayıf akım kablolaması yapıyoruz.
                </p>

                {/* Stat pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-[#ffb703] font-black text-lg">7/24 Canlı İzleme</div>
                    <div className="text-xs text-slate-300">Telefonda Anlık Takip</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-emerald-400 font-black text-lg">Audio & Netelsan</div>
                    <div className="text-xs text-slate-300">Orijinal Garantili Ekipman</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-sky-400 font-black text-lg">Akülü Güç</div>
                    <div className="text-xs text-slate-300">Kesintide Bile Güvende</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-4 rounded-2xl font-black text-base shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Kamera/Diafon Teklifi İste
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
                    src={cctvIntercomImg}
                    alt="Güvenlik kamerası ve görüntülü diafon montajı yapan uzman elektrikçi"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-[#0b2e59] shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-indigo-600" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-600">Zayıf Akım Uzmanlığı</span>
                      </div>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">2 Yıl Garanti</span>
                    </div>
                    <p className="text-xs font-semibold mt-1 text-slate-700">
                      Görüntüde karıncalanma veya zil sesinde kesilme olmaması için %100 bakır Cat6 ve DT-8 korumalı kablo kullanıyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services List / Tabs */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2e59]">
              Güvenlik ve İletişim Çözümlerimiz
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Mülkünüzün güvenliğini en yeni teknoloji IP kameralar ve diafonlarla koruma altına alıyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SECURITY_SERVICES.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#0b2e59]/10 text-[#0b2e59] inline-block mb-4">
                    {srv.badge}
                  </span>
                  <h3 className="text-xl font-black text-[#0b2e59] mb-3">{srv.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{srv.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <a
                    href={getWhatsAppLink(`Merhaba, ${srv.title} için keşif ve montaj teklifi almak istiyorum.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-[#0b2e59] text-white hover:bg-[#ffb703] hover:text-[#0b2e59] transition-all"
                  >
                    Fiyat Teklifi Al
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Faults Fixed */}
        <section className="py-14 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2e59]">
                Sık Karşılaşılan Kamera & Diafon Arızaları ve Çözümlerimiz
              </h2>
              <p className="text-slate-600 mt-2 text-sm">
                Yalnızca sıfır kurulum değil, mevcut arızalı sistemlerinizde de hızlı teknik müdahale sağlıyoruz.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-red-500 font-black text-sm mb-1">Arıza: Siyah Ekran / Video Kaybı</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  BNC soket oksitlenmesi, PoE switch port arızası veya 12V kamera adaptör yanması tespiti ve değişimi.
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-red-500 font-black text-sm mb-1">Arıza: Apartman Kapısı Açılmıyor</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Diafon otomatiğinden kapı kilidine giden 12V hattaki kopukluk ve kilit bobini yanması garantili onarılır.
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-red-500 font-black text-sm mb-1">Arıza: Gece Görüşü Çalışmıyor</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Kameranın IR LED veya beyaz LED aydınlatma modülü arızası ve yetersiz voltaj beslemesi giderilir.
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-red-500 font-black text-sm mb-1">Arıza: Diafon Cızırtısı & Ses Gitmiyor</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Merkezi güç trafosundaki filtre kondansatörü bozulması veya daire içi panel mikrofon arızası tamir edilir.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Reviews Trust Strip */}
        <section className="py-12 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-b border-amber-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 font-black text-lg">
                ★★★★★ <span className="text-slate-800 text-sm ml-2">4.9 / 5.0 Google Harita Skoru</span>
              </div>
              <h3 className="text-xl font-black text-[#0b2e59]">
                Google İşletme Profilimizdeki Müşteri Memnuniyeti
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Sitemizi ve Google profilimizi inceleyen müşterilerimizin gerçek deneyimlerini okuyabilir veya siz de bizi değerlendirebilirsiniz.
              </p>
            </div>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0b2e59] text-white hover:bg-[#ffb703] hover:text-[#0b2e59] px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all shrink-0"
            >
              Google Harita Profilimizi İncele
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Bottom CTA Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-[#0b2e59] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black">
                Mülkünüzün Güvenliğini Ertelemeyin, Hemen Teklif Alın
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                İstanbul Avrupa ve Anadolu Yakası'nda yerinde ücretsiz keşif ile en uygun güvenlik paketini sunuyoruz.
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
