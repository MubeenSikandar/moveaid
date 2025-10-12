"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Assessment() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/assessment/step1");
  }, [router]);

  return null;
}
