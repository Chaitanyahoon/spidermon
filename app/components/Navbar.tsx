"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Bug } from "lucide-react"; // Spider-like icon
const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about-detail" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-500 ${scrolled
        ? "backdrop-blur-xl bg-black/40 border-b border-white/5"
        : "bg-transparent"
        }`}
    >
      {/* Name — clicking scrolls to top */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
          className="text-[var(--theme-accent)]"
        >
          <Bug size={24} className={clickCount > 0 ? "animate-pulse" : ""} />
        </motion.div>
        <a
          href="#"
          onClick={() => {
            const newCount = clickCount + 1;
            setClickCount(newCount);
            if (newCount >= 3) {
              window.dispatchEvent(new Event("toggle-camo"));
              setClickCount(0);
            }
          }}
          className={`group relative text-sm tracking-[0.1em] text-white comic-title transition-all duration-300`}
          style={{
            fontFamily: "var(--font-graffiti), var(--font-space-grotesk)",
            fontSize: "1.85rem",
            transform: "rotate(-2deg)",
            textShadow: clickCount > 0
              ? "3px 3px 0px var(--spiderverse-cyan), -3px -3px 0px var(--spiderverse-magenta)"
              : "2px 2px 0px #000, 4px 4px 0px rgba(0,0,0,0.2)"
          }}
        >
          Chaitanya<span style={{ color: "var(--theme-accent)", fontFamily: "var(--font-bangers)", marginLeft: "-2px" }}>.</span>
          {/* Spray Drip Effect */}
          <div className="absolute -bottom-2 left-4 w-1 h-4 bg-[var(--theme-accent)] opacity-0 group-hover:opacity-100 transition-opacity rounded-full animate-bounce" />
          <div className="absolute -bottom-4 left-10 w-1 h-6 bg-[var(--spiderverse-cyan)] opacity-0 group-hover:opacity-100 transition-opacity rounded-full animate-bounce delay-100" />
        </a>
      </div>

      {/* Links with active indicator */}
      <div className="flex items-center gap-6">
        {navLinks.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = active === id;
          return (
            <a
              key={label}
              href={href}
              onClick={() =>
                window.dispatchEvent(new Event("trigger-spider-sense"))
              }
              className="hover-glitch relative text-xs tracking-widest uppercase transition-colors duration-200"
              style={{
                color: isActive ? "var(--theme-accent)" : "#a1a1aa",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              {label}
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "var(--theme-accent)" }}
                />
              )}
            </a>
          );
        })}
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
