import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Check, 
  X, 
  Lock, 
  SlidersHorizontal, 
  ExternalLink,
  Cookie,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  getCookieConsent,
  acceptAllCookies,
  rejectOptionalCookies,
  saveCookieConsent,
  hasUserGivenConsent
} from "../utils/cookieConsent";

export default function CookieConsentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Granular preference state
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Kurumsal davranış: Kullanıcı daha önce seçim yaptıysa modalı açma
    if (!hasUserGivenConsent()) {
      // Sayfa ilk yüklendiğinde kullanıcıyı engellemeden 1.5 sn sonra alttan zarifçe görünür
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      const current = getCookieConsent();
      if (current) {
        setFunctional(current.functional);
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
    }
  }, []);

  // Global event listener to allow re-opening from Footer or any "Çerez Ayarları" button
  useEffect(() => {
    const handleOpenSettings = () => {
      const current = getCookieConsent();
      if (current) {
        setFunctional(current.functional);
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setShowPreferences(true);
      setIsVisible(true);
    };

    window.addEventListener("aya-open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("aya-open-cookie-settings", handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleRejectAll = () => {
    rejectOptionalCookies();
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSaveCustom = () => {
    saveCookieConsent({
      functional,
      analytics,
      marketing,
    });
    setIsVisible(false);
    setShowPreferences(false);
  };

  // Close with default necessary-only rejection
  const handleDismiss = () => {
    rejectOptionalCookies();
    setIsVisible(false);
    setShowPreferences(false);
  };

  // If user has already made a choice and panel is not actively opened:
  // Render an unobtrusive bottom-left floating badge (Apple/Stripe corporate pattern)
  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => {
          const current = getCookieConsent();
          if (current) {
            setFunctional(current.functional);
            setAnalytics(current.analytics);
            setMarketing(current.marketing);
          }
          setShowPreferences(true);
          setIsVisible(true);
        }}
        className="fixed bottom-20 md:bottom-6 left-4 z-40 bg-white/95 hover:bg-white text-slate-700 hover:text-[#0b2e59] p-2.5 rounded-full shadow-lg border border-slate-200/90 transition-all active:scale-95 group flex items-center gap-2 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-[#0b2e59]"
        title="KVKK & Çerez Tercihlerini Yönet"
        aria-label="Çerez ve KVKK Tercihlerini Yönet"
      >
        <Cookie className="w-4 h-4 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline text-xs font-semibold text-slate-700 pr-1">
          Çerez Ayarları
        </span>
      </button>
    );
  }

  return (
    /* Modern non-blocking bottom floating dock: NEVER dims or blocks the full viewport */
    <div 
      className="fixed bottom-20 md:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl md:max-w-2xl z-50 pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-300"
      role="region"
      aria-label="KVKK Çerez Aydınlatma ve Tercih Bildirimi"
    >
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col text-slate-800 ring-1 ring-black/5">
        
        {/* Subtle Brand Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0b2e59] via-[#1a4a84] to-[#ffb703]" />

        {/* Header Bar */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm text-slate-900 truncate">
                KVKK &amp; Çerez Aydınlatma Bildirimi
              </h2>
              <p className="text-[11px] text-slate-500 truncate">
                Aya Elektrik Mühendislik ve Enerji Sistemleri
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Kapat ve Zorunlularla Devam Et"
            title="Kapat (Sadece Zorunlu Çerezler)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-5 py-2.5 text-xs text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto">
          {!showPreferences ? (
            /* Concise Non-Blocking Tier 1 Notice */
            <div className="space-y-2.5">
              <p className="text-slate-600">
                Sitemizin güvenliği ve temel işlevleri için zorunlu çerezler kullanılmaktadır. İsteğe bağlı çerezler (analitik, kişiselleştirme ve Google AdSense pazarlama) ise <strong>6698 sayılı KVKK Madde 5 ve Madde 11</strong> uyarınca yalnızca açık rızanızla işlenir.
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium pt-0.5">
                <Link 
                  to="/cerez-politikasi" 
                  className="text-[#0b2e59] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Çerez Politikası</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <Link 
                  to="/gizlilik-politikasi" 
                  className="text-[#0b2e59] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>KVKK Haklarınız &amp; Aydınlatma</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* Granular Tier 2 Preferences (Inline Expansion) */
            <div className="space-y-2.5 py-1">
              <p className="text-slate-700 text-[11px] font-semibold">
                Çerez kategorilerini dilediğiniz gibi açıp kapatabilirsiniz:
              </p>

              {/* 1. Zorunlu Çerezler */}
              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">
                      Teknik &amp; Güvenlik Çerezleri
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.2 rounded">
                      Zorunlu / Kilitli
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Oturum güvenliği, form CSRF koruması ve çerez tercihlerinizin hatırlanması için zorunludur. Kapatılamaz (KVKK m.5/2-f).
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* 2. İşlevsel Çerezler */}
              <div className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 flex items-start justify-between gap-3 transition-colors">
                <div className="space-y-0.5 pr-2">
                  <span className="font-bold text-slate-900 text-xs block">
                    İşlevsellik Çerezleri
                  </span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    İlçe arama tercihleri ve form doldurma konforunu hatırlamak amacıyla kullanılır.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-1">
                  <input
                    type="checkbox"
                    checked={functional}
                    onChange={(e) => setFunctional(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-3.5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#0b2e59]"></div>
                </label>
              </div>

              {/* 3. Performans ve Analitik */}
              <div className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 flex items-start justify-between gap-3 transition-colors">
                <div className="space-y-0.5 pr-2">
                  <span className="font-bold text-slate-900 text-xs block">
                    Performans ve Analitik Çerezler
                  </span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Sayfa ziyaret sıklığı ve yüklenme hızını anonim olarak ölçerek site deneyimini iyileştirmemizi sağlar.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-1">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-3.5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#0b2e59]"></div>
                </label>
              </div>

              {/* 4. Pazarlama ve Google AdSense */}
              <div className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 flex items-start justify-between gap-3 transition-colors">
                <div className="space-y-0.5 pr-2">
                  <span className="font-bold text-slate-900 text-xs block">
                    Pazarlama &amp; Reklam Çerezleri (Google AdSense)
                  </span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Onayınız dahilinde ilgi alanlarınıza uygun kişiselleştirilmiş reklamların gösterimini sağlar. Kapalıyken reklam takip kodları engellenir.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-1">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-3.5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#0b2e59]"></div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50/90 border-t border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {!showPreferences ? (
            <>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="order-3 sm:order-1 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>Tercihleri Özelleştir</span>
              </button>

              <div className="order-1 sm:order-2 flex flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors shadow-xs active:scale-95"
                >
                  Tümünü Reddet
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial px-4 py-2 text-xs font-black text-slate-950 bg-[#ffb703] hover:bg-[#e0a000] active:scale-95 rounded-xl transition-all shadow-sm shadow-amber-500/20 inline-flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Tümünü Kabul Et</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 text-left"
              >
                ← Geri
              </button>
              <div className="flex flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="flex-1 sm:flex-initial px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors"
                >
                  Sadece Zorunlular
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-initial px-4 py-2 text-xs font-black text-white bg-[#0b2e59] hover:bg-[#082242] rounded-xl transition-colors shadow-xs inline-flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-[#ffb703]" />
                  <span>Tercihlerimi Kaydet</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
