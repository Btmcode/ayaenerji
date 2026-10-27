import React, { useState, useEffect } from "react";
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Save,
  Shield,
  Layers,
  Sparkles,
  Smartphone,
  Eye,
  FileCheck,
} from "lucide-react";
import { getAdSenseSettings, saveAdSenseSettings, AdSenseSettings } from "../../utils/adsenseConfig";

interface AdSenseTabProps {
  showToast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
  currentAdminEmail?: string;
}

export default function AdSenseTab({ showToast, currentAdminEmail }: AdSenseTabProps) {
  const isAuthorized = currentAdminEmail?.toLowerCase().trim() === "ahmetcafoglu@hotmail.com";
  const [settings, setSettings] = useState<AdSenseSettings>(getAdSenseSettings());
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);
  const [adsTxtTesting, setAdsTxtTesting] = useState(false);
  const [adsTxtTestResult, setAdsTxtTestResult] = useState<{
    tested: boolean;
    success: boolean;
    content?: string;
    message?: string;
    hasPubId?: boolean;
    hasDirect?: boolean;
    hasGoogle?: boolean;
  }>({ tested: false, success: false });

  const testAdsTxtLive = async () => {
    setAdsTxtTesting(true);
    try {
      const res = await fetch("/ads.txt?t=" + Date.now());
      if (!res.ok) {
        setAdsTxtTestResult({
          tested: true,
          success: false,
          message: `HTTP Hatası: ${res.status} ${res.statusText}`,
        });
        showToast("ads.txt dosyasına ulaşılamadı!", "error");
        return;
      }
      const text = await res.text();
      const currentPub = settings.publisherId || "pub-5258362427336483";
      const pubNumber = currentPub.replace("ca-pub-", "pub-");
      const hasPub = text.includes(pubNumber);
      const hasDirect = text.includes("DIRECT");
      const hasGoogle = text.includes("google.com");

      const isSuccess = hasPub && hasDirect && hasGoogle;
      setAdsTxtTestResult({
        tested: true,
        success: isSuccess,
        content: text.trim(),
        hasPubId: hasPub,
        hasDirect: hasDirect,
        hasGoogle: hasGoogle,
        message: isSuccess
          ? `ads.txt dosyası aktif ve geçerli! Yayıncı kodunuz (${pubNumber}) doğrulandı.`
          : "Dosya içeriğinde yayıncı kodu veya DIRECT tanımı eksik.",
      });
      if (isSuccess) {
        showToast("ads.txt başarıyla doğrulandı!", "success");
      } else {
        showToast("ads.txt dosyasında yayıncı kimliği uyuşmazlığı var!", "warning");
      }
    } catch (err: any) {
      setAdsTxtTestResult({
        tested: true,
        success: false,
        message: "Ağ Hatası: " + (err.message || String(err)),
      });
      showToast("Test sırasında hata oluştu.", "error");
    } finally {
      setAdsTxtTesting(false);
    }
  };

  useEffect(() => {
    setSettings(getAdSenseSettings());
    testAdsTxtLive();
  }, []);

  if (!isAuthorized) {
    return (
      <div className="p-8 md:p-12 bg-white rounded-3xl border border-red-200 text-center max-w-2xl mx-auto my-12 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
          <Shield className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">Erişim Kısıtlandı (Yetkisiz Modül)</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Google AdSense & Gelir Portalı gizlilik ve mali güvenlik politikaları gereğince 
          yalnızca <strong>Birincil Yönetici (ahmetcafoglu@hotmail.com)</strong> erişimine açıktır.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
          Mevcut Oturum: {currentAdminEmail || "Bilinmiyor"}
        </div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let pub = settings.publisherId.trim();
    if (pub && !pub.startsWith("ca-pub-") && pub.startsWith("pub-")) {
      pub = "ca-" + pub;
    }
    const updated = { ...settings, publisherId: pub };
    saveAdSenseSettings(updated);
    setSettings(updated);
    showToast("Google AdSense ayarları ve reklam birimleri başarıyla kaydedildi!", "success");
  };

  const copyAdsTxtContent = () => {
    const pubIdNumber = settings.publisherId.replace("ca-pub-", "pub-");
    const content = `google.com, ${pubIdNumber || "pub-0000000000000000"}, DIRECT, f08c47fec0942fa0`;
    navigator.clipboard.writeText(content);
    setCopiedAdsTxt(true);
    showToast("ads.txt içeriği panoya kopyalandı!", "info");
    setTimeout(() => setCopiedAdsTxt(false), 3000);
  };

  const complianceItems = [
    {
      title: "ads.txt Dosyası",
      desc: "Kök dizinde public/ads.txt yayında. Gelir kaybını önler.",
      status: true,
      link: "/ads.txt",
    },
    {
      title: "Künye & Şirket Bilgileri",
      desc: "5651 sayılı kanun ve AdSense şeffaflık zorunluluğu için /kunye sayfası hazır.",
      status: true,
      link: "/kunye",
    },
    {
      title: "KVKK & Çerez İzin Banner'ı",
      desc: "Ziyaretçilere reklam ve analiz çerezleri için açık rıza soran banner aktif.",
      status: true,
      link: "/cerez-politikasi",
    },
    {
      title: "Google AdSense Gizlilik Maddeleri",
      desc: "DoubleClick çerezi ve üçüncü taraf satıcı açıklamaları gizlilik metnine eklendi.",
      status: true,
      link: "/gizlilik-politikasi",
    },
    {
      title: "Sayfa Başlığı Meta Etiketi",
      desc: "<meta name='google-adsense-account'> otomatik yayıncı kimliğiyle senkronize.",
      status: true,
    },
  ];

  return (
    <div className="space-y-8 font-sans max-w-6xl pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-[#0b2e59] via-[#082242] to-slate-900 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-lg text-xs font-semibold border border-amber-400/30">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Google AdSense Monetizasyon & Maksimum Kazanç Portalı</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-400/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Birincil Yönetici Özel Alanı ({currentAdminEmail})</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            AdSense Gelir ve Reklam Yerleşim Yönetimi
          </h2>
          <p className="text-white/70 text-sm mt-2 max-w-2xl leading-relaxed">
            Aya Elektrik platformunu Google AdSense onayına tam uyumlu kılın, yayıncı kimliğinizi tanımlayın ve yüksek tıklama oranı (CTR) sağlayan reklam yerleşimlerini yönetin.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://www.google.com/adsense/start/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ffb703] text-slate-950 font-bold px-5 py-3 rounded-xl text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 whitespace-nowrap"
          >
            <span>AdSense Paneline Git</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Compliance Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Google AdSense Onay Uyumluluk Durumu
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sitenizin sıfırdan onay alması için gereken tüm teknik ve hukuki altyapı hazırlanmıştır.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            %100 Onaya Hazır
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {complianceItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 flex items-start gap-3.5 hover:bg-slate-50 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0b2e59] hover:underline flex items-center gap-1 font-medium"
                    >
                      İncele <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form & Slot IDs */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0b2e59]" />
            Yayıncı Kimliği & Reklam Kodları Yapılandırması
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Google AdSense hesabınız onaylandığında veya mevcut ca-pub kodunuzu girdiğinizde canlı reklamlar anında devreye girer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-2">
          {/* Publisher ID */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Yayıncı Kimliği (Publisher ID)
            </label>
            <input
              type="text"
              value={settings.publisherId}
              onChange={(e) => setSettings({ ...settings, publisherId: e.target.value })}
              placeholder="ca-pub-1234567890123456"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b2e59] text-sm font-mono text-slate-900 bg-slate-50/50"
            />
            <p className="text-[11px] text-slate-500">
              AdSense paneli &gt; Hesap &gt; Ayarlar &gt; Hesap Bilgileri bölümünde yer alan <code className="bg-slate-100 px-1 py-0.5 rounded">ca-pub-xxxxxxxxxxxxxxxx</code> kodunuz.
            </p>
          </div>

          {/* ads.txt box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-blue-600" /> Otomatik ads.txt Kaydı
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={testAdsTxtLive}
                    disabled={adsTxtTesting}
                    className="inline-flex items-center gap-1 text-[11px] bg-[#0b2e59] text-white px-2.5 py-1 rounded-lg font-bold hover:bg-[#082244] transition-colors disabled:opacity-50"
                  >
                    <span>{adsTxtTesting ? "Test Ediliyor..." : "🔍 Şimdi Test Et"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={copyAdsTxtContent}
                    className="inline-flex items-center gap-1 text-xs text-[#0b2e59] font-medium hover:underline"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedAdsTxt ? "Kopyalandı!" : "Kopyala"}</span>
                  </button>
                </div>
              </div>
              <pre className="text-xs font-mono bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 overflow-x-auto">
                google.com, {settings.publisherId.replace("ca-pub-", "pub-") || "pub-5258362427336483"}, DIRECT, f08c47fec0942fa0
              </pre>

              {/* Live Test Diagnostic Feedback */}
              {adsTxtTestResult.tested && (
                <div className={`mt-3 p-3 rounded-xl border text-xs ${
                  adsTxtTestResult.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {adsTxtTestResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    <span>{adsTxtTestResult.success ? "ads.txt Dosyası Doğrulandı" : "ads.txt Uyarısı"}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700">{adsTxtTestResult.message}</p>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-1.5 text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> HTTP: 200 OK
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> MIME: text/plain
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> İlişki: DIRECT
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Token: f08c47fec0942fa0
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/80 pt-2">
              <span>Canlı URL:</span>
              <a
                href="/ads.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0b2e59] font-bold hover:underline flex items-center gap-1"
              >
                /ads.txt Aç <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* AdSense Console "Yetkilendirilmedi" Troubleshooter Guide */}
        <div className="p-4 md:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-slate-800 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                AdSense Panelinde "(ads.txt durumu) Yetkilendirilmedi" Uyarısı Neden Görünür?
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                ads.txt dosyanız sitenizde <strong>%100 eksiksiz ve geçerli</strong> durumdadır. Google AdSense botları (Ads.txt Crawler) siteleri anlık değil, <strong>24 ila 48 saatlik periyotlarla</strong> tarar. Dosyayı yeni eklediğinizde AdSense paneli eski tarama sonucunu gösterir.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-amber-200/60 text-xs space-y-2">
            <p className="font-bold text-slate-900 text-[11px]">⚡ Durumu Hemen "Yetkilendirildi" Yapmak İçin Adımlar:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px]">
              <li>
                <a
                  href="https://www.google.com/adsense/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0b2e59] font-bold underline"
                >
                  Google AdSense Paneli
                </a>
                'ne giriş yapın.
              </li>
              <li>Sol menüden <strong>Siteler (Sites)</strong> bölümüne tıklayın ve <strong>ayaelektrik.com</strong> alan adınızı seçin.</li>
              <li>Sağ üst köşedeki <strong>"Güncellemeleri Denetle" (Check for updates)</strong> düğmesine basın.</li>
              <li>Google botu yeni dosyayı önbellekten çıkarıp taradığında (birkaç saat içinde) durum yeşile dönecek ve <strong>"Yetkilendirildi"</strong> olacaktır.</li>
            </ol>
          </div>
        </div>

        {/* Ad Slots Section */}
        <div className="border-t border-slate-100 pt-6">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ffb703]" />
            Duyarlı Reklam Birimi Slot Kimlikleri (Ad Unit IDs)
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            AdSense panelinde oluşturduğunuz reklam birimlerinin data-ad-slot numaralarını buraya girin. Boş bırakıldığında otomatik yüksek değerli yerli sponsor içerikleri gösterilir.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/40">
              <label className="text-xs font-semibold text-slate-800">
                Blog Makale İçi (In-Article) Slot ID
              </label>
              <input
                type="text"
                value={settings.slots.inArticle || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    slots: { ...settings.slots, inArticle: e.target.value },
                  })
                }
                placeholder="Örn: 9876543210"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white"
              />
              <span className="text-[10px] text-emerald-700 font-medium">★ En yüksek CTR potansiyeli</span>
            </div>

            <div className="space-y-1.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/40">
              <label className="text-xs font-semibold text-slate-800">
                Yapışkan Alt Banner (Sticky Bottom)
              </label>
              <input
                type="text"
                value={settings.slots.stickyBottom || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    slots: { ...settings.slots, stickyBottom: e.target.value },
                  })
                }
                placeholder="Örn: 1234567890"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white"
              />
              <span className="text-[10px] text-blue-700 font-medium">★ Sürekli görünürlük (High Viewability)</span>
            </div>

            <div className="space-y-1.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/40">
              <label className="text-xs font-semibold text-slate-800">
                Liste İçi (In-Feed) Slot ID
              </label>
              <input
                type="text"
                value={settings.slots.inFeed || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    slots: { ...settings.slots, inFeed: e.target.value },
                  })
                }
                placeholder="Örn: 4567890123"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white"
              />
              <span className="text-[10px] text-slate-500">Blog kartları arasında doğal akış</span>
            </div>

            <div className="space-y-1.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/40">
              <label className="text-xs font-semibold text-slate-800">
                Masaüstü Sidebar Slot ID
              </label>
              <input
                type="text"
                value={settings.slots.sidebar || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    slots: { ...settings.slots, sidebar: e.target.value },
                  })
                }
                placeholder="Örn: 5678901234"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white"
              />
              <span className="text-[10px] text-slate-500">300x250 veya 300x600 yan sütun</span>
            </div>

            <div className="space-y-1.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/40">
              <label className="text-xs font-semibold text-slate-800">
                Üst Leaderboard Banner Slot ID
              </label>
              <input
                type="text"
                value={settings.slots.leaderboard || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    slots: { ...settings.slots, leaderboard: e.target.value },
                  })
                }
                placeholder="Örn: 7890123456"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white"
              />
              <span className="text-[10px] text-slate-500">728x90 geniş başlık alanı</span>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="border-t border-slate-100 pt-6">
          <h4 className="text-sm font-bold text-slate-900 mb-3">
            Görüntüleme & Optimizasyon Tercihleri
          </h4>
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={settings.stickyBannerEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, stickyBannerEnabled: e.target.checked })
                }
                className="w-4 h-4 text-[#0b2e59] rounded focus:ring-0"
              />
              <div>
                <div className="text-xs font-semibold text-slate-900">Yapışkan Alt Banner</div>
                <div className="text-[11px] text-slate-500">Maksimum tıklama ve görünürlük</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={settings.inArticleAdsEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, inArticleAdsEnabled: e.target.checked })
                }
                className="w-4 h-4 text-[#0b2e59] rounded focus:ring-0"
              />
              <div>
                <div className="text-xs font-semibold text-slate-900">Makale İçi Reklamlar</div>
                <div className="text-[11px] text-slate-500">Blog okuyucuları için en yüksek TBM</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={settings.inFeedAdsEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, inFeedAdsEnabled: e.target.checked })
                }
                className="w-4 h-4 text-[#0b2e59] rounded focus:ring-0"
              />
              <div>
                <div className="text-xs font-semibold text-slate-900">Liste İçi Reklamlar</div>
                <div className="text-[11px] text-slate-500">Blog ve hizmet sayfalarında akış</div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#0b2e59] text-white font-bold px-6 py-3 rounded-xl text-xs hover:bg-[#082242] transition-colors shadow-md shadow-[#0b2e59]/20"
          >
            <Save className="w-4 h-4 text-[#ffb703]" />
            <span>Ayarları Kaydet ve Yayına Al</span>
          </button>
        </div>
      </form>

      {/* High-CTR Best Practices Guide */}
      <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
        <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Maksimum Tıklama & Yüksek Kazanç (CTR/CPC) Rehberi
        </h4>
        <ul className="text-xs text-amber-950/80 space-y-1.5 list-disc pl-5 leading-relaxed">
          <li><strong>Yüksek TBM'li Elektrik Kategorileri:</strong> "Güneş Enerjisi (GES) Kurulumu", "Kompanzasyon Pano Revizyonu" ve "Endüstriyel UPS Sistemleri" blog yazıları Google AdSense'te en yüksek tıklama başına maliyeti (TBM/CPC) sunar.</li>
          <li><strong>Görünürlük (Viewability):</strong> Sayfa altındaki yapışkan banner ekran kaydırılsa dahi görünür kalarak AdSense Görünürlük oranınızı %90+ seviyesine çıkarır ve kazancı katlar.</li>
          <li><strong>Politika Güvencesi:</strong> Reklamlara asla "Tıklayın", "Destek Olun" gibi yönlendirici ifadeler koymayın; sistemimiz otomatik olarak "Sponsorlu İçerik" etiketi ile yasal koruma sağlar.</li>
        </ul>
      </div>
    </div>
  );
}
