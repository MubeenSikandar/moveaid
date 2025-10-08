import Image from "next/image";
import React from "react";
import ArrowRight from "@/assets/Arrow.svg";

const PostureAccuracyCard = () => {
  const weeklyData = [
    { day: "Mon", progress: 85, completed: true },
    { day: "Tue", progress: 100, completed: true },
    { day: "Wed", progress: 60, completed: false },
    { day: "Thu", progress: 0, completed: false },
    { day: "Fri", progress: 0, completed: false },
    { day: "Sat", progress: 0, completed: false },
    { day: "Sun", progress: 0, completed: false },
  ];

  const getProgressColor = (progress: number, completed: boolean) => {
    if (progress > 0) return "bg-[#AD85D1]";
    return "bg-gray-200";
  };

  const getProgressText = (progress: number, completed: boolean) => {
    if (completed) return "✓";
    if (progress >= 80) return "Great!";
    if (progress >= 50) return "Good";
    if (progress > 0) return "Started";
    return "Not started";
  };

  return (
    <div className="w-full h-full flex bg-[#ebe7dd] rounded-4xl p-10">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl font-bold">Posture Accuracy</p>
          <Image src={ArrowRight} alt="arrow right" width={36} height={36} />
        </div>
        <div className="flex items-center gap-4 w-full">
          <p className="text-4xl font-bold">82%</p>
          <div className="w-full flex flex-col">
            <p className="text-md font-light">Average Score This Week</p>
            <p className="text-md font-light">This Week</p>
          </div>
        </div>

        {/* Weekly Progress Section */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Weekly Progress
            </h4>
            <div className="text-sm text-gray-500">
              {weeklyData.filter((day) => day.completed).length} of{" "}
              {weeklyData.length} days completed
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Day Label */}
                <div className="text-xs font-medium text-gray-600">
                  {day.day}
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-20 bg-gray-200 rounded-lg relative overflow-hidden">
                  {/* Progress Fill */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out ${getProgressColor(
                      day.progress,
                      day.completed
                    )}`}
                    style={{ height: `${day.progress}%` }}
                  />

                  {/* Progress Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      {day.progress}%
                    </span>
                  </div>
                </div>

                {/* Status Text */}
                <div className="text-xs text-center">
                  <span
                    className={`font-medium ${
                      day.completed
                        ? "text-green-600"
                        : day.progress > 0
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    {getProgressText(day.progress, day.completed)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostureAccuracyCard;
