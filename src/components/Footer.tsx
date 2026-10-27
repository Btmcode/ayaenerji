import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  ChevronRight,
  Award,
  CheckCircle2
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#031124] text-white pt-16 pb-32 md:pb-14 border-t border-slate-800/80 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-block"
              aria-label="Aya Elektrik Anasayfa"
            >
              <Logo className="w-44 sm:w-48 h-auto" />
            </Link>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              İstanbul genelinde 39 ilçede 7/24 kesintisiz acil elektrikçi, klima-kombi altyapısı ve fuar stant elektrik mühendisliği çözümleri.
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-300">
              <a
                href="tel:+905300695393"
                className="flex items-center gap-2.5 text-white hover:text-[#ffb703] transition-colors font-bold group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ffb703] group-hover:bg-[#ffb703] group-hover:text-[#0b2e59] transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span>0530 069 53 93 (7/24 Acil)</span>
              </a>

              <a
                href="mailto:ayaenerji@gmail.com"
                className="flex items-center gap-2.5 hover:text-[#ffb703] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-white/10 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="truncate">ayaenerji@gmail.com</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400 text-xs pt-1">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-snug">
                  Maltepe Mah. Yedikule Çırpıcı Yolu No: 33, Zeytinburnu / İstanbul
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Expert Services */}
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#ffb703]" />
              Hizmetlerimiz
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  to="/hizmetler/acil-elektrik-ariza"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-0.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffb703] group-hover:translate-x-0.5 transition-transform" />
                  <span>7/24 Acil Elektrik Arıza</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmetler/klima-kombi-elektrik-altyapisi"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-0.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffb703] group-hover:translate-x-0.5 transition-transform" />
                  <span>Klima, Kombi & Isıtıcı Hattı</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmetler/fuar-etkinlik-elektrik-kurulumu"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-0.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffb703] group-hover:translate-x-0.5 transition-transform" />
                  <span>Fuar & Etkinlik Stand Panosu</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmetler/pano-yenileme"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-0.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffb703] group-hover:translate-x-0.5 transition-transform" />
                  <span>Elektrik Panosu Değişimi</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmetler/kacak-akim-rolesi"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-0.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffb703] group-hover:translate-x-0.5 transition-transform" />
                  <span>Kaçak Akım Rölesi Montajı</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmetler/sofben-montaji"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-0.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffb703] group-hover:translate-x-0.5 transition-transform" />
                  <span>Şofben & Termosifon Bağlantısı</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmetler/elektrik-tesisati"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-0.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffb703] group-hover:translate-x-0.5 transition-transform" />
                  <span>Sıfırdan Tesisat & Tadilat</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ffb703]" />
              Hizmet Bölgelerimiz
            </h3>
            <p className="text-slate-400 text-xs mb-3">
              İstanbul genelinde hazır bekleyen mobil nöbetçi ekiplerimizle ortalama <strong>30 dakikada</strong> kapınızdayız:
            </p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
              <Link
                to="/hizmet-bolgeleri/zeytinburnu"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Zeytinburnu
              </Link>
              <Link
                to="/hizmet-bolgeleri/bakirkoy"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Bakırköy
              </Link>
              <Link
                to="/hizmet-bolgeleri/fatih"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Fatih
              </Link>
              <Link
                to="/hizmet-bolgeleri/sisli"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Şişli & Mecidiyeköy
              </Link>
              <Link
                to="/hizmet-bolgeleri/besiktas"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Beşiktaş
              </Link>
              <Link
                to="/hizmet-bolgeleri/kadikoy"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Kadıköy
              </Link>
              <Link
                to="/hizmet-bolgeleri/beylikduzu"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Beylikdüzü
              </Link>
              <Link
                to="/hizmet-bolgeleri/umraniye"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Ümraniye
              </Link>
              <Link
                to="/hizmet-bolgeleri/esenyurt"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Esenyurt
              </Link>
              <Link
                to="/hizmet-bolgeleri/atasehir"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-[#ffb703] transition-colors truncate"
              >
                • Ataşehir
              </Link>
            </div>
            
            <Link
              to="/bolgelerimiz"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffb703] hover:underline mt-4"
            >
              Tüm 39 İlçeyi İncele →
            </Link>
          </div>

          {/* Column 4: Corporate & Legal */}
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Kurumsal & Bilgi
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  to="/hakkimizda"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Teknik Blog & Rehberler
                </Link>
              </li>
              <li>
                <Link
                  to="/sss"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Sıkça Sorulan Sorular (SSS)
                </Link>
              </li>
              <li>
                <Link
                  to="/ekibimize-katil"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Kariyer / Usta Başvurusu
                </Link>
              </li>
              <li>
                <Link
                  to="/iletisim"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  İletişim & Konum
                </Link>
              </li>
              <li>
                <Link
                  to="/kunye"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Künye & Şirket Bilgileri
                </Link>
              </li>
              <li>
                <Link
                  to="/gizlilik-politikasi"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Gizlilik Politikası (KVKK)
                </Link>
              </li>
              <li>
                <Link
                  to="/cerez-politikasi"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('aya-open-cookie-settings'));
                  }}
                  className="text-slate-400 hover:text-[#ffb703] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Çerez Tercihlerini Yönet</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quality Guarantees Bar */}
        <div className="py-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>TSE ve CE Onaylı Orijinal Malzemeler (Siemens, Schneider, Hes)</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#ffb703] shrink-0" />
            <span>EMO & EKAT Belgeli Uzman Elektrik Teknisyenleri</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Haftanın 7 Günü 24 Saat Kesintisiz Nöbetçi Servis</span>
          </div>
        </div>

        {/* Bottom Sub-Footer: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Aya Elektrik Mühendislik. Tüm Hakları Saklıdır.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
            <Link to="/gizlilik-politikasi" className="hover:text-white transition-colors">
              KVKK Aydınlatma
            </Link>
            <span>·</span>
            <Link to="/cerez-politikasi" className="hover:text-white transition-colors">
              Çerezler
            </Link>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('aya-open-cookie-settings'));
              }}
              className="hover:text-[#ffb703] transition-colors underline cursor-pointer"
            >
              Çerez Ayarları
            </button>
            <span>·</span>
            <span className="text-amber-400 font-bold">7/24 Acil: 0530 069 53 93</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
