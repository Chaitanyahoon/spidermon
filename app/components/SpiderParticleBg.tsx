"use client";

import { useEffect, useRef } from "react";

interface SpiderParticleBgProps {
  className?: string;
  color?: string; // Hex color string, e.g., "#e8001c"
  opacity?: number;
  particleCount?: number;
}

export default function SpiderParticleBg({
  className = "",
  color = "var(--theme-accent)",
  opacity = 1,
  particleCount = 50, // controls density of the web
}: SpiderParticleBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;
    // We'll create the web origin slightly off-center for a cool aesthetic
    let originX = 0;
    let originY = 0;

    let currentHex = color;
    if (color.startsWith("var(")) {
      const varName = color.slice(4, -1).trim();
      currentHex = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
    }
    const rgbColor = hexToRgb(currentHex) || { r: 232, g: 0, b: 28 };

    // --- Web Physics Node ---
    interface WebNode {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      ringIndex: number;
      radialIndex: number;
    }

    const createNode = (x: number, y: number, ringIndex: number, radialIndex: number): WebNode => ({
      x, y, baseX: x, baseY: y, vx: 0, vy: 0, ringIndex, radialIndex
    });

    const updateNode = (node: WebNode) => {
      const dxMouse = mouseX - node.x;
      const dyMouse = mouseY - node.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      let targetX = node.baseX;
      let targetY = node.baseY;

      const pullRadius = 300;
      if (distMouse < pullRadius && mouseX > 0) {
        const force = (pullRadius - distMouse) / pullRadius;
        targetX = node.baseX + dxMouse * force * 0.15;
        targetY = node.baseY + dyMouse * force * 0.15;
      }

      const springForce = 0.05;
      const damping = 0.85;

      const ax = (targetX - node.x) * springForce;
      const ay = (targetY - node.y) * springForce;

      node.vx += ax;
      node.vy += ay;

      node.vx *= damping;
      node.vy *= damping;

      node.x += node.vx + Math.sin(Date.now() * 0.001 + node.ringIndex) * 0.2;
      node.y += node.vy + Math.cos(Date.now() * 0.001 + node.radialIndex) * 0.2;
    };

    let nodes: WebNode[] = [];
    const numSpokes = 12; // 12 radial lines going outwards
    const numRings = Math.max(5, Math.floor(particleCount / numSpokes)); // ~5 to 8 rings

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Center of the web
      originX = width / 2;
      originY = height; // Web originates from bottom center

      nodes = [];

      const maxRadius = Math.max(width, height) * 1.2;
      const ringSpacing = maxRadius / numRings;

      for (let r = 1; r <= numRings; r++) {
        const radius = r * ringSpacing;
        for (let s = 0; s < numSpokes; s++) {
          // Distribute spokes evenly
          // Angle goes from 0 (right) to PI (left) to form a semi-circle from the bottom
          const angle = Math.PI + Math.PI * (s / (numSpokes - 1));

          // Add a tiny bit of organic randomness to the web structure
          const jitter = (Math.random() - 0.5) * (ringSpacing * 0.2);

          const nx = originX + Math.cos(angle) * (radius + jitter);
          const ny = originY + Math.sin(angle) * (radius + jitter);

          nodes.push(createNode(nx, ny, r, s));
        }
      }
    };

    const drawWeb = () => {
      // Helper function to find a specific node
      const getNode = (ring: number, spoke: number) => {
        return nodes.find(
          (n) => n.ringIndex === ring && n.radialIndex === spoke,
        );
      };

      ctx.lineWidth = 1;

      // Draw Spokes (Radial Lines from origin)
      for (let s = 0; s < numSpokes; s++) {
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        for (let r = 1; r <= numRings; r++) {
          const node = getNode(r, s);
          if (node) {
            ctx.lineTo(node.x, node.y);
          }
        }
        // The thicker the spoke, the closer to the origin
        ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity * 0.6})`;
        ctx.stroke();
      }

      // Draw Rings (Concentric threads bridging the spokes)
      ctx.lineWidth = 0.6;
      for (let r = 1; r <= numRings; r++) {
        ctx.beginPath();
        for (let s = 0; s < numSpokes; s++) {
          const node = getNode(r, s);
          if (node) {
            if (s === 0) {
              ctx.moveTo(node.x, node.y);
            } else {
              // Slight curve between nodes for organic sag
              ctx.lineTo(node.x, node.y);
            }
          }
        }
        ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity * 0.4})`;
        ctx.stroke();

        // Draw "dew drops" or node joints
        for (let s = 0; s < numSpokes; s++) {
          const node = getNode(r, s);
          if (node) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity * 0.8})`;
            ctx.fill();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update physics
      nodes.forEach((n) => updateNode(n));

      // Draw the structured web
      drawWeb();

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      // Move mouse offscreen to stop pulling
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, opacity, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none block ${className}`}
      aria-hidden="true"
    />
  );
}

// Utility to parse hex color to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}
