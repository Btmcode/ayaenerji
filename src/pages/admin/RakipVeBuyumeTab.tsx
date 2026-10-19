import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Target, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ExternalLink,
  Users,
  Clock,
  Zap,
  BarChart2,
  DollarSign,
  Activity,
  Bot
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ISTANBUL_DISTRICTS, DistrictInfo } from '../../data/istanbulDistricts';

export default function RakipVeBuyumeTab() {
  // Simulator State
  const [targetDailyCalls, setTargetDailyCalls] = useState<number>(350);
  const [selectedDistrictSlug, setSelectedDistrictSlug] = useState<string>('kadikoy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // AI & WhatsApp Triage Simulator State
  const [simStep, setSimStep] = useState<'idle' | 'calling' | 'missed' | 'bot_replied' | 'dispatched'>('idle');
  const [simPhoneNumber, setSimPhoneNumber] = useState<string>('0532 999 88 77');
  const [simDistrict, setSimDistrict] = useState<string>('Kadıköy');

  const selectedDistrict = useMemo(() => {
    return ISTANBUL_DISTRICTS.find(d => d.slug === selectedDistrictSlug) || ISTANBUL_DISTRICTS[0];
  }, [selectedDistrictSlug]);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success('Panoya kopyalandı!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Calculations for 300-500 calls target
  const organicDistrictCalls = useMemo(() => {
    // 39 districts, each generating between 3 to 7 calls daily when ranked in top 3
    return Math.round(39 * 4.8); // ~187 daily organic calls
  }, []);

  const googleMapsCalls = useMemo(() => {
    return Math.round(targetDailyCalls * 0.28); // ~98 calls from Google Maps 3-Pack
  }, [targetDailyCalls]);

  const remainingGap = Math.max(0, targetDailyCalls - (organicDistrictCalls + googleMapsCalls));
  
  // Google Ads Call-Only budget estimation
  const avgCostPerCall = 42; // TL average cost per qualified call in Istanbul
  const requiredDailyBudget = remainingGap * avgCostPerCall;

  // Operational metrics
  const conversionRate = 0.55; // 55% of calls turn into paid technician visits
  const dailyJobs = Math.round(targetDailyCalls * conversionRate);
  const avgJobsPerTechnicianPerDay = 6;
  const requiredTechnicians = Math.ceil(dailyJobs / avgJobsPerTechnicianPerDay);

  // Run Triage Simulator
  const handleStartSimulation = () => {
    setSimStep('calling');
    setTimeout(() => {
      setSimStep('missed');
      setTimeout(() => {
        setSimStep('bot_replied');
        setTimeout(() => {
          setSimStep('dispatched');
        }, 3000);
      }, 2500);
    }, 2000);
  };

  return (
    <div className="space-y-8 text-slate-800">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b2e59] via-[#103a6e] to-[#082242] rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ffb703]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ffb703] text-xs font-bold mb-3 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            300-500 Günlük Çağrı Ölçeklenme Stratejisi & Rakip Analizi
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Royal Elektrik Analizi & Aya Elektrik Zirve Planı
          </h2>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            Şu anki günlük 1-2 aramayı kademeli olarak günlük 300-500 çağrıya ulaştıracak 39 ilçe programatik SEO ağı, Google Haritalar otoritesi ve gelen yoğun çağrıları kaçırmadan ustaya aktaran Yapay Zeka / WhatsApp Triage kontrol merkezi.
          </p>
        </div>
      </div>

      {/* 1. RAKİP ANALİZİ: ROYAL ELEKTRİK vs AYA ELEKTRİK */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-black text-[#0b2e59] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#ffb703]" />
              Rakip Analizi: royalelektrik.com vs. Aya Elektrik
            </h3>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              İstanbul genelinde en çok çağrı çeken rakibin taktikleri ve Aya Elektrik'in üstünlük stratejisi
            </p>
          </div>
          <a
            href="https://www.royalelektrik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
          >
            <span>Rakip Siteyi İncele</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Comparison Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Royal Elektrik */}
          <div className="border border-rose-100 bg-rose-50/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-rose-950 text-base">Royal Elektrik (Mevcut Lider)</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-800">Rakip Model</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>39 İlçe Sayfası:</strong> İstanbul'un tüm ilçelerini tek tek sayfalayarak organik arama hacmini topluyor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Hız Kancası:</strong> "30 Dakikada Kapınızda" ve "7/24 Nöbetçi Elektrikçi" vaadi veriyor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Güven Sinyali:</strong> "MEB Onaylı Sertifikalı Usta" ve "25 Yıllık Tecrübe" vurgusu.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Zayıf Noktası:</strong> Çağrılar geleneksel GSM/santrale düşüyor; yoğun saatlerde hat meşgul kalıyor ve kaçan çağrılar geri kazanılamıyor.</span>
              </li>
            </ul>
          </div>

          {/* Aya Elektrik Yeni Model */}
          <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-950 text-base">Aya Elektrik (Büyüme Motoru)</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">Hedef: 300-500 Çağrı</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>39 İlçe + 150 Mahalle Ağı:</strong> İlçe bazlı mikro-açılış sayfalarıyla rakibin organik sıralamasını ele geçirme.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Daha Hızlı Servis:</strong> "20-30 Dakikada Adreste" gezici mobil nöbetçi araç garantisi.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>GEO (Yapay Zeka Aramaları):</strong> ChatGPT, Gemini ve Perplexity aramalarında en çok önerilen elektrikçi olmak için FAQPage şemaları.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>AI / WhatsApp Triage:</strong> Meşgule düşen tek bir çağrı bile kaybolmaz; WhatsApp botu müşterinin konumunu alıp en yakın ustaya anında iletir.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. GÜNLÜK 300-500 ÇAĞRI HACİM VE BÜTÇE SİMÜLATÖRÜ */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-black text-[#0b2e59] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#ffb703]" />
            Günlük Çağrı Hacmi & Operasyonel Kapasite Simülatörü
          </h3>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Hedeflenen günlük telefon aramasını karşılamak için gerekli kanallar, bütçe ve nöbetçi usta filosu
          </p>
        </div>

        {/* Interactive Slider */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm text-slate-700">Hedeflenen Günlük Telefon Araması:</span>
            <span className="text-2xl font-black text-[#0b2e59]">{targetDailyCalls} Çağrı / Gün</span>
          </div>
          <input
            type="range"
            min="50"
            max="600"
            step="25"
            value={targetDailyCalls}
            onChange={(e) => setTargetDailyCalls(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ffb703]"
          />
          <div className="flex justify-between text-xs text-slate-400 font-bold mt-2">
            <span>50 Çağrı (Başlangıç)</span>
            <span>200 Çağrı (Orta Seviye)</span>
            <span>350 Çağrı (Ölçek)</span>
            <span>500+ Çağrı (İstanbul Liderliği)</span>
          </div>
        </div>

        {/* Breakdown Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              39 İlçe Organik SEO
            </div>
            <div className="text-2xl font-black text-[#0b2e59]">{organicDistrictCalls} Çağrı</div>
            <div className="text-[11px] text-slate-500 mt-1">İlçe başına ort. 4-6 çağrı/gün</div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Google Haritalar (GBP)
            </div>
            <div className="text-2xl font-black text-[#0b2e59]">{googleMapsCalls} Çağrı</div>
            <div className="text-[11px] text-slate-500 mt-1">3-Pack harita aramaları</div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Google Tıkla-Ara Açığı
            </div>
            <div className="text-2xl font-black text-[#0b2e59]">{remainingGap} Çağrı</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Tahmini Reklam Bütçesi: {requiredDailyBudget.toLocaleString('tr-TR')} ₺/gün
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-600" />
              Gereken Nöbetçi Usta
            </div>
            <div className="text-2xl font-black text-[#0b2e59]">{requiredTechnicians} Ekip</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Günlük ~{dailyJobs} tamamlanan servis işi
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Stratejik Not:</strong> Günlük 350-500 çağrı seviyesinde telefon hatları sürekli çalar. Tek bir telefon numarasıyla bu çağrıları karşılamak imkansızdır; çağrıların en az %30-40'ı meşgule düşer. İşte bu yüzden aşağıdaki <strong>Yapay Zeka ve WhatsApp Triage Sistemi</strong> büyümenin can damarıdır.
          </div>
        </div>
      </div>

      {/* 3. YAPAY ZEKA VE WHATSAPP TRİAGE SİMÜLATÖRÜ */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-black text-[#0b2e59] flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              Yapay Zeka & WhatsApp Çağrı Kurtarma (Triage) Simülatörü
            </h3>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              300-500 çağrı geldiğinde meşgul olan veya cevapsız kalan müşterileri 3 saniyede işe dönüştüren mekanizma
            </p>
          </div>
          <button
            onClick={handleStartSimulation}
            disabled={simStep !== 'idle' && simStep !== 'dispatched'}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{simStep === 'idle' || simStep === 'dispatched' ? 'Meşgul Çağrı Simüle Et' : 'Simülasyon Çalışıyor...'}</span>
          </button>
        </div>

        {/* Simulation Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {/* Step 1 */}
          <div className={`p-4 rounded-xl border transition-all ${
            simStep === 'calling' 
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400 animate-pulse' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-[11px] font-bold text-slate-400 mb-1">1. Adım</div>
            <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-500" />
              Müşteri Arıyor
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {simPhoneNumber} nolu müşteri {simDistrict}'den acil arıza için santrali arar.
            </p>
          </div>

          {/* Step 2 */}
          <div className={`p-4 rounded-xl border transition-all ${
            simStep === 'missed' 
              ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-[11px] font-bold text-slate-400 mb-1">2. Adım</div>
            <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Hat Meşgul (Yoğunluk)
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Tüm santral operatörleri diğer acil aramalarda olduğu için çağrı meşgule düşer.
            </p>
          </div>

          {/* Step 3 */}
          <div className={`p-4 rounded-xl border transition-all ${
            simStep === 'bot_replied' 
              ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-400' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-[11px] font-bold text-slate-400 mb-1">3. Adım</div>
            <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600" />
              WhatsApp Tetiklenir
            </div>
            <p className="text-xs text-slate-500 mt-2">
              3. saniyede müşteriye SMS/WhatsApp ile otomatik acil konum isteme mesajı gider.
            </p>
          </div>

          {/* Step 4 */}
          <div className={`p-4 rounded-xl border transition-all ${
            simStep === 'dispatched' 
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-[11px] font-bold text-slate-400 mb-1">4. Adım</div>
            <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Usta Yola Çıkar
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Müşteri konum attığı anda en yakın {simDistrict} nöbetçi ekibine rota açılır.
            </p>
          </div>
        </div>

        {/* Live Simulator Chat Preview */}
        {simStep !== 'idle' && (
          <div className="bg-slate-900 text-white p-4 rounded-xl font-mono text-xs space-y-2 border border-slate-800">
            <div className="text-slate-400"># Santral & WhatsApp Webhook Günlüğü:</div>
            {simStep === 'calling' && <div className="text-amber-400">&gt; GELEN ÇAĞRI: {simPhoneNumber} ({simDistrict} BTS Kulesi)</div>}
            {(simStep === 'missed' || simStep === 'bot_replied' || simStep === 'dispatched') && (
              <div className="text-rose-400">&gt; ÇAĞRI DURUMU: Santral meşgul. Triage botu devrede.</div>
            )}
            {(simStep === 'bot_replied' || simStep === 'dispatched') && (
              <div className="text-purple-300">
                &gt; WHATSAPP GÖNDERİLDİ ({simPhoneNumber}): "Merhaba Aya Elektrik Nöbetçi Servis. Çağrınızı aldık, ustanız hazır. Lütfen konumunuzu ve bina no iletin, en geç 20 dakikada kapınızdayız."
              </div>
            )}
            {simStep === 'dispatched' && (
              <div className="text-emerald-400">
                &gt; MÜŞTERİ YANITLADI: Konum alındı. Usta Kadıköy-Ekip-2'ye iş emri atandı. Tahmini varış: 18 Dk.
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. 39 İLÇE SEO & GEO ŞEMA VE META ÜRETİCİ */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-black text-[#0b2e59] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#ffb703]" />
              39 İlçe SEO & Yapay Zeka (GEO) İçerik Jeneratörü
            </h3>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              İlçe seçerek Google ve ChatGPT / Gemini yapay zeka aramaları için optimize edilmiş kod ve metinleri anında üretin
            </p>
          </div>

          <select
            value={selectedDistrictSlug}
            onChange={(e) => setSelectedDistrictSlug(e.target.value)}
            className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs md:text-sm font-bold text-[#0b2e59] focus:ring-2 focus:ring-[#ffb703]"
          >
            {ISTANBUL_DISTRICTS.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name} ({d.side} Yakası) - {d.searchVolume} Hacim
              </option>
            ))}
          </select>
        </div>

        {/* Selected District Info Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-bold block mb-1">Seçili İlçe:</span>
            <span className="font-extrabold text-[#0b2e59] text-base">{selectedDistrict.name}</span>
            <span className="text-slate-500 block mt-1">{selectedDistrict.neighborhoods.length} Mahalle Kapsamı</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block mb-1">Ortalama Ulaşım Süresi:</span>
            <span className="font-extrabold text-emerald-600 text-base">{selectedDistrict.averageArrivalTime}</span>
            <span className="text-slate-500 block mt-1">7/24 Gezici Nöbetçi Ekip</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block mb-1">Arama Hacmi Seviyesi:</span>
            <span className="font-extrabold text-amber-600 text-base">{selectedDistrict.searchVolume}</span>
            <span className="text-slate-500 block mt-1">Acil Elektrikçi ve Pano Arızası</span>
          </div>
        </div>

        {/* Templates to Copy */}
        <div className="space-y-4">
          {/* 1. Google Haritalar (GBP) Güncelleme Metni */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-[#0b2e59]">
                Google Haritalar (GBP) Hizmet Bölgesi Açıklaması
              </span>
              <button
                onClick={() => handleCopy(
                  `Aya Elektrik - ${selectedDistrict.name} 7/24 Acil Nöbetçi Elektrik Servisi. ${selectedDistrict.neighborhoods.slice(0, 8).join(', ')} mahallelerinde sigorta arızası, pano yanması, kaçak akım rölesi ve acil tesisat sorunlarınıza ${selectedDistrict.averageArrivalTime} içinde ulaşıyoruz. Faturalı ve garantili servis için arayın: 0530 069 53 93`,
                  'gbp'
                )}
                className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'gbp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'gbp' ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 font-mono">
              Aya Elektrik - {selectedDistrict.name} 7/24 Acil Nöbetçi Elektrik Servisi. {selectedDistrict.neighborhoods.slice(0, 8).join(', ')} mahallelerinde sigorta arızası, pano yanması, kaçak akım rölesi ve acil tesisat sorunlarınıza {selectedDistrict.averageArrivalTime} içinde ulaşıyoruz. Faturalı ve garantili servis için arayın: 0530 069 53 93
            </div>
          </div>

          {/* 2. GEO (Yapay Zeka ChatGPT/Gemini) FAQPage Schema */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-[#0b2e59]">
                GEO (Yapay Zeka Motorları İçin) JSON-LD Şeması
              </span>
              <button
                onClick={() => handleCopy(
                  JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": ["LocalBusiness", "EmergencyService"],
                    "name": `Aya Elektrik - ${selectedDistrict.name}`,
                    "telephone": "+905300695393",
                    "areaServed": `${selectedDistrict.name}, İstanbul`,
                    "openingHours": "Mo-Su 00:00-24:00",
                    "description": `${selectedDistrict.name} bölgesinde 7/24 nöbetçi acil elektrik ustası. ${selectedDistrict.averageArrivalTime} adrese varış süresi.`
                  }, null, 2),
                  'schema'
                )}
                className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'schema' ? 'Kopyalandı' : 'JSON-LD Kopyala'}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg text-[11px] overflow-x-auto font-mono">
{`{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EmergencyService"],
  "name": "Aya Elektrik - ${selectedDistrict.name}",
  "telephone": "+905300695393",
  "areaServed": "${selectedDistrict.name}, İstanbul",
  "openingHours": "Mo-Su 00:00-24:00",
  "description": "${selectedDistrict.name} bölgesinde 7/24 nöbetçi acil elektrik ustası. ${selectedDistrict.averageArrivalTime} adrese varış süresi."
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
