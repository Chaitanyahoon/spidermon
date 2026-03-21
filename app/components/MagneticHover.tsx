"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticHover({
  children,
  className = "",
  strength = 15,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // x and y represent the translation offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics spring for elastic web-tension feeling
  const springConfig = { stiffness: 200, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Determine distance from center of element
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Apply translation using strength multiplier (e.g. 15% of distance)
    x.set(middleX * (strength / 100));
    y.set(middleY * (strength / 100));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Snap back to zero with tension
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
