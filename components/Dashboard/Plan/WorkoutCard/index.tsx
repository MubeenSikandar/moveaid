import React, { useState, useEffect } from "react";

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

const WorkoutCard = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch exercises from ExerciseDB API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://v2.exercisedb.dev/api/v1/exercises?limit=10"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ExerciseDBResponse = await response.json();

        if (data.success && data.data) {
          setExercises(data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Failed to load exercises");
        // Fallback to sample data
        setExercises(sampleExercises);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Sample exercise data as fallback
  const sampleExercises: Exercise[] = [
    {
      exerciseId: "K6NnTv0",
      name: "Bench Press",
      imageUrl:
        "https://via.placeholder.com/300x200/AD85D1/FFFFFF?text=Bench+Press",
      equipments: ["Barbell"],
      bodyParts: ["Chest"],
      exerciseType: "weight_reps",
      targetMuscles: ["Pectoralis Major Clavicular Head"],
      secondaryMuscles: ["Deltoid Anterior", "Triceps Brachii"],
      videoUrl: "bench-press-video.mp4",
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
      imageUrl: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Squats",
      equipments: ["Bodyweight"],
      bodyParts: ["Legs", "Glutes"],
      exerciseType: "weight_reps",
      targetMuscles: ["Quadriceps", "Gluteus Maximus"],
      secondaryMuscles: ["Hamstrings", "Calves", "Core"],
      videoUrl: "squats-video.mp4",
      overview:
        "Fundamental lower body exercise for building leg and glute strength.",
      instructions: [
        "Stand with feet shoulder-width apart",
        "Lower your body by bending knees and hips",
        "Return to standing position",
      ],
      exerciseTips: [
        "Keep your chest up and core engaged",
        "Don't let knees cave inward",
        "Go as low as your mobility allows",
      ],
      variations: ["Jump Squats", "Goblet Squats", "Bulgarian Split Squats"],
    },
    {
      exerciseId: "E4F5G6H",
      name: "Pull-ups",
      imageUrl:
        "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Pull-ups",
      equipments: ["Pull-up Bar"],
      bodyParts: ["Back", "Arms"],
      exerciseType: "weight_reps",
      targetMuscles: ["Latissimus Dorsi"],
      secondaryMuscles: ["Biceps", "Rhomboids", "Middle Trapezius"],
      videoUrl: "pullups-video.mp4",
      overview:
        "Upper body pulling exercise that builds back and arm strength.",
      instructions: [
        "Hang from pull-up bar with palms facing away",
        "Pull your body up until chin clears the bar",
        "Lower yourself back to starting position",
      ],
      exerciseTips: [
        "Engage your core throughout the movement",
        "Avoid swinging or using momentum",
        "Focus on controlled movement",
      ],
      variations: ["Chin-ups", "Wide-Grip Pull-ups", "Assisted Pull-ups"],
    },
    {
      exerciseId: "I7J8K9L",
      name: "Deadlifts",
      imageUrl:
        "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Deadlifts",
      equipments: ["Barbell"],
      bodyParts: ["Back", "Legs", "Glutes"],
      exerciseType: "weight_reps",
      targetMuscles: ["Erector Spinae", "Gluteus Maximus"],
      secondaryMuscles: ["Hamstrings", "Quadriceps", "Trapezius"],
      videoUrl: "deadlifts-video.mp4",
      overview:
        "Compound exercise that works multiple muscle groups simultaneously.",
      instructions: [
        "Stand with feet hip-width apart, bar over mid-foot",
        "Bend at hips and knees to grip the bar",
        "Lift by extending hips and knees simultaneously",
      ],
      exerciseTips: [
        "Keep the bar close to your body",
        "Maintain neutral spine throughout",
        "Drive through your heels",
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
      imageUrl:
        "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Push-ups",
      equipments: ["Bodyweight"],
      bodyParts: ["Chest", "Arms", "Core"],
      exerciseType: "weight_reps",
      targetMuscles: ["Pectoralis Major"],
      secondaryMuscles: ["Triceps", "Deltoids", "Core"],
      videoUrl: "pushups-video.mp4",
      overview: "Classic bodyweight exercise for upper body and core strength.",
      instructions: [
        "Start in plank position with hands under shoulders",
        "Lower your body until chest nearly touches ground",
        "Push back up to starting position",
      ],
      exerciseTips: [
        "Keep your body in straight line",
        "Don't let hips sag or pike up",
        "Control the descent",
      ],
      variations: [
        "Diamond Push-ups",
        "Wide-Grip Push-ups",
        "Incline Push-ups",
      ],
    },
    {
      exerciseId: "Q3R4S5T",
      name: "Plank",
      imageUrl: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Plank",
      equipments: ["Bodyweight"],
      bodyParts: ["Core"],
      exerciseType: "time_based",
      targetMuscles: ["Rectus Abdominis", "Transverse Abdominis"],
      secondaryMuscles: ["Deltoids", "Glutes", "Quadriceps"],
      videoUrl: "plank-video.mp4",
      overview: "Isometric core exercise that builds stability and endurance.",
      instructions: [
        "Start in push-up position on forearms",
        "Keep body in straight line from head to heels",
        "Hold position for desired time",
      ],
      exerciseTips: [
        "Don't let hips sag or rise",
        "Breathe normally throughout hold",
        "Engage your core muscles",
      ],
      variations: ["Side Plank", "Plank Up-Downs", "Plank with Leg Lifts"],
    },
  ];

  const getEquipmentColor = (equipment: string) => {
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

  const handleExerciseSelect = (exerciseId: string) => {
    setSelectedExercise(selectedExercise === exerciseId ? null : exerciseId);
  };

  return (
    <div className="w-full h-full bg-[#ebe7dd] rounded-4xl p-6 shadow-lg flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-black mb-2">Exercise Library</h2>
        <p className="text-sm text-gray-600 mb-3">
          {loading
            ? "Loading exercises..."
            : error
            ? error
            : "Powered by ExerciseDB API - Select an exercise to view details"}
        </p>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AD85D1] focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
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

      {/* Horizontal Scrollable Exercise List */}
      <div className="flex-1 flex flex-col gap-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AD85D1]"></div>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {exercises.map((exercise) => (
              <div
                key={exercise.exerciseId}
                className={`min-w-[280px] p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                  selectedExercise === exercise.exerciseId
                    ? "bg-[#AD85D1] text-white shadow-lg transform scale-[1.02]"
                    : "bg-white text-black hover:bg-gray-50 hover:shadow-md"
                }`}
                onClick={() => handleExerciseSelect(exercise.exerciseId)}
              >
                {/* Exercise Image */}
                <div className="w-full h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-3">
                  <span className="text-white text-sm font-bold text-center px-2">
                    {exercise.name}
                  </span>
                </div>

                {/* Exercise Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg truncate">
                    {exercise.name}
                  </h3>

                  <div className="flex flex-wrap gap-1">
                    {exercise.equipments.map((equipment, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedExercise === exercise.exerciseId
                            ? "bg-white bg-opacity-20 text-white"
                            : getEquipmentColor(equipment)
                        }`}
                      >
                        {equipment}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {exercise.bodyParts.slice(0, 2).map((bodyPart, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          selectedExercise === exercise.exerciseId
                            ? "text-white text-opacity-80"
                            : "text-gray-600"
                        }`}
                      >
                        🎯 {bodyPart}
                      </span>
                    ))}
                  </div>

                  <p
                    className={`text-sm line-clamp-2 ${
                      selectedExercise === exercise.exerciseId
                        ? "text-white text-opacity-90"
                        : "text-gray-600"
                    }`}
                  >
                    {exercise.overview ||
                      `${
                        exercise.exerciseType
                      } exercise targeting ${exercise.bodyParts.join(", ")}`}
                  </p>
                </div>

                {/* Selection Indicator */}
                {selectedExercise === exercise.exerciseId && (
                  <div className="mt-3 pt-3 border-t border-white border-opacity-20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white text-opacity-90">
                        ✓ Selected
                      </span>
                      <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-30 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Selected Exercise Details */}
        {selectedExercise && (
          <div className="bg-white rounded-2xl p-4 mt-4 max-h-64 overflow-y-auto">
            {(() => {
              const exercise = exercises.find(
                (e) => e.exerciseId === selectedExercise
              );
              if (!exercise) return null;

              return (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#AD85D1]">
                    {exercise.name} - Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Target Muscles
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {exercise.targetMuscles.map((muscle, index) => (
                          <span
                            key={index}
                            className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Secondary Muscles
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {exercise.secondaryMuscles
                          .slice(0, 3)
                          .map((muscle, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {muscle}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {exercise.instructions &&
                    exercise.instructions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">
                          Instructions
                        </h4>
                        <ol className="text-sm text-gray-600 space-y-1">
                          {exercise.instructions
                            .slice(0, 3)
                            .map((instruction, index) => (
                              <li key={index} className="flex">
                                <span className="mr-2 text-[#AD85D1] font-semibold">
                                  {index + 1}.
                                </span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                        </ol>
                      </div>
                    )}

                  {exercise.variations && exercise.variations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Variations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exercise.variations
                          .slice(0, 3)
                          .map((variation, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            >
                              {variation}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {exercise.keywords && exercise.keywords.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Keywords
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {exercise.keywords.slice(0, 5).map((keyword, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-300">
        <p className="text-xs text-gray-600 text-center">
          {selectedExercise
            ? "Exercise details loaded from ExerciseDB API"
            : "Scroll horizontally to browse exercises"}
        </p>
      </div>
    </div>
  );
};

export default WorkoutCard;
