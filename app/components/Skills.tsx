"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const skills = [
  {
    category: "Languages",
    items: ["Java", "C#", "JavaScript", "TypeScript", "PHP", "C++"],
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
    span: "col-span-1 row-span-2",
    accent: true,
  },
  {
    category: "Backend",
    items: ["Spring Boot", ".NET Core", "Hibernate", "JPA", "REST APIs"],
    span: "col-span-1 row-span-2",
    accent: false,
  },
  {
    category: "Database & Cloud",
    items: ["MySQL", "SQL Server", "MongoDB", "Firestore", "Firebase"],
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    category: "DevOps",
    items: ["Docker", "Linux", "CI/CD", "Vercel", "Netlify"],
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Visual Studio"],
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    category: "Testing",
    items: ["Selenium WebDriver", "API Testing"],
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    category: "Architecture",
    items: [
      "OOP",
      "SOLID",
      "MVC",
      "Repository Pattern",
      "Clean Architecture",
      "DSA",
    ],
    span: "col-span-2 row-span-1",
    accent: true,
  },
];

function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${skill.span} group relative flex flex-col justify-between p-6 border rounded-2xl overflow-hidden transition-colors duration-300
        ${
          skill.accent
            ? "border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/[0.06] hover:bg-[var(--theme-accent)]/[0.1]"
            : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
        }`}
    >
      {/* Faint category number */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-5 text-[3.5rem] font-bold leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: skill.accent
            ? "rgba(232,0,28,0.08)"
            : "rgba(255,255,255,0.04)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
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

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {skill.items.map((item) => (
          <span
            key={item}
            className={`text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-200
              ${
                skill.accent
                  ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20"
                  : "bg-zinc-800 text-zinc-300 border border-zinc-700/60 group-hover:border-zinc-600"
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
  return (
    <section
      id="skills"
      className="bg-[var(--theme-bg)] border-t border-zinc-800/60 px-6 md:px-16 lg:px-24 py-24"
    >
      {/* Header */}
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
          01 / Skills
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white leading-none uppercase"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Technical
          <br />
          <span style={{ color: "var(--theme-accent)" }}>Stack.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs text-zinc-500 text-sm leading-relaxed md:text-right"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Across the full stack — from pixels to packets, schema to server.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(160px,auto)] gap-4">
        {skills.map((skill, i) => (
          <SkillCard key={skill.category} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}
