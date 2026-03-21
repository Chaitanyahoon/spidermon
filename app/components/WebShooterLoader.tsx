"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WebShooterLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const already = sessionStorage.getItem("spidermon-loaded");
    if (!already) {
      setVisible(true);
      sessionStorage.setItem("spidermon-loaded", "1");
      // Hyper-fast dismiss after 900ms to eliminate load fatigue
      const t = setTimeout(() => setVisible(false), 900);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Intense Glitch Text Assembly */}
          <motion.div
            className="relative flex items-center justify-center z-10 w-full px-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: [0.9, 1.1, 1, 1.02, 1],
              opacity: [0, 1, 0.8, 1, 0],
              x: [0, -8, 8, -4, 0],
              y: [0, 4, -4, 4, 0],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.15, 0.4, 0.6, 1],
              ease: "backInOut",
            }}
          >
            {/* Base Text */}
            <h1
              className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase text-center leading-none"
              style={{
                fontFamily: "var(--font-bangers)",
                letterSpacing: "0.05em",
              }}
            >
              INITIALIZING
              <br />
              <span className="text-[#ffe500]">SPIDER-PROTOCOL</span>
            </h1>

            {/* Cyan Glitch Layer */}
            <h1
              className="absolute inset-0 text-transparent text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase text-center leading-none mix-blend-screen pointer-events-none"
              style={{
                fontFamily: "var(--font-bangers)",
                letterSpacing: "0.05em",
                transform: "translate(-6px, 4px)",
                WebkitTextStroke: "2px #00ffff",
              }}
            >
              INITIALIZING
              <br />
              SPIDER-PROTOCOL
            </h1>

            {/* Magenta Glitch Layer */}
            <h1
              className="absolute inset-0 text-transparent text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase text-center leading-none mix-blend-screen pointer-events-none"
              style={{
                fontFamily: "var(--font-bangers)",
                letterSpacing: "0.05em",
                transform: "translate(6px, -4px)",
                WebkitTextStroke: "2px #ff00ff",
              }}
            >
              INITIALIZING
              <br />
              SPIDER-PROTOCOL
            </h1>
          </motion.div>

          {/* Aggressive Visual Flash / Web Blast Simulation */}
          <motion.div
            className="absolute inset-0 bg-white mix-blend-overlay z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3, delay: 0.55, ease: "circOut" }}
          />

          {/* Noise / Halftone Simulation Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-0 text-[10px] leading-none text-red-500 overflow-hidden break-all indent-0"
            style={{ fontFamily: "monospace", letterSpacing: "-1px" }}
          >
             {/* Just a cheap texture fill layer using CSS repeating gradients */}
             <div className="w-full h-full" style={{
                 backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,0,28,0.2) 2px, rgba(232,0,28,0.2) 4px)",
                 backgroundSize: "100% 4px"
             }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
