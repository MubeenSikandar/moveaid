"use client";
import Image from "next/image";
import React from "react";
import Clock from "@/assets/Clock.svg";
import Muscle from "@/assets/Muscle.svg";
import Mat from "@/assets/Mat.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    today: "Today: Core Stability",
    motivation: "Build strength one step at a time. Keep it up! 💪",
    startSession: "Start Session",
    duration: "12 min",
    focus: "Core Focus",
    equipment: "Mat Only",
    completeSessions: "Complete sessions",
  },
  ur: {
    today: "آج: بنیادی استحکام",
    motivation: "ایک قدم بہ قدم طاقت بنائیں۔ جاری رکھیں! 💪",
    startSession: "سیشن شروع کریں",
    duration: "۱۲ منٹ",
    focus: "بنیادی توجہ",
    equipment: "صرف میٹ",
    completeSessions: "مکمل سیشن",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const completedSessions = 4;
const totalSessions = 10;

const PlanStartSessionCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};

  const safeCompleted = Math.min(Math.max(0, completedSessions), totalSessions);
  const safeTotal = Math.max(0, totalSessions);
  const progressPercentage =
    safeTotal > 0 ? (safeCompleted / safeTotal) * 100 : 0;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressPercentage / 100);

  return (
    <div
      className="w-full h-full bg-[#ebe7dd] rounded-4xl p-6 shadow-lg overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`w-full h-full flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Text Side */}
        <div className="flex flex-col justify-center gap-6">
          <p
            className="text-xl font-bold text-black"
            style={
              isRTL
                ? { ...urduFont, textAlign: "right" }
                : { textAlign: "left" }
            }
          >
            {tr.today}
          </p>
          <p
            className="text-lg text-black font-light"
            style={
              isRTL
                ? { ...urduFont, lineHeight: "2", textAlign: "right" }
                : { textAlign: "left" }
            }
          >
            {tr.motivation}
          </p>
          <button
            className="bg-[#AD85D1] text-white rounded-4xl p-4"
            style={uf}
          >
            {tr.startSession}
          </button>
          <div
            className={`flex items-center justify-between gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
              <Image src={Clock} alt="clock" width={12} height={12} />
              <p className="text-xs font-light" style={uf}>
                {tr.duration}
              </p>
            </button>
            <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
              <Image src={Muscle} alt="muscle" width={12} height={12} />
              <p className="text-xs font-light" style={uf}>
                {tr.focus}
              </p>
            </button>
            <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
              <Image src={Mat} alt="mat" width={12} height={12} />
              <p className="text-xs font-light" style={uf}>
                {tr.equipment}
              </p>
            </button>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="flex items-center justify-center relative shrink-0">
          <svg
            className="w-48 h-48 transform -rotate-90"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
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
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 500ms ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-[#AD85D1]">
              {safeCompleted}/{safeTotal}
            </div>
            <div className="text-sm text-gray-500 text-center" style={uf}>
              {tr.completeSessions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanStartSessionCard;
