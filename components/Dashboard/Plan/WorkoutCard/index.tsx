"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    title: "Exercise Library",
    loading: "Loading exercises...",
    apiError: "Failed to load exercises",
    subtitle: "Powered by ExerciseDB API - Select an exercise to view details",
    searchPlaceholder: "Search exercises...",
    selected: "✓ Selected",
    viewDetails: "View Details",
    targetMuscles: "Target Muscles",
    secondaryMuscles: "Secondary Muscles",
    instructions: "Instructions",
    variations: "Variations",
    keywords: "Keywords",
    detailsLabel: (name: string) => `${name} - Details`,
    footerSelected: "Exercise details loaded from ExerciseDB API",
    footerDefault: "Scroll horizontally to browse exercises",
  },
  ur: {
    title: "ورزش کی لائبریری",
    loading: "ورزشیں لوڈ ہو رہی ہیں...",
    apiError: "ورزشیں لوڈ کرنے میں ناکامی",
    subtitle:
      "ExerciseDB API سے چلنے والا — تفصیل دیکھنے کے لیے ورزش منتخب کریں",
    searchPlaceholder: "ورزشیں تلاش کریں...",
    selected: "✓ منتخب",
    viewDetails: "تفصیل دیکھیں",
    targetMuscles: "ہدف عضلات",
    secondaryMuscles: "ثانوی عضلات",
    instructions: "ہدایات",
    variations: "تغیرات",
    keywords: "کلیدی الفاظ",
    detailsLabel: (name: string) => `${name} - تفصیل`,
    footerSelected: "ورزش کی تفصیل ExerciseDB API سے لوڈ ہوئی",
    footerDefault: "ورزشیں دیکھنے کے لیے افقی سکرول کریں",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

interface Exercise {
  exerciseId: string;
  name: string;
  imageUrl?: string;
  equipments: string[];
  bodyParts: string[];
  exerciseType: string;
  targetMuscles: string[];
  secondaryMuscles: string[];
  videoUrl?: string;
  overview?: string;
  instructions?: string[];
  exerciseTips?: string[];
  variations?: string[];
  keywords?: string[];
}

interface ExerciseDBResponse {
  success: boolean;
  meta?: {
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextCursor?: string;
    previousCursor?: string;
  };
  data: Exercise[];
}

const sampleExercises: Exercise[] = [
  {
    exerciseId: "K6NnTv0",
    name: "Bench Press",
    equipments: ["Barbell"],
    bodyParts: ["Chest"],
    exerciseType: "weight_reps",
    targetMuscles: ["Pectoralis Major Clavicular Head"],
    secondaryMuscles: ["Deltoid Anterior", "Triceps Brachii"],
    overview:
      "Classic strength training exercise targeting chest, shoulders, and triceps.",
    instructions: [
      "Grip the barbell with hands slightly wider than shoulder-width apart",
      "Lower the barbell to your chest while keeping elbows at 90 degrees",
      "Push the barbell back up to starting position",
    ],
    exerciseTips: [
      "Avoid arching your back excessively",
      "Maintain controlled movement throughout",
      "Don't lift alone for safety",
    ],
    variations: [
      "Decline Bench Press",
      "Close-Grip Bench Press",
      "Dumbbell Bench Press",
    ],
  },
  {
    exerciseId: "A7B2C3D",
    name: "Squats",
    equipments: ["Bodyweight"],
    bodyParts: ["Legs", "Glutes"],
    exerciseType: "weight_reps",
    targetMuscles: ["Quadriceps", "Gluteus Maximus"],
    secondaryMuscles: ["Hamstrings", "Calves", "Core"],
    overview:
      "Fundamental lower body exercise for building leg and glute strength.",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower your body by bending knees and hips",
      "Return to standing position",
    ],
    variations: ["Jump Squats", "Goblet Squats", "Bulgarian Split Squats"],
  },
  {
    exerciseId: "E4F5G6H",
    name: "Pull-ups",
    equipments: ["Pull-up Bar"],
    bodyParts: ["Back", "Arms"],
    exerciseType: "weight_reps",
    targetMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Biceps", "Rhomboids", "Middle Trapezius"],
    overview: "Upper body pulling exercise that builds back and arm strength.",
    instructions: [
      "Hang from pull-up bar with palms facing away",
      "Pull your body up until chin clears the bar",
      "Lower yourself back to starting position",
    ],
    variations: ["Chin-ups", "Wide-Grip Pull-ups", "Assisted Pull-ups"],
  },
  {
    exerciseId: "I7J8K9L",
    name: "Deadlifts",
    equipments: ["Barbell"],
    bodyParts: ["Back", "Legs", "Glutes"],
    exerciseType: "weight_reps",
    targetMuscles: ["Erector Spinae", "Gluteus Maximus"],
    secondaryMuscles: ["Hamstrings", "Quadriceps", "Trapezius"],
    overview:
      "Compound exercise that works multiple muscle groups simultaneously.",
    instructions: [
      "Stand with feet hip-width apart, bar over mid-foot",
      "Bend at hips and knees to grip the bar",
      "Lift by extending hips and knees simultaneously",
    ],
    variations: [
      "Romanian Deadlifts",
      "Sumo Deadlifts",
      "Single-Leg Deadlifts",
    ],
  },
  {
    exerciseId: "M0N1O2P",
    name: "Push-ups",
    equipments: ["Bodyweight"],
    bodyParts: ["Chest", "Arms", "Core"],
    exerciseType: "weight_reps",
    targetMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Triceps", "Deltoids", "Core"],
    overview: "Classic bodyweight exercise for upper body and core strength.",
    instructions: [
      "Start in plank position with hands under shoulders",
      "Lower your body until chest nearly touches ground",
      "Push back up to starting position",
    ],
    variations: ["Diamond Push-ups", "Wide-Grip Push-ups", "Incline Push-ups"],
  },
  {
    exerciseId: "Q3R4S5T",
    name: "Plank",
    equipments: ["Bodyweight"],
    bodyParts: ["Core"],
    exerciseType: "time_based",
    targetMuscles: ["Rectus Abdominis", "Transverse Abdominis"],
    secondaryMuscles: ["Deltoids", "Glutes", "Quadriceps"],
    overview: "Isometric core exercise that builds stability and endurance.",
    instructions: [
      "Start in push-up position on forearms",
      "Keep body in straight line from head to heels",
      "Hold position for desired time",
    ],
    variations: ["Side Plank", "Plank Up-Downs", "Plank with Leg Lifts"],
  },
];

