'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTrackProgress } from '@/hooks/sectionProgress';
import { useFinePointer, useReducedMotionPref } from '@/hooks/useMedia';

/**
 * Portfolio section shell — scroll-linked fade on desktop;
 * lighter transforms on touch / reduced-motion for performance.
 */
export default function Scene({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useTrackProgress(id, ref);
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const lightMotion = !fine || reduced;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.5'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [lightMotion ? 0.82 : 0.55, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [lightMotion ? 1 : 0.985, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [lightMotion ? 8 : 22, 0]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={lightMotion ? { opacity } : { opacity, scale, y }}
      className={`relative scroll-mt-24 py-16 sm:py-24 [content-visibility:auto] [contain-intrinsic-size:1px_720px] ${className}`}
    >
      {children}
    </motion.section>
  );
}
