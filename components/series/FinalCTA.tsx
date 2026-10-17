'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { profile } from '@/lib/content/portfolio';
import { useSmoothScroll } from '@/hooks/smoothScroll';
import { useReducedMotionPref } from '@/hooks/useMedia';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(80),
  email: z.string().email('Enter a valid email'),
  subject: z.string().max(120).optional(),
  message: z.string().min(10, 'Message should be at least 10 characters').max(2000),
});

type ContactValues = z.infer<typeof contactSchema>;

type Status = 'idle' | 'sending' | 'sent' | 'error';

type ToastState = {
  tone: 'success' | 'error';
  title: string;
  detail: string;
} | null;

const CHANNELS = [
  {
    id: 'linkedin' as const,
    label: 'LinkedIn',
    hint: 'Professional profile',
    href: profile.links.linkedin,
    accent: '#38bdf8',
    action: '↗' as const,
  },
  {
    id: 'github' as const,
    label: 'GitHub',
    hint: 'Code & experiments',
    href: profile.links.github,
    accent: '#e8eef8',
    action: '↗' as const,
  },
  {
    id: 'email' as const,
    label: 'Email',
    hint: profile.email,
    href: `mailto:${profile.email}`,
    accent: '#2dd4bf',
    action: '↗' as const,
  },
  {
    id: 'resume' as const,
    label: 'Resume',
    hint: 'Download PDF',
    href: profile.resumePdf,
    accent: '#fbbf24',
    action: '↓' as const,
    download: true,
  },
];

