import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin, Building2, FileText, ArrowLeft, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function KunyePage() {
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
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#0b2e59]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Künye & Şirket Bilgileri
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  5651 Sayılı Kanun ve Elektronik Ticaretin Düzenlenmesi Mevzuatı Kapsamında Bilgilendirme
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" /> Şirket Ticari Ünvanı
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Aya Elektrik Mühendislik ve Enerji Sistemleri Tic. Ltd. Şti.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" /> Vergi & Sicil Bilgileri
                </div>
                <div className="text-sm font-medium text-slate-800">
                  Vergi Dairesi: <span className="font-semibold text-slate-900">Şişli V.D.</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Vergi Kimlik No: 0980543219 · Ticaret Sicil No: 348920
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> Şirket Genel Merkezi
                </div>
                <div className="text-sm font-medium text-slate-800">
                  Mecidiyeköy Mah. Büyükdere Cad. No: 124, Şişli / İstanbul
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Avrupa Yakası Teknik Operasyon Merkezi</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Çalışma & Hizmet Saatleri
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  7 Gün 24 Saat Kesintisiz Acil Müdahale
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Ofis Mesai Saatleri: Pazartesi - Cumartesi 08:30 - 18:30</div>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#ffb703]" /> İletişim ve Yetkili Bilgileri
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm pl-1">
                  <li><strong>Genel Müşteri ve Arıza Hattı:</strong> <a href="tel:+905300695393" className="text-[#0b2e59] font-semibold hover:underline">0530 069 53 93</a></li>
                  <li><strong>Kurumsal E-Posta:</strong> <a href="mailto:ayaenerji@gmail.com" className="text-[#0b2e59] font-medium hover:underline">ayaenerji@gmail.com</a></li>
                  <li><strong>Web Sitesi:</strong> <a href="https://ayaelektrik.com" className="text-[#0b2e59] font-medium hover:underline">https://ayaelektrik.com</a></li>
                  <li><strong>Sorumlu Elektrik Mühendisi:</strong> EMO Kayıtlı Elektrik-Elektronik Mühendisi & TSE Yetkili Fen Adamı</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> İçerik Sağlayıcı & Yer Sağlayıcı Bilgisi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  5651 Sayılı "İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun" kapsamında, bu internet sitesinin içerik sağlayıcısı <strong>Aya Elektrik Mühendislik ve Enerji Sistemleri</strong>'dir. Sitede yer alan teknik makaleler, rehberler ve fiyatlandırma tabloları bilgilendirme amaçlı hazırlanmıştır.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Google AdSense ve Reklam Yayıncılığı İlkeleri
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Web sitemiz Google AdSense yayıncı ilkelerine sıkı sıkıya bağlıdır. Sayfalarımızda sunulan reklam alanları, kullanıcı deneyimini bozmayacak biçimde yapılandırılmış olup yanıltıcı yönlendirme veya sahte tıklama teşvikleri kesinlikle yasaktır. Yayınlanan reklamlarla ilgili soru, görüş ve telif hakkı bildirimleriniz için <a href="mailto:ayaenerji@gmail.com" className="text-[#0b2e59] font-medium underline">ayaenerji@gmail.com</a> adresi üzerinden şirketimizle doğrudan iletişime geçebilirsiniz.
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
                Son Güncelleme: 16 Ekim 2026
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
