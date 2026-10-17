/**
 * Friendly hash aliases → real section element ids.
 * Examples: #work → #originals, #resume → #story, #contact → #contact
 */
const HASH_ALIASES: Record<string, string> = {
  work: 'originals',
  projects: 'originals',
  originals: 'originals',
  resume: 'story',
  cv: 'story',
  story: 'story',
  impact: 'moments',
  moments: 'moments',
  achievements: 'moments',
  highlights: 'picks',
  picks: 'picks',
  about: 'about',
  journey: 'journey',
  skills: 'skills',
  contact: 'contact',
  top: 'top',
};

export function resolveHashTarget(hash: string): string | null {
  const key = hash.replace(/^#/, '').trim().toLowerCase();
  if (!key) return null;
  if (HASH_ALIASES[key]) return HASH_ALIASES[key];
  if (typeof document !== 'undefined' && document.getElementById(key)) return key;
  return null;
}
