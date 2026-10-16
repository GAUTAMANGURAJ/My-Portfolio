'use client';

import type { ReactNode } from 'react';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from '@/lib/content/portfolio';
import Navbar from './Navbar';
import Hero from './Hero';
import ContinueWatching from './ContinueWatching';
import Scene from './Scene';
import About from './About';
import Seasons from './Seasons';
import Originals from './Originals';
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

export default function SeriesHome({
  profileId,
  onSwitch,
  onReplay,
  onPlay,
  onResume,
  onOpenProject,
}: Props) {
  const order = viewerProfiles.find((p) => p.id === profileId)!.order;

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={onOpenProject} />,
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
        <ContinueWatching order={order} />
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
