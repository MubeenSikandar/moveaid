"use client";
import Image from "next/image";
import React from "react";
import TrackWhatMattersMostImage from "@/assets/TrackWhatMattersMost.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    badge: "Measure",
    heading: "Track What Matters Most",
    description:
      "See how your posture, mobility, and consistency improve over time. MoveAid helps you stay accountable with gentle insights, encouraging progress — not pressure.",
  },
  ur: {
    badge: "پیمائش",
    heading: "جو اہم ہے اسے ٹریک کریں",
    description:
      "دیکھیں کہ وقت کے ساتھ آپ کی کرنسی، نقل و حرکت اور تسلسل کیسے بہتر ہوتا ہے۔ MoveAid آپ کو نرم بصیرت کے ساتھ جوابدہ رہنے میں مدد کرتا ہے — ترقی کی حوصلہ افزائی کرتا ہے، دباؤ نہیں ڈالتا۔",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const TrackWhatMattersMost = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];

  return (
    <div
      className="flex justify-between gap-16 w-full items-center px-[18%] py-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Text Side */}
      <div className="flex flex-col gap-3 w-[50%]">
        <div className="flex items-center justify-center bg-[#DDE041] rounded-4xl p-2 w-[80px] h-[41px]">
          <p className="text-sm text-black" style={isRTL ? urduFont : {}}>
            {tr.badge}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p
            className="text-3xl font-bold text-black"
            style={isRTL ? { ...urduFont, lineHeight: "1.8" } : {}}
          >
            {tr.heading}
          </p>
          <p
            className="text-md text-black font-light w-[90%]"
            style={
              isRTL
                ? { ...urduFont, lineHeight: "2.2", textAlign: "right" }
                : { textAlign: "left" }
            }
          >
            {tr.description}
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="flex items-center justify-center w-[50%] shrink-0">
        <Image
          src={TrackWhatMattersMostImage}
          alt="track what matters most"
          width={751.4}
          height={612}
        />
      </div>
    </div>
  );
};

export default TrackWhatMattersMost;
