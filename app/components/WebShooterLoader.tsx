"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WebShooterLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const already = sessionStorage.getItem("spidermon-loaded");
    if (!already) {
      setVisible(true);
      sessionStorage.setItem("spidermon-loaded", "1");
      const t = setTimeout(() => dismiss(), 2200);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => setVisible(false), 600);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090909] overflow-hidden"
          onClick={dismiss}
          role="button"
          aria-label="Skip intro"
        >
          {/* Radial background burst */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(232,0,28,0.12) 0%, transparent 65%)",
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Web-Shooter SVG — wrist device */}
          <motion.svg
            viewBox="0 0 220 120"
            className="w-72 md:w-96 relative z-10"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Wrist band */}
            <rect x="20" y="70" width="180" height="40" rx="8" fill="#1a1a1a" stroke="#E8001C" strokeWidth="2" />
            {/* Web shooter body */}
            <rect x="70" y="45" width="80" height="38" rx="6" fill="#111" stroke="#E8001C" strokeWidth="2" />
            {/* Nozzle */}
            <rect x="145" y="52" width="30" height="22" rx="4" fill="#0d0d0d" stroke="#E8001C" strokeWidth="1.5" />
            {/* Spider logo on device */}
            <g transform="translate(100,62)" fill="#E8001C">
              <path d="M0-8 L3 0 L8 0 L4 5 L6 13 L0 9 L-6 13 L-4 5 L-8 0 L-3 0 Z" opacity="0.9" />
            </g>
            {/* Web strand shooting across */}
            <motion.line
              x1="175" y1="63"
              x2="175" y2="63"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ x2: [-10, 500] }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.line
              x1="175" y1="61"
              x2="175" y2="61"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{ x2: [-10, 500] }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.line
              x1="175" y1="65"
              x2="175" y2="65"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.8"
              strokeLinecap="round"
              animate={{ x2: [-10, 500] }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.svg>

          {/* THWIP text */}
          <motion.p
            className="relative z-10 mt-6 text-white tracking-[0.6em] uppercase text-sm"
            style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.5em" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, times: [0, 0.2, 0.8, 1], delay: 0.4 }}
          >
            THWIP!
          </motion.p>

          {/* Universe label */}
          <motion.p
            className="absolute bottom-8 text-zinc-600 text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Click to skip
          </motion.p>

          {/* Corner web strands */}
          <svg className="absolute top-0 left-0 w-40 h-40 opacity-20 pointer-events-none" viewBox="0 0 100 100">
            <path d="M0 0 Q30 30 0 60" stroke="white" strokeWidth="0.6" fill="none" />
            <path d="M0 0 Q50 20 40 80" stroke="white" strokeWidth="0.4" fill="none" />
            <path d="M0 0 Q20 50 80 40" stroke="white" strokeWidth="0.4" fill="none" />
            <path d="M0 0 Q60 10 100 0" stroke="white" strokeWidth="0.6" fill="none" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-40 h-40 opacity-20 pointer-events-none" viewBox="0 0 100 100">
            <path d="M100 100 Q70 70 100 40" stroke="white" strokeWidth="0.6" fill="none" />
            <path d="M100 100 Q50 80 60 20" stroke="white" strokeWidth="0.4" fill="none" />
            <path d="M100 100 Q80 50 20 60" stroke="white" strokeWidth="0.4" fill="none" />
            <path d="M100 100 Q40 90 0 100" stroke="white" strokeWidth="0.6" fill="none" />
          </svg>

          {!exiting && (
            <motion.div
              className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-[#E8001C]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
