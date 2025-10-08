import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/Arrow.svg";

const WeeklyStreakCard = () => {
  const streakData = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: false },
    { day: "Thu", completed: false },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  const currentStreak = 2; // days
  const longestStreak = 5; // days
  const averageSessionTime = "12 min"; // average session time

  return (
    <div className="w-full h-full flex bg-[#ebe7dd] rounded-4xl p-10">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl font-bold">Weekly Streak</p>
          <Image src={ArrowRight} alt="arrow right" width={36} height={36} />
        </div>
        <div className="flex items-center gap-4 w-full">
          <p className="text-4xl font-bold">2 Days</p>
          <div className="w-full flex flex-col">
            <p className="text-md font-light">Current Streak</p>
            <p className="text-md font-light">Keep it up!</p>
          </div>
        </div>

        {/* Streak Tracking Section */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div className="flex flex-col gap-6">
            {/* Days of the Week */}
            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-semibold text-gray-800">
                This Week&apos;s Progress
              </h4>
              <div className="grid grid-cols-7 gap-2">
                {streakData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="text-xs font-medium text-gray-600">
                      {day.day}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        day.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {day.completed ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Statistics */}
            <div className="flex flex-col justify-between gap-4">
              {/* Current Streak */}
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-medium text-gray-600">
                  Current Streak
                </p>
                <p className="text-sm font-bold text-[#AD85D1]">
                  {currentStreak} Days
                </p>
              </div>

              {/* Longest Streak */}
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-medium text-gray-600">
                  Longest Streak
                </p>
                <p className="text-sm font-bold text-[#AD85D1]">
                  {longestStreak} days
                </p>
              </div>

              {/* Average Session Time */}
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-medium text-gray-600">
                  Avg Session Time
                </p>
                <p className="text-sm font-bold text-[#AD85D1]">
                  {averageSessionTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStreakCard;
