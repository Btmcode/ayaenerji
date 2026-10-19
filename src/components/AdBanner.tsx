import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, ShieldCheck, Zap, X } from "lucide-react";
import { getAdSenseSettings } from "../utils/adsenseConfig";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export type AdVariant = "leaderboard" | "in-article" | "in-feed" | "sticky-bottom" | "sidebar";

interface AdBannerProps {
  variant: AdVariant;
  slotId?: string;
  className?: string;
  label?: string;
}

export default function AdBanner({ variant, slotId, className = "", label = "Reklamlar" }: AdBannerProps) {
  const [settings, setSettings] = useState(getAdSenseSettings);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const handleUpdate = () => setSettings(getAdSenseSettings());
    window.addEventListener("adsense-settings-updated", handleUpdate);
    return () => window.removeEventListener("adsense-settings-updated", handleUpdate);
  }, []);

  const isRealPublisher = settings.publisherId && !settings.publisherId.includes("0000000000000000");

  const effectiveSlot =
    slotId ||
    (variant === "leaderboard" && settings.slots.leaderboard) ||
    (variant === "in-article" && settings.slots.inArticle) ||
    (variant === "in-feed" && settings.slots.inFeed) ||
    (variant === "sticky-bottom" && settings.slots.stickyBottom) ||
    (variant === "sidebar" && settings.slots.sidebar) ||
    undefined;

  useEffect(() => {
    if (!isRealPublisher || !effectiveSlot || isDismissed) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch {
      setAdError(true);
    }
  }, [isRealPublisher, effectiveSlot, isDismissed]);

  // Check if disabled by settings
  if (variant === "sticky-bottom" && !settings.stickyBannerEnabled) return null;
  if (variant === "in-article" && !settings.inArticleAdsEnabled) return null;
  if (variant === "in-feed" && !settings.inFeedAdsEnabled) return null;
  if (variant === "sidebar" && !settings.sidebarAdsEnabled) return null;
  if (isDismissed) return null;

  // Render AdSense live tag if real publisher ID & slot are present
  if (isRealPublisher && effectiveSlot && !adError) {
    if (variant === "sticky-bottom") {
      return (
        <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-4 py-2 transition-transform duration-300">
          <div className="max-w-4xl mx-auto relative flex flex-col items-center justify-center min-h-[50px] md:min-h-[90px]">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute -top-3 right-0 bg-slate-800 text-white p-1 rounded-full text-xs hover:bg-slate-700 transition-colors shadow-sm"
              title="Reklamı Kapat"
              aria-label="Reklamı Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{label}</span>
            <ins
              ref={adRef}
              className="adsbygoogle w-full"
              style={{ display: "inline-block", minHeight: "50px" }}
              data-ad-client={settings.publisherId}
              data-ad-slot={effectiveSlot}
              data-ad-format="horizontal"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`overflow-hidden text-center my-6 ${className}`}>
        <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">{label}</span>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={settings.publisherId}
          data-ad-slot={effectiveSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Fallback / High-Value Native Sponsored Units (Zero Layout Shift)
  if (variant === "sticky-bottom") {
    // Mobil cihazlarda MobileCallBar ("30 Dk. İçinde Kapınızda") halihazırda sabit olarak çalıştığından,
    // fallback çakışmasını ve ekran tıkanıklığını önlemek için sadece masaüstünde (md:block) gösterilir.
    return (
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-2xl px-3 py-2">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              Sponsorlu
            </span>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Zap className="w-3.5 h-3.5 text-[#ffb703] fill-[#ffb703]" />
              <span>İstanbul Avrupa Yakası 7/24 TSE Belgeli Acil Elektrikçi</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+905300695393"
              className="inline-flex items-center gap-1.5 bg-[#0b2e59] text-white font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-[#082242] transition-colors shadow-sm whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#ffb703]" />
              <span>0530 069 53 93</span>
            </a>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-slate-600 p-1"
              title="Kapat"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "in-article") {
    return (
      <div className={`my-8 p-5 bg-gradient-to-r from-slate-50 via-amber-50/40 to-slate-50 rounded-2xl border border-amber-200/60 shadow-sm relative overflow-hidden ${className}`}>
        <div className="flex items-center justify-between mb-3 text-[11px] text-slate-400 uppercase tracking-wider">
          <span className="font-semibold text-amber-700 flex items-center gap-1">
            <Zap className="w-3 h-3 fill-amber-500 text-amber-500" /> Öne Çıkan Elektrik Çözümü
          </span>
          <span className="text-slate-500 font-medium">TSE &amp; ISO 9001 Standartlarında</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Evinizde veya İş Yerinizde Güvenli Elektrik Altyapısı
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Siemens ve Schneider marka kaçak akım koruma röleleri, otomatik sigortalar ve yangın koruma donanımları ile 10 yıl garantili montaj.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 justify-end">
            <a
              href="tel:+905300695393"
              className="inline-flex items-center justify-center gap-2 bg-[#ffb703] text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-[#f0ab00] transition-colors shadow-sm whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hemen Keşif İste</span>
            </a>
            <Link
              to="/hizmetler/kacak-akim-rolesi"
              className="inline-flex items-center justify-center text-xs font-semibold text-[#0b2e59] hover:underline whitespace-nowrap text-center py-1"
            >
              Teknik İncele →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "in-feed") {
    return (
      <div className={`p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between ${className}`}>
        <div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            <span className="text-amber-400 font-semibold">Tavsiye Edilen Hizmet</span>
            <span className="text-slate-400">7/24 Acil Müdahale</span>
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            30 Dakikada Mobil Elektrik Müdahale Ekibi
          </h4>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Şişli, Beşiktaş, Bakırköy, Kağıthane ve tüm Avrupa Yakası ilçelerinde acil arıza tespit aracı kapınızda.
          </p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>TSE Belgeli & Garantili</span>
          </div>
          <a
            href="tel:+905300695393"
            className="inline-flex items-center gap-1.5 bg-[#ffb703] text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg hover:bg-amber-400 transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>0530 069 53 93</span>
          </a>
        </div>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className={`p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm ${className}`}>
        <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-2 text-center">
          Öne Çıkan Mühendislik Çözümü
        </span>
        <div className="p-4 bg-gradient-to-br from-slate-50 to-amber-50/50 rounded-xl border border-slate-100 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#0b2e59] text-[#ffb703] flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-slate-900 mb-1">
            Güneş Enerjisi (GES) & Pano Mühendisliği
          </h5>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Çatı tipi solar kurulum, kompanzasyon pano revizyonu ve periyodik ölçüm raporları.
          </p>
          <a
            href="https://wa.me/905300695393?text=Merhaba,%20teknik%20muhendislik%20hakkinda%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full bg-[#0b2e59] text-white font-medium py-2 rounded-lg text-xs hover:bg-[#082242] transition-colors shadow-sm"
          >
            <span>WhatsApp ile Fiyat Al</span>
          </a>
        </div>
      </div>
    );
  }

  // leaderboard default fallback
  return (
    <div className={`my-4 p-3 bg-slate-100/70 rounded-xl border border-slate-200 text-center ${className}`}>
      <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
        Aya Elektrik Kurumsal Çözümler
      </span>
      <div className="flex items-center justify-center gap-3 text-xs text-slate-700 font-medium py-1">
        <span>Aya Elektrik Resmi Mühendislik Portalı</span>
        <span>·</span>
        <span className="text-amber-600 font-semibold">TSE & ISO 9001 Standartlarında Hizmet</span>
      </div>
    </div>
  );
}
