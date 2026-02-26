"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SpiderWebBg from "./SpiderWebBg";

/* ─── Glitch accent span ────────────────────────────────── */
function GlitchWord({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [glitched, setGlitched] = useState(false);

  useEffect(() => {
    if (isInView && !glitched) {
      const t = setTimeout(() => setGlitched(true), 200);
      return () => clearTimeout(t);
    }
  }, [isInView, glitched]);

  return (
    <span
      ref={ref}
      className={glitched ? "spidey-glitch" : ""}
      style={{ color: "var(--theme-accent)", display: "inline-block" }}
    >
      {text}
    </span>
  );
}

/* ─── Parallax line ────────────────────────────────────── */
function ParallaxLine({
  segments,
  index,
  scrollYProgress,
}: {
  segments: { text: string; accent?: boolean }[];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  // Alternate lines move at slightly different speeds for depth
  const speed = index % 2 === 0 ? 0.04 : -0.04;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 0.85,
          delay: index * 0.07,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ x }}
        className="flex flex-wrap will-change-transform"
      >
        {segments.map((seg, i) =>
          seg.accent ? (
            <GlitchWord key={i} text={seg.text} />
          ) : (
            <span key={i} style={{ color: "#f0f0f0" }}>
              {seg.text}
            </span>
          ),
        )}
      </motion.div>
    </div>
  );
}

/* ─── Lines data ────────────────────────────────────────── */
const lines: { text: string; accent?: boolean }[][] = [
  [{ text: "CRAFTING DIGITAL" }],
  [{ text: "EXPERIENCES," }],
  [{ text: "PUSHING THE WEB" }],
  [{ text: "TO ITS\u00a0" }, { text: "LIMITS,", accent: true }],
  [{ text: "SHIPPING CODE" }],
  [{ text: "THAT\u00a0" }, { text: "SPEAKS.", accent: true }],
];

/* ─── Main section ─────────────────────────────────────── */
export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[var(--theme-bg)] px-6 md:px-16 lg:px-24 pt-32 pb-24 overflow-hidden"
    >
      {/* Spider web — stronger now */}
      <SpiderWebBg className="absolute inset-0" opacity={0.11} />

      {/* Radial red glow behind the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(232,0,28,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Vertical rule */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-6 md:left-16 lg:left-24 top-0 w-px h-24 bg-gradient-to-b from-transparent to-zinc-700 origin-top"
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center">
          <span
            className="text-[10px] font-bold tracking-widest text-zinc-400"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            CP
          </span>
        </div>
        <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">
          Portfolio — Est. 2026
        </span>
      </motion.div>

      {/* Main headline — each line has parallax drift + glitch on accent */}
      <h2
        className="font-bold leading-[0.92] tracking-tight uppercase"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "clamp(2.8rem, 8vw, 9rem)",
        }}
      >
        {lines.map((segments, i) => (
          <ParallaxLine
            key={i}
            segments={segments}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </h2>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
      >
        <p
          className="max-w-xs text-zinc-500 text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Developer based in India — building products that live at the edge of
          design and engineering.
        </p>
        <a
          href="#work"
          className="hover-glitch group flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-zinc-400 hover:text-white transition-colors"
        >
          <span className="w-8 h-px bg-zinc-700 group-hover:w-12 group-hover:bg-[var(--theme-accent)] transition-all duration-300" />
          View Work
        </a>
      </motion.div>
    </section>
  );
}
