"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const headlines = [
  {
    tag: "EXCLUSIVE",
    headline: "WEB-SLINGER DEVELOPER STRIKES AGAIN — Full-Stack App Deployed in Record Time",
    byline: "BY STAFF REPORTER",
    sub: "Sources confirm the mysterious developer known only as 'Chaitanya' has shipped another production-ready application, baffling colleagues with superhuman efficiency.",
  },
  {
    tag: "TECH",
    headline: "LOCAL DEV MASTERS REACT, NEXT.JS & NODE — Experts Baffled by Skill Set",
    byline: "BY J. JONAH JAMESON",
    sub: "Industry veterans are calling it 'unprecedented'. The full-stack arsenal reportedly includes TypeScript, Supabase, Tailwind, and more.",
  },
  {
    tag: "BREAKING",
    headline: "CERTIFIED! Developer Achieves Industry Recognition — Villains Despair",
    byline: "BY DAILY BUGLE STAFF",
    sub: "A new certification has been added to the growing wall of achievements. Employers reportedly queuing around the block.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function DailyBugle() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isMiles = mounted && theme === "theme-1610";

  return (
    <section
      id="daily-bugle"
      className="relative bg-[var(--theme-bg)] py-24 px-4 overflow-hidden border-t border-zinc-800/60"
      aria-label="Daily Bugle - Latest News"
    >
      {/* Halftone texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 border-b-4 border-[var(--theme-accent)] pb-6"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4 text-[10px] text-zinc-500 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}>
            <span>New York, NY</span>
            <span>Est. 1962</span>
            <span>★ Extra Edition ★</span>
          </div>

          {/* The Daily Bugle masthead */}
          <h2
            className={`leading-none uppercase text-white ${isMiles ? "comic-title-animated" : ""}`}
            style={{
              fontFamily: isMiles ? "var(--font-bangers)" : "var(--font-space-grotesk)",
              fontSize: "clamp(3rem, 9vw, 7rem)",
              fontWeight: 900,
              letterSpacing: isMiles ? "0.04em" : "-0.02em",
              textShadow: isMiles
                ? "4px 4px 0 #000"
                : "0 2px 20px rgba(232,0,28,0.4)",
            }}
          >
            The Daily Bugle
          </h2>
          <p
            className="text-[var(--theme-accent)] tracking-[0.4em] uppercase mt-1 text-xs"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            "Selling Papers, Slandering Spider-Man Since 1962"
          </p>
        </motion.div>

        {/* Headlines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-700/60">
          {headlines.map((item, i) => (
            <motion.article
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`
                relative p-6 group cursor-default
                ${i < 2 ? "md:border-r border-b md:border-b-0 border-zinc-700/60" : "border-b border-zinc-700/60 md:border-b-0"}
                hover:bg-white/[0.02] transition-colors duration-300
                ${isMiles ? "comic-panel" : ""}
              `}
            >
              {/* Column number */}
              <span
                className="absolute top-3 right-4 text-zinc-700 text-[10px] tracking-widest"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                COL. {i + 1}
              </span>

              {/* Tag */}
              <span
                className={`inline-block text-[10px] tracking-[0.3em] uppercase mb-3 px-2 py-0.5 font-bold
                  ${isMiles
                    ? "bg-[var(--comic-yellow)] text-black comic-tag"
                    : "bg-[var(--theme-accent)] text-white"
                  }`}
                style={{ fontFamily: isMiles ? "var(--font-bangers)" : "var(--font-space-grotesk)" }}
              >
                {item.tag}
              </span>

              {/* Separator line */}
              <div className="w-full h-px bg-zinc-700/60 mb-3" />

              {/* Headline */}
              <h3
                className={`text-white leading-tight mb-3 group-hover:text-[var(--theme-accent)] transition-colors duration-300
                  ${isMiles ? "comic-title text-xl" : "text-lg font-black uppercase"}
                `}
                style={{
                  fontFamily: isMiles ? "var(--font-bangers)" : "var(--font-space-grotesk)",
                  letterSpacing: isMiles ? "0.04em" : "-0.01em",
                }}
              >
                {item.headline}
              </h3>

              {/* Byline */}
              <p
                className="text-zinc-600 text-[9px] tracking-[0.25em] uppercase mb-3 italic"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.byline}
              </p>

              {/* Sub-content */}
              <p
                className="text-zinc-400 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.sub}
              </p>

              {/* Bottom divider with page reference */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span
                  className="text-zinc-600 text-[9px] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Continued on Page {i + 2}
                </span>
                <span className="text-[var(--theme-accent)] text-lg">⬥</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-4 text-zinc-600 text-[9px] tracking-widest uppercase pt-3 border-t border-zinc-800"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span>© The Daily Bugle — All Rights Reserved</span>
          <span className="text-[var(--theme-accent)] font-bold">
            Spider-Man Still At Large
          </span>
          <span>Price: Your Attention</span>
        </motion.div>
      </div>
    </section>
  );
}
