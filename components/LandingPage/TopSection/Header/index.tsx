import Image from "next/image";
import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "@/assets/MoveAid.svg";
import LanguageSwitch from "@/context/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";

const headerTranslations = {
  en: {
    home: "Home",
    howItWorks: "How It Works",
    whatYouNeed: "What You Need",
    realPeople: "Real People",
    pricing: "Pricing",
    tryDemo: "Try a Demo",
    getStarted: "Get Started",
  },
  ur: {
    home: "ہوم",
    howItWorks: "یہ کیسے کام کرتا ہے",
    whatYouNeed: "آپ کو کیا چاہیے",
    realPeople: "حقیقی لوگ",
    pricing: "قیمت",
    tryDemo: "ڈیمو آزمائیں",
    getStarted: "شروع کریں",
  },
} as const;

const Header = () => {
  const { language, isRTL } = useLanguage();
  const tr = headerTranslations[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className="flex justify-between items-center bg-[#FEFEFE] px-2 py-1 rounded-4xl"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Image
        src={Logo}
        alt="logo"
        width={138}
        height={26.07}
        className="cursor-pointer"
        onClick={() => scrollToSection("home")}
      />
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        onClick={() => scrollToSection("home")}
        style={isRTL ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
      >
        {tr.home}
      </p>
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        onClick={() => scrollToSection("how-it-works")}
        style={isRTL ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
      >
        {tr.howItWorks}
      </p>
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        onClick={() => scrollToSection("choose-path")}
        style={isRTL ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
      >
        {tr.whatYouNeed}
      </p>
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        onClick={() => scrollToSection("real-people")}
        style={isRTL ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
      >
        {tr.realPeople}
      </p>
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        style={isRTL ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
      >
        {tr.pricing}
      </p>
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        style={isRTL ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
      >
        {tr.tryDemo}
      </p>
      <SignedOut>
        <Link href="/auth">
          <button
            className="bg-[#AD85D1] text-white px-6 py-4 rounded-4xl cursor-pointer hover:bg-[#9A73C7] transition-colors"
            style={isRTL ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
          >
            {tr.getStarted}
          </button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <LanguageSwitch />
    </div>
  );
};

export default Header;
