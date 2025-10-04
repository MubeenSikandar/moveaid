import Image from "next/image";
import React from "react";
import Step1 from "@/assets/SetUpBorder.svg";
import Step2 from "@/assets/ChooseYourGoal.svg";
import Step3 from "@/assets/MoveYourFeedback.svg";

const HowItWorks = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-8">
      <div className="flex items-center justify-center bg-[#EFEAE6] rounded-4xl p-4">
        <p className="text-md italic">HOW IT WORKS</p>
      </div>
      <p className="text-5xl font-bold text-black text-center">
        Get Started in 3 Steps
      </p>
      <p className="text-md text-black font-light text-center">
        Everyone moves differently. Let’s start with what your body needs.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Image src={Step1} alt="step1" width={588} height={568} />
        <Image src={Step2} alt="step2" width={282} height={568} />
        <Image src={Step3} alt="step3" width={282} height={568} />
      </div>
    </div>
  );
};

export default HowItWorks;
