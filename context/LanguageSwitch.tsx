"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleLanguage();
  };

  const isUrdu = language === "ur";

  return (
    <button
      onClick={handleToggle}
      className="relative flex items-center justify-center lg:w-16 lg:h-16 sm:w-10 sm:h-10 w-8 h-8 rounded-full
                 transition-all duration-300 ease-in-out
                 hover:scale-110 active:scale-95 cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-emerald-500 dark:focus:ring-teal-400"
      aria-label={isUrdu ? "Switch to English" : "Switch to Urdu"}
      title={isUrdu ? "Switch to English" : "اردو میں تبدیل کریں"}
    >
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 ${
          isUrdu
            ? "bg-teal-400/20 opacity-100"
            : "bg-emerald-500/20 opacity-100"
        }`}
      />

      {/* Rotating circle indicator */}
      <div
        className={`absolute inset-0 rounded-full border-2 ${
          isUrdu ? "border-teal-400/20" : "border-emerald-400/20"
        } transition-all duration-500 ${isAnimating ? "animate-spin" : ""}`}
      >
        <div
          className={`absolute top-0 left-1/2 w-1 h-1 rounded-full ${
            isUrdu ? "bg-teal-300" : "bg-emerald-400"
          } transform -translate-x-1/2 -translate-y-1/2`}
        />
      </div>

      {/* Main container */}
      <div className="relative lg:w-14 lg:h-14 sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center">
        {/* English label */}
        <div
          className={`absolute transition-all duration-500 ease-in-out ${
            isUrdu
              ? "opacity-0 scale-0 rotate-90"
              : "opacity-100 scale-100 rotate-0"
          }`}
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Glyph: "EN" pill */}
            <div
              className={`
                flex items-center justify-center
                lg:w-10 lg:h-10 sm:w-7 sm:h-7 w-5 h-5
                bg-gradient-to-br from-emerald-400 to-emerald-600
                rounded-full shadow-lg shadow-emerald-400/50
                transition-all duration-500
                ${isAnimating && !isUrdu ? "animate-pulse" : ""}
              `}
            >
              <span
                className="font-bold text-white select-none
                           lg:text-xs sm:text-[9px] text-[7px] tracking-tight leading-none"
              >
                EN
              </span>
            </div>

            {/* Decorative dots — English "period" motif */}
            {!isUrdu && (
              <>
                <div
                  className={`absolute -top-2 -right-3 w-1 h-1 bg-emerald-300 rounded-full ${
                    isAnimating ? "animate-ping" : ""
                  }`}
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className={`absolute -bottom-1 -right-4 w-0.5 h-0.5 bg-emerald-200 rounded-full ${
                    isAnimating ? "animate-ping" : ""
                  }`}
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className={`absolute -top-3 -left-2 w-0.5 h-0.5 bg-emerald-300 rounded-full ${
                    isAnimating ? "animate-ping" : ""
                  }`}
                  style={{ animationDelay: "0.4s" }}
                />
              </>
            )}
          </div>
        </div>

        {/* Urdu label */}
        <div
          className={`absolute transition-all duration-500 ease-in-out ${
            isUrdu
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-0 -rotate-90"
          }`}
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Glyph: "اردو" pill */}
            <div
              className={`
                flex items-center justify-center
                lg:w-10 lg:h-10 sm:w-7 sm:h-7 w-5 h-5
                bg-gradient-to-br from-teal-300 to-teal-500
                rounded-full shadow-lg shadow-teal-400/50
                transition-all duration-500
                ${isAnimating && isUrdu ? "animate-pulse" : ""}
              `}
            >
              {/* Single Urdu letter "ا" as a clean glyph */}
              <span
                className="font-bold text-white select-none
                           lg:text-sm sm:text-[10px] text-[8px] leading-none"
                style={{
                  fontFamily: "'Noto Nastaliq Urdu', 'Urdu Typesetting', serif",
                }}
              >
                ا
              </span>
            </div>

            {/* Decorative dots — Urdu nuqta motif */}
            {isUrdu && (
              <>
                <div
                  className={`absolute -top-2 -right-3 w-1 h-1 bg-teal-300 rounded-full ${
                    isAnimating ? "animate-ping" : ""
                  }`}
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className={`absolute -bottom-1 -right-4 w-0.5 h-0.5 bg-white rounded-full ${
                    isAnimating ? "animate-ping" : ""
                  }`}
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className={`absolute -top-3 -left-2 w-0.5 h-0.5 bg-teal-200 rounded-full ${
                    isAnimating ? "animate-ping" : ""
                  }`}
                  style={{ animationDelay: "0.4s" }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

export default LanguageSwitch;
