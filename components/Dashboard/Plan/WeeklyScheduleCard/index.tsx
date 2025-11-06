import React from "react";

const WeeklyScheduleCard = () => {
  // Days of the week
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Sample active days - in real implementation this would come from props or state
  // For demo purposes, let's say Monday, Wednesday, Friday, and Saturday are active
  const activeDays = [0, 2, 4, 5]; // indices of active days

  return (
    <div className="w-full h-full bg-[#ebe7dd] rounded-4xl p-6 shadow-lg flex flex-col">
      <div className="flex flex-col gap-4 flex-1">
        {/* Header */}
        <h2 className="text-xl font-bold text-black text-center">
          This Week&apos;s Schedule
        </h2>

        {/* Weekly Schedule Circles */}
        <div className="flex items-center justify-between gap-2">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              {/* Day Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                  activeDays.includes(index)
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-600 border-2 border-gray-200"
                }`}
              >
                {day}
              </div>
              {/* Day Name */}
              <span className="text-xs text-gray-600 font-medium">
                {dayNames[index]}
              </span>
            </div>
          ))}
        </div>

        {/* Schedule Summary */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {activeDays.length} of 7 days scheduled
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyScheduleCard;
