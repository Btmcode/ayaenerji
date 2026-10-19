import React from 'react';
import { 
  Sparkles, ShieldCheck, Map, DollarSign, Activity, Award, CheckCircle, TrendingUp,
  Globe, Clock, Users, ArrowRight 
} from 'lucide-react';

interface DashboardTabProps {
  setActiveTab: (tab: string) => void;
  requests: any[];
  blogPosts: any[];
}

export default function DashboardTab({ setActiveTab, requests, blogPosts }: DashboardTabProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panele Hoş Geldiniz</h1>
          <p className="text-slate-500 text-sm mt-1">İşletmenizin bugünkü performans özetini aşağıdan takip edebilirsiniz.</p>
        </div>
        <button className="bg-[#0b2e59] hover:bg-[#082244] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto">
          Rapor İndir
        </button>
      </div>

      {/* Kurumsal Operasyon ve Yapay Zeka Özet Paneli */}
      <div className="bg-gradient-to-r from-[#0b2e59] to-[#082244] text-white rounded-3xl p-6 shadow-lg border border-white/5 relative overflow-hidden mt-6">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-white/[0.03] rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb703] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffb703]"></span>
              </span>
              <p className="text-[11px] uppercase tracking-wider font-extrabold text-[#ffb703]">Kritik Operasyon Merkezi</p>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Kurumsal İşletme Özet & Akıllı Asistan Önerileri</h2>
            <p className="text-white/75 text-xs max-w-2xl leading-relaxed">
              Sistem verileriniz gerçek zamanlı analiz edildi. İşletme verimliliğini ve yerel SEO dönüşümlerini en üst seviyede tutmak için aşağıdaki adımları uygulayabilirsiniz.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab("AI İçerik Asistanı")}
              className="bg-[#ffb703] hover:bg-[#e0a102] text-[#0b2e59] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm transform hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Yapay Zekayı Başlat
            </button>
            <button 
              onClick={() => setActiveTab("Sistem Rehberi")}
              className="bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
            >
              Kılavuzu Oku
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm">SEO Eksiklikleri</h3>
            </div>
            <p className="text-xs text-white/60">
              Şu an için yeni bir SEO eksikliği bulunmuyor.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm">Potansiyel Müşteri</h3>
            </div>
            <p className="text-xs text-white/60">
              Bekleyen {requests.filter(r => r.status === "Yeni Talep").length} yeni elektrik arıza veya proje talebi var. Müşterilerle hızlı iletişime geçin.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm">Blog İstatistikleri</h3>
            </div>
            <p className="text-xs text-white/60">
              Toplam <b>{blogPosts.length} adet yerel SEO blog yazısı</b> yayında. İstanbul'da görünürlüğü artırmak için yeni içerikler planlayın.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[
          { title: "Toplam Ciro", value: "₺0", trend: "0%", color: "text-emerald-600", bg: "bg-emerald-50", icon: DollarSign },
          { title: "Aktif İşler", value: requests.filter(r => r.status === "Yeni Talep").length.toString(), trend: "Yeni Bekleyen", color: "text-blue-600", bg: "bg-blue-50", icon: Activity },
          { title: "Müşteri Memnuniyeti", value: "%0", trend: "0%", color: "text-[#0b2e59]", bg: "bg-[#0b2e59]/10", icon: Award },
          { title: "Tamamlanan İş", value: requests.filter(r => r.status === "İş Tamamlandı").length.toString(), trend: "Son 30 Gün", color: "text-purple-600", bg: "bg-purple-50", icon: CheckCircle },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 w-16 h-16 ${stat.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-slate-500'} bg-slate-50 px-2 py-1 rounded-md`}>
                {stat.trend}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Aylık SEO ve Dönüşüm Performansı</h2>
              <p className="text-xs text-slate-500 mt-1">Son 30 gündeki organik trafik ve telefon aramaları.</p>
            </div>
            <button 
              onClick={() => setActiveTab("SEO Performansı")}
              className="text-sm text-[#0b2e59] font-medium hover:text-[#ffb703] transition-colors flex items-center gap-1"
            >
              Detaylı Rapor <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-slate-400 text-sm font-medium">Henüz yeterli veri bulunmuyor</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Son İletişim Formları</h2>
            <button 
              onClick={() => setActiveTab("Potansiyel Müşteri")}
              className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-[#0b2e59] transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {requests.slice(0, 4).map((req: any) => (
              <div key={req.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-800 truncate pr-2">{req.name}</h4>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2 truncate">{req.service}</p>
                <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(req.time).toLocaleDateString("tr-TR")}</span>
                </div>
              </div>
            ))}
            {requests.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-500 font-medium">Henüz bir müşteri talebi yok.</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setActiveTab("Potansiyel Müşteri")}
            className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#0b2e59] transition-colors"
          >
            Tüm Talepleri Gör
          </button>
        </div>
      </div>
    </>
  );
}
