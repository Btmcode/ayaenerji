import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileCallBar from "../components/MobileCallBar";
import WhatsAppButton from "../components/WhatsAppButton";

export default function CerezPolitikasiPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Çerez Politikası",
    "description": "Aya Elektrik çerez (cookie) politikası. Sitemizde kullanılan çerezler ve nasıl yönetebileceğiniz hakkında bilgi.",
    "url": "https://ayaelektrik.com/cerez-politikasi"
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Helmet>
        <title>Çerez Politikası | Aya Elektrik</title>
        <meta name="description" content="Aya Elektrik çerez (cookie) politikası. Sitemizde kullanılan çerezler ve nasıl yönetebileceğiniz hakkında bilgi." />
        <link rel="canonical" href="https://ayaelektrik.com/cerez-politikasi" />
        <meta property="og:title" content="Çerez Politikası | Aya Elektrik" />
        <meta property="og:description" content="Aya Elektrik çerez (cookie) politikası." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ayaelektrik.com/cerez-politikasi" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/cerez-politikasi-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Çerez (Cookie) Politikası</h1>
            
            <div className="prose prose-slate max-w-none">
              <p>Aya Elektrik olarak, web sitemizdeki deneyiminizi iyileştirmek için çerezleri (cookies) kullanıyoruz. Bu politika, çerezlerin ne olduğunu, nasıl kullanıldığını ve bunları nasıl kontrol edebileceğinizi açıklamaktadır.</p>

              <h2>1. Çerez (Cookie) Nedir?</h2>
              <p>Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Web sitesinin daha verimli çalışmasını sağlamak ve site sahiplerine bilgi vermek amacıyla yaygın olarak kullanılırlar.</p>

              <div className="my-6 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm m-0">Çerez Tercihlerinizi Şimdi Değiştirebilirsiniz</h4>
                  <p className="text-xs text-slate-600 m-0">KVKK Madde 11 uyarınca verdiğiniz izinleri dilediğiniz an tek tıkla güncelleyebilirsiniz.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('aya-open-cookie-settings'));
                  }}
                  className="px-4 py-2.5 bg-[#0b2e59] text-white hover:bg-[#082242] rounded-xl text-xs font-bold transition-colors shrink-0 shadow-sm"
                >
                  Çerez Tercihlerini Yönet
                </button>
              </div>

              <h2>2. Sitemizde Kullanılan Çerez Kategorileri ve Hukuki Sebepleri</h2>
              <div className="overflow-x-auto my-4">
                <table className="min-w-full text-xs text-left border border-slate-200">
                  <thead className="bg-slate-100 text-slate-800 font-bold">
                    <tr>
                      <th className="p-2.5 border">Kategori</th>
                      <th className="p-2.5 border">Sağlayıcı</th>
                      <th className="p-2.5 border">Kullanım Amacı</th>
                      <th className="p-2.5 border">Saklama Süresi</th>
                      <th className="p-2.5 border">KVKK Hukuki Sebebi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2.5 font-semibold">Zorunlu / Teknik</td>
                      <td className="p-2.5">Aya Elektrik (Birinci Taraf)</td>
                      <td className="p-2.5">Oturum güvenliği, CSRF koruması, çerez onay tercihinin saklanması (aya_cookie_consent_v2)</td>
                      <td className="p-2.5">1 Yıl</td>
                      <td className="p-2.5">KVKK m.5/2-f (Meşru Menfaat)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">İşlevsel</td>
                      <td className="p-2.5">Aya Elektrik (Birinci Taraf)</td>
                      <td className="p-2.5">İlçe ve rota simülasyonu tercihleri, arayüz ayarları</td>
                      <td className="p-2.5">6 Ay</td>
                      <td className="p-2.5">Açık Rıza (KVKK m.5/1)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">Analitik</td>
                      <td className="p-2.5">Google Analytics / Tag Manager</td>
                      <td className="p-2.5">Sayfa görüntüleme, oturum süresi, hız ve hata metriklerinin anonim ölçümü</td>
                      <td className="p-2.5">13 Ay</td>
                      <td className="p-2.5">Açık Rıza (KVKK m.5/1)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">Pazarlama &amp; Reklam</td>
                      <td className="p-2.5">Google AdSense / DoubleClick</td>
                      <td className="p-2.5">İlgi alanına göre kişiselleştirilmiş reklam gösterimi ve dönüşüm ölçümü</td>
                      <td className="p-2.5">Tarayıcı/Google standartları</td>
                      <td className="p-2.5">Açık Rıza (KVKK m.5/1)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>3. Çerezleri Neden Kullanıyoruz?</h2>
              <p>Aya Elektrik olarak çerezleri aşağıdaki amaçlar doğrultusunda kullanmaktayız:</p>
              <ul>
                <li>Web sitesinin kesintisiz, güvenli ve istikrarlı çalışmasını temin etmek</li>
                <li>Ziyaretçilerimizin ilçe ve acil servis taleplerini hızlıca yanıtlamak</li>
                <li>Site trafiğini ve performansını analiz ederek kullanıcı deneyimini yükseltmek</li>
                <li>Kullanıcı onay verdiği takdirde Google AdSense ile alakalı reklamlar sunmak</li>
              </ul>

              <h2>4. Çerez Tercihlerini Değiştirme ve Rızayı Geri Alma</h2>
              <p>
                Kullanıcılarımız web sitemizin sağ/sol altında yer alan kalkan şeklindeki <strong>"Çerez Ayarları"</strong> butonuna veya sayfa altbilgisindeki (Footer) <strong>"Çerez Tercihlerini Yönet"</strong> bağlantısına tıklayarak verdikleri rızayı diledikleri her an tek tıkla geri alabilir ya da değiştirebilirler. Ayrıca tarayıcı seviyesinde de çerezler silinebilir:
              </p>
              <ul>
                <li>Google Reklam Tercihleri: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#0b2e59] underline font-medium">adssettings.google.com</a></li>
                <li>Tüketici Tercihleri Platformu: <a href="https://www.youronlinechoices.com/tr/" target="_blank" rel="noopener noreferrer" className="text-[#0b2e59] underline font-medium">Your Online Choices TR</a></li>
              </ul>

              <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="mb-1 font-bold text-slate-900 text-sm">Veri Sorumlusu ve Çerez İletişimi:</p>
                <p className="text-xs text-slate-600 mb-1">Sorularınız, başvurularınız ve rıza değişiklik talepleriniz için:</p>
                <p className="text-xs text-slate-700 m-0"><strong>E-posta:</strong> ayaenerji@gmail.com | <strong>Telefon:</strong> 0530 069 53 93</p>
                <p className="text-xs text-slate-700 m-0"><strong>Adres:</strong> Maltepe Mah. Yedikule Çırpıcı Yolu No: 33, Zeytinburnu / İstanbul</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileCallBar />
      <WhatsAppButton />
    </div>
  );
}
