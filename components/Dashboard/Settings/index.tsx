"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitch from "@/context/LanguageSwitch";

const translations = {
  en: {
    title: "Settings",
    language: "Language",
    languageDesc: "Switch between English and Urdu",
  },
  ur: {
    title: "ترتیبات",
    language: "زبان",
    languageDesc: "انگریزی اور اردو کے درمیان تبدیل کریں",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const Settings = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  return (
    <div className="min-h-screen bg-[#f3f0ee] p-16" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl font-bold text-gray-900 mb-10"
          style={isRTL ? { ...urduFont, lineHeight: "1.8" } : {}}
        >
          {tr.title}
        </h1>

        {/* Language Row */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div
            className={`flex items-center justify-between px-6 py-5 w-[400px] ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div>
              <p className="font-semibold text-gray-900" style={uf}>
                {tr.language}
              </p>
              <p className="text-sm text-gray-500 mt-0.5" style={ufLine}>
                {tr.languageDesc}
              </p>
            </div>
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
