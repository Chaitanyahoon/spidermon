"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { SpiderSenseRipple } from "./SpiderSenseRipple";

const skills = [
  {
    id: "01",
    category: "Languages",
    items: ["Java", "C#", "JavaScript", "TypeScript", "PHP", "C++"],
    accent: false,
  },
  {
    id: "02",
    category: "Frontend",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
    accent: true,
  },
  {
    id: "03",
    category: "Backend",
    items: ["Spring Boot", ".NET Core", "Hibernate", "JPA", "REST APIs"],
    accent: false,
  },
  {
    id: "04",
    category: "Database & Cloud",
    items: ["MySQL", "SQL Server", "MongoDB", "Firestore", "Firebase"],
    accent: false,
  },
  {
    id: "05",
    category: "DevOps",
    items: ["Docker", "Linux", "CI/CD", "Vercel", "Netlify"],
    accent: false,
  },
  {
    id: "06",
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Visual Studio"],
    accent: false,
  },
  {
    id: "07",
    category: "Testing",
    items: ["Selenium WebDriver", "API Testing"],
    accent: false,
  },
  {
    id: "08",
    category: "Architecture",
    items: ["OOP", "SOLID", "MVC", "Repository Pattern", "Clean Architecture", "DSA"],
    accent: true,
  },
];

/* ── Earth-1610 Comic Skill Row ─────────────────────────── */
function SkillRow1610({
  skill,
  index,
}: {
  skill: typeof skills[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "backOut" }}
      className="break-inside-avoid mb-6 relative overflow-hidden"
    >
      <div 
        className={`relative z-10 w-full h-full p-6 border-4 border-black transition-transform duration-300 hover:-translate-y-2
          ${skill.accent ? "bg-[#e53e3e] shadow-[8px_8px_0_#000]" : "bg-[#fffde7] shadow-[6px_6px_0_#000]"}
        `}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-1">
            <h3 
              className={`text-xl md:text-2xl uppercase font-black tracking-widest leading-none mb-1
                ${skill.accent ? "text-white" : "text-black"}
              `}
              style={{ fontFamily: "var(--font-bangers)", textShadow: skill.accent ? "2px 2px 0 #000" : "none" }}
            >
              {skill.category}
            </h3>
            <span 
              className="text-xs font-bold font-mono tracking-[0.2em]"
              style={{ color: skill.accent ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)", fontFamily: "var(--font-space-grotesk)" }}
            >
              {skill.id}
            </span>
          </div>
        </div>

        {/* Tags Array */}
        <div className="flex flex-wrap gap-2">
          {skill.items.map((item) => (
            <span 
              key={item} 
              className={`text-xs md:text-sm font-bold px-3 py-1.5 border-2 border-black tracking-wider uppercase
                ${skill.accent ? "bg-white text-black shadow-[3px_3px_0_#000]" : "bg-[#fcd34d] text-black shadow-[3px_3px_0_#000]"}
              `}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {item}
            </span>
          ))}
        </div>
        
        {/* Halftone Overlay for Panel */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply z-0"
          style={{ backgroundImage: `radial-gradient(black 1px, transparent 1px)`, backgroundSize: "6px 6px" }}
        />
      </div>
    </motion.div>
  );
}

/* ── Earth-616 Skill Card (Bento grid) ──────────────────── */
function SkillCard616({
  skill,
  index,
}: {
  skill: typeof skills[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between p-6 md:p-8 overflow-hidden transition-all duration-500 rounded-3xl
        bg-gradient-to-br from-zinc-900/90 to-[#121c2d]/90 
        border border-white/5 hover:border-white/15
        shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_40px_-20px_rgba(0,0,0,0.5)]`}
    >
      {/* Soft radial glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,rgba(29,53,87,0.4)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Faint category number */}
        <span
          aria-hidden="true"
          className="absolute -top-4 right-0 text-[4rem] md:text-[5rem] font-bold leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:opacity-80"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: skill.accent ? "rgba(232,0,28,0.08)" : "rgba(255,255,255,0.02)",
          }}
        >
          {skill.id}
        </span>

        {/* Category label */}
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-6"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: skill.accent ? "var(--theme-accent)" : "#a1a1aa",
          }}
        >
          {skill.category}
        </p>

        {/* Pill tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-6">
          {skill.items.map((item) => (
            <span
              key={item}
              className={`text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-300 ${skill.accent
                ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border-[var(--theme-accent)]/20"
                : "bg-white/5 text-zinc-300 border-white/5"
                }`}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const isMiles = theme === "theme-1610";

  return (
    <section
      id="skills"
      className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-24"
    >
      {/* Header — theme-aware */}
      {isMiles ? (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="section-panel-rule mb-6"
        >
          <span className="panel-label">01 / SKILLS</span>
          <div className="panel-line" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-6 mb-6"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            01 / Skills
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className={`text-5xl md:text-7xl font-bold text-white leading-none uppercase ${isMiles ? "tracking-wide" : ""}`}
          style={{ 
            fontFamily: isMiles ? "var(--font-bangers)" : "var(--font-space-grotesk)",
            textShadow: isMiles ? "4px 4px 0 #000" : "none"
          }}
        >
          Technical
          <br />
          <span style={{ color: "var(--theme-accent)" }}>Stack.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-zinc-500 text-sm leading-relaxed md:text-right font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Across the full stack — from pixels to packets, schema to server.
        </motion.p>
      </div>

      {/* Earth-1610: Masonry style panel layout */}
      {isMiles ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {skills.map((skill, i) => (
            <SkillRow1610 key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      ) : (
        /* ── Earth-616: Premium Bento Grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-6 lg:gap-8 mt-8">
          {skills.map((skill, i) => (
            <SkillCard616 key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
