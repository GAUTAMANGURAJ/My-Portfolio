'use client';

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotionPref } from './useMedia';

type ScrollApi = {
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number; immediate?: boolean; duration?: number }) => void;
  lock: () => void;
  unlock: () => void;
  /** 0–1 document scroll progress (Lenis-synced) */
  getProgress: () => number;
};

const ScrollCtx = createContext<ScrollApi | null>(null);

/**
 * Aggressive cinematic Lenis — longer inertia, synced scroll events for
 * Framer Motion useScroll / section progress.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.7,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      // Keep native touch for horizontal rails; Lenis still smooths vertical page scroll
      syncTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    lenisRef.current = lenis;

    // Keep Framer / IntersectionObserver in sync with Lenis virtual scroll
    lenis.on('scroll', ({ progress }) => {
      progressRef.current = progress;
      // Nudge listeners that only watch native scroll
      window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: { progress } }));
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.documentElement.classList.add('lenis', 'lenis-smooth');

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback<ScrollApi['scrollTo']>((target, opts = {}) => {
    const offset = opts.offset ?? -72;
    const duration = opts.duration ?? 1.65;
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (el === null) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset, immediate: opts.immediate, duration });
    } else {
      const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: opts.immediate ? 'auto' : 'smooth' });
    }
  }, []);

  const lock = useCallback(() => {
    locks.current += 1;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.classList.add('lenis-stopped');
  }, []);

  const unlock = useCallback(() => {
    locks.current = Math.max(0, locks.current - 1);
    if (locks.current === 0) {
      lenisRef.current?.start();
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }
  }, []);

  const getProgress = useCallback(() => progressRef.current, []);

  return (
    <ScrollCtx.Provider value={{ scrollTo, lock, unlock, getProgress }}>{children}</ScrollCtx.Provider>
  );
}

export function useSmoothScroll() {
  const ctx = useContext(ScrollCtx);
  if (!ctx) throw new Error('useSmoothScroll must be used inside SmoothScrollProvider');
  return ctx;
}

/** Locks page scroll while `active` is true (used by overlays). */
export function useScrollLock(active: boolean) {
  const { lock, unlock } = useSmoothScroll();
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active, lock, unlock]);
}
