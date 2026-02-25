"use client";
import React from "react";
import Image from "next/image";
import GoldBadge from "@/assets/BadgeGold.svg";
import CoreStability from "@/assets/CoreStabilityBoost.svg";
import Strengthen from "@/assets/LowerBackRelief.svg";
import ShoulderMobility from "@/assets/ShoulderMobility.svg";
import FullBodyReset from "@/assets/FullBodyReset.svg";
import ArrowRight from "@/assets/Arrow.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    title: "Next Milestone",
    gold: "GOLD",
    day: (n: number) => `Day ${n}`,
    earnBadge: "Earn your 20 day championship badge",
    recentActivity: "Recent Activity",
    activities: [
      { name: "Core Stability Boost", date: "Today" },
      { name: "Lower Back Relief", date: "Yesterday" },
      { name: "Shoulder Mobility", date: "16th Mar" },
      { name: "Full Body Reset", date: "16 Mar" },
    ],
    mins: "MINS",
  },
  ur: {
    title: "اگلا سنگ میل",
    gold: "سونا",
    day: (n: number) => `دن ${n}`,
    earnBadge: "اپنا ۲۰ دن کا چیمپئن شپ بیج حاصل کریں",
    recentActivity: "حالیہ سرگرمی",
    activities: [
      { name: "بنیادی استحکام بوسٹ", date: "آج" },
      { name: "کمر کے نچلے حصے کی راحت", date: "کل" },
      { name: "کندھے کی نقل و حرکت", date: "۱۶ مارچ" },
      { name: "پورے جسم کی ری سیٹ", date: "۱۶ مارچ" },
    ],
    mins: "منٹ",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const activityIcons = [
  CoreStability,
  Strengthen,
  ShoulderMobility,
  FullBodyReset,
];
const activityTimes = ["8:15 AM", "8:15 AM", "8:15 AM", "8:15 AM"];
const activityDurations = [12, 12, 12, 30];

const currentDay = 15;
const totalDays = 20;
const progressPercentage = (currentDay / totalDays) * 100;

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFA500">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const NextMilestoneCard: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  return (
    <div
      className="w-full bg-[#ebe7dd] rounded-4xl p-8"
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

      {/* Badge Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-b from-[#FFD700] to-[#FFA500] rounded-2xl rotate-3 flex items-center justify-center shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={GoldBadge}
                  alt="Gold Badge"
                  width={60}
                  height={60}
                  className="drop-shadow-md"
                />
              </div>
              <div className="absolute top-4 left-4">
                <StarIcon />
              </div>
              <div className="absolute top-4 right-4">
                <StarIcon />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#9B7BFF] to-[#B19AFF] text-white px-8 py-2 rounded-full shadow-lg">
              <span className="font-semibold text-sm tracking-wider" style={uf}>
                {tr.gold}
              </span>
            </div>
          </div>
        </div>

        {/* Day Counter */}
        <div className="mt-8 mb-2">
          <span
            className="bg-gradient-to-r from-[#9B7BFF] to-[#B19AFF] text-white px-4 py-2 rounded-full text-sm font-semibold"
            style={uf}
          >
            {tr.day(currentDay)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-[320px] mb-4">
          <div className="relative h-3 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="absolute top-0 h-full bg-gradient-to-r from-[#4ADE80] to-[#22C55E] rounded-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                [isRTL ? "right" : "left"]: 0,
              }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white border-4 border-[#22C55E] rounded-full shadow-md"
              style={{
                [isRTL ? "right" : "left"]:
                  `calc(${progressPercentage}% - 10px)`,
              }}
            />
          </div>
        </div>

        <p className="text-gray-700 text-center mb-8" style={ufLine}>
          {tr.earnBadge}
        </p>
      </div>

      {/* Recent Activity */}
      <div className="border-t border-gray-300 pt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6" style={uf}>
          {tr.recentActivity}
        </h3>

        <div className="space-y-4">
          {tr.activities.map((activity, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-3 border-b border-gray-200 last:border-0 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex items-center space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                  <Image
                    src={activityIcons[index]}
                    alt={activity.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <h4 className="font-medium text-gray-800 text-lg" style={uf}>
                    {activity.name}
                  </h4>
                  <p className="text-sm text-gray-500" style={uf}>
                    {activity.date} • {activityTimes[index]} •{" "}
                    {activityDurations[index]} {tr.mins}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextMilestoneCard;
