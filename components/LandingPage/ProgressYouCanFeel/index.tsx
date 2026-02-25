"use client";
import Image from "next/image";
import React from "react";
import ProgressYouCanFeelImage from "@/assets/ProgressYouCanFeel.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    badge: "Visible Change",
    heading: "Progress you can feel.",
    description:
      "MoveAid tracks subtle improvements in your posture, balance, and control — giving you visible feedback that builds confidence. Whether it's a straighter back, deeper stretch, or more consistent pace, you'll get insight that shows how far you've come — and what to focus on next.",
  },
  ur: {
    badge: "واضح تبدیلی",
    heading: "ترقی جو آپ محسوس کر سکیں۔",
    description:
      "MoveAid آپ کی کرنسی، توازن اور کنٹرول میں باریک بہتریوں کو ٹریک کرتا ہے — آپ کو ایسی نظر آنے والی فیڈبیک دیتا ہے جو اعتماد بڑھاتی ہے۔ چاہے یہ سیدھی کمر ہو، گہرا اسٹریچ ہو، یا زیادہ مستقل رفتار — آپ کو وہ بصیرت ملے گی جو بتائے کہ آپ کتنا آگے آئے ہیں اور آگے کیا توجہ دینی ہے۔",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const ProgressYouCanFeel = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];

  return (
    <div
      className="flex justify-center gap-16 w-full items-center px-[17%] py-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Image Side */}
      <div className="flex items-center justify-center flex-1 shrink-0">
        <Image
          src={ProgressYouCanFeelImage}
          alt="progress you can feel"
          width={640.98}
          height={619}
        />
      </div>

      {/* Text Side */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-center bg-[#DDE041] rounded-4xl p-2 w-fit text-nowrap">
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

export default ProgressYouCanFeel;
