"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { MagneticHover } from "./MagneticHover";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about-detail" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [clickCount, setClickCount] = useState(0);
  
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const isMiles = mounted && theme === "theme-1610";

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
          whileHover={{ scale: 1.15, rotate: [0, -15, 15, 0] }}
          className="text-[var(--theme-accent)] flex items-center justify-center"
          style={{ transform: isMiles ? "rotate(-2deg)" : "none", filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.8))" }}
        >
          {/* Clean Professional Spider SVG */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={clickCount > 0 ? "animate-pulse" : ""}>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 18.5C14.2091 18.5 16 15.5899 16 12C16 8.41015 14.2091 5.5 12 5.5C9.79086 5.5 8 8.41015 8 12C8 15.5899 9.79086 18.5 12 18.5Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12 6.5C13.1046 6.5 14 5.38071 14 4C14 2.61929 13.1046 1.5 12 1.5C10.8954 1.5 10 2.61929 10 4C10 5.38071 10.8954 6.5 12 6.5Z" />
            <path d="M10 12h-2L4 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 12h2l4-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 13H6l-4 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 13h3l4 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 14H6l-3 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 14h3l3 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 15H8l-2 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 15h2l2 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
          className={`group relative text-white transition-all duration-300 flex items-baseline pb-1 ${
            isMiles ? "tracking-wider" : "tracking-tight"
          }`}
          style={{
            fontFamily: isMiles ? "var(--font-bangers)" : "var(--font-space-grotesk), sans-serif",
            fontWeight: isMiles ? "normal" : "800",
            fontSize: isMiles ? "2.5rem" : "1.65rem",
            transform: isMiles ? "rotate(-2deg)" : "none",
            textTransform: isMiles ? "none" : "uppercase",
            textShadow: clickCount > 0
              ? "3px 3px 0px var(--spiderverse-cyan), -3px -3px 0px var(--spiderverse-magenta)"
              : isMiles
              ? "2px 2px 0px #000, 4px 4px 0px rgba(0,0,0,0.4)"
              : "none"
          }}
        >
          {isMiles ? "CHAITANYA" : "CHAITANYA"}
          <span style={{ 
            color: "var(--theme-accent)", 
            marginLeft: "2px", 
            fontFamily: isMiles ? "var(--font-bangers)" : "var(--font-space-grotesk)" 
          }}>.</span>
          
          {/* Subtle underline stroke on hover */}
          <div className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[var(--theme-accent)] group-hover:w-full transition-all duration-300" />
        </a>
      </div>

      {/* Links with active indicator */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 bg-white/5 backdrop-blur-md px-2 sm:px-4 py-1.5 md:py-2 rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        {navLinks.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = active === id;
          return (
            <MagneticHover key={label} strength={10}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new Event("trigger-spider-sense"));
                  window.dispatchEvent(
                    new CustomEvent("web-sling", {
                      detail: { targetId: id, x: e.clientX, y: e.clientY },
                    })
                  );
                }}
                className={`flex items-center justify-center px-2 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-300 ${isActive ? "bg-[var(--theme-accent)]/10" : "hover:bg-white/5"}`}
                style={{
                  color: isActive ? "var(--theme-accent)" : "#a1a1aa",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                <span className="hover-glitch relative text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase">
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: "var(--theme-accent)" }}
                    />
                  )}
                </span>
              </a>
            </MagneticHover>
          );
        })}
        
        <div className="w-px h-4 md:h-6 bg-white/10 mx-1 md:mx-2" /> {/* Divider */}
        
        <MagneticHover strength={10}>
          <div>
            <ThemeToggle />
          </div>
        </MagneticHover>
      </div>
    </motion.nav>
  );
}
