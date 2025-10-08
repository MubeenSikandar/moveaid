"use client";

import React, { useState } from "react";
import Logo from "@/assets/MoveAid.svg";
import Image from "next/image";
import Settings from "@/assets/Settings.svg";
import Notification from "@/assets/Notification.svg";
import { UserButton } from "@clerk/nextjs";
import NotificationsWhite from "@/assets/NotificationWhite.svg";
import SettingsWhite from "@/assets/SettingsWhite.svg";

interface HeaderProps {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

const Header = ({ activeButton, setActiveButton }: HeaderProps) => {
  const mainButtons = [
    { id: "Home", label: "Home" },
    { id: "Plan", label: "Plan" },
    { id: "Exercises", label: "Exercises" },
    { id: "Health Tracker", label: "Health Tracker" },
  ];

  const settingsButton = { id: "Settings", label: "Settings", icon: Settings };
  const notificationsButton = {
    id: "Notification",
    label: "Notifications",
    icon: Notification,
  };

  const getButtonStyles = (buttonId: string) => {
    const isActive = activeButton === buttonId;
    return `flex items-center justify-between rounded-4xl p-3 gap-2 cursor-pointer transition-colors ${
      isActive
        ? "bg-[#AD85D1] text-white hover:bg-[#9A73C7]"
        : "bg-white text-black hover:bg-gray-50"
    }`;
  };

  return (
    <div className="flex justify-between items-center w-full">
      <Image src={Logo} alt="logo" width={138} height={26.07} />
      <div className="flex items-center justify-center gap-3">
        {/* Main Navigation Buttons */}
        <div className="flex items-center justify-between bg-white rounded-4xl p-1 gap-2">
          {mainButtons.map((button) => (
            <div
              key={button.id}
              onClick={() => setActiveButton(button.id)}
              className={getButtonStyles(button.id)}
            >
              <p>{button.label}</p>
            </div>
          ))}
        </div>

        {/* Settings Button */}
        <div className="flex items-center justify-between bg-white rounded-4xl p-1 gap-2">
          <div
            onClick={() => setActiveButton(settingsButton.id)}
            className={getButtonStyles(settingsButton.id)}
          >
            <Image
              src={
                activeButton === settingsButton.id
                  ? SettingsWhite
                  : settingsButton.icon
              }
              alt={settingsButton.label.toLowerCase()}
              width={24}
              height={24}
            />
            <p>{settingsButton.label}</p>
          </div>
        </div>

        {/* Notifications Button */}
        <div className="flex items-center justify-between bg-white rounded-4xl p-1 gap-2">
          <div
            onClick={() => setActiveButton(notificationsButton.id)}
            className={getButtonStyles(notificationsButton.id)}
          >
            <Image
              src={
                activeButton === notificationsButton.id
                  ? NotificationsWhite
                  : notificationsButton.icon
              }
              alt={notificationsButton.label.toLowerCase()}
              width={24}
              height={24}
            />
            <p>{notificationsButton.label}</p>
          </div>
        </div>

        {/* UserButton */}
        <div className="flex items-center justify-center bg-white rounded-4xl p-2 gap-2">
          <div className="scale-180 flex items-center justify-center">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
