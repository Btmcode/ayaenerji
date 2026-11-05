import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin, Building2, ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCollection } from "../utils/firebaseHooks";

export default function KunyePage() {
  const { data: rawSettings } = useCollection("settings");
  const generalSettingDoc = rawSettings?.find((s: any) => s.id === "general");

  const companyName = generalSettingDoc?.companyName || "Aya Elektrik - 7/24 Nöbetçi Elektrik & Arıza Bakım Onarım Servisi";
  const phone = generalSettingDoc?.phone || "0530 069 53 93";
  const email = generalSettingDoc?.email || "ayaenerji@gmail.com";
  const address = generalSettingDoc?.address || "Maltepe Mah. Yedikule Çırpıcı Yolu No: 33, Zeytinburnu / İstanbul";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-900 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Künye ve Şirket Bilgileri</span>
          </nav>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0b2e59] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Künye &amp; Şirket Bilgileri
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  5651 Sayılı Kanun ve Elektronik Ticaretin Düzenlenmesi Mevzuatı Kapsamında Yasal Bilgilendirme
                </p>
              </div>
            </div>

            {/* Core Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" /> Şirket Ticari Ünvanı
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {companyName}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Elektrik Tesisatı, Arıza Bakım, Onarım ve Enerji Altyapı Servisi
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> Şirket Merkezi / Operasyon Adresi
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {address}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  İstanbul Geneli 39 İlçede Mobil Saha Ekipleriyle Hizmet
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" /> İletişim &amp; Acil Çağrı
                </div>
                <div className="text-sm font-semibold text-[#0b2e59]">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:underline">
                    {phone}
                  </a>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Kurumsal E-Posta: <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Hizmet &amp; Çalışma Saatleri
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  7 Gün 24 Saat Kesintisiz Nöbetçi Usta Servisi
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Tüm İstanbul Avrupa ve Anadolu Yakası 30-45 Dakikada Adreste Müdahale
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Teknik Hizmet &amp; Operasyon Standartları
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm pl-1">
                  <li><strong>Hizmet Kapsamı:</strong> Konut, iş yeri, bina ve sanayi tipi elektrik arızası, sigorta &amp; kaçak akım rölesi montajı, pano revizyonu, elektrik tesisat yenileme, şofben montajı, zayıf akım sistemleri.</li>
                  <li><strong>Malzeme Standardı:</strong> Tüm servis operasyonlarında TSE ve CE onaylı, standartlara uygun orijinal komponentler (Siemens, Schneider Electric, Hes Kablo vb.) kullanılmaktadır.</li>
                  <li><strong>Hizmet Garantisi:</strong> Yapılan işçilik ve montajı gerçekleştirilen orijinal yedek parçalar için servis garantisi verilmektedir.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0b2e59]" /> 5651 Sayılı Kanun Kapsamında İçerik &amp; Yer Sağlayıcı Bildirimi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  5651 Sayılı <em>"İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun"</em> uyarınca bu web sitesinin içerik sağlayıcısı <strong>Aya Elektrik</strong>'tir. Sitemizde yer alan teknik arıza kılavuzları, blog içerikleri ve mühendislik hesaplama araçları bilgilendirme amaçlıdır.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                  <Link to="/editoryal-ilkeler" className="text-[#0b2e59] font-bold hover:underline">
                    Editoryal İlkeler ve Doğrulama Politikası →
                  </Link>
                  <span>·</span>
                  <Link to="/kullanim-kosullari" className="text-[#0b2e59] font-bold hover:underline">
                    Kullanım Koşulları ve Sorumluluk Reddi →
                  </Link>
                  <span>·</span>
                  <Link to="/iletisim" className="text-[#0b2e59] font-bold hover:underline">
                    İletişim &amp; Adres Bilgileri →
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Telif Hakları &amp; İletişim Bildirimi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Web sitemizde yer alan metinler, görseller ve hesaplama modülleri Aya Elektrik'e aittir. Her türlü soru, görüş, resmi tebligat ve önerileriniz için kurumsal e-posta adresimiz olan <a href={`mailto:${email}`} className="text-[#0b2e59] font-medium underline">{email}</a> veya <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-[#0b2e59] font-medium underline">{phone}</a> no'lu telefon hattımız üzerinden 7/24 irtibata geçebilirsiniz.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Ana Sayfaya Dön
              </Link>
              <div className="text-[11px] text-slate-400">
                Aya Elektrik Resmi Yayın Portalı
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
