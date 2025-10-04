import ChoosePath from "@/components/ChoosePath";
import HowItWorks from "@/components/HowItWorks";
import ProgressYouCanFeel from "@/components/ProgressYouCanFeel";
import SmarterCoachingBuiltIn from "@/components/SmarterCoachingBuiltIn";
import TopSection from "@/components/TopSection";
import TrackWhatMattersMost from "@/components/TrackWhatMattersMost";
import YourBodyYourPlan from "@/components/YourBodyYourPlan";
import MemberStories from "@/components/MemberStories";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section id="home">
        <TopSection />
      </section>
      <section id="choose-path">
        <ChoosePath />
      </section>
      <section id="your-body-your-plan">
        <YourBodyYourPlan />
      </section>
      <section id="smarter-coaching">
        <SmarterCoachingBuiltIn />
      </section>
      <section id="track-what-matters">
        <TrackWhatMattersMost />
      </section>
      <section id="progress-you-can-feel">
        <ProgressYouCanFeel />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="real-people">
        <MemberStories />
      </section>
    </div>
  );
}
