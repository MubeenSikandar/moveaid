"use client";
import React from "react";
import Image from "next/image";
import SereneDumbbell from "@/assets/Serene Coral Dumbbell Character.svg";
import SmilyFace from "@/assets/SmilyFace.svg";
import SadFace from "@/assets/SadFace.svg";
import SadLightningCharacter from "@/assets/Sad Lightning Bolt Character.svg";
import ArrowRight from "@/assets/Arrow.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    title: "Mood Insights",
    focusMessage: (pct: number) => (
      <>
        You were focused <span className="font-semibold">{pct}%</span> of the
        time
      </>
    ),
    productivity: "High productivity detected",
    moods: ["Focused", "Calm", "Tired", "Frustrated"],
  },
  ur: {
    title: "موڈ بصیرت",
    focusMessage: (pct: number) => (
      <>
        آپ <span className="font-semibold">{pct}٪</span> وقت توجہ مرکوز رہے
      </>
    ),
    productivity: "اعلیٰ پیداواریت کا پتہ چلا",
    moods: ["مرکوز", "پرسکون", "تھکا ہوا", "مایوس"],
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const moodIcons = [SereneDumbbell, SmilyFace, SadFace, SadLightningCharacter];
const moodValues = [95, 75, 85, 55];
const moodGradients = [
  "linear-gradient(180deg, #FF9A8B 0%, #FF6A6A 100%)",
  "linear-gradient(180deg, #B19AFF 0%, #9A7BFF 100%)",
  "linear-gradient(180deg, #C4C4C4 0%, #A8A8A8 100%)",
  "linear-gradient(180deg, #FF8B94 0%, #FF6B74 100%)",
];
const gridLines = [100, 80, 60, 40, 20, 0];
const maxValue = 100;

const MoodInsightsCard: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  return (
    <div
      className="w-full bg-[#ebe7dd] rounded-4xl p-8 shadow-lg"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <h2
          className="text-3xl font-semibold text-gray-800 tracking-tight"
          style={uf}
        >
          {tr.title}
        </h2>
        <button className="bg-white rounded-full flex items-center justify-center">
          <Image
            src={ArrowRight}
            alt="Expand"
            width={36}
            height={36}
            className={isRTL ? "scale-x-[-1]" : ""}
          />
        </button>
      </div>

      {/* Focus Message */}
      <div className="text-center mb-3">
        <p className="text-xl font-medium text-gray-800" style={ufLine}>
          {tr.focusMessage(80)}
        </p>
      </div>

      {/* Productivity Badge */}
      <div className="text-center mb-8">
        <p className="text-base text-gray-500" style={uf}>
          {tr.productivity}
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-[280px]">
        {/* Grid Lines */}
        <div className="absolute inset-0">
          {gridLines.map((value, index) => (
            <div
              key={value}
              className="absolute w-full border-b border-dashed border-gray-300"
              style={{ top: `${(index * 100) / (gridLines.length - 1)}%` }}
            >
              <span
                className={`absolute -top-2 text-sm text-gray-500 ${isRTL ? "-right-2" : "-left-2"}`}
              >
                {value > 0 && value}
              </span>
            </div>
          ))}
          <div className="absolute bottom-0 w-full border-b-2 border-gray-400" />
        </div>

        {/* Bars */}
        <div className="absolute bottom-0 left-0 right-0 h-full flex justify-around items-end px-5">
          {moodValues.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-20 relative"
            >
              {/* Icon */}
              <div
                className="absolute z-10 animate-bounce-subtle"
                style={{
                  bottom: `${(value / maxValue) * 100}%`,
                  marginBottom: "8px",
                }}
              >
                <Image
                  src={moodIcons[index]}
                  alt={tr.moods[index]}
                  width={48}
                  height={48}
                  className="drop-shadow-sm"
                />
              </div>

              {/* Bar */}
              <div
                className="w-[60px] rounded-t-xl transition-all duration-300"
                style={{
                  height: `${(value / maxValue) * 100}%`,
                  background: moodGradients[index],
                }}
              />

              {/* Label */}
              <p className="mt-3 text-sm font-medium text-gray-700" style={uf}>
                {tr.moods[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodInsightsCard;
