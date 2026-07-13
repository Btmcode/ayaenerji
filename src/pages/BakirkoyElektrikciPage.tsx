import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';

export default function BakirkoyElektrikciPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-[72px] md:pb-0">
      <Helmet>
        <title>Bakırköy Elektrikçi | 7/24 Acil Elektrik Servisi | Aya Elektrik</title>
        <meta name="description" content="Bakırköy bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz. Sigorta arızaları, pano yenileme ve tesisat sorunlarınız için garantili çözüm." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmet-bolgeleri/bakirkoy" />
        <meta property="og:title" content="Bakırköy Elektrikçi | 7/24 Acil Elektrik Servisi" />
        <meta property="og:description" content="Bakırköy bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmet-bolgeleri/bakirkoy" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/bakirkoy-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Aya Elektrik - Bakırköy",
            "image": "https://ayaelektrik.com/images/logo.png",
            "telephone": "+905300695393",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bakırköy",
              "addressRegion": "İstanbul",
              "addressCountry": "TR"
            },
            "url": "https://ayaelektrik.com/hizmet-bolgeleri/bakirkoy"
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
            <span className="text-slate-900 font-medium">Bakırköy Elektrikçi</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b2e59] mb-6 leading-tight">
            Bakırköy Elektrikçi | 7/24 Acil Elektrik Servisi
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Bakırköy ve çevresinde elektrik arızalarınız için 7/24 nöbetçi ekiplerimizle hizmetinizdeyiz. Sadece 30 dakikada adresinize ulaşıp sorunu çözüyoruz.
            </p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none mb-12">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Bakırköy, İstanbul Avrupa Yakası'nın köklü ve güzide ilçelerinden biridir. Eski konut dokusu ile modern yapıların iç içe geçtiği bu bölgede, tesisat yorgunluğuna bağlı elektrik arızaları, şofben montaj ihtiyaçları ve sigorta atmaları sıklıkla yaşanır. Aya Elektrik olarak Bakırköy sakinlerine güvenilir, temiz işçilikli ve garantili elektrik servis hizmeti sunuyoruz.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              İncirli, Florya, Yeşilköy, Ataköy ve Zeytinlik gibi Bakırköy'ün tüm semtlerine anında ulaşabilen motorlu servis ağımız sayesinde elektrik problemlerinizi büyümeden çözüyoruz. Özellikle eski apartmanlarda sıklıkla karşılaştığımız tehlikeli pano sorunları, kablo yanıkları ve topraklama eksiklikleri konularında TSE onaylı malzemeler kullanarak evinizi güvenli hale getiriyoruz.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Gece saatlerinde aniden kesilen elektrik, kışın bozulan kombi şalteri veya banyoda hayati risk taşıyan şofben tesisatı gibi tüm ihtiyaçlarınızda uzman kadromuz yanınızda. Müşteri memnuniyetini ön planda tutan anlayışımızla Bakırköy'ün en güvenilir elektrikçisi olmaktan gurur duyuyoruz.
            </p>
          </div>

          {/* Services List */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-12">
            <h2 className="text-2xl font-bold text-[#0b2e59] mb-6">Bakırköy Bölgesinde Sunduğumuz Hizmetler</h2>
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
            <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Bakırköy Bölgesi Sık Sorulan Sorular</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Florya ve Yeşilköy bölgelerine servisiniz var mı?</h3>
                <p className="text-slate-700">Evet, Florya, Yeşilköy, Ataköy kısımları da dahil olmak üzere Bakırköy'ün tüm sınırları içerisine 30 dakikada hizmet ulaştırıyoruz.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Bakırköy'deki eski evimin elektrik panosunu yenilemek istiyorum, işlem ne kadar sürer?</h3>
                <p className="text-slate-700">Apartman dairenizin eski panosunu kaçak akım rölesi ve yeni tip sigortalarla yenileme işlemi, keşif yapıldıktan sonra genellikle aynı gün içinde 2-3 saatte tamamlanmaktadır.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Banyoma şofben taktıracağım, sigortadan özel hat çekiyor musunuz?</h3>
                <p className="text-slate-700">Evet, can güvenliğiniz için banyonuzdaki prize bağlamak yerine ana sigorta kutusundan şofbeninize uygun kesitte yanmaz kablo ile özel hat çekiyoruz.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Kombi şalterim sürekli atıyor, sorun ne olabilir?</h3>
                <p className="text-slate-700">Kombinizin anakartında bir kısa devre, pompasında bir arıza veya şalterin kendisinde amper yorgunluğu olabilir. Net tespit için ekiplerimiz yerinde ölçüm yapmalıdır.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0b2e59] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bakırköy'de Elektrikçi mi Arıyorsunuz?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Elektrik problemlerinizi işin uzmanına bırakın. Güvenli ve garantili hizmet için bizi 7/24 arayabilirsiniz.
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
