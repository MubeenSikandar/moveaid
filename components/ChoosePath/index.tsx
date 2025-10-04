"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import PathCard from "./PathCard";
import FormRouter from "../Forms/FormRouter";
import ProtectedRoute from "../ProtectedRoute";
import RecoverFromInjury from "@/assets/RecoverFromInjury.svg";
import FixPosture from "@/assets/FixPosture.svg";
import BuildAMovementHabit from "@/assets/BuildAMovementHabit.svg";
import ImproveYourWorkoutForm from "@/assets/ImproveYourWorkoutForm.svg";
import StayActiveAtYourDesk from "@/assets/StayActiveAtYourDesk.svg";
import LessStiffMoreMobile from "@/assets/LessStiffMoreMobile.svg";

// Array of path assets with their metadata
const pathAssets = [
  {
    image: RecoverFromInjury,
    text: "Recover From Injury",
    width: 80,
    height: 80,
    className: "w-20 h-20",
    formType: "recover-from-injury",
  },
  {
    image: FixPosture,
    text: "Fix Posture",
    width: 80,
    height: 80,
    className: "w-20 h-20",
    formType: "fix-posture",
  },
  {
    image: BuildAMovementHabit,
    text: "Build A Movement Habit",
    width: 80,
    height: 80,
    className: "w-20 h-20",
    formType: "build-movement-habit",
  },
  {
    image: ImproveYourWorkoutForm,
    text: "Improve Your Workout Form",
    width: 80,
    height: 80,
    className: "w-20 h-20",
    formType: "improve-workout-form",
  },
  {
    image: StayActiveAtYourDesk,
    text: "Stay Active At Your Desk",
    width: 80,
    height: 80,
    className: "w-20 h-20",
    formType: "stay-active-at-desk",
  },
  {
    image: LessStiffMoreMobile,
    text: "Less Stiff More Mobile",
    width: 80,
    height: 80,
    className: "w-20 h-20",
    formType: "less-stiff-more-mobile",
  },
];

const ChoosePath = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const handlePathClick = (formType: string) => {
    setSelectedForm(formType);
  };

  const handleBack = () => {
    setSelectedForm(null);
  };

  if (selectedForm) {
    return (
      <ProtectedRoute>
        <FormRouter
          formType={selectedForm}
          onBack={handleBack}
          onComplete={handleBack}
        />
      </ProtectedRoute>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center py-8">
      <div className="flex items-center justify-center bg-[#EFEAE6] rounded-4xl p-4">
        <p className="text-md italic">Choose Path</p>
      </div>
      <p className="text-5xl font-bold text-black text-center px-[20%]">
        What kind of support are you looking for?
      </p>
      <p className="text-md text-black font-light text-center px-[20%]">
        Everyone moves differently. Let&apos;s start with what your body needs.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {pathAssets.map((asset, index) => (
          <div key={index}>
            <SignedIn>
              <PathCard
                imagePath={asset.image}
                text={asset.text}
                width={asset.width}
                height={asset.height}
                className={asset.className}
                onClick={() => handlePathClick(asset.formType)}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <div className="flex flex-col gap-4 items-center justify-center py-8 border-2 border-transparent rounded-2xl hover:border-gray-300 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center bg-white rounded-4xl p-4">
                    <p className="text-md italic">{asset.text}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={asset.image}
                      alt="path"
                      width={asset.width}
                      height={asset.height}
                      className={asset.className}
                    />
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">
                      Sign in to start assessment
                    </p>
                  </div>
                </div>
              </SignInButton>
            </SignedOut>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoosePath;
