export interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export const CONSENT_STORAGE_KEY = "aya_cookie_consent_v2";
export const CURRENT_CONSENT_VERSION = "2.0";

/**
 * Mevcut çerez izin durumunu döndürür.
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.version === CURRENT_CONSENT_VERSION) {
      return parsed as CookieConsent;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Kullanıcının tercihlerini yasal zaman damgasıyla kaydeder ve tüm bileşenlere bildirir.
 */
export function saveCookieConsent(
  preferences: {
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
  }
): CookieConsent {
  const fullConsent: CookieConsent = {
    necessary: true, // Zorunlu çerezler her zaman aktiftir
    functional: preferences.functional,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    timestamp: new Date().toISOString(),
    version: CURRENT_CONSENT_VERSION,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(fullConsent));
      // Kurumsal standart: Diğer sekmelere ve dinleyicilere anında haber ver
      window.dispatchEvent(
        new CustomEvent("aya-cookie-consent-change", { detail: fullConsent })
      );
    } catch (e) {
      console.warn("Çerez izni kaydedilemedi:", e);
    }
  }

  return fullConsent;
}

/**
 * Tüm çerezleri kabul et
 */
export function acceptAllCookies(): CookieConsent {
  return saveCookieConsent({
    functional: true,
    analytics: true,
    marketing: true,
  });
}

/**
 * Sadece zorunlu çerezleri kabul et (Tüm opsiyonel çerezleri reddet)
 */
export function rejectOptionalCookies(): CookieConsent {
  return saveCookieConsent({
    functional: false,
    analytics: false,
    marketing: false,
  });
}

/**
 * Kullanıcı daha önce bir seçim yapmış mı?
 */
export function hasUserGivenConsent(): boolean {
  return getCookieConsent() !== null;
}

/**
 * Pazarlama/Reklam çerezine izin verilmiş mi?
 */
export function isMarketingAllowed(): boolean {
  const consent = getCookieConsent();
  return consent ? Boolean(consent.marketing) : false;
}

/**
 * Analitik çerezine izin verilmiş mi?
 */
export function isAnalyticsAllowed(): boolean {
  const consent = getCookieConsent();
  return consent ? Boolean(consent.analytics) : false;
}
