'use client';

import { useEffect, type ReactNode } from 'react';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from '@/lib/content/portfolio';
import { resolveHashTarget } from '@/lib/hashTargets';
import { useSmoothScroll } from '@/hooks/smoothScroll';
import Navbar from './Navbar';
import Hero from './Hero';
import ExploreRail from './ExploreRail';
import Scene from './Scene';
import About from './About';
import Journey from './Journey';
import SelectedWork from './SelectedWork';
import TopPicks from './TopPicks';
import Skills from './Skills';
import Achievements from './Achievements';
import ResumeViewer from './ResumeViewer';
import FinalCTA from './FinalCTA';

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
      <main>
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
