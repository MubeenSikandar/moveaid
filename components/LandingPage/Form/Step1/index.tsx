"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddBasicDetails from "@/assets/AddBasicDetails.svg";
import GoalsAndPreferences from "@/assets/GoalsAndPreferences.svg";
import MovementAssessment from "@/assets/MobementAssessment.svg";
import AccessibilityAndComfort from "@/assets/AccessibilityAndComfort.svg";
import Logo from "@/assets/MoveAid.svg";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitch from "@/context/LanguageSwitch";

const translations = {
  en: {
    sidebarSubtitle: "Get started by setting up your Move Aid profile",
    stepIndicator: "STEP 1 OF 4",
    title: "Let's personalize your fitness journey",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    fitnessGoalsLabel: "Tell us about your fitness goals",
    goals: {
      recoverFromInjury: "Recover from injury",
      relievePain: "Relieve pain",
      improvePosture: "Improve posture",
      buildStrength: "Build strength",
      increaseMobility: "Increase mobility",
      boostEnergy: "Boost energy & stamina",
    },
    infoText:
      "Your information helps us create a safe and tailored workout plan.",
    submit: "Save and Continue",
    steps: [
      {
        title: "Add Basic Details",
        description:
          "Provide your basic information to get started with your personalized fitness journey.",
      },
      {
        title: "Goals and Preferences",
        description:
          "Set your fitness objectives and preferences for a tailored workout experience.",
      },
      {
        title: "Movement Assessment",
        description:
          "To guide you safely, we'll begin with a quick movement check. This helps us adapt exercises to your comfort and abilities.",
      },
      {
        title: "Accessibility and Comfort",
        description:
          "Your body, your pace. Adjust settings so sessions feel comfortable, motivating, and supportive.",
      },
    ],
  },
  ur: {
    sidebarSubtitle: "اپنا Move Aid پروفائل ترتیب دے کر شروع کریں",
    stepIndicator: "مرحلہ ۱ از ۴",
    title: "آئیں آپ کے فٹنس سفر کو ذاتی بنائیں",
    fullName: "پورا نام",
    fullNamePlaceholder: "اپنا پورا نام درج کریں",
    dateOfBirth: "تاریخ پیدائش",
    gender: "جنس",
    male: "مرد",
    female: "عورت",
    other: "دیگر",
    fitnessGoalsLabel: "اپنے فٹنس اہداف بتائیں",
    goals: {
      recoverFromInjury: "چوٹ سے صحت یابی",
      relievePain: "درد کم کریں",
      improvePosture: "کرنسی بہتر کریں",
      buildStrength: "طاقت بنائیں",
      increaseMobility: "نقل و حرکت بڑھائیں",
      boostEnergy: "توانائی اور قوت برداشت بڑھائیں",
    },
    infoText:
      "آپ کی معلومات ہمیں ایک محفوظ اور ذاتی ورزش کا منصوبہ بنانے میں مدد کرتی ہے۔",
    submit: "محفوظ کریں اور جاری رہیں",
    steps: [
      {
        title: "بنیادی تفصیلات شامل کریں",
        description:
          "اپنے ذاتی فٹنس سفر کے آغاز کے لیے اپنی بنیادی معلومات فراہم کریں۔",
      },
      {
        title: "اہداف اور ترجیحات",
        description:
          "ایک موزوں ورزش کے تجربے کے لیے اپنے فٹنس مقاصد اور ترجیحات طے کریں۔",
      },
      {
        title: "حرکت کا جائزہ",
        description:
          "آپ کی محفوظ رہنمائی کے لیے ہم ایک فوری حرکت کی جانچ سے شروع کریں گے۔ یہ ہمیں مشقوں کو آپ کے آرام اور صلاحیتوں کے مطابق ڈھالنے میں مدد دیتا ہے۔",
      },
      {
        title: "رسائی اور آرام",
        description:
          "آپ کا جسم، آپ کی رفتار۔ ترتیبات ایڈجسٹ کریں تاکہ سیشن آرام دہ، حوصلہ افزا اور معاون لگیں۔",
      },
    ],
  },
} as const;

