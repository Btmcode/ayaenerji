import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PwaInstallPrompt from "./components/PwaInstallPrompt";
import ScrollToHashElement from "./components/ScrollToHash";

// Lazy load pages for better performance
const AdminPage = lazy(() => import("./pages/AdminPage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const AcilElektrikArizaPage = lazy(() => import("./pages/AcilElektrikArizaPage"));
const ElektrikTesisatiPage = lazy(() => import("./pages/ElektrikTesisatiPage"));
const PanoYenilemePage = lazy(() => import("./pages/PanoYenilemePage"));
const SofbenMontajiPage = lazy(() => import("./pages/SofbenMontajiPage"));
const UpsKurulumuPage = lazy(() => import("./pages/UpsKurulumuPage"));
const KacakAkimRolesiPage = lazy(() => import("./pages/KacakAkimRolesiPage"));
const SigortaArizasiPage = lazy(() => import("./pages/SigortaArizasiPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const HizmetlerPage = lazy(() => import("./pages/HizmetlerPage"));
const GizlilikPolitikasiPage = lazy(() => import("./pages/GizlilikPolitikasiPage"));
const CerezPolitikasiPage = lazy(() => import("./pages/CerezPolitikasiPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const BesiktasElektrikciPage = lazy(() => import("./pages/BesiktasElektrikciPage"));
const SisliElektrikciPage = lazy(() => import("./pages/SisliElektrikciPage"));
const BakirkoyElektrikciPage = lazy(() => import("./pages/BakirkoyElektrikciPage"));
const KagithaneElektrikciPage = lazy(() => import("./pages/KagithaneElektrikciPage"));
const KucukcekmeceElektrikciPage = lazy(() => import("./pages/KucukcekmeceElektrikciPage"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#0b2e59]/20 border-t-[#ffb703] rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <>
      <ScrollToHashElement />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          
          {/* District Landing Pages */}
          <Route path="/hizmet-bolgeleri/besiktas" element={<BesiktasElektrikciPage />} />
          <Route path="/hizmet-bolgeleri/sisli" element={<SisliElektrikciPage />} />
          <Route path="/hizmet-bolgeleri/bakirkoy" element={<BakirkoyElektrikciPage />} />
          <Route path="/hizmet-bolgeleri/kagithane" element={<KagithaneElektrikciPage />} />
          <Route path="/hizmet-bolgeleri/kucukcekmece" element={<KucukcekmeceElektrikciPage />} />

          <Route path="/hizmetler/acil-elektrik-ariza" element={<AcilElektrikArizaPage />} />
          <Route path="/hizmetler/elektrik-tesisati" element={<ElektrikTesisatiPage />} />
          <Route path="/hizmetler/pano-yenileme" element={<PanoYenilemePage />} />
          <Route path="/hizmetler/sofben-montaji" element={<SofbenMontajiPage />} />
          <Route path="/hizmetler/ups-kurulumu" element={<UpsKurulumuPage />} />
          <Route path="/hizmetler/kacak-akim-rolesi" element={<KacakAkimRolesiPage />} />
          <Route path="/hizmetler/sigorta-arizasi" element={<SigortaArizasiPage />} />
          
          <Route path="/sss" element={<FAQPage />} />
          <Route path="/hizmetler" element={<HizmetlerPage />} />
          <Route path="/hizmetlerimiz" element={<Navigate to="/hizmetler" replace />} />
          <Route path="/bolgelerimiz" element={<HomePage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/ekibimize-katil" element={<CareersPage />} />
          <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasiPage />} />
          <Route path="/cerez-politikasi" element={<CerezPolitikasiPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <PwaInstallPrompt />
    </>
  );
}
