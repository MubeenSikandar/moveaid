"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DashboardPage from "@/components/Dashboard";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <DashboardPage />
    </div>
  );
}
