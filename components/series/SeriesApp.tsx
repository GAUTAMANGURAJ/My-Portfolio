'use client';

import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { viewerProfiles, type ProfileId, type Project } from '@/lib/content/portfolio';
import { SmoothScrollProvider, useSmoothScroll } from '@/hooks/smoothScroll';
import OpeningSequence from './OpeningSequence';
import ProfileSelector from './ProfileSelector';
import SeriesHome from './SeriesHome';
import CustomCursor from './CustomCursor';
import ScrollProgress from './ScrollProgress';
import { EASE } from './fx';

const PlayIntro = lazy(() => import('./PlayIntro'));
const ProjectModal = lazy(() => import('./ProjectModal'));
const ResumeModal = lazy(() => import('./ResumeModal'));

type Stage = 'opening' | 'profiles' | 'home';

const STORAGE_KEY = 'gautam-interface-originals-profile';

function readStoredProfile(): ProfileId | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return viewerProfiles.some((p) => p.id === v) ? (v as ProfileId) : null;
  } catch {
    return null;
  }
}

export default function SeriesApp() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <Series />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}

function Series() {
  const [stage, setStage] = useState<Stage>('opening');
  const [profileId, setProfileId] = useState<ProfileId>('gautam');
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  useEffect(() => {
    const s = readStoredProfile();
    if (s) {
      setProfileId(s);
      setStage('home');
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock, hydrated]);

  const pickProfile = useCallback(
    (id: ProfileId) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* ignore */
      }
      if (stage !== 'home') {
        window.scrollTo(0, 0);
        setStage('home');
      } else {
        const p = viewerProfiles.find((v) => v.id === id)!;
        setToast(`Viewing as ${p.name} — ${p.blurb.toLowerCase()}`);
        scrollTo(0, { offset: 0, duration: 1.2 });
      }
    },
    [stage, scrollTo],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  if (!hydrated) {
    return <div className="min-h-screen bg-ink" aria-hidden />;
  }

  return (
    <LayoutGroup>
      <div className="atmosphere" aria-hidden />
      <div className="grain" aria-hidden />
      <CustomCursor />
      {stage === 'home' && <ScrollProgress />}

      <AnimatePresence>
        {stage === 'opening' && (
          <OpeningSequence key="opening" onDone={() => setStage('profiles')} />
        )}
        {stage === 'profiles' && <ProfileSelector key="profiles" onPick={pickProfile} />}
      </AnimatePresence>

      {stage === 'home' && (
        // Opacity-only: scale/filter on this wrapper breaks position:fixed for the navbar
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <SeriesHome
            profileId={profileId}
            onSwitch={pickProfile}
            onPlay={() => setPlaying(true)}
            onResume={() => setResumeOpen(true)}
            onOpenProject={setProject}
            onReplay={() => {
              try {
                sessionStorage.removeItem(STORAGE_KEY);
              } catch {
                /* ignore */
              }
              setStage('opening');
            }}
          />
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>
          {project && (
            <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />
          )}
        </AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm text-bone"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
