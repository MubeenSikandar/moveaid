"use client";
import Image from "next/image";
import React from "react";
import SmarterCoachingBuiltInImage from "@/assets/SmarterCoachingBuiltIn.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    badge: "Intuitive",
    heading: "Smarter coaching, built-in.",
    description:
      "Our AI-powered assistant analyzes your patterns, tracks how you move, and gives real-time coaching to keep you on track — whether you're powering through, easing in, or adjusting on the fly.",
  },
  ur: {
    badge: "بدیہی",
    heading: "ہوشمند کوچنگ، پہلے سے موجود۔",
    description:
      "ہمارا اے آئی سے چلنے والا معاون آپ کے نمونوں کا تجزیہ کرتا ہے، آپ کی حرکات کو ٹریک کرتا ہے، اور آپ کو راستے پر رکھنے کے لیے ریئل ٹائم کوچنگ فراہم کرتا ہے — چاہے آپ پوری رفتار سے چل رہے ہوں، آہستہ شروع کر رہے ہوں، یا چلتے چلتے ایڈجسٹ کر رہے ہوں۔",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const SmarterCoachingBuiltIn = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];

  return (
    <div
      className="flex justify-between gap-16 w-full items-center px-[15%] py-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Image Side */}
      <div className="flex items-center justify-center w-[50%] shrink-0">
        <Image
          src={SmarterCoachingBuiltInImage}
          alt="smarter coaching built in"
          width={691}
          height={570}
        />
      </div>

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
    </div>
  );
};

export default SmarterCoachingBuiltIn;
