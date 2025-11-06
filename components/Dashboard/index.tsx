"use client";

import React, { useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Plan from "./Plan";
import Exercises from "./Exercises";
import HealthTracker from "./HealthTracker";
import SettingsComponent from "./Settings";
import Notifications from "./Notifications";

const Dashboard = () => {
  const [activeButton, setActiveButton] = useState("Home");

  const renderContent = () => {
    switch (activeButton) {
      case "Home":
        return <Home />;
      case "Plan":
        return <Plan />;
      case "Exercises":
        return <Exercises />;
      case "Health Tracker":
        return <HealthTracker />;
      case "Settings":
        return <SettingsComponent />;
      case "Notifications":
        return <Notifications />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-[3%] py-3 overflow-hidden">
      <Header activeButton={activeButton} setActiveButton={setActiveButton} />
      <div className="w-full flex-1 flex items-center justify-between overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
