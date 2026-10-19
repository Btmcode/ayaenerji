import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PanoYenilemePage() {
  return (
    <>
      <Helmet>
        <title>Elektrik Panosu Yenileme | Aya Elektrik</title>
        <meta name="description" content="Apartman ve iş yerleri için TSE onaylı malzemelerle güvenli elektrik panosu değişimi, bakım ve arıza onarım servisi sunuyoruz." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/pano-yenileme" />
        <meta property="og:title" content="Elektrik Panosu Yenileme | Aya Elektrik" />
        <meta property="og:description" content="Apartman ve iş yerleri için TSE onaylı malzemelerle güvenli elektrik panosu değişimi, bakım ve arıza onarım servisi sunuyoruz." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/pano-yenileme" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/pano-yenileme-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Apartmanın eski elektrik panosunu yenilemek zorunlu mu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Elektrik panosu eski, kablolar karışık ve kaçak akım rölesi yoksa yangın riski taşıdığı için yenilenmesi can güvenliğiniz için hayati derecede önemlidir."
                }
              },
              {
                "@type": "Question",
                "name": "Pano yenileme işlemi sırasında elektrik ne kadar kesilir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ön hazırlıklar yapıldıktan sonra genellikle 3 ile 6 saat arasında bir kesinti yaşanır, işlem aynı gün içinde bitirilir."
                }
              },
              {
                "@type": "Question",
                "name": "Yeni panoda hangi güvenlik önlemleri bulunuyor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yenilenen panolarda yönetmeliklere uygun değerlerde kaçak akım rölesi (hayat koruma ve yangın koruma), kaliteli şalterler ve yangına dayanıklı kablolar bulunur."
                }
              },
              {
                "@type": "Question",
                "name": "İş yerleri ve sanayi panoları için de hizmetiniz var mı?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, apartman ve daire panolarının yanı sıra iş yerleri için trifaze ve kompanzasyon panolarının kurulum ve revizyonlarını yapmaktayız."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b2e59] mb-8 leading-tight">
            Elektrik Panosu Yenileme
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Elektrik Panosu Yenileme hizmeti için İstanbul Avrupa Yakası'nda 7/24 hizmet veriyoruz. 30 dakikada adresinizdeyiz.
            </p>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Elektrik panoları, bir binanın veya iş yerinin tüm elektrik dağıtımını ve güvenliğini sağlayan, tabiri caizse sistemin kalbini oluşturan merkezlerdir. Yıllarca kullanılmış, korozyona uğramış, karmaşık kablo yığınlarına dönüşmüş ve içindeki şalterlerin raf ömrü dolmuş eski panolar; yangın tehlikesinden tutun da ani voltaj dalgalanmalarına kadar pek çok ciddi soruna zemin hazırlar. Aya Elektrik olarak bu eski sistemleri, günümüz güvenlik standartlarına uygun şekilde, tamamen baştan projelendirerek yeniliyoruz.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Pano yenileme işleminde yalnızca dış kutunun değiştirilmesiyle yetinilmez. Binanın toplam enerji yükü, her fazın taşıdığı akım ve cihazların güç gereksinimleri hesaplanarak tüm iç tesisat şalterleri, kontaktörler ve klemens grupları yeniden seçilir. Gevşek bağlantılar veya hatalı şalter seçimleri sıfırlanarak, yangına karşı dayanıklı kablo pabuçlarıyla nizamı bir kablolama düzeni oturtulur. Böylece herhangi bir arıza durumunda, sorunun kaynağını çok daha hızlı tespit edebilir ve tehlike büyümeden bölgesel olarak elektriği kesebilirsiniz.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Kurulumunu yaptığımız tüm elektrik panolarında hayat kurtaran "Kaçak Akım Rölesi" (KAR) ve gerektiğinde yüksek gerilim (parafudr) koruma elemanları standart olarak sisteme dahil edilmektedir. Yeni panonuz devreye alınmadan önce mutlaka termal ısı testlerinden, topraklama ve faz ölçümlerinden geçirilir. Hem görsel olarak düzenli ve temiz bir yapı, hem de teknik olarak yıllarca arıza çıkarmadan çalışacak %100 güvenli bir dağıtım merkezi istiyorsanız, profesyonel pano yenileme servisimizden destek alabilirsiniz.
            </p>

            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Sık Sorulan Sorular</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Apartmanın eski elektrik panosunu yenilemek zorunlu mu?</h3>
                  <p className="text-slate-700">Elektrik panosu eski, kablolar karışık ve kaçak akım rölesi yoksa yangın riski taşıdığı için yenilenmesi can güvenliğiniz için hayati derecede önemlidir.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Pano yenileme işlemi sırasında elektrik ne kadar kesilir?</h3>
                  <p className="text-slate-700">Ön hazırlıklar yapıldıktan sonra genellikle 3 ile 6 saat arasında bir kesinti yaşanır, işlem aynı gün içinde bitirilir.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Yeni panoda hangi güvenlik önlemleri bulunuyor?</h3>
                  <p className="text-slate-700">Yenilenen panolarda yönetmeliklere uygun değerlerde kaçak akım rölesi (hayat koruma ve yangın koruma), kaliteli şalterler ve yangına dayanıklı kablolar bulunur.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">İş yerleri ve sanayi panoları için de hizmetiniz var mı?</h3>
                  <p className="text-slate-700">Evet, apartman ve daire panolarının yanı sıra iş yerleri için trifaze ve kompanzasyon panolarının kurulum ve revizyonlarını yapmaktayız.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">Eski ve Tehlikeli Pano Sorununuz mu Var?</h2>
              <p className="text-slate-600 mb-6">Uzman ekibimizle elektrik panonuzu standartlara uygun şekilde yeniliyoruz.</p>
              <a 
                href="tel:+905300695393" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#0b2e59] bg-[#ffb703] rounded-lg hover:bg-[#e6a500] transition-colors"
              >
                Hemen Arayın: 0530 069 53 93
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
