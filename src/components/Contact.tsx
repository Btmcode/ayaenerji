import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Clock, MapPin, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import AddressSelectorModal from "./AddressSelectorModal";
import { getWhatsAppLink } from "../utils/whatsapp";
import { addRedundantDoc } from "../utils/firebaseHooks";
import { sendTelegramEmergencyAlert } from "../utils/telegramClient";
import { motion, AnimatePresence } from "motion/react";

// Clean and quiet notification helper (synthetic audio and robot voice disabled)
export const playModernMusicalAnons = (_text: string, _isHighEnergy: boolean = false) => {
  // Silent, professional submission flow
};

// Helper to format 11-digit Turkish mobile numbers to "05XX XXX XX XX" in the background
const formatPhoneBackground = (rawPhone: string): string => {
  const clean = rawPhone.replace(/\D/g, "");
  if (clean.length === 11) {
    return `${clean.substring(0, 4)} ${clean.substring(4, 7)} ${clean.substring(7, 9)} ${clean.substring(9, 11)}`;
  }
  return rawPhone;
};

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    isim: "",
    telefon: "",
    arizaTuru: "Elektrik Arızası",
    adres: "",
    mesaj: "",
  });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "warning" | "error";
  } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "telefon") {
      const sanitized = value.replace(/\D/g, "");
      if (sanitized.length <= 11) {
        setFormData({ ...formData, [name]: sanitized });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectAddress = (fullAddress: string) => {
    setFormData((prev) => ({ ...prev, adres: fullAddress }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT VALIDATION
    if (!formData.isim.trim() || !formData.telefon.trim() || !formData.adres.trim()) {
      setToast({
        message: "Lütfen tüm zorunlu alanları (Ad Soyad, Telefon ve Açık Adres) eksiksiz doldurun.",
        type: "warning",
      });
      return;
    }

    if (formData.telefon.length !== 11) {
      setToast({
        message: "Telefon numaranız tam olarak 11 haneli olmalıdır (Örn: 05300695393).",
        type: "warning",
      });
      return;
    }

    try {
      const formattedPhone = formatPhoneBackground(formData.telefon);

      // Save request in DB first
      await addRedundantDoc("requests", {
        name: formData.isim.trim(),
        phone: formattedPhone,
        service: formData.arizaTuru,
        address: formData.adres.trim(),
        message: formData.mesaj.trim(),
        time: "Hemen",
        status: "Yeni Talep",
        createdAt: new Date().toISOString()
      });

      // Fire 0-delay Telegram Emergency Alert to Field Technicians & Management
      sendTelegramEmergencyAlert({
        name: formData.isim.trim(),
        phone: formattedPhone,
        service: formData.arizaTuru,
        address: formData.adres.trim(),
        message: formData.mesaj.trim()
      }).catch((err) => console.warn("Telegram dispatch background notice:", err));

      // Show professional toast
      setToast({
        message: "Talebiniz alındı, WhatsApp üzerinden ustanıza yönlendiriliyorsunuz...",
        type: "success",
      });

      // Natural, clean customer message from real customer to electrician
      const customerName = formData.isim.trim();
      const customerAddress = formData.adres.trim();
      const serviceType = formData.arizaTuru.trim();
      const extraNotes = formData.mesaj.trim();

      let messageText = `Merhaba Aya Elektrik, ${serviceType} için acil usta desteği almak istiyorum.\n\nAdresim: ${customerAddress}\nİsmim: ${customerName}`;
      if (extraNotes) {
        messageText += `\nNot: ${extraNotes}`;
      }
      messageText += `\n\nEn kısa sürede usta yönlendirebilir misiniz?`;

      const whatsappUrl = `https://wa.me/905300695393?text=${encodeURIComponent(messageText)}`;

      // Open whatsapp tab immediately
      window.open(whatsappUrl, "_blank");

      // Reset form fields
      setFormData({
        isim: "",
        telefon: "",
        arizaTuru: "Elektrik Arızası",
        adres: "",
        mesaj: "",
      });
    } catch (err) {
      console.error("Talep gönderilemedi", err);
      
      setToast({
        message: "Doğrudan WhatsApp'a yönlendiriliyorsunuz...",
        type: "error",
      });

      const customerName = formData.isim.trim();
      const customerAddress = formData.adres.trim();
      const serviceType = formData.arizaTuru.trim();
      const extraNotes = formData.mesaj.trim();

      let fallbackMessageText = `Merhaba Aya Elektrik, ${serviceType} için acil usta desteği almak istiyorum.\n\nAdresim: ${customerAddress}\nİsmim: ${customerName}`;
      if (extraNotes) {
        fallbackMessageText += `\nNot: ${extraNotes}`;
      }
      fallbackMessageText += `\n\nEn kısa sürede usta yönlendirebilir misiniz?`;

      const whatsappUrl = `https://wa.me/905300695393?text=${encodeURIComponent(fallbackMessageText)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <section id="iletisim" className="scroll-mt-24 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase mb-2">
            7/24 NÖBETÇİ SANTRAL &amp; DESTEK
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#071d36] tracking-tight">
            Acil Arıza Bildirimi ve Teknik İletişim
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Acil durumlarda santralimizi doğrudan arayabilir veya konumunuzu ileterek en yakın motorize ustayı çağırabilirsiniz.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200">
          {/* Contact Information */}
          <div className="lg:w-5/12 bg-[#071d36] text-white p-6 sm:p-8 lg:p-10 relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 text-[#ffb703]">
                Operasyon &amp; Nöbetçi Santral
              </h3>
              <p className="text-slate-300 mb-8 leading-relaxed text-sm">
                Acil sigorta ve pano arızalarında ya da taahhüt projeleriniz için 7 gün 24 saat kesintisiz hizmet vermekteyiz.
              </p>

              <div className="space-y-8">
                <a
                  href="tel:+905300695393"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ffb703] group-hover:text-[#0b2e59] transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm text-white/60 mb-1">Telefon</h4>
                    <span className="text-xl font-bold group-hover:text-[#ffb703] transition-colors">
                      0530 069 53 93
                    </span>
                  </div>
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm text-white/60 mb-1">WhatsApp</h4>
                    <span className="text-xl font-bold font-sans">
                      Hemen Yazın
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#ffb703]" />
                  </div>
                  <div>
                    <h4 className="text-sm text-white/60 mb-1">
                      Çalışma Saatleri
                    </h4>
                    <span className="text-lg font-bold">
                      7 Gün 24 Saat Açık
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#ffb703]" />
                  </div>
                  <div>
                    <h4 className="text-sm text-white/60 mb-1">Hizmet Alanı</h4>
                    <span className="text-lg font-bold">
                      İstanbul Avrupa Yakası
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-7/12 p-5 sm:p-8 lg:p-12">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#0b2e59]">
              Mesaj Gönderin
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="isim"
                    className="text-sm font-semibold text-slate-600"
                  >
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    id="isim"
                    name="isim"
                    value={formData.isim}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#0b2e59] focus:ring-4 focus:ring-[#0b2e59]/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="telefon"
                    className="text-sm font-semibold text-slate-600"
                  >
                    Telefon Numaranız <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    placeholder="Örn: 05300695393"
                    maxLength={11}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#0b2e59] focus:ring-4 focus:ring-[#0b2e59]/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="arizaTuru"
                  className="text-sm font-semibold text-slate-600"
                >
                  Arıza Türü
                </label>
                <select
                  id="arizaTuru"
                  name="arizaTuru"
                  value={formData.arizaTuru}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#0b2e59] focus:ring-4 focus:ring-[#0b2e59]/10 transition-all cursor-pointer"
                >
                  <option value="Elektrik Arızası">
                    Elektrik Arızası (Genel)
                  </option>
                  <option value="Sigorta Atması">
                    Sigorta / Şalter Atması
                  </option>
                  <option value="Pano Arızası">Pano Arızası</option>
                  <option value="Kablo Yanığı">
                    Kablo Yanığı / Koku Gelmesi
                  </option>
                  <option value="Kaçak Akım">Kaçak Akım Sorunu</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="adres"
                  className="text-sm font-semibold text-slate-600 flex items-center gap-1.5"
                >
                  Açık Adresiniz{" "}
                  <span className="text-xs text-red-500 font-bold">*</span>
                </label>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <textarea
                    id="adres"
                    name="adres"
                    value={formData.adres}
                    onChange={handleChange}
                    placeholder="İstanbul içi adresinizi kolayca belirlemek için tıklayın..."
                    required
                    readOnly
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#0b2e59] focus:ring-4 focus:ring-[#0b2e59]/10 transition-all resize-none cursor-pointer text-slate-800 text-sm font-medium group-hover:bg-slate-100/50"
                  ></textarea>
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-hover:text-[#0b2e59] transition-colors pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mesaj"
                  className="text-sm font-semibold text-slate-600"
                >
                  Açıklama
                </label>
                <textarea
                  id="mesaj"
                  name="mesaj"
                  value={formData.mesaj}
                  onChange={handleChange}
                  placeholder="Size nasıl yardımcı olabiliriz? Arıza veya talebinizi kısaca anlatın..."
                  required
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#0b2e59] focus:ring-4 focus:ring-[#0b2e59]/10 transition-all resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Üzerinden Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
      <AddressSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectAddress={handleSelectAddress}
        initialAddress={formData.adres}
      />

      {/* Modern, elegant, sleek toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`fixed bottom-6 right-6 z-[9999] w-[calc(100%-3rem)] sm:w-[420px] backdrop-blur-md bg-white/95 rounded-2xl shadow-[0_25px_60px_rgba(11,46,89,0.18)] border-l-4 p-5 flex gap-4 items-start overflow-hidden ${
              toast.type === "success" ? "border-emerald-500" :
              toast.type === "warning" ? "border-amber-500" :
              "border-rose-500"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
              toast.type === "success" ? "bg-emerald-50 text-emerald-600" :
              toast.type === "warning" ? "bg-amber-50 text-amber-600" :
              "bg-rose-50 text-rose-600"
            }`}>
              {toast.type === "success" && <CheckCircle2 className="w-5.5 h-5.5" />}
              {toast.type === "warning" && <AlertTriangle className="w-5.5 h-5.5" />}
              {toast.type === "error" && <XCircle className="w-5.5 h-5.5" />}
            </div>
            <div className="flex-grow pr-4">
              <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">
                {toast.type === "success" ? "Talebiniz Alındı" :
                 toast.type === "warning" ? "Eksik Bilgi" : "Sistem Hatası"}
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed font-semibold">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 transition-all flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Elegant shrinking timer progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-1 ${
                toast.type === "success" ? "bg-emerald-500" :
                toast.type === "warning" ? "bg-amber-500" :
                "bg-rose-500"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
