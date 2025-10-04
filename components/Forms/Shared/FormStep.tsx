import React from "react";

interface FormStepProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

const FormStep: React.FC<FormStepProps> = ({
  children,
  step,
  totalSteps,
  title,
  subtitle,
}) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">{children}</div>
      </div>
    </div>
  );
};

export default FormStep;
