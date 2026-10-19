import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Check, X } from "lucide-react";

const CONSENT_STORAGE_KEY = "aya_cookie_consent_v1";

export default function CookieConsentModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Show after a subtle delay (1.5 seconds) to avoid immediate intrusive popup
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ advertising: true, analytics: true, essential: true, date: new Date().toISOString() }));
    } catch {}
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ advertising: false, analytics: false, essential: true, date: new Date().toISOString() }));
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Çerez İzin Bildirimi"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xl p-4 md:p-5 text-slate-800 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-[#ffb703] fill-[#ffb703]/20" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Çerez Politikası ve Gizlilik Tercihleriniz
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Web sitemizde deneyiminizi geliştirmek, site trafiğini analiz etmek ve Google AdSense üzerinden kişiselleştirilmiş içerik ve reklamlar sunmak için çerezler kullanmaktayız. Detaylı bilgi için{" "}
            <Link to="/cerez-politikasi" className="text-[#0b2e59] font-medium underline hover:text-amber-600">
              Çerez Politikamızı
            </Link>{" "}
            ve{" "}
            <Link to="/gizlilik-politikasi" className="text-[#0b2e59] font-medium underline hover:text-amber-600">
              Gizlilik Politikamızı
            </Link>{" "}
            inceleyebilirsiniz.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0b2e59] text-white rounded-lg text-xs font-semibold hover:bg-[#082242] transition-colors shadow-sm"
            >
              <Check className="w-3.5 h-3.5 text-[#ffb703]" />
              <span>Tümünü Kabul Et</span>
            </button>
            <button
              onClick={handleAcceptEssential}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
            >
              Sadece Zorunlular
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg ml-auto"
              aria-label="Bildirimi Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
