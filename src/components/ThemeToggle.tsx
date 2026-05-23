"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "fixed left-4 top-[88px] z-[1200] h-10 w-10 rounded-full border-2 shadow-md transition-all hover:-translate-y-0.5 sm:left-6 sm:top-[96px]",
        "border-border bg-background text-foreground hover:bg-accent",
        className
      )}
    >
      <FontAwesomeIcon
        icon={theme === "light" ? faMoon : faSun}
        className="h-4 w-4"
      />
    </Button>
  );
}
