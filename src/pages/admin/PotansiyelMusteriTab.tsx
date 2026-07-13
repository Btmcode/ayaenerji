import React from 'react';
import { 
  Activity, Award, Briefcase, CheckCircle, Copy, DollarSign, 
  FileText, Filter, Maximize, MessageSquare, Phone, Plus, 
  Save, Search, Sparkles, Target, Trash, TrendingUp, User, X 
, Maximize2, Trash2} from 'lucide-react';

type RequestStatus = "Yeni Talep" | "Müşteri Arandı" | "Teklif Verildi" | "İş Tamamlandı";

interface PotansiyelMusteriTabProps {
  crmStats: any;
  crmSearch: string;
  setCrmSearch: (val: string) => void;
  crmDifficultyFilter: string;
  setCrmDifficultyFilter: (val: string) => void;
  crmProfitFilter: string;
  setCrmProfitFilter: (val: string) => void;
  isNewRequestModalOpen: boolean;
  setIsNewRequestModalOpen: (val: boolean) => void;
  newRequestForm: any;
  setNewRequestForm: (val: any) => void;
  isScoringLead: boolean;
  handleYeniTalep: () => void;
  filteredRequests: any[];
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, colStatus: RequestStatus) => void;
  handleDragStart: (e: React.DragEvent, id: string | number) => void;
  setSelectedCrmLead: (val: any) => void;
  updateRequestStatus: (id: string | number, status: RequestStatus) => void;
  handleAnalyzeLead: (lead: any) => void;
  isAnalyzingCrmLead: boolean;
  selectedCrmLead: any;
  leadNotes: string;
  setLeadNotes: (val: string) => void;
  handleSaveLeadNotes: (id: string) => void;
  isSavingLeadNotes: boolean;
  removeRequestDb: (id: string) => void;
  showConfirm: (title: string, msg: string, onConfirm: () => void) => void;
  showToast: (msg: string, type: "success" | "error" | "info" | "warning") => void;
}

