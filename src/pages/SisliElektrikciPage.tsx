import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';

export default function SisliElektrikciPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-[72px] md:pb-0">
      <Helmet>
        <title>Şişli Elektrikçi | 7/24 Acil Elektrik Servisi | Aya Elektrik</title>
        <meta name="description" content="Şişli bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz. Sigorta arızaları, pano yenileme ve ofis tesisat sorunlarınız için garantili çözüm." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmet-bolgeleri/sisli" />
        <meta property="og:title" content="Şişli Elektrikçi | 7/24 Acil Elektrik Servisi" />
        <meta property="og:description" content="Şişli bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmet-bolgeleri/sisli" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/sisli-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Aya Elektrik - Şişli",
            "image": "https://ayaelektrik.com/images/logo.png",
            "telephone": "+905300695393",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Şişli",
              "addressRegion": "İstanbul",
              "addressCountry": "TR"
            },
            "url": "https://ayaelektrik.com/hizmet-bolgeleri/sisli"
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
            <span className="text-slate-900 font-medium">Şişli Elektrikçi</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b2e59] mb-6 leading-tight">
            Şişli Elektrikçi | 7/24 Acil Elektrik Servisi
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Şişli ve çevresinde elektrik arızalarınız için 7/24 nöbetçi ekiplerimizle hizmetinizdeyiz. Sadece 30 dakikada adresinize ulaşıp sorunu çözüyoruz.
            </p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none mb-12">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Şişli, iş merkezleri, plazaları ve yoğun nüfuslu yerleşim yerleriyle İstanbul'un ticaret ve yaşam kalbidir. Bu kadar dinamik bir ilçede elektrik kesintileri, ofislerde iş kaybına, evlerde ise yaşam konforunun bozulmasına sebep olur. Aya Elektrik olarak Şişli'nin temposuna ayak uyduruyor, 7/24 hızlı ve profesyonel elektrik onarım hizmeti veriyoruz.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Mecidiyeköy, Nişantaşı, Bomonti veya Okmeydanı fark etmeksizin Şişli'nin tüm noktalarına yayılan servis ağımız sayesinde en acil durumlara bile dakikalar içerisinde müdahale edebiliyoruz. Özellikle ofis panolarında meydana gelen aşırı yüklenmeler, server odalarındaki UPS arızaları veya mağazaların aydınlatma sorunlarına uzman kadromuzla anında ve kalıcı çözümler getiriyoruz.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Kullandığımız malzemelerin tamamı yüksek kaliteli ve standartlara uygun ürünlerdir. Tesisat yenileme, kaçak akım rölesi montajı veya yangın tehlikesi arz eden arızalı sigortaların değişimi gibi konularda can güvenliğinizi merkeze alarak çalışıyoruz. Şişli'de güvenilir, hızlı ve garantili bir elektrikçi arıyorsanız, tek yapmanız gereken bizi aramaktır.
            </p>
          </div>

          {/* Services List */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-12">
            <h2 className="text-2xl font-bold text-[#0b2e59] mb-6">Şişli Bölgesinde Sunduğumuz Hizmetler</h2>
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
            <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Şişli Bölgesi Sık Sorulan Sorular</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Ofisimiz Mecidiyeköy'de, elektrik kesintisine ne kadar sürede müdahale edersiniz?</h3>
                <p className="text-slate-700">Şişli bölgesindeki mobil ekiplerimiz sayesinde Mecidiyeköy ve çevresindeki arızalara ortalama 20-30 dakika içinde ulaşım sağlıyoruz.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">İş yeri ve plazalar için UPS (Kesintisiz Güç Kaynağı) kurulumu yapıyor musunuz?</h3>
                <p className="text-slate-700">Evet, ofislerdeki bilgisayarlarınızı ve server (sunucu) sistemlerinizi koruyacak uygun kapasitedeki UPS sistemlerinin kurulum ve özel hat çekim işlemlerini yapıyoruz.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Eski binamızda topraklama yok, Şişli'de bu hizmeti veriyor musunuz?</h3>
                <p className="text-slate-700">Eski tip tesisatlara sahip binalar için bina veya daire bazlı topraklama hattı çekimi ve kaçak akım rölesi montajı ile can güvenliğinizi sağlıyoruz.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Pazar günü Şişli'de hizmetiniz açık mı?</h3>
                <p className="text-slate-700">Evet, elektrik arızaları gün tanımaz. Yılın 365 günü, hafta sonu ve resmi tatiller dahil olmak üzere Şişli'ye kesintisiz hizmet veriyoruz.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0b2e59] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Şişli'de Elektrikçi mi Arıyorsunuz?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              İster ofisinizde ister evinizde yaşanan elektrik arızaları için hemen bize ulaşın, 30 dakikada gelip güvenle çözelim.
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
