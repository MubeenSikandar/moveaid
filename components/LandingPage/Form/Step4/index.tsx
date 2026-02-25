"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddBasicDetails from "@/assets/AddBasicDetails.svg";
import GoalsAndPreferencesActive from "@/assets/GoalsAndPreferencesActive.svg";
import MovementAssessmentActive from "@/assets/MovementAssessmentActive.svg";
import AccessibilityAndComfortActive from "@/assets/AccessibilityAndComfortActive.svg";
import Logo from "@/assets/MoveAid.svg";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitch from "@/context/LanguageSwitch";

const translations = {
  en: {
    sidebarSubtitle: "Get started by setting up your Move Aid profile",
    stepIndicator: "STEP 4 OF 4",
    title: "Accessibility and Comfort",
    subtitle:
      "Adjust settings so sessions feel comfortable, motivating, and supportive.",
    injuries: {
      heading: "Do you have any injuries or pain areas we should know about?",
      sub: "This helps us keep your movements safe and adapted to your body.",
      options: ["Knees", "Shoulders", "Back", "Neck", "Hips", "Other", "None"],
    },
    accessibility: {
      heading: "Do you need any accessibility support?",
      sub: "Select what makes sessions more comfortable—you can always update later.",
      options: [
        "Low-vision mode (larger text, high contrast)",
        "Low-mobility adaptations (seated or simplified moves)",
        "Balance support options (chair-assisted moves)",
      ],
    },
    infoText:
      "Your information helps us create a safe and tailored workout plan.",
    submit: "Save",
    steps: [
      {
        title: "Add Basic Details",
        description:
          "Provide your basic information to get started with your personalized fitness journey.",
        active: false,
      },
      {
        title: "Goals and Preferences",
        description:
          "Set your fitness objectives and preferences for a tailored workout experience.",
        active: false,
      },
      {
        title: "Movement Assessment",
        description:
          "To guide you safely, we'll begin with a quick movement check. This helps us adapt exercises to your comfort and abilities.",
        active: false,
      },
      {
        title: "Accessibility and Comfort",
        description:
          "Your body, your pace. Adjust settings so sessions feel comfortable, motivating, and supportive.",
        active: true,
      },
    ],
  },
  ur: {
    sidebarSubtitle: "اپنا Move Aid پروفائل ترتیب دے کر شروع کریں",
    stepIndicator: "مرحلہ ۴ از ۴",
    title: "رسائی اور آرام",
    subtitle:
      "ترتیبات ایڈجسٹ کریں تاکہ سیشن آرام دہ، حوصلہ افزا اور معاون محسوس ہوں۔",
    injuries: {
      heading: "کیا آپ کو کوئی چوٹ یا درد کا مقام ہے جو ہمیں معلوم ہونا چاہیے؟",
      sub: "یہ ہمیں آپ کی حرکات کو محفوظ اور آپ کے جسم کے مطابق رکھنے میں مدد دیتا ہے۔",
      options: ["گھٹنے", "کندھے", "کمر", "گردن", "کولہے", "دیگر", "کوئی نہیں"],
    },
    accessibility: {
      heading: "کیا آپ کو کسی رسائی کی مدد کی ضرورت ہے؟",
      sub: "وہ چنیں جو سیشن کو زیادہ آرام دہ بنائے — آپ بعد میں بھی اپ ڈیٹ کر سکتے ہیں۔",
      options: [
        "کم بصارت موڈ (بڑا متن، زیادہ کنٹراسٹ)",
        "کم نقل و حرکت کی ترامیم (بیٹھ کر یا آسان حرکات)",
        "توازن کی مدد (کرسی سے مدد والی حرکات)",
      ],
    },
    infoText:
      "آپ کی معلومات ہمیں ایک محفوظ اور ذاتی ورزش کا منصوبہ بنانے میں مدد کرتی ہے۔",
    submit: "محفوظ کریں",
    steps: [
      {
        title: "بنیادی تفصیلات شامل کریں",
        description:
          "اپنے ذاتی فٹنس سفر کے آغاز کے لیے اپنی بنیادی معلومات فراہم کریں۔",
        active: false,
      },
      {
        title: "اہداف اور ترجیحات",
        description:
          "ایک موزوں ورزش کے تجربے کے لیے اپنے فٹنس مقاصد اور ترجیحات طے کریں۔",
        active: false,
      },
      {
        title: "حرکت کا جائزہ",
        description:
          "آپ کی محفوظ رہنمائی کے لیے ہم ایک فوری حرکت کی جانچ سے شروع کریں گے۔",
        active: false,
      },
      {
        title: "رسائی اور آرام",
        description:
          "آپ کا جسم، آپ کی رفتار۔ ترتیبات ایڈجسٹ کریں تاکہ سیشن آرام دہ لگیں۔",
        active: true,
      },
    ],
  },
} as const;