export default function PotansiyelMusteriTab({
  crmStats,
  crmSearch,
  setCrmSearch,
  crmDifficultyFilter,
  setCrmDifficultyFilter,
  crmProfitFilter,
  setCrmProfitFilter,
  isNewRequestModalOpen,
  setIsNewRequestModalOpen,
  newRequestForm,
  setNewRequestForm,
  isScoringLead,
  handleYeniTalep,
  filteredRequests,
  handleDragOver,
  handleDrop,
  handleDragStart,
  setSelectedCrmLead,
  updateRequestStatus,
  handleAnalyzeLead,
  isAnalyzingCrmLead,
  selectedCrmLead,
  leadNotes,
  setLeadNotes,
  handleSaveLeadNotes,
  isSavingLeadNotes,
  removeRequestDb,
  showConfirm,
  showToast
}: PotansiyelMusteriTabProps) {

  
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
      }
    );
  };

  const triggerCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    showToast("Kopyalandı!", "success");
  };

  return (
    <>

            <div className="space-y-6">
              {/* Top CRM KPI Summary Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aktif Fırsatlar</p>
                    <h4 className="text-2xl font-black text-slate-800">{crmStats.active}</h4>
                    <p className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                      <Activity className="w-3 h-3" /> Takipteki Müşteriler
                    </p>
                  </div>
                  <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kazanılan Hizmetler</p>
                    <h4 className="text-2xl font-black text-slate-800">{crmStats.won}</h4>
                    <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Başarıyla Tamamlanan
                    </p>
                  </div>
                  <div className="p-3.5 bg-green-50 text-green-600 rounded-xl">
                    <Award className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yapay Zeka Kalite Skoru</p>
                    <h4 className="text-2xl font-black text-slate-800">%{crmStats.avgScore}</h4>
                    <p className="text-[10px] text-purple-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Ortalama Fırsat Skoru
                    </p>
                  </div>
                  <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl">
                    <Target className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tahmini Hacim</p>
                    <h4 className="text-2xl font-black text-slate-800">{crmStats.estimatedValue.toLocaleString("tr-TR")} ₺</h4>
                    <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Proje Hacim Potansiyeli
                    </p>
                  </div>
                  <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl">
                    <Briefcase className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Corporate Filters & Actions Area */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  {/* Search Bar */}
                  <div className="relative w-full md:max-w-xs">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Müşteri adı, tel veya hizmet ara..."
                      value={crmSearch}
                      onChange={(e) => setCrmSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-medium text-slate-700 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Difficulty Filter */}
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={crmDifficultyFilter}
                      onChange={(e) => setCrmDifficultyFilter(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/10"
                    >
                      <option value="Tüm">Zorluk: Tüm</option>
                      <option value="Kolay">Zorluk: Kolay</option>
                      <option value="Orta">Zorluk: Orta</option>
                      <option value="Zor">Zorluk: Zor</option>
                    </select>
                  </div>

                  {/* Profitability Filter */}
                  <div className="flex items-center gap-1.5">
                    <select
                      value={crmProfitFilter}
                      onChange={(e) => setCrmProfitFilter(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/10"
                    >
                      <option value="Tüm">Kârlılık: Tüm</option>
                      <option value="Düşük">Kârlılık: Düşük</option>
                      <option value="Orta">Kârlılık: Orta</option>
                      <option value="Yüksek">Kârlılık: Yüksek</option>
                    </select>
                  </div>

                  {/* Reset Filters button */}
                  {(crmSearch || crmDifficultyFilter !== "Tüm" || crmProfitFilter !== "Tüm") && (
                    <button
                      onClick={() => {
                        setCrmSearch("");
                        setCrmDifficultyFilter("Tüm");
                        setCrmProfitFilter("Tüm");
                      }}
                      className="text-xs font-bold text-[#0b2e59] hover:underline"
                    >
                      Filtreleri Sıfırla
                    </button>
                  )}
        
                </div>

                <button 
                  onClick={() => setIsNewRequestModalOpen(true)}
                  className="bg-[#0b2e59] hover:bg-[#ffb703] text-white hover:text-[#0b2e59] px-4 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-xs shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Yeni CRM Talebi
                </button>
              </div>

              {isNewRequestModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-slate-800 text-lg">Yeni Müşteri Talebi</h3>
                      <button onClick={() => setIsNewRequestModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Müşteri Adı</label>
                        <input
                          type="text"
                          value={newRequestForm.name}
                          onChange={(e) => setNewRequestForm({ ...newRequestForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm"
                          placeholder="Örn: Ahmet Yılmaz"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Telefon Numarası</label>
                        <input
                          type="tel"
                          value={newRequestForm.phone}
                          onChange={(e) => setNewRequestForm({ ...newRequestForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm"
                          placeholder="Örn: 0555 555 5555"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Talep Edilen Hizmet</label>
                        <textarea
                          value={newRequestForm.service}
                          onChange={(e) => setNewRequestForm({ ...newRequestForm, service: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm resize-none"
                          placeholder="Örn: Evdeki sigorta sürekli atıyor..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                      <button onClick={() => setIsNewRequestModalOpen(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors text-sm">
                        İptal
                      </button>
                      <button disabled={isScoringLead} onClick={handleYeniTalep} className="px-5 py-2 font-bold text-white bg-[#0b2e59] hover:bg-[#082244] rounded-lg transition-colors shadow-sm text-sm disabled:opacity-50">
                        {isScoringLead ? "Yapay Zeka Analiz Ediyor..." : "Kaydet ve CRM'e Ekle"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
    

              {/* Kanban CRM Board */}
              <div className="flex gap-6 overflow-x-auto pb-6 select-none">
                {(["Yeni Talep", "Müşteri Arandı", "Teklif Verildi", "İş Tamamlandı"] as RequestStatus[]).map((colStatus) => {
                  const colLeads = filteredRequests.filter(r => r.status === colStatus);
                  return (
                    <div key={colStatus} className="w-80 flex-shrink-0 flex flex-col bg-slate-50 border border-slate-200/50 rounded-2xl p-4 min-h-[620px]">
                      {/* Column Header */}
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/50">
                        <h4 className="font-bold text-slate-700 flex items-center gap-2 text-xs uppercase tracking-wider">
                          {colStatus === "Yeni Talep" && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>}
                          {colStatus === "Müşteri Arandı" && <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>}
                          {colStatus === "Teklif Verildi" && <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>}
                          {colStatus === "İş Tamamlandı" && <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>}
                          {colStatus}
                        </h4>
                        <span className="text-xs font-black text-slate-500 bg-white border border-slate-200/60 px-2 py-0.5 rounded-full shadow-sm">
                          {colLeads.length}
                        </span>
                      </div>

                      {/* Dropzone Column body */}
                      <div 
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, colStatus)}
                        className="flex-1 flex flex-col gap-3 min-h-[500px]"
                      >
                        {colLeads.length === 0 ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                            <Plus className="w-8 h-8 text-slate-300 mb-2" />
                            <p className="text-[11px] font-medium leading-normal">Bu aşamada fırsat bulunmuyor.<br/>Talepleri sürükleyebilirsiniz.</p>
                          </div>
                        ) : (
                          colLeads.map((req) => {
                            const score = (req as any).score;
                            return (
                              <div
                                key={req.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, req.id)}
                                onClick={(e) => {
                                  if (!(e.target as HTMLElement).closest('button, select, a')) {
                                    setSelectedCrmLead(req);
                                    setLeadNotes(req.notes || "");
                                  }
                                }}
                                className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0b2e59]/30 transition-all cursor-grab active:cursor-grabbing group relative flex flex-col space-y-3"
                              >
                                {/* Left Indicator Line */}
                                <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${
                                  colStatus === "Yeni Talep" ? "bg-blue-500" :
                                  colStatus === "Müşteri Arandı" ? "bg-amber-500" :
                                  colStatus === "Teklif Verildi" ? "bg-purple-500" :
                                  "bg-green-500"
                                }`}></div>

                                {/* Title Row */}
                                <div className="flex justify-between items-start gap-2">
                                  <h5 className="font-bold text-slate-800 text-sm line-clamp-1 flex-1">{req.name}</h5>
                                  <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                                    {req.time}
                                  </span>
                                </div>

                                {/* Service Description */}
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                  {req.service}
                                </p>

                                {/* Notes indicator snippet if present */}
                                {req.notes && (
                                  <div className="p-1.5 bg-slate-50 rounded border border-slate-100 text-[10px] text-slate-500 italic line-clamp-1">
                                    Not: {req.notes}
                                  </div>
                                )}
                      

                                {/* AI Score assessment badges */}
                                {score && (
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                      score.difficulty === 'Zor' ? 'bg-red-50 text-red-600 border-red-100' : 
                                      score.difficulty === 'Orta' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                      'bg-green-50 text-green-600 border-green-100'
                                    }`}>
                                      Zorluk: {score.difficulty}
                                    </span>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                      score.profitability === 'Yüksek' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                      score.profitability === 'Orta' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                      'bg-slate-50 text-slate-600 border-slate-100'
                                    }`}>
                                      Kâr: {score.profitability}
                                    </span>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-purple-50 text-purple-600 border-purple-100">
                                      Skor: {score.score}/100
                                    </span>
                                  </div>
                                )}
                      

                                {/* Card Footer Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                                  <a
                                    href={`tel:${req.phone.replace(/\s+/g, "")}`}
                                    className="text-[10px] font-extrabold text-[#0b2e59] hover:text-[#ffb703] flex items-center gap-1 bg-[#0b2e59]/5 px-2 py-1 rounded transition-colors"
                                  >
                                    <Phone className="w-3 h-3" /> {req.phone}
                                  </a>
                                  
                                  <div className="flex items-center gap-1">
                                    {/* Quick Status Cycler */}
                                    <select
                                      value={req.status}
                                      onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                                      className="opacity-0 group-hover:opacity-100 px-1.5 py-1 rounded text-[9px] font-bold border focus:outline-none transition-opacity cursor-pointer bg-slate-50 text-slate-600 border-slate-200"
                                    >
                                      <option value="Yeni Talep">Yeni Talep</option>
                                      <option value="Müşteri Arandı">Arandı</option>
                                      <option value="Teklif Verildi">Teklif</option>
                                      <option value="İş Tamamlandı">Tamamlandı</option>
                                    </select>

                                    {/* Details maximize button */}
                                    <button 
                                      onClick={() => {
                                        setSelectedCrmLead(req);
                                        setLeadNotes(req.notes || "");
                                      }}
                                      className="text-slate-400 hover:text-[#0b2e59] p-1 bg-slate-50 hover:bg-slate-100 rounded"
                                      title="Detaylar"
                                    >
                                      <Maximize2 className="w-3 h-3" />
                                    </button>

                                    {/* Delete Button */}
                                    <button 
                                      onClick={() => handleDeleteRequest(req.id)}
                                      className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-50 hover:bg-red-100 rounded"
                                      title="Sil"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
              
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Redesigned CRM Client details modal/drawer */}
              {selectedCrmLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#0b2e59]/10 text-[#0b2e59] flex items-center justify-center font-bold">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg">{selectedCrmLead.name}</h3>
                          <span className="text-xs text-slate-400 font-medium">CRM Fırsat Detay Raporu</span>
                        </div>
                      </div>
                      <button onClick={() => setSelectedCrmLead(null)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 overflow-y-auto space-y-6 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Left Side: Client Info & Quick Response */}
                      <div className="space-y-4">
                        <div className="p-4.5 bg-slate-50 rounded-xl border border-slate-100 space-y-3.5">
                          <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-slate-400" /> Müşteri ve İletişim Kartı
                          </h4>
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase">TELEFON NUMARASI</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold text-slate-800">{selectedCrmLead.phone}</span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedCrmLead.phone);
                                  showToast("Telefon numarası kopyalandı!", "success");
                                }}
                                className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600"
                                title="Numarayı Kopyala"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase">ZAMAN / SAAT</span>
                            <span className="text-sm font-medium text-slate-700 block mt-0.5">{selectedCrmLead.time || "Kayıtlı Değil"}</span>
                          </div>

                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase">TALEP DETAYI</span>
                            <p className="text-xs font-semibold text-slate-700 leading-relaxed mt-1 whitespace-pre-line p-2.5 bg-white border border-slate-200/60 rounded-lg">
                              {selectedCrmLead.service}
                            </p>
                          </div>
                        </div>

                        {/* Quick Response panel */}
                        <div className="p-4.5 bg-[#0b2e59]/5 rounded-xl border border-[#0b2e59]/10 space-y-3">
                          <h4 className="font-bold text-[#0b2e59] text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" /> Hızlı İletişim Kanalları
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            <a 
                              href={`tel:${selectedCrmLead.phone.replace(/\s+/g, "")}`}
                              className="flex items-center justify-center gap-2 py-2 bg-[#0b2e59] hover:bg-[#082244] text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" /> Hemen Ara
                            </a>
                            <a 
                              href={`https://wa.me/${selectedCrmLead.phone.replace(/[^0-9]/g, "")}?text=Merhaba%20${encodeURIComponent(selectedCrmLead.name)},%20Aya%20Elektrik%20tarafından%20iletilen%20talebinizle%20ilgili%20ulaşıyorum.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Yaz
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: AI Assessment & Notes */}
                      <div className="space-y-4">
                        {/* AI Quality Report panel */}
                        <div className="p-4.5 bg-purple-50/50 rounded-xl border border-purple-100 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-purple-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Yapay Zeka Analiz Raporu
                            </h4>
                            {selectedCrmLead.score && (
                              <span className="text-[10px] font-extrabold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                Skor: {selectedCrmLead.score.score}/100
                              </span>
                            )}
                  
                          </div>

                          {selectedCrmLead.score ? (
                            <div className="space-y-2.5 text-xs text-slate-600">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 bg-white rounded-lg border border-purple-100/50 text-center">
                                  <span className="block text-[9px] text-slate-400 font-bold uppercase">İŞ ZORLUĞU</span>
                                  <span className="font-bold text-slate-800 text-xs mt-0.5 block">{selectedCrmLead.score.difficulty}</span>
                                </div>
                                <div className="p-2 bg-white rounded-lg border border-purple-100/50 text-center">
                                  <span className="block text-[9px] text-slate-400 font-bold uppercase">PROJE KÂRLILIĞI</span>
                                  <span className="font-bold text-slate-800 text-xs mt-0.5 block">{selectedCrmLead.score.profitability}</span>
                                </div>
                              </div>

                              <div className="bg-white p-3 rounded-lg border border-purple-100/50 space-y-1.5">
                                <span className="block text-[9px] text-purple-700 font-black uppercase tracking-wider">YAPAY ZEKA YAKLAŞIM ÖNERİSİ</span>
                                <p className="text-[11px] leading-relaxed text-slate-600 italic">
                                  "{selectedCrmLead.score.reasoning || "TSE standartlarında ekipman ve net garanti vaadiyle yaklaşın. 30 dakikalık adrese ulaşım taahhüdümüzü vurgulayın."}"
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-4 bg-white rounded-xl border border-purple-100/40">
                              <p className="text-xs text-slate-500 mb-3">Bu talebe henüz AI kalite analizi uygulanmamış.</p>
                              <button
                                onClick={() => handleAnalyzeLead(selectedCrmLead)}
                                disabled={isAnalyzingCrmLead}
                                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50 inline-flex items-center gap-1.5 shadow-sm"
                              >
                                <Sparkles className="w-3.5 h-3.5" /> {isAnalyzingCrmLead ? "Analiz Ediliyor..." : "AI Skorlama Analizi Başlat"}
                              </button>
                            </div>
                          )}
                        </div>

                        {/* CRM Notes panel */}
                        <div className="p-4.5 bg-white rounded-xl border border-slate-100 space-y-3.5">
                          <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span>Yönetici Özel İş Notları</span>
                            <span className="text-[9px] text-slate-400 font-medium">Sadece siz görürsünüz</span>
                          </h4>

                          <div className="space-y-2">
                            <textarea
                              value={leadNotes}
                              onChange={(e) => setLeadNotes(e.target.value)}
                              placeholder="Müşteriyle yapılan görüşmeleri, verilen teklifleri veya randevu tarihlerini not alın..."
                              rows={3}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 text-xs resize-none placeholder:text-slate-400"
                            />
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleSaveLeadNotes(selectedCrmLead.id)}
                                disabled={isSavingLeadNotes}
                                className="px-4 py-1.5 bg-[#0b2e59] hover:bg-[#082244] text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1.5"
                              >
                                <Save className="w-3.5 h-3.5" />
                                {isSavingLeadNotes ? "Not Kaydediliyor..." : "Notu Kaydet"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center bg-slate-50">
                      <button
                        onClick={() => {
                          showConfirm(
                            "Talebi Sil",
                            "Bu CRM talebini silmek istediğinize emin misiniz?",
                            async () => {
                              try {
                                await removeRequestDb(selectedCrmLead.id);
                                showToast("Talep başarıyla silindi.", "success");
                                setSelectedCrmLead(null);
                              } catch (e: any) {
                                showToast("Silme hatası: " + e.message, "error");
                              }
                            }
                          );
                        }}
                        className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" /> Talebi Kalıcı Olarak Sil
                      </button>

                      <div className="flex items-center gap-2">
                        <select
                          value={selectedCrmLead.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as RequestStatus;
                            updateRequestStatus(selectedCrmLead.id, newStatus);
                            setSelectedCrmLead((prev: any) => prev ? { ...prev, status: newStatus } : null);
                          }}
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/10 cursor-pointer"
                        >
                          <option value="Yeni Talep">Yeni Talep</option>
                          <option value="Müşteri Arandı">Müşteri Arandı</option>
                          <option value="Teklif Verildi">Teklif Verildi</option>
                          <option value="İş Tamamlandı">İş Tamamlandı</option>
                        </select>
                        <button 
                          onClick={() => setSelectedCrmLead(null)} 
                          className="px-5 py-2 font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors text-xs"
                        >
                          Kapat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


    </>
  );
}
