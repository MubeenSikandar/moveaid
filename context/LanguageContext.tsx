"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "ur";

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
  t: (key: string) => string;
}

// Minimal built-in translations — extend as needed
const translations: Record<Language, Record<string, string>> = {
  en: {
    "lang.label": "English",
    "lang.switch": "Switch to Urdu",
  },
  ur: {
    "lang.label": "اردو",
    "lang.switch": "انگریزی میں تبدیل کریں",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("language") as Language | null;
  if (saved === "en" || saved === "ur") return saved;
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("ur") ? "ur" : "en";
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const isRTL = language === "ur";

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }, [language, isRTL]);

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "ur" : "en";
    setLanguage(next);
    localStorage.setItem("language", next);
  };

  const t = (key: string): string =>
    translations[language][key] ?? translations["en"][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
