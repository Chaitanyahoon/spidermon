"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";

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
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`p-5 comic-panel ${skill.accent ? "accent-panel" : ""}`}
    >
      <div className="flex items-start gap-4">
        {/* Number */}
        <span
          className="text-2xl font-bold leading-none shrink-0 mt-0.5 comic-title"
          style={{
            fontFamily: "var(--font-bangers)",
            color: skill.accent ? "rgba(255,255,255,0.3)" : "rgba(255,229,0,0.35)",
            letterSpacing: "0.04em",
          }}
        >
          {skill.id}
        </span>

        <div className="flex-1 min-w-0">
          {/* Category */}
          <p
            className="text-[11px] font-bold uppercase mb-3"
            style={{
              fontFamily: "var(--font-bangers)",
              letterSpacing: "0.25em",
              color: skill.accent ? "rgba(255,255,255,0.85)" : "#FFE500",
            }}
          >
            {skill.category}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <span key={item} className="comic-tag">{item}</span>
            ))}
          </div>
        </div>
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
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between p-6 overflow-hidden bg-gradient-to-br from-zinc-900/40 to-transparent border border-zinc-800/80 rounded-xl transition-all duration-300 hover:bg-zinc-800/30 hover:border-zinc-700 ${skill.accent ? 'hover:shadow-[0_0_25px_rgba(232,0,28,0.1)]' : 'hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]'}`}
    >
      {/* Faint category number */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-5 text-[3.5rem] font-bold leading-none select-none pointer-events-none transition-colors duration-300"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: skill.accent ? "rgba(232,0,28,0.12)" : "rgba(255,255,255,0.03)",
        }}
      >
        {skill.id}
      </span>

      {/* Category label */}
      <p
        className="text-[10px] tracking-[0.3em] uppercase mb-4"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: skill.accent ? "var(--theme-accent)" : "#52525b",
        }}
      >
        {skill.category}
      </p>

      {/* Pill tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {skill.items.map((item) => (
          <span
            key={item}
            className={`text-xs tracking-wide px-3 py-1.5 rounded-full border transition-all duration-300 ${skill.accent
              ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border-[var(--theme-accent)]/20 group-hover:border-[var(--theme-accent)]/40 group-hover:bg-[var(--theme-accent)]/15"
              : "bg-zinc-800/50 text-zinc-300 border-zinc-700/50 group-hover:border-zinc-600 group-hover:bg-zinc-800/80 group-hover:text-white"
              }`}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {item}
          </span>
        ))}
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
          className="text-5xl md:text-7xl font-bold text-white leading-none uppercase comic-title"
          style={{ fontFamily: isMiles ? "var(--font-graffiti), var(--font-bangers)" : "var(--font-space-grotesk)" }}
        >
          Technical
          <br />
          <span style={{ color: "var(--theme-accent)" }}>Stack.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-zinc-500 text-sm leading-relaxed md:text-right"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Across the full stack — from pixels to packets, schema to server.
        </motion.p>
      </div>

      {/* Earth-1610: Clean 2-column list layout */}
      {isMiles ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <SkillRow1610 key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      ) : (
        /* Earth-616: Original bento grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(160px,auto)] gap-4">
          {skills.map((skill, i) => (
            <SkillCard616 key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
