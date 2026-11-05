import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Scale,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  HelpCircle
} from "lucide-react";

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Helmet>
        <title>Kullanım Koşulları ve Hukuki Şartlar | Aya Elektrik</title>
        <meta
          name="description"
          content="Aya Elektrik internet sitesi kullanım koşulları, fikri mülkiyet hakları, elektrik hesaplama araçları sorumluluk reddi beyanı ve Google AdSense reklam ilkeleri."
        />
        <link rel="canonical" href="https://ayaelektrik.com/kullanim-kosullari" />
      </Helmet>

      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-900 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Kullanım Koşulları</span>
          </nav>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-8">
            
            {/* Header */}
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-[#0b2e59]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Kullanım Koşulları & Hukuki Şartlar
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Son Güncelleme: 17 Ekim 2026 · Yürürlük Tarihi: 1 Ocak 2026
                </p>
              </div>
            </div>

            {/* Intro */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Bu internet sitesini (<strong>https://ayaelektrik.com</strong>) ziyaret ederek, sitede sunulan teknik makaleleri, interaktif hesaplama araçlarını veya acil usta çağrı kanallarını kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen siteyi kullanmayınız.
            </div>

            {/* Sections */}
            <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center text-xs">1</span>
                  Taraf ve Hizmet Sağlayıcı Bilgisi
                </h2>
                <p>
                  Bu internet sitesi, 5651 Sayılı Kanun uyarınca "İçerik Sağlayıcı" sıfatıyla <strong>Aya Elektrik - 7/24 Nöbetçi Elektrik &amp; Arıza Bakım Onarım Servisi</strong> (Maltepe Mah. Yedikule Çırpıcı Yolu No: 33, Zeytinburnu / İstanbul) tarafından işletilmektedir.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center text-xs">2</span>
                  Elektrik Hesaplama Araçları ve Sorumluluk Sınırı
                </h2>
                <p>
                  Sitemizde yer alan <strong>Kablo Kesiti &amp; Gerilim Düşümü</strong>, <strong>EV Wallbox Şarj Süresi</strong>, <strong>Pano Güç &amp; Sigorta Hesabı</strong>, <strong>Çatı Güneş Paneli (GES)</strong> ve <strong>Aydınlatma Lümen</strong> hesaplama araçları genel elektriksel teknik standartlara (TSE HD 60364, TS EN 61851, TS EN 12464-1) dayalı ön bilgilendirme amaçlıdır.
                </p>
                <div className="mt-2 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Önemli Uyarı:</strong> Saha ortamındaki harmonikler, ortam sıcaklığı, döşeme tipi ve kablo demet katsayısı gerçek değerleri değiştirebilir. Aya Elektrik, hesaplama araçlarının bireysel kullanımından doğabilecek maddi/manevi zararlardan ve elektrik kazalarından sorumlu tutulamaz. Nihai uygulama öncesinde yetkili elektrik ustalarımızın yerinde fiziki ölçüm ve keşif yapması esastır.
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center text-xs">3</span>
                  Fikri ve Sınai Mülkiyet Hakları
                </h2>
                <p>
                  Sitede yer alan tüm teknik makaleler, rehberler, fotoğraflar, kodlar, algoritmalar, tasarımlar, logo ve yazılımlar 5846 Sayılı Fikir ve Sanat Eserleri Kanunu ile Türk Ticaret Kanunu koruması altındadır. Yazılı izin alınmaksızın kopyalanması, çoğaltılması, başka sitelerde kaynak gösterilmeden yayımlanması veya ticari amaçla kullanılması kesinlikle yasaktır.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center text-xs">4</span>
                  Google AdSense ve Reklam Yayıncılığı Politikası
                </h2>
                <p>
                  Sitemiz, yayın maliyetlerini karşılamak ve ücretsiz teknik içerik sunabilmek amacıyla <strong>Google AdSense</strong> program ortağıdır.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                  <li>Google dahil üçüncü taraf tedarikçiler, kullanıcıların web sitemize veya diğer sitelere daha önce yaptığı ziyaretlere dayalı olarak reklam sunmak için çerezlerden yararlanır.</li>
                  <li>Google'ın reklam çerezlerini kullanması, Google ve ortaklarının kullanıcılara sitenizdeki ve/veya internetteki diğer sitelerdeki ziyaretlerine dayalı reklamlar sunmasına olanak tanır.</li>
                  <li>Kullanıcılar, <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#0b2e59] font-bold underline">Google Reklam Ayarları</a> sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilir.</li>
                  <li>Sitemizde sahte tıklama, yanıltıcı buton yerleşimi veya kullanıcıyı reklama tıklamaya zorlayan hiçbir uygulama barındırılmaz.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center text-xs">5</span>
                  Gizlilik ve Kişisel Veriler (KVKK)
                </h2>
                <p>
                  Ziyaretçilerimizin gizliliği temel önceliğimizdir. Arıza çağrıları, iletişim formları veya çerezler yoluyla elde edilen veriler 6698 Sayılı Kişisel Verilerin Korunması Kanunu'na tam uyumlu olarak işlenir. Ayrıntılı bilgi için <Link to="/gizlilik-politikasi" className="text-[#0b2e59] font-semibold underline">Gizlilik Politikamızı</Link> ve <Link to="/cerez-politikasi" className="text-[#0b2e59] font-semibold underline">Çerez Politikamızı</Link> inceleyebilirsiniz.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center text-xs">6</span>
                  Uyuşmazlıkların Çözümü ve Yetkili Mahkeme
                </h2>
                <p>
                  İşbu kullanım koşullarından doğabilecek her türlü ihtilafın hallinde Türk Hukuku uygulanacak olup, <strong>İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri</strong> münhasıran yetkilidir.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center text-xs">7</span>
                  İletişim ve Hukuki Bildirimler
                </h2>
                <p>
                  Kullanım koşullarına ilişkin sorularınız, telif hakkı bildirimleri veya hukuki talepleriniz için lütfen <a href="mailto:ayaenerji@gmail.com" className="text-[#0b2e59] font-semibold underline">ayaenerji@gmail.com</a> e-posta adresi veya <strong>0530 069 53 93</strong> telefon numarası üzerinden şirket yetkililerimizle temasa geçiniz.
                </p>
              </div>

            </div>

            {/* Back Button */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Ana Sayfaya Dön
              </Link>
              <Link
                to="/editoryal-ilkeler"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b2e59] hover:underline"
              >
                Editoryal İlkeleri İncele →
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
