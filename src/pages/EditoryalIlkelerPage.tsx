import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Award,
  AlertTriangle,
  FileCheck,
  Users,
  RefreshCw,
  Mail,
  ArrowLeft
} from "lucide-react";
import { technicalAuthors } from "../data/authors";

export default function EditoryalIlkelerPage() {
  const authorList = Object.values(technicalAuthors);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Helmet>
        <title>Editoryal İlkeler ve Doğrulama Politikası | Aya Elektrik</title>
        <meta
          name="description"
          content="Aya Elektrik teknik rehberlik ve doğrulama politikası, yetkili elektrik ustalarımızın saha tecrübesi, can güvenliği standartları ve E-E-A-T ilkeleri."
        />
        <link rel="canonical" href="https://ayaelektrik.com/editoryal-ilkeler" />
      </Helmet>

      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-900 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Editoryal İlkeler</span>
          </nav>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-10">
            
            {/* Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-[#0b2e59] text-[#ffb703] flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Editoryal İlkeler ve Teknik Doğrulama Politikası
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Google E-E-A-T (Uzmanlık, Saha Deneyimi, Güvenilirlik) ve TSE Standartları Beyanı
                </p>
              </div>
            </div>

            {/* Intro statement */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p>
                <strong>Aya Elektrik</strong> olarak amacımız; ev sahiplerine, bina ve site yöneticilerine elektrik arıza, bakım, onarım ve altyapı standartları konularında <strong>doğru, güvenilir ve hayat kurtaran</strong> pratik elektrik rehberleri sunmaktır.
              </p>
              <p>
                Elektrik akımı ve yüksek gerilim, ehliyetsiz müdahalelerde doğrudan <strong>can kaybı ve yangın riski</strong> barındırır. Bu sebeple sitemizde yer alan tüm içerikler, mesleki yeterlilik belgeli elektrik ustalarımızın yıllara dayanan saha tecrübesiyle kaleme alınır.
              </p>
            </div>

            {/* 4-Step Verification Workflow */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#ffb703]" />
                4 Aşamalı Teknik Doğrulama ve Yayın Protokolümüz
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">Yönetmelik ve Standart Taraması</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    İçerik konusu; TSE (Türk Standartları Enstitüsü), TMMOB Elektrik Mühendisleri Odası, IEC (Uluslararası Elektroteknik Komisyonu) ve Elektrik İç Tesisleri Yönetmeliği'nin en güncel maddeleriyle eşleştirilir.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">Saha Pratiği ve Ölçüm Doğrulaması</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Yalnızca teorik bilgi değil; İstanbul'un 39 ilçesinde 15 yılı aşkın süredir gerçekleştirilen trafo, pano, kaçak akım ve kablo montajı sahalarındaki somut arıza kayıtları ve termal ölçümler referans alınır.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">Deneyimli Elektrik Ustası Onayı</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hazırlanan taslak metinler, 15+ yıllık saha tecrübesine sahip ustalarımızca incelenir. İletken kesitleri, sigorta amper değerleri ve güvenlik kuralları kontrol edilir.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b2e59] text-white flex items-center justify-center font-bold text-xs">
                      4
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">Düzenli Revizyon ve Mevzuat Takibi</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    EPDK elektrik tarifeleri, yangın yönetmelikleri ve yeni nesil EV şarj protokolleri değiştikçe eski yazılar güncellenir ve makale başındaki "Son Teknik Doğrulama Tarihi" yenilenir.
                  </p>
                </div>

              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Vazgeçilmez Yayıncılık İlkelerimiz
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#0b2e59]">
                  <h4 className="font-bold text-slate-900 mb-1">1. Can ve Yangın Güvenliği Önceliği</h4>
                  <p>
                    Hiçbir reklam geliri veya ticari kazanç insan hayatından üstün olamaz. Kullanıcıyı can güvenliğini riske atacak amatörce müdahalelere yönlendirebilecek içeriklere asla yer verilmez; gerekli noktalarda belirgin güvenlik uyarıları yerleştirilir.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-amber-500">
                  <h4 className="font-bold text-slate-900 mb-1">2. Reklam ve Editoryal İçerik Ayrımı (AdSense Uyumu)</h4>
                  <p>
                    Sitemizde Google AdSense veya üçüncü taraf sponsorlu reklamlar net bir şekilde ayırt edilir ("Sponsorlu İçerik" / "Reklam"). Editoryal ve teknik kararlar, reklamverenlerin çıkarlarına göre değiştirilemez; teknik tavsiyelerde sadece standartlara uygunluk ve kalite kriteri gözetilir.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-500">
                  <h4 className="font-bold text-slate-900 mb-1">3. Şeffaf Yazar ve Usta Bilgileri</h4>
                  <p>
                    Her teknik içeriğin altında içeriği hazırlayan ve doğrulayan yetkili elektrik ustalarımızın tecrübesi ve uzmanlık alanı açıkça belirtilir.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-blue-500">
                  <h4 className="font-bold text-slate-900 mb-1">4. Düzeltme ve Geri Bildirim Açıklığı</h4>
                  <p>
                    Okuyucularımız, akademisyenler veya meslektaşlarımız sitemizdeki bir formül veya veride hata tespit ettiğinde <a href="mailto:ayaenerji@gmail.com" className="text-[#0b2e59] font-bold underline">ayaenerji@gmail.com</a> adresinden bildirebilir. Teknik heyetimiz 24 saat içinde inceleme yaparak gerekli düzeltmeyi yayına alır.
                  </p>
                </div>
              </div>
            </div>

            {/* Author & Engineer Panel */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Editoryal Heyet & Teknik Denetçi Kadromuz
              </h2>
              <p className="text-xs text-slate-500">
                Sitemizdeki teknik makaleleri ve hesaplama algoritmalarını oluşturan ve onaylayan tescilli uzman kadromuz:
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {authorList.map((author) => (
                  <div
                    key={author.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-full bg-[#0b2e59] text-[#ffb703] font-black text-sm flex items-center justify-center mb-3">
                        {author.avatarText}
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900">{author.name}</h3>
                      <div className="text-[11px] font-semibold text-[#0b2e59] mt-0.5">{author.title}</div>
                      <div className="text-[10px] text-amber-700 font-mono mt-1">{author.credentials}</div>
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        {author.bio}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Uzmanlık Alanları:</div>
                      <div className="flex flex-wrap gap-1">
                        {author.specialties.slice(0, 2).map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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
                to="/hesaplama-araclari"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b2e59] hover:underline"
              >
                Hesaplama Araçlarını İncele →
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
