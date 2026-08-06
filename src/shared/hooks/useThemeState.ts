import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useThemeState = () => {
  //* States
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Check the localStorage
    const stored = localStorage.getItem("theme");

    if (stored === "light" || stored === "dark") {
      return stored;
    }

    // 2. Check the media-prefers
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  //* Effects
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  //* Functions
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return {
    theme,
    toggleTheme,
  };
};
