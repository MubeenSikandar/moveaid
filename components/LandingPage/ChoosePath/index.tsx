"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import PathCard from "./PathCard";
import { useLanguage } from "@/context/LanguageContext";
import RecoverFromInjury from "@/assets/RecoverFromInjury.svg";
import FixPosture from "@/assets/FixPosture.svg";
import BuildAMovementHabit from "@/assets/BuildAMovementHabit.svg";
import ImproveYourWorkoutForm from "@/assets/ImproveYourWorkoutForm.svg";
import StayActiveAtYourDesk from "@/assets/StayActiveAtYourDesk.svg";
import LessStiffMoreMobile from "@/assets/LessStiffMoreMobile.svg";

const translations = {
  en: {
    badge: "Choose Path",
    heading: "What kind of support are you looking for?",
    subheading:
      "Everyone moves differently. Let's start with what your body needs.",
    signInPrompt: "Sign in to start assessment",
    paths: [
      "Recover From Injury",
      "Fix Posture",
      "Build A Movement Habit",
      "Improve Your Workout Form",
      "Stay Active At Your Desk",
      "Less Stiff More Mobile",
    ],
  },
  ur: {
    badge: "راستہ چنیں",
    heading: "آپ کس قسم کی مدد تلاش کر رہے ہیں؟",
    subheading:
      "ہر کوئی مختلف طریقے سے حرکت کرتا ہے۔ آئیں اپنے جسم کی ضرورت سے شروع کریں۔",
    signInPrompt: "تشخیص شروع کرنے کے لیے سائن ان کریں",
    paths: [
      "چوٹ سے صحت یابی",
      "کرنسی درست کریں",
      "حرکت کی عادت بنائیں",
      "ورزش کی شکل بہتر کریں",
      "ڈیسک پر فعال رہیں",
      "کم سختی، زیادہ لچک",
    ],
  },
} as const;

const pathImages = [
  RecoverFromInjury,
  FixPosture,
  BuildAMovementHabit,
  ImproveYourWorkoutForm,
  StayActiveAtYourDesk,
  LessStiffMoreMobile,
];

const formTypes = [
  "recover-from-injury",
  "fix-posture",
  "build-movement-habit",
  "improve-workout-form",
  "stay-active-at-desk",
  "less-stiff-more-mobile",
];

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const ChoosePath = () => {
  const router = useRouter();
  const { language, isRTL } = useLanguage();
  const tr = translations[language];

  const handlePathClick = (formType: string) => {
    localStorage.setItem("selectedPath", formType);
    router.push("/assessment");
  };

  const pathAssets = pathImages.map((image, i) => ({
    image,
    text: tr.paths[i],
    formType: formTypes[i],
    width: 80,
    height: 80,
    className: "w-20 h-20",
  }));

  return (
    <div
      className="flex flex-col gap-4 items-center justify-center py-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Badge */}
      <div className="flex items-center justify-center bg-[#EFEAE6] rounded-4xl p-4">
        <p className="text-md italic" style={isRTL ? urduFont : {}}>
          {tr.badge}
        </p>
      </div>

      {/* Heading */}
      <p
        className="text-5xl font-bold text-black text-center px-[20%]"
        style={isRTL ? { ...urduFont, lineHeight: "1.6" } : {}}
      >
        {tr.heading}
      </p>

      {/* Subheading */}
      <p
        className="text-md text-black font-light text-center px-[20%]"
        style={isRTL ? { ...urduFont, lineHeight: "2" } : {}}
      >
        {tr.subheading}
      </p>

      {/* Path Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {pathAssets.map((asset, index) => (
          <div key={index}>
            <SignedIn>
              <PathCard
                imagePath={asset.image}
                text={asset.text}
                width={asset.width}
                height={asset.height}
                className={asset.className}
                onClick={() => handlePathClick(asset.formType)}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <div className="flex flex-col gap-4 items-center justify-center py-8 border-2 border-transparent rounded-2xl hover:border-gray-300 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center bg-white rounded-4xl p-4">
                    <p className="text-md italic" style={isRTL ? urduFont : {}}>
                      {asset.text}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={asset.image}
                      alt={asset.text}
                      width={asset.width}
                      height={asset.height}
                      className={asset.className}
                    />
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-sm text-gray-500 mb-2"
                      style={isRTL ? urduFont : {}}
                    >
                      {tr.signInPrompt}
                    </p>
                  </div>
                </div>
              </SignInButton>
            </SignedOut>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoosePath;
