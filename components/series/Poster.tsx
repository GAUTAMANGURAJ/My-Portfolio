'use client';

import type { ReactNode } from 'react';
import type { Palette, Project } from '@/lib/content/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]"
      />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original — orbit / matrix / stamp / static. */
export function ProjectPoster({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  const gid = `g-${project.id}`;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={gid} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#${gid})`} />

        {project.motif === 'orbit' && (
          <g fill="none" stroke={a} transform="translate(210 55)">
            <ellipse cx="80" cy="80" rx="78" ry="78" strokeWidth="1.5" strokeOpacity="0.35" />
            <ellipse cx="80" cy="80" rx="56" ry="56" strokeWidth="1.5" strokeOpacity="0.55" />
            <ellipse cx="80" cy="80" rx="34" ry="34" strokeWidth="2" strokeOpacity="0.8" />
            <circle cx="80" cy="80" r="10" fill={a} fillOpacity="0.9" stroke="none" />
            <circle cx="158" cy="80" r="5" fill={a} stroke="none" />
            <circle cx="80" cy="24" r="4" fill={a} fillOpacity="0.7" stroke="none" />
            <circle cx="30" cy="120" r="3.5" fill={a} fillOpacity="0.55" stroke="none" />
            <path d="M80 2 A78 78 0 0 1 158 80" strokeWidth="2" strokeOpacity="0.9" strokeLinecap="round" />
            <path d="M2 80 A78 78 0 0 1 80 2" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="6 8" />
          </g>
        )}

        {project.motif === 'matrix' && (
          <g fill="none" stroke={a}>
            {[0, 1, 2, 3, 4].map((r) =>
              [0, 1, 2, 3, 4].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={198 + c * 32}
                  y={48 + r * 32}
                  width="22"
                  height="22"
                  rx="3"
                  strokeWidth="1.4"
                  strokeOpacity={0.2 + ((r + c) % 4) * 0.18}
                  fill={(r + c) % 5 === 0 ? a : 'none'}
                  fillOpacity="0.22"
                />
              )),
            )}
            <path d="M190 220 h180" strokeWidth="2" strokeOpacity="0.65" />
            <path d="M190 234 h140" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M190 248 h100" strokeWidth="1" strokeOpacity="0.2" />
          </g>
        )}

        {project.motif === 'stamp' && (
          <g transform="translate(220 48)" fill="none" stroke={a}>
            <rect x="8" y="16" width="140" height="170" rx="8" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="22" y="32" width="112" height="28" rx="4" strokeOpacity="0.5" />
            <line x1="28" x2="128" y1="80" y2="80" strokeWidth="2" strokeOpacity="0.35" strokeLinecap="round" />
            <line x1="28" x2="110" y1="100" y2="100" strokeWidth="2" strokeOpacity="0.28" strokeLinecap="round" />
            <line x1="28" x2="120" y1="120" y2="120" strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />
            <circle cx="118" cy="158" r="22" strokeWidth="2" strokeOpacity="0.75" strokeDasharray="4 3" />
            <path d="M108 158 l7 7 l14 -16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
            <text x="78" y="210" textAnchor="middle" fill={a} stroke="none" fontSize="9" fontFamily="DM Sans, sans-serif" letterSpacing="3" opacity="0.7">
              APPROVED
            </text>
          </g>
        )}

        {project.motif === 'static' && (
          <g fill="none" stroke={a}>
            <rect x="200" y="50" width="160" height="110" rx="10" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="214" y="64" width="48" height="14" rx="3" strokeOpacity="0.55" />
            <rect x="214" y="90" width="132" height="8" rx="2" strokeOpacity="0.35" />
            <rect x="214" y="108" width="100" height="8" rx="2" strokeOpacity="0.28" />
            <rect x="214" y="126" width="118" height="8" rx="2" strokeOpacity="0.22" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={222 + i * 18} cy="148" r="4" fill={a} fillOpacity={0.4 + i * 0.15} stroke="none" />
            ))}
            <path d="M210 200 h140" strokeWidth="2" strokeOpacity="0.5" />
            <path d="M210 214 h90" strokeWidth="1.5" strokeOpacity="0.3" />
            <g opacity="0.45">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={i} x1={250 + i * 14} x2={256 + i * 14} y1="230" y2="250" strokeWidth="1.5" strokeOpacity={0.3 + (i % 3) * 0.2} />
              ))}
            </g>
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** Alias used by cards / modal. */
export const ProjectArt = ProjectPoster;

/** Small studio mark used in the nav and hero. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 28 28" className="h-[1.05em] w-auto text-signal" fill="none" aria-hidden>
        <rect x="2" y="2" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.7" />
        <path
          d="M18.5 9.5H10.2c-1.7 0-3 1.3-3 3v1.4c0 1.7 1.3 3 3 3H16c1.5 0 2.7-1.1 2.9-2.5H14"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-mist">STUDIO</span>
    </span>
  );
}
