"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddBasicDetails from "@/assets/AddBasicDetails.svg";
import GoalsAndPreferencesActive from "@/assets/GoalsAndPreferencesActive.svg";
import MovementAssessment from "@/assets/MobementAssessment.svg";
import AccessibilityAndComfort from "@/assets/AccessibilityAndComfort.svg";
import Logo from "@/assets/MoveAid.svg";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitch from "@/context/LanguageSwitch";

const translations = {
  en: {
    sidebarSubtitle: "Get started by setting up your Move Aid profile",
    stepIndicator: "STEP 2 OF 4",
    title: "What matters most to you?",
    subtitle:
      "Tell us your goals so we can shape sessions that truly fit your priorities.",
    activityLevel: {
      heading: "Activity Level",
      sub: "Choose the one that best matches your lifestyle.",
      options: {
        sedentary: { label: "Sedentary", desc: "Minimal activity" },
        light: { label: "Light", desc: "Some walking" },
        moderate: { label: "Moderate", desc: "Regular exercise" },
        active: { label: "Active", desc: "Very active" },
      },
    },
    sessionLength: {
      heading: "Preferred Session Length",
      sub: "Even 10 minutes counts.",
    },
    daysAndTimes: {
      heading: "Preferred Days and Times",
      sub: "Consistency beats intensity.",
      daysLabel: "Days",
      timesLabel: "Times",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      times: ["Morning", "Afternoon", "Evening", "Anytime"],
    },
    equipment: {
      heading: "Equipment Available",
      sub: "Select all that apply.",
      options: ["None", "Dumbbells", "Resistance Bands", "Others"],
    },
    infoText:
      "Your information helps us create a safe and tailored workout plan.",
    submit: "Save and Continue",
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
        active: true,
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
        active: false,
      },
    ],
  },
  ur: {
    sidebarSubtitle: "اپنا Move Aid پروفائل ترتیب دے کر شروع کریں",
    stepIndicator: "مرحلہ ۲ از ۴",
    title: "آپ کے لیے سب سے اہم کیا ہے؟",
    subtitle:
      "اپنے اہداف بتائیں تاکہ ہم آپ کی ترجیحات کے مطابق سیشن ترتیب دے سکیں۔",
    activityLevel: {
      heading: "سرگرمی کی سطح",
      sub: "وہ آپشن چنیں جو آپ کے طرز زندگی سے بہترین میل کھاتا ہو۔",
      options: {
        sedentary: { label: "غیر فعال", desc: "کم سے کم سرگرمی" },
        light: { label: "ہلکا", desc: "کچھ پیدل چلنا" },
        moderate: { label: "معتدل", desc: "باقاعدہ ورزش" },
        active: { label: "فعال", desc: "بہت زیادہ سرگرم" },
      },
    },
    sessionLength: {
      heading: "پسندیدہ سیشن کا دورانیہ",
      sub: "۱۰ منٹ بھی کافی ہیں۔",
    },
    daysAndTimes: {
      heading: "پسندیدہ دن اور اوقات",
      sub: "تسلسل، شدت سے بہتر ہے۔",
      daysLabel: "دن",
      timesLabel: "اوقات",
      days: ["پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ", "اتوار"],
      times: ["صبح", "دوپہر", "شام", "کسی بھی وقت"],
    },
    equipment: {
      heading: "دستیاب آلات",
      sub: "جو بھی لاگو ہو منتخب کریں۔",
      options: ["کوئی نہیں", "ڈمبل", "ریزسٹنس بینڈز", "دیگر"],
    },
    infoText:
      "آپ کی معلومات ہمیں ایک محفوظ اور ذاتی ورزش کا منصوبہ بنانے میں مدد کرتی ہے۔",
    submit: "محفوظ کریں اور جاری رہیں",
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
        active: true,
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
        active: false,
      },
    ],
  },
} as const;

const stepIcons = [
  AddBasicDetails,
  GoalsAndPreferencesActive,
  MovementAssessment,
  AccessibilityAndComfort,
];
const activityKeys = ["sedentary", "light", "moderate", "active"] as const;
type ActivityKey = (typeof activityKeys)[number];

