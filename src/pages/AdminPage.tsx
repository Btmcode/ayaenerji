import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCollection } from "../utils/firebaseHooks";
import { initAuth, googleSignIn, emailSignIn, logout, auth } from "../utils/googleAuth";
import { encryptData, decryptData } from "../utils/crypto";

// Sub-module tabs
import DashboardTab from "./admin/DashboardTab";
import TaleplerTab from "./admin/TaleplerTab";
import MusterilerTab from "./admin/MusterilerTab";
import BlogTab from "./admin/BlogTab";
import AdSenseTab from "./admin/AdSenseTab";
import AyarlarTab from "./admin/AyarlarTab";
import GithubTab from "./admin/GithubTab";
import TelegramTab from "./admin/TelegramTab";

import Logo from "../components/Logo";
import {
  BarChart3,
  PhoneCall,
  Users,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  Plus,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Lock,
  Mail,
  Key,
  Github,
  Send
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUserEmail, setAdminUserEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Firestore Collections
  const { data: rawRequests, add: addRequestDb, update: updateRequestDb, remove: removeRequestDb } = useCollection("requests");
  const { data: rawCustomers, add: addCustomerDb, update: updateCustomerDb, remove: removeCustomerDb } = useCollection("customers");
  const { data: rawBlogPosts, add: addBlogDb, update: updateBlogDb, remove: removeBlogDb } = useCollection("blogPosts");
  const { data: rawAdmins, add: addAdminDb, remove: removeAdminDb } = useCollection("admins");
  const { data: rawSettings, update: updateSettingDb } = useCollection("settings");

  const requests = rawRequests || [];
  const customers = rawCustomers || [];
  const blogPosts = rawBlogPosts || [];
  const admins = rawAdmins || [];
  const generalSettingDoc = rawSettings?.find((s: any) => s.id === "general");
  const settings = {
    companyName: "Aya Elektrik - 7/24 Nöbetçi Elektrikçi & Arıza Bakım Onarım Servisi",
    phone: "0530 069 53 93",
    whatsapp: "0530 069 53 93",
    email: "ayaenerji@gmail.com",
    address: "Maltepe Mah. Yedikule Çırpıcı Yolu No: 33, Zeytinburnu / İstanbul",
    githubRepoUrl: "",
    githubBranch: "main",
    githubToken: "",
    webhookUrl: "",
    ...(generalSettingDoc || {})
  };

  // Shared Modals for Rapid Access from Dashboard
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerForm, setCustomerForm] = useState({ name: "", phone: "", service: "", status: "Aktif" });
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  // Blog Tab Helpers
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  // Toast System with Deduplication
  const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    if (!message) return;
    const toastId = `aya-${message.trim()}`;
    if (type === "success") toast.success(message, { id: toastId, duration: 3500 });
    else if (type === "error") toast.error(message, { id: toastId, duration: 4500 });
    else if (type === "warning") toast(message, { id: toastId, icon: "⚠️", duration: 4000 });
    else toast(message, { id: toastId, icon: "ℹ️", duration: 3000 });
  };

  // Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {}
  });

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Remember me email restore
  useEffect(() => {
    const saved = localStorage.getItem("aya_admin_remember_email");
    if (saved) {
      try {
        const dec = decryptData(saved);
        if (dec) setLoginEmail(dec);
      } catch {}
      setRememberMe(true);
    }
  }, []);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        if (user && user.email) {
          const emailLower = user.email.toLowerCase().trim();
          const isPrimaryAdmin = emailLower === "ayaenerji@gmail.com" || emailLower === "ahmetcafoglu@hotmail.com";
          const isDynamicAdmin = admins.some(a => (a.email || "").toLowerCase().trim() === emailLower);

          if (isPrimaryAdmin || isDynamicAdmin) {
            setAdminUserEmail(user.email);
            setIsAdminAuthenticated(true);
          } else {
            showToast("Bu e-posta hesabı yönetici yetkisine sahip değil.", "error");
            logout();
            setIsAdminAuthenticated(false);
            setAdminUserEmail(null);
          }
        }
      },
      () => {
        setIsAdminAuthenticated(false);
        setAdminUserEmail(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [admins]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const res = await googleSignIn(rememberMe);
      if (res && res.user && res.user.email) {
        const emailLower = res.user.email.toLowerCase().trim();
        const isPrimaryAdmin = emailLower === "ayaenerji@gmail.com" || emailLower === "ahmetcafoglu@hotmail.com";
        const isDynamicAdmin = admins.some(a => (a.email || "").toLowerCase().trim() === emailLower);

        if (isPrimaryAdmin || isDynamicAdmin) {
          setIsAdminAuthenticated(true);
          setAdminUserEmail(res.user.email);
          showToast("Yönetici girişi başarılı!", "success");
        } else {
          showToast("Yetkisiz Google hesabı.", "error");
          await logout();
        }
      }
    } catch (err: any) {
      setLoginError("Giriş başarısız: " + (err.message || err));
      showToast("Giriş yapılamadı.", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const res = await emailSignIn(loginEmail.trim(), loginPassword, rememberMe);
      if (res && res.user && res.user.email) {
        if (rememberMe) {
          localStorage.setItem("aya_admin_remember_email", encryptData(loginEmail.trim()));
        } else {
          localStorage.removeItem("aya_admin_remember_email");
        }
        setIsAdminAuthenticated(true);
        setAdminUserEmail(res.user.email);
        showToast("Yönetici girişi başarılı!", "success");
      }
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setLoginError("Hatalı e-posta veya şifre girdiniz.");
      } else {
        setLoginError("Giriş hatası: " + (err.message || err));
      }
      showToast("Giriş yapılamadı.", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsAdminAuthenticated(false);
    setAdminUserEmail(null);
    showToast("Oturum kapatıldı.", "info");
  };

  const handleSaveCustomer = async () => {
    if (!customerForm.name || !customerForm.phone) {
      showToast("İsim ve telefon zorunludur.", "warning");
      return;
    }
    try {
      if (editingCustomer) {
        await updateCustomerDb(editingCustomer.id, customerForm);
        showToast("Müşteri bilgileri güncellendi.", "success");
      } else {
        await addCustomerDb({
          ...customerForm,
          createdAt: new Date().toISOString()
        });
        showToast("Yeni müşteri kaydedildi.", "success");
      }
      setIsCustomerModalOpen(false);
      setEditingCustomer(null);
      setCustomerForm({ name: "", phone: "", service: "", status: "Aktif" });
    } catch (e: any) {
      showToast("Hata: " + e.message, "error");
    }
  };

  const handleDeleteCustomer = (id: string) => {
    showConfirm(
      "Müşteriyi Sil",
      "Bu müşteriyi rehberden kalıcı olarak silmek istediğinize emin misiniz?",
      async () => {
        try {
          await removeCustomerDb(id);
          showToast("Müşteri silindi.", "success");
        } catch (e: any) {
          showToast("Silme hatası: " + e.message, "error");
        }
      }
    );
  };

  // Nav items (Comprehensive Core Modules)
  const navItems = [
    { id: "Dashboard", label: "Genel Bakış", icon: BarChart3 },
    { id: "Talepler", label: "Gelen Talepler & CRM", icon: PhoneCall, badge: requests.filter(r => r.status === "Yeni Talep").length },
    { id: "Telegram", label: "Telegram Bot", icon: Send },
    { id: "Müşteriler", label: "Müşteri Rehberi", icon: Users, badge: customers.length },
    { id: "Blog", label: "Blog & İçerik", icon: FileText, badge: blogPosts.length },
    { id: "Github", label: "Github", icon: Github },
    { id: "AdSense", label: "Google AdSense", icon: DollarSign },
    { id: "Ayarlar", label: "Sistem & Güvenlik", icon: Settings },
  ];

  // 1. Unauthenticated Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center border border-slate-100">
          
          <div className="flex justify-center mb-6">
            <Link to="/" title="Ana Sayfaya Dön">
              <Logo variant="dark" className="w-52 h-auto" />
            </Link>
          </div>

          <h1 className="text-xl font-black text-slate-900 mb-1">
            Yönetim Kontrol Merkezi
          </h1>
          <p className="text-xs text-slate-500 mb-6">
            Aya Elektrik yetkili yönetici paneline erişim
          </p>

          {loginError && (
            <div className="p-3 mb-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl text-left border border-red-100">
              {loginError}
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-3.5 text-left text-xs mb-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Yönetici E-Postası</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@ayaelektrik.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Şifre</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0b2e59] focus:ring-[#0b2e59]"
                />
                <span className="text-[11px] font-medium">Beni hatırla</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 bg-[#0b2e59] hover:bg-[#082242] text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              {isLoggingIn ? "Giriş Yapılıyor..." : "Yönetici Girişi Yap"}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400 bg-white px-2">
              Veya Google İle
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Yetkili Google Hesabı ile Giriş</span>
          </button>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-[#0b2e59]">
              ← Web Sitesine Geri Dön
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Toaster position="top-right" />

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-[#0b2e59] text-white transition-all duration-300 flex flex-col justify-between ${
          sidebarCollapsed ? "lg:w-20 w-64" : "w-64"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 flex items-center justify-between border-b border-white/10">
            {!sidebarCollapsed ? (
              <Link to="/" title="Ana Sayfaya Dön" className="block">
                <Logo className="w-36 h-auto" />
              </Link>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#ffb703] text-[#0b2e59] font-black text-sm flex items-center justify-center mx-auto shadow-sm">
                AYA
              </div>
            )}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5" aria-label="Yönetim Paneli Menüsü">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#ffb703] text-slate-950 shadow-sm font-black"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  } ${sidebarCollapsed ? "justify-center" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-slate-950 text-white" : "bg-white/20 text-white"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {!sidebarCollapsed && (
            <div className="px-2 py-1 text-[11px] text-white/60 truncate">
              {adminUserEmail}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className={`flex-1 p-2 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors flex items-center justify-center gap-2 ${
                sidebarCollapsed ? "w-full" : ""
              }`}
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
              {!sidebarCollapsed && <span>Çıkış Yap</span>}
            </button>

            <Link
              to="/"
              className="p-2 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              title="Web Sitesine Git"
            >
              <Globe className="w-4 h-4" />
            </Link>
          </div>

          {/* Desktop Collapse Trigger */}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex w-full items-center justify-center py-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded-lg text-xs transition-colors"
            title={sidebarCollapsed ? "Menüyü Genişlet" : "Menüyü Daralt"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-slate-600 hover:text-[#0b2e59] rounded-lg"
              aria-label="Menüyü Aç"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-slate-800">
              Aya Elektrik Panel · <span className="text-[#0b2e59] font-extrabold">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="text-xs font-bold text-slate-600 hover:text-[#0b2e59] inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Siteyi Önizle</span>
            </Link>

            {adminUserEmail && (
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[11px] font-bold text-slate-800 leading-tight">
                  {adminUserEmail}
                </span>
                <span className="text-[10px]">
                  {adminUserEmail.toLowerCase().trim() === "ahmetcafoglu@hotmail.com" ? (
                    <span className="text-amber-600 font-black inline-flex items-center gap-1 justify-end">
                      <span className="text-amber-500">★</span> Super Admin
                    </span>
                  ) : (
                    <span className="text-blue-600 font-extrabold">Admin</span>
                  )}
                </span>
              </div>
            )}

            <div
              className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shadow-xs ${
                adminUserEmail?.toLowerCase().trim() === "ahmetcafoglu@hotmail.com"
                  ? "bg-amber-500 text-slate-950 font-black"
                  : "bg-[#0b2e59] text-[#ffb703]"
              }`}
            >
              {adminUserEmail ? adminUserEmail.charAt(0).toUpperCase() : "A"}
            </div>
          </div>
        </header>

        {/* Tab Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === "Dashboard" && (
            <DashboardTab
              setActiveTab={setActiveTab}
              requests={requests}
              customers={customers}
              blogPosts={blogPosts}
              setIsNewRequestModalOpen={setIsNewRequestModalOpen}
              setIsCustomerModalOpen={setIsCustomerModalOpen}
            />
          )}

          {activeTab === "Talepler" && (
            <TaleplerTab
              requests={requests}
              addRequestDb={addRequestDb}
              updateRequestDb={updateRequestDb}
              removeRequestDb={removeRequestDb}
              showToast={showToast}
              showConfirm={showConfirm}
              isNewRequestModalOpen={isNewRequestModalOpen}
              setIsNewRequestModalOpen={setIsNewRequestModalOpen}
            />
          )}

          {activeTab === "Telegram" && (
            <TelegramTab />
          )}

          {activeTab === "Müşteriler" && (
            <MusterilerTab
              customers={customers}
              isCustomerModalOpen={isCustomerModalOpen}
              setIsCustomerModalOpen={setIsCustomerModalOpen}
              customerForm={customerForm}
              setCustomerForm={setCustomerForm}
              editingCustomer={editingCustomer}
              setEditingCustomer={setEditingCustomer}
              handleSaveCustomer={handleSaveCustomer}
              handleDeleteCustomer={handleDeleteCustomer}
              showToast={showToast}
            />
          )}

          {activeTab === "Blog" && (
            <BlogTab
              blogPosts={blogPosts}
              addBlogDb={addBlogDb}
              updateBlogDb={updateBlogDb}
              removeBlogDb={removeBlogDb}
              showToast={showToast}
              showConfirm={showConfirm}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
              isGeneratingImage={isGeneratingImage}
              setIsGeneratingImage={setIsGeneratingImage}
              generatedContent={generatedContent}
              setGeneratedContent={setGeneratedContent}
              generatedImageUrl={generatedImageUrl}
              setGeneratedImageUrl={setGeneratedImageUrl}
            />
          )}

          {activeTab === "Github" && (
            <GithubTab
              settings={settings}
              updateSettingDb={updateSettingDb}
              requests={requests}
              customers={customers}
              blogPosts={blogPosts}
              showToast={showToast}
              showConfirm={showConfirm}
            />
          )}

          {activeTab === "AdSense" && (
            <AdSenseTab
              showToast={showToast}
              currentAdminEmail={adminUserEmail || ""}
            />
          )}

          {activeTab === "Ayarlar" && (
            <AyarlarTab
              settings={settings}
              updateSettingDb={updateSettingDb}
              admins={admins}
              addAdminDb={addAdminDb}
              removeAdminDb={removeAdminDb}
              requests={requests}
              customers={customers}
              blogPosts={blogPosts}
              showToast={showToast}
              showConfirm={showConfirm}
              currentAdminEmail={adminUserEmail || ""}
            />
          )}
        </main>

      </div>

      {/* Global Confirm Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col p-6 text-center">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              {confirmDialog.title}
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              {confirmDialog.message}
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                className="w-full px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-xs"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={confirmDialog.onConfirm}
                className="w-full px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-xs text-xs"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
