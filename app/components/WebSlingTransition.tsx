"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

export function WebSlingTransition() {
  const [slingData, setSlingData] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleSling = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId: string; x: number; y: number }>;
      const { targetId, x, y } = customEvent.detail;
      
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      // 1. Trigger the visual web shoot
      setSlingData({ x, y });

      // Calculate target scroll position (accounting for fixed navbar)
      const targetY = targetEl.getBoundingClientRect().top + window.scrollY - 100;

      // 2. Wait for web to "hit" the bottom, then yank the camera
      setTimeout(() => {
        animate(window.scrollY, targetY, {
          type: "spring",
          stiffness: 150,
          damping: 25,
          mass: 1.2,
          onUpdate: (latest) => window.scrollTo(0, latest),
          onComplete: () => {
            // Give it a tiny bit of time to settle before removing the thread
            setTimeout(() => setSlingData(null), 300);
          }
        });
      }, 300); // 300ms matches the line drawing duration
    };

    window.addEventListener("web-sling", handleSling);
    return () => window.removeEventListener("web-sling", handleSling);
  }, []);

  return (
    <AnimatePresence>
      {slingData && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[100]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg className="w-full h-full" style={{ overflow: "visible" }}>
            <motion.line
              x1={slingData.x}
              y1={slingData.y}
              // Aim for bottom center of the screen
              x2={typeof window !== "undefined" ? window.innerWidth / 2 : 500}
              y2={typeof window !== "undefined" ? window.innerHeight + 200 : 1000}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}
            />
          </svg>
          
          {/* Action Impact Star / Pow effect at origin */}
          <motion.div 
            className="absolute rounded-full bg-white blur-md"
            style={{ 
              left: slingData.x - 20, 
              top: slingData.y - 20,
              width: 40,
              height: 40
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
