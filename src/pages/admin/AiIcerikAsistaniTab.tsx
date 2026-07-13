import React from 'react';
import { Sparkles, Activity, FileText, Check, Save, TrendingUp, Globe, Copy } from 'lucide-react';

interface AiIcerikAsistaniTabProps {
  aiForm: any;
  setAiForm: (val: any) => void;
  isFetchingTrends: boolean;
  handleGenerateAIResource: () => void;
  isGenerating: boolean;
  generatedContent: string;
  generatedMetaTitle: string;
  generatedMetaDescription: string;
  triggerCopy: (text: string, fieldName: string) => void;
  copiedField: string | null;
  isPublishingGmb: boolean;
  isBulkGenerating: boolean;
  handleSuggestTrend: () => void;
  handleRunDailyCampaign: (count?: number) => void;
  bulkProgress: number;
  bulkTotal: number;
  bulkLogs: string[];
  handleFetchTrends: () => void;
  trendKeywords: string[];
  addBlogDb: (item: any) => void;
  showToast: (msg: string, type?: string) => void;
  handlePublishToGmb: () => void;
}

export default function AiIcerikAsistaniTab({
  aiForm,
  setAiForm,
  isFetchingTrends,
  handleGenerateAIResource,
  isGenerating,
  generatedContent,
  generatedMetaTitle,
  generatedMetaDescription,
  triggerCopy,
  copiedField,
  isPublishingGmb,
  isBulkGenerating,
  handleSuggestTrend,
  handleRunDailyCampaign,
  bulkProgress,
  bulkTotal,
  bulkLogs,
  handleFetchTrends,
  trendKeywords,
  addBlogDb,
  showToast,
  handlePublishToGmb
}: AiIcerikAsistaniTabProps) {
  return (
    <>
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

    </>
  );
}
