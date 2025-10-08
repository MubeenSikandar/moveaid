import React, { useState } from "react";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
  allowCustom?: boolean;
  customPlaceholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  maxSelections,
  allowCustom = false,
  customPlaceholder = "Other (specify)",
}) => {
  const [customValue, setCustomValue] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleOptionToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else if (!maxSelections || selected.length < maxSelections) {
      onChange([...selected, option]);
    }
  };

  const handleCustomSubmit = () => {
    if (customValue.trim() && !selected.includes(customValue.trim())) {
      onChange([...selected, customValue.trim()]);
      setCustomValue("");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selected.includes(option)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleOptionToggle(option)}
              className="sr-only"
            />
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                  selected.includes(option)
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selected.includes(option) && (
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
              <span className="text-gray-700">{option}</span>
            </div>
          </label>
        ))}
      </div>

      {allowCustom && (
        <div className="mt-4">
          {!showCustomInput ? (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + {customPlaceholder}
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder={customPlaceholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleCustomSubmit()}
              />
              <button
                type="button"
                onClick={handleCustomSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomValue("");
                }}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {maxSelections && (
        <p className="text-sm text-gray-500 mt-2">
          {selected.length}/{maxSelections} selected
        </p>
      )}
    </div>
  );
};

export default MultiSelect;
