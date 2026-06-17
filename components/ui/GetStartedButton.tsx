"use client";

import { useRouter } from "next/navigation";

export default function GetStartedButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/communities"); // adjust target as needed
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-sm hover:bg-primary/90 transition"
    >
      Get Started
    </button>
  );
}
