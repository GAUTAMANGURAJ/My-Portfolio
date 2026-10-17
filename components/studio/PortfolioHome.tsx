'use client';

import { useEffect, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from '@/lib/content/portfolio';
import { resolveHashTarget } from '@/lib/hashTargets';
import { useSmoothScroll } from '@/hooks/smoothScroll';
import Navbar from './Navbar';
import Hero from './Hero';
import ExploreRail from './ExploreRail';
import Scene from './Scene';

/** Below-fold sections — code-split so the hero path stays lean. */
const About = dynamic(() => import('./About'));
const Journey = dynamic(() => import('./Journey'));
const SelectedWork = dynamic(() => import('./SelectedWork'));
const TopPicks = dynamic(() => import('./TopPicks'));
const Skills = dynamic(() => import('./Skills'));
const Achievements = dynamic(() => import('./Achievements'));
const ResumeViewer = dynamic(() => import('./ResumeViewer'));
const FinalCTA = dynamic(() => import('./FinalCTA'));

type Props = {
  profileId: ProfileId;
  onSwitch: (id: ProfileId) => void;
  onReplay: () => void;
  onPlay: () => void;
  onResume: () => void;
  onOpenProject: (p: Project) => void;
};

export default function PortfolioHome({
  profileId,
  onSwitch,
  onReplay,
  onPlay,
  onResume,
  onOpenProject,
}: Props) {
  const order = viewerProfiles.find((p) => p.id === profileId)!.order;
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const target = resolveHashTarget(window.location.hash);
    if (!target) return;
    const t = window.setTimeout(() => scrollTo(`#${target}`, { duration: 1.15 }), 480);
    return () => window.clearTimeout(t);
  }, [scrollTo, profileId]);

  useEffect(() => {
    const onHash = () => {
      const target = resolveHashTarget(window.location.hash);
      if (target) scrollTo(`#${target}`, { duration: 1.05 });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [scrollTo]);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Journey />,
    originals: <SelectedWork onOpen={onOpenProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeViewer onView={onResume} />,
  };

  return (
    <>
      <Navbar order={order} profileId={profileId} onSwitch={onSwitch} />
      <main id="main">
        <Hero key={`hero-${profileId}`} onPlay={onPlay} onResume={onResume} profileId={profileId} />
        <ExploreRail order={order} />
        {order.map((id) => (
          <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
            {sections[id]}
          </Scene>
        ))}
        <FinalCTA onReplay={onReplay} />
      </main>
    </>
  );
}
