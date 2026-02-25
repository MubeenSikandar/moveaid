"use client";
import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/Arrow.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    title: "Your Weekly Progress",
    completeSessions: "Complete sessions",
    trained: "You've trained 4 hours this week ⚡",
    improvement:
      "Your form is already 8% sharper than last week — amazing consistency.",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  ur: {
    title: "آپ کی ہفتہ وار پیشرفت",
    completeSessions: "مکمل سیشن",
    trained: "آپ نے اس ہفتے ۴ گھنٹے تربیت کی ⚡",
    improvement: "آپ کی حرکت پچھلے ہفتے سے پہلے سے ۸٪ بہتر ہے — کمال تسلسل۔",
    days: ["پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ", "اتوار"],
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const weeklyData = [
  { completed: true },
  { completed: true },
  { completed: false },
  { completed: false },
  { completed: false },
  { completed: false },
  { completed: false },
];

const WeeklyProgressCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  const completedSessions = weeklyData.filter((d) => d.completed).length;
  const totalSessions = weeklyData.length;
  const progressPercentage = (completedSessions / totalSessions) * 100;

  return (
    <div
      className="w-full h-full flex flex-col bg-[#ebe7dd] rounded-4xl p-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div
        className={`flex justify-between w-full ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <p className="text-2xl font-bold" style={uf}>
          {tr.title}
        </p>
        <Image
          src={ArrowRight}
          alt="arrow right"
          width={36}
          height={36}
          className={isRTL ? "scale-x-[-1]" : ""}
        />
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-center flex-1">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#AD85D1"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-[#AD85D1]">
              {completedSessions}/{totalSessions}
            </p>
            <p
              className="text-sm font-medium text-gray-600 mt-1 text-center"
              style={uf}
            >
              {tr.completeSessions}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="flex flex-col text-center gap-2">
        <p className="text-lg font-semibold text-gray-800" style={ufLine}>
          {tr.trained}
        </p>
        <p className="text-sm text-gray-600" style={ufLine}>
          {tr.improvement}
        </p>
      </div>
    </div>
  );
};

export default WeeklyProgressCard;
