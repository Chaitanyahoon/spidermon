"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { SpiderSenseRipple } from "./SpiderSenseRipple";

const certs = [
  {
    title: "Google Cloud Professional",
    issuer: "Google",
    tag: "Google",
    date: "Jun 2023",
    url: "https://cloud.google.com/certification",
    accent: true,
  },
  {
    title: "Azure Fundamentals",
    issuer: "Microsoft",
    tag: "Microsoft Learn",
    date: "Mar 2023",
    url: "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
    accent: false,
  },
  {
    title: "Data Science Certification",
    issuer: "Tata",
    tag: "Tata / Forage",
    date: "Dec 2022",
    url: undefined,
    accent: false,
  },
  {
    title: "Full Stack Development",
    issuer: "Cognizant",
    tag: "Cognizant / Forage",
    date: "Sep 2022",
    url: undefined,
    accent: false,
  },
];

const issuerInitials: Record<string, string> = {
  Microsoft: "MS",
  Tata: "TA",
  Google: "GO",
  Cognizant: "CG",
};

export default function Certificates() {
  const { theme } = useTheme();
  const isMiles = theme === "theme-1610";

  return (
    <section
      id="certificates"
      className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-24"
    >
      {/* Header */}
      {isMiles ? (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="section-panel-rule mb-6"
        >
          <span className="panel-label">04 / CREDENTIALS</span>
          <div className="panel-line" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-6 mb-6"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            04 / Credentials
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white leading-none uppercase comic-title"
          style={{ fontFamily: isMiles ? "var(--font-graffiti), var(--font-bangers)" : "var(--font-space-grotesk)" }}
        >
          Certified
          <br />
          <span style={{ color: "var(--theme-accent)" }}>&amp; Verified.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-zinc-500 text-sm leading-relaxed md:text-right"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Industry-recognised credentials across cloud, AI, and data from
          Microsoft, Google, and more.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {isMiles ? (
              /* Earth-1610: Comic panel card */
              <div className={`comic-panel flex flex-col justify-between p-5 min-h-[160px] ${cert.accent ? "accent-panel" : ""}`}>
                {/* Issuer monogram */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-4 text-[4rem] font-black leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: "var(--font-bangers)",
                    color: cert.accent ? "rgba(255,255,255,0.12)" : "rgba(255,229,0,0.1)",
                    zIndex: 1,
                  }}
                >
                  {issuerInitials[cert.issuer] ?? cert.issuer.slice(0, 2).toUpperCase()}
                </span>

                <div>
                  <span className="comic-tag mb-3 inline-block">{cert.tag}</span>
                  <h3
                    className="text-white text-base font-bold leading-snug"
                    style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.06em" }}
                  >
                    {cert.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: cert.accent ? "rgba(255,255,255,0.6)" : "rgba(255,229,0,0.7)", fontFamily: "var(--font-bangers)" }}>
                    {cert.date}
                  </span>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-widest flex items-center gap-1"
                      style={{ color: cert.accent ? "#fff" : "#FFE500", fontFamily: "var(--font-bangers)" }}
                    >
                      View
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
                <SpiderSenseRipple />
              </div>
            ) : (
              /* Earth-616: Original card */
              <div className={`group relative flex flex-col justify-between p-6 border rounded-2xl min-h-[160px] transition-all duration-300 overflow-hidden
                ${cert.accent
                  ? "border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/[0.05] hover:bg-[var(--theme-accent)]/[0.09]"
                  : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
                }`}>
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-4 text-[4rem] font-black leading-none select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-space-grotesk)", color: cert.accent ? "rgba(232,0,28,0.07)" : "rgba(255,255,255,0.04)" }}
                >
                  {issuerInitials[cert.issuer] ?? cert.issuer.slice(0, 2).toUpperCase()}
                </span>

                <div>
                  <span
                    className={`inline-block text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-full mb-4
                      ${cert.accent ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20" : "bg-zinc-800 text-zinc-500 border border-zinc-700"}`}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {cert.tag}
                  </span>
                  <h3 className="text-white text-base font-semibold leading-snug" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {cert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mt-5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${cert.accent ? "bg-[var(--theme-accent)]" : "bg-zinc-700"}`}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.2 5.8L6.5 2" stroke={cert.accent ? "#000" : "#fff"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-zinc-600 tracking-widest uppercase" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Verified
                  </span>
                </div>
                <SpiderSenseRipple />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
