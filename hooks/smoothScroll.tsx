'use client';

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useMedia, useReducedMotionPref } from './useMedia';

type ScrollApi = {
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number; immediate?: boolean; duration?: number }) => void;
  lock: () => void;
  unlock: () => void;
  /** 0–1 document scroll progress (Lenis-synced) */
  getProgress: () => number;
};

const ScrollCtx = createContext<ScrollApi | null>(null);

/**
 * Smooth scroll via Lenis on fine-pointer desktops only.
 * Touch / coarse pointers use native scrolling so horizontal rails and
 * overlay sheets (mobile nav) keep reliable pan gestures.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();
  const coarse = useMedia('(pointer: coarse)');
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(0);
  const progressRef = useRef(0);
  const lockScrollY = useRef(0);

  // Lenis only on desktop-like pointers (not phones / tablets)
  const useLenis = !reduced && !coarse;

  useEffect(() => {
    if (!useLenis) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
      return;
    }

    const lenis = new Lenis({
      duration: 1.55,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      syncTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ({ progress }) => {
      progressRef.current = progress;
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
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [useLenis]);

  const scrollTo = useCallback<ScrollApi['scrollTo']>(
    (target, opts = {}) => {
      const offset = opts.offset ?? -72;
      const duration = opts.duration ?? (coarse ? 0.85 : 1.45);
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (el === null) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset, immediate: opts.immediate, duration });
      } else {
        const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: opts.immediate ? 'auto' : 'smooth' });
      }
    },
    [coarse],
  );

  const lock = useCallback(() => {
    locks.current += 1;
    if (locks.current > 1) return;
    lenisRef.current?.stop();
    lockScrollY.current = window.scrollY;
    document.documentElement.classList.add('lenis-stopped');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockScrollY.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }, []);

  const unlock = useCallback(() => {
    locks.current = Math.max(0, locks.current - 1);
    if (locks.current !== 0) return;
    lenisRef.current?.start();
    document.documentElement.classList.remove('lenis-stopped');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, lockScrollY.current);
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
