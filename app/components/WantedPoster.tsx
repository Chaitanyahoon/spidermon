"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function WantedPoster() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? theme : "dark";

  // Base state (Earth-616)
  let paperBg = "#f4ebd8"; // Vintage comic paper
  let dotColor = "rgba(0,0,0,0.06)";
  let accentColor = "#b91c1c"; // Deep red
  let textColor = "#111827";   // Near black
  let borderColor = "#111";    // Solid black border
  let shadowColor = "#111";    // Neo-brutalist shadow

  if (activeTheme === "theme-1610") {
    paperBg = "#fffde7"; // Brighter yellow paper
    dotColor = "rgba(220, 38, 38, 0.15)";
    accentColor = "#dc2626";
    textColor = "#000";
  } else if (activeTheme === "theme-noir") {
    paperBg = "#d1d5db"; // Grayscale
    dotColor = "rgba(0,0,0,0.12)";
    accentColor = "#111827";
    textColor = "#000";
    borderColor = "#000";
  } else if (activeTheme === "theme-punk") {
    paperBg = "#fde047"; // Neon yellow
    dotColor = "rgba(236, 72, 153, 0.3)"; // Hot pink dots
    accentColor = "#db2777";
    textColor = "#111";
    borderColor = "#111";
  }

  return (
    <motion.a
      href="/ChaitanyaPatilResume.pdf"
      download
      initial={{ rotate: -2, y: 0 }}
      whileHover={{ 
        rotate: 0, 
        y: -6, 
        scale: 1.02,
        boxShadow: `8px 8px 0px ${shadowColor}`
      }}
      whileTap={{ scale: 0.95, y: 0, boxShadow: `0px 0px 0px ${shadowColor}` }}
      className="relative flex flex-col items-center justify-center p-5 mt-6 cursor-pointer transition-all duration-200 group"
      style={{
        width: "180px",
        height: "170px",
        backgroundColor: paperBg,
        backgroundImage: `radial-gradient(${dotColor} 1.5px, transparent 1.5px), radial-gradient(${dotColor} 1.5px, transparent 1.5px)`,
        backgroundSize: "12px 12px",
        backgroundPosition: "0 0, 6px 6px",
        border: `3px solid ${borderColor}`,
        boxShadow: `5px 5px 0px ${shadowColor}`,
      }}
    >
      {/* Tape decoration (top center) */}
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/60 backdrop-blur-sm rotate-2 z-20"
        style={{ border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      />

      {/* WANTED header */}
      <h3 
        className="text-[14px] font-black uppercase tracking-[0.3em] leading-none mb-2 z-10"
        style={{ color: accentColor, fontFamily: "var(--font-space-grotesk)" }}
      >
        WANTED
      </h3>

      {/* Red Divider Line */}
      <div 
        className="w-full h-[3px] z-10 mb-3"
        style={{ backgroundColor: accentColor }}
      />

      {/* Center Star */}
      <div className="z-10 mb-4 flex items-center justify-center transform group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
        <svg fill={accentColor} width="24" height="24" viewBox="0 0 24 24" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>

      {/* DOWNLOAD CV text */}
      <h4 
        className="text-[18px] font-black uppercase tracking-[0.05em] leading-none z-10 whitespace-nowrap mb-1"
        style={{ color: textColor, fontFamily: activeTheme === "theme-1610" ? "var(--font-bangers)" : "var(--font-space-grotesk)" }}
      >
        DOWNLOAD CV
      </h4>

      {/* HIRED OR ALIVE */}
      <span 
        className="text-[9px] font-bold uppercase tracking-[0.2em] z-10 opacity-80"
        style={{ color: accentColor, fontFamily: "var(--font-space-grotesk)" }}
      >
        HIRED OR ALIVE
      </span>
      
      {/* Vintage/Grunge Edge vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
        style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)" }}
      />
    </motion.a>
  );
}
