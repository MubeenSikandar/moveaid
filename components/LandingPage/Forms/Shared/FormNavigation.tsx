import React from "react";

interface FormNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep?: boolean;
  onFinish?: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  onPrevious,
  onNext,
  canGoNext,
  canGoPrevious,
  isLastStep = false,
  onFinish,
}) => {
  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          canGoPrevious
            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Previous
      </button>

      <div className="flex gap-3">
        {isLastStep ? (
          <button
            type="button"
            onClick={onFinish}
            disabled={!canGoNext}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              canGoNext
                ? "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Complete Assessment
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              canGoNext
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
