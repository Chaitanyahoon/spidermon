"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
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
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/40 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      {/* Name — clicking scrolls to top */}
      <a
        href="#"
        onClick={(e) => {
          const newCount = clickCount + 1;
          setClickCount(newCount);
          if (newCount >= 3) {
            window.dispatchEvent(new Event("toggle-camo"));
            setClickCount(0);
          }
        }}
        className="hover-glitch text-sm font-bold tracking-[0.2em] uppercase text-white"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Chaitanya<span style={{ color: "var(--theme-accent)" }}>.</span>
      </a>

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
