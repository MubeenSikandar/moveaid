"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    title: "This Week's Schedule",
    summary: (active: number) => `${active} of 7 days scheduled`,
    dayLetters: ["M", "T", "W", "T", "F", "S", "S"],
    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  ur: {
    title: "اس ہفتے کا شیڈول",
    summary: (active: number) => `۷ میں سے ${active} دن شیڈول ہیں`,
    dayLetters: ["پ", "م", "ب", "ج", "ج", "ہ", "ا"],
    dayNames: ["پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ", "اتوار"],
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
const activeDays = [0, 2, 4, 5];

const WeeklyScheduleCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};

  // In RTL, reverse the day order so the week reads right-to-left
  const indices = isRTL ? [...Array(7).keys()].reverse() : [...Array(7).keys()];

  return (
    <div
      className="w-full h-full bg-[#ebe7dd] rounded-4xl p-6 shadow-lg flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex flex-col gap-4 flex-1">
        {/* Header */}
        <h2 className="text-xl font-bold text-black text-center" style={uf}>
          {tr.title}
        </h2>

        {/* Day Circles */}
        <div className="flex items-center justify-between gap-2">
          {indices.map((index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                  activeDays.includes(index)
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-600 border-2 border-gray-200"
                }`}
                style={uf}
              >
                {tr.dayLetters[index]}
              </div>
              <span className="text-xs text-gray-600 font-medium" style={uf}>
                {tr.dayNames[index]}
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="text-center">
          <p className="text-sm text-gray-600" style={uf}>
            {tr.summary(activeDays.length)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyScheduleCard;
