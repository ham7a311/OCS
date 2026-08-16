export const THEME_STORAGE_KEY = "ocs-theme";

export type Theme = "dark" | "light";

export const THEME_COLORS: Record<Theme, string> = {
  dark: "#08080b",
  light: "#f3f0ea",
};

export function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

/** Light is the product default, including first visit and failed storage reads. */
export function readStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : "light";
  } catch {
    return "light";
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
}
