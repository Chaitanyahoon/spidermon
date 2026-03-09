"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";

const projects = [
  {
    id: "01",
    title: "StreetBite",
    category: "Food Tech",
    year: "2024",
    description:
      "Street food discovery platform with location-based vendor search, JWT auth, vendor dashboards, menu management, and real-time analytics. Deployed on Vercel + Render.",
    tags: ["Spring Boot", "Next.js", "Firebase", "Tailwind"],
    size: "featured",
    accent: true,
    href: "https://streetbitego.vercel.app/",
    githubHref: "https://github.com/Chaitanyahoon/StreetBite",
  },
  {
    id: "02",
    title: "Focus Arena",
    category: ".NET Full Stack",
    year: "2025",
    description:
      "Real-time gamified productivity platform with chat, leaderboards, and task mechanics via SignalR. Clean Architecture + Docker.",
    tags: ["ASP.NET Core 8", "React", "SignalR", "MySQL"],
    size: "side",
    accent: false,
    href: "https://github.com/Chaitanyahoon",
    githubHref: "https://github.com/Chaitanyahoon",
  },
  {
    id: "03",
    title: "VirtuSpace",
    category: "AR / WebXR",
    year: "2025",
    description:
      "WebAR furniture visualization platform. Users place and view furniture in real space using augmented reality — transforming how people shop for interiors.",
    tags: ["Next.js", "Three.js", "WebXR", "TypeScript"],
    size: "grid",
    accent: false,
    href: "https://virtuspace-six.vercel.app/",
    githubHref: "https://github.com/Chaitanyahoon/Virtuspace",
  },
  {
    id: "04",
    title: "Planthesia",
    category: "Productivity",
    year: "2025",
    description:
      "Time and task management platform. Calculates insights, streamlines workflow, and tracks progress to improve work efficiency.",
    tags: ["React", "Express", "PostgreSQL", "Redis"],
    size: "grid",
    accent: false,
    href: "https://planthesia.vercel.app/dashboard",
    githubHref: "https://github.com/Chaitanyahoon/Planthesia",
  },
  {
    id: "05",
    title: "GhostFrame",
    category: "Game Dev",
    year: "2024",
    description:
      "Single-player glitch horror web game with psychological puzzles and code-based riddles in a haunted digital world.",
    tags: ["Next.js", "Canvas API", "CSS Effects"],
    size: "grid",
    accent: true,
    href: "https://ghostframe-seven.vercel.app",
    githubHref: "https://github.com/Chaitanyahoon/ghostframe",
  },
];

