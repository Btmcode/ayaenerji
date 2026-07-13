import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "../utils/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-6 right-6 z-50 bg-[#25d366] text-white p-4 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all flex items-center justify-center group"
      aria-label="WhatsApp ile İletişime Geç"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-white text-slate-800 px-3 py-1.5 font-semibold text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
        WhatsApp'tan Yazın
      </span>
      {/* Pulse effect */}
      <span className="absolute w-full h-full rounded-full border-2 border-[#25d366] animate-ping opacity-75"></span>
    </a>
  );
}
