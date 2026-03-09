"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SpiderParticleBg from "./SpiderParticleBg";
import SpiderWebBg from "./SpiderWebBg";

export default function Contact() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isMiles = mounted && theme === "theme-1610";

  return (
    <section
      id="contact"
      className="relative bg-[var(--theme-bg)] border-t border-zinc-800/60 py-32 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(232,0,28,0.1) 0%, transparent 60%)",
        }}
      />

      {/* Spider Web Backgrounds */}
      <SpiderWebBg className="absolute inset-0 z-0" opacity={0.15} />
      <SpiderParticleBg
        className="absolute inset-0 z-[1]"
        opacity={0.5}
        particleCount={30}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 mt-10">
        {/* Top central web strand dropping down to the main box */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[2px] h-[150px] bg-gradient-to-b from-transparent via-white/50 to-white/90 shadow-[0_0_8px_white]" />

        {/* Conditional Layouts based on Universe */}
        {isMiles ? (
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative bg-black comic-panel overflow-hidden group"
          >
            {/* Top red accent ribbon stripe */}
            <div
              className="absolute top-0 left-0 right-0 h-5 flex items-center px-4 gap-2"
              style={{ background: "#e23636" }}
            >
              <span
                className="text-[10px] font-black tracking-[0.3em] uppercase text-white"
                style={{ fontFamily: "var(--font-bangers)" }}
              >
                ● EARTH-1610 ● MILES MORALES
              </span>
            </div>

            <div className="pt-10 pb-8 px-10 md:px-16">
              {/* Status badge */}
              <div className="mb-8 flex justify-center relative z-10">
                <span
                  className="comic-badge inline-flex items-center gap-2 px-5 py-2 text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Spider-Sense Tingling
                </span>
              </div>

              <h2
                className="text-5xl md:text-7xl font-black uppercase text-white mb-6 leading-[1] comic-title relative z-10"
                style={{ fontFamily: "var(--font-graffiti), var(--font-bangers)" }}
              >
                Looking for a <br />
                <span style={{ color: "var(--theme-accent)" }}>
                  Friendly Neighborhood Dev?
                </span>
              </h2>

              {/* Plain bordered text box */}
              <div
                className="border border-white/20 text-white mb-10 p-6 transform -rotate-1 mx-auto max-w-2xl relative z-10"
              >
                <p
                  className="text-xl md:text-2xl leading-relaxed"
                  style={{ fontFamily: "var(--font-graffiti), var(--font-bangers)", color: "rgba(255,255,255,0.85)" }}
                >
                  Got a project that needs saving? Or a team that needs a
                  web-slinger? I&apos;m currently swinging into new full-time roles,
                  freelance gigs, and exciting collaborations!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-20">
                <a
                  href="mailto:chaitanyapatil700@gmail.com"
                  aria-label="Send an email to Chaitanya Patil"
                  className="comic-btn-primary w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5"
                >
                  Shoot a Web
                </a>

                <a
                  href="https://linkedin.com/in/chaitanyapatil700"
                  target="_blank"
                  aria-label="Visit Chaitanya Patil's LinkedIn profile"
                  rel="noopener noreferrer"
                  className="comic-btn-secondary w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative bg-black/60 backdrop-blur-xl border border-zinc-700/50 p-10 md:p-16 rounded-3xl shadow-2xl overflow-hidden group"
          >
            {/* Subtle Spider watermark inside the card */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.06]">
              <svg width="300" height="300" viewBox="0 0 100 100" fill="white">
                <path d="M50 0 L55 20 L70 30 L60 50 L80 60 L60 70 L55 100 L50 80 L45 100 L40 70 L20 60 L40 50 L30 30 L45 20 Z" />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 flex justify-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--theme-accent)]/80 text-[var(--theme-accent)] text-xs md:text-sm font-bold tracking-widest uppercase bg-[var(--theme-accent)]/10">
                <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-ping" />
                Spider-Sense Tingling
              </span>
            </motion.div>

            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-[1.1]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Looking for a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-accent)] to-[#ff4d4d]">
                Friendly Neighborhood Developer?
              </span>
            </h2>

            <p
              className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Got a project that needs saving? Or a team that needs a web-slinger?
              I&apos;m currently swinging into new full-time roles, freelance gigs, and
              exciting collaborations. Send a signal!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-20">
              <a
                href="mailto:chaitanyapatil700@gmail.com"
                aria-label="Send an email to Chaitanya Patil"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[var(--theme-accent)] text-black font-black text-sm md:text-base tracking-[0.2em] uppercase px-10 py-5 rounded-full hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                Shoot a Web
              </a>

              <a
                href="https://linkedin.com/in/chaitanyapatil700"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Chaitanya Patil's LinkedIn profile"
                className="w-full sm:w-auto flex items-center justify-center gap-3 border-2 border-zinc-700 text-white font-bold text-sm tracking-[0.2em] uppercase px-10 py-5 rounded-full hover:border-white hover:bg-white/5 transition-all duration-300"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
