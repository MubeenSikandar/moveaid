"use client";

import React, { useState } from "react";
import FormStep from "./Shared/FormStep";
import QuestionCard from "./Shared/QuestionCard";
import MultiSelect from "./Shared/MultiSelect";
import SliderInput from "./Shared/SliderInput";
import FormNavigation from "./Shared/FormNavigation";
import SuccessMessage from "../SuccessMessage";

interface FormData {
  discomfortAreas: string[];
  workSetup: string;
  sittingHours: string;
  postureIssues: string[];
  worstPostureTime: string;
  previousAttempts: string;
  reminderFrequency: string;
  photoAnalysis: string;
}

interface FixPostureFormProps {
  onComplete: () => void;
}

const FixPostureForm: React.FC<FixPostureFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    discomfortAreas: [],
    workSetup: "",
    sittingHours: "",
    postureIssues: [],
    worstPostureTime: "",
    previousAttempts: "",
    reminderFrequency: "",
    photoAnalysis: "",
  });

  const totalSteps = 8;

  const discomfortAreas = [
    "Neck",
    "Upper back/Shoulders",
    "Mid-back",
    "Lower back",
    "Hips",
    "Headaches",
    "Jaw/TMJ",
  ];

  const workSetups = [
    "Desktop computer",
    "Laptop on desk",
    "Laptop on lap/couch",
    "Standing desk",
    "Mobile phone primarily",
    "Mixed/Varies daily",
    "Physical/Manual work",
  ];

  const sittingHours = [
    "Less than 3 hours",
    "3-6 hours",
    "6-9 hours",
    "9-12 hours",
    "More than 12 hours",
  ];

  const postureIssues = [
    "Slouching/Rounded shoulders",
    "Forward head posture",
    "Text neck",
    "Uneven shoulders/hips",
    "Excessive lower back arch",
    "Flat back",
    "Sway back",
    "One shoulder higher",
  ];

  const worstPostureTimes = [
    "During work/study",
    "While using phone",
    "When tired",
    "While driving",
    "All the time",
  ];

  const previousAttempts = [
    "Yes, exercises/stretches",
    "Yes, ergonomic equipment",
    "Yes, posture corrector device",
    "Yes, but didn't stick with it",
    "No, this is my first attempt",
  ];

  const reminderFrequencies = [
    "Every 30 minutes",
    "Every hour",
    "Every 2 hours",
    "Custom schedule",
    "Smart reminders (based on activity)",
    "No reminders",
  ];

  const photoAnalysisOptions = [
    "Yes, regularly for progress tracking",
    "Yes, initially only",
    "Maybe later",
    "No, prefer not to",
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
    setShowSuccess(true);
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.discomfortAreas.length > 0 ||
          formData.discomfortAreas.includes("No pain, just want better posture")
        );
      case 2:
        return formData.workSetup !== "";
      case 3:
        return formData.sittingHours !== "";
      case 4:
        return (
          formData.postureIssues.length > 0 ||
          formData.postureIssues.includes("Not sure - need assessment")
        );
      case 5:
        return formData.worstPostureTime !== "";
      case 6:
        return formData.previousAttempts !== "";
      case 7:
        return formData.reminderFrequency !== "";
      case 8:
        return formData.photoAnalysis !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            question="Where do you feel posture-related discomfort?"
            description="Select all that apply"
          >
            <MultiSelect
              options={[
                ...discomfortAreas,
                "No pain, just want better posture",
              ]}
              selected={formData.discomfortAreas}
              onChange={(selected) =>
                setFormData({ ...formData, discomfortAreas: selected })
              }
            />
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            question="What's your primary work/study setup?"
            required
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {workSetups.map((setup) => (
                <label
                  key={setup}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.workSetup === setup
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="workSetup"
                    value={setup}
                    checked={formData.workSetup === setup}
                    onChange={(e) =>
                      setFormData({ ...formData, workSetup: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.workSetup === setup
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.workSetup === setup && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{setup}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard question="How many hours a day do you sit?" required>
            <div className="space-y-3">
              {sittingHours.map((hours) => (
                <label
                  key={hours}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.sittingHours === hours
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="sittingHours"
                    value={hours}
                    checked={formData.sittingHours === hours}
                    onChange={(e) =>
                      setFormData({ ...formData, sittingHours: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.sittingHours === hours
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.sittingHours === hours && (
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

      case 4:
        return (
          <QuestionCard
            question="What posture issues have you noticed?"
            description="Select all that apply"
          >
            <MultiSelect
              options={[...postureIssues, "Not sure - need assessment"]}
              selected={formData.postureIssues}
              onChange={(selected) =>
                setFormData({ ...formData, postureIssues: selected })
              }
            />
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard question="When is your posture worst?" required>
            <div className="space-y-3">
              {worstPostureTimes.map((time) => (
                <label
                  key={time}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.worstPostureTime === time
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="worstPostureTime"
                    value={time}
                    checked={formData.worstPostureTime === time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        worstPostureTime: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.worstPostureTime === time
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.worstPostureTime === time && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{time}</span>
                  </div>
                </label>
              ))}
              <label className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300">
                <input
                  type="radio"
                  name="worstPostureTime"
                  value="not-sure"
                  checked={formData.worstPostureTime === "not-sure"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      worstPostureTime: e.target.value,
                    })
                  }
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.worstPostureTime === "not-sure"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.worstPostureTime === "not-sure" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700">Not sure</span>
                </div>
              </label>
            </div>
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard
            question="Have you tried posture correction before?"
            required
          >
            <div className="space-y-3">
              {previousAttempts.map((attempt) => (
                <label
                  key={attempt}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.previousAttempts === attempt
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="previousAttempts"
                    value={attempt}
                    checked={formData.previousAttempts === attempt}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        previousAttempts: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.previousAttempts === attempt
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.previousAttempts === attempt && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{attempt}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard
            question="Would you like posture check reminders?"
            required
          >
            <div className="space-y-3">
              {reminderFrequencies.map((frequency) => (
                <label
                  key={frequency}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.reminderFrequency === frequency
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="reminderFrequency"
                    value={frequency}
                    checked={formData.reminderFrequency === frequency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reminderFrequency: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.reminderFrequency === frequency
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.reminderFrequency === frequency && (
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

      case 8:
        return (
          <QuestionCard
            question="Are you willing to take posture photos for AI analysis?"
            required
            description="This helps us provide more accurate posture feedback and track your progress over time"
          >
            <div className="space-y-3">
              {photoAnalysisOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.photoAnalysis === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="photoAnalysis"
                    value={option}
                    checked={formData.photoAnalysis === option}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        photoAnalysis: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.photoAnalysis === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.photoAnalysis === option && (
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
                <strong>Privacy Note:</strong> All photos are processed locally
                on your device and are not stored on our servers. We only
                analyze posture alignment and provide feedback.
              </p>
            </div>
          </QuestionCard>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <FormStep
        step={currentStep}
        totalSteps={totalSteps}
        title="Fix Posture Assessment"
        subtitle="Let's identify your posture challenges and create a personalized improvement plan"
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
      {showSuccess && (
        <SuccessMessage
          onClose={() => {
            setShowSuccess(false);
            onComplete();
          }}
          assessmentType="fix-posture"
        />
      )}
    </>
  );
};

export default FixPostureForm;
