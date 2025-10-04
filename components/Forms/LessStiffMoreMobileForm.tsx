"use client";

import React, { useState } from "react";
import FormStep from "./Shared/FormStep";
import QuestionCard from "./Shared/QuestionCard";
import MultiSelect from "./Shared/MultiSelect";
import SliderInput from "./Shared/SliderInput";
import FormNavigation from "./Shared/FormNavigation";

interface FormData {
  stiffnessLevels: {
    neck: number;
    shoulders: number;
    upperBack: number;
    lowerBack: number;
    hips: number;
    knees: number;
    ankles: number;
    wrists: number;
  };
  worstStiffnessTimes: string[];
  affectedActivities: string[];
  flexibilityTests: {
    touchToes: string;
    lookOverShoulder: string;
    squatFully: string;
    claspHandsBehind: string;
    sitCrossLegged: string;
  };
  currentMobilityFrequency: string;
  mobilityTypes: string[];
  timeCommitment: string;
  primaryGoal: string;
  previousExperience: string[];
}

interface LessStiffMoreMobileFormProps {
  onComplete: () => void;
}

const LessStiffMoreMobileForm: React.FC<LessStiffMoreMobileFormProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stiffnessLevels: {
      neck: 1,
      shoulders: 1,
      upperBack: 1,
      lowerBack: 1,
      hips: 1,
      knees: 1,
      ankles: 1,
      wrists: 1,
    },
    worstStiffnessTimes: [],
    affectedActivities: [],
    flexibilityTests: {
      touchToes: "",
      lookOverShoulder: "",
      squatFully: "",
      claspHandsBehind: "",
      sitCrossLegged: "",
    },
    currentMobilityFrequency: "",
    mobilityTypes: [],
    timeCommitment: "",
    primaryGoal: "",
    previousExperience: [],
  });

  const totalSteps = 9;

  const worstStiffnessTimes = [
    "First thing in morning",
    "After sitting for long periods",
    "After exercise",
    "In cold weather",
    "When stressed",
    "End of workday",
    "Before bed",
    "Constantly throughout day",
  ];

  const affectedActivities = [
    "Getting out of bed",
    "Bending to pick things up",
    "Reaching overhead",
    "Turning head while driving",
    "Walking up stairs",
    "Playing sports",
    "Playing with kids/pets",
    "Exercise performance",
    "Sleep quality",
  ];

  const flexibilityTestOptions = ["Yes", "Almost", "No"];

  const mobilityFrequencies = [
    "Daily",
    "4-6 times per week",
    "2-3 times per week",
    "Once a week",
    "Occasionally",
    "Never",
  ];

  const mobilityTypes = [
    "Static stretching",
    "Dynamic stretching",
    "Yoga flows",
    "Foam rolling",
    "Joint mobility drills",
    "Tai Chi movements",
    "Animal movements",
    "Sports-specific mobility",
  ];

  const timeCommitments = [
    "5 minutes daily",
    "10-15 minutes daily",
    "20-30 minutes daily",
    "Longer sessions few times/week",
    "Varies by day",
  ];

  const primaryGoals = [
    "Reduce daily pain/discomfort",
    "Improve athletic performance",
    "Prevent injuries",
    "Better posture",
    "Stress relief/relaxation",
    "Maintain independence as I age",
    "Specific skill (splits, backbend, etc.)",
    "General wellness",
  ];

  const previousExperiences = [
    "Yoga experience",
    "Martial arts",
    "Dance",
    "Gymnastics",
    "Physical therapy",
    "None",
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
      "Assessment completed! Your personalized mobility improvement plan will be ready soon."
    );
    onComplete();
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return true; // Stiffness levels always have default values
      case 2:
        return formData.worstStiffnessTimes.length > 0;
      case 3:
        return formData.affectedActivities.length > 0;
      case 4:
        return Object.values(formData.flexibilityTests).every(
          (test) => test !== ""
        );
      case 5:
        return formData.currentMobilityFrequency !== "";
      case 6:
        return formData.mobilityTypes.length > 0;
      case 7:
        return formData.timeCommitment !== "";
      case 8:
        return formData.primaryGoal !== "";
      case 9:
        return formData.previousExperience.length > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            question="Which areas feel the stiffest?"
            description="Rate each area from 1 (not stiff) to 5 (very stiff)"
          >
            <div className="space-y-6">
              {Object.entries(formData.stiffnessLevels).map(([area, level]) => (
                <div key={area}>
                  <h4 className="text-lg font-medium text-gray-900 mb-4 capitalize">
                    {area.replace(/([A-Z])/g, " $1").trim()}: {level}
                  </h4>
                  <SliderInput
                    value={level}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        stiffnessLevels: {
                          ...formData.stiffnessLevels,
                          [area]: value,
                        },
                      })
                    }
                    min={1}
                    max={5}
                    labels={[
                      "Not stiff",
                      "Slightly stiff",
                      "Moderately stiff",
                      "Very stiff",
                      "Extremely stiff",
                    ]}
                    color="blue"
                  />
                </div>
              ))}
            </div>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            question="When do you feel most stiff?"
            description="Select all that apply"
          >
            <MultiSelect
              options={worstStiffnessTimes}
              selected={formData.worstStiffnessTimes}
              onChange={(selected) =>
                setFormData({ ...formData, worstStiffnessTimes: selected })
              }
            />
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard
            question="What activities does stiffness affect?"
            description="Select all that apply"
          >
            <MultiSelect
              options={affectedActivities}
              selected={formData.affectedActivities}
              onChange={(selected) =>
                setFormData({ ...formData, affectedActivities: selected })
              }
            />
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard
            question="Current flexibility level - Can you:"
            required
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Touch your toes?
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {flexibilityTestOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.flexibilityTests.touchToes === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="touchToes"
                        value={option}
                        checked={formData.flexibilityTests.touchToes === option}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            flexibilityTests: {
                              ...formData.flexibilityTests,
                              touchToes: e.target.value,
                            },
                          })
                        }
                        className="sr-only"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Look over shoulder without turning body?
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {flexibilityTestOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.flexibilityTests.lookOverShoulder === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="lookOverShoulder"
                        value={option}
                        checked={
                          formData.flexibilityTests.lookOverShoulder === option
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            flexibilityTests: {
                              ...formData.flexibilityTests,
                              lookOverShoulder: e.target.value,
                            },
                          })
                        }
                        className="sr-only"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Squat down fully?
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {flexibilityTestOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.flexibilityTests.squatFully === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="squatFully"
                        value={option}
                        checked={
                          formData.flexibilityTests.squatFully === option
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            flexibilityTests: {
                              ...formData.flexibilityTests,
                              squatFully: e.target.value,
                            },
                          })
                        }
                        className="sr-only"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Clasp hands behind back?
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {flexibilityTestOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.flexibilityTests.claspHandsBehind === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="claspHandsBehind"
                        value={option}
                        checked={
                          formData.flexibilityTests.claspHandsBehind === option
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            flexibilityTests: {
                              ...formData.flexibilityTests,
                              claspHandsBehind: e.target.value,
                            },
                          })
                        }
                        className="sr-only"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Sit cross-legged comfortably?
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {flexibilityTestOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.flexibilityTests.sitCrossLegged === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="sitCrossLegged"
                        value={option}
                        checked={
                          formData.flexibilityTests.sitCrossLegged === option
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            flexibilityTests: {
                              ...formData.flexibilityTests,
                              sitCrossLegged: e.target.value,
                            },
                          })
                        }
                        className="sr-only"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard
            question="How often do you currently stretch or do mobility work?"
            required
          >
            <div className="space-y-3">
              {mobilityFrequencies.map((frequency) => (
                <label
                  key={frequency}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.currentMobilityFrequency === frequency
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="currentMobilityFrequency"
                    value={frequency}
                    checked={formData.currentMobilityFrequency === frequency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentMobilityFrequency: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.currentMobilityFrequency === frequency
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.currentMobilityFrequency === frequency && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{frequency}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard
            question="What type of mobility work interests you?"
            description="Select all that interest you"
          >
            <MultiSelect
              options={mobilityTypes}
              selected={formData.mobilityTypes}
              onChange={(selected) =>
                setFormData({ ...formData, mobilityTypes: selected })
              }
            />
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard
            question="How much time can you dedicate to mobility work?"
            required
          >
            <div className="space-y-3">
              {timeCommitments.map((commitment) => (
                <label
                  key={commitment}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.timeCommitment === commitment
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="timeCommitment"
                    value={commitment}
                    checked={formData.timeCommitment === commitment}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        timeCommitment: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.timeCommitment === commitment
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.timeCommitment === commitment && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{commitment}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 8:
        return (
          <QuestionCard question="What's your primary mobility goal?" required>
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

      case 9:
        return (
          <QuestionCard
            question="Any previous flexibility training?"
            description="Select all that apply"
          >
            <MultiSelect
              options={previousExperiences}
              selected={formData.previousExperience}
              onChange={(selected) =>
                setFormData({ ...formData, previousExperience: selected })
              }
              allowCustom
              customPlaceholder="Other experience"
            />
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
      title="Less Stiff, More Mobile Assessment"
      subtitle="Let's create a personalized mobility plan to help you move with greater ease and freedom"
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

export default LessStiffMoreMobileForm;
