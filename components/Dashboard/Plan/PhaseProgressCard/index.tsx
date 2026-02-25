"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    phase: "Phase 1: Core Stability",
    progress: "Progress",
    weekOf: (current: number, total: number) => `Week ${current} of ${total}`,
    adjustPlan: "Adjust My Plan",
    intensity: {
      label: "Intensity",
      options: ["Gentle", "Moderate", "Challenging"],
    },
    sessionLength: {
      label: "Session Length",
      options: ["10-20min", "20-30min", "30+ min"],
    },
    focusArea: {
      label: "Focus Area",
      options: ["Strength", "Mobility", "Posture"],
    },
    applyChanges: "Apply Changes",
  },
  ur: {
    phase: "مرحلہ ۱: بنیادی استحکام",
    progress: "پیشرفت",
    weekOf: (current: number, total: number) => `ہفتہ ${current} از ${total}`,
    adjustPlan: "میرا منصوبہ ایڈجسٹ کریں",
    intensity: {
      label: "شدت",
      options: ["نرم", "معتدل", "چیلنجنگ"],
    },
    sessionLength: {
      label: "سیشن کا دورانیہ",
      options: ["۱۰-۲۰ منٹ", "۲۰-۳۰ منٹ", "۳۰+ منٹ"],
    },
    focusArea: {
      label: "توجہ کا مرکز",
      options: ["طاقت", "نقل و حرکت", "کرنسی"],
    },
    applyChanges: "تبدیلیاں لاگو کریں",
  },
} as const;

// Internal keys for state — always English, language-agnostic
const intensityKeys = ["Gentle", "Moderate", "Challenging"] as const;
const sessionLengthKeys = ["10-20min", "20-30min", "30+ min"] as const;
const focusAreaKeys = ["Strength", "Mobility", "Posture"] as const;

type IntensityKey = (typeof intensityKeys)[number];
type SessionKey = (typeof sessionLengthKeys)[number];
type FocusKey = (typeof focusAreaKeys)[number];

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
const currentWeek = 3;
const totalWeeks = 4;

const PhaseProgressCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  const [selectedIntensity, setSelectedIntensity] =
    useState<IntensityKey>("Moderate");
  const [selectedSessionLength, setSelectedSessionLength] =
    useState<SessionKey>("20-30min");
  const [selectedFocusArea, setSelectedFocusArea] =
    useState<FocusKey>("Strength");

  const progressPercentage = (currentWeek / totalWeeks) * 100;

  const getButtonStyle = (isSelected: boolean) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isSelected
        ? "bg-[#AD85D1] text-white"
        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
    }`;

  return (
    <div
      className="w-full h-full bg-[#ebe7dd] rounded-4xl p-6 shadow-lg flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Phase Progress */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-black mb-4" style={uf}>
          {tr.phase}
        </h2>
        <div className="mb-3">
          <div
            className={`flex justify-between items-center mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <span className="text-sm font-medium text-gray-700" style={uf}>
              {tr.progress}
            </span>
            <span className="text-sm font-medium text-[#AD85D1]" style={uf}>
              {tr.weekOf(currentWeek, totalWeeks)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#AD85D1] h-3 rounded-full transition-all duration-300"
              style={{
                width: `${progressPercentage}%`,
                marginLeft: isRTL ? "auto" : undefined,
                marginRight: isRTL ? 0 : undefined,
              }}
            />
          </div>
        </div>
      </div>

      {/* Adjust Plan */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black mb-4" style={uf}>
          {tr.adjustPlan}
        </h3>

        <div className="space-y-6">
          {/* Intensity */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3" style={uf}>
              {tr.intensity.label}
            </h4>
            <div
              className={`flex gap-2 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {intensityKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setSelectedIntensity(key)}
                  className={getButtonStyle(selectedIntensity === key)}
                  style={uf}
                >
                  {tr.intensity.options[i]}
                </button>
              ))}
            </div>
          </div>

          {/* Session Length */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3" style={uf}>
              {tr.sessionLength.label}
            </h4>
            <div
              className={`flex gap-2 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {sessionLengthKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setSelectedSessionLength(key)}
                  className={getButtonStyle(selectedSessionLength === key)}
                  style={uf}
                >
                  {tr.sessionLength.options[i]}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Area */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3" style={uf}>
              {tr.focusArea.label}
            </h4>
            <div
              className={`flex gap-2 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {focusAreaKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setSelectedFocusArea(key)}
                  className={getButtonStyle(selectedFocusArea === key)}
                  style={uf}
                >
                  {tr.focusArea.options[i]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Changes */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <button
            className="w-full bg-[#AD85D1] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#9B75C1] transition-colors duration-200"
            style={uf}
          >
            {tr.applyChanges}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhaseProgressCard;
