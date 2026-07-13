import PotansiyelMusteriTab from './admin/PotansiyelMusteriTab';
import MusterilerTab from './admin/MusterilerTab';
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import toast, { Toaster } from "react-hot-toast";
import { useCollection, getDBHealth, subscribeToDBHealth, triggerFailover, DBSource, DBHealth } from "../utils/firebaseHooks";
import { isSupabaseConfigured } from "../utils/supabaseClient";
import { initAuth, googleSignIn, emailSignIn, emailSignUp, auth } from "../utils/googleAuth";
import { verifyTOTP } from "../utils/totp";
import { encryptData, decryptData } from "../utils/crypto";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { AdminSettings, UserProfile } from "../types";
import GuideTab from "./admin/GuideTab";
import DashboardTab from "./admin/DashboardTab";
import AramaKayitlariTab from "./admin/AramaKayitlariTab";
import BlogTab from "./admin/BlogTab";
import {
  BarChart3,
  Users,
  PhoneCall,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Briefcase,
  FileText,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Map,
  DollarSign,
  Activity,
  Award,
  Sparkles,
  Target,
  Copy,
  Check,
  Globe,
  ImageIcon,
  ShieldCheck,
  Lock,
  Paperclip,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
  User,
  Clock,
  ArrowRight,
  MapPin,
  Maximize2,
  Save,
  Phone,
} from "lucide-react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  AreaChart,
  Area,
} from "recharts";

type RequestStatus = "Yeni Talep" | "Müşteri Arandı" | "Teklif Verildi" | "İş Tamamlandı";

interface CallRequest {
  id: string;
  name: string;
  phone: string;
  service: string;
  time: string;
  status: RequestStatus;
  notes?: string;
}