const activityIcons: Record<ActivityKey, React.ReactNode> = {
  sedentary: (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  ),
  light: (
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
  ),
  moderate: (
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.56-.89-1.68-1.25-2.65-.84L6 8.3V13h2V9.6l1.8-.7z" />
  ),
  active: (
    <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
  ),
};

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const Step2 = () => {
  const router = useRouter();
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  const [activityLevel, setActivityLevel] = useState("");
  const [sessionLength, setSessionLength] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);

  // Store English values internally, display translated labels
  const dayKeys = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeKeys = ["Morning", "Afternoon", "Evening", "Anytime"];
  const equipmentKeys = ["None", "Dumbbells", "Resistance Bands", "Others"];

  const handleDayToggle = (key: string) =>
    setSelectedDays((p) =>
      p.includes(key) ? p.filter((d) => d !== key) : [...p, key],
    );
  const handleTimeToggle = (key: string) =>
    setSelectedTimes((p) =>
      p.includes(key) ? p.filter((t) => t !== key) : [...p, key],
    );
  const handleEquipmentToggle = (key: string) =>
    setEquipment((p) =>
      p.includes(key) ? p.filter((e) => e !== key) : [...p, key],
    );

  const handleSubmit = () => {
    console.log({
      activityLevel,
      sessionLength,
      selectedDays,
      selectedTimes,
      equipment,
    });
    router.push("/assessment/step3");
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
            {tr.steps.map((step, index) => (
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
                      className={`w-0.5 h-16 my-2 ${tr.steps[index + 1]?.active ? "bg-[#AD85D1]" : "bg-gray-300"}`}
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
            ))}
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
            {/* Activity Level */}
            <div>
              <h2
                className="text-lg font-semibold text-gray-900 mb-2"
                style={uf}
              >
                {tr.activityLevel.heading}
              </h2>
              <p className="text-sm text-gray-600 mb-4" style={ufLine}>
                {tr.activityLevel.sub}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activityKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivityLevel(key)}
                    className={`p-5 rounded-xl border-2 text-center transition-all ${
                      activityLevel === key
                        ? "border-[#AD85D1] bg-purple-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#AD85D1] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {activityIcons[key]}
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900" style={uf}>
                          {tr.activityLevel.options[key].label}
                        </div>
                        <div className="text-sm text-gray-500" style={ufLine}>
                          {tr.activityLevel.options[key].desc}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Length */}
            <div>
              <h2
                className="text-lg font-semibold text-gray-900 mb-2"
                style={uf}
              >
                {tr.sessionLength.heading}
              </h2>
              <p className="text-sm text-gray-600 mb-4" style={ufLine}>
                {tr.sessionLength.sub}
              </p>
              <div className="flex gap-4">
                {(["10", "20", "30+"] as const).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setSessionLength(len)}
                    className={`flex-1 py-3 px-6 rounded-xl border-2 font-semibold transition-all ${
                      sessionLength === len
                        ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {len} {isRTL ? "منٹ" : "min"}
                  </button>
                ))}
              </div>
            </div>

            {/* Days and Times */}
            <div>
              <h2
                className="text-lg font-semibold text-gray-900 mb-2"
                style={uf}
              >
                {tr.daysAndTimes.heading}
              </h2>
              <p className="text-sm text-gray-600 mb-4" style={ufLine}>
                {tr.daysAndTimes.sub}
              </p>

              {/* Days */}
              <div className="mb-6">
                <h3
                  className="text-sm font-medium text-gray-700 mb-3"
                  style={uf}
                >
                  {tr.daysAndTimes.daysLabel}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {dayKeys.map((key, i) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleDayToggle(key)}
                      className={`px-6 py-2 rounded-full border-2 font-medium transition-all ${
                        selectedDays.includes(key)
                          ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                      style={uf}
                    >
                      {tr.daysAndTimes.days[i]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Times */}
              <div>
                <h3
                  className="text-sm font-medium text-gray-700 mb-3"
                  style={uf}
                >
                  {tr.daysAndTimes.timesLabel}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {timeKeys.map((key, i) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleTimeToggle(key)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        selectedTimes.includes(key)
                          ? "border-[#AD85D1] bg-purple-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedTimes.includes(key) ? "bg-[#AD85D1]" : "bg-gray-200"}`}
                        >
                          <svg
                            className={`w-5 h-5 ${selectedTimes.includes(key) ? "text-white" : "text-gray-500"}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                          </svg>
                        </div>
                        <div
                          className="font-medium text-gray-900 text-sm"
                          style={uf}
                        >
                          {tr.daysAndTimes.times[i]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h2
                className="text-lg font-semibold text-gray-900 mb-2"
                style={uf}
              >
                {tr.equipment.heading}
              </h2>
              <p className="text-sm text-gray-600 mb-4" style={ufLine}>
                {tr.equipment.sub}
              </p>
              <div className="flex gap-3 flex-wrap">
                {equipmentKeys.map((key, i) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleEquipmentToggle(key)}
                    className={`px-6 py-3 rounded-full border-2 font-medium transition-all ${
                      equipment.includes(key)
                        ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                    style={uf}
                  >
                    {tr.equipment.options[i]}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-6" style={ufLine}>
              {tr.infoText}
            </p>

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

export default Step2;
