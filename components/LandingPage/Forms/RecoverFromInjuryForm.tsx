"use client";

import React, { useState } from "react";
import FormStep from "./Shared/FormStep";
import QuestionCard from "./Shared/QuestionCard";
import MultiSelect from "./Shared/MultiSelect";
import SliderInput from "./Shared/SliderInput";
import FormNavigation from "./Shared/FormNavigation";
import SuccessMessage from "../SuccessMessage";

interface FormData {
  injuryType: string;
  injuryDate: string;
  injuryCause: string;
  medicalSupervision: string;
  exercisesGiven: string;
  difficultMovements: string[];
  painLevels: {
    atRest: number;
    duringMovement: number;
    atWorst: number;
  };
  recoveryGoals: string[];
}

interface RecoverFromInjuryFormProps {
  onComplete: () => void;
}

const RecoverFromInjuryForm: React.FC<RecoverFromInjuryFormProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    injuryType: "",
    injuryDate: "",
    injuryCause: "",
    medicalSupervision: "",
    exercisesGiven: "",
    difficultMovements: [],
    painLevels: {
      atRest: 1,
      duringMovement: 1,
      atWorst: 1,
    },
    recoveryGoals: [],
  });

  const totalSteps = 8;

  const injuryTypes = [
    "Ankle/Foot",
    "Knee",
    "Hip",
    "Back/Spine",
    "Shoulder",
    "Neck",
    "Elbow",
    "Arm/Wrist",
    "Multiple areas",
  ];

  const injuryDates = [
    "Less than 1 week ago",
    "1-4 weeks ago",
    "1-2 months ago",
    "3-6 months ago",
    "6-12 months ago",
    "More than 1 year ago",
    "Chronic/Recurring injury",
  ];

  const injuryCauses = [
    "Sports/Exercise",
    "Work-related",
    "Accident/Fall",
    "Gradual onset (overuse)",
    "Post-surgery",
    "Unknown",
  ];

  const medicalSupervisionOptions = [
    "Yes, seeing a physiotherapist regularly",
    "Yes, seeing a doctor",
    "Yes, both doctor and physiotherapist",
    "Previously, but not anymore",
    "No, self-managing",
    "Planning to see someone soon",
  ];

  const exercisesGivenOptions = [
    "Yes, I have a full program",
    "Yes, but need more exercises",
    "Yes, but finding them difficult",
    "No exercises given",
    "Not applicable",
  ];

  const difficultMovements = [
    "Walking/Running",
    "Sitting/Standing",
    "Bending/Twisting",
    "Lifting/Carrying",
    "Reaching Overhead",
    "Gripping/Holding",
    "Climbing stairs",
    "Getting up from bed",
    "Driving",
  ];

  const recoveryGoals = [
    "Return to sports/exercise",
    "Pain-free daily activities",
    "Regain full range of motion",
    "Build strength in affected area",
    "Prevent re-injury",
    "Return to work",
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
    // Here you would typically save the data and redirect
    setShowSuccess(true);
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return formData.injuryType !== "";
      case 2:
        return formData.injuryDate !== "";
      case 3:
        return formData.injuryCause !== "";
      case 4:
        return formData.medicalSupervision !== "";
      case 5:
        return formData.exercisesGiven !== "";
      case 6:
        return formData.difficultMovements.length > 0;
      case 7:
        return true; // Pain levels always have default values
      case 8:
        return formData.recoveryGoals.length > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            question="What type of injury are you recovering from?"
            required
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {injuryTypes.map((type) => (
                <label
                  key={type}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.injuryType === type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="injuryType"
                    value={type}
                    checked={formData.injuryType === type}
                    onChange={(e) =>
                      setFormData({ ...formData, injuryType: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.injuryType === type
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.injuryType === type && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{type}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300">
                <input
                  type="radio"
                  name="injuryType"
                  value="other"
                  checked={formData.injuryType === "other"}
                  onChange={(e) =>
                    setFormData({ ...formData, injuryType: e.target.value })
                  }
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.injuryType === "other"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.injuryType === "other" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700">Other (specify)</span>
                </div>
              </label>
              {formData.injuryType === "other" && (
                <input
                  type="text"
                  placeholder="Please specify your injury type"
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard question="When did the injury occur?" required>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {injuryDates.map((date) => (
                <label
                  key={date}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.injuryDate === date
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="injuryDate"
                    value={date}
                    checked={formData.injuryDate === date}
                    onChange={(e) =>
                      setFormData({ ...formData, injuryDate: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.injuryDate === date
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.injuryDate === date && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{date}</span>
                  </div>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard question="How did the injury happen?" required>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {injuryCauses.map((cause) => (
                <label
                  key={cause}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.injuryCause === cause
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="injuryCause"
                    value={cause}
                    checked={formData.injuryCause === cause}
                    onChange={(e) =>
                      setFormData({ ...formData, injuryCause: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.injuryCause === cause
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.injuryCause === cause && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700">{cause}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300">
                <input
                  type="radio"
                  name="injuryCause"
                  value="other"
                  checked={formData.injuryCause === "other"}
                  onChange={(e) =>
                    setFormData({ ...formData, injuryCause: e.target.value })
                  }
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.injuryCause === "other"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.injuryCause === "other" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700">Other</span>
                </div>
              </label>
              {formData.injuryCause === "other" && (
                <input
                  type="text"
                  placeholder="Please specify how the injury happened"
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard
            question="Are you currently under medical supervision?"
            required
          >
            <div className="space-y-3">
              {medicalSupervisionOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.medicalSupervision === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="medicalSupervision"
                    value={option}
                    checked={formData.medicalSupervision === option}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalSupervision: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.medicalSupervision === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.medicalSupervision === option && (
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

      case 5:
        return (
          <QuestionCard
            question="Have you been given specific exercises by a healthcare provider?"
            required
          >
            <div className="space-y-3">
              {exercisesGivenOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.exercisesGiven === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="exercisesGiven"
                    value={option}
                    checked={formData.exercisesGiven === option}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        exercisesGiven: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.exercisesGiven === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.exercisesGiven === option && (
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

      case 6:
        return (
          <QuestionCard
            question="Which movements are difficult or painful right now?"
            required
            description="Select all that apply"
          >
            <MultiSelect
              options={difficultMovements}
              selected={formData.difficultMovements}
              onChange={(selected) =>
                setFormData({ ...formData, difficultMovements: selected })
              }
              allowCustom
              customPlaceholder="Other"
            />
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard
            question="On a scale of 1-10, rate your current pain level:"
            required
          >
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  At rest: {formData.painLevels.atRest}
                </h4>
                <SliderInput
                  value={formData.painLevels.atRest}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      painLevels: { ...formData.painLevels, atRest: value },
                    })
                  }
                  min={1}
                  max={10}
                  labels={[
                    "No pain",
                    "Mild",
                    "Moderate",
                    "Severe",
                    "Unbearable",
                  ]}
                  color="green"
                />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  During movement: {formData.painLevels.duringMovement}
                </h4>
                <SliderInput
                  value={formData.painLevels.duringMovement}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      painLevels: {
                        ...formData.painLevels,
                        duringMovement: value,
                      },
                    })
                  }
                  min={1}
                  max={10}
                  labels={[
                    "No pain",
                    "Mild",
                    "Moderate",
                    "Severe",
                    "Unbearable",
                  ]}
                  color="yellow"
                />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  At worst: {formData.painLevels.atWorst}
                </h4>
                <SliderInput
                  value={formData.painLevels.atWorst}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      painLevels: { ...formData.painLevels, atWorst: value },
                    })
                  }
                  min={1}
                  max={10}
                  labels={[
                    "No pain",
                    "Mild",
                    "Moderate",
                    "Severe",
                    "Unbearable",
                  ]}
                  color="red"
                />
              </div>
            </div>
          </QuestionCard>
        );

      case 8:
        return (
          <QuestionCard
            question="What are your recovery goals?"
            required
            description="Select all that apply"
          >
            <MultiSelect
              options={recoveryGoals}
              selected={formData.recoveryGoals}
              onChange={(selected) =>
                setFormData({ ...formData, recoveryGoals: selected })
              }
              allowCustom
              customPlaceholder="Other"
            />
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
        title="Recover From Injury Assessment"
        subtitle="Help us understand your injury and create a personalized recovery plan"
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
          assessmentType="recover-from-injury"
        />
      )}
    </>
  );
};

export default RecoverFromInjuryForm;
