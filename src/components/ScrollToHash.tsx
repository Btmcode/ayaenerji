import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LEGACY_HASH_TO_PATH: Record<string, string> = {
  "#hakkimizda": "/hakkimizda",
  "#hizmetler": "/hizmetlerimiz",
  "#bolgeler": "/bolgelerimiz",
  "#iletisim": "/iletisim"
};

const PATH_TO_ID_MAP: Record<string, string> = {
  "/hakkimizda": "hakkimizda",
  "/hizmetlerimiz": "hizmetler",
  "/bolgelerimiz": "bolgeler",
  "/iletisim": "iletisim"
};

export default function ScrollToHashElement() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If we land with a legacy hash-based URL, immediately redirect to clean SEO path
    if (LEGACY_HASH_TO_PATH[hash]) {
      const destination = LEGACY_HASH_TO_PATH[hash];
      navigate(destination, { replace: true });
      return;
    }

    // If there is an SEO sub-path match
    if (PATH_TO_ID_MAP[pathname]) {
      const targetId = PATH_TO_ID_MAP[pathname];
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
      return;
    }

    // Direct hash reference fallback
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
      return;
    }

    // Default: scroll to top for root or other pages
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, navigate]);

  return null;
}
