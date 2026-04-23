import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/lib/i18n";

const LanguageContext = createContext(null);

const STORAGE_KEY = "wamc_lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "fr") {
        setLang(saved);
        return;
      }
      // Detect browser language once
      const l = (navigator.language || "en").toLowerCase();
      if (l.startsWith("fr")) setLang("fr");
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // noop
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
      toggle: () => setLang((l) => (l === "en" ? "fr" : "en")),
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback when provider is missing (shouldn't happen in app routes)
    return { lang: "en", setLang: () => {}, t: translations.en, toggle: () => {} };
  }
  return ctx;
}
