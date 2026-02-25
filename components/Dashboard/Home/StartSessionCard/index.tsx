"use client";
import React from "react";
import Clock from "@/assets/Clock.svg";
import Muscle from "@/assets/Muscle.svg";
import Mat from "@/assets/Mat.svg";
import DashboardHome from "@/assets/DashBoardHome.svg";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    today: "Today: Core Stability",
    motivation: "Build strength one step at a time. Keep it up! 💪",
    startSession: "Start Session",
    duration: "12 min",
    focus: "Core Focus",
    equipment: "Mat Only",
  },
  ur: {
    today: "آج: بنیادی استحکام",
    motivation: "ایک قدم بہ قدم طاقت بنائیں۔ جاری رکھیں! 💪",
    startSession: "سیشن شروع کریں",
    duration: "۱۲ منٹ",
    focus: "بنیادی توجہ",
    equipment: "صرف میٹ",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const StartSessionCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-[#ebe7dd] rounded-4xl p-10 relative"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex flex-col justify-center gap-10">
          <p
            className="text-xl font-bold text-black text-left"
            style={isRTL ? { ...urduFont, textAlign: "right" } : {}}
          >
            {tr.today}
          </p>
          <p
            className="text-lg text-black font-light text-left"
            style={isRTL ? { ...ufLine, textAlign: "right" } : {}}
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
            className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
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
        <div className="flex items-center justify-center" />
      </div>
      <Image
        src={DashboardHome}
        alt="dashboard-home"
        width={443.9354335579325}
        height={443.9354335579325}
        className={`absolute top-[-90px] ${isRTL ? "left-[-100px] scale-x-[-1]" : "right-[-100px]"}`}
      />
    </div>
  );
};

export default StartSessionCard;
