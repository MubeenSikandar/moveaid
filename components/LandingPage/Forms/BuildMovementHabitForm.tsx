"use client";

import React, { useState } from "react";
import FormStep from "./Shared/FormStep";
import QuestionCard from "./Shared/QuestionCard";
import MultiSelect from "./Shared/MultiSelect";
import FormNavigation from "./Shared/FormNavigation";

interface FormData {
  activityLevel: string;
  barriers: string[];
  movementTypes: string[];
  energyTime: string;
  sessionTime: string;
  daysPerWeek: string;
  motivators: string[];
  primaryGoal: string;
}

interface BuildMovementHabitFormProps {
  onComplete: () => void;
}

const BuildMovementHabitForm: React.FC<BuildMovementHabitFormProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    activityLevel: "",
    barriers: [],
    movementTypes: [],
    energyTime: "",
    sessionTime: "",
    daysPerWeek: "",
    motivators: [],
    primaryGoal: "",
  });

  const totalSteps = 8;

  const activityLevels = [
    "Sedentary (less than 2,000 steps/day)",
    "Lightly active (2,000-5,000 steps/day)",
    "Moderately active (5,000-10,000 steps/day)",
    "Active (10,000+ steps/day)",
    "Very active (athlete/manual labor)",
  ];

  const barriers = [
    "Lack of time",
    "Low energy/motivation",
    "Don't know where to start",
    "Physical limitations/pain",
    "No equipment/gym access",
    "Weather/environment",
    "Work/family obligations",
    "Lack of accountability",
  ];

  const movementTypes = [
    "Walking/Hiking",
    "Running/Jogging",
    "Strength training",
    "Yoga/Stretching",
    "Dancing",
    "Swimming",
    "Cycling",
    "Sports",
    "Home workouts",
    "Gym workouts",
  ];

  const energyTimes = [
    "Early morning (5-7 AM)",
    "Morning (7-10 AM)",
    "Midday (10 AM-2 PM)",
    "Afternoon (2-5 PM)",
    "Evening (5-8 PM)",
    "Night (8 PM+)",
    "Varies daily",
  ];

  const sessionTimes = [
    "5-10 minutes",
    "10-20 minutes",
    "20-30 minutes",
    "30-45 minutes",
    "45-60 minutes",
    "More than 1 hour",
  ];

  const daysPerWeek = ["1-2 days", "3-4 days", "5-6 days", "Every day"];

  const motivators = [
    "Seeing progress/results",
    "Streak tracking",
    "Rewards/badges",
    "Community/accountability",
    "Health improvements",
    "Stress relief",
    "Looking better",
    "Feeling stronger",
  ];

  const primaryGoals = [
    "Weight loss",
    "Muscle gain",
    "Better health",
    "More energy",
    "Stress management",
    "Athletic performance",
    "Longevity",
    "Just move more",
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    console.log("Form completed:", formData);
    alert(
      "Assessment completed! Your personalized movement habit plan will be ready soon."
    );
    onComplete();
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return formData.activityLevel !== "";
      case 2:
        return formData.barriers.length > 0;
      case 3:
        return formData.movementTypes.length > 0;
      case 4:
        return formData.energyTime !== "";
      case 5:
        return formData.sessionTime !== "";
      case 6:
        return formData.daysPerWeek !== "";
      case 7:
        return formData.motivators.length > 0;
      case 8:
        return formData.primaryGoal !== "";
      default:
        return false;
    }
  };

  const handleMotivatorRank = (motivator: string, direction: "up" | "down") => {
    const currentIndex = formData.motivators.indexOf(motivator);
    if (currentIndex === -1) return;

    const newMotivators = [...formData.motivators];
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < newMotivators.length) {
      [newMotivators[currentIndex], newMotivators[newIndex]] = [
        newMotivators[newIndex],
        newMotivators[currentIndex],
      ];
      setFormData({ ...formData, motivators: newMotivators });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            question="How would you describe your current activity level?"
            required
          >
            <div className="space-y-3">
              {activityLevels.map((level) => (
                <label
                  key={level}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.activityLevel === level
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="activityLevel"
                    value={level}
                    checked={formData.activityLevel === level}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        activityLevel: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.activityLevel === level
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.activityLevel === level && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{level}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            question="What's prevented you from being more active?"
            description="Select all that apply - we'll help you overcome these barriers"
          >
            <MultiSelect
              options={barriers}
              selected={formData.barriers}
              onChange={(selected) =>
                setFormData({ ...formData, barriers: selected })
              }
              allowCustom
              customPlaceholder="Other barrier"
            />
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard
            question="What type of movement do you enjoy or want to try?"
            description="Select all that interest you"
          >
            <MultiSelect
              options={movementTypes}
              selected={formData.movementTypes}
              onChange={(selected) =>
                setFormData({ ...formData, movementTypes: selected })
              }
            />
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard question="When do you have the most energy?" required>
            <div className="space-y-3">
              {energyTimes.map((time) => (
                <label
                  key={time}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.energyTime === time
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="energyTime"
                    value={time}
                    checked={formData.energyTime === time}
                    onChange={(e) =>
                      setFormData({ ...formData, energyTime: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.energyTime === time
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.energyTime === time && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{time}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard
            question="How much time can you realistically commit per session?"
            required
          >
            <div className="space-y-3">
              {sessionTimes.map((time) => (
                <label
                  key={time}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.sessionTime === time
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="sessionTime"
                    value={time}
                    checked={formData.sessionTime === time}
                    onChange={(e) =>
                      setFormData({ ...formData, sessionTime: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.sessionTime === time
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.sessionTime === time && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{time}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard
            question="How many days per week can you commit?"
            required
          >
            <div className="space-y-3">
              {daysPerWeek.map((days) => (
                <label
                  key={days}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.daysPerWeek === days
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="daysPerWeek"
                    value={days}
                    checked={formData.daysPerWeek === days}
                    onChange={(e) =>
                      setFormData({ ...formData, daysPerWeek: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.daysPerWeek === days
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.daysPerWeek === days && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{days}</span>
                  </div>
                </label>
              ))}
              <label className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300">
                <input
                  type="radio"
                  name="daysPerWeek"
                  value="not-sure"
                  checked={formData.daysPerWeek === "not-sure"}
                  onChange={(e) =>
                    setFormData({ ...formData, daysPerWeek: e.target.value })
                  }
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.daysPerWeek === "not-sure"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.daysPerWeek === "not-sure" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700">Not sure yet</span>
                </div>
              </label>
            </div>
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard
            question="What motivates you most?"
            description="Rank these in order of importance (drag to reorder)"
          >
            <div className="space-y-3">
              {motivators.map((motivator, index) => (
                <div
                  key={motivator}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.motivators.includes(motivator)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.motivators.includes(motivator)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          motivators: [...formData.motivators, motivator],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          motivators: formData.motivators.filter(
                            (m) => m !== motivator
                          ),
                        });
                      }
                    }}
                    className="sr-only"
                  />
                  <div className="flex items-center w-full">
                    <div
                      className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        formData.motivators.includes(motivator)
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.motivators.includes(motivator) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700 flex-1">{motivator}</span>
                    {formData.motivators.includes(motivator) && (
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => handleMotivatorRank(motivator, "up")}
                          className="text-gray-400 hover:text-gray-600"
                          disabled={
                            formData.motivators.indexOf(motivator) === 0
                          }
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMotivatorRank(motivator, "down")}
                          className="text-gray-400 hover:text-gray-600"
                          disabled={
                            formData.motivators.indexOf(motivator) ===
                            formData.motivators.length - 1
                          }
                        >
                          ↓
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {formData.motivators.length > 0 && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  Your Priority Order:
                </h4>
                <ol className="list-decimal list-inside space-y-1">
                  {formData.motivators.map((motivator, index) => (
                    <li key={motivator} className="text-green-700">
                      {motivator}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </QuestionCard>
        );

      case 8:
        return (
          <QuestionCard question="What's your primary goal?" required>
            <div className="space-y-3">
              {primaryGoals.map((goal) => (
                <label
                  key={goal}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.primaryGoal === goal
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="primaryGoal"
                    value={goal}
                    checked={formData.primaryGoal === goal}
                    onChange={(e) =>
                      setFormData({ ...formData, primaryGoal: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.primaryGoal === goal
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.primaryGoal === goal && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{goal}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      default:
        return null;
    }
  };

  return (
    <FormStep
      step={currentStep}
      totalSteps={totalSteps}
      title="Build A Movement Habit Assessment"
      subtitle="Let's create a sustainable movement routine that fits your lifestyle and goals"
    >
      {renderStep()}
      <FormNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoNext={canGoNext()}
        canGoPrevious={currentStep > 1}
        isLastStep={currentStep === totalSteps}
        onFinish={handleFinish}
      />
    </FormStep>
  );
};

export default BuildMovementHabitForm;
