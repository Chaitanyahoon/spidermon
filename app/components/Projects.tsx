"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { projects, type Project } from "../data/projects";

type RepoStats = {
  stars: number;
  language: string | null;
  updatedAt: string;
};

function repoPathFromUrl(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const [owner, repo] = parsed.pathname.replace(/^\/|\/$/g, "").split("/");
    if (!owner || !repo) return null;
    return `${owner}/${repo}`;
  } catch {
    return null;
  }
}

function formatUpdated(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function GitHubStats({ project }: { project: Project }) {
  const repoPath = useMemo(() => repoPathFromUrl(project.githubHref), [project.githubHref]);
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!repoPath) return;

    let cancelled = false;
    fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub stats unavailable");
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setStats({
          stars: data.stargazers_count ?? 0,
          language: data.language ?? null,
          updatedAt: data.updated_at,
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [repoPath]);

  if (!repoPath) {
    return <span>Live build</span>;
  }

  if (failed) {
    return <span>{repoPath}</span>;
  }

  if (!stats) {
    return <span>Loading repo stats</span>;
  }

  return (
    <>
      <span>{stats.stars} stars</span>
      <span>{stats.language ?? "Code"}</span>
      <span>Updated {formatUpdated(stats.updatedAt)}</span>
    </>
  );
}

function LivePreview({ project }: { project: Project }) {
  return (
    <div className="relative mt-5 overflow-hidden rounded-sm border border-zinc-800 bg-[#111827] aspect-[16/9]">
      <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b border-zinc-800 bg-black/70 px-3">
        <span className="h-2 w-2 rounded-full bg-[var(--theme-accent)]" />
        <span className="h-2 w-2 rounded-full bg-zinc-600" />
        <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
        <span className="ml-2 truncate text-[9px] uppercase tracking-[0.18em] text-zinc-500" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {project.previewLabel}
        </span>
      </div>
      <iframe
        title={`${project.title} live preview`}
        src={project.href}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className="absolute left-0 top-7 h-[calc(100%-1.75rem)] w-full origin-top scale-[0.74] border-0 bg-zinc-950 opacity-75 transition duration-500 group-hover:scale-[0.78] group-hover:opacity-100"
        style={{ width: "135%", height: "135%" }}
      />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

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

      <LivePreview project={project} />

      <div className="relative z-10 mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.15em] text-zinc-500" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        <GitHubStats project={project} />
      </div>

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
            className="spider-sense-pulse text-[10px] tracking-[0.18em] uppercase text-zinc-500 hover:text-white transition-colors"
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

function CurrentlyBuilding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 border border-zinc-800 bg-zinc-950/40 p-6 rounded-sm"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-2xl md:text-3xl font-black uppercase text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Currently Building
        </h3>
        <span className="hidden sm:inline text-[10px] uppercase tracking-[0.22em] text-[var(--theme-accent)]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Active Webs
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {projects.filter((project) => project.currentlyBuilding).map((project) => (
          <div key={project.slug} className="border border-zinc-800/80 bg-black/20 p-4 rounded-sm">
            <div className="mb-2 flex items-center justify-between gap-3">
              <strong className="text-sm uppercase tracking-[0.18em] text-zinc-200" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {project.title}
              </strong>
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--theme-accent)] shadow-[0_0_16px_rgba(232,0,28,0.7)]" />
            </div>
            <p className="text-sm leading-relaxed text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
              {project.currentlyBuilding}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LighthouseBadges() {
  const scores = [
    { label: "Performance", value: 93 },
    { label: "Accessibility", value: 100 },
    { label: "Best Practices", value: 100 },
    { label: "SEO", value: 100 },
  ];

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {scores.map((score) => (
        <div key={score.label} className="flex items-center justify-between border border-zinc-800 bg-black/20 px-4 py-3 rounded-sm">
          <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {score.label}
          </span>
          <strong className="text-lg text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {score.value}
          </strong>
        </div>
      ))}
    </div>
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
      <CurrentlyBuilding />
      <LighthouseBadges />
    </section>
  );
}
