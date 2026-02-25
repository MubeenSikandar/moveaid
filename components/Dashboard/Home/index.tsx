"use client";
import React from "react";
import StartSessionCard from "./StartSessionCard";
import PostureAccuracyCard from "./PostureAccuracyCard";
import WeeklyStreakCard from "./WeeklyStreakCard";
import WeeklyProgressCard from "./WeeklyProgressCard";
import MoodInsightsCard from "./MoodInsightsCard";
import NextMilestoneCard from "./NextMileStoneCard";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    greeting: (name: string) => `Hi ${name}, ready to move today?`,
  },
  ur: {
    greeting: (name: string) => `ہیلو ${name}، کیا آج حرکت کے لیے تیار ہیں؟`,
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const Home = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];

  return (
    <div
      className="w-full h-full flex flex-col gap-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="pt-10">
        <h1
          className="text-4xl font-bold text-black"
          style={isRTL ? { ...urduFont, lineHeight: "1.8" } : {}}
        >
          {tr.greeting("Sukaina")}
        </h1>
      </div>
      <div className="w-full h-full flex items-center justify-center gap-10">
        <div className="w-full h-full flex flex-col items-center gap-4">
          <StartSessionCard />
          <div className="flex items-center justify-center w-full gap-4">
            <PostureAccuracyCard />
            <WeeklyStreakCard />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 h-full w-full">
          <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
            <WeeklyProgressCard />
            <MoodInsightsCard />
          </div>
          <NextMilestoneCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
