import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileCallBar from "../components/MobileCallBar";
import WhatsAppButton from "../components/WhatsAppButton";

export default function GizlilikPolitikasiPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gizlilik Politikası",
    "description": "Aya Elektrik gizlilik politikası ve KVKK aydınlatma metni. Kişisel verilerinizin nasıl işlendiği hakkında bilgi edinin.",
    "url": "https://ayaelektrik.com/gizlilik-politikasi"
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Helmet>
        <title>Gizlilik Politikası (KVKK) | Aya Elektrik</title>
        <meta name="description" content="Aya Elektrik gizlilik politikası ve KVKK aydınlatma metni. Kişisel verilerinizin nasıl işlendiği hakkında bilgi edinin." />
        <link rel="canonical" href="https://ayaelektrik.com/gizlilik-politikasi" />
        <meta property="og:title" content="Gizlilik Politikası | Aya Elektrik" />
        <meta property="og:description" content="Aya Elektrik gizlilik politikası ve KVKK aydınlatma metni." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ayaelektrik.com/gizlilik-politikasi" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/gizlilik-politikasi-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
            
            <div className="prose prose-slate max-w-none">
              <p>Son güncellenme tarihi: 10 Temmuz 2026</p>
              
              <p>Aya Elektrik ("biz", "bizim" veya "şirket") olarak, müşterilerimizin gizliliğini korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.</p>

              <h2>1. Toplanan Kişisel Veriler</h2>
              <p>Hizmetlerimizden yararlanabilmeniz için bizimle iletişime geçtiğinizde (telefon, WhatsApp veya iletişim formu aracılığıyla) aşağıdaki kişisel verileri toplayabiliriz:</p>
              <ul>
                <li>Ad ve Soyad</li>
                <li>İletişim Bilgileri (Telefon numarası, e-posta adresi)</li>
                <li>Hizmet alınacak adres bilgisi</li>
                <li>Talep edilen hizmete ilişkin detaylar</li>
              </ul>

              <h2>2. Kişisel Verilerin İşlenme Amaçları</h2>
              <p>Topladığımız kişisel veriler şu amaçlarla kullanılmaktadır:</p>
              <ul>
                <li>Talep ettiğiniz elektrik tamir ve bakım hizmetlerinin sağlanması</li>
                <li>Acil servis ekiplerimizin adresinize yönlendirilmesi</li>
                <li>Hizmet kalitemizin artırılması ve müşteri memnuniyetinin ölçülmesi</li>
                <li>Gerekli durumlarda sizinle iletişime geçilmesi</li>
                <li>Yasal yükümlülüklerimizin yerine getirilmesi</li>
              </ul>

              <h2>3. Verilerin Korunması</h2>
              <p>Kişisel verileriniz, yetkisiz erişime, kaybolmaya, değiştirilmeye veya yok edilmeye karşı teknik ve idari tedbirler alınarak güvenli bir şekilde saklanmaktadır.</p>

              <h2>4. Verilerin Paylaşımı</h2>
              <p>Aya Elektrik, kişisel verilerinizi yasal zorunluluklar dışında hiçbir üçüncü şahıs veya kurumla paylaşmaz, satmaz veya kiralamaz.</p>

              <h2>5. Haklarınız</h2>
              <p>KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul>
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>Verilerinizin düzeltilmesini, silinmesini veya yok edilmesini talep etme</li>
              </ul>
              
              <p>Bu haklarınızı kullanmak veya gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.</p>

              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="mb-0 font-medium">Aya Elektrik İletişim Bilgileri:</p>
                <p className="mb-0"><strong>Telefon:</strong> 0555 123 45 67</p>
                <p className="mb-0"><strong>E-posta:</strong> info@ayaelektrik.com</p>
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
