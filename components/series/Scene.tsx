'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTrackProgress } from '@/hooks/sectionProgress';

/**
 * Portfolio section shell — Lenis/scroll-linked fade + rise,
 * and reports viewing progress for Continue Exploring.
 */
export default function Scene({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useTrackProgress(id, ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.5'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [36, 0]);

  return (
    <motion.section id={id} ref={ref} style={{ opacity, scale, y }} className={`relative scroll-mt-16 py-16 sm:py-24 ${className}`}>
      {children}
    </motion.section>
  );
}
