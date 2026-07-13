import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Send,
  Briefcase,
  FileText,
  User,
  Phone,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Award,
  AlertTriangle,
  XCircle,
  Upload,
  Paperclip,
  Trash2,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { addRedundantDoc } from "../utils/firebaseHooks";
import { playModernMusicalAnons } from "../components/Contact";
import { motion, AnimatePresence } from "motion/react";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    experience: "1-3 Yıl",
    specialty: "Genel Elektrik",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "warning" | "error";
  } | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>("");
  const [fileProgress, setFileProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Limit file size to 10MB
      if (selectedFile.size > 10 * 1024 * 1024) {
        setToast({
          message: "Belge boyutu 10MB'dan küçük olmalıdır.",
          type: "warning",
        });
        return;
      }
      setFile(selectedFile);
      setIsUploading(true);
      setFileProgress(15);

      // Simulate a nice, professional file loading bar animation
      const interval = setInterval(() => {
        setFileProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 25;
        });
      }, 120);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileBase64("");
    setFileProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT VALIDATION
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setToast({
        message: "Lütfen tüm zorunlu alanları (Ad Soyad, Telefon ve Kendinizden Bahsedin) eksiksiz doldurun.",
        type: "warning",
      });
      return;
    }

    if (formData.phone.length !== 11) {
      setToast({
        message: "Telefon numaranız tam olarak 11 haneli olmalıdır (Örn: 05300695393).",
        type: "warning",
      });
      return;
    }
    
    try {
      const formatPhoneBackground = (rawPhone: string): string => {
        const clean = rawPhone.replace(/\D/g, "");
        if (clean.length === 11) {
          return `${clean.substring(0, 4)} ${clean.substring(4, 7)} ${clean.substring(7, 9)} ${clean.substring(9, 11)}`;
        }
        return rawPhone;
      };

      const formattedPhone = formatPhoneBackground(formData.phone);

      await addRedundantDoc("jobApplications", {
        ...formData,
        phone: formattedPhone,
        certificateName: file ? file.name : "",
        certificateData: fileBase64 || "",
        date: new Date().toLocaleDateString("tr-TR"),
        status: "Yeni"
      });

      // Enerji yüksek müzikli seslendirme anonsu
      playModernMusicalAnons("Başvurunuz başarıyla alınmıştır Aya Elektrik ailesine hoş geldiniz en kısa sürede sizinle iletişime geçeceğiz", true);

      // Show toast
      setToast({
        message: "Başvurunuz başarıyla iletildi! Aya Elektrik ailesine katılmak için harika bir adım attınız.",
        type: "success",
      });

      setIsSubmitted(true);
      handleRemoveFile();

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          phone: "",
          experience: "1-3 Yıl",
          specialty: "Genel Elektrik",
          message: "",
        });
      }, 5000);
    } catch (err) {
      console.error("Başvuru alınamadı:", err);
      setToast({
        message: "Başvurunuz iletilirken bir teknik aksaklık oluştu. Lütfen tekrar deneyin.",
        type: "error",
      });
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Sürekli ve Dolgun Gelir",
      desc: "Geniş müşteri ağımız sayesinde iş bekleme stresine girmeden, emeğinizin karşılığını eksiksiz ve tam zamanında alın.",
    },
    {
      icon: ShieldCheck,
      title: "Kurumsal Güvence",
      desc: "Merdiven altı değil, sektörde marka bilinirliği yüksek kurumsal bir yapıda, tam donanımlı çalışma şartlarına sahip olun.",
    },
    {
      icon: Zap,
      title: "Teknolojik Gelişim",
      desc: "Akıllı ev sistemleri ve yenilikçi otomasyon teknolojileriyle çalışarak mesleki vizyonunuzu geleceğe taşıyın.",
    },
    {
      icon: Award,
      title: "Saygınlık ve İtibar",
      desc: "Aya Elektrik üniformasını giydiğinizde, müşterilerin gözünde sıradan bir usta değil, saygın bir teknik uzman olursunuz.",
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-[#ffb703] selection:text-[#0b2e59] flex flex-col pb-[72px] md:pb-0">
      <Helmet>
        <title>Ekibimize Katıl | Aya Elektrik Kariyer</title>
        <meta
          name="description"
          content="Aya Elektrik ailesine katılın! Müşteri arama derdine son verin, kurumsal güvenceyle profesyonel elektrik ustası olarak çalışın."
        />
      
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Kariyer ve İş Olanakları",
            "description": "Aya Elektrik ekibine katılın. Açık pozisyonlar ve iş başvuru formu.",
            "url": "https://ayaelektrik.com/ekibimize-katil"
          }`}
        </script>
</Helmet>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#0b2e59] pt-32 pb-20 px-6 relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb703] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-[#ffb703] text-sm font-bold tracking-wider mb-4 border border-white/20">
            KARİYER FIRSATI
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Ustalığınızı{" "}
            <span className="text-[#ffb703]">Kurumsal Bir Markayla</span>{" "}
            <br className="hidden md:block" /> Değere Dönüştürün.
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            "Müşteri nerede?" diye düşünmeyi bırakın. Zanaatınıza odaklanın,
            gerisini Aya Elektrik'in güçlü operasyon ağına bırakın.
          </p>
        </div>
      </div>

      <main className="flex-grow -mt-8 px-6 pb-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Value Proposition (Why Us?) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-2xl font-black text-slate-800 mb-6">
                  Neden Aya Elektrik?
                </h2>
                <div className="space-y-8">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-50 group-hover:bg-[#ffb703]/10 rounded-xl flex items-center justify-center border border-slate-100 group-hover:border-[#ffb703]/30 transition-colors">
                        <benefit.icon className="w-6 h-6 text-[#0b2e59]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#0b2e59] transition-colors">
                          {benefit.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-[#0b2e59] rounded-xl text-white">
                  <p className="font-medium italic text-white/90">
                    "Aya Elektrik'e katıldıktan sonra sadece işime odaklanmaya
                    başladım. Tahsilat, müşteri arayışı veya organizasyon
                    dertlerim bitti."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-[#ffb703]">
                      K.A
                    </div>
                    <div>
                      <div className="font-bold text-sm">Kemal Arslan</div>
                      <div className="text-white/60 text-xs">
                        Kıdemli Elektrik Uzmanı
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-2xl font-black text-slate-800 mb-2">
                    Hemen Başvurun
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Bilgilerinizi bırakın, uzman ekibimiz sizinle en kısa sürede
                    iletişime geçsin.
                  </p>
                </div>

                <div className="p-8 md:p-10">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-800 mb-3">
                        Aramıza Hoş Geldiniz!
                      </h3>
                      <p className="text-slate-600 text-lg max-w-md mx-auto">
                        Harika bir karar! Başvurunuz merkeze ulaştı.
                        Yöneticilerimiz ön değerlendirmeyi yapıp size hızlıca
                        geri dönüş yapacak.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4 text-[#0b2e59]" /> Adınız
                            Soyadınız
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Örn: Ahmet Yılmaz"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#0b2e59]" /> Telefon
                            Numaranız <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => {
                              const sanitized = e.target.value.replace(/\D/g, "");
                              if (sanitized.length <= 11) {
                                setFormData({
                                  ...formData,
                                  phone: sanitized,
                                });
                              }
                            }}
                            placeholder="Örn: 05300695393"
                            maxLength={11}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[#0b2e59]" />{" "}
                            Deneyim Süreniz
                          </label>
                          <select
                            value={formData.experience}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                experience: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800 cursor-pointer"
                          >
                            <option value="1 Yıldan Az">1 Yıldan Az</option>
                            <option value="1-3 Yıl">1-3 Yıl</option>
                            <option value="3-5 Yıl">3-5 Yıl</option>
                            <option value="5-10 Yıl">5-10 Yıl</option>
                            <option value="10 Yıl+">10 Yıl ve Üzeri</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#0b2e59]" /> Uzmanlık
                            Alanınız
                          </label>
                          <select
                            value={formData.specialty}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                specialty: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800 cursor-pointer"
                          >
                            <option value="Genel Elektrik">
                              Genel Elektrik Arıza ve Bakım
                            </option>
                            <option value="Zayıf Akım">
                              Zayıf Akım & Kamera Sistemleri
                            </option>
                            <option value="Otomasyon">
                              Akıllı Ev & Otomasyon
                            </option>
                            <option value="Tesisat & Pano">
                              Endüstriyel Pano & Tesisat
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#0b2e59]" /> Bize
                          Kendinizden Bahsedin <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          placeholder="Sahip olduğunuz belgeler (Ustalık, Kalfalık vb.) ve önceden bitirdiğiniz projeler hakkında detaylı bilgi veriniz."
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800 resize-y"
                        ></textarea>
                      </div>

                      {/* Mesleki Yeterlilik Belgesi (Zorunlu Değil) */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-[#0b2e59]" /> Mesleki Yeterlilik Belgesi (İsteğe Bağlı)
                        </label>
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-200 hover:border-[#0b2e59] rounded-xl p-6 bg-slate-50/50 hover:bg-slate-50 text-center cursor-pointer transition-all group relative overflow-hidden"
                        >
                          <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                            className="hidden"
                          />
                          {!file ? (
                            <div className="space-y-2">
                              <Upload className="w-8 h-8 text-slate-400 mx-auto group-hover:text-[#0b2e59] group-hover:scale-110 transition-transform" />
                              <div className="text-xs text-slate-600 font-semibold">
                                Sürükleyip bırakın veya <span className="text-[#0b2e59] underline">dosya seçin</span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-medium">
                                PDF, DOCX, PNG, JPG (Maks. 10MB)
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#0b2e59]/5 rounded-lg flex items-center justify-center text-[#0b2e59]">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-bold text-slate-800 max-w-[180px] sm:max-w-[280px] truncate">
                                    {file.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-semibold">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB • {isUploading ? `%${fileProgress} Yükleniyor` : "Yüklendi"}
                                  </div>
                                </div>
                              </div>
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFile();
                                }}
                                className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          {isUploading && (
                            <div className="absolute bottom-0 left-0 h-1 bg-[#ffb703] transition-all duration-150" style={{ width: `${fileProgress}%` }} />
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[#0b2e59] hover:bg-[#082244] text-white px-8 py-4.5 rounded-xl text-lg font-black transition-all shadow-md group"
                      >
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Geleceğinize Adım Atın
                      </button>
                      <p className="text-center text-xs text-slate-500 font-medium">
                        Kişisel verileriniz KVKK kapsamında güvenle
                        işlenmektedir.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

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
                {toast.type === "success" ? "Başvuru Başarılı" :
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
    </div>
  );
}
