import React, { useState, useMemo } from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  X, 
  Trash2, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Edit2,
  Calendar,
  User,
  Wrench,
  Star
} from 'lucide-react';
import { sendTelegramSatisfaction } from '../../utils/telegramClient';

export type RequestStatus = "Yeni Talep" | "Müşteri Arandı" | "Teklif Verildi" | "İş Tamamlandı";

interface TaleplerTabProps {
  requests: any[];
  addRequestDb: (item: any) => Promise<any>;
  updateRequestDb: (id: string, updates: any) => Promise<any>;
  removeRequestDb: (id: string) => Promise<void>;
  showToast: (msg: string, type?: "success" | "error" | "info" | "warning") => void;
  showConfirm: (title: string, msg: string, onConfirm: () => void) => void;
  isNewRequestModalOpen: boolean;
  setIsNewRequestModalOpen: (val: boolean) => void;
}

export default function TaleplerTab({
  requests = [],
  addRequestDb,
  updateRequestDb,
  removeRequestDb,
  showToast,
  showConfirm,
  isNewRequestModalOpen,
  setIsNewRequestModalOpen
}: TaleplerTabProps) {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Tümü");
  
  // New Request Form State
  const [newForm, setNewForm] = useState({
    name: "",
    phone: "",
    service: "Elektrik Arızası",
    district: "Zeytinburnu",
    notes: "",
    status: "Yeni Talep" as RequestStatus
  });

  // Selected lead for detail/notes editing
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesStatus = statusFilter === "Tümü" || (req.status || "Yeni Talep") === statusFilter;
      if (!matchesStatus) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = req.name?.toLowerCase().includes(q);
      const phoneMatch = req.phone?.includes(q);
      const serviceMatch = req.service?.toLowerCase().includes(q);
      const districtMatch = req.district?.toLowerCase().includes(q);

      return nameMatch || phoneMatch || serviceMatch || districtMatch;
    });
  }, [requests, statusFilter, searchQuery]);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name.trim() || !newForm.phone.trim()) {
      showToast("Müşteri adı ve telefon numarası zorunludur.", "warning");
      return;
    }

    try {
      await addRequestDb({
        ...newForm,
        createdAt: new Date().toISOString(),
        time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        date: new Date().toLocaleDateString("tr-TR")
      });
      showToast("Arıza/Talep kaydı başarıyla oluşturuldu.", "success");
      setIsNewRequestModalOpen(false);
      setNewForm({
        name: "",
        phone: "",
        service: "Elektrik Arızası",
        district: "Zeytinburnu",
        notes: "",
        status: "Yeni Talep"
      });
    } catch (err: any) {
      showToast("Kayıt oluşturulurken hata: " + err.message, "error");
    }
  };

  const handleStatusChange = async (id: string, newStatus: RequestStatus) => {
    try {
      await updateRequestDb(id, { status: newStatus });
      showToast(`Durum "${newStatus}" olarak güncellendi.`, "success");
    } catch (err: any) {
      showToast("Durum güncellenemedi: " + err.message, "error");
    }
  };

  const handleSaveNotes = async (id: string) => {
    setIsSavingNotes(true);
    try {
      await updateRequestDb(id, { notes: editingNotes });
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, notes: editingNotes });
      }
      showToast("Notlar kaydedildi.", "success");
    } catch (err: any) {
      showToast("Not kaydedilemedi: " + err.message, "error");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleSendSurvey = (req: any) => {
    const rawPhone = (req.phone || "").replace(/\D/g, "");
    const cleanPhone = rawPhone.startsWith("90") ? rawPhone : (rawPhone.startsWith("0") ? "9" + rawPhone : "90" + rawPhone);
    const customerName = req.name || "Değerli Müşterimiz";
    const serviceName = req.service || "Elektrik Arıza Bakım Servisi";

    const surveyMsg = `Merhaba Sayın ${customerName},\n\nAya Elektrik 7/24 Acil Servis olarak "${serviceName}" talebinizi tamamlamış bulunmaktayız. Ustamızın işçiliğinden ve servis kalitemizden memnun kaldınız mı? Hizmetimizi 1 ile 5 yıldız arasında puanlayabilirseniz çok seviniriz.\n\nİyi günler dileriz,\nAya Elektrik`;

    // Notify Telegram channel
    sendTelegramSatisfaction({
      customerName,
      phone: req.phone || "-",
      service: serviceName,
      rating: 5,
      comment: "Müşteriye otomatik memnuniyet anketi yönlendirildi."
    }).catch(() => {});

    // Open WhatsApp to deliver prompt
    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(surveyMsg)}`, "_blank");
    }
    showToast("Müşteri memnuniyet mesajı oluşturuldu ve Telegram'a kaydedildi.", "success");
  };

  const handleDelete = (id: string, name: string) => {
    showConfirm(
      "Talebi Sil",
      `"${name || 'Seçili'}" talebini kalıcı olarak silmek istediğinize emin misiniz?`,
      async () => {
        try {
          await removeRequestDb(id);
          if (selectedLead?.id === id) setSelectedLead(null);
          showToast("Talep başarıyla silindi.", "success");
        } catch (err: any) {
          showToast("Silme hatası: " + err.message, "error");
        }
      }
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Numara kopyalandı!", "info");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b2e59]">
            Gelen Talepler ve Çağrı CRM
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Web sitesi formlarından, aramalardan ve WhatsApp üzerinden gelen servis talepleri.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewRequestModalOpen(true)}
          className="px-4 py-2 bg-[#ffb703] hover:bg-[#e0a000] text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all active:scale-95 inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Yeni Servis Talebi Ekle</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İsim, telefon, hizmet veya ilçe ara..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {["Tümü", "Yeni Talep", "Müşteri Arandı", "Teklif Verildi", "İş Tamamlandı"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? "bg-[#0b2e59] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Requests Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            Arama veya filtre kriterlerinize uygun talep bulunamadı.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <th className="py-3 px-4">Tarih</th>
                  <th className="py-3 px-4">Müşteri</th>
                  <th className="py-3 px-4">Telefon</th>
                  <th className="py-3 px-4">Talep / Hizmet</th>
                  <th className="py-3 px-4">Durum</th>
                  <th className="py-3 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {req.date || new Date().toLocaleDateString("tr-TR")}
                      {req.time && <span className="block text-[11px] text-slate-400">{req.time}</span>}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{req.name || "İsimsiz"}</span>
                      </div>
                      {req.district && (
                        <span className="text-[11px] font-normal text-slate-400 block ml-5">
                          {req.district}
                        </span>
                      )}
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${(req.phone || '').replace(/\s+/g, '')}`}
                          className="font-bold text-slate-800 hover:text-[#0b2e59] hover:underline"
                        >
                          {req.phone || "-"}
                        </a>
                        {req.phone && (
                          <button
                            type="button"
                            onClick={() => copyToClipboard(req.phone)}
                            className="p-1 text-slate-400 hover:text-slate-600 rounded"
                            title="Kopyala"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">
                        {req.service || "Genel Arıza"}
                      </span>
                      {req.notes && (
                        <span className="text-[11px] text-slate-500 line-clamp-1 italic">
                          Not: {req.notes}
                        </span>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={req.status || "Yeni Talep"}
                        onChange={(e) => handleStatusChange(req.id, e.target.value as RequestStatus)}
                        className={`text-xs font-bold py-1 px-2.5 rounded-lg border focus:outline-none transition-colors cursor-pointer ${
                          req.status === "İş Tamamlandı"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : req.status === "Müşteri Arandı"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : req.status === "Teklif Verildi"
                            ? "bg-purple-50 text-purple-800 border-purple-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        <option value="Yeni Talep">Yeni Talep</option>
                        <option value="Müşteri Arandı">Müşteri Arandı</option>
                        <option value="Teklif Verildi">Teklif Verildi</option>
                        <option value="İş Tamamlandı">İş Tamamlandı</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Call Button */}
                        <a
                          href={`tel:${(req.phone || '').replace(/\s+/g, '')}`}
                          className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Hemen Ara"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </a>

                        {/* WhatsApp Button */}
                        {req.phone && (
                          <a
                            href={`https://wa.me/90${req.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                            title="WhatsApp Mesajı Gönder"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* Customer Satisfaction Survey Button */}
                        <button
                          type="button"
                          onClick={() => handleSendSurvey(req)}
                          className="p-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                          title="Memnuniyet Anketi İlet (Telegram & WhatsApp)"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                        </button>

                        {/* Notes / Details Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLead(req);
                            setEditingNotes(req.notes || "");
                          }}
                          className="p-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                          title="Not Ekle / Düzenle"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(req.id, req.name)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Talebi Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Yeni Talep Ekle */}
      {isNewRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-[#0b2e59] text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">Yeni Servis Talebi Oluştur</h3>
              <button 
                type="button" 
                onClick={() => setIsNewRequestModalOpen(false)} 
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Müşteri Adı Soyadı *</label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="Örn: Hasan Yılmaz"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Telefon Numarası *</label>
                <input
                  type="tel"
                  required
                  value={newForm.phone}
                  onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                  placeholder="05XX XXX XX XX"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hizmet Türü</label>
                  <select
                    value={newForm.service}
                    onChange={(e) => setNewForm({ ...newForm, service: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                  >
                    <option value="Elektrik Arızası">Elektrik Arızası</option>
                    <option value="Pano Yenileme">Pano Yenileme</option>
                    <option value="Klima & Kombi Hattı">Klima & Kombi Hattı</option>
                    <option value="Şofben Montajı">Şofben Montajı</option>
                    <option value="Kaçak Akım Rölesi">Kaçak Akım Rölesi</option>
                    <option value="Tesisat & Aydınlatma">Tesisat & Aydınlatma</option>
                    <option value="Fuar & Endüstriyel">Fuar & Endüstriyel</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">İlçe</label>
                  <input
                    type="text"
                    value={newForm.district}
                    onChange={(e) => setNewForm({ ...newForm, district: e.target.value })}
                    placeholder="Zeytinburnu, Şişli vb."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Arıza / İş Notları</label>
                <textarea
                  rows={2}
                  value={newForm.notes}
                  onChange={(e) => setNewForm({ ...newForm, notes: e.target.value })}
                  placeholder="Şalter atıyor, priz cızırdıyor vb."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewRequestModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-black text-slate-950 bg-[#ffb703] hover:bg-[#e0a000] rounded-xl shadow-xs"
                >
                  Talebi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Not Düzenleme */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Talep Notları &amp; Detay</h3>
                <p className="text-[11px] text-slate-500">{selectedLead.name} · {selectedLead.phone}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedLead(null)} 
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Servis Notu &amp; Usta Bilgisi</label>
                <textarea
                  rows={4}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Usta yönlendirildi, parça değişti, ücret tahsil edildi vb."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Kapat
                </button>
                <button
                  type="button"
                  disabled={isSavingNotes}
                  onClick={() => handleSaveNotes(selectedLead.id)}
                  className="px-5 py-2 font-black text-white bg-[#0b2e59] hover:bg-[#082242] rounded-xl shadow-xs"
                >
                  {isSavingNotes ? "Kaydediliyor..." : "Notu Kaydet"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
