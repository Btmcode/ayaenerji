import React, { useState } from 'react';
import { Trash2, AlertCircle, PhoneCall, Phone, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AramaKayitlariTab() {
  const [isClearLogsModalOpen, setIsClearLogsModalOpen] = useState(false);
  const callLogs: any[] = [];
  const clearCallLogs = () => setIsClearLogsModalOpen(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">
            Arama Kayıtları (Call Log)
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsClearLogsModalOpen(true)}
              className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 font-bold"
            >
              <Trash2 className="w-4 h-4" />
              Tümünü Temizle
            </button>
            <button className="px-3 py-1.5 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
              Bugün
            </button>
            <button className="px-3 py-1.5 text-sm bg-[#0b2e59] text-white rounded-lg hover:bg-[#082244] transition-colors">
              Tüm Zamanlar
            </button>
          </div>
        </div>
        
        {isClearLogsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col p-6 text-center">
              <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-slate-800 text-lg mb-2">Tüm Kayıtları Sil</h3>
              <p className="text-sm text-slate-500 mb-6">Tüm arama kayıtlarını kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setIsClearLogsModalOpen(false)} className="px-4 py-2 font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm w-full">
                  İptal
                </button>
                <button onClick={clearCallLogs} className="px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm text-sm w-full">
                  Evet, Sil
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="px-6 py-4 font-semibold">Tarih / Saat</th>
                <th className="px-6 py-4 font-semibold">Arayan Numara</th>
                <th className="px-6 py-4 font-semibold">Süre</th>
                <th className="px-6 py-4 font-semibold">Durum</th>
                <th className="px-6 py-4 font-semibold">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {callLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Arama kaydı bulunmamaktadır.
                  </td>
                </tr>
              ) : (
                callLogs.map((call, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {call.time}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`tel:${call.phone.replace(/\s+/g, "")}`}
                        className="text-slate-800 font-medium hover:text-[#0b2e59]"
                      >
                        {call.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {call.duration}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg ${call.status === "Cevaplandı" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          className="text-[#0b2e59] hover:text-[#ffb703] transition-colors"
                          title="Geri Ara"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </button>
                        {call.alert && (
                          <button
                            className="text-amber-500 hover:text-amber-600 transition-colors"
                            title="Bunu Not Al"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
