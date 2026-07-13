import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { Phone, Clock, MapPin } from 'lucide-react';

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectricalContractor"],
    "name": "Aya Elektrik",
    "url": "https://ayaelektrik.com",
    "telephone": "+905300695393",
    "openingHours": "Mo-Su 00:00-24:00",
    "areaServed": [
      "Beşiktaş", "Şişli", "Beyoğlu", "Sarıyer", "Bakırköy", 
      "Bahçelievler", "Güngören", "Bağcılar", "Esenler", "Bayrampaşa", 
      "Gaziosmanpaşa", "Eyüpsultan", "Sultangazi", "Kağıthane", "Zeytinburnu", 
      "Küçükçekmece", "Avcılar", "Başakşehir", "Esenyurt", "Arnavutköy", 
      "Büyükçekmece", "Beylikdüzü", "Fatih", "Silivri", "Çatalca"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "İstanbul",
      "addressRegion": "Avrupa Yakası",
      "addressCountry": "TR"
    }
  };

  return (
    <>
      <Helmet>
        <title>İletişim | Aya Elektrik 7/24 Acil Elektrikçi İstanbul</title>
        <meta name="description" content="İstanbul Avrupa Yakası 7/24 acil elektrikçi servisimize ulaşın. 30 dakikada adresinize geliyoruz. İletişim formu ve telefon numaramız." />
        <link rel="canonical" href="https://ayaelektrik.com/iletisim" />
        <meta property="og:title" content="İletişim | Aya Elektrik" />
        <meta property="og:description" content="İstanbul Avrupa Yakası 7/24 acil elektrikçi servisimize ulaşın. 30 dakikada adresinize geliyoruz." />
        <meta property="og:url" content="https://ayaelektrik.com/iletisim" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 min-h-screen flex flex-col">
        {/* Top Emergency CTA Section */}
        <section className="bg-[#0b2e59] text-white py-16 md:py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">İletişim & Acil Servis</h1>
            <p className="text-xl text-slate-300 mb-10 flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-[#ffb703]" /> 
              <span>7/24 — 30 dakikada adresinizde</span>
            </p>
            
            <a 
              href="tel:+905300695393" 
              className="inline-flex items-center gap-4 bg-[#ffb703] text-[#0b2e59] px-8 py-5 md:px-12 md:py-6 rounded-2xl font-black text-3xl md:text-5xl hover:bg-white transition-all transform hover:scale-105 shadow-[0_10px_40px_rgba(255,183,3,0.3)]"
            >
              <Phone className="w-8 h-8 md:w-12 md:h-12" />
              0530 069 53 93
            </a>
            
            <div className="mt-10 inline-flex items-center gap-3 text-slate-300 bg-white/10 px-6 py-3 rounded-full">
              <MapPin className="w-5 h-5 text-[#ffb703]" />
              <span className="font-medium">İstanbul Avrupa Yakası Tüm İlçelere Hizmetimiz Vardır</span>
            </div>
          </div>
        </section>

        {/* Form & Info Section */}
        <div className="-mt-10">
          <Contact />
        </div>

        {/* Map Section */}
        <section className="h-[400px] w-full mt-auto">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192698.81156543084!2d28.64332909403819!3d41.00519128526149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVsLCBBdnJ1cGEgWWFrYXPEsQ!5e0!3m2!1str!2str!4v1709425000000!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Aya Elektrik Hizmet Bölgesi"
          ></iframe>
        </section>
      </main>
      
      <Footer />
    </>
  );
}

