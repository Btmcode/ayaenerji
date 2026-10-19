import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SigortaArizasiPage() {
  return (
    <>
      <Helmet>
        <title>Elektrik Sigorta Arızası ve Değişimi | Aya Elektrik</title>
        <meta name="description" content="Sürekli atan sigortalar, yanan şalterler ve elektrik kesintileri için garantili sigorta değişimi, arıza tespiti ve yük dengeleme hizmeti." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/sigorta-arizasi" />
        <meta property="og:title" content="Elektrik Sigorta Arızası ve Değişimi | Aya Elektrik" />
        <meta property="og:description" content="Sürekli atan sigortalar, yanan şalterler ve elektrik kesintileri için garantili sigorta değişimi, arıza tespiti ve yük dengeleme hizmeti." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/sigorta-arizasi" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/sigorta-arizasi-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Atan sigortayı daha yüksek amperli bir sigortayla değiştirmeli miyim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hayır! Sigortalar kablo kalınlığına (kesitine) göre seçilir. Örneğin 2.5 mm² kabloya 16A sigorta takılmalıdır. Eğer 32A takarsanız, cihaz fazla akım çektiğinde sigorta atmayacak ama kablolar eriyip yanacaktır."
                }
              },
              {
                "@type": "Question",
                "name": "Sadece fırını çalıştırdığımda şalter atıyor, sorun fırında mı sigortada mı?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "İki ihtimal de vardır. Fırınınızın ısıtıcısında kısa devre olabilir veya o hattın sigortası (veya kablosu) artık akımı taşıyamayacak kadar deforme olmuş olabilir. Kesin tespit için ölçüm yapılmalıdır."
                }
              },
              {
                "@type": "Question",
                "name": "Evdeki tüm elektrik gitti, sigortalar yukarıda ama elektrik yok, neden?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ana panodaki (sayaç yanındaki) sigorta veya kaçak akım rölesi atmış olabilir. Eğer onlarda sorun yoksa, sokaktan gelen ana besleme fazında veya sayacınızda sorun olabilir. Acil arıza ekiplerimiz yerinde tespit sağlar."
                }
              },
              {
                "@type": "Question",
                "name": "Sigortadan cızırtı sesi geliyor veya plastik yanık kokusu alıyorum, ne yapmalıyım?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hemen ana şalteri veya saatin yanındaki ana elektriği komple kapatın. Cızırtı ve yanık kokusu, klemens bağlantılarının gevşediğini ve kıvılcım (ark) yaptığını gösterir, ciddi yangın sebebidir. Hiç dokunmadan 7/24 nöbetçi elektrikçi servisimizi arayın."
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
            Elektrik Sigorta Arızası Onarımı
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Elektrik Sigorta Arızası Onarımı için İstanbul Avrupa Yakası'nda 7/24 hizmet veriyoruz. 30 dakikada adresinizdeyiz.
            </p>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Evinizde veya iş yerinizde sıklıkla sigorta atması problemi yaşıyorsanız, bu durum sistemin size verdiği önemli bir acil durum uyarısıdır. Sigortalar, tesisatınızdaki kabloların aşırı ısınmasını veya cihazların kısa devre sonucu hasar görmesini engellemek için tasarlanmış mekanik güvenlik bariyerleridir. Sürekli atan bir şalteri zorla yukarı kaldırmak, veya amperi yetmiyor diyerek teknik hesaplama yapılmadan çok daha yüksek amperli bir sigorta ile değiştirmek, kabloların tutuşmasına (yangın) sebep olacak ölümcül bir hatadır.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Sigorta arızalarının temelinde genellikle; çoklu prizlere aşırı yüklenilmesi (aynı anda çamaşır makinesi, ısıtıcı, saç kurutma makinesi çalıştırılması), gevşek bağlantılardan kaynaklı ark (kıvılcım) oluşumu, ya da fişe takılan cihazlardan birinin kendi iç devresinde kısa devreye sahip olması yatar. Bazen de sigortanın iç mekanizması yılların yorgunluğuyla eskir (dekalibrasyon) ve normal çekimlerde dahi atmaya başlar, sigortanın dış plastiğinde erime veya kararma izleri gözlemlenebilir.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Aya Elektrik olarak; adrese ulaştığımızda önce yanan, eriyen veya atan sigortanın bağlı olduğu hattın çektiği reel akımı (ampermetre ile) ölçüyoruz. Eğer sorun aşırı yüklenmeden kaynaklıysa, o hattın yükünü farklı fazlara dağıtıyor ve kablo kesitine tam uyumlu, uluslararası standartlarda (B veya C tipi) yeni otomat şalterler takıyoruz. Kısa devre veya izolasyon arızası söz konusuysa arızalı prizi, buat noktasını veya cihazı izole ederek ana problemi kalıcı olarak çözüyoruz. Elektrik kesintisinin stresini güvenli ve profesyonel müdahalemiz ile geride bırakın.
            </p>

            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Sık Sorulan Sorular</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Atan sigortayı daha yüksek amperli bir sigortayla değiştirmeli miyim?</h3>
                  <p className="text-slate-700">Hayır! Sigortalar kablo kalınlığına (kesitine) göre seçilir. Örneğin 2.5 mm² kabloya 16A sigorta takılmalıdır. Eğer 32A takarsanız, cihaz fazla akım çektiğinde sigorta atmayacak ama kablolar eriyip yanacaktır.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Sadece fırını çalıştırdığımda şalter atıyor, sorun fırında mı sigortada mı?</h3>
                  <p className="text-slate-700">İki ihtimal de vardır. Fırınınızın ısıtıcısında kısa devre olabilir veya o hattın sigortası (veya kablosu) artık akımı taşıyamayacak kadar deforme olmuş olabilir. Kesin tespit için ölçüm yapılmalıdır.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Evdeki tüm elektrik gitti, sigortalar yukarıda ama elektrik yok, neden?</h3>
                  <p className="text-slate-700">Ana panodaki (sayaç yanındaki) sigorta veya kaçak akım rölesi atmış olabilir. Eğer onlarda sorun yoksa, sokaktan gelen ana besleme fazında veya sayacınızda sorun olabilir. Acil arıza ekiplerimiz yerinde tespit sağlar.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Sigortadan cızırtı sesi geliyor veya plastik yanık kokusu alıyorum, ne yapmalıyım?</h3>
                  <p className="text-slate-700">Hemen ana şalteri veya saatin yanındaki ana elektriği komple kapatın. Cızırtı ve yanık kokusu, klemens bağlantılarının gevşediğini ve kıvılcım (ark) yaptığını gösterir, ciddi yangın sebebidir. Hiç dokunmadan 7/24 nöbetçi elektrikçi servisimizi arayın.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">Şalteriniz Sürekli Atıyor mu?</h2>
              <p className="text-slate-600 mb-6">Koku, erime veya sık sigorta atması varsa tehlikeyi göze almayın. 30 dakikada çözüm için bizi arayın.</p>
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
