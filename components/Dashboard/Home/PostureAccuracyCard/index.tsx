"use client";
import Image from "next/image";
import React from "react";
import ArrowRight from "@/assets/Arrow.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    title: "Posture Accuracy",
    averageScore: "Average Score This Week",
    thisWeek: "This Week",
    weeklyProgress: "Weekly Progress",
    daysCompleted: (done: number, total: number) =>
      `${done} of ${total} days completed`,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    status: {
      completed: "✓",
      great: "Great!",
      good: "Good",
      started: "Started",
      notStarted: "–",
    },
  },
  ur: {
    title: "کرنسی درستگی",
    averageScore: "اس ہفتے کا اوسط اسکور",
    thisWeek: "اس ہفتے",
    weeklyProgress: "ہفتہ وار پیشرفت",
    daysCompleted: (done: number, total: number) =>
      `${total} میں سے ${done} دن مکمل`,
    days: ["پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ", "اتوار"],
    status: {
      completed: "✓",
      great: "شاندار!",
      good: "اچھا",
      started: "شروع",
      notStarted: "–",
    },
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const weeklyData = [
  { progress: 85, completed: true },
  { progress: 100, completed: true },
  { progress: 60, completed: false },
  { progress: 0, completed: false },
  { progress: 0, completed: false },
  { progress: 0, completed: false },
  { progress: 0, completed: false },
];

const PostureAccuracyCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  const getProgressColor = (progress: number) =>
    progress > 0 ? "bg-[#AD85D1]" : "bg-gray-200";

  const getStatusText = (progress: number, completed: boolean) => {
    if (completed) return tr.status.completed;
    if (progress >= 80) return tr.status.great;
    if (progress >= 50) return tr.status.good;
    if (progress > 0) return tr.status.started;
    return tr.status.notStarted;
  };

  const completedCount = weeklyData.filter((d) => d.completed).length;

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
          <p className="text-4xl font-bold">82%</p>
          <div className="w-full flex flex-col">
            <p className="text-md font-light" style={ufLine}>
              {tr.averageScore}
            </p>
            <p className="text-md font-light" style={uf}>
              {tr.thisWeek}
            </p>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div
            className={`flex items-center justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <h4 className="text-lg font-semibold text-gray-800" style={uf}>
              {tr.weeklyProgress}
            </h4>
            <div className="text-sm text-gray-500" style={uf}>
              {tr.daysCompleted(completedCount, weeklyData.length)}
            </div>
          </div>

          <div
            className={`grid grid-cols-7 gap-3 ${isRTL ? "direction-rtl" : ""}`}
          >
            {weeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Day Label */}
                <div className="text-xs font-medium text-gray-600" style={uf}>
                  {tr.days[index]}
                </div>

                {/* Progress Bar */}
                <div className="w-full h-20 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out ${getProgressColor(day.progress)}`}
                    style={{ height: `${day.progress}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      {day.progress > 0 ? `${day.progress}%` : ""}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="text-xs text-center">
                  <span
                    className={`font-medium ${
                      day.completed
                        ? "text-green-600"
                        : day.progress > 0
                          ? "text-blue-600"
                          : "text-gray-400"
                    }`}
                    style={uf}
                  >
                    {getStatusText(day.progress, day.completed)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostureAccuracyCard;
