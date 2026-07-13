import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SofbenMontajiPage() {
  return (
    <>
      <Helmet>
        <title>Şofben Montajı ve Hat Çekimi | Aya Elektrik</title>
        <meta name="description" content="Banyo şofbenleriniz için güvenli elektrik hattı çekimi, topraklama ve uzman şofben montaj hizmeti. Hızlı ve garantili servis." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/sofben-montaji" />
        <meta property="og:title" content="Şofben Montajı ve Hat Çekimi | Aya Elektrik" />
        <meta property="og:description" content="Banyo şofbenleriniz için güvenli elektrik hattı çekimi, topraklama ve uzman şofben montaj hizmeti. Hızlı ve garantili servis." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/sofben-montaji" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/sofben-montaji-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Şofbeni normal prize takarak kullanabilir miyim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kesinlikle hayır. Şofbenler anlık olarak çok yüksek akım çeker. Normal priz tesisatı bu gücü taşıyamaz ve kablolar yanarak yangın çıkarabilir. Mutlaka sigorta kutusundan bağımsız hat çekilmelidir."
                }
              },
              {
                "@type": "Question",
                "name": "Şofben için hangi kalınlıkta kablo ve sigorta kullanıyorsunuz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Şofbenin gücüne göre genellikle 3x2.5 veya 3x4 mm² antigron kablo ve cihaza uygun (genelde 32 Amper veya 40 Amper) C Tipi sigorta kullanıyoruz."
                }
              },
              {
                "@type": "Question",
                "name": "Banyo içinde sıva üstü kablo çekmek güvenli midir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Doğru yalıtım malzemeleri ve suya dayanıklı kablo kanalları ile yapıldığında sıva üstü çekim tamamen güvenlidir. Estetik ve güvenliği bir arada sağlıyoruz."
                }
              },
              {
                "@type": "Question",
                "name": "Topraklama olmayan evde şofben kurulur mu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Topraklama hattı olmadan şofben montajı can güvenliği açısından yapılamaz. Böyle durumlarda önce binanın veya dairenin topraklama sorunu çözülmeli, ek olarak kaçak akım rölesi takılmalıdır."
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
            Şofben Montajı ve Özel Elektrik Hattı Çekimi
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Şofben Montajı ve Hat Çekimi için İstanbul Avrupa Yakası'nda 7/24 hizmet veriyoruz. 30 dakikada adresinizdeyiz.
            </p>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Ani su ısıtıcılar (elektrikli şofbenler) yoğun enerji tüketen ve su ile temasın çok yakın olduğu hassas cihazlardır. Mevcut tesisatınızdaki standart bir prize veya sıradan bir aydınlatma hattına şofben bağlamak, ölümcül elektrik çarpması risklerine ve yangınlara sebep olabilir. Şofbenlerin güvenle çalışabilmesi için ana panodan veya sigorta kutusundan cihazın bulunacağı noktaya kadar, kesintisiz, kalın kesitli ve bağımsız bir elektrik hattı çekilmesi zorunludur. Aya Elektrik olarak şofbenleriniz için güvenli hat çekimini profesyonel şekilde uyguluyoruz.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              İşlem sırasında cihazın nominal akım değerini kaldırabilecek kapasitede (genellikle 3x2.5mm² veya 3x4mm² yanmaz nitelikli) TTR veya NYM tipi dayanıklı kablolar tercih edilir. Şofben hattının güvenliği sadece kablo ile bitmez; şofbene özel, cihazın çekebileceği maksimum amperi kontrol altında tutan, yüksek kaliteli, tek kutuplu veya çift kutuplu C Tipi sigortalar kullanılır. Ayrıca su sıçramalarına karşı dayanıklı klemensler ve izole bağlantı aparatları ile tüm tesisat sızdırmaz hale getirilir.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Hayat kurtaran en önemli unsur olan ve genellikle göz ardı edilen kaçak akım koruması (30mA değerinde) ve kesintisiz, düşük dirençli toprak hattı, şofben kurulumumuzun vazgeçilmez bir parçasıdır. Montaj işlemi tamamlandıktan sonra su basıncı ve faz ölçümleri yapılır, topraklama hattının gerçekten çalışıp çalışmadığı cihazlarla test edilerek cihaz size tamamen güvenli ve sıcak su vermeye hazır halde teslim edilir.
            </p>

            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Sık Sorulan Sorular</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Şofbeni normal prize takarak kullanabilir miyim?</h3>
                  <p className="text-slate-700">Kesinlikle hayır. Şofbenler anlık olarak çok yüksek akım çeker. Normal priz tesisatı bu gücü taşıyamaz ve kablolar yanarak yangın çıkarabilir. Mutlaka sigorta kutusundan bağımsız hat çekilmelidir.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Şofben için hangi kalınlıkta kablo ve sigorta kullanıyorsunuz?</h3>
                  <p className="text-slate-700">Şofbenin gücüne göre genellikle 3x2.5 veya 3x4 mm² antigron kablo ve cihaza uygun (genelde 32 Amper veya 40 Amper) C Tipi sigorta kullanıyoruz.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Banyo içinde sıva üstü kablo çekmek güvenli midir?</h3>
                  <p className="text-slate-700">Doğru yalıtım malzemeleri ve suya dayanıklı kablo kanalları ile yapıldığında sıva üstü çekim tamamen güvenlidir. Estetik ve güvenliği bir arada sağlıyoruz.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Topraklama olmayan evde şofben kurulur mu?</h3>
                  <p className="text-slate-700">Topraklama hattı olmadan şofben montajı can güvenliği açısından yapılamaz. Böyle durumlarda önce binanın veya dairenin topraklama sorunu çözülmeli, ek olarak kaçak akım rölesi takılmalıdır.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">Şofbeniniz İçin Yeni Bir Hat mı Gerekiyor?</h2>
              <p className="text-slate-600 mb-6">Güvenli tesisat ve garantili şofben montajı için bizi hemen arayın.</p>
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
