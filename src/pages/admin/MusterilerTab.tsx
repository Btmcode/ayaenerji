import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  X, 
  MessageSquare, 
  PhoneCall, 
  Search, 
  Edit2, 
  Trash2, 
  User, 
  MapPin, 
  Clock, 
  CheckCircle,
  Copy
} from 'lucide-react';

interface MusterilerTabProps {
  customers: any[];
  isCustomerModalOpen: boolean;
  setIsCustomerModalOpen: (val: boolean) => void;
  customerForm: any;
  setCustomerForm: (val: any) => void;
  editingCustomer: any;
  setEditingCustomer: (val: any) => void;
  handleSaveCustomer: () => void;
  handleDeleteCustomer: (id: string) => void;
  showToast?: (msg: string, type?: "success" | "error" | "info" | "warning") => void;
}

export default function MusterilerTab({
  customers = [],
  isCustomerModalOpen,
  setIsCustomerModalOpen,
  customerForm,
  setCustomerForm,
  editingCustomer,
  setEditingCustomer,
  handleSaveCustomer,
  handleDeleteCustomer,
  showToast
}: MusterilerTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tümü");

  const filteredCustomers = useMemo(() => {
    return customers.filter((c: any) => {
      const status = c.status || c.durum || "Aktif";
      if (statusFilter !== "Tümü" && status !== statusFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const name = (c.name || "").toLowerCase();
      const phone = (c.phone || c.tel || "").replace(/\s+/g, "");
      const service = (c.service || c.sonHizmet || "").toLowerCase();
      const district = (c.district || "").toLowerCase();

      return name.includes(q) || phone.includes(q) || service.includes(q) || district.includes(q);
    });
  }, [customers, statusFilter, searchQuery]);

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    if (showToast) showToast("Telefon numarası kopyalandı!", "info");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b2e59]">
            Müşteri Portföyü &amp; Rehber
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Kayıtlı ev, ofis ve ticari işletmelerin servis geçmişi ve iletişim rehberi.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => {
            setEditingCustomer(null);
            setCustomerForm({ name: "", phone: "", service: "Genel Elektrik", status: "Aktif", district: "Zeytinburnu" });
            setIsCustomerModalOpen(true);
          }}
          className="px-4 py-2 bg-[#ffb703] hover:bg-[#e0a000] text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all active:scale-95 inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Yeni Müşteri Kaydet</span>
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
            placeholder="İsim, telefon veya hizmet ara..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {["Tümü", "Aktif", "Potansiyel", "Tamamlandı"].map((status) => (
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

      {/* Customer Cards Grid */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
          Kayıtlı müşteri bulunamadı. Yeni bir müşteri ekleyebilirsiniz.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCustomers.map((cust: any) => {
            const phone = cust.phone || cust.tel || "";
            const status = cust.status || cust.durum || "Aktif";

            return (
              <div
                key={cust.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#0b2e59]/10 text-[#0b2e59] font-black text-base flex items-center justify-center shrink-0">
                        {cust.name ? cust.name.charAt(0).toUpperCase() : "M"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-slate-900 truncate">
                          {cust.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <span>{phone || "Numara Yok"}</span>
                          {phone && (
                            <button
                              type="button"
                              onClick={() => copyPhone(phone)}
                              className="p-0.5 text-slate-400 hover:text-slate-600"
                              title="Kopyala"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      status === "Aktif"
                        ? "bg-blue-100 text-blue-800"
                        : status === "Tamamlandı"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {status}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100 mb-4">
                    <span className="font-semibold text-slate-700 block text-[11px] mb-0.5">
                      Alınan Hizmet / Not:
                    </span>
                    <p className="line-clamp-2">
                      {cust.service || cust.sonHizmet || "Genel Servis Hizmeti"}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {phone && (
                      <>
                        <a
                          href={`tel:${phone.replace(/\s+/g, '')}`}
                          className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Hemen Ara"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/90${phone.replace(/\D/g, '').replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="WhatsApp'tan Yaz"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCustomer(cust);
                        setCustomerForm({
                          name: cust.name || "",
                          phone: phone,
                          service: cust.service || cust.sonHizmet || "",
                          status: status
                        });
                        setIsCustomerModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Düzenle</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCustomer(cust.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Müşteriyi Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Customer Add/Edit Modal */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-[#0b2e59] text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">
                {editingCustomer ? "Müşteri Bilgilerini Düzenle" : "Yeni Müşteri Ekle"}
              </h3>
              <button 
                type="button" 
                onClick={() => setIsCustomerModalOpen(false)} 
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Müşteri Adı Soyadı *</label>
                <input
                  type="text"
                  value={customerForm.name}
                  onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                  placeholder="Örn: Mehmet Özkan"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Telefon Numarası *</label>
                <input
                  type="tel"
                  value={customerForm.phone}
                  onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                  placeholder="05XX XXX XX XX"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hizmet / Not</label>
                <input
                  type="text"
                  value={customerForm.service}
                  onChange={(e) => setCustomerForm({ ...customerForm, service: e.target.value })}
                  placeholder="Klima Hattı Çekimi, Pano Değişimi vb."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Durum</label>
                <select
                  value={customerForm.status}
                  onChange={(e) => setCustomerForm({ ...customerForm, status: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Potansiyel">Potansiyel</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomer}
                  className="px-5 py-2 font-black text-slate-950 bg-[#ffb703] hover:bg-[#e0a000] rounded-xl shadow-xs"
                >
                  {editingCustomer ? "Güncelle" : "Kaydet"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
