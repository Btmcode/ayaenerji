import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ElektrikTesisatiPage() {
  return (
    <>
      <Helmet>
        <title>Elektrik Tesisatı Yenileme ve Kurulum | Aya Elektrik</title>
        <meta name="description" content="Ev ve iş yerleriniz için TSE onaylı elektrik tesisatı yenileme, arıza tespiti ve sıfırdan güvenli kablolama hizmeti sunuyoruz." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/elektrik-tesisati" />
        <meta property="og:title" content="Elektrik Tesisatı Yenileme ve Kurulum | Aya Elektrik" />
        <meta property="og:description" content="Ev ve iş yerleriniz için TSE onaylı elektrik tesisatı yenileme, arıza tespiti ve sıfırdan güvenli kablolama hizmeti sunuyoruz." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/elektrik-tesisati" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/elektrik-tesisati-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Eski binada elektrik tesisatını komple yenilemek kaç gün sürer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dairenin büyüklüğüne ve kırma/dökme işlemlerine bağlı olarak genellikle 2-4 gün sürmektedir."
                }
              },
              {
                "@type": "Question",
                "name": "Tesisat yenileme sırasında çok kırma dökme oluyor mu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "İhtiyaca göre sıva altı veya sıva üstü (kablo kanalı) çekim yapıyoruz. Sıva altı işleminde minimum hasarla çalışmaya özen gösteriyoruz."
                }
              },
              {
                "@type": "Question",
                "name": "Kullandığınız kablolar kaliteli mi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sadece yanmaz nitelikli (halogen-free) ve TSE onaylı, birinci sınıf kaliteli kablo markalarını kullanmaktayız."
                }
              },
              {
                "@type": "Question",
                "name": "Yeni priz veya aydınlatma hattı çektirmek istiyorum, yapıyor musunuz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, mevcut tesisatınıza ek olarak yeni priz, anahtar ve özel aydınlatma hatları (LED spot vb.) çekimi yapıyoruz."
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
            Elektrik Tesisatı Kurulum ve Yenileme
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Elektrik Tesisatı hizmeti için İstanbul Avrupa Yakası'nda 7/24 hizmet veriyoruz. 30 dakikada adresinizdeyiz.
            </p>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Evlerde veya iş yerlerinde kullanılan elektrik tesisatları zamanla deformasyona uğrar ve taşıdığı yük kapasitesi yetersiz kalmaya başlar. Özellikle eski binalarda kullanılan ince veya standart dışı kablolar, modern elektronik cihazların enerji ihtiyacını karşılayamaz ve aşırı ısınarak yangın riskini beraberinde getirir. Aya Elektrik olarak, mekanınızın enerji ihtiyacını doğru şekilde analiz ediyor ve uluslararası standartlara uygun, dayanıklı elektrik tesisat sistemleri kuruyoruz.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Sıfırdan tesisat çekimi veya mevcut altyapının yenilenmesi süreçlerinde estetik ve işlevselliği bir arada sunuyoruz. Dağınık kablo görünümünü ortadan kaldırıyor, buat ve buat klemenslerini tamamen güvenli, yalıtımlı ekipmanlarla yeniliyoruz. Aynı zamanda akıllı ev sistemleri, yeni aydınlatma hatları ve ek priz gereksinimleriniz için mimari projenize veya özel taleplerinize birebir uyan kablolama planları oluşturarak sorunsuz bir kullanım deneyimi vadediyoruz.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Yapılan tüm elektrik tesisatı yenileme ve kurulum işlemlerimizde, yüksek kalitede, TSE garantili ve yanmaz nitelikli (halogen-free) kablolar tercih etmekteyiz. Proje tamamlandığında tesisatın izolasyon testleri gerçekleştirilir ve topraklama değerleri profesyonel cihazlarla ölçülür. Böylece sadece bugün için değil, uzun yıllar boyunca güvenle kullanabileceğiniz sağlam ve modern bir elektrik altyapısına kavuşmuş olursunuz.
            </p>

            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Sık Sorulan Sorular</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Eski binada elektrik tesisatını komple yenilemek kaç gün sürer?</h3>
                  <p className="text-slate-700">Dairenin büyüklüğüne ve kırma/dökme işlemlerine bağlı olarak genellikle 2-4 gün sürmektedir.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Tesisat yenileme sırasında çok kırma dökme oluyor mu?</h3>
                  <p className="text-slate-700">İhtiyaca göre sıva altı veya sıva üstü (kablo kanalı) çekim yapıyoruz. Sıva altı işleminde minimum hasarla çalışmaya özen gösteriyoruz.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Kullandığınız kablolar kaliteli mi?</h3>
                  <p className="text-slate-700">Sadece yanmaz nitelikli (halogen-free) ve TSE onaylı, birinci sınıf kaliteli kablo markalarını kullanmaktayız.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Yeni priz veya aydınlatma hattı çektirmek istiyorum, yapıyor musunuz?</h3>
                  <p className="text-slate-700">Evet, mevcut tesisatınıza ek olarak yeni priz, anahtar ve özel aydınlatma hatları (LED spot vb.) çekimi yapıyoruz.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">Tesisatınızı Yenilemek mi İstiyorsunuz?</h2>
              <p className="text-slate-600 mb-6">Uzman ekibimizle profesyonel elektrik tesisatı hizmeti sunuyoruz.</p>
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
