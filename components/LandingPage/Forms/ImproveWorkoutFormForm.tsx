"use client";

import React, { useState } from "react";
import FormStep from "./Shared/FormStep";
import QuestionCard from "./Shared/QuestionCard";
import MultiSelect from "./Shared/MultiSelect";
import FormNavigation from "./Shared/FormNavigation";

interface FormData {
  experienceLevel: string;
  workoutTypes: string[];
  workoutLocation: string;
  equipment: string[];
  concerningExercises: {
    lowerBody: string[];
    upperBody: string[];
    core: string[];
  };
  painExperience: string;
  learningMethod: string;
  aiFormCorrection: string;
  cameraAnalysis: string;
}

interface ImproveWorkoutFormFormProps {
  onComplete: () => void;
}

const ImproveWorkoutFormForm: React.FC<ImproveWorkoutFormFormProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    experienceLevel: "",
    workoutTypes: [],
    workoutLocation: "",
    equipment: [],
    concerningExercises: {
      lowerBody: [],
      upperBody: [],
      core: [],
    },
    painExperience: "",
    learningMethod: "",
    aiFormCorrection: "",
    cameraAnalysis: "",
  });

  const totalSteps = 9;

  const experienceLevels = [
    "Complete beginner (never worked out)",
    "Beginner (less than 6 months)",
    "Intermediate (6 months - 2 years)",
    "Advanced (2-5 years)",
    "Expert (5+ years)",
  ];

  const workoutTypes = [
    "Bodyweight exercises",
    "Free weights (dumbbells/barbells)",
    "Resistance bands",
    "Machines",
    "Cardio equipment",
    "HIIT/Circuit training",
    "Yoga/Pilates",
    "Calisthenics",
    "Olympic lifting",
    "Powerlifting",
  ];

  const workoutLocations = [
    "Home (limited space)",
    "Home (dedicated space)",
    "Gym",
    "Outdoor",
    "Mixed locations",
  ];

  const equipmentOptions = [
    "Dumbbells (specify weight range)",
    "Barbell and plates",
    "Resistance bands",
    "Pull-up bar",
    "Yoga mat",
    "Stability ball",
    "Foam roller",
    "Kettlebells",
    "TRX/Suspension trainer",
    "No equipment",
  ];

  const lowerBodyExercises = [
    "Squats",
    "Lunges",
    "Deadlifts",
    "Hip thrusts",
    "Leg press",
    "Calf raises",
  ];

  const upperBodyExercises = [
    "Push-ups",
    "Pull-ups",
    "Bench press",
    "Rows",
    "Shoulder press",
    "Bicep curls",
  ];

  const coreExercises = ["Planks", "Crunches", "Russian twists", "Leg raises"];

  const painExperiences = [
    "Yes, currently dealing with it",
    "Yes, in the past",
    "Minor discomfort sometimes",
    "No, but worried about it",
    "No issues",
  ];

  const learningMethods = [
    "YouTube videos",
    "Personal trainer",
    "Gym buddies",
    "Apps",
    "Trial and error",
    "Books/articles",
    "Never learned properly",
  ];

  const aiFormCorrectionOptions = [
    "Yes, for every workout",
    "Yes, for new exercises only",
    "Yes, periodically for check-ins",
    "Maybe later",
    "No, just want video guides",
  ];

  const cameraAnalysisOptions = [
    "Yes, save videos for progress",
    "Yes, but don't save videos",
    "Only for specific exercises",
    "No, prefer manual feedback",
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
      "Assessment completed! Your personalized workout form improvement plan will be ready soon."
    );
    onComplete();
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return formData.experienceLevel !== "";
      case 2:
        return formData.workoutTypes.length > 0;
      case 3:
        return formData.workoutLocation !== "";
      case 4:
        return formData.equipment.length > 0;
      case 5:
        return Object.values(formData.concerningExercises).some(
          (arr) => arr.length > 0
        );
      case 6:
        return formData.painExperience !== "";
      case 7:
        return formData.learningMethod !== "";
      case 8:
        return formData.aiFormCorrection !== "";
      case 9:
        return formData.cameraAnalysis !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            question="What's your fitness experience level?"
            required
          >
            <div className="space-y-3">
              {experienceLevels.map((level) => (
                <label
                  key={level}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.experienceLevel === level
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={level}
                    checked={formData.experienceLevel === level}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceLevel: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.experienceLevel === level
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.experienceLevel === level && (
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
            question="What type of workouts do you do?"
            description="Select all that apply"
          >
            <MultiSelect
              options={workoutTypes}
              selected={formData.workoutTypes}
              onChange={(selected) =>
                setFormData({ ...formData, workoutTypes: selected })
              }
            />
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard question="Where do you usually work out?" required>
            <div className="space-y-3">
              {workoutLocations.map((location) => (
                <label
                  key={location}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.workoutLocation === location
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="workoutLocation"
                    value={location}
                    checked={formData.workoutLocation === location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workoutLocation: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.workoutLocation === location
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.workoutLocation === location && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{location}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard
            question="What equipment do you have access to?"
            description="Select all that apply"
          >
            <MultiSelect
              options={equipmentOptions}
              selected={formData.equipment}
              onChange={(selected) =>
                setFormData({ ...formData, equipment: selected })
              }
              allowCustom
              customPlaceholder="Add custom equipment"
            />
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard
            question="Which exercises concern you most about form?"
            description="Select exercises you'd like help with"
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Lower Body
                </h4>
                <MultiSelect
                  options={lowerBodyExercises}
                  selected={formData.concerningExercises.lowerBody}
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      concerningExercises: {
                        ...formData.concerningExercises,
                        lowerBody: selected,
                      },
                    })
                  }
                />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Upper Body
                </h4>
                <MultiSelect
                  options={upperBodyExercises}
                  selected={formData.concerningExercises.upperBody}
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      concerningExercises: {
                        ...formData.concerningExercises,
                        upperBody: selected,
                      },
                    })
                  }
                />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Core</h4>
                <MultiSelect
                  options={coreExercises}
                  selected={formData.concerningExercises.core}
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      concerningExercises: {
                        ...formData.concerningExercises,
                        core: selected,
                      },
                    })
                  }
                />
              </div>
            </div>
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard
            question="Have you experienced pain/injury from poor form before?"
            required
          >
            <div className="space-y-3">
              {painExperiences.map((experience) => (
                <label
                  key={experience}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.painExperience === experience
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="painExperience"
                    value={experience}
                    checked={formData.painExperience === experience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        painExperience: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.painExperience === experience
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.painExperience === experience && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{experience}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard
            question="How do you currently learn exercise form?"
            required
          >
            <div className="space-y-3">
              {learningMethods.map((method) => (
                <label
                  key={method}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.learningMethod === method
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="learningMethod"
                    value={method}
                    checked={formData.learningMethod === method}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        learningMethod: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.learningMethod === method
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.learningMethod === method && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{method}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 8:
        return (
          <QuestionCard
            question="Would you like real-time AI form correction?"
            required
          >
            <div className="space-y-3">
              {aiFormCorrectionOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.aiFormCorrection === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="aiFormCorrection"
                    value={option}
                    checked={formData.aiFormCorrection === option}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aiFormCorrection: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.aiFormCorrection === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.aiFormCorrection === option && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 9:
        return (
          <QuestionCard
            question="Are you comfortable with camera-based form analysis?"
            required
            description="This helps us provide more accurate form feedback"
          >
            <div className="space-y-3">
              {cameraAnalysisOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.cameraAnalysis === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="cameraAnalysis"
                    value={option}
                    checked={formData.cameraAnalysis === option}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cameraAnalysis: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.cameraAnalysis === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.cameraAnalysis === option && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Privacy Note:</strong> All video analysis is processed
                locally on your device. We only analyze movement patterns and
                provide form feedback - no personal data is stored or
                transmitted.
              </p>
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
      title="Improve Your Workout Form Assessment"
      subtitle="Let's help you perfect your exercise technique and prevent injuries"
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

export default ImproveWorkoutFormForm;
