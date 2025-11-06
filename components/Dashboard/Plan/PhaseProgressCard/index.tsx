import React, { useState } from "react";

const PhaseProgressCard = () => {
  const [selectedIntensity, setSelectedIntensity] = useState("Moderate");
  const [selectedSessionLength, setSelectedSessionLength] =
    useState("20-30min");
  const [selectedFocusArea, setSelectedFocusArea] = useState("Strength");

  // Phase progress data
  const currentWeek = 3;
  const totalWeeks = 4;
  const progressPercentage = (currentWeek / totalWeeks) * 100;

  const intensityOptions = ["Gentle", "Moderate", "Challenging"];
  const sessionLengthOptions = ["10-20min", "20-30min", "30+ min"];
  const focusAreaOptions = ["Strength", "Mobility", "Posture"];

  const getButtonStyle = (isSelected: boolean) => {
    return `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isSelected
        ? "bg-[#AD85D1] text-white"
        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
    }`;
  };

  return (
    <div className="w-full h-full bg-[#ebe7dd] rounded-4xl p-6 shadow-lg flex flex-col">
      {/* Phase Progress Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-black mb-4">
          Phase 1: Core Stability
        </h2>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-[#AD85D1]">
              Week {currentWeek} of {totalWeeks}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#AD85D1] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Adjust My Plan Section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black mb-4">
          Adjust My Plan
        </h3>

        <div className="space-y-6">
          {/* Intensity */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Intensity
            </h4>
            <div className="flex gap-2 flex-wrap">
              {intensityOptions.map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => setSelectedIntensity(intensity)}
                  className={getButtonStyle(selectedIntensity === intensity)}
                >
                  {intensity}
                </button>
              ))}
            </div>
          </div>

          {/* Session Length */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Session Length
            </h4>
            <div className="flex gap-2 flex-wrap">
              {sessionLengthOptions.map((length) => (
                <button
                  key={length}
                  onClick={() => setSelectedSessionLength(length)}
                  className={getButtonStyle(selectedSessionLength === length)}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Area */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Focus Area
            </h4>
            <div className="flex gap-2 flex-wrap">
              {focusAreaOptions.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedFocusArea(area)}
                  className={getButtonStyle(selectedFocusArea === area)}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Changes Button */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <button className="w-full bg-[#AD85D1] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#9B75C1] transition-colors duration-200">
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhaseProgressCard;
