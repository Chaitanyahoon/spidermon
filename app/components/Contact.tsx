"use client";

import { motion } from "framer-motion";
import SpiderWebBg from "./SpiderWebBg";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[var(--theme-bg)] border-t border-zinc-800/60 overflow-hidden"
    >
      {/* Lime glow blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(232,0,28,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Full-section spider web */}
      <SpiderWebBg className="absolute inset-0" opacity={0.1} />

      {/* Spider web corner — bottom-left */}
      <svg
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        viewBox="0 0 256 256"
        fill="none"
        style={{ opacity: 0.12, transform: "rotate(180deg)" }}
        aria-hidden="true"
      >
        <line
          x1="256"
          y1="0"
          x2="0"
          y2="0"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <line
          x1="256"
          y1="0"
          x2="0"
          y2="60"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <line
          x1="256"
          y1="0"
          x2="0"
          y2="140"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <line
          x1="256"
          y1="0"
          x2="80"
          y2="176"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <line
          x1="256"
          y1="0"
          x2="120"
          y2="256"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <line
          x1="256"
          y1="0"
          x2="196"
          y2="256"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <line
          x1="256"
          y1="0"
          x2="256"
          y2="256"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <path
          d="M 192 0 A 64 64 0 0 1 256 64"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <path
          d="M 128 0 A 128 128 0 0 1 256 128"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <path
          d="M 64 0 A 192 192 0 0 1 256 192"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
        <path
          d="M 16 0 A 240 240 0 0 1 256 240"
          stroke="var(--theme-accent)"
          strokeWidth="0.8"
        />
      </svg>

      <div className="relative px-6 md:px-16 lg:px-24 py-32 flex flex-col items-center text-center">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.35em] uppercase text-zinc-600 mb-8 italic"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          &ldquo;With great power comes great responsibility.&rdquo;
        </motion.p>

        {/* Big headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] uppercase text-white mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Let&apos;s
          <br />
          <span style={{ color: "var(--theme-accent)" }}>Talk.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-zinc-400 text-base max-w-md leading-relaxed mb-12"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Open to full-time roles, freelance projects, and interesting
          collaborations. Drop me a line — I reply fast.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="mailto:chaitanyapatil700@gmail.com"
            className="group flex items-center gap-3 bg-[var(--theme-accent)] text-black font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Send an Email
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/chaitanyapatil700"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-zinc-700 text-zinc-300 font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:border-zinc-400 hover:text-white transition-colors duration-300"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            LinkedIn
          </a>
        </motion.div>

        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-2 mt-10"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
          <span
            className="text-[11px] tracking-widest uppercase text-zinc-500"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Available for opportunities
          </span>
        </motion.div>
      </div>
    </section>
  );
}
