export interface AdSenseSettings {
  publisherId: string; // e.g. "ca-pub-1234567890123456"
  autoAdsEnabled: boolean;
  stickyBannerEnabled: boolean;
  inArticleAdsEnabled: boolean;
  inFeedAdsEnabled: boolean;
  sidebarAdsEnabled: boolean;
  slots: {
    leaderboard?: string;
    inArticle?: string;
    inFeed?: string;
    stickyBottom?: string;
    sidebar?: string;
  };
}

const DEFAULT_SETTINGS: AdSenseSettings = {
  publisherId: "ca-pub-5258362427336483",
  autoAdsEnabled: true,
  stickyBannerEnabled: true,
  inArticleAdsEnabled: true,
  inFeedAdsEnabled: true,
  sidebarAdsEnabled: true,
  slots: {
    leaderboard: "",
    inArticle: "",
    inFeed: "",
    stickyBottom: "",
    sidebar: ""
  }
};

const STORAGE_KEY = "aya_adsense_settings_v1";

export function getAdSenseSettings(): AdSenseSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    const pubId = (!parsed.publisherId || parsed.publisherId.includes("0000000000000000")) ? DEFAULT_SETTINGS.publisherId : parsed.publisherId;
    return { ...DEFAULT_SETTINGS, ...parsed, publisherId: pubId, slots: { ...DEFAULT_SETTINGS.slots, ...(parsed.slots || {}) } };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAdSenseSettings(settings: AdSenseSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    if (settings.publisherId) {
      localStorage.setItem("aya_adsense_pub_id", settings.publisherId);
      const meta = document.getElementById("adsense-account-meta");
      if (meta) meta.setAttribute("content", settings.publisherId);
    }
    window.dispatchEvent(new Event("adsense-settings-updated"));
  } catch (err) {
    console.error("AdSense ayarları kaydedilemedi:", err);
  }
}
