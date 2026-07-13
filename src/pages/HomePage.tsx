import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Coverage from "../components/Coverage";
import Testimonials from "../components/Testimonials";
import BlogSection from "../components/BlogSection";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectricalContractor"],
    "name": "Aya Elektrik",
    "image": "https://ayaelektrik.com/images/og/ana-sayfa-og.jpg",
    "telephone": "+90 530 069 53 93",
    "url": "https://ayaelektrik.com/",
    "openingHours": "Mo-Su 00:00-24:00",
    "areaServed": "İstanbul Avrupa Yakası"
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-[#ffb703] selection:text-[#0b2e59] scroll-smooth pb-[72px] md:pb-0">
      <Helmet>
        <title>İstanbul Acil Elektrikçi | 7/24 Kesintisiz Hizmet - Aya Elektrik</title>
        <meta name="description" content="İstanbul Avrupa Yakası'nda 7/24 acil elektrikçi hizmeti. Arıza tespiti, pano yenileme ve TSE onaylı garantili elektrik çözümleri için 30 dakikada kapınızdayız." />
        <meta name="keywords" content="elektrikçi, acil elektrikçi, istanbul elektrikçi, nöbetçi elektrikçi, elektrik arıza, sigorta atması, pano yenileme" />
        <link rel="canonical" href="https://ayaelektrik.com/" />
        <meta property="og:title" content="İstanbul Acil Elektrikçi | 7/24 Kesintisiz Hizmet - Aya Elektrik" />
        <meta property="og:description" content="İstanbul Avrupa Yakası'nda 7/24 acil elektrikçi hizmeti. Arıza tespiti, pano yenileme ve TSE onaylı garantili elektrik çözümleri için 30 dakikada kapınızdayız." />
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
        <div id="bolgeler" className="scroll-mt-32">
          <Coverage />
        </div>
        <Testimonials />
        <BlogSection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}
