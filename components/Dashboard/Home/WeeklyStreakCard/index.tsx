"use client";
import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/Arrow.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    title: "Weekly Streak",
    currentStreakLabel: "Current Streak",
    keepItUp: "Keep it up!",
    thisWeeksProgress: "This Week's Progress",
    currentStreak: (n: number) => `${n} Days`,
    longestStreak: (n: number) => `${n} days`,
    avgSessionTime: "Avg Session Time",
    longestStreakLabel: "Longest Streak",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  ur: {
    title: "ہفتہ وار سلسلہ",
    currentStreakLabel: "موجودہ سلسلہ",
    keepItUp: "جاری رکھیں!",
    thisWeeksProgress: "اس ہفتے کی پیشرفت",
    currentStreak: (n: number) => `${n} دن`,
    longestStreak: (n: number) => `${n} دن`,
    avgSessionTime: "اوسط سیشن وقت",
    longestStreakLabel: "سب سے طویل سلسلہ",
    days: ["پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ", "اتوار"],
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const streakData = [
  { completed: true },
  { completed: true },
  { completed: false },
  { completed: false },
  { completed: false },
  { completed: false },
  { completed: false },
];

const currentStreak = 2;
const longestStreak = 5;
const averageSessionTime = "12 min";

const WeeklyStreakCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  return (
    <div
      className="w-full h-full flex bg-[#ebe7dd] rounded-4xl p-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex flex-col gap-6 w-full">
        {/* Header */}
        <div
          className={`flex items-center justify-between w-full ${isRTL ? "flex-row-reverse" : ""}`}
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

        {/* Score */}
        <div
          className={`flex items-center gap-4 w-full ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <p className="text-4xl font-bold" style={uf}>
            {tr.currentStreak(currentStreak)}
          </p>
          <div className="w-full flex flex-col">
            <p className="text-md font-light" style={uf}>
              {tr.currentStreakLabel}
            </p>
            <p className="text-md font-light" style={uf}>
              {tr.keepItUp}
            </p>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-semibold text-gray-800" style={uf}>
                {tr.thisWeeksProgress}
              </h4>
              <div className="grid grid-cols-7 gap-2">
                {streakData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="text-xs font-medium text-gray-600"
                      style={uf}
                    >
                      {tr.days[index]}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        day.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {day.completed ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col justify-between gap-4">
              {[
                {
                  label: tr.currentStreakLabel,
                  value: tr.currentStreak(currentStreak),
                },
                {
                  label: tr.longestStreakLabel,
                  value: tr.longestStreak(longestStreak),
                },
                { label: tr.avgSessionTime, value: averageSessionTime },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className={`flex flex-row items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <p className="text-sm font-medium text-gray-600" style={uf}>
                    {label}
                  </p>
                  <p className="text-sm font-bold text-[#AD85D1]" style={uf}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStreakCard;
