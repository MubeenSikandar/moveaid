"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    title: "Physiotherapy Exercises",
    subtitle: "Therapeutic exercises for pain relief and mobility improvement",
    selected: "✓ Selected",
    viewDetails: "View Details",
    benefits: "Benefits",
    instructions: "Instructions",
    tip: "💡 Tip:",
    tipText:
      "Start slowly and listen to your body. If you experience pain, stop and consult a healthcare professional.",
    detailsLabel: (name: string) => `${name} - Details`,
    footerSelected:
      "Always consult with a healthcare professional before starting new exercises",
    footerDefault: "Scroll horizontally to browse physiotherapy exercises",
    difficulty: {
      Beginner: "Beginner",
      Intermediate: "Intermediate",
      Advanced: "Advanced",
    },
    categories: {
      Mobility: "Mobility",
      "Pain Relief": "Pain Relief",
      Flexibility: "Flexibility",
      Posture: "Posture",
    },
    exercises: [
      {
        name: "Neck Stretches",
        category: "Mobility",
        duration: "5-10 min",
        difficulty: "Beginner",
        targetArea: "Neck & Upper Back",
        description:
          "Gentle stretches to relieve neck tension and improve mobility",
        benefits: [
          "Reduces neck stiffness",
          "Improves range of motion",
          "Relieves tension headaches",
        ],
        instructions: [
          "Sit or stand with good posture",
          "Slowly tilt head to one side",
          "Hold for 15-30 seconds",
          "Repeat on other side",
        ],
      },
      {
        name: "Lower Back Relief",
        category: "Pain Relief",
        duration: "10-15 min",
        difficulty: "Beginner",
        targetArea: "Lower Back",
        description: "Therapeutic exercises to alleviate lower back pain",
        benefits: [
          "Reduces lower back pain",
          "Strengthens core muscles",
          "Improves spinal flexibility",
        ],
        instructions: [
          "Lie on your back with knees bent",
          "Gently pull one knee to chest",
          "Hold for 20 seconds",
          "Alternate legs",
        ],
      },
      {
        name: "Shoulder Mobility",
        category: "Mobility",
        duration: "8-12 min",
        difficulty: "Intermediate",
        targetArea: "Shoulders",
        description: "Improve shoulder range of motion and reduce stiffness",
        benefits: [
          "Increases shoulder flexibility",
          "Reduces shoulder pain",
          "Prevents frozen shoulder",
        ],
        instructions: [
          "Stand with arms at sides",
          "Slowly raise arms overhead",
          "Make circular motions",
          "Repeat 10 times each direction",
        ],
      },
      {
        name: "Hip Flexor Stretch",
        category: "Flexibility",
        duration: "10-15 min",
        difficulty: "Intermediate",
        targetArea: "Hips & Legs",
        description: "Release tight hip flexors from prolonged sitting",
        benefits: [
          "Improves hip mobility",
          "Reduces lower back strain",
          "Better posture",
        ],
        instructions: [
          "Kneel on one knee",
          "Push hips forward gently",
          "Hold for 30 seconds",
          "Switch sides",
        ],
      },
      {
        name: "Posture Correction",
        category: "Posture",
        duration: "15-20 min",
        difficulty: "Beginner",
        targetArea: "Full Body",
        description: "Exercises to improve overall posture and alignment",
        benefits: [
          "Corrects rounded shoulders",
          "Strengthens postural muscles",
          "Reduces back pain",
        ],
        instructions: [
          "Stand against a wall",
          "Align head, shoulders, and hips",
          "Hold for 30 seconds",
          "Repeat throughout day",
        ],
      },
      {
        name: "Wrist & Hand Therapy",
        category: "Pain Relief",
        duration: "5-8 min",
        difficulty: "Beginner",
        targetArea: "Wrists & Hands",
        description: "Relief for carpal tunnel and repetitive strain",
        benefits: [
          "Reduces wrist pain",
          "Improves grip strength",
          "Prevents carpal tunnel",
        ],
        instructions: [
          "Extend arm with palm up",
          "Gently pull fingers back",
          "Hold for 15 seconds",
          "Repeat 3 times each hand",
        ],
      },
    ],
  },
  ur: {
    title: "فزیو تھراپی مشقیں",
    subtitle: "درد سے راحت اور نقل و حرکت بہتر کرنے کے لیے علاجی مشقیں",
    selected: "✓ منتخب",
    viewDetails: "تفصیل دیکھیں",
    benefits: "فوائد",
    instructions: "ہدایات",
    tip: "💡 مشورہ:",
    tipText:
      "آہستہ شروع کریں اور اپنے جسم کی سنیں۔ اگر درد ہو تو رک جائیں اور صحت کے پیشہ ور سے مشورہ کریں۔",
    detailsLabel: (name: string) => `${name} - تفصیل`,
    footerSelected:
      "نئی مشقیں شروع کرنے سے پہلے ہمیشہ صحت کے پیشہ ور سے مشورہ کریں",
    footerDefault: "فزیو تھراپی مشقیں دیکھنے کے لیے افقی سکرول کریں",
    difficulty: {
      Beginner: "ابتدائی",
      Intermediate: "درمیانی",
      Advanced: "اعلیٰ",
    },
    categories: {
      Mobility: "نقل و حرکت",
      "Pain Relief": "درد سے راحت",
      Flexibility: "لچک",
      Posture: "کرنسی",
    },
    exercises: [
      {
        name: "گردن کی اسٹریچنگ",
        category: "Mobility",
        duration: "۵-۱۰ منٹ",
        difficulty: "Beginner",
        targetArea: "گردن اور اوپری کمر",
        description:
          "گردن کی تناؤ کو کم کرنے اور نقل و حرکت بہتر کرنے کے لیے نرم اسٹریچ",
        benefits: [
          "گردن کی سختی کم کرتا ہے",
          "حرکت کی حد بہتر کرتا ہے",
          "تناؤ کے سر درد سے راحت",
        ],
        instructions: [
          "اچھی کرنسی کے ساتھ بیٹھیں یا کھڑے ہوں",
          "آہستہ سر ایک طرف جھکائیں",
          "۱۵-۳۰ سیکنڈ رکیں",
          "دوسری طرف دہرائیں",
        ],
      },
      {
        name: "کمر کے نچلے حصے کی راحت",
        category: "Pain Relief",
        duration: "۱۰-۱۵ منٹ",
        difficulty: "Beginner",
        targetArea: "کمر کا نچلا حصہ",
        description: "کمر کے نچلے درد کو کم کرنے کے لیے علاجی مشقیں",
        benefits: [
          "کمر کا نچلا درد کم کرتا ہے",
          "بنیادی عضلات مضبوط کرتا ہے",
          "ریڑھ کی ہڈی کی لچک بہتر کرتا ہے",
        ],
        instructions: [
          "پیٹھ کے بل گھٹنے موڑ کر لیٹیں",
          "آہستہ ایک گھٹنا سینے کی طرف کھینچیں",
          "۲۰ سیکنڈ رکیں",
          "ٹانگیں بدلیں",
        ],
      },
      {
        name: "کندھے کی نقل و حرکت",
        category: "Mobility",
        duration: "۸-۱۲ منٹ",
        difficulty: "Intermediate",
        targetArea: "کندھے",
        description: "کندھے کی حرکت کی حد بڑھائیں اور سختی کم کریں",
        benefits: [
          "کندھے کی لچک بڑھاتا ہے",
          "کندھے کا درد کم کرتا ہے",
          "جمے ہوئے کندھے سے بچاتا ہے",
        ],
        instructions: [
          "بازو اطراف میں رکھ کر کھڑے ہوں",
          "آہستہ بازو سر کے اوپر اٹھائیں",
          "گول دائرے بنائیں",
          "ہر سمت ۱۰ بار دہرائیں",
        ],
      },
      {
        name: "کولہے کا اسٹریچ",
        category: "Flexibility",
        duration: "۱۰-۱۵ منٹ",
        difficulty: "Intermediate",
        targetArea: "کولہے اور ٹانگیں",
        description: "دیر تک بیٹھنے سے کولہے کے تنگ پٹھوں کو آزاد کریں",
        benefits: [
          "کولہے کی نقل و حرکت بہتر کرتا ہے",
          "کمر کے نچلے دباؤ کو کم کرتا ہے",
          "بہتر کرنسی",
        ],
        instructions: [
          "ایک گھٹنے پر جھکیں",
          "آہستہ کولہے آگے کی طرف دھکیلیں",
          "۳۰ سیکنڈ رکیں",
          "اطراف بدلیں",
        ],
      },
      {
        name: "کرنسی کی اصلاح",
        category: "Posture",
        duration: "۱۵-۲۰ منٹ",
        difficulty: "Beginner",
        targetArea: "پورا جسم",
        description: "مجموعی کرنسی اور توازن بہتر کرنے کے لیے مشقیں",
        benefits: [
          "گول کندھے درست کرتا ہے",
          "کرنسی کے عضلات مضبوط کرتا ہے",
          "کمر درد کم کرتا ہے",
        ],
        instructions: [
          "دیوار کے ساتھ کھڑے ہوں",
          "سر، کندھے اور کولہے سیدھ میں رکھیں",
          "۳۰ سیکنڈ رکیں",
          "دن بھر دہراتے رہیں",
        ],
      },
      {
        name: "کلائی اور ہاتھ کی تھراپی",
        category: "Pain Relief",
        duration: "۵-۸ منٹ",
        difficulty: "Beginner",
        targetArea: "کلائیاں اور ہاتھ",
        description: "کارپل ٹنل اور دہرائی جانے والی تناؤ سے راحت",
        benefits: [
          "کلائی کا درد کم کرتا ہے",
          "پکڑ کی طاقت بہتر کرتا ہے",
          "کارپل ٹنل سے بچاتا ہے",
        ],
        instructions: [
          "ہتھیلی اوپر کر کے بازو پھیلائیں",
          "آہستہ انگلیاں پیچھے کھینچیں",
          "۱۵ سیکنڈ رکیں",
          "ہر ہاتھ ۳ بار دہرائیں",
        ],
      },
    ],
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

const getDifficultyColor = (difficulty: string, isSelected: boolean) => {
  if (isSelected) return "bg-white bg-opacity-20 text-white";
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCategoryColor = (category: string, isSelected: boolean) => {
  if (isSelected) return "bg-white bg-opacity-20 text-white";
  switch (category) {
    case "Mobility":
      return "bg-blue-100 text-blue-800";
    case "Pain Relief":
      return "bg-purple-100 text-purple-800";
    case "Flexibility":
      return "bg-pink-100 text-pink-800";
    case "Posture":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const PhysiotherapyCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const handleExerciseSelect = (id: string) =>
    setSelectedExercise(selectedExercise === id ? null : id);

  const selectedExerciseData = selectedExercise
    ? tr.exercises[parseInt(selectedExercise) - 1]
    : null;

  return (
    <div
      className="w-full h-full bg-[#ebe7dd] rounded-4xl p-6 shadow-lg flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-black mb-2" style={uf}>
          {tr.title}
        </h2>
        <p className="text-sm text-gray-600" style={ufLine}>
          {tr.subtitle}
        </p>
      </div>

      {/* Exercise List */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {tr.exercises.map((exercise, index) => {
            const id = String(index + 1);
            const isSelected = selectedExercise === id;
            return (
              <div
                key={id}
                onClick={() => handleExerciseSelect(id)}
                className={`min-w-[280px] p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-[#AD85D1] text-white shadow-lg scale-[1.02]"
                    : "bg-white text-black hover:bg-gray-50 hover:shadow-md"
                }`}
              >
                {/* Thumbnail */}
                <div className="w-full h-32 rounded-xl overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center mb-3">
                  <div className="text-center px-4">
                    <div className="text-4xl mb-2">🧘</div>
                    <span className="text-white text-sm font-bold" style={uf}>
                      {exercise.name}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg truncate" style={uf}>
                    {exercise.name}
                  </h3>

                  <div className="flex flex-wrap gap-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(exercise.category, isSelected)}`}
                      style={uf}
                    >
                      {
                        tr.categories[
                          exercise.category as keyof typeof tr.categories
                        ]
                      }
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty, isSelected)}`}
                      style={uf}
                    >
                      {
                        tr.difficulty[
                          exercise.difficulty as keyof typeof tr.difficulty
                        ]
                      }
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <span
                      className={`text-xs ${isSelected ? "text-white opacity-80" : "text-gray-600"}`}
                      style={uf}
                    >
                      ⏱️ {exercise.duration}
                    </span>
                    <span
                      className={`text-xs ${isSelected ? "text-white opacity-80" : "text-gray-600"}`}
                      style={uf}
                    >
                      🎯 {exercise.targetArea}
                    </span>
                  </div>

                  <p
                    className={`text-sm line-clamp-2 ${isSelected ? "text-white opacity-90" : "text-gray-600"}`}
                    style={ufLine}
                  >
                    {exercise.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-white border-opacity-20">
                    <div
                      className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <span
                        className="text-sm font-medium text-white opacity-90"
                        style={uf}
                      >
                        {tr.selected}
                      </span>
                      <button
                        className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-30 transition-colors"
                        style={uf}
                      >
                        {tr.viewDetails}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Details Panel */}
        {selectedExerciseData && (
          <div className="bg-white rounded-2xl p-4 mt-4 max-h-64 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#AD85D1]" style={uf}>
                {tr.detailsLabel(selectedExerciseData.name)}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Benefits */}
                <div>
                  <h4
                    className="font-semibold text-sm text-gray-700 mb-2"
                    style={uf}
                  >
                    {tr.benefits}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedExerciseData.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <span className="text-[#AD85D1] shrink-0">✓</span>
                        <span style={ufLine}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h4
                    className="font-semibold text-sm text-gray-700 mb-2"
                    style={uf}
                  >
                    {tr.instructions}
                  </h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    {selectedExerciseData.instructions.map((inst, i) => (
                      <li
                        key={i}
                        className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <span className="text-[#AD85D1] font-semibold shrink-0">
                          {i + 1}.
                        </span>
                        <span style={ufLine}>{inst}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Tip */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800" style={ufLine}>
                  <span className="font-semibold">{tr.tip}</span> {tr.tipText}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-300">
        <p className="text-xs text-gray-600 text-center" style={uf}>
          {selectedExercise ? tr.footerSelected : tr.footerDefault}
        </p>
      </div>
    </div>
  );
};

export default PhysiotherapyCard;
