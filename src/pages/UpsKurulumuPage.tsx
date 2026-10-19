import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UpsKurulumuPage() {
  return (
    <>
      <Helmet>
        <title>Kesintisiz Güç Kaynağı (UPS) Kurulumu | Aya Elektrik</title>
        <meta name="description" content="Ofis, hastane ve işletmelerinizdeki hassas cihazları korumak için profesyonel UPS kurulumu ve regülatör sistemleri hizmeti veriyoruz." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/ups-kurulumu" />
        <meta property="og:title" content="UPS (Kesintisiz Güç Kaynağı) Kurulumu | Aya Elektrik" />
        <meta property="og:description" content="Ofis, hastane ve işletmelerinizdeki hassas cihazları korumak için profesyonel UPS kurulumu ve regülatör sistemleri hizmeti veriyoruz." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/ups-kurulumu" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/ups-kurulumu-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Kurumumuz için UPS alacağız, ne kadarlık bir cihaza ihtiyacımız var?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Güç tespiti için ekibimiz ücretsiz keşif yaparak korunmasını istediğiniz cihazların toplam watt değerini hesaplar. Buna ve cihazların açık kalmasını istediğiniz süreye göre kVA cinsinden en doğru cihazı öneririz."
                }
              },
              {
                "@type": "Question",
                "name": "UPS hattı çekilirken normal prizlerden farklı bir renk mi kullanılıyor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, yanlışlıkla standart cihazların takılmasını engellemek için genellikle kırımız renkli UPS prizleri kullanırız ve UPS hattı panoda normal şebekeden tamamen ayrılarak etiketlenir."
                }
              },
              {
                "@type": "Question",
                "name": "Sadece UPS kablolaması mı yapıyorsunuz, yoksa cihazı da siz mi temin ediyorsunuz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Her ikisi de mevcuttur. Müşterimiz cihazı temin etmişse biz sadece altyapı panosunu ve priz hatlarını çekip cihazı sisteme entegre edebiliriz, ya da cihazı anahtar teslim kurabiliriz."
                }
              },
              {
                "@type": "Question",
                "name": "UPS bypass şalteri nedir, kurulması zorunlu mu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UPS arızalandığında veya bakım yapıldığında, işletmenizin elektriksiz kalmaması için yükü UPS'ten normal şebekeye kesintisiz aktarmaya yarayan şalterdir. Yüksek kapasiteli sistemlerde kurulması son derece önemlidir."
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
            Kesintisiz Güç Kaynağı (UPS) Kurulumu
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Kesintisiz Güç Kaynağı (UPS) Kurulumu için İstanbul Avrupa Yakası'nda 7/24 hizmet veriyoruz. 30 dakikada adresinizdeyiz.
            </p>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Ani elektrik kesintileri, voltaj dalgalanmaları veya şebeke frekansındaki kararsızlıklar, elektronik cihazlarınızın ömrünü kısaltır ve çoğu zaman donanım arızalarına, veri kayıplarına yol açar. Sunucular (server), güvenlik kamerası sistemleri, medikal cihazlar, ofis bilgisayarları ve üretim tezgahları gibi hassas sistemlerin korunması için Kesintisiz Güç Kaynağı (UPS) kullanımı zorunluluktur. Aya Elektrik olarak işletmenizin güç ihtiyacını tam olarak hesaplıyor ve ihtiyacınıza en uygun UPS sisteminin entegrasyonunu kusursuz bir şekilde sağlıyoruz.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              UPS sistemlerinin kurulumunda, şebekeden gelen enerjiyi güvenli bir şekilde kesintisiz güç kaynağına aktarmak ve olası bir arıza durumunda baypas (bypass) hattını güvenle yönetmek mühendislik gerektiren bir iştir. Sadece cihazın prize takılmasından ibaret olmayan bu süreçte, UPS'ten çıkacak temiz enerjinin besleyeceği özel UPS priz hatlarının çekilmesi, UPS dağıtım panolarının ayrı olarak oluşturulması ve bu hattın şebeke hattından kesin çizgilerle izole edilmesi işlemlerini profesyonelce yerine getiriyoruz.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Sistem devreye alınırken akü bankalarının kapasite testleri, kablo kesit dayanım testleri ve harmonik bozulma ölçümleri dikkatlice gerçekleştirilir. Özellikle üç fazlı (trifaze) yüksek kapasiteli UPS cihazlarında faz dengesizliklerinin önüne geçilerek maksimum verimlilik elde edilir. İster küçük bir ofisin ağ (network) dolabını besleyecek tek fazlı bir cihaz olsun, ister koca bir fabrikanın otomasyon sistemlerini koruyacak sanayi tipi bir sistem olsun, Aya Elektrik kesintisiz ve temiz enerji için uzman kadrosuyla yanınızdadır.
            </p>

            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Sık Sorulan Sorular</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Kurumumuz için UPS alacağız, ne kadarlık bir cihaza ihtiyacımız var?</h3>
                  <p className="text-slate-700">Güç tespiti için ekibimiz ücretsiz keşif yaparak korunmasını istediğiniz cihazların toplam watt değerini hesaplar. Buna ve cihazların açık kalmasını istediğiniz süreye göre kVA cinsinden en doğru cihazı öneririz.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">UPS hattı çekilirken normal prizlerden farklı bir renk mi kullanılıyor?</h3>
                  <p className="text-slate-700">Evet, yanlışlıkla standart cihazların takılmasını engellemek için genellikle kırımız renkli UPS prizleri kullanırız ve UPS hattı panoda normal şebekeden tamamen ayrılarak etiketlenir.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Sadece UPS kablolaması mı yapıyorsunuz, yoksa cihazı da siz mi temin ediyorsunuz?</h3>
                  <p className="text-slate-700">Her ikisi de mevcuttur. Müşterimiz cihazı temin etmişse biz sadece altyapı panosunu ve priz hatlarını çekip cihazı sisteme entegre edebiliriz, ya da cihazı anahtar teslim kurabiliriz.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">UPS bypass şalteri nedir, kurulması zorunlu mu?</h3>
                  <p className="text-slate-700">UPS arızalandığında veya bakım yapıldığında, işletmenizin elektriksiz kalmaması için yükü UPS'ten normal şebekeye kesintisiz aktarmaya yarayan şalterdir. Yüksek kapasiteli sistemlerde kurulması son derece önemlidir.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">Cihazlarınızı ve Verilerinizi Korumak İster misiniz?</h2>
              <p className="text-slate-600 mb-6">Size en uygun Kesintisiz Güç Kaynağı çözümleri ve UPS elektrik tesisatı için bizi arayın.</p>
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
