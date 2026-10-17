'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, sectionMeta, viewerProfiles, type ProfileId, type SectionId } from '@/lib/content/portfolio';
import { useSmoothScroll } from '@/hooks/smoothScroll';
import { ProfileAvatar } from './ProfileSelector';
import { StudioMark } from './Poster';
import { EASE } from './fx';

type ThemeId = 'interface' | 'ember';

const THEME_KEY = 'gautam-portfolio-theme';

function readStoredTheme(): ThemeId {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === 'interface' || t === 'ember') return t;
  } catch {
    /* ignore */
  }
  return 'interface';
}

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
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathOpen, setPathOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [theme, setTheme] = useState<ThemeId>('interface');
  const pathRef = useRef<HTMLDivElement>(null);
  const current = viewerProfiles.find((p) => p.id === profileId)!;

  useEffect(() => {
    setTheme(readStoredTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, mounted]);

  useEffect(() => {
    let prev = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > prev + 8) setPathOpen(false);
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

  useEffect(() => {
    if (!pathOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!pathRef.current?.contains(e.target as Node)) setPathOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPathOpen(false);
    };
    window.addEventListener('mousedown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [pathOpen]);

  const ui = (
    <>
      <header className="gutter pointer-events-none fixed inset-x-0 top-0 z-[80]">
        <div
          className={`pointer-events-auto relative mx-auto mt-3 flex h-14 max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-[background-color,border-color] duration-300 sm:h-[3.75rem] sm:px-4 ${
            scrolled
              ? 'border-white/14 bg-ink/92'
              : 'border-white/10 bg-ink/78'
          }`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent"
          />

          <button
            type="button"
            onClick={() => scrollTo('#top', { offset: 0 })}
            className="group flex min-w-0 items-center gap-2.5 font-display text-lg font-bold tracking-tight text-bone"
            data-cursor="link"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-signal/25 bg-ink-2 shadow-[0_0_20px_rgba(45,212,191,0.12)] transition group-hover:border-signal/50">
              <StudioMark className="!gap-0 [&_span]:hidden [&_svg]:h-5 [&_svg]:w-5" />
            </span>
            <span className="flex min-w-0 flex-col items-start leading-none">
              <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-smoke transition group-hover:text-mist">
                Studio
              </span>
              <span className="truncate text-[15px] tracking-wide">{profile.firstName}</span>
            </span>
          </button>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {order.map((id) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(`#${id}`)}
                  data-cursor="link"
                  className={`relative rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    isActive ? 'text-bone' : 'text-mist hover:text-bone'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-signal/30 bg-signal/10"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                  <span className="relative z-10">{sectionMeta[id].nav}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'interface' ? 'ember' : 'interface'))}
              className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist transition hover:border-signal/35 hover:bg-signal/10 hover:text-bone sm:inline-flex"
              title="Toggle accent theme"
              data-cursor="link"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: theme === 'interface' ? '#2dd4bf' : '#e8a45c', boxShadow: `0 0 8px ${theme === 'interface' ? '#2dd4bf' : '#e8a45c'}` }}
              />
              {theme === 'interface' ? 'Teal' : 'Ember'}
            </button>

            <div ref={pathRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setPathOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={pathOpen}
                aria-label="Switch viewing path"
                data-cursor="link"
                className={`group flex items-center gap-2.5 rounded-xl border px-2.5 py-1.5 transition duration-300 ${
                  pathOpen
                    ? 'border-signal/40 bg-ink-2 shadow-[0_0_24px_rgba(45,212,191,0.12)]'
                    : 'border-white/12 bg-white/[0.03] hover:border-white/25 hover:bg-ink-2'
                }`}
              >
                <ProfileAvatar id={profileId} size="sm" />
                <span className="flex min-w-[5.5rem] flex-col items-start text-left leading-none">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-smoke">Path</span>
                  <span className="mt-1 text-xs font-semibold text-bone">{current.name}</span>
                </span>
                <motion.span
                  animate={{ rotate: pathOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="text-[10px] text-mist"
                  aria-hidden
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {pathOpen && (
                  <motion.div
                    role="listbox"
                    aria-label="Viewing paths"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="absolute right-0 top-[calc(100%+0.55rem)] z-50 w-[17.5rem] overflow-hidden rounded-2xl border border-white/14 p-1.5 shadow-[0_28px_64px_rgba(0,0,0,0.72)]"
                    style={{
                      // Solid panel — glass chrome without letting the hero portrait show through
                      background:
                        'linear-gradient(165deg, rgba(21,28,46,0.98) 0%, rgba(12,18,32,1) 42%, rgba(6,9,16,1) 100%)',
                      isolation: 'isolate',
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-signal/45 to-transparent"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-signal/10 blur-2xl"
                    />
                    <div className="relative mb-1.5 flex items-center justify-between px-2.5 pt-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-smoke">Choose path</p>
                      <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-signal">
                        Live
                      </span>
                    </div>
                    <ul className="relative space-y-0.5">
                      {viewerProfiles.map((p) => {
                        const selected = p.id === profileId;
                        return (
                          <li key={p.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={selected}
                              onClick={() => {
                                onSwitch(p.id);
                                setPathOpen(false);
                              }}
                              data-cursor="link"
                              className={`group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition duration-200 ${
                                selected
                                  ? 'bg-signal/15 ring-1 ring-signal/35'
                                  : 'hover:bg-white/[0.06]'
                              }`}
                            >
                              <span
                                className="relative shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10 transition group-hover:ring-white/25"
                                style={{ boxShadow: selected ? `0 0 16px ${p.color}44` : undefined }}
                              >
                                <ProfileAvatar id={p.id} size="sm" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-bone">{p.name}</span>
                                  {selected && (
                                    <span className="rounded-full bg-signal/20 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-signal">
                                      Active
                                    </span>
                                  )}
                                </span>
                                <span className="mt-0.5 block truncate text-[11px] text-smoke">{p.blurb}</span>
                              </span>
                              <span
                                className={`text-sm transition ${selected ? 'text-signal opacity-100' : 'text-mist opacity-0 group-hover:opacity-60'}`}
                                aria-hidden
                              >
                                {selected ? '✓' : '→'}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03] text-bone transition hover:border-white/25 hover:bg-ink-2 lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => {
                setMenuOpen((v) => !v);
                setPathOpen(false);
              }}
            >
              <span className="relative block h-3.5 w-4" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-full bg-current transition ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-current transition ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/96 pt-24 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="gutter mx-auto flex max-w-lg flex-col gap-6">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-smoke">Path</p>
                <ul className="grid grid-cols-2 gap-2">
                  {viewerProfiles.map((p) => {
                    const selected = p.id === profileId;
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => {
                            onSwitch(p.id);
                            setMenuOpen(false);
                          }}
                          className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition ${
                            selected
                              ? 'border-signal/40 bg-signal/10'
                              : 'border-white/10 bg-ink-2/60 hover:border-white/20'
                          }`}
                        >
                          <ProfileAvatar id={p.id} size="sm" />
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-bone">{p.name}</span>
                            <span className="block truncate text-[10px] text-smoke">{p.blurb}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <nav className="flex flex-col gap-2" aria-label="Mobile">
                {order.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="rounded-xl border border-white/10 bg-ink-2/50 px-4 py-3.5 text-left transition hover:border-signal/30 hover:bg-ink-2"
                    onClick={() => {
                      setMenuOpen(false);
                      scrollTo(`#${id}`);
                    }}
                  >
                    <span className="text-base font-semibold text-bone">{sectionMeta[id].nav}</span>
                    <span className="mt-0.5 block text-xs text-smoke">{sectionMeta[id].meta}</span>
                  </button>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setTheme((t) => (t === 'interface' ? 'ember' : 'interface'))}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-mist"
              >
                Accent · {theme === 'interface' ? 'Teal' : 'Ember'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (!mounted) return null;
  return createPortal(ui, document.body);
}
