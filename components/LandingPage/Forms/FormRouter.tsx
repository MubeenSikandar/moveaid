"use client";

import React from "react";
import RecoverFromInjuryForm from "./RecoverFromInjuryForm";
import FixPostureForm from "./FixPostureForm";
import BuildMovementHabitForm from "./BuildMovementHabitForm";
import ImproveWorkoutFormForm from "./ImproveWorkoutFormForm";
import StayActiveAtDeskForm from "./StayActiveAtDeskForm";
import LessStiffMoreMobileForm from "./LessStiffMoreMobileForm";

interface FormRouterProps {
  formType: string;
  onBack: () => void;
  onComplete: () => void;
}

const FormRouter: React.FC<FormRouterProps> = ({
  formType,
  onBack,
  onComplete,
}) => {
  const renderForm = () => {
    switch (formType) {
      case "recover-from-injury":
        return <RecoverFromInjuryForm onComplete={onComplete} />;
      case "fix-posture":
        return <FixPostureForm onComplete={onComplete} />;
      case "build-movement-habit":
        return <BuildMovementHabitForm onComplete={onComplete} />;
      case "improve-workout-form":
        return <ImproveWorkoutFormForm onComplete={onComplete} />;
      case "stay-active-at-desk":
        return <StayActiveAtDeskForm onComplete={onComplete} />;
      case "less-stiff-more-mobile":
        return <LessStiffMoreMobileForm onComplete={onComplete} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Form Not Found
              </h1>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-gray-700 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
      {renderForm()}
    </div>
  );
};

export default FormRouter;
