import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Aya Elektrik hangi hizmetleri sunmaktadır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Elektrik arıza tespiti, pano yenileme, şofben montajı, elektrik tesisatı kurulumu, UPS kurulumu ve kaçak akım rölesi montajı başta olmak üzere tüm elektrik tesisat işlerinizi yapmaktayız."
        }
      },
      {
        "@type": "Question",
        "name": "Elektrik arızalarına kendim müdahale edebilir miyim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hayır, elektrik arızalarına uzman olmayan kişilerin müdahale etmesi hayati risk taşır. Ayrıca yanlış müdahale cihazlarınıza ve tesisatınıza geri dönülmez zararlar verebilir."
        }
      },
      {
        "@type": "Question",
        "name": "Yapılan işlemlerde garanti veriyor musunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, tüm parça değişimleri ve işçilik hizmetlerimiz garanti kapsamındadır. Kullandığımız tüm malzemeler TSE belgelidir."
        }
      },
      {
        "@type": "Question",
        "name": "Sigortam sürekli atıyor, sebebi nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tesisatınızda bir kısa devre, aşırı yüklenme veya kaçak olabilir. Uzman ekibimiz özel ölçüm cihazlarıyla arızanın kaynağını bularak sorunu kalıcı olarak çözer."
        }
      },
      {
        "@type": "Question",
        "name": "7/24 hizmetiniz var mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, haftanın 7 günü, günün 24 saati, resmi tatiller dahil kesintisiz nöbetçi elektrikçi hizmeti sunuyoruz."
        }
      },
      {
        "@type": "Question",
        "name": "Acil durumlarda adresime ne kadar sürede ulaşırsınız?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gezici mobil ekiplerimiz sayesinde İstanbul Avrupa Yakası'ndaki tüm ilçelere ortalama 30 dakika içerisinde ulaşmaktayız."
        }
      },
      {
        "@type": "Question",
        "name": "Gece saatlerinde fiyatlandırma farklı mıdır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acil durumlarda standart fiyat politikamızı korumaya özen gösteriyoruz, ancak gece geç saatlerde uygulanan servis ücreti mesafeye göre cüzi miktarda farklılık gösterebilir."
        }
      },
      {
        "@type": "Question",
        "name": "Şalterden yanık kokusu geliyor, ne yapmalıyım?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kesinlikle dokunmayın ve ana şalteri kapatabiliyorsanız hemen kapatın. Yangın riskine karşı derhal bizi (0530 069 53 93) arayarak acil destek isteyin."
        }
      },
      {
        "@type": "Question",
        "name": "Servis ücretiniz ne kadar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Servis ve arıza tespit ücretimiz lokasyona ve işlemin niteliğine göre değişmektedir. Detaylı bilgi için bizi arayabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Ödemeyi nasıl yapabilirim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "İşlem bitiminde nakit, kredi kartı veya banka havalesi/EFT yöntemlerinden dilediğinizi kullanarak ödeme yapabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Fiyat teklifi alabilir miyim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, büyük projeleriniz, pano yenileme veya tesisat değişimleri için ücretsiz keşif sonrası detaylı fiyat teklifi sunuyoruz."
        }
      },
      {
        "@type": "Question",
        "name": "Hangi bölgelere hizmet veriyorsunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "İstanbul Avrupa Yakası'nda bulunan tüm ilçelere (Beşiktaş, Şişli, Sarıyer, Beylikdüzü, Bakırköy, Fatih vb. toplam 25 ilçe) acil servisimiz mevcuttur."
        }
      },
      {
        "@type": "Question",
        "name": "Anadolu Yakası'na servisiniz var mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Şu an için gezici ekiplerimizle yalnızca İstanbul Avrupa Yakası'na hızlı ve garantili servis hizmeti sunmaktayız."
        }
      },
      {
        "@type": "Question",
        "name": "Avrupa Yakası'nda uzak bir ilçedeyim, yine de 30 dakikada gelir misiniz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Farklı ilçelerde hazır bekleyen gezici mobil araçlarımız sayesinde Avrupa Yakası'nın en uç noktalarına bile en kısa sürede ulaşıyoruz."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Sık Sorulan Sorular | Aya Elektrik 7/24 Acil Elektrikçi</title>
        <meta name="description" content="Aya Elektrik hizmetleri, acil servis süreleri, fiyatlandırma ve hizmet bölgelerimiz hakkında sıkça sorulan sorular ve cevapları." />
        <link rel="canonical" href="https://ayaelektrik.com/sss" />
        <meta property="og:title" content="Sık Sorulan Sorular | Aya Elektrik" />
        <meta property="og:description" content="Aya Elektrik hizmetleri, acil servis süreleri, fiyatlandırma ve hizmet bölgelerimiz hakkında sıkça sorulan sorular ve cevapları." />
        <meta property="og:url" content="https://ayaelektrik.com/sss" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b2e59] mb-12 text-center">
            Sık Sorulan Sorular
          </h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-6 pb-2 border-b-2 border-slate-100">Genel Sorular</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Aya Elektrik hangi hizmetleri sunmaktadır?</h3>
                  <p className="text-slate-600 leading-relaxed">Elektrik arıza tespiti, pano yenileme, şofben montajı, elektrik tesisatı kurulumu, UPS kurulumu ve kaçak akım rölesi montajı başta olmak üzere tüm elektrik tesisat işlerinizi yapmaktayız.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Elektrik arızalarına kendim müdahale edebilir miyim?</h3>
                  <p className="text-slate-600 leading-relaxed">Hayır, elektrik arızalarına uzman olmayan kişilerin müdahale etmesi hayati risk taşır. Ayrıca yanlış müdahale cihazlarınıza ve tesisatınıza geri dönülmez zararlar verebilir.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Yapılan işlemlerde garanti veriyor musunuz?</h3>
                  <p className="text-slate-600 leading-relaxed">Evet, tüm parça değişimleri ve işçilik hizmetlerimiz garanti kapsamındadır. Kullandığımız tüm malzemeler TSE belgelidir.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Sigortam sürekli atıyor, sebebi nedir?</h3>
                  <p className="text-slate-600 leading-relaxed">Tesisatınızda bir kısa devre, aşırı yüklenme veya kaçak olabilir. Uzman ekibimiz özel ölçüm cihazlarıyla arızanın kaynağını bularak sorunu kalıcı olarak çözer.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-6 pb-2 border-b-2 border-slate-100">Acil Servis</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">7/24 hizmetiniz var mı?</h3>
                  <p className="text-slate-600 leading-relaxed">Evet, haftanın 7 günü, günün 24 saati, resmi tatiller dahil kesintisiz nöbetçi elektrikçi hizmeti sunuyoruz.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Acil durumlarda adresime ne kadar sürede ulaşırsınız?</h3>
                  <p className="text-slate-600 leading-relaxed">Gezici mobil ekiplerimiz sayesinde İstanbul Avrupa Yakası'ndaki tüm ilçelere ortalama 30 dakika içerisinde ulaşmaktayız.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Gece saatlerinde fiyatlandırma farklı mıdır?</h3>
                  <p className="text-slate-600 leading-relaxed">Acil durumlarda standart fiyat politikamızı korumaya özen gösteriyoruz, ancak gece geç saatlerde uygulanan servis ücreti mesafeye göre cüzi miktarda farklılık gösterebilir.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Şalterden yanık kokusu geliyor, ne yapmalıyım?</h3>
                  <p className="text-slate-600 leading-relaxed">Kesinlikle dokunmayın ve ana şalteri kapatabiliyorsanız hemen kapatın. Yangın riskine karşı derhal bizi (0530 069 53 93) arayarak acil destek isteyin.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-6 pb-2 border-b-2 border-slate-100">Fiyat ve Ödeme</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Servis ücretiniz ne kadar?</h3>
                  <p className="text-slate-600 leading-relaxed">Servis ve arıza tespit ücretimiz lokasyona ve işlemin niteliğine göre değişmektedir. Detaylı bilgi için bizi arayabilirsiniz.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Ödemeyi nasıl yapabilirim?</h3>
                  <p className="text-slate-600 leading-relaxed">İşlem bitiminde nakit, kredi kartı veya banka havalesi/EFT yöntemlerinden dilediğinizi kullanarak ödeme yapabilirsiniz.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Fiyat teklifi alabilir miyim?</h3>
                  <p className="text-slate-600 leading-relaxed">Evet, büyük projeleriniz, pano yenileme veya tesisat değişimleri için ücretsiz keşif sonrası detaylı fiyat teklifi sunuyoruz.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-6 pb-2 border-b-2 border-slate-100">Hizmet Bölgesi</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Hangi bölgelere hizmet veriyorsunuz?</h3>
                  <p className="text-slate-600 leading-relaxed">İstanbul Avrupa Yakası'nda bulunan tüm ilçelere (Beşiktaş, Şişli, Sarıyer, Beylikdüzü, Bakırköy, Fatih vb. toplam 25 ilçe) acil servisimiz mevcuttur.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Anadolu Yakası'na servisiniz var mı?</h3>
                  <p className="text-slate-600 leading-relaxed">Şu an için gezici ekiplerimizle yalnızca İstanbul Avrupa Yakası'na hızlı ve garantili servis hizmeti sunmaktayız.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Avrupa Yakası'nda uzak bir ilçedeyim, yine de 30 dakikada gelir misiniz?</h3>
                  <p className="text-slate-600 leading-relaxed">Farklı ilçelerde hazır bekleyen gezici mobil araçlarımız sayesinde Avrupa Yakası'nın en uç noktalarına bile en kısa sürede ulaşıyoruz.</p>
                </div>
              </div>
            </section>
          </div>
          
          <div className="mt-16 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">Başka Sorularınız mı Var?</h2>
            <p className="text-slate-600 mb-6">Aradığınız cevabı bulamadıysanız veya acil desteğe ihtiyacınız varsa bizi her zaman arayabilirsiniz.</p>
            <a 
              href="tel:+905300695393" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#0b2e59] bg-[#ffb703] rounded-lg hover:bg-[#e6a500] transition-colors"
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

