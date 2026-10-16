'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/lib/content/portfolio';
import { useReducedMotionPref } from '@/hooks/useMedia';
import { EASE, Magnetic } from './fx';

/**
 * Signature opening — Interface Originals (not a streaming-red title card clone).
 * navy field → studio mark → GAUTAM → INTERFACE ORIGINALS → portrait → role → ENTER
 */
const TIMELINE = [
  { at: 300, beat: 1 },
  { at: 1800, beat: 2 },
  { at: 2600, beat: 3 },
  { at: 3400, beat: 4 },
  { at: 4200, beat: 5 },
  { at: 5000, beat: 6 },
];

export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotionPref();
  const [beat, setBeat] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(({ at, beat: b }) => window.setTimeout(() => setBeat(b), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') onDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-ink"
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      role="dialog"
      aria-label="Opening titles"
    >
      {/* soft interface frame — not heavy letterbox bars */}
      <motion.div
        className="absolute inset-x-0 top-0 z-30 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: beat >= 1 ? 1 : 0, scaleX: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: beat >= 1 ? 1 : 0, scaleX: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 55%, rgba(45,212,191,0.18), transparent 68%), radial-gradient(40% 35% at 80% 20%, rgba(212,165,116,0.1), transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 2 ? 1 : 0 }}
        transition={{ duration: 1.4 }}
      />

      <AnimatePresence>
        {beat === 1 && (
          <motion.div
            key="studio"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="font-sans text-xs font-semibold text-gold sm:text-sm"
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '0.55em', opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              {profile.originalLabel}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-0 mx-auto flex h-[68vh] max-w-[900px] items-end justify-center"
        initial={{ opacity: 0, scale: 1.1, filter: 'blur(18px) brightness(0.35)' }}
        animate={beat >= 4 ? { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' } : {}}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.portrait.src}
          srcSet={profile.portrait.srcSet}
          sizes="(max-width: 768px) 100vw, 900px"
          alt={profile.portrait.alt}
          className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_55%,transparent_98%)]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(70%_60%_at_50%_40%,transparent_30%,rgba(6,9,16,0.9)_100%)]"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="font-display font-bold leading-[0.88] text-bone drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
          style={{ fontSize: 'clamp(3.8rem, 16vw, 11rem)' }}
          initial={{ opacity: 0, y: 28, filter: 'blur(16px)' }}
          animate={beat >= 2 ? { opacity: 1, y: beat >= 4 ? '-26vh' : 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.15, ease: EASE }}
        >
          {profile.firstName}
        </motion.h1>
        <motion.p
          className="mt-2 font-sans text-[11px] font-semibold uppercase text-signal-2 [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] sm:text-sm"
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={beat >= 3 ? { opacity: 1, letterSpacing: '0.42em', y: beat >= 4 ? '-26vh' : 0 } : {}}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {profile.seriesTag}
        </motion.p>
      </div>

      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/90 sm:text-sm sm:tracking-[0.35em]"
          initial={{ opacity: 0, y: 14 }}
          animate={beat >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {profile.tagline.join('  ·  ')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={beat >= 6 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={onDone}
              tabIndex={beat >= 6 ? 0 : -1}
              className="group flex items-center gap-3 rounded-full bg-signal px-9 py-4 font-sans text-base font-bold tracking-wide text-ink shadow-[0_0_50px_var(--glow-signal)] transition hover:bg-signal-2"
            >
              <span className="text-lg transition-transform group-hover:translate-x-0.5">→</span> ENTER
            </button>
          </Magnetic>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="absolute right-4 top-5 z-40 rounded-full border border-white/15 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-mist transition hover:border-signal/50 hover:text-bone"
      >
        SKIP
      </button>
    </motion.div>
  );
}
