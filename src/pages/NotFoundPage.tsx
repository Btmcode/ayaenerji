import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 flex flex-col">
      <Helmet>
        <title>Sayfa Bulunamadı - 404 | Aya Elektrik</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı. Aya Elektrik ana sayfasına dönebilir veya acil elektrikçi çağırabilirsiniz." />
        <link rel="canonical" href="https://ayaelektrik.com/404" />
        <meta property="og:title" content="Sayfa Bulunamadı - 404 | Aya Elektrik" />
        <meta property="og:description" content="Aradığınız sayfa bulunamadı. Aya Elektrik ana sayfasına dönebilir veya acil elektrikçi çağırabilirsiniz." />
        <meta property="og:url" content="https://ayaelektrik.com/404" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/ana-sayfa-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <meta name="robots" content="noindex, follow" />
      
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Sayfa Bulunamadı - 404",
            "description": "Aradığınız sayfa bulunamadı. Aya Elektrik ana sayfasına dönün.",
            "url": "https://ayaelektrik.com/404"
          }`}
        </script>
</Helmet>
      
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-24 pb-12">
        <div className="max-w-xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-black text-[#0b2e59] mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
            Aradığınız Sayfa Bulunamadı
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            Üzgünüz, gitmeye çalıştığınız sayfa taşınmış veya silinmiş olabilir. Acil bir elektrik arızanız varsa hemen bize ulaşabilirsiniz.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="w-full sm:w-auto px-8 py-4 bg-[#ffb703] text-[#0b2e59] rounded-xl font-bold hover:bg-[#e0a000] transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
            <a 
              href="tel:+905300695393" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#0b2e59] border-2 border-[#0b2e59] rounded-xl font-bold hover:bg-[#0b2e59] hover:text-white transition-colors"
            >
              Hemen Usta Çağır
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
