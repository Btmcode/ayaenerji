import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
  Bell,
  Users,
  ShieldCheck,
  PhoneCall,
  MapPin,
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
  Sliders,
  Plus,
  Trash2,
  Wand2,
  MessageCircle,
  Copy,
  Check,
  ArrowRight,
  Info
} from "lucide-react";

interface Technician {
  name: string;
  phone: string;
}

interface DetectedChat {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
  lastMessage?: string;
  date?: string;
}

interface TelegramConfigState {
  botToken: string;
  chatId: string;
  notifyNewRequests: boolean;
  notifyAnalytics: boolean;
  notifyDailyReport: boolean;
  notifySatisfaction: boolean;
  technicians: Technician[];
  hasToken?: boolean;
  isConfigured?: boolean;
}

export default function TelegramTab() {
  const [config, setConfig] = useState<TelegramConfigState>({
    botToken: "",
    chatId: "",
    notifyNewRequests: true,
    notifyAnalytics: true,
    notifyDailyReport: true,
    notifySatisfaction: true,
    technicians: [
      { name: "Ahmet Usta (Baş Teknisyen)", phone: "05300695393" },
      { name: "Nöbetçi Gece Ustası", phone: "05386949469" }
    ],
    isConfigured: false
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"settings" | "technicians" | "preview" | "guide">("settings");
  
  // Auto-detect Chat ID state
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedChats, setDetectedChats] = useState<DetectedChat[]>([]);
  const [detectFeedback, setDetectFeedback] = useState<{ type: "idle" | "success" | "error" | "empty"; message: string }>({
    type: "idle",
    message: ""
  });

  const [copiedCmd, setCopiedCmd] = useState(false);

  const [testResult, setTestResult] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const [newTechName, setNewTechName] = useState("");
  const [newTechPhone, setNewTechPhone] = useState("");

  // Load config on mount
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/telegram/config");
      if (res.ok) {
        const data = await res.json();
        setConfig(prev => ({
          ...prev,
          ...data,
          botToken: data.botToken || (data.botTokenMasked ? "••••••••••••••••" : "")
        }));
      }
    } catch (err) {
      console.error("Telegram config fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTestResult({ status: "idle", message: "" });

    try {
      const payload: any = {
        chatId: config.chatId,
        notifyNewRequests: config.notifyNewRequests,
        notifyAnalytics: config.notifyAnalytics,
        notifyDailyReport: config.notifyDailyReport,
        notifySatisfaction: config.notifySatisfaction,
        technicians: config.technicians
      };

      // Only send botToken if user modified it away from masked bullet string
      if (config.botToken && !config.botToken.includes("••••")) {
        payload.botToken = config.botToken.trim();
      }

      const res = await fetch("/api/telegram/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          status: "success",
          message: "Telegram ayarları başarıyla kaydedildi."
        });
        setConfig(prev => ({
          ...prev,
          ...data.config,
          botToken: data.config.botToken || (data.config.botTokenMasked ? "••••••••••••••••" : "")
        }));
      } else {
        setTestResult({
          status: "error",
          message: data.error || "Ayarlar kaydedilemedi."
        });
      }
    } catch (err: any) {
      setTestResult({
        status: "error",
        message: err.message || "Ağ bağlantısı kurulamadı."
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Magic Chat ID Auto-Detector
  const handleAutoDetectChatId = async () => {
    setIsDetecting(true);
    setDetectFeedback({ type: "idle", message: "" });
    setDetectedChats([]);

    const tokenToSend = !config.botToken.includes("••••") ? config.botToken : undefined;

    try {
      const res = await fetch("/api/telegram/detect-chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken: tokenToSend })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setDetectFeedback({
          type: "error",
          message: data.error || "Sohbetler algılanamadı. Lütfen önce geçerli bir Bot Token girin."
        });
        return;
      }

      const chats: DetectedChat[] = data.chats || [];

      if (chats.length === 0) {
        setDetectFeedback({
          type: "empty",
          message: "Botunuz henüz bir gruptan veya kişiden mesaj almadı. Lütfen botu grubunuza ekleyin, gruba 'Selam' yazın ve tekrar bu butona basın."
        });
      } else {
        setDetectedChats(chats);
        setDetectFeedback({
          type: "success",
          message: `${chats.length} adet Telegram sohbeti / grubu bulundu. Bildirim almak istediğinizi seçin:`
        });
      }
    } catch (err: any) {
      setDetectFeedback({
        type: "error",
        message: err.message || "Bağlantı hatası oluştu."
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSelectChat = (chat: DetectedChat) => {
    setConfig(prev => ({ ...prev, chatId: chat.id }));
    setDetectFeedback({
      type: "success",
      message: `"${chat.title}" başarıyla seçildi! Lütfen alttaki "Ayarları Kaydet" butonuna basın.`
    });
    setDetectedChats([]);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult({ status: "idle", message: "" });

    try {
      const res = await fetch("/api/telegram/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          botToken: !config.botToken.includes("••••") ? config.botToken : undefined,
          chatId: config.chatId
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          status: "success",
          message: "Harika! Test mesajı Telegram kanalınıza başarıyla iletildi."
        });
      } else {
        setTestResult({
          status: "error",
          message: data.error || "Telegram mesajı gönderilemedi. Token ve Chat ID'yi kontrol edin."
        });
      }
    } catch (err: any) {
      setTestResult({
        status: "error",
        message: err.message || "Test isteği gönderilemedi."
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleAddTechnician = () => {
    if (!newTechName.trim() || !newTechPhone.trim()) return;
    const updated = [...config.technicians, { name: newTechName.trim(), phone: newTechPhone.trim() }];
    setConfig(prev => ({ ...prev, technicians: updated }));
    setNewTechName("");
    setNewTechPhone("");
  };

  const handleRemoveTechnician = (index: number) => {
    const updated = config.technicians.filter((_, i) => i !== index);
    setConfig(prev => ({ ...prev, technicians: updated }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center shrink-0">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">Telegram Operasyon Botu</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  config.isConfigured
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}>
                  {config.isConfigured ? "● Bağlantı Aktif" : "○ Yapılandırma Bekleniyor"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                7/24 Acil çağrı yönlendirme, saha ustası atama butonları ve anlık müşteri takibi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting || isLoading || !config.chatId}
              className="px-4 py-2.5 bg-[#0088cc] hover:bg-[#0077b5] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? "animate-spin" : ""}`} />
              <span>{isTesting ? "Gönderiliyor..." : "Test Bildirimi Gönder"}</span>
            </button>
          </div>
        </div>

        {/* Test Result Alert Bar */}
        {testResult.status !== "idle" && (
          <div className={`mt-4 p-3.5 rounded-xl text-xs font-medium flex items-center justify-between gap-3 border ${
            testResult.status === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}>
            <div className="flex items-center gap-2">
              {testResult.status === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setTestResult({ status: "idle", message: "" })}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Kapat
            </button>
          </div>
        )}
      </div>

      {/* Subtabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-xl gap-2 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveSubTab("settings")}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "settings"
              ? "border-[#0088cc] text-[#0088cc]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Bot & Bildirim Ayarları</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("guide")}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "guide"
              ? "border-[#0088cc] text-[#0088cc]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Nasıl Kurulur? (Kolay Resimli Rehber)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("technicians")}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "technicians"
              ? "border-[#0088cc] text-[#0088cc]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Saha Ustaları ({config.technicians.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("preview")}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "preview"
              ? "border-[#0088cc] text-[#0088cc]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Görünüm Önizlemesi</span>
        </button>
      </div>

      {/* 1. Bot & Notification Settings Subtab */}
      {activeSubTab === "settings" && (
        <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Credentials Column */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0088cc]" />
                <span>Telegram Bot Bilgileri</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                BotToken şifrenizi girin, ardından grup ID'nizi otomatik algılama butonuyla tek tıkla bulun.
              </p>
            </div>

            <div className="space-y-5">
              {/* Token Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    1. Adım: Bot Token (BotFather Şifreniz)
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveSubTab("guide")}
                    className="text-[11px] font-bold text-[#0088cc] hover:underline flex items-center gap-1"
                  >
                    <span>Nasıl alınır?</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showToken ? "text" : "password"}
                    value={config.botToken}
                    onChange={(e) => setConfig({ ...config, botToken: e.target.value })}
                    placeholder="Örn: 7891234567:AAFlzAbc..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title={showToken ? "Gizle" : "Göster"}
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Telegram'da @BotFather'ın size verdiği uzun harf ve rakamlardan oluşan token.
                </p>
              </div>

              {/* Chat ID Input & Magic Auto-Detector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  2. Adım: Bildirim Alacak Grup / Sohbet ID'si
                </label>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={config.chatId}
                    onChange={(e) => setConfig({ ...config, chatId: e.target.value })}
                    placeholder="-1001234567890 (Grup) veya 12345678 (Kişi)"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
                  />
                  
                  {/* Magic Auto Detect Button */}
                  <button
                    type="button"
                    onClick={handleAutoDetectChatId}
                    disabled={isDetecting || !config.botToken}
                    className="px-4 py-2.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0088cc] font-black text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                    title="Grup ID'sini otomatik algıla"
                  >
                    <Wand2 className={`w-3.5 h-3.5 ${isDetecting ? "animate-spin text-amber-500" : ""}`} />
                    <span>{isDetecting ? "Aranıyor..." : "✨ Grup ID'mi Otomatik Bul"}</span>
                  </button>
                </div>

                {/* Info Note explaining Chat ID simply */}
                <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#0088cc]" />
                    <span>Chat ID Nedir ve Nasıl Otomatik Bulunur?</span>
                  </div>
                  <p>
                    Chat ID, Telegram'da bildirimlerin gideceği grubun veya kişinin tıpkı bir <b>telefon numarası</b> gibi kimlik numarasıdır.
                  </p>
                  <p className="font-medium text-slate-700">
                    💡 <b>En Kolay Yol:</b> Botunuzu ustalar grubuna ekleyin, gruba <i>"Selam"</i> yazın ve yukarıdaki <b>"✨ Grup ID'mi Otomatik Bul"</b> butonuna basın! Sistemin kendisi grubunuzu algılayıp numarasını buraya dolduracaktır.
                  </p>
                </div>

                {/* Auto Detection Result Box */}
                {detectFeedback.message && (
                  <div className={`mt-3 p-3.5 rounded-xl text-xs font-medium border ${
                    detectFeedback.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : detectFeedback.type === "empty"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}>
                    <div className="flex items-center gap-2">
                      {detectFeedback.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <span>{detectFeedback.message}</span>
                    </div>

                    {/* Detected Chats List with 1-Click Pick */}
                    {detectedChats.length > 0 && (
                      <div className="mt-3 space-y-2 pt-2 border-t border-emerald-200">
                        {detectedChats.map((chat) => (
                          <div
                            key={chat.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-white rounded-lg border border-emerald-300 gap-2"
                          >
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{chat.typeLabel}</span>
                                <span>·</span>
                                <span>{chat.title}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                ID: <span className="font-bold text-emerald-700">{chat.id}</span>
                                {chat.lastMessage && ` — Son mesaj: "${chat.lastMessage}"`}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleSelectChat(chat)}
                              className="px-3 py-1.5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs rounded-md transition-colors cursor-pointer shrink-0"
                            >
                              Bu Grubu Seç ✓
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-[#0b2e59] hover:bg-[#082242] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{isSaving ? "Kaydediliyor..." : "Ayarları Kaydet"}</span>
              </button>

              {config.isConfigured && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sistem Canlı Bildirime Hazır</span>
                </span>
              )}
            </div>
          </div>

          {/* Notification Rules Column */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Bildirim Tetikleyicileri</span>
            </h2>

            <div className="space-y-3.5">
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={config.notifyNewRequests}
                  onChange={(e) => setConfig({ ...config, notifyNewRequests: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-[#0088cc] rounded-md focus:ring-[#0088cc]"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">7/24 Acil Servis Çağrıları</div>
                  <div className="text-[11px] text-slate-500">Müşteri arıza formu gönderdiğinde anlık harita ve arama butonuyla iletilir.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={config.notifyAnalytics}
                  onChange={(e) => setConfig({ ...config, notifyAnalytics: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-[#0088cc] rounded-md focus:ring-[#0088cc]"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Hesaplama & Terk Alarmları</div>
                  <div className="text-[11px] text-slate-500">Kablo veya EV istasyonu hesabı yapıp WhatsApp'a tıklayan sıcak fırsatlar.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={config.notifyDailyReport}
                  onChange={(e) => setConfig({ ...config, notifyDailyReport: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-[#0088cc] rounded-md focus:ring-[#0088cc]"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">23:59 Gece Performans Özeti</div>
                  <div className="text-[11px] text-slate-500">Günün toplam çağrı adedi, ortalama varış süresi ve başarı istatistiği.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={config.notifySatisfaction}
                  onChange={(e) => setConfig({ ...config, notifySatisfaction: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-[#0088cc] rounded-md focus:ring-[#0088cc]"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Müşteri Memnuniyeti (NPS)</div>
                  <div className="text-[11px] text-slate-500">Tamamlanan servis sonrası gelen 1-5 yıldız müşteri puanları.</div>
                </div>
              </label>
            </div>
          </div>
        </form>
      )}

      {/* 2. Visual Step-by-Step Setup Guide Subtab */}
      {activeSubTab === "guide" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0088cc] bg-sky-50 px-2.5 py-1 rounded-md">
              Sıfırdan Adım Adım Kılavuz
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-2">
              Telegram Botunu 2 Dakikada Nasıl Kurarsınız?
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Hiçbir teknik bilgiye veya üçüncü parti karmaşık botlara (RawDataBot vb.) gerek yoktur. Aşağıdaki 4 basit adımı takip ederek botunuzu anında çalıştırabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Step 1 */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-[#0088cc] text-white font-black text-sm flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Telegram'da @BotFather'ı Açın
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Telegram arama çubuğuna <code className="text-[#0088cc] font-bold">@BotFather</code> yazın (yanında mavi onay tiki olan resmi Telegram botudur) ve sohbette en alttaki <b>"Başlat" (Start)</b> butonuna basın.
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>BotFather Resmi Hesabı</span>
                <a
                  href="https://t.me/BotFather"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0088cc] flex items-center gap-1 hover:underline"
                >
                  <span>Telegram'da Aç</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-[#0088cc] text-white font-black text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                /newbot Yazarak Botunuzu Oluşturun
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                BotFather'a <code className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-800">/newbot</code> mesajını gönderin. Sizden iki bilgi isteyecek:
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li><b>Görünecek İsim:</b> Örneğin <i>Aya Elektrik Acil Servis</i></li>
                <li><b>Kullanıcı Adı:</b> Sonu "bot" ile bitmeli (Örn: <i>ayaelektrik_servis_bot</i>)</li>
              </ul>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => copyToClipboard("/newbot")}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? "Kopyalandı!" : "Komutu Kopyala: /newbot"}</span>
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-[#0088cc] text-white font-black text-sm flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Size Verilen "Token" Kodunu Kopyalayın
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                BotFather botu oluşturduktan sonra size <code className="font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">Use this token to access the HTTP API: 123456789:AAFl...</code> şeklinde uzun bir kod verir.
              </p>
              <p className="text-xs text-slate-600">
                Bu kodu kopyalayıp bu paneldeki <b>"Bot Token"</b> kutusuna yapıştırın.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                4
              </div>
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                <span>Botu Gruba Ekleyin & "Otomatik Bul"a Basın!</span>
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </h3>
              <p className="text-xs text-emerald-900 leading-relaxed">
                <b>En Kolay Kısım Burasıdır:</b>
              </p>
              <ol className="text-xs text-emerald-900 space-y-1.5 list-decimal list-inside">
                <li>Ustalarınızın olduğu Telegram grubunu açın ve <b>Üye Ekle</b> diyerek oluşturduğunuz botu gruba ekleyin.</li>
                <li>Gruba herhangi bir kelime (örneğin <i>"Merhaba"</i>) yazıp gönderin.</li>
                <li>Panelimizdeki <b>"✨ Grup ID'mi Otomatik Bul"</b> butonuna tıklayın. Sistem grubunuzu anında bulup kaydedecektir!</li>
              </ol>
            </div>
          </div>

          {/* Quick Action Button to Return to Settings */}
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Token kodunuz hazır mı?
              </div>
              <div className="text-[11px] text-slate-500">
                Ayarlar sekmesine geçerek kodunuzu yapıştırın ve tek tıkla test mesajı gönderin.
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveSubTab("settings")}
              className="px-5 py-2.5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Ayarlar Sekmesine Git</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Technicians Subtab */}
      {activeSubTab === "technicians" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-black text-slate-900">Saha Ustaları & Hızlı Atama Listesi</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Telegram acil çağrı kartına eklenecek usta butonları burada tanımlanır.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Toplam {config.technicians.length} Usta Kayıtlı
            </span>
          </div>

          {/* Add Technician Form */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Usta Adı & Uzmanlık</label>
              <input
                type="text"
                value={newTechName}
                onChange={(e) => setNewTechName(e.target.value)}
                placeholder="Örn: Hasan Usta (Pano Uzmanı)"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-[#0088cc] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Telefon Numarası</label>
              <input
                type="text"
                value={newTechPhone}
                onChange={(e) => setNewTechPhone(e.target.value)}
                placeholder="Örn: 05300695393"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-[#0088cc] focus:outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddTechnician}
                className="w-full py-2 bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Usta Ekle</span>
              </button>
            </div>
          </div>

          {/* Technicians List */}
          <div className="space-y-2">
            {config.technicians.map((tech, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 font-black text-xs flex items-center justify-center">
                    {tech.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{tech.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                      <PhoneCall className="w-3 h-3 text-emerald-600" />
                      <span>{tech.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${tech.phone}`}
                    className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg text-xs"
                    title="Ara"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnician(index)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSaveConfig()}
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#0b2e59] hover:bg-[#082242] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Değişiklikleri Kaydet</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Live Card Preview Subtab */}
      {activeSubTab === "preview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Emergency Lead Dispatch */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black text-slate-900">🚨 Acil Çağrı Mesaj Kartı</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Anlık İletim</span>
            </div>

            {/* Telegram Message Bubble */}
            <div className="bg-[#1e2c3a] text-white p-4 rounded-2xl rounded-tl-sm text-xs space-y-2.5 shadow-sm font-sans">
              <div className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <span>🚨</span>
                <span>7/24 YENİ ACİL SERVİS ÇAĞRISI ⚡</span>
              </div>
              <div className="border-t border-white/10 pt-2 space-y-1 text-slate-200 text-xs">
                <div>👤 <b>Müşteri:</b> Ahmet Bey</div>
                <div>📞 <b>Telefon:</b> <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-amber-300">0538 694 94 69</span></div>
                <div>📍 <b>Bölge:</b> Büyükçekmece / Alkent 2000</div>
                <div>🏠 <b>Açık Adres:</b> Mustafa Kemal Bulvarı No: 10 Daire: 13</div>
                <div>🛠 <b>Arıza Türü:</b> Pano Yanması & Sigorta Atması</div>
                <div>📝 <b>Not:</b> <i>Dairenin elektriği aniden kesildi, panodan duman geldi.</i></div>
                <div>⏱ <b>Saat:</b> 21:40 (7/24 Nöbetçi Ekip)</div>
              </div>

              {/* Simulated Inline Action Buttons */}
              <div className="pt-2 space-y-1.5">
                <div className="grid grid-cols-2 gap-1.5">
                  <button type="button" className="py-2 px-3 bg-[#2b5278] hover:bg-[#346392] text-white font-bold rounded-lg text-[11px] text-center transition-colors">
                    📞 Müşteriyi Hemen Ara
                  </button>
                  <button type="button" className="py-2 px-3 bg-[#2b5278] hover:bg-[#346392] text-white font-bold rounded-lg text-[11px] text-center transition-colors">
                    📍 Konumu Haritada Aç
                  </button>
                </div>
                <button type="button" className="w-full py-2 px-3 bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] text-center transition-colors">
                  💬 WhatsApp'tan Yaz
                </button>
                <button type="button" className="w-full py-2 px-3 bg-[#ffb703] hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[11px] text-center transition-colors">
                  ⚡ Çağrıyı Üzerime Alıyorum
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: 23:59 Daily Operations Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black text-slate-900">📊 23:59 Gece Raporu Kartı</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Otomatik Cron</span>
            </div>

            {/* Telegram Message Bubble */}
            <div className="bg-[#1e2c3a] text-white p-4 rounded-2xl rounded-tl-sm text-xs space-y-2.5 shadow-sm font-sans">
              <div className="font-bold text-sky-400 text-sm flex items-center gap-1.5">
                <span>📊</span>
                <span>AYA ELEKTRİK GÜNLÜK SERVİS RAPORU</span>
              </div>
              <div className="border-t border-white/10 pt-2 space-y-1 text-slate-200 text-xs">
                <div>📅 <b>Tarih:</b> 03 Kasım 2026</div>
                <div>🚨 <b>Bugünkü Acil Çağrı:</b> 14 Adet</div>
                <div>✅ <b>Müdahale & Çözüm:</b> 14 Adet (%100 Çözüm)</div>
                <div>⏱ <b>Ort. Sahaya Varış:</b> 22 Dakika</div>
                <div>⭐ <b>Müşteri Memnuniyeti:</b> 4.95 / 5.0 (⭐⭐⭐⭐⭐)</div>
                <div>🏆 <b>En Çok Çağrı:</b> Büyükçekmece & Beykent</div>
              </div>
              <div className="text-[11px] text-slate-400 italic pt-1 border-t border-white/10">
                Aya Elektrik 7/24 Kesintisiz Saha ve Operasyon Takibi
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
