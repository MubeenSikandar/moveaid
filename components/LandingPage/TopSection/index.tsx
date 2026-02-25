"use client";
import Image from "next/image";
import React from "react";
import BackgroundImage from "@/assets/Background.svg";
import Header from "./Header";
import TopImage from "@/assets/TopSectionImage.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    hero: ["Feel Better in your Body", "Move with Mindful", "Precision."],
    description:
      "AI-powered physiotherapy and posture coaching — no sensors, just your camera and a smarter way to move. Regain strength, improve mobility, and feel more at home in your body with every guided session, anytime, anywhere, at your own pace.",
  },
  ur: {
    hero: [
      "اپنے جسم میں بہتر محسوس کریں",
      "ذہن سازی کے ساتھ حرکت کریں",
      "درستگی کے ساتھ۔",
    ],
    description:
      "اے آئی سے چلنے والی فزیو تھراپی اور پوسچر کوچنگ — کوئی سینسر نہیں، بس آپ کا کیمرہ اور حرکت کا ایک ہوشمند طریقہ۔ ہر گائیڈڈ سیشن کے ساتھ طاقت واپس پائیں، نقل و حرکت بہتر کریں، اور اپنے جسم میں زیادہ سکون محسوس کریں — کسی بھی وقت، کہیں بھی، اپنی رفتار سے۔",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const TopSection = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];

  return (
    <section className="relative w-full" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BackgroundImage}
          alt="top-section"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="w-full px-[10%] pt-2">
          <Header />
        </div>

        {/* Hero Text */}
        <div className="flex flex-col gap-2 items-center text-center mt-32">
          {tr.hero.map((line, i) => (
            <p
              key={i}
              className="text-7xl"
              style={isRTL ? { ...urduFont, lineHeight: "1.8" } : {}}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Description */}
        <div className="px-[22%] mt-16">
          <p
            className="text-center text-xl"
            style={isRTL ? { ...urduFont, lineHeight: "2.2" } : {}}
          >
            {tr.description}
          </p>
        </div>

        {/* Bottom Image */}
        <div className="mt-16 w-full flex items-center justify-center">
          <Image
            src={TopImage}
            alt="top-section"
            width={1838}
            height={958}
            className="w-[818px] h-auto rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default TopSection;
