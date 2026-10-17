'use client';

import { useEffect, useSyncExternalStore, type RefObject } from 'react';

/**
 * Tracks how far each section has been viewed (0–1) for the Explore rail progress bars.
 */
const progress: Record<string, number> = {};
const listeners = new Set<() => void>();
let snapshot = { ...progress };

function set(id: string, value: number) {
  if ((progress[id] ?? 0) >= value) return;
  progress[id] = value;
  snapshot = { ...progress };
  listeners.forEach((l) => l());
}

export function useSectionProgress() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    () => snapshot,
  );
}

/** @deprecated Prefer useSectionProgress */
export const useWatchProgress = useSectionProgress;

export function useTrackProgress(id: string, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const seen = (vh - r.top) / (r.height + vh * 0.25);
      set(id, Math.min(1, Math.max(0, seen)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('lenis-scroll', onScroll as EventListener);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('lenis-scroll', onScroll as EventListener);
      cancelAnimationFrame(raf);
    };
  }, [id, ref]);
}