const stepIcons = [
  AddBasicDetails,
  GoalsAndPreferences,
  MovementAssessment,
  AccessibilityAndComfort,
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

type GoalKey =
  | "recoverFromInjury"
  | "relievePain"
  | "improvePosture"
  | "buildStrength"
  | "increaseMobility"
  | "boostEnergy";

const Step1 = () => {
  const router = useRouter();
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState<Record<GoalKey, boolean>>({
    recoverFromInjury: false,
    relievePain: false,
    improvePosture: false,
    buildStrength: false,
    increaseMobility: false,
    boostEnergy: false,
  });

  const handleGoalToggle = (goal: GoalKey) => {
    setFitnessGoals((prev) => ({ ...prev, [goal]: !prev[goal] }));
  };

  const handleSubmit = () => {
    console.log({ fullName, dateOfBirth, gender, fitnessGoals });
    router.push("/assessment/step2");
  };

  const goalKeys: GoalKey[] = [
    "recoverFromInjury",
    "relievePain",
    "improvePosture",
    "buildStrength",
    "increaseMobility",
    "boostEnergy",
  ];

  return (
    <div className="min-h-screen bg-[#f3f0ee] flex" dir={isRTL ? "rtl" : "ltr"}>
      {/* Left Sidebar */}
      <div className="w-full lg:w-2/5 bg-gradient-to-b from-[#efe6d9] to-[#e8dfd1] p-8 lg:p-12">
        <div className="max-w-md">
          {/* Logo */}
          <div className="mb-12 flex items-center justify-between">
            <Image src={Logo} alt="MoveAid" width={150} height={40} />
            <LanguageSwitch />
          </div>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm mb-8" style={ufLine}>
            {tr.sidebarSubtitle}
          </p>

          {/* Steps */}
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
                    <div className="w-0.5 h-16 bg-gray-300 my-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3
                    className={`font-semibold mb-1 ${index === 0 ? "text-gray-900" : "text-gray-500"}`}
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
          {/* Step Indicator */}
          <div className="text-sm text-gray-500 mb-2" style={uf}>
            {tr.stepIndicator}
          </div>

          {/* Title */}
          <h1
            className="text-4xl font-bold text-gray-900 mb-12"
            style={isRTL ? { ...urduFont, lineHeight: "1.8" } : {}}
          >
            {tr.title}
          </h1>

          {/* Form */}
          <div className="space-y-8">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                style={uf}
              >
                {tr.fullName}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={tr.fullNamePlaceholder}
                dir={isRTL ? "rtl" : "ltr"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD85D1] focus:border-transparent outline-none transition"
                style={uf}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                style={uf}
              >
                {tr.dateOfBirth}
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD85D1] focus:border-transparent outline-none transition"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-3"
                style={uf}
              >
                {tr.gender}
              </label>
              <div className="space-y-3">
                {(["male", "female", "other"] as const).map((val) => (
                  <label
                    key={val}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={val}
                      checked={gender === val}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-5 h-5 text-[#AD85D1] focus:ring-[#AD85D1]"
                    />
                    <span className="text-gray-700" style={uf}>
                      {val === "male"
                        ? tr.male
                        : val === "female"
                          ? tr.female
                          : tr.other}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fitness Goals */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-4"
                style={ufLine}
              >
                {tr.fitnessGoalsLabel}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goalKeys.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleGoalToggle(goal)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      fitnessGoals[goal]
                        ? "border-[#AD85D1] bg-purple-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    } ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                          fitnessGoals[goal]
                            ? "bg-[#AD85D1] border-[#AD85D1]"
                            : "border-gray-300"
                        }`}
                      >
                        {fitnessGoals[goal] && <CheckIcon />}
                      </div>
                      <span className="font-medium text-gray-900" style={uf}>
                        {tr.goals[goal]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Text */}
            <p className="text-sm text-gray-500 mt-6" style={ufLine}>
              {tr.infoText}
            </p>

            {/* Submit Button */}
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

export default Step1;
