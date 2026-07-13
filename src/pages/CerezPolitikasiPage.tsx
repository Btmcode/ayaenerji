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

              <h2>2. Hangi Çerezleri Kullanıyoruz?</h2>
              <p>Sitemizde aşağıdaki çerez türleri kullanılmaktadır:</p>
              <ul>
                <li><strong>Zorunlu Çerezler:</strong> Web sitemizin temel işlevlerini yerine getirebilmesi için kesinlikle gerekli olan çerezlerdir. Güvenlik ve siteye erişim gibi temel özellikleri sağlarlar.</li>
                <li><strong>Performans ve Analiz Çerezleri:</strong> Ziyaretçilerin web sitemizi nasıl kullandığını anlamamıza yardımcı olur. Bu çerezler sayesinde hangi sayfaların daha çok ziyaret edildiğini analiz ederek sitemizi geliştirebiliriz (örneğin, Google Analytics).</li>
                <li><strong>İşlevsellik Çerezleri:</strong> Web sitemizin tercihlerinizi (dil seçimi vb.) hatırlamasını sağlar.</li>
              </ul>

              <h2>3. Çerezleri Neden Kullanıyoruz?</h2>
              <p>Aya Elektrik olarak çerezleri aşağıdaki amaçlar doğrultusunda kullanmaktayız:</p>
              <ul>
                <li>Web sitesinin düzgün ve güvenli bir şekilde çalışmasını sağlamak</li>
                <li>Ziyaretçi deneyimini kişiselleştirmek ve kolaylaştırmak</li>
                <li>Site trafiğini analiz ederek performans iyileştirmeleri yapmak</li>
              </ul>

              <h2>4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
              <p>Çerezleri dilediğiniz gibi kontrol edebilir veya silebilirsiniz. Bilgisayarınızda veya cihazınızda halihazırda bulunan çerezleri silebilir ve çoğu internet tarayıcısında çerezlerin kaydedilmesini engelleyebilirsiniz. Ancak bu durumda, sitemizdeki bazı özellikler düzgün çalışmayabilir.</p>
              <p>Çerez ayarlarınızı değiştirmek için kullandığınız tarayıcının ayarlar veya seçenekler menüsünü ziyaret edebilirsiniz.</p>

              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="mb-0 font-medium">İletişim:</p>
                <p className="mb-0">Çerez politikamız hakkında sorularınız varsa, lütfen bizimle iletişime geçin.</p>
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
