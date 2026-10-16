'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile, viewerProfiles, type ProfileId } from '@/lib/content/portfolio';
import { EASE } from './fx';

export function ProfileAvatar({ id, size = 'lg' }: { id: ProfileId; size?: 'sm' | 'lg' }) {
  const p = viewerProfiles.find((v) => v.id === id)!;
  const box = size === 'lg' ? 'h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-2xl' : 'h-8 w-8 rounded-lg';
  if (id === 'gautam') {
    return (
      <span
        className={`relative block overflow-hidden ${box}`}
        style={{ background: 'radial-gradient(circle at 50% 30%, #134e4a, #060910)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.portrait.src}
          alt=""
          className="absolute inset-x-0 bottom-0 mx-auto h-[115%] w-auto max-w-none object-cover object-top"
        />
      </span>
    );
  }
  const glyph = { recruiter: 'R', developer: '</>', creative: '◇' }[id];
  return (
    <span
      className={`relative flex items-center justify-center overflow-hidden font-display font-bold text-bone ${box}`}
      style={{ background: `linear-gradient(145deg, ${p.color}, #060910 125%)` }}
    >
      <span className={size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-sm'}>{glyph}</span>
    </span>
  );
}

export default function ProfileSelector({ onPick }: { onPick: (id: ProfileId) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onPick('gautam');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPick]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-y-auto bg-ink px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: EASE }}
      role="dialog"
      aria-label="Choose your viewing profile"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_0%,rgba(45,212,191,0.12),transparent_70%)]"
      />
      <motion.p
        className="relative mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Interface Originals
      </motion.p>
      <motion.h2
        className="relative mb-10 text-center font-display text-4xl font-bold tracking-tight text-bone sm:text-5xl"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        Choose your lens
      </motion.h2>
      <motion.ul
        className="relative grid grid-cols-2 gap-6 sm:flex sm:gap-8"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
      >
        {viewerProfiles.map((p) => (
          <motion.li
            key={p.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <button
              type="button"
              onClick={() => onPick(p.id)}
              data-cursor="play"
              className="group flex flex-col items-center gap-3 text-center"
            >
              <span className="relative rounded-2xl ring-2 ring-transparent transition duration-300 group-hover:scale-105 group-hover:ring-signal/70 group-focus-visible:ring-signal">
                <ProfileAvatar id={p.id} />
                {p.id === 'gautam' && (
                  <span className="absolute -right-2 -top-2 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold tracking-[0.14em] text-ink">
                    MAIN
                  </span>
                )}
              </span>
              <span className="font-sans text-sm font-medium text-mist transition group-hover:text-bone sm:text-base">
                {p.name}
              </span>
              <span className="max-w-[9rem] text-[11px] leading-snug text-smoke">{p.blurb}</span>
            </button>
          </motion.li>
        ))}
      </motion.ul>
      <p className="relative mt-12 max-w-md text-center text-xs leading-relaxed text-smoke">
        Same story of {profile.displayName} — each lens only changes what comes first.
      </p>
    </motion.div>
  );
}
