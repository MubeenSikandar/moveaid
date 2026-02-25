"use client";
import Image from "next/image";
import React from "react";
import YourBodyYourPlanImage from "@/assets/YourBodyYourPlanImage.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    badge: "Adaptive",
    heading: "Your Body, Your Plan",
    description:
      "No two bodies move the same — that's why MoveAid tailors each session to your goals, mobility, and pace. Whether you're easing back from injury or building a daily habit, we'll guide you step by step with support that adapts as you grow.",
  },
  ur: {
    badge: "موافق",
    heading: "آپ کا جسم، آپ کا منصوبہ",
    description:
      "کوئی بھی دو جسم ایک جیسے نہیں چلتے — اسی لیے MoveAid ہر سیشن کو آپ کے اہداف، نقل و حرکت اور رفتار کے مطابق ڈھالتا ہے۔ چاہے آپ چوٹ کے بعد واپس آ رہے ہوں یا روزانہ کی عادت بنا رہے ہوں، ہم آپ کو قدم بہ قدم رہنمائی دیں گے اور آپ کی ترقی کے ساتھ سہارا بھی بدلتا رہے گا۔",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const YourBodyYourPlan = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];

  return (
    <div
      className="flex justify-between w-full items-center px-[20%] py-20"
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
            className="text-md text-black font-light text-left w-[90%]"
            style={
              isRTL
                ? { ...urduFont, lineHeight: "2.2", textAlign: "right" }
                : {}
            }
          >
            {tr.description}
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="flex items-center justify-center w-[50%]">
        <Image
          src={YourBodyYourPlanImage}
          alt="your body your plan"
          width={751.4}
          height={612}
        />
      </div>
    </div>
  );
};

export default YourBodyYourPlan;
