import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import QuickQuoteSection from "../components/QuickQuoteSection";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";

import { ISTANBUL_DISTRICTS } from "../data/istanbulDistricts";

// Lazy load below-the-fold heavy components for ultra-fast mobile initial paint
const Coverage = React.lazy(() => import("../components/Coverage"));
const Testimonials = React.lazy(() => import("../components/Testimonials"));
const BlogSection = React.lazy(() => import("../components/BlogSection"));
const FAQ = React.lazy(() => import("../components/FAQ"));
const Contact = React.lazy(() => import("../components/Contact"));

const SectionFallback = ({ minHeight = "min-h-[300px]" }: { minHeight?: string }) => (
  <div className={`w-full ${minHeight} flex items-center justify-center p-8`} />
);

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Electrician", "ElectricalContractor", "EmergencyService"],
    "name": "Aya Elektrik",
    "image": "https://ayaelektrik.com/images/og/ana-sayfa-og.jpg",
    "telephone": "+90 530 069 53 93",
    "url": "https://ayaelektrik.com/",
    "sameAs": [
      "https://share.google/35HQ6oDqAvoNMUweP"
    ],
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "₺₺",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "128"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Maltepe Mah. Yedikule Çırpıcı Yolu No: 33",
      "addressLocality": "Zeytinburnu",
      "addressRegion": "İstanbul",
      "postalCode": "34010",
      "addressCountry": "TR"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Aya Elektrik Hizmetleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "7/24 Acil Nöbetçi Elektrikçi Servisi",
            "description": "Sigorta atması, pano yanması, priz arızaları ve kaçak akım sorunlarına 30 dakikada acil motorize müdahale."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Elektrikli Araç Şarj İstasyonu (Wallbox) Yüklenicisi",
            "description": "Togg, Tesla ve tüm elektrikli araçlar için müstakil güç hattı, 11-22 kW Wallbox montajı ve Tip-B DC kaçak akım korumalı pano."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Güvenlik Sistemi Kurulum Hizmeti",
            "description": "IP gece görüşlü CCTV kamera sistemleri, Audio/Netelsan görüntülü diafon montajı, şifreli kapı kilitleri ve zayıf akım tamiri."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Telekomünikasyon İşleri Yüklenicisi",
            "description": "Cat6/Cat7 yapısal internet kablolaması, fiber optik sonlandırma, sistem odası ve rack kabinet düzenleme."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Güneş Paneli Bakım Hizmeti",
            "description": "Çatı tipi GES güneş enerjisi santralleri elektriksel bakımı, solar invertör arıza onarımı ve termal kontrol."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Klima & Kombi Elektrik Tesisatı",
            "description": "Yüksek akım çeken iklimlendirme ve ısıtma cihazları için panodan bağımsız özel linye ve gecikmeli C tipi sigorta."
          }
        }
      ]
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "İstanbul (Tüm İlçeler - Avrupa & Anadolu Yakası)"
      },
      ...ISTANBUL_DISTRICTS.map(d => ({
        "@type": "AdministrativeArea",
        "name": `${d.name}, İstanbul`
      }))
    ]
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-[#ffb703] selection:text-[#0b2e59] scroll-smooth pb-[72px] md:pb-0">
      <Helmet>
        <title>İstanbul Elektrikçi | 7/24 Acil & Nöbetçi Usta Servisi - Aya Elektrik</title>
        <meta name="description" content="İstanbul geneli 39 ilçede (Avrupa & Anadolu) 7/24 elektrikçi ve nöbetçi elektrik ustası. Kadıköy, Ümraniye, Beşiktaş dahil 30 dakikada adresteyiz. Garantili servis." />
        <meta name="keywords" content="elektrikçi, istanbul elektrikçi, acil elektrikçi, nöbetçi elektrikçi, kadıköy elektrikçi, ümraniye elektrikçi, ataşehir elektrikçi, üsküdar elektrikçi, beşiktaş elektrikçi, şişli elektrikçi, elektrik ustası" />
        <link rel="canonical" href="https://ayaelektrik.com/" />
        <meta property="og:title" content="İstanbul Elektrikçi | 7/24 Acil & Nöbetçi Usta Servisi - Aya Elektrik" />
        <meta property="og:description" content="İstanbul geneli 39 ilçede (Avrupa & Anadolu) 7/24 elektrikçi ve nöbetçi elektrik ustası. 30 dakikada kapınızda garantili elektrik servisi." />
        <meta property="og:url" content="https://ayaelektrik.com/" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/ana-sayfa-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <QuickQuoteSection />
        <React.Suspense fallback={<SectionFallback minHeight="min-h-[500px]" />}>
          <div id="bolgeler" className="scroll-mt-32">
            <Coverage />
          </div>
          <Testimonials />
          <BlogSection />
          <FAQ />
          <Contact />
        </React.Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}
