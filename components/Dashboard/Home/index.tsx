import React from "react";
import StartSessionCard from "./StartSessionCard";
import PostureAccuracyCard from "./PostureAccuracyCard";
import WeeklyStreakCard from "./WeeklyStreakCard";
import WeeklyProgressCard from "./WeeklyProgressCard";
import MoodInsightsCard from "./MoodInsightsCard";
import NextMilestoneCard from "./NextMileStoneCard";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="pt-10">
        <h1 className="text-4xl font-bold text-black">
          Hi Sukaina, ready to move today?
        </h1>
      </div>
      <div className="w-full h-full flex items-center justify-center gap-10">
        <div className="w-full h-full flex flex-col items-center gap-4">
          <StartSessionCard />
          <div className="flex items-center justify-center w-full gap-4">
            <PostureAccuracyCard />
            <WeeklyStreakCard />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 h-full w-full">
          <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
            <WeeklyProgressCard />
            <MoodInsightsCard />
          </div>
          <NextMilestoneCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
