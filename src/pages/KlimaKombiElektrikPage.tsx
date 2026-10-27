import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Flame,
  Wind,
  Bath,
  ArrowRight,
  Sparkles,
  Calculator
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";
import AdBanner from "../components/AdBanner";
import { getWhatsAppLink } from "../utils/whatsapp";

interface CableSpec {
  device: string;
  power: string;
  cable: string;
  fuse: string;
  safetyNote: string;
}

const APPLIANCE_SPECS: CableSpec[] = [
  {
    device: "Klima (9.000 - 12.000 BTU)",
    power: "1.0 - 1.5 kW",
    cable: "3 x 2.5 mm² Halogen Free NYM",
    fuse: "16A C Tipi Bağımsız Sigorta",
    safetyNote: "Panodan direkt bağımsız hat çekilmeli, prizden ek alınmamalıdır."
  },
  {
    device: "Klima (18.000 - 24.000 BTU / Salon Tipi)",
    power: "2.5 - 4.0 kW",
    cable: "3 x 4 mm² Bakır İletken",
    fuse: "20A - 25A C Tipi Sigorta",
    safetyNote: "Yüksek demeraj (kalkış) akımı sebebiyle özel gecikmeli C tipi sigorta şarttır."
  },
  {
    device: "Elektrikli Ani Su Isıtıcı (Şofben 7000W - 8500W)",
    power: "7.0 - 8.5 kW",
    cable: "3 x 4 mm² veya 3 x 6 mm² Tam Kesit",
    fuse: "32A / 40A + 30mA Kaçak Akım",
    safetyNote: "Asla standart prize takılamaz! Doğrudan ana dağıtım panosuna bağlanmalıdır."
  },
  {
    device: "Depolu Termosifon (50L - 100L)",
    power: "1.8 - 2.5 kW",
    cable: "3 x 2.5 mm² Antigron Nem Korumalı",
    fuse: "16A Bağımsız Sigorta",
    safetyNote: "Banyo nemine karşı IP44 korumalı sigorta kutusu ve topraklama mecburidir."
  },
  {
    device: "Kombi & Sirkülasyon Pompası",
    power: "150W - 350W",
    cable: "3 x 1.5 mm² veya 3 x 2.5 mm²",
    fuse: "2A - 6A B Tipi Hassas Sigorta + V-Otomat",
    safetyNote: "Elektronik anakartı voltaj dalgalanmalarından korumak için 2A-6A v-otomat kullanılır."
  },
  {
    device: "İndüksiyonlu Ankastre Ocak",
    power: "6.0 - 7.4 kW",
    cable: "5 x 2.5 mm² (Trifaze) veya 3 x 6 mm² (Monofaze)",
    fuse: "25A / 32A Bağımsız Hat",
    safetyNote: "Tüm gözler aynı anda açıldığında aşırı yük oluşmaması için özel linye çekilir."
  }
];

