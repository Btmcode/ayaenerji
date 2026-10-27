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

              <h2>4. Verilerin Paylaşımı ve Üçüncü Taraf Hizmetleri</h2>
              <p>Aya Elektrik, kişisel verilerinizi yasal zorunluluklar dışında hiçbir üçüncü şahıs veya kurumla satmaz veya kiralamaz. Web sitemizde analiz ve reklam sunumu amacıyla Google gibi güvenilir teknoloji sağlayıcılarının altyapıları kullanılmaktadır.</p>

              <h2>5. Google AdSense ve Reklam Çerezleri Politikası</h2>
              <p>Web sitemiz, Google Inc. tarafından sağlanan bir reklam hizmeti olan <strong>Google AdSense</strong> kullanmaktadır. Google AdSense politikaları uyarınca aşağıdaki hususları ziyaretçilerimizin bilgisine sunarız:</p>
              <ul>
                <li><strong>Üçüncü Taraf Satıcılar:</strong> Google dahil üçüncü taraf satıcılar, kullanıcıların web sitemize veya diğer web sitelerine daha önce yaptığı ziyaretlere dayalı olarak reklam yayınlamak için çerezleri (cookies) kullanır.</li>
                <li><strong>Kişiselleştirilmiş Reklamlar:</strong> Google'ın reklam çerezlerini (örneğin DoubleClick çerezi) kullanması, kullanıcılara sitemize ve internetteki diğer sitelere yaptıkları ziyaretlere dayalı olarak ilgi alanlarına uygun reklamlar sunmasına olanak tanır.</li>
                <li><strong>Reklam Tercihlerini Yönetme:</strong> Kullanıcılar, <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#0b2e59] underline font-medium">Google Reklam Ayarları</a> sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilir veya <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#0b2e59] underline font-medium">www.aboutads.info</a> adresinden üçüncü taraf satıcıların çerez kullanımını engelleyebilirler.</li>
                <li>Sitemiz, AdSense politikalarına uygun olarak kullanıcıları yanıltıcı hiçbir tıklama teşviki, sahte düğme veya zorlama eyleme yer vermemektedir.</li>
              </ul>

              <h2>6. İlgili Kişi Olarak Haklarınız (6698 Sayılı KVKK Madde 11)</h2>
              <p>6698 sayılı Kanun’un 11. maddesi uyarınca veri sahipleri, veri sorumlusuna başvurarak aşağıdaki haklara sahiptir:</p>
              <ul>
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                <li>KVKK 7. maddede öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
                <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
              </ul>
              
              <p>
                Başvurularınız, <strong>Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ</strong> hükümlerine uygun olarak yazılı veya güvenli elektronik imza, mobil imza ya da sistemimizde kayıtlı bulunan e-posta adresiniz (<strong>ayaenerji@gmail.com</strong>) vasıtasıyla iletilebilir. Başvurularınız en geç <strong>30 (otuz) gün</strong> içerisinde ücretsiz olarak sonuçlandırılacaktır.
              </p>

              <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="mb-2 font-bold text-slate-900 text-sm">Veri Sorumlusu Resmi Bilgileri:</p>
                <p className="mb-1 text-xs"><strong>Ticari Ünvan:</strong> Aya Elektrik Mühendislik ve Enerji Sistemleri</p>
                <p className="mb-1 text-xs"><strong>Veri Sorumlusu İrtibat:</strong> Müşteri Hakları ve KVKK Temsilciliği</p>
                <p className="mb-1 text-xs"><strong>Telefon / Acil Destek:</strong> 0530 069 53 93</p>
                <p className="mb-1 text-xs"><strong>E-posta:</strong> ayaenerji@gmail.com</p>
                <p className="mb-0 text-xs"><strong>Merkez Adres:</strong> Maltepe Mah. Yedikule Çırpıcı Yolu No: 33, Zeytinburnu / İstanbul</p>
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
