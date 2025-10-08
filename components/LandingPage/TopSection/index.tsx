"use client";
import Image from "next/image";
import React from "react";
import BackgroundImage from "@/assets/Background.svg";
import Header from "./Header";
import TopImage from "@/assets/TopSectionImage.svg";

const TopSection = () => {
  return (
    <section className="relative w-full">
      {/* Background Image - absolute positioned */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BackgroundImage}
          alt="top-section"
          fill
          className="object-cover"
        />
      </div>

      {/* Content - relative positioned to maintain flow */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="w-full px-[10%] pt-2">
          <Header />
        </div>

        {/* Hero Text */}
        <div className="flex flex-col gap-2 items-center text-center mt-32">
          <p className="text-7xl">Feel Better in your Body</p>
          <p className="text-7xl">Move with Mindful</p>
          <p className="text-7xl">Precision.</p>
        </div>

        {/* Description */}
        <div className="px-[22%] mt-16">
          <p className="text-center text-xl">
            AI-powered physiotherapy and posture coaching — no sensors, just
            your camera and a smarter way to move. Regain strength, improve
            mobility, and feel more at home in your body with every guided
            session, anytime, anywhere, at your own pace.
          </p>
        </div>

        {/* Bottom Image */}
        <div className="mt-16 w-full">
          <Image
            src={TopImage}
            alt="top-section"
            width={1838}
            height={958}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default TopSection;
