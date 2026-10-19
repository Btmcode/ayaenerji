import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Clock, MapPin, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import AddressSelectorModal from "./AddressSelectorModal";
import { getWhatsAppLink } from "../utils/whatsapp";
import { addRedundantDoc } from "../utils/firebaseHooks";
import { motion, AnimatePresence } from "motion/react";

// Reusable function to play high-energy/warm background music & voice announcement via SpeechSynthesis & Web Audio API
export const playModernMusicalAnons = (text: string, isHighEnergy: boolean = false) => {
  const playVoice = () => {
    // Try to play via our TTS proxy (real human-like female voice)
    const url = `/api/tts?text=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    // Energetic tempo
    audio.playbackRate = isHighEnergy ? 1.15 : 1.1; 
    audio.play().catch(() => {
      // Fallback to browser SpeechSynthesis if blocked by browser policies
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        
        const doSpeak = () => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "tr-TR";
          
          const voices = window.speechSynthesis.getVoices();
          
          let femaleVoice = voices.find(v => 
            v.name.toLowerCase().includes("turkish") && 
            v.name.toLowerCase().includes("female")
          );
          
          if (!femaleVoice) {
            const trVoices = voices.filter(v => v.lang.startsWith("tr"));
            femaleVoice = trVoices.find(v => 
              v.name.toLowerCase().includes("female") || 
              v.name.toLowerCase().includes("seda") || 
              v.name.toLowerCase().includes("yelda") || 
              v.name.toLowerCase().includes("emel") ||
              v.name.toLowerCase().includes("bayan") ||
              v.name.toLowerCase().includes("zeynep")
            );
            if (!femaleVoice && trVoices.length > 0) {
              // Ensure we absolutely avoid male voices like Tolga, Cem, etc.
              femaleVoice = trVoices.find(v => !v.name.toLowerCase().match(/(tolga|cem|male|erkek)/)) || trVoices[0];
            }
          }
          
          if (femaleVoice) {
            utterance.voice = femaleVoice;
          }
          
          utterance.rate = 1.05; 
          utterance.pitch = femaleVoice ? 1.2 : 1.8;
          window.speechSynthesis.speak(utterance);
        };

        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = doSpeak;
        } else {
          doSpeak();
        }
      }
    });
  };

  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      playVoice();
      return;
    }
    const ctx = new AudioContext();
    
    // Explicitly resume audio context for iOS/Android Safari & Chrome compatibility
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    
    const now = ctx.currentTime;

    // Master volume control (balanced for both mobile speakers and headphones)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, now);
    masterGain.connect(ctx.destination);

    // Dynamic compressor for crisp radio/commercial sound
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-20, now);
    compressor.knee.setValueAtTime(24, now);
    compressor.ratio.setValueAtTime(10, now);
    compressor.attack.setValueAtTime(0.003, now);
    compressor.release.setValueAtTime(0.15, now);
    compressor.connect(masterGain);

    // Reusable synthesizer note helper
    const playNote = (freq: number, start: number, duration: number, type: OscillatorType = "sine", vol = 0.4) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(type === "sawtooth" ? 900 : 1500, start);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(compressor);
      
      // High-end envelope
      gainNode.gain.setValueAtTime(0, start);
      gainNode.gain.linearRampToValueAtTime(vol, start + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(vol * 0.6, start + 0.2);
      gainNode.gain.setValueAtTime(vol * 0.6, start + duration - 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    // Synthesized rhythmic kick/pop drum beat to give the jingle a premium high-energy feel
    const playDrumPop = (start: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      // Swift pitch sweep for kick drum impact
      osc.frequency.setValueAtTime(160, start);
      osc.frequency.exponentialRampToValueAtTime(45, start + 0.12);
      
      osc.connect(gainNode);
      gainNode.connect(compressor);
      
      gainNode.gain.setValueAtTime(0.5, start);
      gainNode.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
      
      osc.start(start);
      osc.stop(start + 0.16);
    };

    // Play beautiful energetic upbeat corporate jingle!
    // A progression of C Major, F Major, G Major and a high-pitch C Major arpeggio
    const timeScale = 0.14; // fast upbeat tempo
    
    // Beat 1 (Kick + Root Chord)
    playDrumPop(now);
    playNote(261.63, now, 0.4, "triangle", 0.4); // C4
    playNote(329.63, now, 0.4, "sine", 0.35);    // E4
    
    // Upbeat melody arpeggio
    playNote(392.00, now + timeScale, 0.3, "sine", 0.3);       // G4
    playNote(523.25, now + timeScale * 2, 0.3, "sine", 0.3);   // C5
    
    // Beat 2 (Kick + F-Major Chord)
    playDrumPop(now + timeScale * 3);
    playNote(349.23, now + timeScale * 3, 0.4, "triangle", 0.4); // F4
    playNote(440.00, now + timeScale * 4, 0.3, "sine", 0.3);     // A4
    playNote(523.25, now + timeScale * 5, 0.3, "sine", 0.3);     // C5
    
    // Beat 3 (G-Major progression to high peak)
    playNote(392.00, now + timeScale * 6, 0.5, "triangle", 0.4); // G4
    playNote(493.88, now + timeScale * 7, 0.3, "sine", 0.3);     // B4
    playNote(587.33, now + timeScale * 8, 0.3, "sine", 0.3);     // D5
    
    // Final Triumphant Peak (Kick + Sparkling High C-Major chord)
    playDrumPop(now + timeScale * 9);
    playNote(523.25, now + timeScale * 9, 1.2, "sine", 0.45);   // C5
    playNote(659.25, now + timeScale * 10, 1.1, "sine", 0.35);  // E5
    playNote(783.99, now + timeScale * 11, 1.0, "sine", 0.3);   // G5
    playNote(1046.50, now + timeScale * 12, 0.9, "sine", 0.2);  // C6 (sparkle!)

    // Ambient warm pad drone underneath the jingle
    playNote(130.81, now, 2.5, "sine", 0.25); // low C3 base drone

    // Perfect voice delay - plays right as the sparkly high peak finishes building
    setTimeout(playVoice, 1100);

    // Auto-duck master volume nicely to let the female speech shine
    masterGain.gain.setValueAtTime(0.15, now);
    masterGain.gain.exponentialRampToValueAtTime(0.04, now + 1.1);
    masterGain.gain.setValueAtTime(0.04, now + 4.5);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
    
  } catch (e) {
    console.error("Audio engine failed, playing voice only:", e);
    playVoice();
  }
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

      // Show gorgeous toast
      setToast({
        message: "Harika! Talebiniz alındı, WhatsApp yönlendirmeniz yapılıyor...",
        type: "success",
      });

      // Play elegant background music + voice synthesis announcement
      playModernMusicalAnons("Talebiniz alınmıştır Aya Elektrik iyi günler diler", false);

      // Clean and elegant WhatsApp format string - avoiding high-surrogate emojis to prevent rendering issues (like ) on mobile devices
      const messageText = `⚡ *YENİ ACİL SERVİS ÇAĞRISI* ⚡\n\n*Müşteri:* ${formData.isim.trim()}\n*Telefon:* ${formattedPhone}\n*Adres:* ${formData.adres.trim()}\n*Arıza Türü:* ${formData.arizaTuru}\n*Açıklama:* ${formData.mesaj.trim() || "Yok"}\n\n_Aya Elektrik 7/24 Acil Servis_`;
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
        message: "Kayıt sırasında bağlantı problemi oluştu. Doğrudan WhatsApp'a yönlendiriliyorsunuz...",
        type: "error",
      });

      const formattedPhone = formatPhoneBackground(formData.telefon);
      // Clean and elegant WhatsApp fallback format string
      const fallbackMessageText = `⚡ *YENİ ACİL SERVİS ÇAĞRISI* ⚡\n\n*Müşteri:* ${formData.isim.trim()}\n*Telefon:* ${formattedPhone}\n*Adres:* ${formData.adres.trim()}\n*Arıza Türü:* ${formData.arizaTuru}\n*Açıklama:* ${formData.mesaj.trim() || "Yok"}\n\n_Aya Elektrik 7/24 Acil Servis_`;
      const whatsappUrl = `https://wa.me/905300695393?text=${encodeURIComponent(fallbackMessageText)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <section id="iletisim" className="scroll-mt-24 py-20 md:py-28 px-6 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-4">
            Bizimle İletişime Geçin
          </h2>
          <div className="w-20 h-1.5 bg-[#ffb703] rounded-full mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100">
          {/* Contact Information */}
          <div className="lg:w-5/12 bg-[#0b2e59] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 border-[30px] border-white/5 rounded-full"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-48 h-48 border-[20px] border-white/5 rounded-full"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-[#ffb703]">
                İletişim Bilgileri
              </h3>
              <p className="text-white/80 mb-10 leading-relaxed text-lg">
                Acil arıza durumlarında veya proje teklifi almak için bize
                telefon numaramızdan, WhatsApp'tan veya panelden
                ulaşabilirsiniz.
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
          <div className="lg:w-7/12 p-6 sm:p-10 lg:p-12">
            <h3 className="text-2xl font-bold mb-6 text-[#0b2e59]">
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
