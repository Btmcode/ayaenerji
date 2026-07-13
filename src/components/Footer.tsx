import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#04152d] text-white py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center mb-4 cursor-pointer"
            aria-label="Aya Elektrik Anasayfa"
          >
            <Logo className="w-48 opacity-90 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="text-slate-400 text-sm text-center md:text-left mt-2 pl-2">
            İstanbul Avrupa Yakası 7/24 Acil Elektrik Arıza ve Bakım Servisi
          </p>
        </div>

        <div className="text-center md:text-right">
          <div className="flex flex-wrap gap-4 justify-center md:justify-end mb-4">
            <Link
              to="/hakkimizda"
              className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Hakkımızda
            </Link>
            <Link
              to="/hizmetlerimiz"
              className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Hizmetler
            </Link>
            <Link
              to="/blog"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Blog
            </Link>
            <Link
              to="/ekibimize-katil"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Kariyer
            </Link>
            <Link
              to="/iletisim"
              className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              İletişim
            </Link>
            <Link
              to="/gizlilik-politikasi"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Gizlilik Politikası (KVKK)
            </Link>
            <Link
              to="/cerez-politikasi"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
            >
              Çerez Politikası
            </Link>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Aya Elektrik. Tüm Hakları
            Saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