/* ── Arrow button ── */
function ArrowLink({ href, dark = false }: { href: string; dark?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="w-9 h-9 flex items-center justify-center border transition-all duration-200"
        style={{
          borderColor: dark ? "rgba(0,0,0,0.4)" : "#3f3f46",
          background: "transparent",
        }}
        whileHover={{ scale: 1.1, backgroundColor: dark ? "rgba(0,0,0,0.15)" : "#FFE500", borderColor: dark ? "#000" : "#FFE500" }}
      >
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
          <path d="M1 11L11 1M11 1H4M11 1V8" stroke={dark ? "#fff" : "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </a>
  );
}

function ProjectCard616({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  const isFeatured = project.size === "featured";
  const isSide = project.size === "side";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between h-full p-6 overflow-hidden cursor-pointer transition-all duration-300 bg-zinc-900/40 border-x border-b border-zinc-800/80 hover:bg-zinc-800/40 hover:border-zinc-700 rounded-sm
        ${isFeatured ? "md:col-span-2 lg:col-span-2 min-h-[380px]" : isSide ? "md:col-span-1 lg:col-span-1 min-h-[380px]" : "md:col-span-1 lg:col-span-1 min-h-[300px]"}
        ${project.accent ? "border-t-[3px] border-t-[var(--theme-accent)]" : "border-t-[3px] border-t-zinc-800/80 hover:border-t-zinc-600"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-[10px] tracking-[0.3em] uppercase mb-2 ${project.accent ? 'text-[var(--theme-accent)]' : 'text-zinc-500'}`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {project.category} — {project.year}
          </p>
          <h3 className={`${isFeatured ? 'text-4xl md:text-5xl' : 'text-xl md:text-2xl'} font-bold text-white leading-tight transition-colors group-hover:text-zinc-200`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {project.title}
          </h3>
        </div>
        <span className={`${isFeatured ? 'text-[6rem] -mt-6' : 'text-[3.5rem]'} font-bold leading-none select-none pointer-events-none shrink-0 transition-colors duration-300`} style={{ fontFamily: "var(--font-space-grotesk)", color: project.accent ? "rgba(232,0,28,0.15)" : "rgba(255,255,255,0.06)" }}>
          {project.id}
        </span>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mt-4" style={{ fontFamily: "var(--font-inter)" }}>
        {project.description}
      </p>

      <div className="flex items-end justify-between mt-auto pt-6 border-t border-zinc-800/80">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 font-medium" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {tag}
              {/* add dot separator if not last item */}
              <span className="text-zinc-700 ml-2 mr-0 inline-block align-middle">&bull;</span>
            </span>
          ))}
        </div>
        <ArrowLink href={project.href} />
      </div>
    </motion.div>
  );
}

/* ── Earth-1610 Featured Panel (StreetBite) ──────────────── */
function FeaturedPanel({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="comic-panel accent-panel relative flex flex-col justify-between p-7 overflow-hidden"
      style={{ minHeight: "380px" }}
    >
      {/* Giant bg number */}
      <span
        aria-hidden="true"
        className="absolute bottom-4 right-5 leading-none select-none pointer-events-none"
        style={{ fontFamily: "var(--font-bangers)", fontSize: "10rem", color: "rgba(255,255,255,0.07)", lineHeight: 1 }}
      >
        {project.id}
      </span>

      <div>
        {/* Category + Year */}
        <div className="flex items-center gap-3 mb-4">
          <span className="comic-tag" style={{ background: "rgba(0,0,0,0.35)", color: "#FFE500", borderColor: "rgba(0,0,0,0.5)" }}>
            {project.category}
          </span>
          <span style={{ fontFamily: "var(--font-bangers)", fontSize: "0.8rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.55)" }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-graffiti), var(--font-bangers)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            letterSpacing: "0.04em",
            color: "#fff",
            lineHeight: 1,
            textShadow: "3px 3px 0 rgba(0,0,0,0.4)",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.82)" }}>
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/20">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="comic-tag" style={{ background: "rgba(0,0,0,0.35)", color: "#FFE500", borderColor: "rgba(0,0,0,0.5)" }}>
              {tag}
            </span>
          ))}
        </div>
        <ArrowLink href={project.href} dark />
      </div>
    </motion.div>
  );
}

/* ── Earth-1610 Side Panel (Focus Arena) ─────────────────── */
function SidePanel({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="comic-panel relative flex flex-col justify-between p-6 overflow-hidden"
      style={{ minHeight: "380px" }}
    >
      {/* Giant bg number */}
      <span
        aria-hidden="true"
        className="absolute bottom-3 right-4 leading-none select-none pointer-events-none"
        style={{ fontFamily: "var(--font-bangers)", fontSize: "8rem", color: "rgba(255,229,0,0.07)", lineHeight: 1 }}
      >
        {project.id}
      </span>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="comic-tag">{project.category}</span>
          <span style={{ fontFamily: "var(--font-bangers)", fontSize: "0.8rem", letterSpacing: "0.2em", color: "rgba(255,229,0,0.55)" }}>
            {project.year}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-graffiti), var(--font-bangers)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            letterSpacing: "0.04em",
            color: "#f0f0f0",
            lineHeight: 1.05,
            textShadow: "2px 2px 0 #000",
          }}
        >
          {project.title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.72)" }}>
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,229,0,0.15)" }}>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="comic-tag">{tag}</span>
          ))}
        </div>
        <ArrowLink href={project.href} />
      </div>
    </motion.div>
  );
}

/* ── Earth-1610 Grid Panel (small cards row) ──────────────── */
function GridPanel({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`comic-panel ${project.accent ? "accent-panel" : ""} relative flex flex-col justify-between p-5 overflow-hidden`}
      style={{ minHeight: "220px" }}
    >
      {/* Mini number badge */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-4 leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-bangers)",
          fontSize: "4.5rem",
          color: project.accent ? "rgba(255,255,255,0.1)" : "rgba(255,229,0,0.08)",
          lineHeight: 1,
        }}
      >
        {project.id}
      </span>

      <div>
        <span
          className="comic-tag mb-3 inline-block"
          style={project.accent ? { background: "rgba(0,0,0,0.35)", color: "#FFE500", borderColor: "rgba(0,0,0,0.5)" } : {}}
        >
          {project.category}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-graffiti), var(--font-bangers)",
            fontSize: "2.25rem",
            letterSpacing: "0.04em",
            color: project.accent ? "#fff" : "#f0f0f0",
            lineHeight: 1.1,
            textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
          }}
        >
          {project.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed line-clamp-2" style={{ fontFamily: "var(--font-inter)", color: project.accent ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.6)" }}>
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="comic-tag"
              style={project.accent ? { background: "rgba(0,0,0,0.35)", color: "#FFE500", borderColor: "rgba(0,0,0,0.5)", fontSize: "0.6rem" } : { fontSize: "0.6rem" }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="comic-tag" style={{ fontSize: "0.6rem", ...(project.accent ? { background: "rgba(0,0,0,0.35)", color: "#FFE500", borderColor: "rgba(0,0,0,0.5)" } : {}) }}>
              +{project.tags.length - 2}
            </span>
          )}
        </div>
        <ArrowLink href={project.href} dark={project.accent} />
      </div>
    </motion.div>
  );
}

/* ── Main Projects Section ──────────────────────────────── */
export default function Projects() {
  const { theme } = useTheme();
  const isMiles = theme === "theme-1610";

  return (
    <section
      id="work"
      className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-24"
    >
      {/* Section header */}
      {isMiles ? (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="section-panel-rule mb-6"
        >
          <span className="panel-label">02 / WORK</span>
          <div className="panel-line" />
          <span className="action-word red" aria-hidden="true">POW!</span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-6 mb-6"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            02 / Work
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-none uppercase comic-title z-10"
          style={{ fontFamily: isMiles ? "var(--font-graffiti), var(--font-bangers)" : "var(--font-space-grotesk)" }}
        >
          Selected
          <br />
          <span style={{ color: "var(--theme-accent)" }}>Projects.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-zinc-500 text-sm leading-relaxed md:text-right"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          &ldquo;It doesn&apos;t matter where you start, it&apos;s{" "}
          <em className="text-zinc-300 not-italic font-medium">how</em> you build from there.&rdquo;
        </motion.p>
      </div>

      {isMiles ? (
        /* ── Earth-1610: Comic Page Layout ── */
        <div className="flex flex-col gap-4">
          {/* Row 1: Featured (2/3) + Side (1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <FeaturedPanel project={projects[0]} index={0} />
            </div>
            <div>
              <SidePanel project={projects[1]} index={1} />
            </div>
          </div>

          {/* Row 2: 4 equal grid panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.slice(2).map((project, i) => (
              <GridPanel key={project.id} project={project} index={i + 2} />
            ))}
          </div>

          {/* Row 3: GitHub CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="comic-panel flex items-center justify-between p-5"
          >
            <div className="flex items-center gap-4">
              <span style={{ fontFamily: "var(--font-bangers)", fontSize: "1.1rem", letterSpacing: "0.2em", color: "#FFE500" }}>
                MORE ON GITHUB
              </span>
              <div style={{ height: "2px", width: "60px", background: "#FFE500", opacity: 0.5 }} />
            </div>
            <a
              href="https://github.com/Chaitanyahoon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:opacity-80"
              style={{ fontFamily: "var(--font-bangers)", fontSize: "1rem", letterSpacing: "0.1em", color: "#fff" }}
            >
              github.com/Chaitanyahoon
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="#FFE500" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      ) : (
        /* ── Earth-616: Clean masonry grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard616 key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
