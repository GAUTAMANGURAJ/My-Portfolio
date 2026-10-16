'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, sectionMeta, viewerProfiles, type ProfileId, type SectionId } from '@/lib/content/portfolio';
import { useSmoothScroll } from '@/hooks/smoothScroll';
import { ProfileAvatar } from './ProfileSelector';
import { SeriesMark } from './Poster';
import { EASE } from './fx';

type ThemeId = 'interface' | 'ember';

export default function Navbar({
  order,
  profileId,
  onSwitch,
}: {
  order: SectionId[];
  profileId: ProfileId;
  onSwitch: (id: ProfileId) => void;
}) {
  const { scrollTo } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [theme, setTheme] = useState<ThemeId>('interface');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let prev = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > prev);
      prev = y;
      for (const id of [...order].reverse()) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('lenis-scroll', onScroll as EventListener);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('lenis-scroll', onScroll as EventListener);
    };
  }, [order]);

  return (
    <>
      <motion.header
        className="gutter fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/5 bg-ink/70 backdrop-blur-xl"
        animate={{ y: hidden && !menuOpen ? -80 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <button
          type="button"
          onClick={() => scrollTo('#top', { offset: 0 })}
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-bone"
        >
          <SeriesMark />
          <span>{profile.firstName}</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {order.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(`#${id}`)}
              className="relative px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist transition hover:text-bone"
            >
              {active === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2 bottom-1 h-px bg-signal"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              <span className={active === id ? 'text-bone' : undefined}>{sectionMeta[id].nav}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme((t) => (t === 'interface' ? 'ember' : 'interface'))}
            className="hidden rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist transition hover:border-signal/40 hover:text-bone sm:inline-flex"
            title="Toggle accent theme"
          >
            {theme === 'interface' ? 'Teal' : 'Ember'}
          </button>
          <select
            value={profileId}
            onChange={(e) => onSwitch(e.target.value as ProfileId)}
            className="hidden rounded-lg border border-white/15 bg-ink-2 px-2 py-1.5 text-xs text-bone md:block"
            aria-label="Switch profile"
          >
            {viewerProfiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <ProfileAvatar id={profileId} size="sm" />
          <button
            type="button"
            className="rounded-lg border border-white/15 p-2 text-bone lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink/95 pt-20 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="gutter flex flex-col gap-2">
              {order.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="rounded-xl border border-white/10 px-4 py-4 text-left text-lg font-semibold text-bone"
                  onClick={() => {
                    setMenuOpen(false);
                    scrollTo(`#${id}`);
                  }}
                >
                  {sectionMeta[id].nav}
                  <span className="mt-1 block text-xs font-normal text-smoke">{sectionMeta[id].meta}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
