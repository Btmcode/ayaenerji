import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';

export default function KucukcekmeceElektrikciPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-[72px] md:pb-0">
      <Helmet>
        <title>Küçükçekmece Elektrikçi | 7/24 Acil Elektrik Servisi | Aya Elektrik</title>
        <meta name="description" content="Küçükçekmece bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz. Sigorta arızaları, pano yenileme ve tesisat sorunlarınız için garantili çözüm." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmet-bolgeleri/kucukcekmece" />
        <meta property="og:title" content="Küçükçekmece Elektrikçi | 7/24 Acil Elektrik Servisi" />
        <meta property="og:description" content="Küçükçekmece bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmet-bolgeleri/kucukcekmece" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/kucukcekmece-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Aya Elektrik - Küçükçekmece",
            "image": "https://ayaelektrik.com/images/logo.png",
            "telephone": "+905300695393",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Küçükçekmece",
              "addressRegion": "İstanbul",
              "addressCountry": "TR"
            },
            "url": "https://ayaelektrik.com/hizmet-bolgeleri/kucukcekmece"
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-[#0b2e59] transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Hizmet Bölgeleri</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Küçükçekmece Elektrikçi</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b2e59] mb-6 leading-tight">
            Küçükçekmece Elektrikçi | 7/24 Acil Elektrik Servisi
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Küçükçekmece ve çevresinde elektrik arızalarınız için 7/24 nöbetçi ekiplerimizle hizmetinizdeyiz. Sadece 30 dakikada adresinize ulaşıp sorunu çözüyoruz.
            </p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none mb-12">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Nüfusu ve geniş yüzölçümüyle İstanbul'un en büyük ilçelerinden biri olan Küçükçekmece'de, kesintisiz elektrik servisine duyulan ihtiyaç gün geçtikçe artmaktadır. Aya Elektrik olarak Sefaköy'den Halkalı'ya, Cennet Mahallesi'nden İkitelli'ye kadar ilçenin tamamında güvenilir, şeffaf ve profesyonel elektrik hizmeti sunmaktayız.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Bölgedeki eski yapıların tesisat yorgunlukları ve yeni projelerin montaj ihtiyaçlarına cevap verebilmek için araçlarımızda daima tam teçhizat ve kaliteli yedek parça bulunduruyoruz. Evinizde sürekli atan sigortaların kalıcı onarımı, yüksek elektrik çeken aletler (şofben, klima, fırın) için sıfırdan güvenli hat çekimi ve bina panolarının modernizasyonu konularında iddialıyız.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Her türlü elektrik işinizde yasal standartlara (TSE) harfiyen uyuyor, ailenizi ve cihazlarınızı yangın ve elektrik çarpması risklerine karşı güvenceye alan kaçak akım rölesi sistemlerini titizlikle uyguluyoruz. Küçükçekmece'de işini şansa bırakmak istemeyenlerin ilk tercihi Aya Elektrik, bir telefon uzağınızda.
            </p>
          </div>

          {/* Services List */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-12">
            <h2 className="text-2xl font-bold text-[#0b2e59] mb-6">Küçükçekmece Bölgesinde Sunduğumuz Hizmetler</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'Acil Elektrik Arızası', url: '/hizmetler/acil-elektrik-ariza' },
                { name: 'Elektrik Tesisatı Yenileme', url: '/hizmetler/elektrik-tesisati' },
                { name: 'Elektrik Panosu Değişimi', url: '/hizmetler/pano-yenileme' },
                { name: 'Şofben Montajı ve Hat Çekimi', url: '/hizmetler/sofben-montaji' },
                { name: 'Kaçak Akım Rölesi Montajı', url: '/hizmetler/kacak-akim-rolesi' },
                { name: 'Sigorta Arızası Onarımı', url: '/hizmetler/sigorta-arizasi' },
                { name: 'UPS Kurulumu ve Kablolama', url: '/hizmetler/ups-kurulumu' },
              ].map((service, index) => (
                <Link key={index} to={service.url} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium text-slate-700 group-hover:text-[#0b2e59]">{service.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Küçükçekmece Bölgesi Sık Sorulan Sorular</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Halkalı, Sefaköy, İkitelli bölgelerine de hizmetiniz var mı?</h3>
                <p className="text-slate-700">Evet, Küçükçekmece'nin tüm semt ve mahallelerine 7 gün 24 saat kesintisiz acil servis hizmeti ulaştırıyoruz.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Klimam için özel hat çektirmek istiyorum, yapıyor musunuz?</h3>
                <p className="text-slate-700">Klima, şofben ve fırın gibi yüksek akım çeken cihazlarınız için sigorta kutusundan bağımsız, uygun kesitli kablolarla güvenli hat çekiyoruz.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Gece yarısı şalterimiz yandı, Küçükçekmece'ye gelmeniz ne kadar sürer?</h3>
                <p className="text-slate-700">Avrupa Yakası genelinde konumlanmış acil müdahale araçlarımızla ortalama 30 dakika gibi kısa bir sürede kapınızda oluyoruz.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Elektrik faturam çok yüksek geliyor, kaçak olabilir mi?</h3>
                <p className="text-slate-700">Tesisatınızdaki yalıtım sorunları, toprak kaçağı veya eski sayacınızın arızalanması gibi sebepler fazladan enerji tüketimine yol açabilir. Ekibimiz detaylı ölçüm yaparak sorunu tespit eder.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0b2e59] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Küçükçekmece'de Elektrikçi mi Arıyorsunuz?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Elektrik arızalarınızı riske atmayın. Hemen uzman ekibimizi arayın, 30 dakikada gelip güvenle çözelim.
            </p>
            <a 
              href="tel:+905300695393" 
              className="inline-flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#e6a500] text-[#0b2e59] px-8 py-4 rounded-xl font-bold text-lg transition-colors w-full sm:w-auto"
            >
              <Phone className="w-6 h-6" />
              0530 069 53 93
            </a>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}
