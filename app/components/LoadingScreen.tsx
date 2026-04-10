"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  const startExit = useCallback(() => {
    setExiting(true);
    // Let the CSS transition finish before telling parent we're done
    setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 2400;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        startExit();
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [startExit]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#09090b] transition-all duration-500"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.04)" : "scale(1)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Spider web threads — decorative */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{ opacity: 0.06 }}
      >
        <line x1="600" y1="400" x2="1200" y2="0" stroke="white" strokeWidth="0.5" />
        <line x1="600" y1="400" x2="0" y2="0" stroke="white" strokeWidth="0.5" />
        <line x1="600" y1="400" x2="1200" y2="800" stroke="white" strokeWidth="0.5" />
        <line x1="600" y1="400" x2="0" y2="800" stroke="white" strokeWidth="0.5" />
        <line x1="600" y1="400" x2="600" y2="0" stroke="white" strokeWidth="0.5" />
        <line x1="600" y1="400" x2="600" y2="800" stroke="white" strokeWidth="0.5" />
        <line x1="600" y1="400" x2="1200" y2="400" stroke="white" strokeWidth="0.5" />
        <line x1="600" y1="400" x2="0" y2="400" stroke="white" strokeWidth="0.5" />
      </svg>

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(232,0,28,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Web thread dropping down to spider */}
        <motion.div
          className="absolute -top-16 left-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent to-zinc-600 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Spider icon — drops in from thread */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="10" rx="3.5" ry="4.5" fill="var(--theme-accent)" />
            <ellipse cx="12" cy="16.5" rx="2.5" ry="3" fill="var(--theme-accent)" />
            {/* Legs */}
            <line x1="12" y1="8" x2="4" y2="4" stroke="var(--theme-accent)" strokeWidth="1" strokeLinecap="round" />
            <line x1="12" y1="10" x2="3" y2="10" stroke="var(--theme-accent)" strokeWidth="1" strokeLinecap="round" />
            <line x1="12" y1="12" x2="4" y2="16" stroke="var(--theme-accent)" strokeWidth="1" strokeLinecap="round" />
            <line x1="12" y1="8" x2="20" y2="4" stroke="var(--theme-accent)" strokeWidth="1" strokeLinecap="round" />
            <line x1="12" y1="10" x2="21" y2="10" stroke="var(--theme-accent)" strokeWidth="1" strokeLinecap="round" />
            <line x1="12" y1="12" x2="20" y2="16" stroke="var(--theme-accent)" strokeWidth="1" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="10.5" cy="9" r="1" fill="#09090b" />
            <circle cx="13.5" cy="9" r="1" fill="#09090b" />
          </svg>
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-2xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Chaitanya<span style={{ color: "var(--theme-accent)" }}>.</span>
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 192 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="h-[2px] bg-zinc-800 relative overflow-hidden rounded-full"
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-[width] duration-100 ease-out"
            style={{
              width: `${progress}%`,
              background: "var(--theme-accent)",
              boxShadow: "0 0 8px var(--theme-accent)",
            }}
          />
        </motion.div>

        {/* Status text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="text-[10px] tracking-[0.4em] uppercase text-zinc-500"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {progress < 30
            ? "Spinning web..."
            : progress < 60
              ? "Loading assets..."
              : progress < 95
                ? "Almost ready..."
                : "Ready"}
        </motion.p>
      </div>

      {/* Bottom progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900/50">
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: "var(--theme-accent)",
          }}
        />
      </div>
    </div>
  );
}
