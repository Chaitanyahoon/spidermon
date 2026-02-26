"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "StreetBite",
    category: "Spring Boot Full Stack",
    year: "2024",
    description:
      "Vendor discovery platform with location-based search, Google Maps geolocation, JWT auth, and Swagger docs. Deployed on Vercel + Render.",
    tags: ["Next.js", "Spring Boot", "MySQL", "Google Maps"],
    size: "large",
    accent: true,
    href: "https://github.com/Chaitanyahoon",
  },
  {
    id: "02",
    title: "Focus Arena",
    category: ".NET Full Stack",
    year: "2025",
    description:
      "Real-time gamified productivity platform with chat, leaderboards, and task mechanics via SignalR. Clean Architecture + Docker.",
    tags: ["ASP.NET Core 8", "React", "SignalR", "MySQL"],
    size: "small",
    accent: false,
    href: "https://github.com/Chaitanyahoon",
  },
  {
    id: "03",
    title: "ScamSentry",
    category: "Next.js + Firebase",
    year: "2024",
    description:
      "Anonymous community scam-reporting platform with interactive heatmaps, admin moderation, and a verified company directory.",
    tags: ["Next.js", "Firebase", "Mapbox", "Tailwind"],
    size: "medium",
    accent: false,
    href: "https://github.com/Chaitanyahoon",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const heightClass =
    project.size === "large"
      ? "min-h-[480px]"
      : project.size === "medium"
        ? "min-h-[340px]"
        : "min-h-[260px]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative flex flex-col justify-between ${heightClass} border border-zinc-800 bg-zinc-900/30 p-7 overflow-hidden cursor-pointer hover:border-zinc-600 transition-colors duration-300`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: project.accent
            ? "rgba(232,0,28,0.04)"
            : "rgba(255,255,255,0.02)",
        }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-2"
            style={{
              color: project.accent ? "var(--theme-accent)" : "#71717a",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            {project.category} — {project.year}
          </p>
          <h3
            className="text-2xl md:text-3xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {project.title}
          </h3>
        </div>
        <span
          className="text-5xl font-bold leading-none select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: project.accent
              ? "rgba(232,0,28,0.12)"
              : "rgba(255,255,255,0.05)",
          }}
        >
          {project.id}
        </span>
      </div>
      <p
        className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-xs"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {project.description}
      </p>
      <div className="flex items-end justify-between mt-auto pt-6 border-t border-zinc-800/60">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-wider uppercase text-zinc-600"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <a href={project.href} target="_blank" rel="noopener noreferrer">
          <motion.div
            className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ml-4 hover:bg-[var(--theme-accent)] hover:border-[var(--theme-accent)] transition-colors duration-200"
            style={{
              borderColor: project.accent ? "var(--theme-accent)" : "#3f3f46",
            }}
            whileHover={{ scale: 1.15 }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{
                color: project.accent ? "var(--theme-accent)" : "#71717a",
              }}
            >
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-24"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-6 mb-6"
      >
        <span
          className="text-[11px] tracking-[0.3em] uppercase text-zinc-600"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          02 / Work
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white leading-none uppercase"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Selected
          <br />
          <span style={{ color: "var(--theme-accent)" }}>Projects.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-zinc-500 text-sm leading-relaxed md:text-right"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          &ldquo;It doesn&apos;t matter where you start, it&apos;s{" "}
          <em className="text-zinc-300 not-italic font-medium">how</em> you
          build from there.&rdquo;
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        <div className="flex flex-col gap-4">
          <ProjectCard project={projects[0]} index={0} />
        </div>
        <div className="flex flex-col gap-4 lg:mt-16">
          <ProjectCard project={projects[1]} index={1} />
          <ProjectCard project={projects[2]} index={2} />
        </div>
        <div className="flex flex-col gap-4 lg:mt-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-start justify-between min-h-[300px] border border-dashed border-zinc-800 p-7 group hover:border-[var(--theme-accent)]/40 transition-colors duration-300"
          >
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                More Projects
              </p>
              <p
                className="text-zinc-500 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Explore more of my work — open source, experiments, and side
                projects.
              </p>
            </div>
            <a
              href="https://github.com/Chaitanyahoon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-semibold text-white group-hover:text-[var(--theme-accent)] transition-colors mt-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              github.com/Chaitanyahoon
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H4M11 1V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="border border-zinc-800 p-7 bg-zinc-900/20"
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Experience
            </p>
            <div className="space-y-4">
              {[
                {
                  role: "Full Stack Dev",
                  company: "Softweb IT Services",
                  period: "2025–26",
                },
                {
                  role: "React Developer",
                  company: "InfoLabz IT Services",
                  period: "2024",
                },
              ].map((exp) => (
                <div
                  key={exp.company}
                  className="flex items-start justify-between gap-2"
                >
                  <div>
                    <p
                      className="text-white text-sm font-semibold"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {exp.role}
                    </p>
                    <p className="text-zinc-500 text-xs">{exp.company}</p>
                  </div>
                  <span className="text-[10px] text-zinc-600 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
