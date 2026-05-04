"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "spiderman" | "me";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("spiderman");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("spidermonn-theme") as Theme;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("theme-me", saved === "me");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "spiderman" ? "me" : "spiderman";
      localStorage.setItem("spidermonn-theme", next);
      document.documentElement.classList.toggle("theme-me", next === "me");
      return next;
    });
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const FALLBACK: ThemeContextType = { theme: "spiderman", toggleTheme: () => {} };

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  // Return safe fallback during SSR prerender when provider isn't mounted yet
  return context ?? FALLBACK;
}
