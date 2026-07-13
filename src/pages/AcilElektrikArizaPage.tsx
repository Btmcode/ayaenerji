import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AcilElektrikArizaPage() {
  return (
    <>
      <Helmet>
        <title>Acil Elektrik Arıza Servisi - 30 Dakikada Yanınızdayız | Aya Elektrik</title>
        <meta name="description" content="İstanbul Avrupa Yakası'nda 7/24 acil elektrik arıza servisi. Elektrik kesintisi, sigorta atması ve priz arızaları için garantili nöbetçi elektrikçi." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/acil-elektrik-ariza" />
        <meta property="og:title" content="Acil Elektrik Arıza Servisi | Aya Elektrik" />
          <meta property="og:description" content="İstanbul Avrupa Yakası'nda 7/24 acil elektrik arıza servisi. Elektrik kesintisi, sigorta atması ve priz arızaları için garantili nöbetçi elektrikçi." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/acil-elektrik-ariza" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Gece elektrik arızası için ne yapmalıyım?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aya Elektrik'i arayın — 7/24 hizmet veriyoruz, 30 dakikada adresinizdeyiz. Kendi kendinize müdahale etmekten kaçının."
                }
              },
              {
                "@type": "Question",
                "name": "Acil elektrikçi ücreti ne kadar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fiyatlarımız arızanın türüne ve kullanılacak malzemeye göre değişir. Hızlı keşif sonrası işlem öncesi mutlaka net fiyat bilgisi veririz."
                }
              },
              {
                "@type": "Question",
                "name": "Hangi ilçelere acil elektrik servisi veriyorsunuz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "İstanbul Avrupa Yakası'ndaki tüm ilçelere (Beşiktaş, Şişli, Beylikdüzü, Bakırköy vb.) 30 dakika içerisinde nöbetçi elektrikçi ekibimizi yönlendiriyoruz."
                }
              },
              {
                "@type": "Question",
                "name": "Sigorta sürekli atıyor, tehlikeli mi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, sürekli atan sigorta sistemde bir kısa devre veya aşırı yüklenme olduğunun kesin işaretidir. Yangın riski taşır, kesinlikle mandalı zorlamayın ve hemen bizi arayın."
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
            Acil Elektrik Arıza Servisi
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Acil Elektrik Arıza Servisi için İstanbul Avrupa Yakası'nda 7/24 hizmet veriyoruz. 30 dakikada adresinizdeyiz.
            </p>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              İstanbul Avrupa Yakası genelinde aniden gelişen elektrik arızaları, evinizde veya iş yerinizde hayatı durma noktasına getirebilir. Aya Elektrik olarak, 7 gün 24 saat kesintisiz hizmet anlayışımızla tüm acil elektrik sorunlarınıza en geç 30 dakika içerisinde müdahale ediyoruz. Gece geç saatlerde yaşanan sigorta atmaları, şalter problemleri veya genel elektrik kesintilerinde uzman kadromuz tam donanımlı araçlarımızla anında kapınızda olmaktadır.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Elektrik arızaları yalnızca konforunuzu etkilemekle kalmaz, aynı zamanda can ve mal güvenliğiniz için de ciddi riskler oluşturur. Yanık kokusu, prizlerden ses gelmesi veya kıvılcım çıkması gibi durumlarda hiçbir şekilde amatörce müdahale edilmemelidir. Ekiplerimiz, termal kameralar ve profesyonel ölçüm cihazları kullanarak arızanın kaynağını noktasal olarak tespit eder. Böylece gereksiz kırma dökme işlemleri yapılmadan, en güvenilir ve hızlı çözüm tarafınıza sunulur.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Onarım işlemlerimizde kullanılan tüm malzemeler TSE standartlarına uygun, birinci sınıf kaliteye sahip ürünlerdir. Yaptığımız her müdahale sonrasında detaylı kaçak akım testleri gerçekleştirerek, sisteminizin tamamen güvenli bir şekilde çalıştığından emin oluruz. Müşteri memnuniyetini merkeze alan firmamız, sunduğu tüm arıza onarım işlemlerinde garantili işçilik prensibiyle hareket ederek uzun vadeli güvenlik sağlamaktadır. Sorunsuz ve kesintisiz enerji için ihtiyacınız olan her an bir telefon uzağınızdayız.
            </p>

            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Sık Sorulan Sorular</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Gece elektrik arızası için ne yapmalıyım?</h3>
                  <p className="text-slate-700">Aya Elektrik'i arayın — 7/24 hizmet veriyoruz, 30 dakikada adresinizdeyiz. Kendi kendinize müdahale etmekten kaçının.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Acil elektrikçi ücreti ne kadar?</h3>
                  <p className="text-slate-700">Fiyatlarımız arızanın türüne ve kullanılacak malzemeye göre değişir. Hızlı keşif sonrası işlem öncesi mutlaka net fiyat bilgisi veririz.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Hangi ilçelere acil elektrik servisi veriyorsunuz?</h3>
                  <p className="text-slate-700">İstanbul Avrupa Yakası'ndaki tüm ilçelere (Beşiktaş, Şişli, Beylikdüzü, Bakırköy vb.) 30 dakika içerisinde nöbetçi elektrikçi ekibimizi yönlendiriyoruz.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Sigorta sürekli atıyor, tehlikeli mi?</h3>
                  <p className="text-slate-700">Evet, sürekli atan sigorta sistemde bir kısa devre veya aşırı yüklenme olduğunun kesin işaretidir. Yangın riski taşır, kesinlikle mandalı zorlamayın ve hemen bizi arayın.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">Acil Elektrikçi mi Lazım?</h2>
              <p className="text-slate-600 mb-6">Avrupa Yakası'nın tüm ilçelerine 30 dakikada ulaşıyoruz.</p>
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
