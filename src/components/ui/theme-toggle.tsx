"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

/**
 * Quiet icon control. It never competes with Join OCS — it only changes the
 * environment. Light is the default; this is how a visitor opts into dark.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="grid size-11 place-items-center rounded-md text-ink-muted transition-colors duration-200 ease-ui hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:text-ink focus-visible:outline-none"
    >
      {theme === "dark" ? (
        <Sun className="size-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <Moon className="size-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
      )}
    </button>
  );
}
