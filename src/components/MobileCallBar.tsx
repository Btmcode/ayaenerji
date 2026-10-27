import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageCircle, 
  Zap, 
  ShieldAlert, 
  X, 
  ChevronRight, 
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Snowflake
} from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

interface EmergencyIssue {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  severity: 'high' | 'urgent' | 'standard';
  tip: string;
  waText: string;
}

const COMMON_ISSUES: EmergencyIssue[] = [
  {
    id: 'fuse-tripping',
    title: 'Sigorta Sürekli Atıyor / Şalter İnmiyor',
    badge: 'Acil Müdahale',
    icon: Zap,
    severity: 'urgent',
    tip: 'Zorlayarak şalteri yukarıda tutmaya çalışmayın. Cihazları prizden çekin.',
    waText: 'Merhaba Aya Elektrik, sigortam sürekli atıyor ve yukarı kalkmıyor. Acil nöbetçi usta talep ediyorum. Konumum: '
  },
  {
    id: 'burning-socket',
    title: 'Prizden Duman / Yanık Kokusu Geliyor',
    badge: 'Kritik Yangın Riski',
    icon: Flame,
    severity: 'urgent',
    tip: 'Lütfen ana şalteri derhal indirin ve prize dokunmayın. Ekibimiz yola çıkıyor.',
    waText: 'ACİL DURUM: Prizden yanık kokusu/duman geliyor. Derhal en yakın nöbetçi ekibi yönlendirmenizi istiyorum. Konumum: '
  },
  {
    id: 'ac-boiler',
    title: 'Klima / Kombi / Şofben Özel Elektrik Hattı',
    badge: 'Aynı Gün Kurulum',
    icon: Snowflake,
    severity: 'standard',
    tip: 'Yetkili servis garantisi için sigorta panosundan bağımsız 3x2.5mm hat çekilir.',
    waText: 'Merhaba Aya Elektrik, klima/kombi için bağımsız elektrik hattı ve Viko/Siemens sigorta montajı fiyatı ve randevusu almak istiyorum. Adresim: '
  },
  {
    id: 'total-blackout',
    title: 'Dairede / Dükkanda Elektrik Tamamen Kesildi',
    badge: 'Pano & Kofana',
    icon: ShieldAlert,
    severity: 'high',
    tip: 'Komşularda elektrik varsa arıza bina giriş kofana sigortanızda veya ana sayaçtadır.',
    waText: 'Merhaba Aya Elektrik, binamızda/dairemizde elektrik tamamen gitti, komşularda var. Ana kofana veya sayaç kontrolü için acil usta rica ediyorum. Konumum: '
  },
  {
    id: 'fair-corporate',
    title: 'Fuar, Etkinlik & Mağaza Elektrik Kurulumu',
    badge: 'Kurumsal Sözleşmeli',
    icon: ShieldCheck,
    severity: 'standard',
    tip: 'Tüyap, İFM ve fuar merkezlerine 7/24 geçici/kalıcı enerji dağıtımı ve pano desteği.',
    waText: 'Merhaba Aya Elektrik, fuar/etkinlik standımız veya mağazamız için teknik elektrik kurulum desteği ve teklif almak istiyoruz. Bilgilerimiz: '
  }
];

export default function MobileCallBar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<EmergencyIssue | null>(null);

  const handleIssueSelect = (issue: EmergencyIssue) => {
    setSelectedIssue(issue);
  };

  const getWaLinkWithIssue = (text: string) => {
    return `https://wa.me/905300695393?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* 1. Primary Sticky Dock on Mobile */}
      <aside 
        aria-label="Mobil Acil İletişim Çubuğu"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(11,46,89,0.12)] md:hidden pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 px-3"
      >
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          
          {/* Quick Problem Assist Trigger */}
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="flex flex-col items-start justify-center text-left py-1 px-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors shrink min-w-0"
            aria-label="Arıza Bildir veya Yardım Al"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="truncate">7/24 Nöbetçi Usta</span>
            </div>
            <span className="text-[#0b2e59] font-black text-xs truncate flex items-center gap-1">
              <span>Arıza Bildir</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </span>
          </button>

          {/* Action CTAs: WhatsApp + Click to Call */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Konum ve Fotoğraf Gönder"
              className="flex items-center justify-center gap-1.5 bg-[#25D366] active:bg-[#1ebc59] text-white px-3 sm:px-3.5 py-2.5 rounded-xl font-bold text-xs transition-transform active:scale-95 shadow-sm min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Phone Call CTA */}
            <a
              href="tel:+905300695393"
              aria-label="Acil Elektrikçiyi Hemen Ara: 0530 069 53 93"
              className="flex items-center justify-center gap-1.5 bg-[#ffb703] active:bg-[#e0a000] text-[#0b2e59] px-3.5 sm:px-4 py-2.5 rounded-xl font-black text-xs transition-transform active:scale-95 shadow-md shadow-amber-500/25 min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 fill-[#0b2e59] shrink-0" />
              <span>Hemen Ara</span>
            </a>
          </div>
        </div>
      </aside>

      {/* 2. Corporate Emergency Triage Bottom Sheet Modal */}
      {isSheetOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => {
              setIsSheetOpen(false);
              setSelectedIssue(null);
            }} 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
            aria-hidden="true"
          />

          {/* Sheet Container */}
          <div className="relative bg-white rounded-t-3xl shadow-2xl p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-h-[85vh] overflow-y-auto animate-slide-up border-t border-slate-200">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    Aya Elektrik 7/24 Triyaj
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> 15-30 Dk. Varış
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#0b2e59]">
                  Acil Arıza Türünü Seçin
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ustalarımız donanımlı araçlarıyla adrese gelmeden önce ön teşhis koysun.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSheetOpen(false);
                  setSelectedIssue(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 active:bg-slate-200"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Issue Selector List */}
            {!selectedIssue ? (
              <div className="space-y-2 mb-4">
                {COMMON_ISSUES.map((issue) => {
                  const Icon = issue.icon;
                  return (
                    <button
                      key={issue.id}
                      type="button"
                      onClick={() => handleIssueSelect(issue)}
                      className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-[#0b2e59] bg-slate-50/70 hover:bg-white active:scale-[0.99] transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          issue.severity === 'urgent' 
                            ? 'bg-rose-100 text-rose-700' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            {issue.badge}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                            {issue.title}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Selected Issue Detail & 1-Tap Action */
              <div className="space-y-4 mb-4 animate-fade-in">
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Güvenlik Tavsiyesi
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedIssue(null)}
                      className="text-xs font-bold text-[#0b2e59] underline"
                    >
                      Değiştir
                    </button>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                    {selectedIssue.title}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedIssue.tip}
                  </p>
                </div>

                <div className="space-y-2">
                  <a
                    href={getWaLinkWithIssue(selectedIssue.waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-md shadow-emerald-500/25 active:scale-[0.98] transition-transform min-h-[48px]"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>WhatsApp ile Fotoğraf &amp; Konum Gönder</span>
                  </a>

                  <a
                    href="tel:+905300695393"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#ffb703] text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm shadow-md shadow-amber-500/25 active:scale-[0.98] transition-transform min-h-[48px]"
                  >
                    <PhoneCall className="w-5 h-5 fill-slate-950" />
                    <span>Hemen Nöbetçi Ustayı Ara</span>
                  </a>
                </div>
              </div>
            )}

            {/* Footer Trust note */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> TSE Onaylı Ekipman
              </span>
              <span>İstanbul 39 İlçe Garantili</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
