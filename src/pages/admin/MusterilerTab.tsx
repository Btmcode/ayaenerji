import React from 'react';
import { Plus, X, MessageSquare } from 'lucide-react';

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
}

export default function MusterilerTab({
  customers,
  isCustomerModalOpen,
  setIsCustomerModalOpen,
  customerForm,
  setCustomerForm,
  editingCustomer,
  setEditingCustomer,
  handleSaveCustomer,
  handleDeleteCustomer
}: MusterilerTabProps) {
  return (
    <>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col relative">
              {isCustomerModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-slate-800 text-lg">{editingCustomer ? "Müşteriyi Düzenle" : "Yeni Müşteri Ekle"}</h3>
                      <button onClick={() => setIsCustomerModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Müşteri Adı</label>
                        <input
                          type="text"
                          value={customerForm.name}
                          onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm"
                          placeholder="Örn: Ahmet Yılmaz"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Telefon Numarası</label>
                        <input
                          type="tel"
                          value={customerForm.phone}
                          onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm"
                          placeholder="Örn: 0555 555 5555"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Hizmet / Talep</label>
                        <input
                          type="text"
                          value={customerForm.service}
                          onChange={(e) => setCustomerForm({ ...customerForm, service: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm"
                          placeholder="Örn: Elektrik Arızası"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Durum</label>
                        <select
                          value={customerForm.status}
                          onChange={(e) => setCustomerForm({ ...customerForm, status: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm"
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Potansiyel">Potansiyel</option>
                          <option value="Tamamlandı">Tamamlandı</option>
                          <option value="Sorunlu">Sorunlu</option>
                        </select>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                      <button onClick={() => setIsCustomerModalOpen(false)} className="px-5 py-2 font-bold text-slate-600 hover:text-slate-800 transition-colors text-sm">
                        İptal
                      </button>
                      <button onClick={handleSaveCustomer} className="px-5 py-2 font-bold text-white bg-[#0b2e59] hover:bg-[#082244] rounded-lg transition-colors shadow-sm text-sm">
                        {editingCustomer ? "Güncelle" : "Kaydet"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
    
              <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-bold text-slate-800 text-lg">
                  Müşteri Yönetimi
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-500 mr-2">
                    Filtrele:
                  </span>
                  {["Tümü", "Potansiyel", "Aktif", "Tamamlandı", "Sorunlu"].map(
                    (filter) => (
                      <button
                        key={filter}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === "Tümü" ? "bg-[#0b2e59] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                      >
                        {filter}
                      </button>
                    )
                  )}
        
                  <button 
                    onClick={() => {
                      setEditingCustomer(null);
                      setCustomerForm({ name: "", phone: "", service: "", status: "Aktif" });
                      setIsCustomerModalOpen(true);
                    }}
                    className="bg-[#ffb703] text-[#0b2e59] px-4 py-1.5 rounded-lg text-sm font-bold ml-auto flex items-center gap-2 shadow-sm hover:bg-[#e0a000] overflow-hidden"
                  >
                    <Plus className="w-4 h-4" /> Ekle
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 text-slate-600 bg-slate-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {customers.map((musteri: any, idx) => (
                    <div
                      key={musteri.id || idx}
                      className="p-5 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-black text-xl">
                            {musteri.name ? musteri.name.charAt(0) : "N"}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-lg">
                              {musteri.name}
                            </div>
                            <div className="text-sm font-medium text-slate-500">
                              {musteri.phone || musteri.tel}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${musteri.status === "Aktif" ? "bg-blue-100 text-blue-700 border-blue-200" : musteri.status === "Potansiyel" ? "bg-amber-100 text-amber-700 border-amber-200" : musteri.status === "Tamamlandı" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}
                        >
                          {musteri.status || musteri.durum || "Aktif"}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 mb-4 border border-slate-100">
                        <span className="font-bold text-slate-700 block mb-1">
                          Talep / Hizmet:
                        </span>
                        {musteri.service || musteri.sonHizmet}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingCustomer(musteri);
                            setCustomerForm({ 
                              name: musteri.name || "", 
                              phone: musteri.phone || musteri.tel || "", 
                              service: musteri.service || musteri.sonHizmet || "", 
                              status: musteri.status || musteri.durum || "Aktif" 
                            });
                            setIsCustomerModalOpen(true);
                          }}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-bold transition-colors"
                        >
                          Düzenle
                        </button>
                        <button 
                          onClick={() => handleDeleteCustomer(musteri.id)}
                          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg text-sm font-bold transition-colors"
                        >
                          Sil
                        </button>
                        <a 
                          href={`https://wa.me/${(musteri.phone || musteri.tel || "").replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-1"
                        >
                          <MessageSquare className="w-4 h-4" /> WA
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


    </>
  );
}
