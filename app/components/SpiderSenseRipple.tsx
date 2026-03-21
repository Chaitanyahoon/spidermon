"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface SpiderSenseRippleProps {
  className?: string;
  color?: string;
}

export function SpiderSenseRipple({
  className = "",
  color = "rgba(232, 0, 28, 0.35)",
}: SpiderSenseRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<{ x: number; y: number; r: number; alpha: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ripplesRef.current = ripplesRef.current.filter((rip) => rip.alpha > 0.01);

    for (const rip of ripplesRef.current) {
      rip.r += 4;
      rip.alpha *= 0.88;
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${rip.alpha})`);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second inner ring
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.r * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${rip.alpha * 0.5})`);
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    if (ripplesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [color]);

  const addRipple = useCallback((x: number, y: number) => {
    if (reducedMotion) return;
    ripplesRef.current.push({ x, y, r: 5, alpha: 0.7 });
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [reducedMotion, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    // Ensure parent is relative or absolute so the canvas inset-0 works
    const computedStyle = window.getComputedStyle(parent);
    if (computedStyle.position === "static") {
      parent.style.position = "relative";
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle
      if (Math.random() > 0.15) return;
      const rect = parent.getBoundingClientRect();
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mousemove", handleMouseMove);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [addRipple]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-[2] ${className}`}
      aria-hidden="true"
    />
  );
}
