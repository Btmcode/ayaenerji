import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 bg-white shadow-xl border border-slate-200 p-4 rounded-2xl flex flex-col gap-3 max-w-xs animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div>
        <p className="font-bold text-[#0b2e59] text-sm">Uygulamamızı Yükleyin</p>
        <p className="text-xs text-slate-500 mt-1">Acil durumlarda bize tek tıkla ulaşmak için Aya Elektrik uygulamasını ana ekranınıza ekleyin.</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setIsVisible(false)}
          className="flex-1 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Daha Sonra
        </button>
        <button 
          onClick={handleInstallClick}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0b2e59] hover:bg-[#082244] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          Yükle
        </button>
      </div>
    </div>
  );
}
