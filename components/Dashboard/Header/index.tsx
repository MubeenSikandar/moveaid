"use client";

import React from "react";
import Logo from "@/assets/MoveAid.svg";
import Image from "next/image";
import Settings from "@/assets/Settings.svg";
import Notification from "@/assets/Notification.svg";
import { UserButton } from "@clerk/nextjs";
import NotificationsWhite from "@/assets/NotificationWhite.svg";
import SettingsWhite from "@/assets/SettingsWhite.svg";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    nav: [
      { id: "Home", label: "Home" },
      { id: "Plan", label: "Plan" },
      { id: "Exercises", label: "Exercises" },
      { id: "Health Tracker", label: "Health Tracker" },
    ],
    settings: "Settings",
    notifications: "Notifications",
  },
  ur: {
    nav: [
      { id: "Home", label: "ہوم" },
      { id: "Plan", label: "منصوبہ" },
      { id: "Exercises", label: "مشقیں" },
      { id: "Health Tracker", label: "صحت ٹریکر" },
    ],
    settings: "ترتیبات",
    notifications: "اطلاعات",
  },
} as const;

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

interface HeaderProps {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

const DashboardHeader = ({ activeButton, setActiveButton }: HeaderProps) => {
  const { language, isRTL } = useLanguage();
  const tr = translations[language];
  const uf = isRTL ? urduFont : {};

  const getButtonStyles = (buttonId: string) => {
    const isActive = activeButton === buttonId;
    return `flex items-center justify-between rounded-4xl p-3 gap-2 cursor-pointer transition-colors ${
      isActive
        ? "bg-[#AD85D1] text-white hover:bg-[#9A73C7]"
        : "bg-white text-black hover:bg-gray-50"
    }`;
  };

  return (
    <div
      className={`flex justify-between items-center w-full ${isRTL ? "flex-row-reverse" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Image src={Logo} alt="logo" width={138} height={26.07} />

      <div
        className={`flex items-center justify-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Main Navigation */}
        <div
          className={`flex items-center justify-between bg-white rounded-4xl p-1 gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {tr.nav.map((button) => (
            <div
              key={button.id}
              onClick={() => setActiveButton(button.id)}
              className={getButtonStyles(button.id)}
            >
              <p style={uf}>{button.label}</p>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="flex items-center justify-between bg-white rounded-4xl p-1 gap-2">
          <div
            onClick={() => setActiveButton("Settings")}
            className={getButtonStyles("Settings")}
          >
            <Image
              src={activeButton === "Settings" ? SettingsWhite : Settings}
              alt="settings"
              width={24}
              height={24}
            />
            <p style={uf}>{tr.settings}</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between bg-white rounded-4xl p-1 gap-2">
          <div
            onClick={() => setActiveButton("Notification")}
            className={getButtonStyles("Notification")}
          >
            <Image
              src={
                activeButton === "Notification"
                  ? NotificationsWhite
                  : Notification
              }
              alt="notifications"
              width={24}
              height={24}
            />
            <p style={uf}>{tr.notifications}</p>
          </div>
        </div>

        {/* User Button */}
        <div className="flex items-center justify-center bg-white rounded-4xl p-2 gap-2">
          <div className="scale-180 flex items-center justify-center">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
