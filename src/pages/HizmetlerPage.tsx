import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Zap, 
  Settings, 
  ShieldCheck, 
  Power, 
  BatteryCharging, 
  AlertOctagon 
} from 'lucide-react';

const hizmetler = [
  {
    title: "Acil Elektrik Arıza",
    desc: "İstanbul Avrupa Yakası'nda 7/24 acil elektrikçi servisimizle 30 dakikada sorunlara müdahale ediyoruz.",
    path: "/hizmetler/acil-elektrik-ariza",
    icon: <Zap className="w-8 h-8 text-[#ffb703]" />
  },
  {
    title: "Elektrik Tesisatı",
    desc: "Ev ve ofisler için sıfırdan elektrik tesisatı çekimi, arıza tespiti ve güvenli altyapı kurulumu.",
    path: "/hizmetler/elektrik-tesisati",
    icon: <Settings className="w-8 h-8 text-[#ffb703]" />
  },
  {
    title: "Pano Yenileme",
    desc: "Eski, tehlikeli elektrik panolarınızı güncel güvenlik standartlarında uzman ekibimizle yeniliyoruz.",
    path: "/hizmetler/pano-yenileme",
    icon: <ShieldCheck className="w-8 h-8 text-[#ffb703]" />
  },
  {
    title: "Şofben Montajı",
    desc: "Şofbenleriniz için kalın kesitli özel elektrik hattı, topraklama ve garantili montaj hizmeti.",
    path: "/hizmetler/sofben-montaji",
    icon: <Power className="w-8 h-8 text-[#ffb703]" />
  },
  {
    title: "UPS Kurulumu",
    desc: "Hassas cihazlarınızı elektrik dalgalanmalarına karşı koruyan kesintisiz güç kaynağı (UPS) sistemleri.",
    path: "/hizmetler/ups-kurulumu",
    icon: <BatteryCharging className="w-8 h-8 text-[#ffb703]" />
  },
  {
    title: "Kaçak Akım Rölesi",
    desc: "Hayat kurtaran kaçak akım rölesi kurulum, arıza onarım ve profesyonel test işlemleri.",
    path: "/hizmetler/kacak-akim-rolesi",
    icon: <AlertOctagon className="w-8 h-8 text-[#ffb703]" />
  }
];

export default function HizmetlerPage() {
  return (
    <>
      <Helmet>
        <title>Elektrik Hizmetlerimiz | Aya Elektrik - İstanbul</title>
        <meta name="description" content="Acil elektrik arıza, tesisat, pano yenileme, şofben montajı ve kaçak akım rölesi kurulumu gibi tüm profesyonel elektrik hizmetlerimiz." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler" />
        <meta property="og:title" content="Tüm Elektrik Hizmetlerimiz | Aya Elektrik" />
        <meta property="og:description" content="Acil elektrik arıza, tesisat, pano yenileme, şofben montajı ve kaçak akım rölesi kurulumu gibi tüm profesyonel elektrik hizmetlerimiz." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/hizmetler-og.jpg" />
      
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Tüm Elektrik Hizmetlerimiz",
            "description": "Acil elektrik arıza, tesisat, pano yenileme, şofben montajı ve kaçak akım rölesi kurulumu gibi tüm profesyonel elektrik hizmetlerimiz.",
            "url": "https://ayaelektrik.com/hizmetler"
          })}
        </script>
  </Helmet>
      
      <Navbar />
      
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0b2e59] mb-6 tracking-tight">
              Profesyonel Elektrik Hizmetlerimiz
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Aya Elektrik olarak, İstanbul Avrupa Yakası'nın tüm noktalarına TSE garantili malzemeler, uzman işçilik ve 7/24 kesintisiz nöbetçi elektrikçi servisi ile en iyi çözümleri sunuyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hizmetler.map((hizmet, index) => (
              <Link 
                key={index} 
                to={hizmet.path}
                className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-[#ffb703] transition-all duration-300 flex flex-col items-start"
              >
                <div className="bg-slate-50 p-4 rounded-xl mb-6 group-hover:bg-[#0b2e59] transition-colors duration-300">
                  {hizmet.icon}
                </div>
                <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">
                  {hizmet.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                  {hizmet.desc}
                </p>
                <span className="text-[#0b2e59] font-bold group-hover:text-[#ffb703] transition-colors inline-flex items-center">
                  Hizmet Detayı 
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 bg-slate-50 border border-slate-200 rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b2e59] mb-6">Elektrik Arızanız mı Var?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Avrupa Yakası'nda nerede olursanız olun, donanımlı araçlarımızla 30 dakika içerisinde adresinize ulaşıyoruz. 7/24 acil usta talebi için bize ulaşın.
            </p>
            <a 
              href="tel:+905300695393" 
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-[#0b2e59] bg-[#ffb703] rounded-xl hover:bg-[#e6a500] hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              Hemen Arayın: 0530 069 53 93
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
