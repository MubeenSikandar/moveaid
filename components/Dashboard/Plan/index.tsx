import StartSessionCard from "./StartSessionCard.tsx";
import WeeklyScheduleCard from "./WeeklyScheduleCard";
import WorkoutCard from "./WorkoutCard";
import PhaseProgressCard from "./PhaseProgressCard";

const Plan = () => {
  return (
    <div className="flex gap-4 w-full h-full p-4 overflow-hidden">
      {/* Left Column - Takes half the screen */}
      <div className="flex flex-col gap-4 w-1/2 h-full overflow-hidden">
        {/* StartSessionCard - Fixed height */}
        <div className="flex-shrink-0 h-64">
          <StartSessionCard />
        </div>

        {/* WeeklyScheduleCard - Fixed height */}
        <div className="flex-shrink-0 h-48">
          <WeeklyScheduleCard />
        </div>

        {/* PhaseProgressCard - Takes remaining height */}
        <div className="flex-1 min-h-0">
          <PhaseProgressCard />
        </div>
      </div>

      {/* Right Column - Takes half the screen */}
      <div className="flex flex-col gap-4 w-1/2 h-full overflow-hidden">
        {/* WorkoutCard - Takes remaining height */}
        <div className="flex-1 min-h-0">
          <WorkoutCard />
        </div>
      </div>
    </div>
  );
};

export default Plan;
