import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Logo from "@/assets/MoveAid.svg";

const Header = () => {
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
    <div className="flex justify-between items-center bg-[#FEFEFE] px-2 py-1 rounded-4xl">
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
      >
        Home
      </p>
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        onClick={() => scrollToSection("how-it-works")}
      >
        How It Works
      </p>
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        onClick={() => scrollToSection("choose-path")}
      >
        What You Need
      </p>
      <p
        className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors"
        onClick={() => scrollToSection("real-people")}
      >
        Real People
      </p>
      <p className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors">
        Pricing
      </p>
      <p className="text-lg cursor-pointer hover:text-[#AD85D1] transition-colors">
        Try a Demo
      </p>
      <SignedOut>
        <Link href="/auth">
          <button className="bg-[#AD85D1] text-white px-6 py-4 rounded-4xl cursor-pointer hover:bg-[#9A73C7] transition-colors">
            Get Started
          </button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
