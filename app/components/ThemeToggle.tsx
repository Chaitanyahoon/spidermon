"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Palette, Moon, Sun, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    name: "dark",
    label: "Earth-616",
    color: "#E8001C",
    icon: Moon,
    description: "Original Spider-Man",
  },
  {
    name: "theme-1610",
    label: "Earth-1610",
    color: "#ff0055",
    icon: Palette,
    description: "Miles Morales",
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted)
    return (
      <div className="w-9 h-9 rounded-full bg-zinc-800/50 animate-pulse" />
    );

  const activeTheme = themes.find((t) => t.name === theme) || themes[0];
  const ActiveIcon = activeTheme.icon;

  return (
    <div className="relative z-[999]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition-colors"
        title={`Current Universe: ${activeTheme.label}`}
      >
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800">
          <ActiveIcon size={12} stroke={activeTheme.color} />
        </div>
        <span
          className="text-xs font-medium text-zinc-300"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {activeTheme.label}
        </span>
        <ChevronDown
          size={14}
          className={`text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-3 w-56 p-2 rounded-2xl border border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="mb-2 px-3 pt-2 pb-1">
              <p
                className="text-[10px] tracking-widest uppercase text-zinc-500 font-semibold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Multiverse
              </p>
            </div>
            <div className="flex flex-col gap-1">
              {themes.map((t) => {
                const Icon = t.icon;
                const isActive = activeTheme.name === t.name;
                return (
                  <div
                    key={t.name}
                    role="button"
                    tabIndex={0}
                    onPointerDown={(e) => {
                      // onPointerDown fires faster than onClick, preventing focus loss bugs
                      e.preventDefault();
                      e.stopPropagation();
                      window.dispatchEvent(new Event("trigger-spider-sense"));
                      setTheme(t.name);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? "bg-zinc-800 border border-zinc-700/50"
                        : "hover:bg-zinc-800/60 border border-transparent"
                    }`}
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 shrink-0"
                      style={{
                        backgroundColor: isActive ? `${t.color}20` : "#27272a",
                      }}
                    >
                      <Icon size={14} stroke={t.color} />
                    </div>
                    <div
                      className="flex flex-col items-start transition-opacity duration-200"
                      style={{ opacity: isActive ? 1 : 0.7 }}
                    >
                      <span
                        className="text-sm font-semibold text-white"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {t.label}
                      </span>
                      <span
                        className="text-[10px] text-zinc-400"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {t.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
