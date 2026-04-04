import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TextRotate — cycles through an array of words/phrases with a
 * vertical-slide + fade transition. Inspired by 21st.dev "Text Rotate".
 *
 * Props:
 *  - words: string[]           — phrases to cycle through
 *  - interval: number (ms)     — time per phrase (default 3000)
 *  - className: string         — applied to every phrase span
 */
const TextRotate = ({
  words = ['Intelligent IT'],
  interval = 3000,
  className = '',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  /* Respect prefers-reduced-motion */
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    return <span className={className}>{words[index]}</span>;
  }

  return (
    <span className="inline-block relative overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0, rotateX: -45 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 45 }}
          transition={{
            y: { type: 'spring', stiffness: 200, damping: 25 },
            opacity: { duration: 0.25 },
            rotateX: { duration: 0.4 },
          }}
          className={`inline-block ${className}`}
          style={{ perspective: '600px' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default TextRotate;
