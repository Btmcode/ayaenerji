import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aya Elektrik",
    "url": "https://ayaelektrik.com",
    "logo": "https://ayaelektrik.com/images/og/ana-sayfa-og.jpg",
    "foundingDate": "2010",
    "areaServed": [
      "Beşiktaş", "Şişli", "Beyoğlu", "Sarıyer", "Bakırköy", 
      "Bahçelievler", "Güngören", "Bağcılar", "Esenler", "Bayrampaşa", 
      "Gaziosmanpaşa", "Eyüpsultan", "Sultangazi", "Kağıthane", "Zeytinburnu", 
      "Küçükçekmece", "Avcılar", "Başakşehir", "Esenyurt", "Arnavutköy", 
      "Büyükçekmece", "Beylikdüzü", "Fatih", "Silivri", "Çatalca"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Hakkımızda | Aya Elektrik - İstanbul'un Güvenilir Elektrikçisi</title>
        <meta name="description" content="Aya Elektrik'in kuruluş hikayesi, vizyonu, TSE onaylı uzman ekibi ve İstanbul Avrupa Yakası'ndaki 25 ilçede sunduğu acil elektrikçi hizmetleri." />
        <link rel="canonical" href="https://ayaelektrik.com/hakkimizda" />
        <meta property="og:title" content="Hakkımızda | Aya Elektrik" />
        <meta property="og:description" content="Aya Elektrik'in kuruluş hikayesi, vizyonu, TSE onaylı uzman ekibi ve İstanbul Avrupa Yakası'ndaki 25 ilçede sunduğu acil elektrikçi hizmetleri." />
        <meta property="og:url" content="https://ayaelektrik.com/hakkimizda" />
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b2e59] mb-12 text-center">
            Hakkımızda
          </h1>

          <div className="prose prose-lg prose-slate max-w-none mb-16">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Aya Elektrik, İstanbul Avrupa Yakası'nın hızla artan nitelikli ve acil elektrikçi ihtiyacını karşılamak amacıyla 15 yılı aşkın bir süre önce kurulmuştur. Yılların getirdiği saha tecrübesiyle, küçük konut arızalarından devasa sanayi tesislerinin pano kurulumlarına kadar geniş bir yelpazede hizmet vermekteyiz. Amacımız sadece arızayı gidermek değil; güvenilir, uluslararası standartlara uygun ve uzun ömürlü kalıcı çözümler üretmektir.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Kurulduğumuz günden bu yana "Önce Can Güvenliği" prensibinden asla taviz vermedik. Elektrik şakaya gelmez; bu bilinçle her bir müşterimizin yaşam ve çalışma alanını, kendi evimizmiş gibi titizlikle inceliyor, gizli tehlikeleri ortaya çıkararak sıfır hata politikasıyla çalışıyoruz. TSE onaylı garantili malzemeler kullanarak, yaptığımız tüm işçiliğin arkasında duruyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-[#ffb703] mb-2">15+</div>
              <div className="text-slate-700 font-bold">Yıllık Tecrübe</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-[#ffb703] mb-2">10.000+</div>
              <div className="text-slate-700 font-bold">Mutlu Müşteri</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-[#ffb703] mb-2">25</div>
              <div className="text-slate-700 font-bold">Aktif İlçe</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-[#ffb703] mb-2">30 Dk</div>
              <div className="text-slate-700 font-bold">Adrese Ulaşım</div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#0b2e59] mb-6">Uzman Ekibimiz ve Altyapımız</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Sıradan bir tamirci mantığıyla değil, profesyonel bir mühendislik vizyonuyla hareket ediyoruz. Kadromuzda yer alan tüm elektrik ustaları ve teknikerler, alanlarında gerekli tüm mesleki yeterlilik ve İSG (İş Sağlığı ve Güvenliği) belgelerine sahiptir.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Arıza tespiti yaparken göz kararı veya tahmine dayalı yöntemler kullanmıyoruz. Ekiplerimiz son teknoloji termal kameralar, izolasyon megerleri, topraklama ölçüm cihazları ve kaçak akım test aletleriyle donatılmıştır. Bu sayede sorunun kaynağına doğrudan, nokta atışı ulaşarak size zaman ve para tasarrufu sağlıyoruz.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#0b2e59] mb-6">Hizmet Bölgelerimiz (Avrupa Yakası)</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-2 text-slate-700 font-medium">
                <div>✓ Arnavutköy</div>
                <div>✓ Avcılar</div>
                <div>✓ Bağcılar</div>
                <div>✓ Bahçelievler</div>
                <div>✓ Bakırköy</div>
                <div>✓ Başakşehir</div>
                <div>✓ Bayrampaşa</div>
                <div>✓ Beşiktaş</div>
                <div>✓ Beylikdüzü</div>
                <div>✓ Beyoğlu</div>
                <div>✓ Büyükçekmece</div>
                <div>✓ Çatalca</div>
                <div>✓ Esenler</div>
                <div>✓ Esenyurt</div>
                <div>✓ Eyüpsultan</div>
                <div>✓ Fatih</div>
                <div>✓ Gaziosmanpaşa</div>
                <div>✓ Güngören</div>
                <div>✓ Kağıthane</div>
                <div>✓ Küçükçekmece</div>
                <div>✓ Sarıyer</div>
                <div>✓ Silivri</div>
                <div>✓ Sultangazi</div>
                <div>✓ Şişli</div>
                <div>✓ Zeytinburnu</div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-[#0b2e59] rounded-2xl p-10 md:p-16 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Aya Elektrik Güvencesiyle Tanışın</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Elektrik arızalarınızı şansa bırakmayın. 7/24 kesintisiz hizmet veren nöbetçi ekiplerimizle iletişime geçmek için hemen arayın, 30 dakikada kapınızda olalım.
            </p>
            <a 
              href="tel:+905300695393" 
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-[#0b2e59] bg-[#ffb703] rounded-xl hover:bg-white transition-colors"
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

