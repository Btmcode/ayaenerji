import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function KacakAkimRolesiPage() {
  return (
    <>
      <Helmet>
        <title>Kaçak Akım Rölesi Montajı ve Testi | Aya Elektrik</title>
        <meta name="description" content="Hayat kurtaran kaçak akım rölesi kurulumu, arıza tespiti ve değişimi. Güvenliğiniz için TSE standartlarında profesyonel test ve ölçüm garantisi." />
        <link rel="canonical" href="https://ayaelektrik.com/hizmetler/kacak-akim-rolesi" />
        <meta property="og:title" content="Kaçak Akım Rölesi Montajı ve Testi | Aya Elektrik" />
        <meta property="og:description" content="Hayat kurtaran kaçak akım rölesi kurulumu, arıza tespiti ve değişimi. Güvenliğiniz için TSE standartlarında profesyonel test ve ölçüm garantisi." />
        <meta property="og:url" content="https://ayaelektrik.com/hizmetler/kacak-akim-rolesi" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/kacak-akim-rolesi-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Kaçak akım rölesi sürekli atıyor, röleyi iptal etsem olur mu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kesinlikle HAYIR! Kaçak akım rölesi hayat kurtarır. Sürekli atması görevini yaptığını ve evinizde tehlikeli bir elektrik kaçağı olduğunu gösterir. Röleyi iptal etmek yerine kaçağın yerini bulup tamir etmesi için acil elektrikçi çağırmalısınız."
                }
              },
              {
                "@type": "Question",
                "name": "Neden ev içi tesisata 30mA, ana panoya 300mA röle takılıyor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "30mA (hayat koruma) doğrudan insan çarpılmalarına karşı korurken, 300mA (yangın koruma) kablolardaki izolasyon hatalarından kaynaklanabilecek ısınma ve yangınlara karşı binanın ana beslemesini korur."
                }
              },
              {
                "@type": "Question",
                "name": "Evimde topraklama hattı yok, kaçak akım rölesi takılır mı?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Röle teknik olarak topraklamasız çalışıp atabilir, ancak standartlara göre tesisatta topraklama hattı olması zorunludur. Sadece röle takmak yerine önce topraklama hattı çekilmelidir."
                }
              },
              {
                "@type": "Question",
                "name": "Rölenin üzerindeki 'Test' (T) düğmesi ne işe yarar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Rölenin iç mekanizmasının sağlam olup olmadığını test eder. Ayda en az 1 kez bu düğmeye basarak rölenin attığını teyit etmeli, atmıyorsa hemen yenisi ile değiştirmelisiniz."
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
            Kaçak Akım Rölesi Montajı
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900">
              Kaçak Akım Rölesi Montajı için İstanbul Avrupa Yakası'nda 7/24 hizmet veriyoruz. 30 dakikada adresinizdeyiz.
            </p>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Elektrik çarpmalarına ve elektrik kaynaklı yangınlara karşı alınabilecek en hayati önlem, Kaçak Akım Rölesi (KAR) kullanılmasıdır. Prizlerdeki kısa devreler veya cihazların gövdelerine sızan elektrik kaçakları, tesisatınızdaki standart sigortalar tarafından genellikle algılanamaz; sigortalar sadece kabloları korur, sizi değil. Kaçak akım rölesi ise mili-saniyeler içinde, giden ve gelen akım arasındaki 30mA (hayat koruma) veya 300mA (yangın koruma) seviyesindeki en ufak farkı algılayarak ana akımı anında keser ve muhtemel faciaları önler.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Ne yazık ki eski binaların çoğunda kaçak akım rölesi bulunmamakta veya bulunan röleler yanlış bağlantılar yüzünden ("sürekli atıyor" bahanesiyle) devreden çıkarılmaktadır. Rölenin sürekli atması cihazın arızalı olduğunu değil, tesisatınızda gizli bir kaçak (örneğin nötr-toprak karışması veya su sızıntısı olan bir kablo) olduğunu gösterir. Uzman ekiplerimiz, arızanın kök nedenini hassas izolasyon test cihazlarıyla (meger) santim santim arayarak bulur. Kaçağı giderdikten sonra, Avrupa standartlarında ve evinizin yük değerine uygun yeni bir kaçak akım rölesini sigorta panonuza kusursuzca entegre eder.
            </p>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Aya Elektrik olarak, hem can güvenliğinizi hem de mülkünüzün değerini korumak için güvenilir markaların (Siemens, Legrand, Schneider gibi) TSE belgeli A veya AC tipi koruma ürünlerini tercih etmekteyiz. Montajı tamamlanan her röle, özel kaçak akım test aletleriyle farklı mili-amper değerlerinde yapay olarak attırılarak (Trip-Test) açma süresinin yasal sınırlar içinde olup olmadığı kontrol edilir. Güvenli bir yuva ve içinizin rahat etmesi için elektrik panolarınızdaki korumayı şansa bırakmayın.
            </p>

            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold text-[#0b2e59] mb-8">Sık Sorulan Sorular</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Kaçak akım rölesi sürekli atıyor, röleyi iptal etsem olur mu?</h3>
                  <p className="text-slate-700">Kesinlikle HAYIR! Kaçak akım rölesi hayat kurtarır. Sürekli atması görevini yaptığını ve evinizde tehlikeli bir elektrik kaçağı olduğunu gösterir. Röleyi iptal etmek yerine kaçağın yerini bulup tamir etmesi için acil elektrikçi çağırmalısınız.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Neden ev içi tesisata 30mA, ana panoya 300mA röle takılıyor?</h3>
                  <p className="text-slate-700">30mA (hayat koruma) doğrudan insan çarpılmalarına karşı korurken, 300mA (yangın koruma) kablolardaki izolasyon hatalarından kaynaklanabilecek ısınma ve yangınlara karşı binanın ana beslemesini korur.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Evimde topraklama hattı yok, kaçak akım rölesi takılır mı?</h3>
                  <p className="text-slate-700">Röle teknik olarak topraklamasız çalışıp atabilir, ancak standartlara göre tesisatta topraklama hattı olması zorunludur. Sadece röle takmak yerine önce topraklama hattı çekilmelidir.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Rölenin üzerindeki 'Test' (T) düğmesi ne işe yarar?</h3>
                  <p className="text-slate-700">Rölenin iç mekanizmasının sağlam olup olmadığını test eder. Ayda en az 1 kez bu düğmeye basarak rölenin attığını teyit etmeli, atmıyorsa hemen yenisi ile değiştirmelisiniz.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#0b2e59] mb-4">Elektrik Çarpması veya Yangın Riskinden Korunun!</h2>
              <p className="text-slate-600 mb-6">Sürekli atan şalterleriniz veya test edilmesi gereken kaçak akım röleleriniz için anında müdahale.</p>
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