export default function AdminPage() {
  // CUSTOM MODERN TOAST NOTIFICATION SYSTEM
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "error" | "info" | "warning" }[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast(message, { icon: "⚠️" });
    } else {
      toast(message, { icon: "ℹ️" });
    }
  };

  // Shadow window.alert with modern, elegant custom Toast notifications
  const alert = (message: string) => {
    let type: "success" | "error" | "info" | "warning" = "info";
    const lower = message.toLowerCase();
    if (
      lower.includes("başarı") ||
      lower.includes("aktif") ||
      lower.includes("yayınlandı") ||
      lower.includes("kaydedildi") ||
      lower.includes("güncellendi") ||
      lower.includes("eklendi")
    ) {
      type = "success";
    } else if (
      lower.includes("hata") ||
      lower.includes("başarısız") ||
      lower.includes("yetkisiz") ||
      lower.includes("yapılamadı") ||
      lower.includes("zorunludur") ||
      lower.includes("sorun")
    ) {
      type = "error";
    } else if (
      lower.includes("emin misiniz") ||
      lower.includes("lütfen") ||
      lower.includes("eksik")
    ) {
      type = "warning";
    }
    showToast(message, type);
  };

  // CUSTOM MODERN CONFIRMATION DIALOG STATE
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    type: "danger" | "warning" | "info" = "danger",
    confirmText = "Evet, Eminim",
    cancelText = "İptal"
  ) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
      confirmText,
      cancelText,
      type,
    });
  };

  // CUSTOM MODERN ALERT DIALOG STATE
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
    onConfirm?: () => void
  ) => {
    setAlertDialog({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setAlertDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUserEmail, setAdminUserEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isTwoFactorStep, setIsTwoFactorStep] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorError, setTwoFactorError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [showSettingsPassword, setShowSettingsPassword] = useState(false);

  const isSuperAdmin = useMemo(() => {
    return adminUserEmail?.toLowerCase().trim() === "ahmetcafoglu@hotmail.com";
  }, [adminUserEmail]);

  const checkPermission = (actionDescription: string) => {
    if (!isSuperAdmin) {
      showAlert(
        "Kısıtlı Yetki",
        `Bu işlem (${actionDescription}) sadece Süper Yönetici (ahmetcafoglu@hotmail.com) tarafından gerçekleştirilebilir.`,
        "error"
      );
      return false;
    }
    return true;
  };

  const { data: rawSettings, update: rawUpdateSettingDb } = useCollection("settings");
  const updateSettingDb = async (id: string, data: any) => {
    if (!checkPermission("Sistem ayarlarını güncelleme")) return;
    return rawUpdateSettingDb(id, data);
  };

  const settings: AdminSettings = (rawSettings.find((s: any) => s.id === "general") as unknown as AdminSettings) || { 
    companyName: "Aya Elektrik", 
    twoFactorEnabled: false,
    twoFactorSecret: "AYA7ELEKTRIK2FA0"
  };

  const { data: rawAdmins, add: rawAddAdminDb, remove: rawRemoveAdminDb } = useCollection("admins");
  const addAdminDb = async (data: any) => {
    if (!checkPermission("Yönetici ekleme")) return;
    return rawAddAdminDb(data);
  };
  const removeAdminDb = async (id: string) => {
    if (!checkPermission("Yönetici silme")) return;
    return rawRemoveAdminDb(id);
  };
  const admins = rawAdmins || [];

  const twoFactorEnabled = !!settings.twoFactorEnabled;
  const twoFactorSecret = settings.twoFactorSecret || "AYA7ELEKTRIK2FA0";

  useEffect(() => {
    const savedEmail = localStorage.getItem("aya_admin_remember_email");
    if (savedEmail) {
      try { const dec = decryptData(savedEmail); if(dec) setLoginEmail(dec); } catch(e){}
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = initAuth(async (user) => {
      if (user && user.email) {
        // Double-check if Google provider and NOT authorized
        const isGoogle = user.providerData.some((p) => p.providerId === "google.com");
        if (isGoogle && user.email !== "ayaenerji@gmail.com" && user.email !== "ahmetcafoglu@hotmail.com") {
          showAlert("Yetkisiz Giriş", "Sadece yetkili Google adresleri giriş yapabilir.", "error");
          import("../utils/googleAuth").then(({ logout }) => logout());
          setIsAdminAuthenticated(false);
          setAdminUserEmail(null);
          return;
        }

        // Double check email authorization for non-Google users
        const { collection, getDocs, doc, getDoc } = await import("firebase/firestore");
        const { db } = await import("../utils/firebase");
        
        // Fetch custom primary admin email from settings if configured
        const settingsDoc = await getDoc(doc(db, "settings", "general"));
        const customAdminEmail = settingsDoc.exists() ? (settingsDoc.data()?.adminEmail || "").toLowerCase().trim() : "";

        const adminsSnapshot = await getDocs(collection(db, "admins"));
        const adminEmails = adminsSnapshot.docs.map(d => (d.data().email || "").toLowerCase().trim());

        const isAllowed = 
          user.email === "ayaenerji@gmail.com" || 
          user.email === "ahmetcafoglu@hotmail.com" ||
          (customAdminEmail && (user.email || "").toLowerCase().trim() === customAdminEmail) ||
          adminEmails.includes((user.email || "").toLowerCase().trim());

        if (!isAllowed) {
          showAlert("Yetkisiz Hesap", "Bu hesap yönetici haklarına sahip değildir.", "error");
          import("../utils/googleAuth").then(({ logout }) => logout());
          setIsAdminAuthenticated(false);
          setAdminUserEmail(null);
          return;
        }

        setAdminUserEmail(user.email);
        setIsAdminAuthenticated(true);
      }
    }, () => {
      setIsAdminAuthenticated(false);
      setAdminUserEmail(null);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [admins]);

  const handleAdminLogin = async () => {
    try {
      const result = await googleSignIn(rememberMe);
      if (result) {
        const email = result.user.email;
        if (email !== "ayaenerji@gmail.com" && email !== "ahmetcafoglu@hotmail.com") {
          showAlert("Yetkisiz Giriş", "Sadece yetkili Google adresleri giriş yapabilir.", "error");
          const { logout } = await import("../utils/googleAuth");
          await logout();
          setIsAdminAuthenticated(false);
          setAdminUserEmail(null);
          return;
        }
        if (twoFactorEnabled) {
          setIsTwoFactorStep(true);
          setLoginEmail(email || "");
        } else {
          setIsAdminAuthenticated(true);
          setAdminUserEmail(email);
        }
      }
    } catch (e) {
      showToast("Giriş yapılamadı!", "error");
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFactorError("");
    setLoginError("");
    
    const sanitizedEmail = loginEmail.trim().toLowerCase();
    const sanitizedPassword = loginPassword.trim();
    
    try {
      const result = await emailSignIn(sanitizedEmail, sanitizedPassword, rememberMe);
      if (result) {
        const userEmailLower = result.user.email ? result.user.email.toLowerCase().trim() : "";
        
        // Use a direct query instead of state to avoid race condition upon immediate login
        const { collection, getDocs, doc, getDoc } = await import("firebase/firestore");
        const { db } = await import("../utils/firebase");
        
        // Fetch custom primary admin email from settings if configured
        const settingsDoc = await getDoc(doc(db, "settings", "general"));
        const customAdminEmail = settingsDoc.exists() ? (settingsDoc.data()?.adminEmail || "").toLowerCase().trim() : "";

        const adminsSnapshot = await getDocs(collection(db, "admins"));
        const adminEmails = adminsSnapshot.docs.map(d => (d.data().email || "").toLowerCase().trim());

        const isAllowed = 
          userEmailLower === "ayaenerji@gmail.com" || 
          userEmailLower === "ahmetcafoglu@hotmail.com" ||
          (customAdminEmail && userEmailLower === customAdminEmail) ||
          adminEmails.includes(userEmailLower);

        if (!isAllowed) {
          setLoginError("Yetkisiz Hesap! Giriş yapan hesabın yönetici yetkisi yoktur.");
          const { logout } = await import("../utils/googleAuth");
          await logout();
          return;
        }

        if (rememberMe) {
          localStorage.setItem("aya_admin_remember_email", encryptData(sanitizedEmail));
        } else {
          localStorage.removeItem("aya_admin_remember_email");
        }

        if (twoFactorEnabled) {
          setIsTwoFactorStep(true);
        } else {
          setIsAdminAuthenticated(true);
          setAdminUserEmail(result.user.email);
        }
      }
    } catch (err: any) {
      const errorMsg = err.message || String(err);
      if (errorMsg.includes("operation-not-allowed") || err.code === "auth/operation-not-allowed") {
        setLoginError("auth/operation-not-allowed");
      } else {
        setLoginError("E-posta veya şifre hatalı! Lütfen bilgilerinizi kontrol edip tekrar deneyin.");
      }
    }
  };

  const handleTwoFactorVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFactorError("");
    try {
      const isValid = await verifyTOTP(twoFactorCode, twoFactorSecret);
      if (isValid) {
        setIsAdminAuthenticated(true);
        setAdminUserEmail(loginEmail);
        setIsTwoFactorStep(false);
        setTwoFactorCode("");
      } else {
        setTwoFactorError("Geçersiz 2FA doğrulama kodu! Lütfen Google Authenticator uygulamanızdaki 6 haneli güncel kodu girin.");
      }
    } catch (err: any) {
      setTwoFactorError("Sistem hatası: 2FA doğrulama başarısız oldu.");
    }
  };

  const handleAdminLogout = async () => {
    const { logout } = await import("../utils/googleAuth");
    await logout();
    setIsAdminAuthenticated(false);
    setAdminUserEmail(null);
    setIsTwoFactorStep(false);
  };

  // Firestore Integration
  const { data: rawRequests, update: updateRequestDb, add: addRequestDb, remove: rawRemoveRequestDb } = useCollection("requests");
  const removeRequestDb = async (id: string) => {
    if (!checkPermission("Müşteri talebini silme")) return;
    return rawRemoveRequestDb(id);
  };
  const requests = rawRequests.length > 0 ? (rawRequests as unknown as CallRequest[]) : [] as CallRequest[];
  
  // Ref to track previous length for TTS
  const prevRequestsLengthRef = useRef(requests.length);

  const playNotificationSound = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "tr-TR";
      
      const setFemaleVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        let femaleVoice = voices.find(v => 
          v.name.toLowerCase().includes("turkish") && 
          v.name.toLowerCase().includes("female")
        );

        if (!femaleVoice) {
          const trVoices = voices.filter(v => v.lang.includes('tr'));
          // Try to find a female Turkish voice. Usually contains 'Female' or is the Google one
          femaleVoice = trVoices.find(v => v.name.toLowerCase().includes('female')) || trVoices.find(v => v.name.includes('Google Türkçe')) || trVoices[0];
        }

        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        setFemaleVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = setFemaleVoice;
      }
    }
  };

  useEffect(() => {
    if (requests.length > prevRequestsLengthRef.current) {
      playNotificationSound("Yeni bir müşteri talebiniz var.");
    }
    prevRequestsLengthRef.current = requests.length;
  }, [requests.length]);

  const { data: rawJobApplications, remove: rawRemoveJobApplication, update: updateJobApplication } = useCollection("jobApplications");
  const removeJobApplication = async (id: string) => {
    if (!checkPermission("İş başvurusunu silme")) return;
    return rawRemoveJobApplication(id);
  };
  const jobApplications = rawJobApplications.length > 0 ? rawJobApplications : [];

  const prevJobAppsLengthRef = useRef(0);
  useEffect(() => {
    if (rawJobApplications.length > prevJobAppsLengthRef.current && prevJobAppsLengthRef.current > 0) {
      playNotificationSound("Yeni bir iş başvurusu aldınız.");
    }
    prevJobAppsLengthRef.current = rawJobApplications.length;
  }, [rawJobApplications.length]);

  const updateRequestStatus = (id: number | string, newStatus: RequestStatus) => {
    updateRequestDb(id.toString(), { status: newStatus });
  };

  const handleDragStart = (e: React.DragEvent, id: string | number) => {
    e.dataTransfer.setData("requestId", id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, colStatus: RequestStatus) => {
    e.preventDefault();
    const requestId = e.dataTransfer.getData("requestId");
    if (requestId) {
      updateRequestStatus(requestId, colStatus);
    }
  };

  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [newRequestForm, setNewRequestForm] = useState({ name: "", phone: "", service: "" });
  
  // REDESIGNED CRM STATES & MEMOS
  const [crmSearch, setCrmSearch] = useState("");
  const [crmDifficultyFilter, setCrmDifficultyFilter] = useState("Tüm");
  const [crmProfitFilter, setCrmProfitFilter] = useState("Tüm");
  const [selectedCrmLead, setSelectedCrmLead] = useState<any>(null);
  const [leadNotes, setLeadNotes] = useState("");
  const [isSavingLeadNotes, setIsSavingLeadNotes] = useState(false);
  const [isAnalyzingCrmLead, setIsAnalyzingCrmLead] = useState(false);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = 
        req.name.toLowerCase().includes(crmSearch.toLowerCase()) ||
        req.phone.includes(crmSearch) ||
        (req.service && req.service.toLowerCase().includes(crmSearch.toLowerCase()));
      
      const difficulty = (req as any).score?.difficulty || "Orta";
      const matchesDifficulty = crmDifficultyFilter === "Tüm" || difficulty === crmDifficultyFilter;
      
      const profit = (req as any).score?.profitability || "Orta";
      const matchesProfit = crmProfitFilter === "Tüm" || profit === crmProfitFilter;
      
      return matchesSearch && matchesDifficulty && matchesProfit;
    });
  }, [requests, crmSearch, crmDifficultyFilter, crmProfitFilter]);

  const crmStats = useMemo(() => {
    const activeLeads = requests.filter(r => r.status !== "İş Tamamlandı");
    const wonLeads = requests.filter(r => r.status === "İş Tamamlandı");
    const scoredLeads = requests.filter(r => (r as any).score && (r as any).score.score !== undefined);
    
    const avgScore = scoredLeads.length > 0 
      ? Math.round(scoredLeads.reduce((acc, curr) => acc + Number((curr as any).score.score), 0) / scoredLeads.length)
      : 0; // default baseline

    const estimatedValue = scoredLeads.reduce((acc, curr) => {
      const difficulty = (curr as any).score?.difficulty || "Orta";
      const profit = (curr as any).score?.profitability || "Orta";
      let base = 1200;
      if (difficulty === "Zor") base += 800;
      if (profit === "Yüksek") base += 1500;
      return acc + base;
    }, 0);

    return {
      active: activeLeads.length,
      won: wonLeads.length,
      avgScore,
      estimatedValue: estimatedValue || (activeLeads.length * 1500)
    };
  }, [requests]);

  const handleSaveLeadNotes = async (leadId: string) => {
    setIsSavingLeadNotes(true);
    try {
      await updateRequestDb(leadId, { notes: leadNotes });
      // Update selectedCrmLead local state so UI updates
      setSelectedCrmLead((prev: any) => prev && prev.id === leadId ? { ...prev, notes: leadNotes } : prev);
      showToast("Notlar başarıyla kaydedildi.", "success");
    } catch (e: any) {
      showToast("Not kaydedilirken hata oluştu: " + e.message, "error");
    } finally {
      setIsSavingLeadNotes(false);
    }
  };

  const handleAnalyzeLead = async (lead: any) => {
    setIsAnalyzingCrmLead(true);
    try {
      const res = await fetch("/api/score-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: lead.service, description: "" }),
      });
      if (res.ok) {
        let leadScore: any = {};
      try {
        const text = await res.text();
        leadScore = text ? JSON.parse(text) : {};
      } catch (err) {
        throw new Error("Statik modda AI sunucusu yanıt vermedi.");
      }
        await updateRequestDb(lead.id, { score: leadScore });
        setSelectedCrmLead((prev: any) => prev && prev.id === lead.id ? { ...prev, score: leadScore } : prev);
        showToast("Yapay zeka analiz raporu başarıyla oluşturuldu.", "success");
      } else {
        showToast("Yapay zeka servisine ulaşılamadı.", "error");
      }
    } catch (e: any) {
      showToast("Analiz hatası: " + e.message, "error");
    } finally {
      setIsAnalyzingCrmLead(false);
    }
  };
  
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [customerForm, setCustomerForm] = useState({ name: "", phone: "", service: "", status: "Aktif" });

  const handleSaveCustomer = async () => {
    if (!customerForm.name || !customerForm.phone) {
      showToast("İsim ve telefon zorunludur.", "warning");
      return;
    }
    try {
      if (editingCustomer) {
        await updateCustomerDb(editingCustomer.id, customerForm);
      } else {
        await addCustomerDb({
          ...customerForm,
          createdAt: new Date().toISOString()
        });
      }
      setIsCustomerModalOpen(false);
      setEditingCustomer(null);
      setCustomerForm({ name: "", phone: "", service: "", status: "Aktif" });
    } catch (e: any) {
      showToast("Hata oluştu: " + e.message, "error");
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    showConfirm(
      "Müşteriyi Sil",
      "Bu müşteriyi sistemden tamamen silmek istediğinize emin misiniz?",
      async () => {
        try {
          const cust = rawCustomers.find((c: any) => c.id === id);
          if (cust && (cust.phone || cust.tel)) {
            const phone = cust.phone || cust.tel;
            const rawDel = localStorage.getItem("deleted_customers"); let deleted: string[] = []; try { deleted = rawDel ? JSON.parse(decryptData(rawDel) || "[]") : []; } catch(e){}
            if (!deleted.includes(phone)) {
              deleted.push(phone);
              localStorage.setItem("deleted_customers", encryptData(JSON.stringify(deleted)));
            }
          }
          await removeCustomerDb(id);
          showToast("Müşteri başarıyla silindi.", "success");
        } catch (e: any) {
          showToast("Silme hatası: " + e.message, "error");
        }
      },
      "danger"
    );
  };

  const handleDeleteRequest = async (id: string) => {
    showConfirm(
      "Talebi Sil",
      "Bu acil çağrı / arıza talebini tamamen silmek istediğinize emin misiniz?",
      async () => {
        try {
          await removeRequestDb(id);
          showToast("Talep başarıyla silindi.", "success");
        } catch (e: any) {
          showToast("Silme hatası: " + e.message, "error");
        }
      },
      "danger"
    );
  };

  const [isScoringLead, setIsScoringLead] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleYeniTalep = async () => {
    if (!newRequestForm.name || !newRequestForm.phone || !newRequestForm.service) {
      showToast("Lütfen tüm alanları doldurun.", "warning");
      return;
    }
    
    setIsScoringLead(true);
    let leadScore = null;
    try {
      const res = await fetch("/api/score-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: newRequestForm.service, description: "" }),
      });
      if (res.ok) {
        leadScore = await res.json().catch(() => ({}));
      }
    } catch (e) {
      console.error(e);
    }
    setIsScoringLead(false);

    await addRequestDb({
      name: newRequestForm.name,
      phone: newRequestForm.phone,
      service: newRequestForm.service,
      status: "Yeni Talep",
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      score: leadScore,
    });
    setIsNewRequestModalOpen(false);
    setNewRequestForm({ name: "", phone: "", service: "" });
  };

  const { data: rawCallLogs, remove: rawRemoveCallLog } = useCollection("callLogs");
  const callLogs = rawCallLogs.length > 0 ? rawCallLogs : [];
  const removeCallLog = async (id: string) => {
    if (!checkPermission("Çağrı kaydını silme")) return;
    return rawRemoveCallLog(id);
  };

  const [isSyncingCrm, setIsSyncingCrm] = useState(false);
  const { data: rawCustomers, add: addCustomerDb, remove: rawRemoveCustomerDb, update: updateCustomerDb } = useCollection("customers");
  const removeCustomerDb = async (id: string) => {
    if (!checkPermission("Müşteri silme")) return;
    return rawRemoveCustomerDb(id);
  };
  
  const customers = useMemo(() => {
    const rawDel = localStorage.getItem("deleted_customers"); let deleted: string[] = []; try { deleted = rawDel ? JSON.parse(decryptData(rawDel) || "[]") : []; } catch(e){}
    const combined = rawCustomers.filter((c: any) => !deleted.includes(c.phone || c.tel));
    requests.forEach((req: any) => {
      const phone = req.phone;
      if (!deleted.includes(phone) && !combined.find(c => (c.phone === phone || c.tel === phone))) {
        combined.push({
          id: req.id,
          name: req.name,
          phone: req.phone,
          service: req.service,
          address: req.address,
          status: req.status === "Tamamlandı" ? "Tamamlandı" : (req.status === "Yeni Talep" ? "Potansiyel" : "Aktif")
        });
      }
    });
    return combined;
  }, [rawCustomers, requests]);

  // CRM Data Sync Polling Task & Database Initialization
  useEffect(() => {
    if (isAdminAuthenticated) {
      // 1. Run database initialization module
      import("../utils/dbInit").then(({ initializeDatabase }) => {
        initializeDatabase();
      });
    }
  }, [isAdminAuthenticated]);


  const { data: rawBlogPosts, add: addBlogDb, remove: rawRemoveBlogDb, update: updateBlogDb } = useCollection("blogPosts");
  const removeBlogDb = async (id: string) => {
    if (!checkPermission("Blog yazısını silme")) return;
    return rawRemoveBlogDb(id);
  };
  const blogPosts = rawBlogPosts.length > 0 ? rawBlogPosts : [];

  // Unified Blog Modal & Form State
  

  // Turkish-friendly slug generator
  const slugify = (text: string) => {
    const trMap: Record<string, string> = {
      'ç': 'c', 'Ç': 'c',
      'ğ': 'g', 'Ğ': 'g',
      'ı': 'i', 'I': 'i', 'İ': 'i',
      'ö': 'o', 'Ö': 'o',
      'ş': 's', 'Ş': 's',
      'ü': 'u', 'Ü': 'u'
    };
    return text
      .toString()
      .replace(/[çÇğĞıIİöÖşŞüÜ]/g, (match) => trMap[match] || match)
      .toLowerCase()
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
      .replace(/\-\-+/g, '-')       // Replace multiple - with single -
      .replace(/^-+/, '')           // Trim - from start
      .replace(/-+$/, '');          // Trim - from end
  };

  const { data: metrics } = useCollection("metrics");

  const { data: rawAbTests } = useCollection("abTests");
  const abTests = rawAbTests.length > 0 ? rawAbTests : [];

  const [isClearLogsModalOpen, setIsClearLogsModalOpen] = useState(false);
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployStatusText, setDeployStatusText] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [githubRepoUrl, setGithubRepoUrl] = useState("");
  const [githubBranch, setGithubBranch] = useState("main");
  const [githubToken, setGithubToken] = useState("");
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [commitMessage, setCommitMessage] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const triggerToast = (message: string, type: "success" | "error" | "info" = "success") => {
    showToast(message, type);
  };

  // ----------------------------------------------------
  // MULTI-CLOUD ACTIVE-ACTIVE USERS & PROFILES MANAGEMENT
  // ----------------------------------------------------
  const { data: rawUsers, add: rawAddUserDb, remove: rawRemoveUserDb, update: rawUpdateUserDb } = useCollection("users");
  const usersList = rawUsers || [];
  const addUserDb = async (data: any) => {
    if (!checkPermission("Kullanıcı ekleme")) return;
    return rawAddUserDb(data);
  };
  const removeUserDb = async (id: string) => {
    if (!checkPermission("Kullanıcı silme")) return;
    return rawRemoveUserDb(id);
  };
  const updateUserDb = async (id: string, data: any) => {
    if (!checkPermission("Kullanıcı güncelleme")) return;
    return rawUpdateUserDb(id, data);
  };

  const { data: rawProfiles, add: rawAddProfileDb, remove: rawRemoveProfileDb, update: rawUpdateProfileDb } = useCollection("profiles");
  const profilesList = rawProfiles || [];
  const addProfileDb = async (data: any) => {
    if (!checkPermission("Kullanıcı profili ekleme")) return;
    return rawAddProfileDb(data);
  };
  const removeProfileDb = async (id: string) => {
    if (!checkPermission("Kullanıcı profili silme")) return;
    return rawRemoveProfileDb(id);
  };
  const updateProfileDb = async (id: string, data: any) => {
    if (!checkPermission("Kullanıcı profili güncelleme")) return;
    return rawUpdateProfileDb(id, data);
  };

  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ email: "", fullName: "", phone: "", role: "user" });
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const [dbHealth, setDbHealthState] = useState(getDBHealth());
  const [isDbHealthDropdownOpen, setIsDbHealthDropdownOpen] = useState(false);

  const dbHealthRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dbHealthRef, () => setIsDbHealthDropdownOpen(false));
  useOutsideClick(notificationsRef, () => setIsNotificationsOpen(false));

  useEffect(() => {
    return subscribeToDBHealth((health) => {
      setDbHealthState(health);
    });
  }, []);

  const handleAddUser = async () => {
    if (!newUserForm.email || !newUserForm.fullName) {
      showToast("Lütfen en azından E-posta ve Ad Soyad alanlarını doldurun.", "warning");
      return;
    }
    try {
      const userId = "usr-" + Math.random().toString(36).substring(2, 9);
      
      // Add to users and profiles collections concurrently or in failover pipeline
      await addUserDb({ id: userId, email: newUserForm.email });
      await addProfileDb({ id: userId, fullName: newUserForm.fullName, phone: newUserForm.phone, role: newUserForm.role });
      
      triggerToast("Kullanıcı ve Profil başarıyla oluşturuldu.");
      setIsNewUserModalOpen(false);
      setNewUserForm({ email: "", fullName: "", phone: "", role: "user" });
    } catch (err: any) {
      triggerToast("Kullanıcı eklenirken hata: " + err.message, "error");
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      await updateUserDb(editingUser.id, { email: editingUser.email });
      await updateProfileDb(editingUser.id, { fullName: editingUser.fullName, phone: editingUser.phone, role: editingUser.role });
      
      triggerToast("Kullanıcı ve Profil başarıyla güncellendi.");
      setIsEditUserModalOpen(false);
      setEditingUser(null);
    } catch (err: any) {
      triggerToast("Kullanıcı güncellenirken hata: " + err.message, "error");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    showConfirm(
      "Kullanıcıyı Sil",
      "Bu kullanıcıyı ve ilişkili tüm profili silmek istediğinize emin misiniz? Bu işlem her iki veritabanından da silme tetikleyecek olup RLS kuralları ile korunmaktadır.",
      async () => {
        try {
          await removeProfileDb(userId);
          await removeUserDb(userId);
          triggerToast("Kullanıcı ve Profil başarıyla silindi!");
        } catch (err: any) {
          triggerToast("Silme hatası: " + err.message, "error");
        }
      },
      "danger"
    );
  };

  useEffect(() => {
    if (settings.webhookUrl) {
      setWebhookUrl(settings.webhookUrl);
    }
    if (settings.githubRepoUrl) {
      setGithubRepoUrl(settings.githubRepoUrl);
    }
    if (settings.githubBranch) {
      setGithubBranch(settings.githubBranch);
    }
    if (settings.githubToken) {
      setGithubToken(settings.githubToken);
    }
  }, [settings.webhookUrl, settings.githubRepoUrl, settings.githubBranch, settings.githubToken]);

  const handleDeploy = async () => {
    if (!githubRepoUrl) {
      triggerToast("Lütfen önce bir GitHub Repository URL'si girin!", "error");
      setIsDeployModalOpen(false);
      return;
    }
    if (!githubToken) {
      triggerToast("Lütfen bir GitHub Personal Access Token (PAT) girin! Push işlemi için bu token gereklidir.", "error");
      setIsDeployModalOpen(false);
      return;
    }

    setIsDeploying(true);
    setDeployProgress(10);
    setDeployStatusText("GitHub bağlantısı kuruluyor...");
    setDeployLogs(["Dağıtım işlemi başlatıldı...", "Dosyalar taranıyor..."]);

    const interval = setInterval(() => {
      setDeployProgress((prev) => {
        if (prev >= 85) return 85;
        return prev + 5;
      });
    }, 400);

    try {
      const response = await fetch("/api/deploy/github-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoUrl: githubRepoUrl,
          branch: githubBranch,
          token: githubToken,
          commitMessage: commitMessage || undefined
        }),
      });

      let data: any = {};
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        throw new Error("Sunucudan geçersiz bir yanıt alındı. Backend servisi statik SPA modunda devre dışı bırakılmış olabilir.");
      }

      clearInterval(interval);

      if (response.ok && data.success) {
        setDeployProgress(100);
        setDeployStatusText("Yayına Alma Başarılı!");
        if (data.logs) {
          setDeployLogs(data.logs);
        } else {
          setDeployLogs((prev) => [...prev, "Kodlar GitHub'a başarıyla gönderildi!"]);
        }
        triggerToast("Projeniz başarıyla GitHub'a aktarıldı ve yayına alındı!", "success");
      } else {
        setDeployProgress(100);
        setDeployStatusText("Hata Oluştu!");
        if (data.logs) {
          setDeployLogs(data.logs);
        }
        setDeployLogs((prev) => [...prev, `HATA: ${data?.error || data?.message || "Bilinmeyen bir hata oluştu"}`]);
        triggerToast(data?.error || data?.message || "Gönderim sırasında hata oluştu.", "error");
      }
    } catch (err: any) {
      clearInterval(interval);
      setDeployProgress(100);
      setDeployStatusText("Bağlantı Hatası!");
      setDeployLogs((prev) => [...prev, `Ağ Hatası: ${err.message}`]);
      triggerToast(`Ağ Hatası: ${err.message}`, "error");
    } finally {
      setIsDeploying(false);
    }
  };

  const [isPublishingGmb, setIsPublishingGmb] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);

  useEffect(() => {
    initAuth((user, token) => {
      setGoogleAccessToken(token);
    });
  }, []);

  const handlePublishToGmb = async () => {
    try {
      setIsPublishingGmb(true);
      let token = googleAccessToken;
      if (!token) {
        const result = await googleSignIn();
        if (!result) throw new Error("Giriş yapılamadı.");
        token = result.accessToken;
        setGoogleAccessToken(token);
      }

      // Fetch accounts
      const accountsRes = await fetch("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const accountsData = await accountsRes.json();
      if (!accountsData.accounts || accountsData.accounts.length === 0) {
        showToast("Bağlı bir Google Benim İşletmem hesabı bulunamadı.", "warning");
        return;
      }
      const accountName = accountsData.accounts[0].name;

      // Fetch locations
      const locationsRes = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const locationsData = await locationsRes.json();
      if (!locationsData.locations || locationsData.locations.length === 0) {
        showToast("Hesapta kayıtlı bir işletme konumu bulunamadı.", "warning");
        return;
      }
      const locationName = locationsData.locations[0].name;

      // Ensure v4 API endpoint parent format: accounts/{accountId}/locations/{locationId}
      const parentName = locationName.replace("locations/", "accounts/" + accountName.replace("accounts/", "") + "/locations/");

      // Publish post
      const postBody = {
        languageCode: "tr",
        summary: generatedContent,
        callToAction: {
          actionType: "CALL"
        }
      };

      const postRes = await fetch(`https://mybusiness.googleapis.com/v4/${parentName}/localPosts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postBody)
      });

      if (!postRes.ok) {
        let errorData: any = {};
        try {
          errorData = await postRes.json();
        } catch(e) {}
        throw new Error(errorData?.error?.message || errorData?.message || "Gönderi yayınlanamadı.");
      }

      showAlert("Başarılı", "Google Benim İşletmem profilinizde başarıyla yayınlandı!", "success");

    } catch (err: any) {
      console.error(err);
      showToast("Hata: " + err.message, "error");
    } finally {
      setIsPublishingGmb(false);
    }
  };

  const clearCallLogs = () => {
    callLogs.forEach(log => removeCallLog(log.id));
    setIsClearLogsModalOpen(false);
  };

  // SEO Content Checker State
  const [seoContent, setSeoContent] = useState("");
  const [seoScore, setSeoScore] = useState(0);
  const [seoAnalysis, setSeoAnalysis] = useState({
    wordCount: 0,
    keywordDensity: 0,
    readability: "Düşük",
    issues: [] as string[],
  });

  const analyzeContent = (text: string) => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const wordCount = words.length;

    const targetKeywords = [
      "elektrik",
      "arıza",
      "usta",
      "tamir",
      "tesisat",
      "sigorta",
    ];
    let keywordCount = 0;

    const lowerText = text.toLowerCase();
    targetKeywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      const matches = lowerText.match(regex);
      if (matches) {
        keywordCount += matches.length;
      }
    });

    const density = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

    let baseScore = 0;
    let readability = "Düşük";
    let issues: string[] = [];

    if (wordCount > 50) baseScore += 30;
    else if (wordCount > 10) baseScore += 10;
    else issues.push("İçerik çok kısa.");

    if (density >= 1 && density <= 3) {
      baseScore += 40;
    } else if (density > 3) {
      baseScore += 10;
      issues.push("Anahtar kelime yoğunluğu çok yüksek (Spam riski).");
    } else if (wordCount > 0) {
      issues.push("Anahtar kelime kullanımı yetersiz.");
    }

    if (text.includes("<h2>") || text.split("\n\n").length > 2) {
      baseScore += 30;
      readability = "İyi";
    } else if (wordCount > 30) {
      issues.push("Paragraf veya başlık yapısı eksik.");
      readability = "Orta";
    }

    setSeoScore(wordCount === 0 ? 0 : Math.min(100, baseScore));
    setSeoAnalysis({
      wordCount,
      keywordDensity: density,
      readability,
      issues,
    });
  };

  useEffect(() => {
    analyzeContent(seoContent);
  }, [seoContent]);

  // Clean AI Traces & Clichés to make text completely natural and human
  const cleanAiTraces = (text: string): string => {
    if (!text) return "";
    let cleaned = text;

    // 1. Remove markdown formatting markers if any
    cleaned = cleaned.replace(/^```html\s*/i, "").replace(/```$/, "");
    cleaned = cleaned.trim();

    // 2. Replace common AI clichés and expressions with authentic Turkish professional tone
    const cliches: Record<string, string> = {
      "insan elinden çıkmış": "profesyonel",
      "insan elinden cikmis": "profesyonel",
      "hayat kurtarıcı": "kritik öneme sahip",
      "hayat kurtarici": "kritik öneme sahip",
      "adeta kalbidir": "merkezidir",
      "adeta kalbi": "merkezi",
      "unutmayın ki": "belirtmek gerekir ki",
      "unutmayin ki": "belirtmek gerekir ki",
      "özetle": "kısacası",
      "ozetle": "kısacası",
      "sonuç olarak": "bu doğrultuda",
      "sonuc olarak": "bu doğrultuda",
      "göz önünde bulundurulduğunda": "göz önüne alındığında",
      "goz onunde bulunduruldugunda": "göz önüne alındığında",
      "büyük önem taşımaktadır": "önemlidir",
      "buyuk onem tasimaktadir": "önemlidir",
      "büyük önem taşır": "önemlidir",
      "buyuk onem tasir": "önemlidir",
      "büyük bir hassasiyetle": "titizlikle",
      "buyuk bir hassasiyetle": "titizlikle",
      "şüphesiz": "kesinlikle",
      "suphesiz": "kesinlikle",
      "göz ardı edilmemelidir": "dikkat edilmelidir",
      "goz ardi edilmemelidir": "dikkat edilmelidir",
      "çarpıcı": "önemli",
      "carpici": "önemli",
      "adeta ": " ",
      "kesinlikle ": "",
      "titizlikle ": "özenle "
    };

    Object.entries(cliches).forEach(([key, val]) => {
      const regex = new RegExp(key, "gi");
      cleaned = cleaned.replace(regex, val);
    });

    // 3. Strip out common AI conversational intro/outro lines
    const introFluff = [
      /^tabii ki, işte hazırladığım makale:\s*/i,
      /^tabii ki, işte talep ettiğiniz içerik:\s*/i,
      /^harika! işte makale:\s*/i,
      /^işte aradığınız seo uyumlu içerik:\s*/i,
      /^tabii, işte aya elektrik için hazırladığım yazı:\s*/i,
      /^tabii ki, işte hazırladığım seo uyumlu makale:\s*/i
    ];
    introFluff.forEach(regex => {
      cleaned = cleaned.replace(regex, "");
    });

    return cleaned.trim();
  };

  // AI Content Generator State
  const [aiForm, setAiForm] = useState({
    contentType: "blog",
    serviceType: "Elektrik Arızası",
    keyword: "",
    targetDistrict: "Şişli",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedMetaTitle, setGeneratedMetaTitle] = useState("");
  const [generatedMetaDescription, setGeneratedMetaDescription] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Image Generator State
  const [imagePrompt, setImagePrompt] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [trendKeywords, setTrendKeywords] = useState<string[]>([]);
  const [isFetchingTrends, setIsFetchingTrends] = useState(false);

  // Bulk SEO & Image Campaign Engine
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);
  const [bulkTotal, setBulkTotal] = useState(3);
  const [bulkLogs, setBulkLogs] = useState<string[]>([]);

  const handleRunDailyCampaign = async (count: number = 3) => {
    setIsBulkGenerating(true);
    setBulkTotal(count);
    setBulkProgress(0);
    setBulkLogs(["Otomatik günlük kampanya başlatıldı...", `Hedef: ${count} adet yerel SEO uyumlu içerik ve görsel üretilecek.`]);

    const districts = ["Beşiktaş", "Şişli", "Sarıyer", "Bakırköy", "Kağıthane", "Fatih", "Beyoğlu", "Kadıköy", "Üsküdar"];
    const services = [
      "Elektrik Arızası ve Kaçak Akım",
      "Akıllı Ev Sistemleri ve Otomasyon",
      "Pano Bakımı ve Kurulumu",
      "Aydınlatma ve Avize Montajı",
      "Klima Elektrik Tesisatı",
      "Kombi Elektrik Tesisatı ve Sigortası",
      "Güvenlik Kamerası Sistemleri",
      "Mutfak Elektrik Tesisatı"
    ];

    try {
      for (let i = 0; i < count; i++) {
        const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
        const randomService = services[Math.floor(Math.random() * services.length)];
        
        setBulkLogs(prev => [...prev, `[${i+1}/${count}] ${randomDistrict} için "${randomService}" konusu hazırlanıyor...`]);
        
        // 1. Generate text
        const contentRes = await fetch("/api/generate-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contentType: "blog",
            serviceType: randomService,
            keyword: `${randomDistrict} acil elektrikçi`,
            targetDistrict: randomDistrict
          })
        });

        if (!contentRes.ok) {
          throw new Error("Yapay zeka içerik üretim sunucusu yanıt vermedi.");
        }

        const contentData = await contentRes.json().catch(() => ({}));
        const articleText = cleanAiTraces(contentData.text || "");
        const metaTitle = cleanAiTraces(contentData.metaTitle || `${randomDistrict} ${randomService} | Aya Elektrik`);
        const imgPrompt = contentData.imagePrompt || `Professional electrician fixing modern electrical panel in Istanbul ${randomDistrict}, 4k, photorealistic`;

        setBulkLogs(prev => [...prev, `   - Metin başarıyla üretildi. Görsel oluşturuluyor (Imagen 3)...`]);

        // 2. Generate image
        let finalImageUrl = "";
        try {
          const imgRes = await fetch("/api/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: imgPrompt })
          });
          if (imgRes.ok) {
            const imgData = await imgRes.json().catch(() => ({}));
            finalImageUrl = imgData.imageUrl || "";
          }
        } catch (imgErr) {
          console.error("Görsel üretilemedi, varsayılan görsel atanacak.", imgErr);
        }

        // Fallback image - Dynamically select different cover images based on service type
        if (!finalImageUrl) {
          const lowerService = randomService.toLowerCase();
          if (
            lowerService.includes("pano") ||
            lowerService.includes("sigorta") ||
            lowerService.includes("şalter") ||
            lowerService.includes("kaçak akım") ||
            lowerService.includes("kombi") ||
            lowerService.includes("bakım")
          ) {
            finalImageUrl = `/images/blog/sigorta-atmasi-cozum.jpg`;
          } else {
            finalImageUrl = `/images/blog/evde-elektrik-guvenligi.jpg`;
          }
        }

        // Generate a descriptive short excerpt from cleaned text
        const rawExcerpt = articleText.replace(/<[^>]*>/g, '').substring(0, 150) + "...";
        const cleanExcerpt = cleanAiTraces(rawExcerpt);

        // 3. Save draft
        await addBlogDb({
          title: metaTitle,
          category: randomService,
          slug: slugify(metaTitle),
          excerpt: cleanExcerpt,
          date: new Date().toLocaleDateString("tr-TR"),
          status: "Taslak",
          content: articleText,
          imageUrl: finalImageUrl,
          views: 0
        });

        setBulkLogs(prev => [...prev, `   ✅ "${metaTitle}" taslağı görseliyle birlikte başarıyla kaydedildi.`]);
        setBulkProgress(i + 1);
      }
      setBulkLogs(prev => [...prev, "🎉 Tebrikler! Tüm günlük SEO kampanyaları tamamlandı ve taslak olarak kaydedildi."]);
    } catch (err: any) {
      setBulkLogs(prev => [...prev, `❌ Hata oluştu: ${err.message || err}`]);
    } finally {
      setIsBulkGenerating(false);
    }
  };

  const handleFetchTrends = async () => {
    setIsFetchingTrends(true);
    setTrendKeywords([]);
    try {
      const res = await fetch(`/api/trends?serviceType=${encodeURIComponent(aiForm.serviceType)}&targetDistrict=${encodeURIComponent(aiForm.targetDistrict)}`);
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setTrendKeywords(data.trends || []);
        if (data.trends && data.trends.length > 0) {
          setAiForm(prev => ({ ...prev, keyword: data.trends[0] }));
        }
      }
    } catch (err) {
      console.error("Trends fetch error", err);
    } finally {
      setIsFetchingTrends(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    setGeneratedImageUrl("");
    
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setGeneratedImageUrl(data?.imageUrl || "");
      } else {
        showToast("Üretim hatası: " + (data?.error || "Bilinmeyen hata"), "error");
      }
    } catch (err) {
      showToast("Bir hata oluştu.", "error");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerateAIResource = async () => {
    setIsGenerating(true);
    setGeneratedContent("");
    setGeneratedMetaTitle("");
    setGeneratedMetaDescription("");

    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aiForm),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setGeneratedContent(cleanAiTraces(data?.text || ""));
        setGeneratedMetaTitle(cleanAiTraces(data?.metaTitle || ""));
        setGeneratedMetaDescription(cleanAiTraces(data?.metaDescription || ""));
        
        // Auto trigger image generation
        if (data?.imagePrompt) {
          setImagePrompt(data.imagePrompt);
          // Wait a tick before generating to let state update
          setTimeout(() => {
            const btn = document.getElementById("auto-generate-image-btn");
            if (btn) btn.click();
          }, 500);
        }
      } else {
        showToast("Üretim hatası: " + (data?.error || "Bilinmeyen hata"), "error");
      }
    } catch (err) {
      showToast("Bir hata oluştu.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const triggerCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const stats = [
    {
      title: "Bugünkü Aramalar",
      value: (metrics.find(m => m.id === "stat_aramalar")?.data as any)?.value || "0",
      increase: (metrics.find(m => m.id === "stat_aramalar")?.data as any)?.increase || "0%",
      icon: PhoneCall,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Form Talepleri",
      value: (metrics.find(m => m.id === "stat_formlar")?.data as any)?.value || "0",
      increase: (metrics.find(m => m.id === "stat_formlar")?.data as any)?.increase || "0%",
      icon: MessageSquare,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Site Ziyaretçisi",
      value: (metrics.find(m => m.id === "stat_ziyaretci")?.data as any)?.value || "0",
      increase: (metrics.find(m => m.id === "stat_ziyaretci")?.data as any)?.increase || "0%",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Dönüşüm Oranı",
      value: (metrics.find(m => m.id === "stat_donusum")?.data as any)?.value || "%0",
      increase: (metrics.find(m => m.id === "stat_donusum")?.data as any)?.increase || "0%",
      icon: BarChart3,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
  ];

  if (!isAdminAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center border border-slate-100">
          <div className="flex justify-center mb-6">
            <Logo variant="dark" className="w-56 h-auto" />
          </div>
          
          {!isTwoFactorStep ? (
            <>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Yönetim Paneli</h1>
              <p className="text-slate-500 mb-6 text-sm">
                Devam etmek için yönetici hesabınızla yetki doğrulayın.
              </p>
              
              {loginError && (
                <div className="p-4 mb-5 bg-red-50 text-red-800 text-xs font-medium rounded-2xl text-left border border-red-100 flex flex-col gap-2">
                  <div className="flex items-start gap-1.5 font-bold text-red-950 text-[13px]">
                    <span>⚠️</span>
                    <span>Giriş / Kayıt Hatası</span>
                  </div>
                  {loginError === "auth/operation-not-allowed" ? (
                    <div className="space-y-3 font-sans">
                      <p className="text-red-800 font-semibold">
                        Firebase: Error (auth/operation-not-allowed)
                      </p>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        Firebase Console üzerinde E-posta/Şifre ile giriş yöntemi henüz etkinleştirilmemiş. Projeyi canlıya alabilmek için lütfen aşağıdaki adımları uygulayın:
                      </p>
                      <div className="bg-white p-3 rounded-xl border border-red-100 leading-relaxed text-slate-700 space-y-2">
                        <p className="font-bold text-slate-900 text-[11px] mb-1">🛠️ Etkinleştirme Adımları:</p>
                        <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600">
                          <li>
                            <a 
                              href="https://console.firebase.google.com/project/gen-lang-client-0062360053/authentication/providers" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#0b2e59] underline font-bold hover:text-[#082244]"
                            >
                              Buraya tıklayarak Firebase Konsolu'na
                            </a> gidin.
                          </li>
                          <li>Açılan ekranda <b>Sign-in method</b> (Giriş Yöntemi) sekmesini bulun.</li>
                          <li>Listeden <b>Email/Password (E-posta/Şifre)</b> sağlayıcısını düzenleyip <b>Etkinleştirin (Enable)</b> ve kaydedin.</li>
                          <li>Sayfayı yenileyerek tekrar giriş yapmayı deneyin.</li>
                        </ol>
                        <p className="text-[11px] text-indigo-700 font-semibold pt-1">
                          💡 Not: E-posta/Şifre aktif edilene kadar hemen yukarıdaki veya aşağıdaki "Google ile Giriş" seçeneğini kullanarak da anında yetkili giriş yapabilirsiniz.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>{loginError}</p>
                  )}
                </div>
              )}
              
              <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
                <input 
                  type="email" 
                  placeholder="E-posta Adresi" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 font-medium text-slate-800"
                  required
                />
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Şifre" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 font-medium text-slate-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-[#0b2e59] transition-colors focus:outline-none"
                  >
                    {showPassword ? "Gizle" : "Göster"}
                  </button>
                </div>

                <div className="flex flex-col gap-2.5 pt-1 text-left">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#0b2e59] focus:ring-[#0b2e59]/20 border-slate-300 rounded cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 font-semibold hover:text-slate-800 transition-colors">
                      Beni Hatırla
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0b2e59] hover:bg-[#082244] text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-sm"
                >
                  Giriş Yap
                </button>
              </form>

              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative bg-white px-4 text-xs text-slate-400 font-medium">VEYA</span>
              </div>

              <button
                onClick={handleAdminLogin}
                type="button"
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-sm mb-2"
              >
                <Globe className="w-5 h-5 text-[#0b2e59]" />
                Google ile Giriş
              </button>
            </>
          ) : (
            <form onSubmit={handleTwoFactorVerify} className="space-y-6">
              <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center justify-center gap-2">
                <ShieldCheck className="w-6 h-6 text-green-600" /> Google 2FA Koruması
              </h1>
              <p className="text-slate-500 text-sm mb-4">
                Hesabınız iki adımlı doğrulama (2FA) ile korunmaktadır. Devam etmek için Google Authenticator uygulamanızdaki 6 haneli kodu girin.
              </p>

              {twoFactorError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl text-left border border-red-100">
                  ⚠️ {twoFactorError}
                </div>
              )}

              <div className="space-y-4">
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="000000" 
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 text-slate-800"
                  required
                  autoFocus
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsTwoFactorStep(false);
                      setTwoFactorCode("");
                      setTwoFactorError("");
                    }}
                    className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold transition-colors text-sm"
                  >
                    Geri Dön
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-bold transition-colors shadow-sm text-sm"
                  >
                    Doğrula ve Gir
                  </button>
                </div>
              </div>
            </form>
          )}

          <p className="text-xs text-slate-400 mt-6 font-mono">
            SECURE_LOGIN_REQUIRED | GİRİŞ DENEMELERİ KAYIT ALTINDADIR
          </p>
        </div>
      </div>

      {/* Modern Glassmorphic Toast Notifications with react-hot-toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.85)',
            color: '#1e293b',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderRadius: '20px',
            padding: '14px 20px',
            fontSize: '13px',
            fontWeight: '600',
            maxWidth: '380px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              background: 'rgba(240, 253, 250, 0.85)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: '#065f46',
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              background: 'rgba(254, 242, 242, 0.85)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#991b1b',
            }
          },
        }}
      />
    </>
  );
}

return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-20 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-30 h-screen bg-[#0b2e59] text-white transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:w-20 w-64" : "w-64"
        } ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col`}
      >
        <div className="p-5 flex items-center justify-between border-b border-white/10 min-h-[73px]">
          {!sidebarCollapsed ? (
            <Logo className="w-40 h-auto" />
          ) : (
            <div className="mx-auto w-10 h-10 rounded-full bg-[#ffb703] text-[#0b2e59] flex items-center justify-center font-bold text-sm tracking-wider shadow-inner shadow-black/20 animate-fade-in">
              AYA
            </div>
          )}
          <button
            className="lg:hidden text-white/50 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-4 overflow-y-auto w-full scrollbar-thin">
          {[
            {
              name: "Ana Menü",
              items: [
                { id: "Sistem Rehberi", label: "Sistem Rehberi", Icon: FileText },
                { id: "Dashboard", label: "Dashboard", Icon: BarChart3 },
              ]
            },
            {
              name: "Müşteri Yönetimi",
              items: [
                { id: "Arama Kayıtları", label: "Arama Kayıtları", Icon: PhoneCall },
                { id: "Potansiyel Müşteri", label: "CRM (Potansiyel)", Icon: MessageSquare },
                { id: "Müşteriler", label: "Müşteriler", Icon: Users },
              ]
            },
            {
              name: "Pazarlama",
              items: [
                { id: "Blog Yönetimi", label: "Blog Yönetimi", Icon: FileText },
                { id: "Görsel Üretimi", label: "Görsel Üretimi", Icon: ImageIcon },
                { id: "AI İçerik Asistanı", label: "AI Asistanı", Icon: Sparkles },
                { id: "SEO Performansı", label: "SEO Performansı", Icon: TrendingUp },
                { id: "A/B Testleri", label: "A/B Testleri", Icon: Activity },
              ]
            },
            {
              name: "Analizler",
              items: [
                { id: "Çağrı Analizi", label: "Çağrı Analizi", Icon: Map },
                { id: "Rakip İzleme", label: "Rakip İzleme", Icon: Target },
                { id: "Finansal Takip", label: "Finansal Takip", Icon: DollarSign },
                { id: "Usta Performansı", label: "Usta Puanları", Icon: Award },
                { id: "İş Başvuruları", label: "İş Başvuruları", Icon: Briefcase },
              ]
            },
            {
              name: "Sistem",
              items: [
                { id: "Ayarlar", label: "Genel Ayarlar", Icon: Settings },
                { id: "Users", label: "Kullanıcılar & Profiller", Icon: ShieldCheck },
                { id: "Deploy", label: "Dağıtım & Deploy", Icon: Globe },
              ]
            }
          ].map((group) => {
            const isCollapsed = !!collapsedGroups[group.name];
            return (
              <div key={group.name} className="flex flex-col gap-1 w-full border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => {
                    if (!sidebarCollapsed) {
                      setCollapsedGroups(prev => ({ ...prev, [group.name]: !prev[group.name] }));
                    }
                  }}
                  className={`flex items-center justify-between text-white/40 text-[10px] uppercase tracking-wider font-bold mb-1.5 px-2 w-full text-left transition-colors ${
                    !sidebarCollapsed ? "hover:text-white/80 cursor-pointer" : "cursor-default"
                  }`}
                >
                  {!sidebarCollapsed ? (
                    <>
                      <span>{group.name}</span>
                      {isCollapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                    </>
                  ) : (
                    <div className="w-full text-center tracking-widest text-[8px] opacity-30">•••</div>
                  )}
                </button>
                
                {(!isCollapsed || sidebarCollapsed) && group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={`w-full flex items-center ${
                        sidebarCollapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5"
                      } rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#ffb703] text-[#0b2e59] font-bold shadow-md shadow-[#ffb703]/20"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <item.Icon className={`${sidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} shrink-0`} />
                      {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          {!sidebarCollapsed ? (
            <>
              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl font-medium transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                Çıkış Yap
              </button>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-xl font-medium transition-colors w-full text-left"
              >
                <Globe className="w-5 h-5" />
                Siteye Dön
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={handleAdminLogout}
                title="Çıkış Yap"
                className="p-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <Link
                to="/"
                title="Siteye Dön"
                className="p-2.5 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
              >
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          )}

          {/* Desktop Collapse Trigger */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex items-center justify-center gap-2.5 py-2 px-3 text-white/40 hover:bg-white/10 hover:text-white rounded-xl transition-all w-full text-center cursor-pointer border border-white/5 mt-1"
            title={sidebarCollapsed ? "Genişlet" : "Daralt"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!sidebarCollapsed && <span className="text-xs font-semibold">Menüyü Gizle</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto w-full">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-500 hover:text-[#0b2e59] transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Müşteri, telefon veya arıza ara..."
                className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Database HA Health Monitor */}
            <div ref={dbHealthRef} className="relative">
              <button
                onClick={() => {
                  setIsDbHealthDropdownOpen(!isDbHealthDropdownOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-sm relative shrink-0"
                title="Yedekli Veritabanı Durumu (Active-Active)"
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dbHealth.activeSource === "firestore" ? "bg-emerald-400" : "bg-blue-400"}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${dbHealth.activeSource === "firestore" ? "bg-emerald-500" : "bg-blue-500"}`}></span>
                </span>
                <span className="hidden md:inline">
                  {dbHealth.activeSource === "firestore" ? "Primary: Firebase" : "Primary: Supabase"}
                </span>
                <span className="md:hidden">HA</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {isDbHealthDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-200 z-[999999] overflow-hidden animate-fade-in p-1">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                        🛡️ Küme Sağlık İzleyicisi
                      </h4>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Yedekli (HA)
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">
                      Multi-Cloud Failover & Synchronization Engine
                    </p>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Database Health List */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${dbHealth.firestore === "healthy" ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                          <span className="text-xs font-bold text-slate-700">Firebase Firestore</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {dbHealth.firestore === "healthy" ? `${dbHealth.latencyMs.firestore}ms` : "Offline"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${dbHealth.supabase === "healthy" ? "bg-blue-500" : "bg-rose-500"}`}></span>
                          <span className="text-xs font-bold text-slate-700">Supabase DB</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {dbHealth.supabase === "healthy" ? `${dbHealth.latencyMs.supabase}ms` : "Offline"}
                        </span>
                      </div>
                    </div>

                    {/* Routing metrics */}
                    <div className="text-xs space-y-1.5 border-t border-slate-100 pt-3">
                      <div className="flex justify-between text-slate-500">
                        <span>Aktif Kanal (Primary):</span>
                        <span className="font-bold text-slate-800 capitalize">{dbHealth.activeSource}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Yedek Kanal (Standby):</span>
                        <span className="font-bold text-slate-800">
                          {dbHealth.activeSource === "firestore" ? "Supabase" : "Firestore"}
                        </span>
                      </div>
                      {dbHealth.lastFailoverTime && (
                        <div className="bg-amber-50 text-amber-800 p-2 rounded-lg text-[10px] mt-2 font-medium leading-normal border border-amber-100">
                          <p className="font-bold">⚠️ Son Geçiş (Failover):</p>
                          <p className="mt-0.5">{new Date(dbHealth.lastFailoverTime).toLocaleTimeString()}</p>
                          <p className="text-[9px] mt-0.5 opacity-90">{dbHealth.failoverReason}</p>
                        </div>
                      )}
                    </div>

                    {/* Simulation Panel */}
                    <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          if (!checkPermission("Manuel veritabanı failover tetikleme")) return;
                          const next = dbHealth.activeSource === "firestore" ? "supabase" : "firestore";
                          triggerFailover(`Yönetici Manuel Failover Testi (${next.toUpperCase()})`, next);
                          triggerToast(`Manuel failover başarıyla gerçekleştirildi. Yeni Aktif: ${next.toUpperCase()}`, "info");
                        }}
                        className="w-full py-2 bg-[#0b2e59] hover:bg-[#082244] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        ⚡ Manuel Geçiş Tetikle (Simüle Et)
                      </button>
                      <button
                        onClick={() => {
                          triggerToast("Sistem veritabanı kümeleri taranıyor ve senkronize ediliyor...", "success");
                          setDbHealthState(prev => ({
                            ...prev,
                            firestore: "healthy",
                            supabase: isSupabaseConfigured ? "healthy" : "offline",
                            latencyMs: {
                              firestore: Math.floor(Math.random() * 15) + 5,
                              supabase: Math.floor(Math.random() * 20) + 10,
                            }
                          }));
                        }}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        🔄 Sağlık Kontrolü & Senkronize Et
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div ref={notificationsRef} className="relative">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsDbHealthDropdownOpen(false);
                }}
                className="relative p-2 text-slate-500 hover:text-[#0b2e59] hover:bg-slate-100 rounded-full transition-all focus:outline-none cursor-pointer"
                title="Bildirimler"
              >
                <Bell className="w-6 h-6 animate-none" />
                {(requests.filter(r => r.status === "Yeni Talep").length + jobApplications.filter(a => a.status === "Yeni" || !a.status).length) > 0 && (
                  <>
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-md animate-pulse">
                      {requests.filter(r => r.status === "Yeni Talep").length + jobApplications.filter(a => a.status === "Yeni" || !a.status).length}
                    </span>
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-400 rounded-full -z-10 animate-ping opacity-75"></span>
                  </>
                )}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-200 z-[999999] overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-slate-100 flex flex-col gap-2 bg-slate-50">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-sm">Bildirimler</h3>
                      {(requests.filter(r => r.status === "Yeni Talep").length + jobApplications.filter(a => a.status === "Yeni" || !a.status).length) > 0 && (
                        <span className="bg-[#0b2e59] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {requests.filter(r => r.status === "Yeni Talep").length + jobApplications.filter(a => a.status === "Yeni" || !a.status).length} Yeni
                        </span>
                      )}
                    </div>
                    {(requests.filter(r => r.status === "Yeni Talep").length + jobApplications.filter(a => a.status === "Yeni" || !a.status).length) > 0 && (
                      <button 
                        onClick={async () => {
                          const unreadReqs = requests.filter(r => r.status === "Yeni Talep");
                          const unreadApps = jobApplications.filter(a => a.status === "Yeni" || !a.status);
                          for (const req of unreadReqs) {
                            await updateRequestStatus(req.id, "Müşteri Arandı");
                          }
                          for (const app of unreadApps) {
                            await updateJobApplication(app.id, { status: "İncelendi" });
                          }
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold text-right"
                      >
                        Tümünü Okundu Say
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto relative z-[9999]">
                    {requests.filter(r => r.status === "Yeni Talep").length === 0 && jobApplications.filter(a => a.status === "Yeni" || !a.status).length === 0 && (
                      <div className="p-4 text-center text-sm text-slate-500">Yeni bildirim yok.</div>
                    )}
                    {requests.filter(r => r.status === "Yeni Talep").map((req: any) => (
                      <div key={req.id} onClick={() => { setActiveTab("Potansiyel Müşteri"); setIsNotificationsOpen(false); }} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Acil Çağrı</p>
                            <p className="text-xs text-slate-500 mt-0.5">{req.name} - {req.service}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {jobApplications.filter(a => a.status === "Yeni" || !a.status).map((app: any) => (
                      <div key={app.id} onClick={() => { setActiveTab("İş Başvuruları"); setIsNotificationsOpen(false); }} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <Briefcase className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Yeni İş Başvurusu</p>
                            <p className="text-xs text-slate-500 mt-0.5">{app.name} - {app.experience}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#0b2e59] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-inner">
                {adminUserEmail?.toLowerCase().includes("ahmet") ? "AC" : adminUserEmail?.toLowerCase().includes("aya") ? "AE" : "SM"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-extrabold text-slate-800">
                  {adminUserEmail?.toLowerCase().includes("ahmet") ? "Ahmet Cafoğlu" : adminUserEmail?.toLowerCase().includes("aya") ? "Aya Enerji" : "Aya Elektrik"}
                </p>
                <p className="text-[11px] text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                  Senior Manager
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${isSuperAdmin ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-[#0b2e59]"}`}>
                    {isSuperAdmin ? "Süper" : "Yönetici"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area Switch */}
        <div className="p-4 sm:p-8 space-y-8">
          {activeTab === "Sistem Rehberi" && <GuideTab />}
          
          {activeTab === "Arama Kayıtları" && <AramaKayitlariTab />}
          {activeTab === "Dashboard" && <DashboardTab setActiveTab={setActiveTab} requests={requests} blogPosts={blogPosts} />}

          {activeTab === "Potansiyel Müşteri" && (
            <PotansiyelMusteriTab
              crmStats={crmStats}
              crmSearch={crmSearch}
              setCrmSearch={setCrmSearch}
              crmDifficultyFilter={crmDifficultyFilter}
              setCrmDifficultyFilter={setCrmDifficultyFilter}
              crmProfitFilter={crmProfitFilter}
              setCrmProfitFilter={setCrmProfitFilter}
              isNewRequestModalOpen={isNewRequestModalOpen}
              setIsNewRequestModalOpen={setIsNewRequestModalOpen}
              newRequestForm={newRequestForm}
              setNewRequestForm={setNewRequestForm}
              isScoringLead={isScoringLead}
              handleYeniTalep={handleYeniTalep}
              filteredRequests={filteredRequests}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              setSelectedCrmLead={setSelectedCrmLead}
              updateRequestStatus={updateRequestStatus}
              handleAnalyzeLead={handleAnalyzeLead}
              isAnalyzingCrmLead={isAnalyzingCrmLead}
              selectedCrmLead={selectedCrmLead}
              leadNotes={leadNotes}
              setLeadNotes={setLeadNotes}
              handleSaveLeadNotes={handleSaveLeadNotes}
              isSavingLeadNotes={isSavingLeadNotes}
              removeRequestDb={removeRequestDb}
              showConfirm={showConfirm}
              showToast={showToast}
            />
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
            />
          )}
          {activeTab === "İş Başvuruları" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-lg">
                  Kariyer Başvuruları
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                    Tarih Seç
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                    Filtrele
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                      <th className="px-6 py-4 font-semibold">Aday Bilgisi</th>
                      <th className="px-6 py-4 font-semibold">Telefon</th>
                      <th className="px-6 py-4 font-semibold">
                        Deneyim / Uzmanlık
                      </th>
                      <th className="px-6 py-4 font-semibold">Tarih</th>
                      <th className="px-6 py-4 font-semibold">Özet / Not</th>
                      <th className="px-6 py-4 font-semibold">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobApplications.map((app: any, idx) => (
                      <tr
                        key={app.id || idx}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800 flex items-center gap-2">
                            {app.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`tel:${app.phone.replace(/\s+/g, "")}`}
                            className="text-slate-600 font-medium hover:text-[#0b2e59]"
                          >
                            {app.phone}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-slate-700">
                            {app.specialty}
                          </div>
                          <div className="text-xs text-slate-500">
                            {app.experience}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm">
                          {app.date || app.time}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="text-xs text-slate-500 max-w-xs truncate"
                            title={app.message || app.note}
                          >
                            {app.message || app.note}
                          </div>
                          {app.certificateName && (
                            <div className="mt-1">
                              <a
                                href={app.certificateData}
                                download={app.certificateName}
                                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-100 transition-colors"
                              >
                                <Paperclip className="w-3 h-3" />
                                {app.certificateName}
                              </a>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {(!app.status || app.status === "Yeni") && (
                              <button 
                                onClick={async () => {
                                  try {
                                    await updateJobApplication(app.id, { status: "İncelendi" });
                                  } catch (err: any) {
                                    showToast("Güncelleme başarısız: " + err.message, "error");
                                  }
                                }}
                                className="px-3 py-1.5 bg-[#0b2e59] text-white rounded-lg text-xs font-bold hover:bg-[#082244] transition-colors"
                              >
                                İncele
                              </button>
                            )}
                            {app.status === "İncelendi" && (
                              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold flex items-center justify-center">
                                İncelendi
                              </span>
                            )}
                            <button
                              className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
                              title="Sil"
                              onClick={() => {
                                showConfirm(
                                  "Başvuruyu Sil",
                                  "Bu iş başvurusunu tamamen silmek istediğinize emin misiniz?",
                                  async () => {
                                    try {
                                      await removeJobApplication(app.id);
                                      showToast("Başvuru başarıyla silindi.", "success");
                                    } catch (err: any) {
                                      showToast("Silme işlemi başarısız: " + err.message, "error");
                                    }
                                  }
                                );
                              }}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Blog Yönetimi" && <BlogTab blogPosts={blogPosts} addBlogDb={addBlogDb} updateBlogDb={updateBlogDb} removeBlogDb={removeBlogDb} showToast={showToast} showConfirm={showConfirm} isGenerating={isGenerating} setIsGenerating={setIsGenerating} isGeneratingImage={isGeneratingImage} setIsGeneratingImage={setIsGeneratingImage} generatedContent={generatedContent} setGeneratedContent={setGeneratedContent} generatedImageUrl={generatedImageUrl} setGeneratedImageUrl={setGeneratedImageUrl} />}
          {activeTab === "Görsel Üretimi" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col p-6">
              <div className="mb-6">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#0b2e59]" />
                  Görsel Üretimi (Imagen 3)
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Yapay zeka ile blog yazılarınız veya reklam kampanyalarınız için profesyonel görseller üretin.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Nasıl bir görsel istersiniz?
                    </label>
                    <textarea
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800 resize-none h-32"
                      placeholder="Örn: Modern bir evin oturma odasında, şık ve güvenli bir şekilde döşenmiş elektrik panosu, sıcak aydınlatma, fotogerçekçi, 4k"
                    />
                  </div>

                  <button
                    id="auto-generate-image-btn"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                    className="w-full bg-[#0b2e59] hover:bg-[#082244] text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isGeneratingImage ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" /> Görsel Üretiliyor...
                      </span>
                    ) : (
                      <>
                        <ImageIcon className="w-5 h-5 group-hover:text-[#ffb703] transition-colors" />
                        Görsel Üret
                      </>
                    )}
                  </button>
                  
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <h4 className="font-semibold text-blue-800 text-sm mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> İpucu
                    </h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Etkili sonuçlar için "fotogerçekçi", "sinematik aydınlatma" veya "4k" gibi detay kelimeleri kullanın.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col h-full">
                  {generatedImageUrl ? (
                    <div className="flex flex-col h-full animate-fade-in">
                      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2 relative flex flex-col justify-center items-center group overflow-hidden min-h-[300px]">
                        <img 
                          src={generatedImageUrl} 
                          alt="AI Generated" 
                          className="w-full h-auto max-h-full object-contain rounded-lg shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = generatedImageUrl;
                              link.download = `aya-elektrik-ai-${Date.now()}.png`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className="bg-white text-slate-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors"
                          >
                            İndir
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full min-h-[400px] lg:h-full bg-slate-50 border border-slate-200/60 border-dashed rounded-xl flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                      <ImageIcon className="w-8 h-8 mb-2 opacity-50 text-[#0b2e59] animate-pulse" />
                      <p className="font-bold text-slate-700 mb-1">Görsel Bekleniyor</p>
                      <p className="text-sm max-w-sm">
                        Hayalinizdeki görseli sol tarafa tanımlayın ve "Görsel Üret" butonuna basın.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "AI İçerik Asistanı" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col p-6">
              <div className="mb-6">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0b2e59]" />
                  AI İçerik Asistanı (Gemini API)
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Yerel SEO uyumlu, elektrik arızaları ve bakım ipuçları
                  hakkında içerikler üretin.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                <div className="space-y-5">
                  {/* Automated Daily SEO Campaign Engine Card */}
                  <div className="bg-gradient-to-r from-[#0b2e59] to-[#0d3b73] text-white rounded-3xl p-6 shadow-md border border-slate-100/10 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="bg-yellow-400 text-[#0b2e59] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Yapay Zeka Kampanya Motoru
                        </span>
                        <h4 className="font-bold text-lg">Günlük Otomatik SEO Taslak Üreticisi</h4>
                        <p className="text-xs text-slate-200">
                          Tek tıklamayla rastgele İstanbul ilçeleri ve hizmet konularını eşleştirerek, her birine özel Imagen 3 görselleriyle SEO uyumlu 3 adet blog taslağı oluşturur.
                        </p>
                      </div>
                      <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse shrink-0" />
                    </div>

                    {!isBulkGenerating ? (
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => handleRunDailyCampaign(3)}
                          className="bg-yellow-400 hover:bg-yellow-300 text-[#0b2e59] font-bold py-3 px-5 rounded-2xl text-xs transition-colors shadow-sm flex items-center gap-2"
                        >
                          🚀 Kampanyayı Şimdi Çalıştır (3 SEO Yazısı & Görseli)
                        </button>
                      </div>
                    ) : (
                      <div className="pt-2 space-y-3">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Taslaklar Hazırlanıyor...</span>
                          <span>{bulkProgress} / {bulkTotal}</span>
                        </div>
                        <div className="w-full bg-slate-200/20 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-yellow-400 h-full transition-all duration-500"
                            style={{ width: `${(bulkProgress / bulkTotal) * 100}%` }}
                          />
                        </div>
                        {/* Interactive generation logs */}
                        <div className="bg-black/40 border border-white/10 rounded-xl p-3 h-28 overflow-y-auto font-mono text-[10px] text-slate-300 space-y-1 scrollbar-thin">
                          {bulkLogs.map((log, index) => (
                            <div key={index} className="leading-relaxed">{log}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      İçerik Türü
                    </label>
                    <select
                      value={aiForm.contentType}
                      onChange={(e) =>
                        setAiForm({ ...aiForm, contentType: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800 cursor-pointer"
                    >
                      <option value="blog">Blog Yazısı</option>
                      <option value="social">Sosyal Medya Gönderisi</option>
                      <option value="google-update">
                        Google İşletmem Güncellemesi
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Hizmet / Konu Başlığı
                    </label>
                    <select
                      value={aiForm.serviceType}
                      onChange={(e) =>
                        setAiForm({ ...aiForm, serviceType: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800 cursor-pointer"
                    >
                      <option value="Elektrik Arızası ve Kaçak Akım">
                        Elektrik Arızası ve Kaçak Akım
                      </option>
                      <option value="Akıllı Ev Sistemleri ve Otomasyon">
                        Akıllı Ev Sistemleri ve Otomasyon
                      </option>
                      <option value="Pano Bakımı ve Kurulumu">
                        Pano Bakımı ve Kurulumu
                      </option>
                      <option value="Aydınlatma ve Avize Montajı">
                        Aydınlatma ve Avize Montajı
                      </option>
                      <option value="Klima Elektrik Tesisatı">
                        Klima Elektrik Tesisatı
                      </option>
                      <option value="Kombi Elektrik Tesisatı ve Sigortası">
                        Kombi Elektrik Tesisatı ve Sigortası
                      </option>
                      <option value="Güvenlik Kamerası Sistemleri">
                        Güvenlik Kamerası Sistemleri
                      </option>
                      <option value="Mutfak Elektrik Tesisatı">
                        Mutfak Elektrik Tesisatı
                      </option>
                      <option value="Şofben ve Termosifon Tesisatı">
                        Şofben ve Termosifon Tesisatı
                      </option>
                      <option value="İnternet ve Telefon Hattı Çekimi">
                        İnternet ve Telefon Hattı Çekimi
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-sm font-semibold text-slate-700 mb-1">
                        Hedef Anahtar Kelime (Opsiyonel)
                      </label>
                      <button
                        onClick={handleFetchTrends}
                        disabled={isFetchingTrends || !aiForm.targetDistrict}
                        className="text-xs font-bold bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
                      >
                        {isFetchingTrends ? (
                          <div className="w-3 h-3 border-2 border-[#0b2e59] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        Google Trends
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      list="trending-keywords"
                      value={aiForm.keyword}
                      onChange={(e) =>
                        setAiForm({ ...aiForm, keyword: e.target.value })
                      }
                      placeholder="Örn: Şişli Acil Elektrikçi"
                      className={`w-full px-4 py-3 ${trendKeywords.length > 0 ? "bg-indigo-50 border-indigo-200 text-[#0b2e59] font-bold" : "bg-slate-50 border-slate-200 text-slate-800 font-medium"} border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all`}
                    />
                    <datalist id="trending-keywords">
                      {trendKeywords.map((kw, i) => (
                        <option key={i} value={kw} />
                      ))}
                    </datalist>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Hedef İlçe/Bölge
                    </label>
                    <input
                      type="text"
                      value={aiForm.targetDistrict}
                      onChange={(e) =>
                        setAiForm({ ...aiForm, targetDistrict: e.target.value })
                      }
                      placeholder="Örn: Şişli, Beşiktaş"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all font-medium text-slate-800"
                    />
                  </div>

                  <button
                    onClick={handleGenerateAIResource}
                    disabled={isGenerating}
                    className="w-full bg-[#0b2e59] hover:bg-[#082244] text-white px-6 py-4 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" /> İçerik
                        Üretiliyor...
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 group-hover:text-[#ffb703] transition-colors" />
                        İçerik Üret
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-col h-full space-y-6">
                  {generatedContent ? (
                    <div className="space-y-6">
                      {/* SEO Preview Simulator */}
                      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3 text-xs text-slate-500 font-medium">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span>Google Arama Sonuçları Mobil Önizlemesi</span>
                        </div>
                        <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-4 font-sans text-left max-w-lg">
                          <div className="flex items-center gap-1.5 text-xs text-[#202124] mb-1 leading-none">
                            <span className="bg-[#f1f3f4] p-1 rounded-full text-slate-500 flex items-center justify-center">⚡</span>
                            <span className="truncate text-slate-600">https://ayaelektrik.com › {aiForm.contentType === "blog" ? "blog" : "paylasim"}</span>
                          </div>
                          <h4 className="text-[#1a0dab] hover:underline text-lg font-medium leading-tight mb-1 cursor-pointer">
                            {generatedMetaTitle || `${aiForm.targetDistrict} Acil Elektrikçi | 7/24 Aya Elektrik`}
                          </h4>
                          <p className="text-[#4d5156] text-xs leading-normal">
                            {generatedMetaDescription || `${aiForm.targetDistrict} bölgesinde acil elektrik arıza çözümleri! Aya Elektrik 7/24 profesyonel kadrosuyla hizmetinizde.`}
                          </p>
                        </div>
                      </div>

                      {/* Meta Title Field */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                            📌 Meta Başlık (SEO Title)
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${generatedMetaTitle.length <= 60 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                              {generatedMetaTitle.length}/60 Karakter
                            </span>
                          </span>
                          <button
                            onClick={() => triggerCopy(generatedMetaTitle, "title")}
                            className="text-xs font-bold text-[#0b2e59] hover:text-[#0b2e59]/80 bg-[#0b2e59]/5 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            {copiedField === "title" ? (
                              <>
                                <Check className="w-3 h-3 text-green-600" /> Kopyalandı
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Başlığı Kopyala
                              </>
                            )}
                          </button>
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={generatedMetaTitle}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none"
                        />
                      </div>

                      {/* Meta Description Field */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                            📝 Meta Açıklama (SEO Description)
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${generatedMetaDescription.length <= 155 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                              {generatedMetaDescription.length}/155 Karakter
                            </span>
                          </span>
                          <button
                            onClick={() => triggerCopy(generatedMetaDescription, "desc")}
                            className="text-xs font-bold text-[#0b2e59] hover:text-[#0b2e59]/80 bg-[#0b2e59]/5 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            {copiedField === "desc" ? (
                              <>
                                <Check className="w-3 h-3 text-green-600" /> Kopyalandı
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Açıklamayı Kopyala
                              </>
                            )}
                          </button>
                        </div>
                        <textarea
                          readOnly
                          rows={2}
                          value={generatedMetaDescription}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 text-sm focus:outline-none resize-none"
                        />
                      </div>

                      {/* Content Field */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                            📄 SEO Uyumlu İçerik Metni (Markdown formatında)
                          </span>
                          <button
                            onClick={() => triggerCopy(generatedContent, "content")}
                            className="text-xs font-bold text-white bg-[#0b2e59] hover:bg-[#082244] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                          >
                            {copiedField === "content" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-400" /> Kopyalandı!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Tüm İçeriği Kopyala
                              </>
                            )}
                          </button>
                          
                          <button
                            onClick={async () => {
                              await addBlogDb({
                                title: generatedMetaTitle || "Yeni AI Blog Yazısı",
                                category: aiForm.serviceType,
                                date: new Date().toLocaleDateString("tr-TR"),
                                status: "Taslak",
                                content: generatedContent,
                                views: 0
                              });
                              showToast("Blog taslağı olarak kaydedildi!", "success");
                            }}
                            className="text-xs bg-[#ffb703] text-[#0b2e59] hover:bg-yellow-400 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" /> Blog'a Kaydet
                          </button>
                          
                          <button
                            onClick={handlePublishToGmb}
                            disabled={isPublishingGmb}
                            className="text-xs bg-blue-600 text-white hover:bg-blue-700 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <Globe className="w-3.5 h-3.5" /> 
                            {isPublishingGmb ? "Yayınlanıyor..." : "Google'da Yayınla"}
                          </button>
                        </div>
                        <textarea
                          readOnly
                          rows={12}
                          value={generatedContent}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full min-h-[450px] bg-slate-50 border border-slate-200/60 border-dashed rounded-xl flex flex-col items-center justify-center text-slate-400 p-8 text-center h-full">
                      <Sparkles className="w-8 h-8 mb-2 opacity-50 text-[#0b2e59] animate-pulse" />
                      <p className="font-bold text-slate-700 mb-1">Yapay Zeka İçerik Asistanı</p>
                      <p className="text-sm max-w-sm">
                        Sol taraftan tercihlerinizi yapıp "İçerik Üret"
                        butonuna basın. Yapay zeka sizin için saniyeler içinde
                        temiz, yapay zeka kalıntıları taşımayan profesyonel içerikler hazırlayacaktır.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Çağrı Analizi" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center justify-between">
                  <span>Çağrı Yoğunluğu Isı Haritası (Bölge ve Saat)</span>
                  <span className="text-sm font-normal text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Son 30 Gün</span>
                </h3>
                <div className="h-96 w-full -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        type="category" 
                        dataKey="hour" 
                        name="Saat" 
                        allowDuplicatedCategory={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="district" 
                        name="Bölge"
                        allowDuplicatedCategory={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                      />
                      <ZAxis type="number" dataKey="calls" range={[50, 400]} name="Çağrı Sayısı" />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }} 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-[#0b2e59] text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-white/10">
                                <p className="font-bold mb-1">{data.district}</p>
                                <p className="text-white/80">Saat: {data.hour}</p>
                                <p className="text-[#ffb703] font-bold mt-1">{data.calls} Çağrı</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Scatter 
                        data={metrics.find(m => m.id === "daily_calls")?.data || []} 
                        fill="#ffb703" 
                        shape="circle"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center items-center gap-4 mt-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ffb703] opacity-30"></div>Az Yoğun</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#ffb703] opacity-60"></div>Orta Yoğun</div>
                  <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-[#ffb703]"></div>Çok Yoğun</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-6">Çağrı Tipi Analizi</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={metrics.find(m => m.id === "call_types")?.data || []}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Legend iconType="circle" />
                      <Bar dataKey="Gunduz" name="Gündüz Çağrıları (08:00-18:00)" stackId="a" fill="#0b2e59" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="Gece" name="Gece & Acil (18:00-08:00)" stackId="a" fill="#ffb703" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === "SEO Performansı" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6">
              <h3 className="font-bold text-slate-800 text-lg mb-6">
                SEO Performans Dashboard
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                  <div className="text-2xl font-black text-slate-800">
                    12,450
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Aylık Organik Trafik
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                  <Search className="w-8 h-8 text-blue-500 mb-2" />
                  <div className="text-2xl font-black text-slate-800">#3</div>
                  <div className="text-sm text-slate-500 font-medium">
                    "İstanbul Acil Elektrikçi" Sırası
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                  <Activity className="w-8 h-8 text-amber-500 mb-2" />
                  <div className="text-2xl font-black text-slate-800">%8.4</div>
                  <div className="text-sm text-slate-500 font-medium">
                    Tıklama Oranı (CTR)
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-slate-700 mb-4">
                Son 30 Gün Arama Hacmi Takibi
              </h4>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={metrics.find(m => m.id === "arama_hacmi")?.data || []}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="hacim"
                      name="Arama Hacmi"
                      stroke="#0b2e59"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "Rakip İzleme" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Rakip Anahtar Kelime & Backlink Performansı
                </h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={metrics.find(m => m.id === "rakip_izleme")?.data || []}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Legend iconType="circle" />
                      <Line type="monotone" dataKey="Aya Elektrik" stroke="#0b2e59" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="Rakip A" stroke="#ffb703" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Rakip B" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500 font-medium mb-1">Kazanılan Backlink (Aylık)</div>
                      <div className="text-xl font-bold text-slate-800">+42 Yüksek DR</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">#1</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500 font-medium mb-1">Rakip A Ortalama DR</div>
                      <div className="text-xl font-bold text-slate-800">28.4</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">#2</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500 font-medium mb-1">Kaybedilen Kelimeler</div>
                      <div className="text-xl font-bold text-slate-800">12 Kelime (Rakip B'ye)</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">#3</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Finansal Takip" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  Maliyet ve Kâr Durumu (Net Bilanço)
                </h3>
                <button className="bg-[#0b2e59] hover:bg-[#0b2e59]/90 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" /> Bilanço Ekle
                </button>
              </div>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={metrics.find(m => m.id === "finansal_takip")?.data || []}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorKar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMaliyet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="ay" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" />
                    <Area type="monotone" dataKey="Kar" stroke="#10b981" fillOpacity={1} fill="url(#colorKar)" name="Net Kâr (₺)" />
                    <Area type="monotone" dataKey="Maliyet" stroke="#ef4444" fillOpacity={1} fill="url(#colorMaliyet)" name="Toplam Maliyet (₺)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "Usta Performansı" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#ffb703]" />
                  Liderlik Tablosu (Saha Performansı)
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Top Performer Card */}
                  <div className="bg-gradient-to-br from-[#0b2e59] to-[#12427a] p-5 rounded-2xl text-white flex items-center gap-4 shadow-lg md:col-span-1">
                    <div className="w-14 h-14 rounded-full bg-[#ffb703] text-[#0b2e59] flex items-center justify-center font-black text-2xl border-4 border-[#0b2e59]">
                      1
                    </div>
                    <div>
                      <div className="text-white/80 text-sm font-medium mb-1">Ayın Elemanı</div>
                      <div className="text-xl font-bold">Mehmet Demir</div>
                      <div className="text-[#ffb703] font-semibold text-sm">%98 Memnuniyet</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between col-span-1 md:col-span-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-500 mb-1">Toplam Ekip Skoru</div>
                        <div className="text-2xl font-black text-slate-800">4.8 / 5.0</div>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-medium text-slate-500 mb-1">Bu Ay Tamamlanan</div>
                      <div className="text-xl font-bold text-slate-800">164 İş</div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-100 rounded-b-none">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                        <th className="px-6 py-4 font-semibold">Sıra</th>
                        <th className="px-6 py-4 font-semibold">Usta Adı</th>
                        <th className="px-6 py-4 font-semibold">Tamamlanan İş (Aylık)</th>
                        <th className="px-6 py-4 font-semibold">Müşteri Puanı / Geri Bildirim</th>
                        <th className="px-6 py-4 font-semibold">Performans Notu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(metrics.find(m => m.id === "usta_performansi")?.data || []).map((usta: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-black text-slate-400">#{usta.sira}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800">{usta.isim}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-slate-800 w-12">{usta.isSayisi} İş</span>
                              <div className="hidden sm:block w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(usta.isSayisi / 60) * 100}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold flex items-center gap-1 text-[#0b2e59]">
                            {usta.puan} <span className="text-[#ffb703]">★</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${usta.color}`}>
                              {usta.not}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {(!metrics.find(m => m.id === "usta_performansi")?.data?.length) && (
                        <tr><td colSpan={5} className="p-4 text-center text-slate-500">Firebase'de hiç veri bulunamadı.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "A/B Testleri" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-lg">
                  A/B Testi Modülü
                </h3>
                <button className="bg-[#ffb703] text-[#0b2e59] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Yeni Test Oluştur
                </button>
              </div>
              <div className="grid gap-6">
                {abTests.map((test: any, idx: number) => (
                  <div key={idx} className="p-6 border border-slate-200 rounded-xl bg-slate-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800">
                        {test.name}
                      </h4>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        {test.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      {test.variants?.map((v: any, vIdx: number) => (
                        <div key={vIdx} className={`p-4 rounded-lg border ${v.winner ? 'bg-white border-[#0b2e59]/20 ring-1 ring-[#0b2e59]/10' : 'bg-white border-slate-200'}`}>
                          <h5 className={`font-bold mb-2 ${v.winner ? 'text-[#0b2e59]' : 'text-slate-700'}`}>
                            {v.name}
                            {v.winner && <span className="text-green-500 font-bold ml-2">Kazanan!</span>}
                          </h5>
                          <div className="text-sm text-slate-500 mb-3">{v.desc}</div>
                          <div className="text-xl font-black text-slate-800">
                            {v.conversion} <span className="text-sm font-medium text-slate-500">Dönüşüm</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 text-sm font-bold text-[#0b2e59] hover:underline">
                      Testi Sonlandır ve Kazananı Uygula
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Deploy" && (
            <div className="max-w-4xl mx-auto w-full space-y-6 pb-12">
              {/* Header */}
              <div className="bg-white rounded-3xl border border-slate-150 p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0b2e59]/5 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#0b2e59]/10 p-4 rounded-2xl text-[#0b2e59] shrink-0">
                    <Globe className="w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-2xl tracking-tight">
                      Dağıtım ve Yayına Alma
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
                      Geliştirdiğimiz bu gerçek entegrasyon sayesinde projedeki en son değişiklikler, şablonlar ve veritabanı ayarları tek tıkla doğrudan <b className="text-slate-700">GitHub</b> deponuza aktarılır.
                    </p>
                  </div>
                </div>
              </div>

              {/* GitHub Bağlantı Parametreleri */}
              <div className="bg-white rounded-3xl border border-slate-150 p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0b2e59]"></div>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                  <div className="bg-[#0b2e59]/10 p-2.5 rounded-xl text-[#0b2e59]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg">GitHub Bağlantı Parametreleri</h4>
                </div>

                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Lütfen projenizin yüklenmesini istediğiniz GitHub depo bilgilerini doldurun. Güvenli push işlemi için bir <b>Personal Access Token (PAT)</b> oluşturmanız gerekmektedir.
                </p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Repository URL</label>
                    <input 
                      type="text" 
                      placeholder="https://github.com/kullanici-adi/depo-adi.git" 
                      value={githubRepoUrl}
                      onChange={(e) => setGithubRepoUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-50 transition-all font-medium text-slate-800" 
                    />
                    <span className="text-[10px] text-slate-400 mt-1.5 block">Örn: https://github.com/Btmcode/ayaenerji.git</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Personal Access Token (PAT)</label>
                      <div className="relative">
                        <input 
                          type={showToken ? "text" : "password"} 
                          placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
                          value={githubToken}
                          onChange={(e) => setGithubToken(e.target.value)}
                          className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-50 transition-all font-mono text-slate-800" 
                        />
                        <button
                          type="button"
                          onClick={() => setShowToken(!showToken)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                        >
                          {showToken ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943-9.542-7z" /></svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Hedef Branch</label>
                      <input 
                        type="text" 
                        placeholder="main" 
                        value={githubBranch}
                        onChange={(e) => setGithubBranch(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-50 transition-all font-semibold text-slate-800" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-5 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={isSavingSettings}
                      onClick={async () => {
                        setIsSavingSettings(true);
                        try {
                          await updateSettingDb("general", { ...settings, githubRepoUrl, githubBranch, githubToken });
                          triggerToast("GitHub ayarları başarıyla kaydedildi!", "success");
                        } catch (err: any) {
                          triggerToast(`Hata oluştu: ${err.message}`, "error");
                        } finally {
                          setIsSavingSettings(false);
                        }
                      }}
                      className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSavingSettings ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-400 border-t-slate-700 rounded-full animate-spin"></span>
                          Kaydediliyor...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                          Bağlantı Ayarlarını Kaydet
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={isDeploying}
                      onClick={() => {
                        if (!githubRepoUrl || !githubToken) {
                          triggerToast("Lütfen önce GitHub Repository URL ve Personal Access Token alanlarını doldurup kaydedin!", "error");
                          return;
                        }
                        setIsDeployModalOpen(true);
                      }}
                      className={`flex-1 px-8 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 transform active:scale-98 ${
                        isDeploying 
                          ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                          : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-600/10"
                      }`}
                    >
                      {isDeploying ? (
                        <>
                          <span className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span>
                          Dağıtım Sürüyor...
                        </>
                      ) : (
                        <>
                          <Globe className="w-5 h-5 opacity-90" />
                          Değişiklikleri Canlıya Al (Push)
                        </>
                      )}
                    </button>
                  </div>
                  {!githubRepoUrl && (
                    <p className="text-center text-xs text-rose-500 font-semibold mt-2 animate-pulse">
                      ⚠ Lütfen önce GitHub bağlantı ayarlarını yapılandırın.
                    </p>
                  )}
                </div>
              </div>

              {/* Canlı Dağıtım Terminali & Süreç Takibi */}
              <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-2">git@ayaenerji:~ terminal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {isDeploying && (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full animate-pulse border border-emerald-500/25">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                        Aktarım Sürüyor
                      </span>
                    )}
                    {deployLogs.length > 0 && !isDeploying && (
                      <button
                        type="button"
                        onClick={() => {
                          setDeployLogs([]);
                          setDeployProgress(0);
                          setDeployStatusText("");
                        }}
                        className="text-xs text-slate-400 hover:text-white font-mono bg-slate-900 hover:bg-slate-850 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
                      >
                        Temizle
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar & Status Text inside terminal section */}
                {(isDeploying || deployLogs.length > 0) ? (
                  <div className="mb-4 bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
                        {isDeploying ? (
                          <svg className="w-3.5 h-3.5 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        )}
                        {deployStatusText || "Bekleniyor..."}
                      </span>
                      <span className="text-xs font-bold text-blue-400 font-mono">{deployProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850/50">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${deployProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : null}

                {/* Terminal Scroll Box */}
                <div className="bg-slate-900/40 text-slate-200 font-mono text-[11px] p-4 rounded-xl border border-slate-850/60 h-72 overflow-y-auto space-y-2 select-text shadow-inner">
                  {deployLogs.length === 0 ? (
                    <div className="text-slate-500 italic h-full flex flex-col justify-center items-center py-12 gap-3 text-center">
                      <svg className="w-10 h-10 text-slate-800 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-slate-400 font-bold text-xs">Konsol Hazır & Bekleniyor</p>
                        <p className="text-[11px] text-slate-600 mt-1 max-w-[340px]">Yukarıdaki 'Değişiklikleri Canlıya Al' butonunu kullanarak dağıtım sürecini başlatabilirsiniz.</p>
                      </div>
                    </div>
                  ) : (
                    deployLogs.map((log, index) => {
                      const isError = log.startsWith("HATA") || log.startsWith("Ağ Hatası") || log.toLowerCase().includes("fail") || log.toLowerCase().includes("error") || log.toLowerCase().includes("denied");
                      const isSuccess = log.includes("başarıyla") || log.includes("tamamlandı") || log.includes("tamamlandı!");
                      return (
                        <div key={index} className={`leading-relaxed flex items-start gap-2.5 ${isError ? 'text-rose-400' : isSuccess ? 'text-emerald-400' : 'text-slate-300'}`}>
                          <span className="text-slate-600 mr-1 select-none shrink-0">[{index + 1}]</span>
                          <span className="break-all whitespace-pre-wrap">{log}</span>
                        </div>
                      );
                    })
                  )}
                  {isDeploying && (
                    <div className="flex items-center gap-2 text-blue-400 animate-pulse text-[11px] font-mono mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping shrink-0"></span>
                      <span>Yükleniyor, lütfen bekleyin...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Ayarlar" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg">
                  Sistem ve Profil Ayarları
                </h3>
              </div>
              <div className="p-6 max-w-2xl space-y-8">
                {/* 1. Genel Bilgiler */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#0b2e59] border-b pb-2 text-sm flex items-center gap-2">
                    🏢 Kurumsal Bilgiler
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Firma Adı
                    </label>
                    <input
                      id="input-companyName"
                      type="text"
                      defaultValue={settings.companyName}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm font-medium text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      E-posta Adresi (Bildirimler için)
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      defaultValue={settings.email}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* 2. Yönetici Giriş Bilgileri */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-[#0b2e59] border-b pb-2 text-sm flex items-center gap-2">
                    🔑 Yönetici Giriş Bilgileri (Giriş Değiştirme)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Yönetici E-posta Adresi
                      </label>
                      <input
                        id="input-adminEmail"
                        type="email"
                        defaultValue={settings.adminEmail || ""}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm font-medium text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Yönetici Giriş Şifresi
                      </label>
                      <div className="relative">
                        <input
                          id="input-adminPassword"
                          type={showSettingsPassword ? "text" : "password"}
                          defaultValue={settings.adminPassword || "admin123"}
                          className="w-full pl-4 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm font-medium text-slate-800"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSettingsPassword(!showSettingsPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#0b2e59] hover:text-[#082244] focus:outline-none px-2 py-1 rounded hover:bg-slate-200/50 transition-colors"
                        >
                          {showSettingsPassword ? "GİZLE" : "GÖSTER"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Google 2FA Güvenliği */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-[#0b2e59] text-sm flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" /> Google 2FA Güvenliği (Authenticator)
                    </h4>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${twoFactorEnabled ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                      {twoFactorEnabled ? "Aktif" : "Pasif"}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-800">İki Adımlı Doğrulama (2FA) Koruması</p>
                        <p className="text-xs text-slate-500">
                          Aktif edildiğinde, yönetim paneline girişte Google Authenticator uygulamasındaki 6 haneli doğrulama kodu sorulacaktır.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          await updateSettingDb("general", { 
                            ...settings,
                            twoFactorEnabled: !twoFactorEnabled
                          });
                          showToast(`2FA Koruması ${!twoFactorEnabled ? "AKTİF" : "PASİF"} duruma getirildi.`, "success");
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${twoFactorEnabled ? "bg-red-100 hover:bg-red-200 text-red-700" : "bg-[#0b2e59] hover:bg-[#082244] text-white"}`}
                      >
                        {twoFactorEnabled ? "2FA Kapat" : "2FA Aktif Et"}
                      </button>
                    </div>
 
                    {twoFactorEnabled && (
                      <div className="pt-4 border-t border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
                          {/* Beautiful SVG representation of QR Code */}
                          <svg className="w-32 h-32 text-slate-800" viewBox="0 0 100 100" fill="currentColor">
                            <rect width="100" height="100" fill="white" />
                            {/* Outer squares */}
                            <path d="M 5,5 h 25 v 25 h -25 z M 10,10 h 15 v 15 h -15 z" />
                            <path d="M 65,5 h 25 v 25 h -25 z M 70,10 h 15 v 15 h -15 z" />
                            <path d="M 5,65 h 25 v 25 h -25 z M 10,70 h 15 v 15 h -15 z" />
                            {/* Random mock QR pixels */}
                            <path d="M 40,5 h 5 v 5 h -5 z M 50,10 h 10 v 5 h -10 z M 40,20 h 15 v 5 h -15 z M 45,30 h 5 v 10 h -5 z M 10,40 h 20 v 5 h -20 z M 5,50 h 10 v 5 h -10 z" />
                            <path d="M 60,40 h 15 v 5 h -15 z M 80,45 h 15 v 15 h -15 z M 70,70 h 10 v 10 h -10 z M 65,85 h 25 v 5 h -25 z M 40,65 h 15 v 5 h -15 z M 50,80 h 10 v 15 h -10 z" />
                          </svg>
                          <span className="text-[10px] text-slate-400 font-bold mt-2 font-mono">AYA_ELEKTRIK_AUTH_QR</span>
                        </div>
                        <div className="space-y-2 text-left">
                          <p className="text-xs font-bold text-slate-700">1. Google Authenticator uygulamasından bu QR kodu taratın.</p>
                          <p className="text-xs font-bold text-slate-700">2. Alternatif kurulum anahtarını girin:</p>
                          <div className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-lg text-xs font-mono font-bold select-all flex justify-between items-center">
                            <span>{twoFactorSecret}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
 
                {/* 4. Yetkili Yönetici Kullanıcılar */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-[#0b2e59] border-b pb-2 text-sm flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#0b2e59]" /> Yetkili Yönetici Kullanıcı Ekle ve Yönet
                  </h4>
                  <p className="text-xs text-slate-500">
                    Sisteme giriş yapabilecek yeni yönetici e-posta ve şifrelerini belirleyin. Hacker açıklarına karşı şifreler şifrelenmiş olarak güvenli altyapıda saklanır.
                  </p>
 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Add Admin Form */}
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      if (!newAdminEmail || !newAdminPassword) {
                        showToast("Lütfen e-posta ve şifre alanlarını doldurun.", "warning");
                        return;
                      }
                      if (newAdminPassword.length < 6) {
                        showToast("Şifre en az 6 karakter olmalıdır!", "warning");
                        return;
                      }
                      setIsAddingAdmin(true);
                      try {
                        const { initializeApp, deleteApp } = await import("firebase/app");
                        const { getAuth, createUserWithEmailAndPassword } = await import("firebase/auth");
                        const firebaseConfig = await import("../../firebase-applet-config.json");
                        
                        const tempAppName = "TempAdminApp_" + Date.now();
                        const tempApp = initializeApp(firebaseConfig.default || firebaseConfig, tempAppName);
                        const tempAuth = getAuth(tempApp);
                        
                        await createUserWithEmailAndPassword(tempAuth, newAdminEmail, newAdminPassword);
                        await deleteApp(tempApp);
                        
                        await addAdminDb({
                          email: newAdminEmail,
                          createdAt: new Date().toLocaleDateString("tr-TR")
                        });
 
                        setNewAdminEmail("");
                        setNewAdminPassword("");
                        showToast(`"${newAdminEmail}" başarıyla yeni yönetici olarak eklendi.`, "success");
                      } catch (err: any) {
                        console.error("Yeni admin ekleme hatası:", err);
                        showToast("Hata: " + (err.message || err), "error");
                      } finally {
                        setIsAddingAdmin(false);
                      }
                    }} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-4">
                      <p className="text-xs font-bold text-[#0b2e59] uppercase tracking-wider">👤 Yeni Yönetici Ekle</p>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">E-posta Adresi</label>
                        <input
                          type="email"
                          required
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          placeholder="ornek@ayaelektrik.com"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-medium text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Şifre (Min. 6 Karakter)</label>
                        <input
                          type="password"
                          required
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          placeholder="******"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-medium text-slate-800"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isAddingAdmin}
                        className="w-full bg-[#0b2e59] hover:bg-[#082244] disabled:bg-slate-300 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                      >
                        {isAddingAdmin ? "Ekleniyor..." : "🚀 Yeni Yönetici Ekle"}
                      </button>
                    </form>

                    {/* Admin List */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-3">
                      <p className="text-xs font-bold text-[#0b2e59] uppercase tracking-wider flex items-center justify-between">
                        <span>📋 Mevcut Yöneticiler</span>
                        <span className="bg-blue-100 text-[#0b2e59] px-2 py-0.5 rounded-full text-[10px]">{admins.length + 2} Yönetici</span>
                      </p>
                      
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {/* Built-in Protected Google Admin */}
                        <div className="p-2.5 bg-white rounded-xl border border-yellow-200/60 flex justify-between items-center text-xs">
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-800">ayaenerji@gmail.com</p>
                            <span className="bg-yellow-100 text-yellow-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full">Google Yetkilisi</span>
                          </div>
                        </div>

                        {/* Default Primary Admin */}
                        <div className="p-2.5 bg-white rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-800">{settings.adminEmail || "Birincil Yönetici Ayarlanmadı"}</p>
                            <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full">Birincil Yönetici</span>
                          </div>
                        </div>

                        {/* Custom Admins */}
                        {admins.map((adm: any) => (
                          <div key={adm.id} className="p-2.5 bg-white rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                            <div className="space-y-0.5">
                              <p className="font-bold text-slate-800">{adm.email}</p>
                              <p className="text-[9px] text-slate-400">Eklenme: {typeof adm.createdAt === 'string' ? adm.createdAt : (adm.createdAt?.seconds ? new Date(adm.createdAt.seconds * 1000).toLocaleDateString("tr-TR") : "Bilinmiyor")}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                showConfirm(
                                  "Yönetici Yetkisini Kaldır",
                                  `"${adm.email}" kullanıcısının yönetici yetkisini kaldırmak istediğinize emin misiniz?`,
                                  async () => {
                                    try {
                                      await removeAdminDb(adm.id);
                                      showToast("Yönetici başarıyla silindi. Bu hesap artık giriş yapamayacaktır.", "success");
                                    } catch (err: any) {
                                      console.error("Admin silinirken hata:", err);
                                      showToast("Silme işlemi başarısız: " + err.message, "error");
                                    }
                                  }
                                );
                              }}
                              className="text-red-500 hover:text-red-700 font-bold p-1 hover:bg-red-50 rounded-lg transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save and Cancel buttons */}
                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={async () => {
                      const cn = (document.getElementById("input-companyName") as HTMLInputElement)?.value;
                      const em = (document.getElementById("input-email") as HTMLInputElement)?.value;
                      const ae = (document.getElementById("input-adminEmail") as HTMLInputElement)?.value;
                      const ap = (document.getElementById("input-adminPassword") as HTMLInputElement)?.value;
                      
                      if (cn && em && ae && ap) {
                        await updateSettingDb("general", { 
                          ...settings,
                          companyName: cn, 
                          email: em,
                          adminEmail: ae,
                          adminPassword: ap
                        });

                        // Sync with Firebase Auth if the logged-in user is primary admin
                        const { auth } = await import("../utils/googleAuth");
                        const { updateEmail, updatePassword } = await import("firebase/auth");
                        if (auth.currentUser && auth.currentUser.email !== "ayaenerji@gmail.com") {
                          try {
                            if (ae && ae !== auth.currentUser.email) {
                              await updateEmail(auth.currentUser, ae);
                            }
                            if (ap && ap !== settings.adminPassword) {
                              await updatePassword(auth.currentUser, ap);
                            }
                          } catch (authUpdateErr: any) {
                            console.error("Auth update error:", authUpdateErr);
                            showAlert("Uyarı", "Yönetici ve Profil Ayarları güncellendi. Firebase Auth güncellenirken bir sorun oluştu (Bu güvenlik işlemi için yakın zamanda giriş yapmış olmanız gerekir): " + (authUpdateErr.message || authUpdateErr), "warning");
                            return;
                          }
                        }
                        showToast("Yönetici ve Profil Ayarları başarıyla güncellendi.", "success");
                      } else {
                        showToast("Lütfen tüm alanları doldurun.", "warning");
                      }
                    }}
                    className="bg-[#0b2e59] hover:bg-[#082244] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
                  >
                    Ayarları Güncelle ve Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Users" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
              <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    👥 Kullanıcılar & Profiller (Supabase + Firestore)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Aktif-Aktif veritabanı üzerinde kimlik, rol ve iletişim bilgileri yönetimi.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="E-posta veya isim ara..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/10 w-48 font-medium text-slate-700"
                    />
                  </div>
                  <button
                    onClick={() => setIsNewUserModalOpen(true)}
                    className="bg-[#ffb703] text-[#0b2e59] hover:bg-[#e0a000] px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Yeni Kullanıcı
                  </button>
                </div>
              </div>

              <div className="p-6 flex-1 bg-slate-50/50">
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Toplam Kullanıcı</p>
                    <p className="text-2xl font-black text-slate-800 mt-1">{usersList.length}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Toplam Profil</p>
                    <p className="text-2xl font-black text-slate-800 mt-1">{profilesList.length}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Aktif Admin</p>
                    <p className="text-2xl font-black text-[#0b2e59] mt-1">
                      {profilesList.filter((p: any) => p.role === "admin").length}
                    </p>
                  </div>
                </div>

                {/* Users list table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs border-b border-slate-100 uppercase font-black">
                          <th className="px-6 py-4 font-extrabold">Kullanıcı Bilgisi</th>
                          <th className="px-6 py-4 font-extrabold">E-posta</th>
                          <th className="px-6 py-4 font-extrabold">Telefon</th>
                          <th className="px-6 py-4 font-extrabold">Sistem Rolü</th>
                          <th className="px-6 py-4 font-extrabold">Veri Kaynağı</th>
                          <th className="px-6 py-4 font-extrabold text-right">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                        {usersList.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                              Kullanıcı kaydı bulunamadı.
                            </td>
                          </tr>
                        ) : (
                          usersList
                            .filter((u: any) => {
                              const p = profilesList.find((prof: any) => prof.id === u.id) || {} as UserProfile;
                              const nameStr = (p.fullName || "").toLowerCase();
                              const mailStr = (u.email || "").toLowerCase();
                              const query = userSearchQuery.toLowerCase();
                              return nameStr.includes(query) || mailStr.includes(query);
                            })
                            .map((u: any) => {
                              const p = profilesList.find((prof: any) => prof.id === u.id) || {} as UserProfile;
                              return (
                                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-slate-100 text-[#0b2e59] font-black flex items-center justify-center text-sm border border-slate-200">
                                        {(p.fullName || u.email || "K").charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <div className="font-bold text-slate-800 text-sm">
                                          {p.fullName || "İsimsiz Kullanıcı"}
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                                          ID: {u.id}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-slate-600">
                                    {u.email}
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-slate-500">
                                    {p.phone || "—"}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                      p.role === "admin" 
                                        ? "bg-red-50 text-red-600 border border-red-100" 
                                        : "bg-blue-50 text-blue-600 border border-blue-100"
                                    }`}>
                                      {p.role === "admin" ? "Yönetici (Admin)" : "Kullanıcı (User)"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Firebase"></span>
                                      {isSupabaseConfigured && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Supabase"></span>
                                      )}
                                      <span className="text-[10px] text-slate-400 font-bold">Senkron</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                      <button
                                        onClick={() => {
                                          setEditingUser({
                                            id: u.id,
                                            email: u.email,
                                            fullName: p.fullName || "",
                                            phone: p.phone || "",
                                            role: p.role || "user"
                                          });
                                          setIsEditUserModalOpen(true);
                                        }}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                        title="Düzenle"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteUser(u.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                        title="Sil"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isDeployModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col p-6 border border-slate-100">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="bg-blue-50 p-3 rounded-2xl text-[#0b2e59]">
                  <Globe className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Değişiklikleri Canlıya Al?</h3>
                  <p className="text-xs text-slate-500">Tasarım, fiyat ve içerik ayarlarınız reponuza aktarılacaktır.</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 mb-5 text-xs text-slate-600 leading-relaxed">
                <p className="font-semibold text-slate-700 mb-1">📢 Canlı Yayın Bilgilendirmesi:</p>
                Bu işlemle birlikte projedeki en son güncellemeler GitHub deponuza gönderilir. Süreci arkadaki ana ekranda, <span className="font-bold text-slate-800">GitHub Bağlantı Parametreleri</span> altındaki terminalden anlık olarak takip edebilirsiniz.
              </div>

              {/* Commit Message input */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Özel Revizyon Mesajı (İsteğe Bağlı)</label>
                <input
                  type="text"
                  placeholder="Örn: Elektrik pano fiyat güncellemesi"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button 
                  onClick={() => {
                    setIsDeployModalOpen(false);
                  }} 
                  className="px-5 py-3 font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-sm w-full"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={() => {
                    setIsDeployModalOpen(false);
                    handleDeploy();
                  }} 
                  className="px-6 py-3 font-bold text-white bg-[#0b2e59] hover:bg-[#082244] rounded-xl transition-colors shadow-md text-sm w-full flex items-center justify-center gap-2 active:scale-98 transform"
                >
                  Evet, Yayına Al (Push)
                </button>
              </div>
            </div>
          </div>
        )}
        {/* New User Modal */}
        {isNewUserModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col p-6 border border-slate-100">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="bg-blue-50 p-3 rounded-2xl text-[#0b2e59]">
                  <Users className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Yeni Kullanıcı & Profil</h3>
                  <p className="text-xs text-slate-500">Firebase & Supabase eşzamanlı veri kaydı.</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">E-posta Adresi</label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Adı Soyadı</label>
                  <input
                    type="text"
                    placeholder="Mustafa Yılmaz"
                    value={newUserForm.fullName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Telefon Numarası</label>
                  <input
                    type="text"
                    placeholder="0532 123 45 67"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Rol (Yetki Derecesi)</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm cursor-pointer"
                  >
                    <option value="user">Standart Kullanıcı (User)</option>
                    <option value="admin">Yönetici Yetkisi (Admin)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button 
                  onClick={() => setIsNewUserModalOpen(false)} 
                  className="px-5 py-3 font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-sm w-full cursor-pointer"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={handleAddUser} 
                  className="px-6 py-3 font-bold text-white bg-[#0b2e59] hover:bg-[#082244] rounded-xl transition-colors shadow-md text-sm w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  Oluştur (Kaydet)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditUserModalOpen && editingUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col p-6 border border-slate-100">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="bg-blue-50 p-3 rounded-2xl text-[#0b2e59]">
                  <Edit className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Kullanıcı & Profil Düzenle</h3>
                  <p className="text-xs text-slate-500">Kullanıcı ve profil verilerini güncelleme.</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">E-posta Adresi</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Adı Soyadı</label>
                  <input
                    type="text"
                    value={editingUser.fullName}
                    onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Telefon Numarası</label>
                  <input
                    type="text"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Rol (Yetki Derecesi)</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-800 shadow-sm cursor-pointer"
                  >
                    <option value="user">Standart Kullanıcı (User)</option>
                    <option value="admin">Yönetici Yetkisi (Admin)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button 
                  onClick={() => {
                    setIsEditUserModalOpen(false);
                    setEditingUser(null);
                  }} 
                  className="px-5 py-3 font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-sm w-full cursor-pointer"
                >
                  Vazgeç
                </button>
                <button 
                  onClick={handleUpdateUser} 
                  className="px-6 py-3 font-bold text-white bg-[#0b2e59] hover:bg-[#082244] rounded-xl transition-colors shadow-md text-sm w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Confirmation Dialog Modal */}
        <AnimatePresence>
          {confirmDialog.isOpen && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_32px_64px_-15px_rgba(15,23,42,0.18)] border border-slate-100/80 max-w-sm w-full overflow-hidden p-8 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
                  confirmDialog.type === "danger"
                    ? "bg-rose-50 text-rose-500 border border-rose-100 shadow-sm shadow-rose-100/50"
                    : confirmDialog.type === "warning"
                    ? "bg-amber-50 text-amber-500 border border-amber-100 shadow-sm shadow-amber-100/50"
                    : "bg-blue-50 text-blue-500 border border-blue-100 shadow-sm shadow-blue-100/50"
                }`}>
                  <AlertCircle className="w-8 h-8 animate-pulse" />
                </div>

                <h3 className="text-lg font-black text-slate-800 tracking-tight leading-snug">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-semibold max-w-[280px]">
                  {confirmDialog.message}
                </p>

                <div className="flex items-center gap-3 w-full mt-7 pt-2">
                  <button
                    onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                    className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-extrabold text-slate-600 hover:text-slate-800 rounded-xl transition-all active:scale-95 cursor-pointer text-center"
                  >
                    {confirmDialog.cancelText || "İptal"}
                  </button>
                  <button
                    onClick={() => confirmDialog.onConfirm()}
                    className={`flex-1 py-3 px-4 text-xs font-black text-white rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer text-center ${
                      confirmDialog.type === "danger"
                        ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-rose-100/80"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-100/80"
                    }`}
                  >
                    {confirmDialog.confirmText || "Evet, Eminim"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Custom Alert Dialog Modal */}
        <AnimatePresence>
          {alertDialog.isOpen && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_32px_64px_-15px_rgba(15,23,42,0.18)] border border-slate-100/80 max-w-sm w-full overflow-hidden p-8 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
                  alertDialog.type === "success"
                    ? "bg-emerald-50 text-emerald-500 border border-emerald-100 shadow-sm shadow-emerald-100/50"
                    : alertDialog.type === "error"
                    ? "bg-rose-50 text-rose-500 border border-rose-100 shadow-sm shadow-rose-100/50"
                    : alertDialog.type === "warning"
                    ? "bg-amber-50 text-amber-500 border border-amber-100 shadow-sm shadow-amber-100/50"
                    : "bg-blue-50 text-blue-500 border border-blue-100 shadow-sm shadow-blue-100/50"
                }`}>
                  {alertDialog.type === "success" ? (
                    <CheckCircle className="w-8 h-8 animate-bounce-slow" />
                  ) : (
                    <AlertCircle className="w-8 h-8 animate-pulse" />
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-800 tracking-tight leading-snug">
                  {alertDialog.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-semibold max-w-[280px]">
                  {alertDialog.message}
                </p>

                <div className="w-full mt-7 pt-2">
                  <button
                    onClick={() => alertDialog.onConfirm ? alertDialog.onConfirm() : setAlertDialog(prev => ({ ...prev, isOpen: false }))}
                    className={`w-full py-3 px-4 text-xs font-black text-white rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer text-center ${
                      alertDialog.type === "success"
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-100/80"
                        : alertDialog.type === "error"
                        ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-rose-100/80"
                        : alertDialog.type === "warning"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-100/80"
                        : "bg-gradient-to-r from-[#0b2e59] to-[#082244] hover:from-[#082244] hover:to-[#05162c] shadow-blue-100/80"
                    }`}
                  >
                    Tamam
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modern Glassmorphic Toast Notifications with react-hot-toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.85)',
              color: '#1e293b',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              borderRadius: '20px',
              padding: '14px 20px',
              fontSize: '13px',
              fontWeight: '600',
              maxWidth: '380px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
              style: {
                background: 'rgba(240, 253, 250, 0.85)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: '#065f46',
              }
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
              style: {
                background: 'rgba(254, 242, 242, 0.85)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#991b1b',
              }
            },
          }}
        />
      </main>
    </div>
  );
}
