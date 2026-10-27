import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Clock,
  Zap,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  FileText,
  Activity,
  HardHat,
  Cpu
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";
import { getWhatsAppLink } from "../utils/whatsapp";

const VENUES = [
  {
    name: "İFM - İstanbul Fuar Merkezi (Yeşilköy)",
    dist: "Bakırköy / Yeşilköy (Atatürk Havalimanı Karşısı)",
    responseTime: "20 Dakikada Nöbetçi Teknik Ekip",
    description: "Hol 1-11 tüm salonlarda stant içi dağıtım panosu, trifaze 380V besleme, LED truss aydınlatma ve fuar süresince kesintisiz stant başı elektrik desteği."
  },
  {
    name: "TÜYAP Fuar ve Kongre Merkezi (Beylikdüzü)",
    dist: "Beylikdüzü / E-5 Hattı",
    responseTime: "25 Dakikada Adreste Müdahale",
    description: "Ağır sanayi makineleri, kompresör bağlantıları, 63A-125A CEE Norm priz kutuları, geçici kablo köprüleri ve topraklama raporlama."
  },
  {
    name: "Lütfi Kırdar ICEC & Harbiye Kongre Vadisi",
    dist: "Şişli / Harbiye",
    responseTime: "15 Dakikada Stant Başında",
    description: "Tıp kongreleri, lansmanlar, sahne ses-ışık trifaze besleme hatları, UPS yedeklemeli stant pano sistemleri."
  },
  {
    name: "Haliç Kongre Merkezi & Yenikapı Etkinlik Alanı",
    dist: "Beyoğlu - Fatih Sahil Hattı",
    responseTime: "20 Dakikada Yerinde Kurulum",
    description: "Açık hava festivalleri, çadır etkinlikleri, jeneratör senkronizasyonu, yağmur korumalı kauçuk pano ve kablo rampaları."
  }
];

const SERVICES_LIST = [
  {
    title: "Geçici Stant Dağıtım Panosu Kiralama & Kurulumu",
    desc: "Fuar teknik şartnamelerine %100 uygun 16A, 32A, 63A kaçak akımlı sigortalı stant panoları."
  },
  {
    title: "Trifaze (380V) & Monofaze (220V) Güç Hatları",
    desc: "Makineler, kahve makineleri, dev ekranlar ve sunucular için dengeli faz dağıtımı."
  },
  {
    title: "Spot & Ray Truss Aydınlatma Tesisatı",
    desc: "Ürünlerinizi parlatacak 3000K-4000K estetik stant aydınlatmaları ve trafo montajları."
  },
  {
    title: "Kablo Koruma Rampası & Güvenlik Önlemleri",
    desc: "Ziyaretçi trafiğinin yoğun olduğu koridorlarda ağır tonaja dayanıklı kauçuk kablo köprüleri."
  },
  {
    title: "Topraklama Ölçümü & Teknik Uygunluk Belgesi",
    desc: "Fuar yönetiminin talep ettiği EMO/EKAT yetkili fen adamı onaylı topraklama raporları."
  },
  {
    title: "Fuar Boyunca 7/24 Stant Başı Teknik Nöbet",
    desc: "Olası sigorta atması veya kısa devrede saniyeler içinde müdahale eden uzman nöbetçi teknisyen."
  }
];

export default function FuarEtkinlikElektrikPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phoneNumber = "+905300695393";
  const displayPhone = "0530 069 53 93";
  const whatsAppUrl = getWhatsAppLink(
    "Merhaba Aya Elektrik, fuar / etkinlik stant elektrik kurulumu ve dağıtım panosu için teklif almak istiyorum."
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": "https://ayaelektrik.com/hizmetler/fuar-etkinlik-elektrik-kurulumu#service",
        "name": "Fuar ve Etkinlik Elektrik Altyapı Kurulumu | Aya Elektrik",
        "serviceType": "Fuar & Etkinlik Elektrik Mühendisliği",
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
        "areaServed": ["İFM Yeşilköy", "TÜYAP Beylikdüzü", "Lütfi Kırdar", "Yenikapı", "Haliç Kongre", "İstanbul Geneli"],
        "description": "İstanbul genelindeki fuar, kongre, festival ve kurumsal etkinliklerde stant geçici elektrik panoları, jeneratör bağlantıları ve teknik nöbet hizmeti."
      },
      {
        "@type": "FAQPage",
        "@id": "https://ayaelektrik.com/hizmetler/fuar-etkinlik-elektrik-kurulumu#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Fuar stant elektrik kurulumunda fuar idaresinin şartnamesine uygunluk belgesi veriyor musunuz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. İFM, TÜYAP, Lütfi Kırdar gibi fuar merkezlerinin talep ettiği kaçak akım koruma rölesi, topraklama ölçüm raporu ve fen adamı yetki belgeleri eksiksiz olarak fuar yönetimine sunulmaktadır."
            }
          },
          {
            "@type": "Question",
            "name": "Fuar esnasında elektrik kesilirse ne kadar sürede müdahale ediyorsunuz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fuar kurulum günleri ve etkinlik saatleri boyunca fuar alanında veya 15-20 dakika mesafede hazır bekleyen nöbetçi ekiplerimiz anında müdahale sağlamaktadır."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      <Helmet>
        <title>Fuar & Etkinlik Elektrik Kurulumu (İFM, TÜYAP) | Aya Elektrik</title>
        <meta
          name="description"
          content="İFM Yeşilköy, TÜYAP Beylikdüzü ve Lütfi Kırdar fuar stant elektrik kurulumu, geçici dağıtım panoları, aydınlatma ve 7/24 stant başı teknik nöbet hizmeti."
        />
        <meta property="og:title" content="Fuar & Etkinlik Elektrik Kurulumu (İFM, TÜYAP) | Aya Elektrik" />
        <meta
          property="og:description"
          content="Kurumsal fuar stantları, kongreler ve festivaller için anahtar teslim elektrik altyapısı ve acil müdahale ekibi."
        />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/fuar-etkinlik-elektrik-kurulumu" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#021024] via-[#0b2e59] to-[#04152d] text-white py-16 lg:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffb703_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6">
            <Building2 className="w-3.5 h-3.5 fill-amber-300" />
            B2B Kurumsal Fuar & Organizasyon Çözümleri
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight max-w-3xl">
            Fuar & Etkinlik Stant <br />
            <span className="text-[#ffb703]">Elektrik Altyapısı</span> ve Pano Kurulumu
          </h1>

          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            <strong>İFM (İstanbul Fuar Merkezi)</strong>, <strong>TÜYAP</strong>, <strong>Lütfi Kırdar</strong> ve 
            açık hava etkinliklerinde stantlarınız için geçici dağıtım panoları, trifaze 380V makine beslemeleri, 
            truss aydınlatmaları ve <strong>fuar boyunca kesintisiz teknik nöbet</strong> hizmeti sunuyoruz.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center gap-3 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-7 py-4 rounded-xl font-extrabold text-base shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Fuar Hattını Ara ({displayPhone})</span>
            </a>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-xl font-bold text-base transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hızlı Teklif & Şartname Gönder</span>
            </a>
          </div>

          {/* Key Advantages */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <HardHat className="w-4 h-4 text-[#ffb703] shrink-0" />
              <span>EKAT & EMO Tescilli Kadro</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Fuar İdaresi Onaylı Rapor</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400 shrink-0" />
              <span>7/24 Kesintisiz Stant Nöbeti</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ffb703] shrink-0" />
              <span>Gece Montaj & Hızlı Söküm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-bold mb-3">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            Ana Hizmet Noktalarımız
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            İstanbul'un Tüm Fuar ve Kongre Merkezlerinde Aktifiz
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Zeytinburnu ana atölyemizden ve mobil servis araçlarımızdan fuar alanlarına dakikalar içinde ulaşıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VENUES.map((v) => (
            <div
              key={v.name}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">{v.dist}</span>
                  <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                    {v.responseTime}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">{v.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">{v.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Standart Şartnameye Uygun</span>
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-xs font-bold text-[#0b2e59] hover:text-amber-600 inline-flex items-center gap-1"
                >
                  Ekip Talep Et <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Fuar & Etkinlik Elektrik Çözümlerimiz
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Kurulum gecesinden fuar kapanışına kadar stant enerjiniz güvence altında.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((srv, idx) => (
              <div key={srv.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#0b2e59] text-[#ffb703] font-black text-sm flex items-center justify-center mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{srv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Callout Box */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-[#0b2e59] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-amber-300 mb-4">
              <FileText className="w-3.5 h-3.5" />
              Kurumsal Fatura & Sözleşmeli Hizmet
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Fuar Standınızda Elektrik Arızası Sebebiyle Müşteri Kaybetmeyin
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl">
              Fuarın açılış sabahında atan bir ana şalter veya yanıp sönen bir LED ışık kurumsal imajınıza zarar verir. 
              Aya Elektrik olarak tüm yük hesaplamalarını önceden yapar, fuar boyunca acil yedek parça ve teknisyen desteği sağlarız.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-7 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition-transform hover:scale-105"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Teknik Müdürle Görüş: {displayPhone}</span>
              </a>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors border border-white/20"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Stant Çizimini Gönder</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}
