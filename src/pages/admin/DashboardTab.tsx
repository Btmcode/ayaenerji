import React from 'react';
import { 
  PhoneCall, 
  Users, 
  FileText, 
  DollarSign, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  ShieldCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface DashboardTabProps {
  setActiveTab: (tab: string) => void;
  requests: any[];
  customers: any[];
  blogPosts: any[];
  setIsNewRequestModalOpen: (val: boolean) => void;
  setIsCustomerModalOpen: (val: boolean) => void;
}

export default function DashboardTab({ 
  setActiveTab, 
  requests = [], 
  customers = [], 
  blogPosts = [],
  setIsNewRequestModalOpen,
  setIsCustomerModalOpen
}: DashboardTabProps) {
  
  const pendingRequests = requests.filter(r => r.status === "Yeni Talep" || !r.status);
  const activeRequests = requests.filter(r => r.status === "Müşteri Arandı" || r.status === "Teklif Verildi");
  const completedRequests = requests.filter(r => r.status === "İş Tamamlandı");
  const publishedPosts = blogPosts.filter(p => p.status === "Yayında");

  const recentRequests = [...requests].reverse().slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b2e59] tracking-tight">
            Yönetim Kontrol Paneli
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Aya Elektrik operasyonel talep, müşteri ve içerik yönetim merkezi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsNewRequestModalOpen(true)}
            className="px-4 py-2 bg-[#ffb703] hover:bg-[#e0a000] text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all active:scale-95 inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Arıza / Talep Ekle</span>
          </button>
          
          <button
            type="button"
            onClick={() => setIsCustomerModalOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-xs transition-all inline-flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Müşteri Kaydet</span>
          </button>
        </div>
      </div>

      {/* Primary Real Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: Bekleyen Yeni Talepler */}
        <div 
          onClick={() => setActiveTab("Talepler")}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Bekleyen Talepler</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {pendingRequests.length}
          </div>
          <div className="mt-2 text-xs text-amber-700 font-semibold flex items-center gap-1">
            <span>{activeRequests.length} talep işlemde</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform ml-auto" />
          </div>
        </div>

        {/* Metric 2: Toplam Müşteri Portföyü */}
        <div 
          onClick={() => setActiveTab("Müşteriler")}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Kayıtlı Müşteriler</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0b2e59] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {customers.length}
          </div>
          <div className="mt-2 text-xs text-slate-500 font-semibold flex items-center gap-1">
            <span>Rehber ve servis geçmişi</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform ml-auto" />
          </div>
        </div>

        {/* Metric 3: Yayındaki Blog Rehberleri */}
        <div 
          onClick={() => setActiveTab("Blog")}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Aktif Blog Rehberleri</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {publishedPosts.length || blogPosts.length}
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <span>Yerel SEO ve içerik yayında</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform ml-auto" />
          </div>
        </div>

        {/* Metric 4: Tamamlanan Servisler */}
        <div 
          onClick={() => setActiveTab("Talepler")}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Tamamlanan İşler</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {completedRequests.length}
          </div>
          <div className="mt-2 text-xs text-slate-500 font-semibold flex items-center gap-1">
            <span>Garantili tamamlanan arıza</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform ml-auto" />
          </div>
        </div>

      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column: Son Gelen Servis Talepleri (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Son Gelen Arıza &amp; Servis Talepleri
                </h3>
                <p className="text-xs text-slate-500">
                  Siteden veya telefondan iletilen son çağrılar
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("Talepler")}
                className="text-xs font-bold text-[#0b2e59] hover:text-amber-600 inline-flex items-center gap-1 transition-colors"
              >
                <span>Tümünü Gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentRequests.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                Kayıtlı talep bulunmuyor. Yeni bir talep ekleyebilir veya sitenizden gelen formları buradan izleyebilirsiniz.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentRequests.map((req) => (
                  <div key={req.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {req.name || "İsimsiz Müşteri"}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          req.status === "İş Tamamlandı"
                            ? "bg-emerald-100 text-emerald-800"
                            : req.status === "Müşteri Arandı"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {req.status || "Yeni Talep"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {req.service || "Genel Elektrik Arızası"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${(req.phone || '').replace(/\s+/g, '')}`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-[#0b2e59] hover:text-white text-slate-800 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3 h-3 text-amber-500" />
                        <span>{req.phone || "Numara Yok"}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Toplam {requests.length} talep kayıtlı</span>
            <button
              type="button"
              onClick={() => setIsNewRequestModalOpen(true)}
              className="text-[#0b2e59] font-bold hover:underline"
            >
              + Hızlı Talep Oluştur
            </button>
          </div>
        </div>

        {/* Right Column: Hızlı Yönetim & Sistem Durumu (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900">
              Hızlı Kısayollar
            </h3>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("Blog")}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left font-semibold text-slate-700 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>Yeni Blog Rehberi Yaz</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("AdSense")}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left font-semibold text-slate-700 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Google AdSense &amp; Gelir</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Ayarlar")}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left font-semibold text-slate-700 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0b2e59]" />
                  <span>Yönetici &amp; Güvenlik Ayarları</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Operational Status */}
          <div className="bg-gradient-to-br from-[#0b2e59] to-[#071d37] rounded-2xl p-5 text-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                7/24 Kesintisiz Nöbet
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h4 className="text-base font-extrabold text-white leading-snug">
              İstanbul 39 İlçe Mobil Saha
            </h4>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Acil çağrı yönlendirme ve müşteri iletişim hattı <strong>0530 069 53 93</strong> üzerinden 7/24 aktiftir.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
