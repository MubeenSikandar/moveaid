"use client";

import React, { useState } from "react";
import FormStep from "./Shared/FormStep";
import QuestionCard from "./Shared/QuestionCard";
import MultiSelect from "./Shared/MultiSelect";
import FormNavigation from "./Shared/FormNavigation";

interface FormData {
  workType: string;
  workHours: string;
  breakFrequency: string;
  workspaceType: string;
  discomfortAreas: string[];
  symptoms: string[];
  preferredExercises: string[];
  reminderType: string;
  breakDuration: string;
  trackSittingTime: string;
}

interface StayActiveAtDeskFormProps {
  onComplete: () => void;
}

const StayActiveAtDeskForm: React.FC<StayActiveAtDeskFormProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    workType: "",
    workHours: "",
    breakFrequency: "",
    workspaceType: "",
    discomfortAreas: [],
    symptoms: [],
    preferredExercises: [],
    reminderType: "",
    breakDuration: "",
    trackSittingTime: "",
  });

  const totalSteps = 10;

  const workTypes = [
    "Computer/Office work",
    "Student",
    "Creative work (design/writing)",
    "Call center/Customer service",
    "Data entry",
    "Programming/Development",
    "Administrative",
    "Mixed/Varies",
  ];

  const workHours = [
    "Less than 4 hours",
    "4-6 hours",
    "6-8 hours",
    "8-10 hours",
    "More than 10 hours",
  ];

  const breakFrequencies = [
    "Every 30 minutes",
    "Every hour",
    "Every 2-3 hours",
    "Only for lunch",
    "Rarely/Never",
  ];

  const workspaceTypes = [
    "Ergonomic setup (proper chair/desk)",
    "Standard office setup",
    "Laptop on regular table",
    "Standing desk available",
    "Adjustable/sit-stand desk",
    "Couch/bed working",
    "Various locations",
  ];

  const discomfortAreas = [
    "Neck",
    "Shoulders",
    "Upper back",
    "Lower back",
    "Wrists/Forearms",
    "Eyes",
    "Hips",
    "Legs",
  ];

  const symptoms = [
    "Stiffness",
    "Muscle tension",
    "Numbness/Tingling",
    "Headaches",
    "Eye strain",
    "Fatigue",
    "Poor circulation",
    "Restlessness",
  ];

  const preferredExercises = [
    "Seated stretches (discrete)",
    "Standing stretches",
    "Walking breaks",
    "Desk yoga",
    "Strength exercises",
    "Breathing exercises",
    "Eye exercises",
    "Mix of everything",
  ];

  const reminderTypes = [
    "Phone notifications",
    "Computer pop-ups",
    "Smartwatch taps",
    "Calendar integration",
    "Email reminders",
    "No reminders needed",
  ];

  const breakDurations = [
    "30 seconds - 1 minute",
    "2-3 minutes",
    "5 minutes",
    "10 minutes",
    "Varies by day",
  ];

  const trackSittingTimeOptions = [
    "Yes, with detailed analytics",
    "Yes, basic tracking",
    "No, just remind me to move",
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
      "Assessment completed! Your personalized desk wellness plan will be ready soon."
    );
    onComplete();
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return formData.workType !== "";
      case 2:
        return formData.workHours !== "";
      case 3:
        return formData.breakFrequency !== "";
      case 4:
        return formData.workspaceType !== "";
      case 5:
        return (
          formData.discomfortAreas.length > 0 ||
          formData.discomfortAreas.includes("No specific discomfort")
        );
      case 6:
        return formData.symptoms.length > 0;
      case 7:
        return formData.preferredExercises.length > 0;
      case 8:
        return formData.reminderType !== "";
      case 9:
        return formData.breakDuration !== "";
      case 10:
        return formData.trackSittingTime !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard question="What type of work/study do you do?" required>
            <div className="space-y-3">
              {workTypes.map((type) => (
                <label
                  key={type}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.workType === type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="workType"
                    value={type}
                    checked={formData.workType === type}
                    onChange={(e) =>
                      setFormData({ ...formData, workType: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.workType === type
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.workType === type && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{type}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            question="How many hours do you work/study per day?"
            required
          >
            <div className="space-y-3">
              {workHours.map((hours) => (
                <label
                  key={hours}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.workHours === hours
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="workHours"
                    value={hours}
                    checked={formData.workHours === hours}
                    onChange={(e) =>
                      setFormData({ ...formData, workHours: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.workHours === hours
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.workHours === hours && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{hours}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard
            question="How often do you take breaks currently?"
            required
          >
            <div className="space-y-3">
              {breakFrequencies.map((frequency) => (
                <label
                  key={frequency}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.breakFrequency === frequency
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="breakFrequency"
                    value={frequency}
                    checked={formData.breakFrequency === frequency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        breakFrequency: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.breakFrequency === frequency
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.breakFrequency === frequency && (
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

      case 4:
        return (
          <QuestionCard question="What's your workspace like?" required>
            <div className="space-y-3">
              {workspaceTypes.map((type) => (
                <label
                  key={type}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.workspaceType === type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="workspaceType"
                    value={type}
                    checked={formData.workspaceType === type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workspaceType: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.workspaceType === type
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.workspaceType === type && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{type}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard
            question="Where do you feel discomfort?"
            description="Select all that apply"
          >
            <MultiSelect
              options={[...discomfortAreas, "No specific discomfort"]}
              selected={formData.discomfortAreas}
              onChange={(selected) =>
                setFormData({ ...formData, discomfortAreas: selected })
              }
            />
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard
            question="What symptoms do you experience?"
            description="Select all that apply"
          >
            <MultiSelect
              options={symptoms}
              selected={formData.symptoms}
              onChange={(selected) =>
                setFormData({ ...formData, symptoms: selected })
              }
            />
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard
            question="What type of desk exercises would you prefer?"
            description="Select all that interest you"
          >
            <MultiSelect
              options={preferredExercises}
              selected={formData.preferredExercises}
              onChange={(selected) =>
                setFormData({ ...formData, preferredExercises: selected })
              }
            />
          </QuestionCard>
        );

      case 8:
        return (
          <QuestionCard question="How would you like to be reminded?" required>
            <div className="space-y-3">
              {reminderTypes.map((type) => (
                <label
                  key={type}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.reminderType === type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="reminderType"
                    value={type}
                    checked={formData.reminderType === type}
                    onChange={(e) =>
                      setFormData({ ...formData, reminderType: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.reminderType === type
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.reminderType === type && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{type}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 9:
        return (
          <QuestionCard
            question="How long can you spare for movement breaks?"
            required
          >
            <div className="space-y-3">
              {breakDurations.map((duration) => (
                <label
                  key={duration}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.breakDuration === duration
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="breakDuration"
                    value={duration}
                    checked={formData.breakDuration === duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        breakDuration: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.breakDuration === duration
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.breakDuration === duration && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{duration}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 10:
        return (
          <QuestionCard
            question="Would you like to track your sitting vs. standing time?"
            required
          >
            <div className="space-y-3">
              {trackSittingTimeOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.trackSittingTime === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="trackSittingTime"
                    value={option}
                    checked={formData.trackSittingTime === option}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        trackSittingTime: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.trackSittingTime === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.trackSittingTime === option && (
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

      default:
        return null;
    }
  };

  return (
    <FormStep
      step={currentStep}
      totalSteps={totalSteps}
      title="Stay Active At Your Desk Assessment"
      subtitle="Let's create a personalized workplace wellness plan that fits your schedule"
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

export default StayActiveAtDeskForm;