const getEquipmentColor = (equipment: string, isSelected: boolean) => {
  if (isSelected) return "bg-white bg-opacity-20 text-white";
  switch (equipment.toLowerCase()) {
    case "barbell":
      return "bg-blue-100 text-blue-800";
    case "bodyweight":
      return "bg-green-100 text-green-800";
    case "pull-up bar":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const WorkoutCard = () => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};
  const ufLine = isRTL ? { ...urduFont, lineHeight: "2" } : {};

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://v2.exercisedb.dev/api/v1/exercises?limit=10",
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: ExerciseDBResponse = await response.json();
        if (data.success && data.data) {
          setExercises(data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError(tr.apiError);
        setExercises(sampleExercises);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExerciseSelect = (id: string) =>
    setSelectedExercise(selectedExercise === id ? null : id);

  const selectedExerciseData = exercises.find(
    (e) => e.exerciseId === selectedExercise,
  );

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
        <p className="text-sm text-gray-600 mb-3" style={ufLine}>
          {loading ? tr.loading : error ? error : tr.subtitle}
        </p>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder={tr.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir={isRTL ? "rtl" : "ltr"}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AD85D1] focus:border-transparent"
            style={{
              paddingRight: isRTL ? "1rem" : "2.5rem",
              paddingLeft: isRTL ? "2.5rem" : "1rem",
              ...uf,
            }}
          />
          <div
            className={`absolute inset-y-0 ${isRTL ? "left-0 pl-3" : "right-0 pr-3"} flex items-center`}
          >
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 flex flex-col gap-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AD85D1]" />
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredExercises.map((exercise) => {
              const isSelected = selectedExercise === exercise.exerciseId;
              return (
                <div
                  key={exercise.exerciseId}
                  onClick={() => handleExerciseSelect(exercise.exerciseId)}
                  className={`min-w-[280px] p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-[#AD85D1] text-white shadow-lg scale-[1.02]"
                      : "bg-white text-black hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-3">
                    <span className="text-white text-sm font-bold text-center px-2">
                      {exercise.name}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg truncate">
                      {exercise.name}
                    </h3>

                    <div className="flex flex-wrap gap-1">
                      {exercise.equipments.map((eq, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getEquipmentColor(eq, isSelected)}`}
                        >
                          {eq}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {exercise.bodyParts.slice(0, 2).map((bp, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded ${isSelected ? "text-white opacity-80" : "text-gray-600"}`}
                        >
                          🎯 {bp}
                        </span>
                      ))}
                    </div>

                    <p
                      className={`text-sm line-clamp-2 ${isSelected ? "text-white opacity-90" : "text-gray-600"}`}
                    >
                      {exercise.overview ??
                        `${exercise.exerciseType} exercise targeting ${exercise.bodyParts.join(", ")}`}
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
        )}

        {/* Selected Exercise Details Panel */}
        {selectedExerciseData && (
          <div className="bg-white rounded-2xl p-4 mt-4 max-h-64 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#AD85D1]" style={uf}>
                {tr.detailsLabel(selectedExerciseData.name)}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4
                    className="font-semibold text-sm text-gray-700 mb-2"
                    style={uf}
                  >
                    {tr.targetMuscles}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedExerciseData.targetMuscles.map((m, i) => (
                      <span
                        key={i}
                        className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm text-gray-700 mb-2"
                    style={uf}
                  >
                    {tr.secondaryMuscles}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedExerciseData.secondaryMuscles
                      .slice(0, 3)
                      .map((m, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {m}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {selectedExerciseData.instructions &&
                selectedExerciseData.instructions.length > 0 && (
                  <div>
                    <h4
                      className="font-semibold text-sm text-gray-700 mb-2"
                      style={uf}
                    >
                      {tr.instructions}
                    </h4>
                    <ol className="text-sm text-gray-600 space-y-1">
                      {selectedExerciseData.instructions
                        .slice(0, 3)
                        .map((inst, i) => (
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
                )}

              {selectedExerciseData.variations &&
                selectedExerciseData.variations.length > 0 && (
                  <div>
                    <h4
                      className="font-semibold text-sm text-gray-700 mb-2"
                      style={uf}
                    >
                      {tr.variations}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExerciseData.variations
                        .slice(0, 3)
                        .map((v, i) => (
                          <span
                            key={i}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {v}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

              {selectedExerciseData.keywords &&
                selectedExerciseData.keywords.length > 0 && (
                  <div>
                    <h4
                      className="font-semibold text-sm text-gray-700 mb-2"
                      style={uf}
                    >
                      {tr.keywords}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedExerciseData.keywords
                        .slice(0, 5)
                        .map((kw, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {kw}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
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

export default WorkoutCard;