export default function FinalCTA({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollTo } = useSmoothScroll();
  const [status, setStatus] = useState<Status>('idle');
  const [toast, setToast] = useState<ToastState>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.65], [0, 1]);
  const panelY = useTransform(scrollYProgress, [0.1, 0.85], [48, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    // Match jet flight: ~5.5s arrive + 2s hold + ~1.8s exit
    const t = window.setTimeout(() => setToast(null), reduced ? 2200 : 9600);
    return () => window.clearTimeout(t);
  }, [toast, reduced]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus('sending');
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    const subject = values.subject?.trim() || `Portfolio message from ${values.name}`;

    try {
      if (accessKey) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            name: values.name,
            email: values.email,
            subject,
            message: values.message,
            from_name: 'Gautam Portfolio',
          }),
        });
        const data = (await res.json()) as { success?: boolean };
        if (!res.ok || !data.success) throw new Error('submit failed');
        setStatus('sent');
        setToast({
          tone: 'success',
          title: 'Message sent',
          detail: "Thanks — I'll reply to your email soon.",
        });
        window.setTimeout(() => setStatus('idle'), 1800);
        reset();
        return;
      }

      const body = [`Name: ${values.name}`, `Email: ${values.email}`, '', values.message].join('\n');
      setStatus('sent');
      setToast({
        tone: 'success',
        title: 'Opening your mail app',
        detail: 'Please send the prefilled message to reach me.',
      });
      reset();
      window.setTimeout(() => {
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }, 220);
      window.setTimeout(() => setStatus('idle'), 1800);
    } catch {
      setStatus('idle');
      setToast({
        tone: 'error',
        title: 'Could not send',
        detail: `Try again or email ${profile.email}`,
      });
    }
  };

  const toastPortal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {toast && <AirplaneBannerToast key={`${toast.tone}-${toast.title}`} toast={toast} reduced={reduced} />}
      </AnimatePresence>,
      document.body,
    );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-28 sm:px-6 sm:py-32"
    >
      {toastPortal}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_48%_at_50%_35%,rgba(45,212,191,0.16),transparent_68%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        animate={reduced ? undefined : { opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,212,191,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.35) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse at center, black 22%, transparent 70%)',
        }}
      />
      <Particles count={44} color="45,212,191" />

      <motion.div className="relative z-10 w-full max-w-5xl px-2 text-center" style={{ opacity }}>
        <motion.p
          className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-signal"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Open channel
        </motion.p>
        <motion.h2
          className="font-display leading-[0.9] text-bone"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 5.5rem)', y: yTitle }}
        >
          Transmit a message
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mist sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A direct line to my inbox — share the role, project, or idea you want to build.
        </motion.p>
      </motion.div>

      {/* Signal Desk — split layout */}
      <motion.div
        className="relative z-10 mt-12 w-full max-w-5xl sm:mt-14"
        style={{ y: panelY, opacity }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-6% 0px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-signal/10 blur-3xl sm:-inset-8"
          animate={reduced ? undefined : { opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="contact-panel relative grid overflow-hidden rounded-3xl border border-white/10 bg-ink-2/75 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
          {/* Left: channels */}
          <motion.aside
            className="relative border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10"
            variants={{
              hidden: { opacity: 0, x: -24 },
              show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">Signal live</p>
            </div>
            <h3 className="font-display text-3xl tracking-wide text-bone sm:text-4xl">Channels</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
              Prefer another route? Reach me on any channel — or compose a transmission on the right.
            </p>

            <ul className="mt-8 space-y-3">
              {CHANNELS.map((c) => {
                const external = c.href.startsWith('http');
                const isDownload = 'download' in c && c.download;
                return (
                  <li key={c.id}>
                    <Magnetic strength={0.18} className="block w-full">
                      <a
                        href={c.href}
                        target={external || isDownload ? '_blank' : undefined}
                        rel={external || isDownload ? 'noreferrer' : undefined}
                        download={isDownload ? 'Gautam_MA_Resume.pdf' : undefined}
                        data-cursor="link"
                        className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-ink/50 px-4 py-3.5 transition duration-300 hover:border-white/25 hover:bg-ink/80"
                        style={{ boxShadow: 'inset 0 0 0 1px transparent' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${c.accent}44, 0 12px 40px ${c.accent}14`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'inset 0 0 0 1px transparent';
                        }}
                      >
                        <span
                          className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-ink-2/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 group-hover:border-white/20"
                          style={{
                            color: c.accent,
                            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 20px ${c.accent}18`,
                          }}
                        >
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 opacity-40"
                            style={{
                              background: `radial-gradient(circle at 30% 20%, ${c.accent}33, transparent 65%)`,
                            }}
                          />
                          <ChannelIcon id={c.id} />
                        </span>
                        <span className="min-w-0 flex-1 text-left">
                          <span className="block text-sm font-semibold text-bone transition group-hover:text-white">
                            {c.label}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-smoke">{c.hint}</span>
                        </span>
                        <span
                          className={`shrink-0 text-lg transition duration-300 ${
                            isDownload
                              ? 'group-hover:translate-y-0.5'
                              : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                          }`}
                          style={{ color: c.accent }}
                        >
                          {c.action}
                        </span>
                      </a>
                    </Magnetic>
                  </li>
                );
              })}
            </ul>
          </motion.aside>

          {/* Right: compose */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="relative p-6 sm:p-8 lg:p-10"
            variants={{
              hidden: { opacity: 0, x: 24 },
              show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, staggerChildren: 0.08 } },
            }}
            noValidate
          >
            <span aria-hidden className="pointer-events-none absolute right-5 top-5 h-4 w-4 border-r border-t border-signal/40" />
            <span aria-hidden className="pointer-events-none absolute bottom-5 left-5 h-4 w-4 border-b border-l border-signal/40" />

            <div className="mb-6 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Compose</p>
                <h3 className="mt-1 font-display text-2xl tracking-wide text-bone sm:text-3xl">New transmission</h3>
              </div>
              <span className="hidden rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-smoke sm:inline">
                Secure · inbox
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-5">
              <Field label="Name" error={errors.name?.message}>
                <input {...register('name')} autoComplete="name" placeholder="Your name" className="field-input" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="field-input"
                />
              </Field>
            </div>

            <Field label="Subject" error={errors.subject?.message} optional className="mt-5">
              <input {...register('subject')} placeholder="What is this about?" className="field-input" />
            </Field>

            <Field label="Message" error={errors.message?.message} className="mt-5">
              <textarea
                {...register('message')}
                rows={5}
                placeholder="Share a bit about the role, project, or idea…"
                className="field-input min-h-[150px] resize-y"
              />
            </Field>

            <motion.div
              className="mt-8 flex flex-col items-stretch gap-3 sm:items-center"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
            >
              <Magnetic className="w-full max-w-sm self-center" strength={0.25}>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  data-cursor="play"
                  className="group relative flex min-h-[3.35rem] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-signal px-8 text-sm font-bold tracking-[0.16em] text-ink shadow-[0_0_48px_rgba(45,212,191,0.38)] transition hover:bg-signal-2 disabled:cursor-wait disabled:opacity-90"
                  whileHover={reduced || status === 'sending' ? undefined : { scale: 1.02 }}
                  whileTap={status === 'sending' ? undefined : { scale: 0.98 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === 'sending' ? (
                      <motion.span
                        key="loading"
                        className="relative flex items-center gap-3"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        <span className="relative flex h-5 w-5">
                          <span className="absolute inset-0 rounded-full border-2 border-ink/20" />
                          <motion.span
                            className="absolute inset-0 rounded-full border-2 border-transparent border-t-ink"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                          />
                          <motion.span
                            className="absolute inset-1 rounded-full border border-transparent border-b-ink/70"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                          />
                        </span>
                        TRANSMITTING
                      </motion.span>
                    ) : status === 'sent' ? (
                      <motion.span
                        key="sent"
                        className="relative flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink/15 text-xs">✓</span>
                        SENT
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        className="relative flex items-center gap-2.5"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        SEND MESSAGE
                        <SendIcon />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </Magnetic>
              <p className="text-center text-[11px] tracking-wide text-smoke">
                Delivered to my inbox · usually replies within 24–48h
              </p>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>

      <footer className="relative z-10 mt-16 w-full max-w-5xl border-t border-white/10 px-2 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="mb-2 flex items-center justify-center gap-2.5 sm:justify-start">
              <SeriesMark />
              <span className="font-display text-lg tracking-wide text-bone">{profile.displayName}</span>
            </div>
            <p className="text-sm text-mist">
              {profile.role}
              <span className="text-smoke"> · {profile.location}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em] text-smoke sm:justify-end">
            <button type="button" onClick={() => scrollTo(0, { offset: 0 })} className="transition hover:text-bone">
              ↑ Back to top
            </button>
            <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
            <button type="button" onClick={onReplay} className="transition hover:text-bone">
              Replay intro
            </button>
          </div>
        </div>

        <p className="mt-8 border-t border-white/[0.06] pt-5 text-center text-[11px] leading-relaxed text-smoke/90 sm:text-left">
          © {new Date().getFullYear()} {profile.displayName}. All rights reserved.
        </p>
      </footer>
    </section>
  );
}

function ChannelIcon({
  id,
  className = 'relative h-5 w-5',
}: {
  id: 'linkedin' | 'github' | 'email' | 'resume';
  className?: string;
}) {
  if (id === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.06-2.065 2.064 2.064 0 112.06 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (id === 'github') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  }
  if (id === 'resume') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M14 3H7.5A1.5 1.5 0 006 4.5v15A1.5 1.5 0 007.5 21h9a1.5 1.5 0 001.5-1.5V8.5L14 3z" strokeLinejoin="round" />
        <path d="M14 3v5.5h5.5M9 12h6M9 15.5h6M9 8.5h2.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7.5L12 13l8-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="currentColor" aria-hidden>
      <path d="M3.4 11.2 19.2 3.6c.7-.3 1.4.4 1.1 1.1l-7.6 15.8c-.3.7-1.3.6-1.5-.2l-1.6-6.1-6.1-1.6c-.7-.2-.8-1.2-.1-1.4Z" />
    </svg>
  );
}

/** Jet + pennant: slow cruise in → hold 2s on the right → fly out. */
function AirplaneBannerToast({
  toast,
  reduced,
}: {
  toast: NonNullable<ToastState>;
  reduced: boolean;
}) {
  const success = toast.tone === 'success';
  const accent = success ? '#2dd4bf' : '#fcd34d';
  // ~5.5s arrival · 2s hold · ~1.8s exit
  const FLIGHT = 9.3;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed left-0 top-[4.75rem] z-[9999] w-max sm:top-24"
      initial={{ x: '-60vw', opacity: 0 }}
      animate={
        reduced
          ? { x: 'calc(100vw - 100% - 1.25rem)', opacity: 1 }
          : {
              x: ['-60vw', 'calc(100vw - 100% - 1.25rem)', 'calc(100vw - 100% - 1.25rem)', '110vw'],
              opacity: [0, 1, 1, 0.9],
              y: [0, -5, 2, -3, 0],
            }
      }
      transition={
        reduced
          ? { duration: 0.45, ease: EASE }
          : {
              x: {
                duration: FLIGHT,
                times: [0, 0.59, 0.81, 1],
                ease: ['linear', 'linear', [0.4, 0, 0.7, 1]],
              },
              opacity: { duration: FLIGHT, times: [0, 0.06, 0.88, 1] },
              y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }
      }
    >
      <div className="flex items-center pl-2">
        <div className="relative">
          <div
            className="relative flex min-h-[3.25rem] max-w-[min(70vw,18rem)] items-center gap-2.5 py-2.5 pl-4 pr-5 sm:max-w-[20rem] sm:pl-5 sm:pr-6"
            style={{
              background: 'linear-gradient(115deg, rgba(12,18,32,0.97) 0%, rgba(15,28,40,0.95) 100%)',
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)',
              boxShadow: `0 12px 36px rgba(0,0,0,0.45), inset 0 0 0 1px ${accent}66`,
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-2 left-2 w-px border-l border-dashed opacity-50"
              style={{ borderColor: accent }}
            />
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              style={{ background: `${accent}22`, color: accent }}
            >
              {success ? '✓' : '!'}
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-[13px] font-semibold tracking-wide text-bone sm:text-sm">
                {toast.title}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-mist sm:text-[11px]">
                {toast.detail}
              </p>
            </div>
          </div>
        </div>

        <svg aria-hidden viewBox="0 0 64 28" className="relative z-10 -mx-1 h-7 w-14 shrink-0 sm:w-16" fill="none">
          <path
            d="M2 16 C20 6, 42 24, 62 12"
            stroke={accent}
            strokeWidth="1.7"
            strokeDasharray="2.5 3.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle cx="2" cy="16" r="2" fill={accent} />
          <circle cx="62" cy="12" r="2" fill={accent} />
        </svg>

        <motion.div
          aria-hidden
          className="relative shrink-0"
          animate={reduced ? undefined : { rotate: [0, -3, 1, -2, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 80 42"
            className="h-11 w-[5.25rem] drop-shadow-[0_8px_14px_rgba(45,212,191,0.4)] sm:h-12 sm:w-24"
          >
            <defs>
              <linearGradient id="jet-body-fly" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="50%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
            </defs>
            <motion.path
              d="M4 22 H26"
              stroke="#2dd4bf"
              strokeWidth="2.2"
              strokeLinecap="round"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path d="M36 21 L16 7 L28 21 L16 35 Z" fill="url(#jet-body-fly)" opacity="0.95" />
            <ellipse cx="44" cy="21" rx="18" ry="6" fill="url(#jet-body-fly)" />
            <path d="M44 21 L66 14 L72 21 L66 28 Z" fill="url(#jet-body-fly)" />
            <ellipse cx="56" cy="20" rx="4.5" ry="2.4" fill="#e8eef8" opacity="0.9" />
            <path d="M28 21 L14 11 L20 21 L14 31 Z" fill="#5eead4" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Field({
  label,
  error,
  optional,
  children,
  className = '',
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
      }}
    >
      <label className="mb-2.5 flex items-baseline justify-between text-[11px] font-semibold uppercase tracking-[0.24em] text-mist">
        <span>{label}</span>
        {optional && <span className="normal-case tracking-normal text-smoke">optional</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-amber-300/90"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
