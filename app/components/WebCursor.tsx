"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WebShot = {
  id: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
};

export function WebCursor() {
  const [shots, setShots] = useState<WebShot[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Don't shoot webs if clicking on a button or link
      if ((e.target as HTMLElement).closest("button, a")) return;

      const newShot: WebShot = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        // Shoot from bottom corners randomly
        originX: Math.random() > 0.5 ? 0 : window.innerWidth,
        originY: window.innerHeight,
      };

      setShots((prev) => [...prev, newShot]);

      // Remove shot after animation finishes (1.2s total to be safe)
      setTimeout(() => {
        setShots((prev) => prev.filter((s) => s.id !== newShot.id));
      }, 1200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  if (!isReady) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          transform: `translate(${cursorPos.x - 6}px, ${cursorPos.y - 6}px)`,
          backgroundColor: "white",
        }}
      />
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[99]">
        <AnimatePresence>
          {shots.map((shot) => (
            <motion.line
              key={shot.id}
              x1={shot.originX}
              y1={shot.originY}
              x2={shot.x}
              y2={shot.y}
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                pathLength: { duration: 0.2, ease: "easeOut" },
                opacity: { duration: 0.8, delay: 0.3, ease: "easeIn" },
              }}
            />
          ))}
        </AnimatePresence>
      </svg>
      {/* Glitch circle on impact */}
      <AnimatePresence>
        {shots.map((shot) => (
          <motion.div
            key={`impact-${shot.id}`}
            className="fixed w-8 h-8 rounded-full border border-white opacity-50 pointer-events-none z-[100]"
            style={{ left: shot.x - 16, top: shot.y - 16 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
