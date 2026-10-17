'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { achievements, experience, profile, projects, type ProfileId } from '@/lib/content/portfolio';
import { useFinePointer, useReducedMotionPref } from '@/hooks/useMedia';
import { useSmoothScroll } from '@/hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { StudioMark } from './Poster';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 32, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.95, ease: EASE } },
};

export default function Hero({ onPlay, onResume, profileId }: { onPlay: () => void; onResume: () => void; profileId: ProfileId }) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Softer parallax on touch / reduced-motion (less compositor work)
  const soft = reduced || !fine;
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', soft ? '5%' : '20%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, soft ? 1.03 : 1.14]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', soft ? '-8%' : '-32%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blackout = useTransform(scrollYProgress, [0.35, 1], [0, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4], [0.12, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const imgRotY = useTransform(px, [-1, 1], [-5, 5]);
  const imgRotX = useTransform(py, [-1, 1], [4, -4]);
  const imgShiftX = useTransform(px, [-1, 1], [-14, 14]);
  const chipX = useTransform(px, [-1, 1], [20, -20]);
  const chipY = useTransform(py, [-1, 1], [14, -14]);
  const glowX = useTransform(px, [-1, 1], ['-8%', '8%']);

  const meta = [
    experience[0].period.split(' – ')[0] + ' – Present',
    'B.E. CSE',
    `${projects.length} Projects`,
    achievements[0].title,
  ];

  const floating = [
    { text: achievements[0].title, sub: achievements[0].org, pos: 'left-[2%] top-[30%]', depth: 1 },
    { text: '87 / 90', sub: 'High-severity defects resolved', pos: 'right-[0%] top-[18%]', depth: -1 },
    { text: 'Robotics SaaS · Sole owner', sub: 'Backoffice + client portal', pos: 'left-[4%] bottom-[28%]', depth: 0.8 },
    { text: 'React · Next · TS', sub: 'Primary stack', pos: 'right-[4%] bottom-[24%]', depth: 0.6 },
  ];

  return (
    <section
      id="top"
      ref={ref}
      data-profile={profileId}
      className="relative min-h-[100svh] overflow-hidden"
      onPointerMove={(e) => {
        if (!fine) return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      <motion.div aria-hidden className="absolute inset-0" style={{ x: glowX }}>
        <motion.div
          className="absolute right-[-10%] top-[-10%] h-[90vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.34),rgba(45,212,191,0.08)_55%,transparent)] blur-2xl lg:right-[-4%] lg:w-[60vw]"
          animate={reduced ? undefined : { opacity: [0.7, 1, 0.75], scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute bottom-[-20%] left-[-10%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(212,165,116,0.18),transparent)] blur-2xl" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          opacity: gridOpacity,
          backgroundImage:
            'linear-gradient(rgba(45,212,191,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.2) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 20%, transparent 70%)',
        }}
      />

      <Particles className="z-[1] hidden sm:block" color="45,212,191" count={fine ? 46 : 18} />
      <div aria-hidden className="absolute inset-0 z-[1] hidden overflow-hidden sm:block">
        <span className="light-streak left-[40%] top-[22%] w-[50vw]" style={{ animationDelay: '1.2s' }} />
        <span className="light-streak left-[30%] top-[64%] w-[40vw]" style={{ animationDelay: '3.6s' }} />
        <span className="light-streak left-[55%] top-[44%] w-[30vw]" style={{ animationDelay: '5.2s' }} />
      </div>

      <motion.div
        className="absolute inset-x-0 top-[max(3.25rem,env(safe-area-inset-top))] z-[2] flex h-[42svh] items-end justify-center sm:top-12 sm:h-[66svh] lg:bottom-0 lg:left-auto lg:right-[3vw] lg:top-20 lg:h-auto lg:w-[54vw] xl:right-[6vw] xl:w-[48vw]"
        style={{ y: imgY, scale: imgScale, opacity: fade }}
      >
        <motion.div
          className="relative h-full w-full lg:h-[86vh]"
          style={{ rotateY: imgRotY, rotateX: imgRotX, x: imgShiftX, transformPerspective: 1200 }}
          initial={{ clipPath: 'inset(100% -30% -10% -30%)', opacity: 0 }}
          animate={{ clipPath: 'inset(-30% -30% -10% -30%)', opacity: 1 }}
          transition={{ duration: 1.65, ease: EASE, delay: 0.08 }}
        >
          <motion.div
            aria-hidden
            className="absolute bottom-[8%] left-1/2 h-[78%] w-[78%] -translate-x-1/2 rounded-full border border-signal/25"
            animate={reduced ? undefined : { boxShadow: ['0 0 80px rgba(45,212,191,0.2)', '0 0 140px rgba(45,212,191,0.35)', '0 0 80px rgba(45,212,191,0.2)'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.portrait.src}
            srcSet={profile.portrait.srcSet}
            sizes={profile.portrait.sizes}
            width={profile.portrait.width}
            height={profile.portrait.height}
            alt={profile.portrait.alt}
            fetchPriority="high"
            decoding="async"
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_62%,transparent_97%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_30%,rgba(45,212,191,0.14),transparent_70%)] mix-blend-screen"
          />

          {floating.map((f, i) => (
            <FloatChip key={f.text} {...f} index={i} mx={chipX} my={chipY} reduced={reduced} />
          ))}
        </motion.div>
      </motion.div>

      {/* Mobile impact chips — swipeable strip (desktop chips float on portrait) */}
      <motion.div
        className="absolute inset-x-0 top-[44svh] z-[4] md:hidden"
        style={{ opacity: fade }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: EASE }}
      >
        <div
          data-lenis-prevent
          className="rail flex gap-2.5 overflow-x-auto px-4 pb-1"
        >
          {floating.slice(0, 3).map((f, i) => (
            <motion.div
              key={f.text}
              className="glass min-w-[10.5rem] shrink-0 rounded-xl px-3 py-2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.55, ease: EASE }}
            >
              <p className="text-sm font-semibold text-bone">{f.text}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-mist">{f.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div aria-hidden className="absolute inset-x-0 top-[28svh] z-[3] h-[38svh] bg-gradient-to-b from-transparent via-ink/80 to-ink sm:top-[40svh] sm:h-[36svh] lg:hidden" />
      <div aria-hidden className="absolute inset-0 z-[3] hidden bg-[linear-gradient(90deg,var(--color-ink)_0%,rgba(6,9,16,0.7)_32%,transparent_58%)] lg:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-ink to-transparent sm:h-48" />

      <motion.div
        className="gutter relative z-[4] flex min-h-[100svh] flex-col justify-end pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-[46svh] sm:pb-20 sm:pt-[58svh] lg:max-w-[52vw] lg:justify-center lg:pb-0 lg:pt-24"
        style={{ y: textY, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-2 text-base sm:mb-3 sm:text-lg">
          <StudioMark />
        </motion.div>
        <motion.h1 variants={item} className="font-display leading-[0.82] tracking-[0.02em] text-bone" style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}>
          <span className="shimmer-text">{profile.firstName}</span>
        </motion.h1>
        <motion.p variants={item} className="mt-1 font-sans text-sm font-bold tracking-[0.5em] text-signal sm:tracking-[0.62em] sm:text-base">
          {profile.studioTag}
        </motion.p>

        <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-medium text-mist sm:mt-5 sm:text-[13px]">
          <span className="rounded border border-signal/40 bg-signal/10 px-1.5 py-px text-[10px] font-bold tracking-wider text-signal">SE</span>
          {meta.map((m, i) => (
            <span key={m} className={`flex items-center gap-3 ${i === 3 ? 'hidden sm:flex' : ''}`}>
              {i > 0 && <span className="h-1 w-1 rounded-full bg-smoke" />}
              {m}
            </span>
          ))}
        </motion.div>

        <motion.p variants={item} className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/90 sm:mt-4 sm:text-xs sm:tracking-[0.34em]">
          {profile.tagline.join(' • ')}
        </motion.p>

        <motion.p variants={item} className="mt-3 max-w-xl text-[14px] leading-relaxed text-bone/80 sm:mt-4 sm:text-base">
          {profile.intro}
        </motion.p>

        <motion.div variants={item} className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <Magnetic className="w-full sm:w-auto">
            <button
              type="button"
              data-cursor="play"
              onClick={onPlay}
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-bone px-6 py-3 text-[15px] font-bold text-ink transition hover:bg-white sm:w-auto sm:px-8"
            >
              <span className="text-lg">▶</span> View Highlights
            </button>
          </Magnetic>
          <div className="grid grid-cols-2 gap-2.5 sm:contents">
            <Magnetic className="w-full sm:w-auto">
              <button
                type="button"
                data-cursor="view"
                onClick={onResume}
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-[14px] font-semibold text-bone transition hover:bg-white/15 sm:w-auto sm:gap-3 sm:px-8 sm:text-[15px]"
              >
                <span className="text-lg">⤓</span> Resume
              </button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <button
                type="button"
                data-cursor="link"
                onClick={() => scrollTo('#originals')}
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-[14px] font-semibold text-bone transition hover:bg-white/15 sm:w-auto sm:gap-3 sm:px-8 sm:text-[15px]"
              >
                <span className="text-xl leading-none">＋</span> Work
              </button>
            </Magnetic>
          </div>
          <button
            type="button"
            data-cursor="link"
            onClick={() => scrollTo('#contact')}
            className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-[14px] font-semibold text-bone transition hover:bg-white/15 sm:w-auto sm:px-6 sm:text-[15px]"
          >
            Contact
          </button>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-smoke sm:mt-8 lg:flex"
        >
          <motion.span
            aria-hidden
            className="inline-block h-8 w-px bg-signal/60"
            animate={reduced ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          Scroll to explore
        </motion.p>
      </motion.div>

      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[5] bg-ink" style={{ opacity: blackout }} />
    </section>
  );
}

type MV = ReturnType<typeof useTransform<number, number>>;

function FloatChip({
  text,
  sub,
  pos,
  depth,
  index,
  mx,
  my,
  reduced,
}: {
  text: string;
  sub: string;
  pos: string;
  depth: number;
  index: number;
  mx: MV;
  my: MV;
  reduced: boolean;
}) {
  const x = useTransform(mx, (n: number) => n * depth);
  const y = useTransform(my, (n: number) => n * depth);
  return (
    <motion.div
      className={`glass absolute hidden rounded-xl px-4 py-2.5 md:block ${pos}`}
      style={{ x, y }}
      initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.9 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      transition={{ duration: 0.9, delay: 1.15 + index * 0.16, ease: EASE }}
    >
      <motion.div animate={reduced ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4.5 + index, repeat: Infinity, ease: 'easeInOut' }}>
        <p className="text-sm font-semibold text-bone">{text}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-mist">{sub}</p>
      </motion.div>
    </motion.div>
  );
}