const stepIcons = [
  AddBasicDetails,
  GoalsAndPreferencesActive,
  MovementAssessmentActive,
  AccessibilityAndComfortActive,
];
const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const CheckIcon = () => (
  <svg
    className="w-3 h-3 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const Step4 = () => {
  const router = useRouter();
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  // Internal keys are always English for consistent data storage
  const injuryKeys = [
    "Knees",
    "Shoulders",
    "Back",
    "Neck",
    "Hips",
    "Other",
    "None",
  ];
  const accessibilityKeys = [
    "Low-vision mode (larger text, high contrast)",
    "Low-mobility adaptations (seated or simplified moves)",
    "Balance support options (chair-assisted moves)",
  ];

  const [injuries, setInjuries] = useState<string[]>([]);
  const [accessibilitySupport, setAccessibilitySupport] = useState<string[]>(
    [],
  );

  const handleInjuryToggle = (key: string) =>
    setInjuries((p) =>
      p.includes(key) ? p.filter((i) => i !== key) : [...p, key],
    );
  const handleAccessibilityToggle = (key: string) =>
    setAccessibilitySupport((p) =>
      p.includes(key) ? p.filter((o) => o !== key) : [...p, key],
    );

  const handleSubmit = () => {
    console.log({ injuries, accessibilitySupport });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f3f0ee] flex" dir={isRTL ? "rtl" : "ltr"}>
      {/* Left Sidebar */}
      <div className="w-full lg:w-2/5 bg-gradient-to-b from-[#efe6d9] to-[#e8dfd1] p-8 lg:p-12">
        <div className="max-w-md">
          <div className="mb-12 flex items-center justify-between">
            <Image src={Logo} alt="MoveAid" width={150} height={40} />
            <LanguageSwitch />
          </div>
          <p className="text-gray-600 text-sm mb-8" style={ufLine}>
            {tr.sidebarSubtitle}
          </p>
          <div className="space-y-8">
            {tr.steps.map((step, index) => {
              const shouldBeActive = tr.steps
                .slice(index + 1)
                .some((s) => s.active);
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <Image
                      src={stepIcons[index]}
                      alt={step.title}
                      width={36}
                      height={36}
                    />
                    {index < tr.steps.length - 1 && (
                      <div
                        className={`w-0.5 h-16 my-2 ${shouldBeActive ? "bg-[#AD85D1]" : "bg-gray-300"}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3
                      className={`font-semibold mb-1 ${step.active ? "text-gray-900" : "text-gray-500"}`}
                      style={uf}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm text-gray-500 leading-relaxed"
                      style={ufLine}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-sm text-gray-500 mb-2" style={uf}>
            {tr.stepIndicator}
          </div>
          <h1
            className="text-4xl font-bold text-gray-900 mb-3"
            style={isRTL ? { ...urduFont, lineHeight: "1.8" } : {}}
          >
            {tr.title}
          </h1>
          <p className="text-gray-600 mb-12" style={ufLine}>
            {tr.subtitle}
          </p>

          <div className="space-y-10">
            {/* Injury Options */}
            <div>
              <h2
                className="text-lg font-semibold text-gray-900 mb-2"
                style={ufLine}
              >
                {tr.injuries.heading}
              </h2>
              <p className="text-sm text-gray-600 mb-4" style={ufLine}>
                {tr.injuries.sub}
              </p>
              <div className="flex gap-3 flex-wrap">
                {injuryKeys.map((key, i) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleInjuryToggle(key)}
                    className={`px-6 py-3 rounded-full border-2 font-medium transition-all ${
                      injuries.includes(key)
                        ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                    style={uf}
                  >
                    {tr.injuries.options[i]}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Options */}
            <div>
              <h2
                className="text-lg font-semibold text-gray-900 mb-2"
                style={ufLine}
              >
                {tr.accessibility.heading}
              </h2>
              <p className="text-sm text-gray-600 mb-4" style={ufLine}>
                {tr.accessibility.sub}
              </p>
              <div className="space-y-3">
                {accessibilityKeys.map((key, i) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleAccessibilityToggle(key)}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      accessibilitySupport.includes(key)
                        ? "border-[#AD85D1] bg-purple-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    } ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          accessibilitySupport.includes(key)
                            ? "bg-[#AD85D1] border-[#AD85D1]"
                            : "border-gray-300"
                        }`}
                      >
                        {accessibilitySupport.includes(key) && <CheckIcon />}
                      </div>
                      <span className="font-medium text-gray-900" style={uf}>
                        {tr.accessibility.options[i]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div
                className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <svg
                  className="w-5 h-5 text-[#AD85D1] flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-gray-700" style={ufLine}>
                  {tr.infoText}
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#AD85D1] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#9c72c0] transition-all shadow-lg hover:shadow-xl mt-8"
              style={uf}
            >
              {tr.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
