"use client";

import { motion } from "framer-motion";

const NEWS_ITEMS = [
  "SPIDER-MENACE SPOTTED IN THE CITY!",
  "NEW NEXT.JS APP DEPLOYED FASTER THAN A SPEEDING WEB",
  "IS CHAITANYA PATIL THE BEST FULL-STACK DEVELOPER?",
  "LOCAL HERO FIXES 99 BUGS IN PRODUCTION",
  "OSBORN INDUSTRIES STOCK PLUMMETS AFTER LATEST REACT UPDATE",
  "DAILY BUGLE EXCLUSIVE: HOW TO BUILD A MODERN PORTFOLIO",
  "AVENGERS TOWER STILL UNDER CONSTRUCTION",
  "MYSTERIO CLAIMS CREDIT FOR CASCADING STYLE SHEETS",
];

export default function MarqueeTicker() {
  return (
    <div className="comic-ticker w-full bg-[var(--theme-accent)] py-3 overflow-hidden border-y border-black relative z-20 flex flex-col justify-center">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 30, // slow, continuous ticker
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Double array to create seamless infinite loop */}
          {[...NEWS_ITEMS, ...NEWS_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              <span
                className="comic-ticker-text text-black font-black text-sm md:text-base tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-bangers)" }}
              >
                {item}
              </span>
              {/* Separator icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
