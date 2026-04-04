import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticButton — wraps any child element and applies a subtle
 * cursor-pull effect on hover. The element moves toward the cursor
 * position within its bounding box, then springs back on leave.
 *
 * Props:
 *  - strength: number   — how far the element can move (px, default 8)
 *  - className: string  — outer wrapper className
 *  - children: ReactNode
 */
const MagneticButton = ({ children, strength = 8, className = '' }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength * 2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
