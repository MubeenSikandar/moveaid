import ChoosePath from "@/components/LandingPage/ChoosePath";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import ProgressYouCanFeel from "@/components/LandingPage/ProgressYouCanFeel";
import SmarterCoachingBuiltIn from "@/components/LandingPage/SmarterCoachingBuiltIn";
import TopSection from "@/components/LandingPage/TopSection";
import TrackWhatMattersMost from "@/components/LandingPage/TrackWhatMattersMost";
import YourBodyYourPlan from "@/components/LandingPage/YourBodyYourPlan";
import MemberStories from "@/components/LandingPage/MemberStories";

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
