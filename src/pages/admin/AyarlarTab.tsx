import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  Users, 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  Trash2, 
  AlertCircle,
  CheckCircle2,
  Building,
  Github,
  ExternalLink,
  Layers,
  UploadCloud,
  ArrowRight
} from 'lucide-react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import GithubTab from './GithubTab';

interface AyarlarTabProps {
  settings: any;
  updateSettingDb: (id: string, data: any) => Promise<any>;
  admins: any[];
  addAdminDb: (data: any) => Promise<any>;
  removeAdminDb: (id: string) => Promise<any>;
  showToast: (msg: string, type?: "success" | "error" | "info" | "warning") => void;
  showConfirm: (title: string, msg: string, onConfirm: () => void) => void;
  currentAdminEmail?: string;
  requests?: any[];
  customers?: any[];
  blogPosts?: any[];
}

export default function AyarlarTab({
  settings,
  updateSettingDb,
  admins = [],
  addAdminDb,
  removeAdminDb,
  showToast,
  showConfirm,
  currentAdminEmail,
  requests = [],
  customers = [],
  blogPosts = []
}: AyarlarTabProps) {

  // Sub-section state within Ayarlar
  const [activeSubTab, setActiveSubTab] = useState<"genel" | "github" | "firma">("genel");

  // Password Update State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // New Admin State
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  // Company Contact State
  const [companyForm, setCompanyForm] = useState({
    companyName: settings?.companyName || "Aya Elektrik - 7/24 Nöbetçi Elektrikçi & Arıza Bakım Onarım Servisi",
    phone: settings?.phone || "0530 069 53 93",
    whatsapp: settings?.whatsapp || "0530 069 53 93",
    email: settings?.email || "ayaenerji@gmail.com",
    address: settings?.address || "Maltepe Mah. Yedikule Çırpıcı Yolu No: 33, Zeytinburnu / İstanbul"
  });
  const [isSavingCompany, setIsSavingCompany] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast("Mevcut şifrenizi girmelisiniz.", "warning");
      return;
    }
    if (newPassword.length < 6) {
      showToast("Yeni şifre en az 6 karakter olmalıdır.", "warning");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Yeni şifreler birbiriyle eşleşmiyor.", "error");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        showToast("Oturum açık bir kullanıcı bulunamadı.", "error");
        return;
      }

      // Re-authenticate user before updating password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      showToast("Yönetici şifreniz başarıyla güncellendi!", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        showToast("Mevcut şifrenizi hatalı girdiniz.", "error");
      } else {
        showToast("Şifre güncellenemedi: " + (err.message || err), "error");
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newAdminEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      showToast("Geçerli bir e-posta adresi yazınız.", "warning");
      return;
    }

    if (admins.some(a => (a.email || "").toLowerCase() === cleanEmail)) {
      showToast("Bu e-posta adresi zaten yönetici olarak kayıtlı.", "warning");
      return;
    }

    setIsAddingAdmin(true);
    try {
      await addAdminDb({
        email: cleanEmail,
        createdAt: new Date().toISOString(),
        addedBy: currentAdminEmail || "Sistem"
      });
      showToast(`"${cleanEmail}" yönetici listesine eklendi.`, "success");
      setNewAdminEmail("");
    } catch (err: any) {
      showToast("Yönetici eklenirken hata: " + err.message, "error");
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const handleRemoveAdmin = (id: string, email: string) => {
    if (email === "ayaenerji@gmail.com" || email === "ahmetcafoglu@hotmail.com") {
      showToast("Ana kurucu yönetici hesabı sistemden silinemez.", "error");
      return;
    }

    showConfirm(
      "Yöneticiyi Kaldır",
      `"${email}" adresinin yönetim paneli erişim yetkisini iptal etmek istediğinize emin misiniz?`,
      async () => {
        try {
          await removeAdminDb(id);
          showToast("Yönetici yetkisi kaldırıldı.", "success");
        } catch (err: any) {
          showToast("Yetki kaldırılırken hata: " + err.message, "error");
        }
      }
    );
  };

  const handleSaveCompanyInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCompany(true);
    try {
      await updateSettingDb("general", {
        ...companyForm,
        updatedAt: new Date().toISOString()
      });
      showToast("Firma ve acil hat bilgileri kaydedildi.", "success");
    } catch (err: any) {
      showToast("Kayıt sırasında hata: " + err.message, "error");
    } finally {
      setIsSavingCompany(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-[#0b2e59]">
            Sistem ve Yapılandırma Ayarları
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Güvenlik, yönetici erişimleri, GitHub kod deposu entegrasyonu ve firma iletişim bilgileri.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveSubTab("genel")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === "genel"
                ? "bg-white text-[#0b2e59] shadow-xs font-black"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sistem &amp; Güvenlik</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("github")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === "github"
                ? "bg-[#0b2e59] text-white shadow-xs font-black"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Github className="w-3.5 h-3.5 text-[#ffb703]" />
            <span>Github</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("firma")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === "firma"
                ? "bg-white text-[#0b2e59] shadow-xs font-black"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building className="w-3.5 h-3.5 text-[#0b2e59]" />
            <span>Firma &amp; İletişim</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: GITHUB ENTEGRASYONU DOĞRUDAN AYARLAR İÇİNDE */}
      {activeSubTab === "github" && (
        <GithubTab
          settings={settings}
          updateSettingDb={updateSettingDb}
          requests={requests}
          customers={customers}
          blogPosts={blogPosts}
          showToast={showToast}
          showConfirm={showConfirm}
          isEmbedded={true}
        />
      )}

      {/* SUB-TAB 2: GENEL SİSTEM & ŞİFRE */}
      {activeSubTab === "genel" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Section 1: Şifre Değiştirme */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Yönetici Şifre Değişikliği</h3>
                    <p className="text-[11px] text-slate-500">Mevcut hesabınız için yeni giriş şifresi belirleyin</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mevcut Şifre *</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Yeni Şifre *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="En az 6 karakter"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Yeni Şifre (Tekrar) *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Yeni şifreyi doğrulayın"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="w-full mt-2 py-2.5 bg-[#0b2e59] hover:bg-[#082242] text-white font-bold rounded-xl shadow-xs transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#ffb703]" />
                    <span>{isUpdatingPassword ? "Güncelleniyor..." : "Şifreyi Güncelle"}</span>
                  </button>
                </form>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Oturum Açan: <strong className="text-slate-600">{currentAdminEmail || "Bilinmiyor"}</strong>
              </div>
            </div>

            {/* Section 2: Ek Yönetici Yetkilendirme */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0b2e59] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Yetkili Yönetici Hesapları</h3>
                    <p className="text-[11px] text-slate-500">Google veya E-posta ile giriş yapabilecek yöneticiler</p>
                  </div>
                </div>

                <form onSubmit={handleAddAdmin} className="flex gap-2 mb-4 text-xs">
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="ornek@gmail.com"
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                  />
                  <button
                    type="submit"
                    disabled={isAddingAdmin}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors inline-flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ekle</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                  {/* ayaenerji@gmail.com - Admin */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div>
                        <span className="font-bold text-slate-800">ayaenerji@gmail.com</span>
                        <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded">
                          Admin
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">Yönetici Yetkisi</span>
                  </div>

                  {/* ahmetcafoglu@hotmail.com - Super Admin */}
                  <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <div>
                        <span className="font-bold text-slate-900">ahmetcafoglu@hotmail.com</span>
                        <span className="ml-2 text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded shadow-xs">
                          ★ Super Admin
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-amber-700 font-extrabold">Süper Admin Yetkisi</span>
                  </div>

                  {admins.map((adm) => (
                    <div
                      key={adm.id}
                      className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-semibold text-slate-700 truncate">{adm.email}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveAdmin(adm.id, adm.email)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                        title="Yetkiyi Kaldır"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[10px] text-slate-400">
                Eklenen e-posta adresleri Google ile Giriş yaparak panele anında erişebilir.
              </p>
            </div>
          </div>

          {/* GitHub Quick Card with direct switch */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                <Github className="w-5 h-5 text-[#ffb703]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>GitHub &amp; Kod Deposu Modülü</span>
                  <span className="text-[10px] bg-[#ffb703] text-slate-950 font-black px-2 py-0.5 rounded">
                    REST API Push Aktif
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {settings?.githubRepoUrl 
                    ? `Bağlı Depo: ${settings.githubRepoUrl} (Dal: ${settings.githubBranch || "main"})`
                    : "GitHub API bağlantısı, commit geçmişi ve anlık JSON veritabanı push/yedekleme modülü hazır."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveSubTab("github")}
                className="px-4 py-2 bg-[#ffb703] hover:bg-[#e0a000] text-slate-950 font-black text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>GitHub Modülünü Aç (Push &amp; Commit)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {settings?.githubRepoUrl && (
                <a
                  href={settings.githubRepoUrl.startsWith("http") ? settings.githubRepoUrl : `https://github.com/${settings.githubRepoUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
                >
                  <span>GitHub'da Aç</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FİRMA & İLETİŞİM */}
      {activeSubTab === "firma" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Kurumsal Firma &amp; 7/24 Nöbetçi İletişim Bilgileri</h3>
              <p className="text-[11px] text-slate-500">Web sitesinde ve acil arama butonlarında görünen resmi iletişim detayları</p>
            </div>
          </div>

          <form onSubmit={handleSaveCompanyInfo} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Resmi Firma Ünvanı</label>
              <input
                type="text"
                value={companyForm.companyName}
                onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kurumsal İletişim E-Postası</label>
              <input
                type="email"
                value={companyForm.email}
                onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">7/24 Nöbetçi Çağrı &amp; Telefon</label>
              <input
                type="text"
                value={companyForm.phone}
                onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Destek Numarası</label>
              <input
                type="text"
                value={companyForm.whatsapp}
                onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Resmi Merkez Adresi (Zeytinburnu)</label>
              <input
                type="text"
                value={companyForm.address}
                onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
              />
            </div>

            <div className="md:col-span-2 pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSavingCompany}
                className="px-6 py-2.5 bg-[#0b2e59] hover:bg-[#082242] text-white font-bold rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-[#ffb703]" />
                <span>{isSavingCompany ? "Kaydediliyor..." : "Firma Bilgilerini Kaydet"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
