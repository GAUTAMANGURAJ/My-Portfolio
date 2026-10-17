'use client';

import { useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { chapters } from '@/lib/content/portfolio';
import { EASE, SectionHeading } from './fx';
import MilestoneCard from './MilestoneCard';
import { RailButtons } from './Rail';

export default function Journey() {
  const [active, setActive] = useState(Math.max(0, chapters.length - 2));
  const chapter = chapters[active];
  const rail = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectChapter = useCallback((i: number) => {
    setActive(i);
    rail.current?.scrollTo({ left: 0, behavior: 'smooth' });
    tabRefs.current[i]?.focus({ preventScroll: true });
  }, []);

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const last = chapters.length - 1;
    if (e.key === 'Home') selectChapter(0);
    else if (e.key === 'End') selectChapter(last);
    else if (e.key === 'ArrowRight') selectChapter(Math.min(last, active + 1));
    else selectChapter(Math.max(0, active - 1));
  };

  return (
    <>
      <SectionHeading
        kicker={`${chapters.length} chapters`}
        title="My Journey"
        aside={
          <p className="max-w-xs text-sm text-mist">
            Every stage of the career as a chapter — select one to explore its milestones.
          </p>
        }
      />

      <div
        data-lenis-prevent
        className="rail gutter mb-6 flex gap-2 overflow-x-auto sm:mb-8"
        role="tablist"
        aria-label="Journey chapters"
        onKeyDown={onTabKeyDown}
      >
        {chapters.map((s, i) => (
          <motion.button
            key={s.number}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`journey-tab-${s.number}`}
            role="tab"
            aria-selected={i === active}
            aria-controls={`journey-panel-${s.number}`}
            tabIndex={i === active ? 0 : -1}
            type="button"
            onClick={() => selectChapter(i)}
            className={`relative shrink-0 rounded-full px-4 py-2.5 text-left transition ${i === active ? 'text-ink' : 'text-mist hover:text-bone'}`}
            whileTap={{ scale: 0.97 }}
          >
            {i === active && (
              <motion.span layoutId="chapter-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ duration: 0.5, ease: EASE }} />
            )}
            <span className="relative block text-[10px] font-bold tracking-[0.24em]">
              CHAPTER {String(s.number).padStart(2, '0')}
            </span>
            <span className="relative block whitespace-nowrap text-sm font-semibold">{s.title}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={chapter.number}
          id={`journey-panel-${chapter.number}`}
          role="tabpanel"
          aria-labelledby={`journey-tab-${chapter.number}`}
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="gutter mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
              <span className="text-outline mr-3">CH{String(chapter.number).padStart(2, '0')}</span>
              {chapter.title}
            </h3>
            <span className="text-sm text-mist">
              {chapter.period} · {chapter.milestones.length}{' '}
              {chapter.milestones.length === 1 ? 'milestone' : 'milestones'}
            </span>
          </div>
          <motion.p
            className="gutter max-w-3xl text-[15px] leading-relaxed text-bone/75"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
          >
            {chapter.synopsis}
          </motion.p>

          <div className="group/rail relative">
            <div
              ref={rail}
              data-lenis-prevent
              className="rail gutter flex gap-4 overflow-x-auto py-6 sm:py-8 [perspective:1200px]"
            >
              {chapter.milestones.map((m, i) => (
                <MilestoneCard key={m.code} milestone={m} index={i} />
              ))}
            </div>
            <RailButtons rail={rail} />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
