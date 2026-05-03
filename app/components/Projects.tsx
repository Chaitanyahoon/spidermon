"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { projects, type Project } from "../data/projects";

/* ── Arrow button ── */
function ArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <motion.div
        className="w-9 h-9 flex items-center justify-center border transition-all duration-200"
        style={{ borderColor: "#3f3f46", background: "transparent" }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(232,0,28,0.15)", borderColor: "var(--theme-accent)" }}
      >
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
          <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      aria-label={`Project: ${project.title}`}
      className={`group relative flex flex-col justify-between h-full p-6 overflow-hidden cursor-pointer transition-all duration-500 bg-zinc-900/40 border-x border-b border-zinc-800/80 hover:bg-zinc-800/40 hover:border-zinc-700 rounded-sm hover:-translate-y-1
        ${isFeatured ? "md:col-span-2 lg:col-span-2 min-h-[380px]" : "md:col-span-1 lg:col-span-1 min-h-[380px]"}
        ${project.accent ? "border-t-[3px] border-t-[var(--theme-accent)]" : "border-t-[3px] border-t-zinc-800/80 hover:border-t-zinc-600"}`}
    >
      {/* Web-thread overlay glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,0,28,0.08)_0%,_transparent_50%)]" />
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div>
          <p className={`text-[10px] tracking-[0.3em] uppercase mb-2 ${project.accent ? 'text-[var(--theme-accent)]' : 'text-zinc-500'}`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {project.category} — {project.year}
          </p>
          <h3 className={`${isFeatured ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-bold text-white leading-tight transition-colors group-hover:text-[var(--theme-accent)]`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
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
              <span className="text-zinc-700 ml-2 mr-0 inline-block align-middle">&bull;</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-[10px] tracking-[0.18em] uppercase text-zinc-500 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Details
          </Link>
          {project.githubHref && (
            <ArrowLink href={project.githubHref} label={`${project.title} source code`} />
          )}
          <ArrowLink href={project.href} label={`${project.title} live project`} />
        </div>
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
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="flex items-center gap-6 mb-6"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          02 / Work
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-none uppercase z-10"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Selected
          <br />
          <span className="hover-glitch inline-block" style={{ color: "var(--theme-accent)" }}>Projects.</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