export default function KlimaKombiElektrikPage() {
  const [selectedDevice, setSelectedDevice] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phoneNumber = "+905300695393";
  const displayPhone = "0530 069 53 93";
  const whatsAppUrl = getWhatsAppLink(
    "Merhaba Aya Elektrik, klima / kombi / şofben için özel elektrik hattı ve sigorta altyapısı çektirmek istiyorum."
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": "https://ayaelektrik.com/hizmetler/klima-kombi-elektrik-altyapisi#service",
        "name": "Klima, Kombi ve Şofben Bağımsız Elektrik Hattı Çekimi | Aya Elektrik",
        "serviceType": "Elektrik Altyapı ve Linye Çekimi",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Aya Elektrik",
          "telephone": "+905300695393",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Maltepe Mah. Yedikule Çırpıcı Yolu No: 33",
            "addressLocality": "Zeytinburnu",
            "addressRegion": "İstanbul",
            "addressCountry": "TR"
          }
        },
        "areaServed": "İstanbul Geneli (Avrupa ve Anadolu Yakası)",
        "description": "Klima, kombi, elektrikli şofben, termosifon ve indüksiyonlu ocaklar için panodan bağımsız özel linye kablo çekimi, sigorta ve kaçak akım montajı."
      },
      {
        "@type": "FAQPage",
        "@id": "https://ayaelektrik.com/hizmetler/klima-kombi-elektrik-altyapisi#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Klima için prizden ek hat çekmek güvenli midir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hayır. Klimalar özellikle ilk kalkış anında yüksek akım çeker. Mevcut bir prizden ek almak, o hattaki buşon ve buat kablolarının aşırı ısınmasına ve yangın çıkmasına neden olur. Klimalara daima ana panodan bağımsız hat çekilmelidir."
            }
          },
          {
            "@type": "Question",
            "name": "Şofben ve termosifon montajında kaç mm kablo ve hangi sigorta kullanılır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "7000W-8500W ani şofbenler için en az 3x4 mm² bakır kablo ve 32A-40A sigorta gereklidir. Depolu termosifonlarda ise 3x2.5 mm² kablo ve 16A bağımsız sigorta kullanılır."
            }
          },
          {
            "@type": "Question",
            "name": "İstanbul genelinde hat çekim servisi ne kadar sürede gelir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Aya Elektrik mobil nöbetçi ekipleriyle İstanbul'un 39 ilçesinde çağrınızdan sonra ortalama 30-45 dakika içinde adresinizde keşif ve montaj yapmaktadır."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      <Helmet>
        <title>Klima, Kombi & Şofben Elektrik Hattı Çekimi | Aya Elektrik</title>
        <meta
          name="description"
          content="Klima, kombi, termosifon ve ani su ısıtıcı şofben için ana panodan bağımsız 3x2.5 / 3x4mm hat çekimi ve sigorta montajı. İstanbul geneli 30 dk'da kapınızda."
        />
        <meta property="og:title" content="Klima, Kombi & Şofben Elektrik Hattı Çekimi | Aya Elektrik" />
        <meta
          property="og:description"
          content="Yüksek güç çeken cihazlarınıza özel yangın korumalı bağımsız elektrik hattı, sigorta ve buat montajı."
        />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/klima-kombi-elektrik-altyapisi" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#04152d] via-[#0b2e59] to-[#04152d] text-white py-16 lg:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffb703_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            Cihaz Montajı Öncesi & Sonrası Özel Altyapı
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight max-w-3xl">
            Klima, Kombi & Şofben İçin <br />
            <span className="text-[#ffb703]">Bağımsız Elektrik Hattı</span> ve Sigorta Çekimi
          </h1>

          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Yüksek akım çeken iklimlendirme ve ısıtıcı cihazlarınızı standart prizlere bağlayıp yangın riski oluşturmayın. 
            Ana elektrik panonuzdan cihazınıza özel <strong>tam kesit bakır linye</strong>, 
            <strong>C/B tipi sigorta</strong> ve <strong>kaçak akım koruması</strong> kuruyoruz.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center gap-3 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-7 py-4 rounded-xl font-extrabold text-base shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Hemen Usta Çağır ({displayPhone})</span>
            </a>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-xl font-bold text-base transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp'tan Keşif & Fiyat İste</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ffb703] shrink-0" />
              <span>30-45 Dk'da Adrese Varış</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TSE & Halogen Free Malzeme</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ffb703] shrink-0" />
              <span>1 Yıl İşçilik Garantisi</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>39 İlçede Motorize Ekip</span>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Safety Alert Box */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-bold text-red-950 flex items-center gap-2">
              <span>Hayati Uyarı: Neden Standart Prize Bağlanamaz?</span>
              <span className="text-xs px-2 py-0.5 rounded bg-red-200 text-red-800 font-extrabold uppercase">Yangın Riski</span>
            </h2>
            <p className="text-xs sm:text-sm text-red-800 mt-1 leading-relaxed">
              Klima (özellikle 18.000 BTU üstü) ve 7000 Watt elektrikli ani şofbenler çalışırken ortalama 16 ila 36 Amper akım çeker. 
              Eski tip ev prizleri ise en fazla 10-16 Amper taşıyabilir. Ortak buat kablosunun aşırı ısınıp duvar içinde erimesi ve alev alması 
              İstanbul'daki konut yangınlarının 1 numaralı sebebidir. Cihazınızı riske atmayın.
            </p>
          </div>
          <a
            href={`tel:${phoneNumber}`}
            className="w-full md:w-auto shrink-0 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold text-center transition-colors shadow-sm"
          >
            Hemen Güvenli Hat Çektir
          </a>
        </div>
      </section>

      {/* Interactive Appliance Specification Selector */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#0b2e59] rounded-full text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Teknik Standartlar Kılavuzu
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hangi Cihaz İçin Hangi Kablo & Sigorta Gerekir?
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Bağlatmak istediğiniz cihazı seçin, ulusal iç tesisler yönetmeliğine uygun teknik şartnameyi inceleyin:
          </p>
        </div>

        {/* Device Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {APPLIANCE_SPECS.map((item, index) => (
            <button
              key={item.device}
              onClick={() => setSelectedDevice(index)}
              className={`p-3 rounded-xl text-xs font-bold border transition-all text-left flex flex-col justify-between min-h-[78px] ${
                selectedDevice === index
                  ? "bg-[#0b2e59] text-white border-[#0b2e59] shadow-md shadow-blue-950/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="line-clamp-2">{item.device.split("(")[0]}</span>
              <span className={`text-[10px] font-semibold mt-1 ${selectedDevice === index ? "text-[#ffb703]" : "text-slate-400"}`}>
                {item.power}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Device Specification Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Teknik Montaj Detayı</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {APPLIANCE_SPECS[selectedDevice].device}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Güç Tüketimi: {APPLIANCE_SPECS[selectedDevice].power}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-slate-100">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500">Önerilen Kablo Kesiti</span>
              <div className="text-base font-black text-slate-900 mt-1">
                {APPLIANCE_SPECS[selectedDevice].cable}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Isınma yapmaz, yangına dayanıklı.</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500">Doğru Sigorta Değeri</span>
              <div className="text-base font-black text-slate-900 mt-1">
                {APPLIANCE_SPECS[selectedDevice].fuse}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Demeraj ve ani pik akım korumalı.</p>
            </div>

            <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/70">
              <span className="text-xs font-semibold text-amber-800">Usta Güvenlik Notu</span>
              <div className="text-xs font-bold text-amber-950 mt-1 leading-snug">
                {APPLIANCE_SPECS[selectedDevice].safetyNote}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              Servis montaj ekibi gelmeden önce elektrik altyapısını hazır hale getirelim.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${phoneNumber}`}
                className="w-full sm:w-auto px-6 py-3 bg-[#0b2e59] hover:bg-[#143f75] text-white rounded-xl text-xs sm:text-sm font-bold text-center transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#ffb703]" />
                <span>Bu Cihaz İçin Hat Çektir</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Elektrik Hattı Çekiminde 4 Aşamalı Profesyonel Süreç
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Duvarlarınızı kırmadan, estetik kablo kanallarıyla sıfır hata garantili montaj.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-9 h-9 rounded-xl bg-[#0b2e59] text-white font-black text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Güç & Mesafe Keşfi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cihazın kW gücüne, panoya olan uzaklığına ve binanın trifaze/monofaze durumuna göre kablo kesiti belirlenir.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-9 h-9 rounded-xl bg-[#0b2e59] text-white font-black text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Estetik Kanal / Sıva Altı</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dekorasyonu bozmamak adına kendinden yapışkanlı TSE onaylı PVC kablo kanalları veya boru içi çekim uygulanır.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-9 h-9 rounded-xl bg-[#0b2e59] text-white font-black text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Panoya Sigorta Montajı</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ana sigorta kutusuna bağımsız Siemens/Schneider otomat eklenir ve kaçak akım koruması test edilir.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-9 h-9 rounded-xl bg-[#0b2e59] text-white font-black text-sm flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Yük Testi & Devreye Alma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multimetre ve pensampermetre ile voltaj düşümü ve tam yük amperajı ölçülüp sistem güvenle teslim edilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-8">
          Sıkça Sorulan Sorular
        </h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Klima montaj servisi gelmeden önce mi hat çektirmeliyim?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Evet. Yetkili klima servisleri genellikle montaj yaparken bina elektrik altyapısına müdahale etmez; hazır elektrik hattı bulunmadığında cihazı garantili çalıştırmayabilirler. Cihaz gelmeden önce veya aynı gün ustamızı çağırarak panodan hattınızı hazırlatabilirsiniz.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Termosifon veya şofben banyoda ıslanırsa elektrik çarpar mı?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Doğru çekilmiş bir altyapıda 30mA Hayat Koruma Kaçak Akım Rölesi ve sağlam bir topraklama hattı bulunur. Herhangi bir su teması veya kaçak anında sigorta saliseler içinde elektriği keserek çarpılmayı önler. Standart prizlerde ise bu koruma çoğu zaman devre dışı kalır.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              İstanbul'un her ilçesine aynı gün geliyor musunuz?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Evet. Avrupa ve Anadolu yakasında 6 mobil merkez üssümüz bulunmaktadır. Zeytinburnu, Bakırköy, Kadıköy, Ümraniye, Beşiktaş ve Beylikdüzü başta olmak üzere 39 ilçeye aynı gün randevulu veya acil servis sağlamaktayız.
            </p>
          </div>
        </div>
      </section>

      {/* Floating CTA Banner */}
      <section className="bg-gradient-to-r from-[#0b2e59] to-[#04152d] text-white py-12 px-4 sm:px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Evinizi Yangın Riskinden Koruyun, Cihazınız Tam Performans Çalışsın
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Hemen arayın; 30 dakikada nöbetçi teknisyenimiz kapınızda olsun, garantili bağımsız hattınızı çekelim.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${phoneNumber}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-8 py-3.5 rounded-xl font-extrabold text-sm shadow-lg transition-transform hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>0530 069 53 93'ü Ara</span>
            </a>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Destek</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}
