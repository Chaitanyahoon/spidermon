"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring,
  useTime,
  useVelocity,
} from "framer-motion";
import SpiderWebBg from "./SpiderWebBg";
import { WantedPoster } from "./WantedPoster";
import { DailyBugleBadge } from "./DailyBugleBadge";

/**
 * Background Title
 */
function BackgroundTitle({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.3, 0.7], [0, 1]);
  const velocity = useVelocity(progress);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });

  const textShadow = useTransform(smoothVelocity, (v) => {
    const intensity = Math.min(Math.abs(v * 30), 50); // intense aberration on fast scroll
    if (intensity < 0.5) return "none";
    const dir = v > 0 ? 1 : -1;
    // Inject Spiderverse Neon Cyan/Magenta on fast scroll
    return `${dir * intensity}px ${dir * intensity * 0.2}px 0 var(--spiderverse-cyan), ${-dir * intensity}px ${-dir * intensity * 0.1}px 0 var(--spiderverse-magenta)`;
  });

  const copiesA = Array(8).fill("CHAITANYA");
  const copiesB = Array(8).fill("PATIL");

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden pointer-events-none gap-2"
      style={{ opacity }}
    >
      {/* Row 1 — CHAITANYA scrolls left */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          {[...copiesA, ...copiesA].map((name, i) => (
            <motion.span
              key={i}
              className="text-[13vw] font-bold leading-none tracking-tighter text-[#e8e8e8] select-none comic-title"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                paddingRight: "6vw",
                textShadow,
              }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — PATIL scrolls right (reverse) */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
        >
          {[...copiesB, ...copiesB].map((name, i) => (
            <motion.span
              key={i}
              className="text-[13vw] font-bold leading-none tracking-tighter select-none comic-title"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                paddingRight: "6vw",
                color: "var(--theme-accent)",
                opacity: 0.18,
                textShadow,
              }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Advanced Liquid Blob Generation
 * - Uses 12 control points for high resolution.
 * - Interpolates using Catmull-Rom -> Cubic Bezier for maximum smoothness.
 * - Perturbs points using multi-frequency sine waves driven by 'time'.
 */
function useLiquidBlob(
  cursorX: MotionValue<number>,
  cursorY: MotionValue<number>,
  size: MotionValue<number>,
) {
  const time = useTime(); // Continuous time stream

  const blobPath = useTransform(
    [cursorX, cursorY, size, time],
    ([x, y, s, t]: number[]) => {
      if (s === 0) return "M0 0";

      const points: { x: number; y: number }[] = [];
      const numPoints = 12; // Increase for smoother organic feel (12 = every 30 degrees)
      const angleStep = (Math.PI * 2) / numPoints;
      const baseRadius = s;

      // Generate points with organic noise
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep;

        // Organic Noise Function: Sum of sines
        // Vary frequency and speed per point to ensure irregularity
        const noise1 = Math.sin(t * 0.002 + i * 2) * 0.1; // Slow, large curve
        const noise2 = Math.cos(t * 0.005 + i * 3) * 0.15; // Medium speed
        const noise3 = Math.sin(t * 0.008 + i * 1.5) * 0.05; // Fast jitter (liquid tension)

        // Combine noise factors (total variation ~ +/- 30% of radius)
        const variation = 1 + noise1 + noise2 + noise3;
        const r = baseRadius * variation;

        // Rotational drift (optional): Rotate the whole blob slowly
        const rotationOffset = t * 0.0005;
        const finalAngle = angle + rotationOffset;

        points.push({
          x: x + Math.cos(finalAngle) * r,
          y: y + Math.sin(finalAngle) * r,
        });
      }

      // Spline Smoothing (Catmull-Rom approach for C2 continuity)
      // Function to get point at index with wrapping
      const getPt = (i: number) => points[(i + points.length) % points.length];

      let d = `M ${points[0].x} ${points[0].y}`;

      // For each point, create a cubic bezier to the next
      // We interpret the points as "on-curve" points.
      // A simple smoothing strategy is to calculate control points based on neighbors.
      for (let i = 0; i < points.length; i++) {
        const p0 = getPt(i - 1);
        const p1 = getPt(i); // Current
        const p2 = getPt(i + 1); // Next
        const p3 = getPt(i + 2);

        // Catmull-Rom to Cubic Bezier conversion factor
        const tension = 0.2; // 0 = sharp, 1 = super loose loops. 0.2 is "tight liquid"

        // Control Point 1 (for handling leaving p1)
        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.y + (p2.y - p0.y) * tension;

        // Control Point 2 (for handling arriving at p2)
        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.y - (p3.y - p1.y) * tension;

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }

      return d + " Z";
    },
  );

  return blobPath;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMasked, setIsMasked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Scroll Animations ---
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const borderRadius = useTransform(scrollYProgress, [0.6, 1], [0, 24]);

  // --- Hover / Blob Logic (Refined Liquid) ---
  const cursorX = useSpring(0, { stiffness: 120, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 120, damping: 25 });
  const blobSize = useSpring(0, { stiffness: 150, damping: 20 });
  const blobPath = useLiquidBlob(cursorX, cursorY, blobSize);

  // --- Action word transforms (always called — never conditional!) ---
  const thwipOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.5], [0, 1, 1, 0]);
  const thwipScale   = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const powOpacity   = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0]);
  const powScale     = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const bamOpacity   = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.95], [0, 1, 1, 0]);
  const bamScale     = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  // Card text fade at scroll end
  const cardTextOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const scaleFactorX = cardRef.current.offsetWidth / rect.width;
    const scaleFactorY = cardRef.current.offsetHeight / rect.height;
    cursorX.set(rawX * scaleFactorX);
    cursorY.set(rawY * scaleFactorY);
  };

  const handleMouseEnter = () => { setIsHovering(true); blobSize.set(160); };
  const handleMouseLeave = () => { setIsHovering(false); blobSize.set(0); };
  const handleTap = () => { setIsMasked((prev) => !prev); };

  // Use mounted-safe theme value to avoid hydration mismatch
  const activeTheme = mounted ? theme : "dark";

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full bg-[var(--theme-bg)]"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <BackgroundTitle progress={scrollYProgress} />

        {/* Full-viewport spider web — visible in bg when card scales down */}
        <SpiderWebBg className="absolute inset-0 z-[5]" opacity={0.18} />

        {/* Card Container */}
        <motion.div
          ref={cardRef}
          className="relative z-20 h-full w-full overflow-hidden bg-zinc-800 shadow-2xl cursor-none comic-border transition-all duration-300"
          style={{ scale, borderRadius }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTap}
        >
          {/* SVG Mask Definition */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <clipPath id="blobMask">
                <motion.path d={blobPath} />
              </clipPath>
            </defs>
          </svg>

          {/* Speed-Lines — radiates from blob origin in Miles-verse mode */}
          <div className="hero-speedlines" aria-hidden="true" />

          {/* Floating Action Words — immersive Spider-Verse elements (always rendered, opacity driven by scroll) */}
          {activeTheme === "theme-1610" && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              <motion.div
                style={{ top: "20%", left: "15%", opacity: thwipOpacity, scale: thwipScale }}
                className="action-word absolute"
              >
                THWIP!
              </motion.div>
              <motion.div
                style={{ top: "60%", right: "10%", opacity: powOpacity, scale: powScale, rotate: 15 }}
                className="action-word red absolute"
              >
                POW!
              </motion.div>
              <motion.div
                style={{ top: "15%", right: "20%", opacity: bamOpacity, scale: bamScale, rotate: -10 }}
                className="action-word absolute"
              >
                BAM!
              </motion.div>
            </div>
          )}

          <div className="absolute inset-0">
            <Image
              src={activeTheme === "theme-1610" ? "/Chaitanya_milesmorales.png" : "/Chaitanya.png"}
              alt="Portrait"
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
          </div>

          {/* Masked Overlay (Reveal) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath:
                isHovering || isMasked ? "url(#blobMask)" : "inset(100%)",
              WebkitClipPath:
                isHovering || isMasked ? "url(#blobMask)" : "inset(100%)",
            }}
          >
            <Image
              src={theme === "theme-1610" ? "/Chaitanya_milesmorales.png" : "/Chaitanya_spiderman.png"}
              alt="Spider Reveal"
              fill
              className="object-cover object-center"
              quality={100}
            />
          </div>

          {/* Spider web overlay on top of photo — the suit pattern */}
          <SpiderWebBg
            className="absolute inset-0 z-[3] pointer-events-none"
            opacity={0.14}
          />

          {/* Inner Gradient — stronger at bottom for text legibility */}
          <div className="absolute inset-0 z-[4] bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

          {/* Name Overlay — always visible at bottom-left */}
          <motion.div
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pointer-events-none z-30"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[9px] tracking-[0.4em] uppercase mb-1"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: theme === "theme-1610" ? "rgba(255,229,0,0.75)" : "#a1a1aa",
              }}
            >
              Your Friendly Neighborhood
            </p>
            <p
              className="text-[11px] tracking-[0.4em] uppercase mb-2"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--theme-accent)",
              }}
            >
              Full-Stack Developer
            </p>
            <h1
              className={`leading-none uppercase ${theme === "theme-1610" ? "hover-glitch" : ""}`}
              style={{
                fontFamily: theme === "theme-1610" ? "var(--font-bangers)" : "var(--font-space-grotesk)",
                fontSize: theme === "theme-1610" ? "clamp(2.5rem, 9vw, 8rem)" : "clamp(2.2rem, 9vw, 8rem)",
                fontWeight: theme === "theme-1610" ? 400 : 900,
                letterSpacing: theme === "theme-1610" ? "0.06em" : "-0.02em",
                color: "#f8fafc",
                transformOrigin: "bottom left",
                transform: theme === "theme-1610" ? "rotate(-3deg)" : "none",
                textShadow: theme === "theme-1610" ? "5px 5px 0 #000, 2px 0 var(--spiderverse-cyan), -2px 0 var(--spiderverse-magenta)" : "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              Chaitanya
              <br />
              <span style={{
                color: "var(--theme-accent)",
                fontFamily: theme === "theme-1610" ? "var(--font-graffiti)" : undefined,
                textShadow: theme === "theme-1610" ? "5px 5px 0 #000, 2px 0 var(--spiderverse-cyan), -2px 0 var(--spiderverse-magenta)" : "0 0 20px rgba(232,0,28,0.5)",
                display: "inline-block",
                transform: theme === "theme-1610" ? "translateY(-5px) rotate(-2deg)" : "none"
              }}>Patil.</span>
            </h1>

            {/* Resume Download Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 inline-block pointer-events-auto"
            >
              {activeTheme === "theme-1610" ? <WantedPoster /> : <DailyBugleBadge />}
            </motion.div>
          </motion.div>

          {/* Scroll cue (Hidden on mobile to save vertical space) */}
          <motion.div
            className="absolute bottom-8 right-8 md:bottom-10 md:right-10 flex flex-col items-center gap-2 pointer-events-none transition-all duration-300 hidden md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-[9px] tracking-[0.3em] uppercase text-zinc-500 mb-1"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Scroll
              </span>
              <motion.div
                className="w-px h-12 bg-zinc-700 origin-top"
                animate={{ scaleY: [0, 1, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Card Text Label — fades in near end of scroll */}
          <motion.div
            className="absolute top-8 left-6 md:bottom-8 md:left-8 md:top-auto text-white pointer-events-none opacity-0 md:opacity-100 hidden md:block"
            style={{ opacity: cardTextOpacity }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-zinc-400">
              Selected Works
            </p>
            <p className="text-xl font-bold">2024 — 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
