"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDLE_TIMEOUT = 10000; // 10 seconds

export function IdleSpiderMan() {
  const [isIdle, setIsIdle] = useState(false);
  const [isFiring, setIsFiring] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isIdle) return; // already showing
    timerRef.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT);
  }, [isIdle]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  const handleClick = () => {
    if (isFiring) return;
    setIsFiring(true);
    setTimeout(() => {
      setIsIdle(false);
      setIsFiring(false);
      // restart idle timer after user clicks
      timerRef.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          key="idle-spider"
          // Changed to fixed top-0, dropping down instead of climbing up
          className="fixed top-0 right-12 z-[9990] cursor-pointer select-none"
          initial={{ y: -150, opacity: 0 }}
          animate={isFiring ? { y: -300, opacity: 0, x: 200, rotate: 45 } : { y: 60, opacity: 1 }}
          exit={{ y: -150, opacity: 0 }}
          transition={
            isFiring
              ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              : { type: "spring", stiffness: 100, damping: 12 }
          }
          onClick={handleClick}
          title="Click me!"
          aria-label="Easter egg: Click Spider-Man"
          role="button"
        >
          {/* Web strand connecting to the top of the screen */}
          {!isFiring && (
            <motion.div
              className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-t from-white/80 to-transparent"
              style={{ height: "100vh", transformOrigin: "bottom center" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Upside Down Minimalist Spider-Man Head SVG */}
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="relative z-10" style={{ filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))" }}>
            {/* The web attaching to the bottom of the mask (top of his head) */}
            <path d="M 30 -10 L 30 70" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
            
            {/* Head shape (hanging upside down) */}
            <path d="M 12 0 C 12 55, 48 55, 48 0 Z" fill="#E8001C" stroke="#111" strokeWidth="2.5" />
            
            {/* Vertical Web Lines */}
            <path d="M 30 0 L 30 46" stroke="#111" strokeWidth="1.5" />
            <path d="M 21 0 Q 25 25 25 40" stroke="#111" strokeWidth="1" />
            <path d="M 39 0 Q 35 25 35 40" stroke="#111" strokeWidth="1" />
            
            {/* Horizontal Curved Web Lines */}
            <path d="M 12 18 Q 30 28 48 18" stroke="#111" strokeWidth="1" />
            <path d="M 12 32 Q 30 42 48 32" stroke="#111" strokeWidth="1" />
            
            {/* Upside Down Eyes */}
            {/* Left Eye: Straight edge tilts up towards center nose. Curved edge points "down" screen (forehead) */}
            <path d="M 14 24 L 28 16 Q 20 40 14 24 Z" fill="white" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Right Eye */}
            <path d="M 46 24 L 32 16 Q 40 40 46 24 Z" fill="white" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>

          {/* Web shot on click */}
          {isFiring && (
            <motion.div
              className="absolute top-1/2 left-[10px]"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 12, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 40,
                height: 3,
                background: "linear-gradient(to right, white, transparent)",
                transformOrigin: "left center",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
