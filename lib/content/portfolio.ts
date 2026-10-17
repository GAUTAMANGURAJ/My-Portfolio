/**
 * Central portfolio data — Gautam M A.
 * Every fact on the site should come from this file.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

/** Keep in sync with `basePath` in next.config.js (GitHub Pages project URL). */
const BASE_PATH = '/gautam-m-a-portfolio';

export const profile = {
  fullName: 'Gautam M A',
  displayName: 'Gautam M A',
  firstName: 'GAUTAM',
  seriesTag: 'FRONTEND SYSTEMS',
  /** Label used in opening / studio moments. */
  originalLabel: 'BLUEPRINT → REALITY',
  role: 'Software Engineer',
  tagline: ['Software Engineer', 'Frontend Systems', 'React · Next.js'],
  intro:
    'Software Engineer at Pirai Infotech with primary ownership on frontend systems — building responsive, maintainable enterprise web applications with React, Next.js, and TypeScript, and expanding into Python and FastAPI.',
  location: 'Coimbatore / Pollachi, India',
  email: 'gautamanguraj16@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/gautam-anguraj-9599b2249',
    github: 'https://github.com/GAUTAMANGURAJ/GAUTAMANGURAJ',
  },
  resumePdf: `${BASE_PATH}/assets/resume/Gautam_MA_Resume.pdf`,
  portrait: {
    src: `${BASE_PATH}/assets/portrait-hero.jpg`,
    srcSet: `${BASE_PATH}/assets/portrait-hero.jpg 768w`,
    alt: 'Portrait of Gautam M A, software engineer',
  },
  interests: ['Frontend architecture', 'Reusable systems', 'Full-stack growth', 'AI-assisted engineering'],
};

export const education = [
  {
    school: 'Institute of Road and Transport Technology',
    place: 'Erode',
    degree: 'B.E. Computer Science and Engineering',
    period: '2022 – 2025',
    score: undefined as string | undefined,
  },
  {
    school: 'Nachimuthu Polytechnic College',
    place: 'Pollachi',
    degree: 'Diploma in Automobile Engineering',
    period: '2019 – 2022',
    score: undefined as string | undefined,
  },
];

export const experience = [
  {
    company: 'Pirai Infotech Private Limited',
    role: 'Software Engineer · Frontend',
    place: 'Pollachi, India',
    period: 'April 2025 – Present',
    points: [
      'Frontend ownership across enterprise platforms — an ESG intelligence suite and a robotic-arm operations SaaS (backoffice + client portal).',
      'Independently delivered a Contract Management System and a financial-accounts marketing website (static Next.js).',
      'Led significant work on an internal frontend requirements-to-code orchestration pipeline (216-file reusable library).',
      'Resolved 87 of 90 high- and highest-severity defects; recognized as Budding Star of the Year 2025–2026.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  live?: string;
  palette: Palette;
  motif: 'orbit' | 'matrix' | 'stamp' | 'static';
};

const signal: Palette = { from: '#042f2e', via: '#0f766e', to: '#060910', accent: '#2dd4bf' };
const amber: Palette = { from: '#1c1208', via: '#9a6b2f', to: '#0a0806', accent: '#d4a574' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#38bdf8' };
const violet: Palette = { from: '#0f172a', via: '#334155', to: '#060910', accent: '#94a3b8' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#34d399' };

export const projects: Project[] = [
  {
    id: 'robotic-arm',
    title: 'Robotic Arm Operations Platform',
    year: '2026',
    genre: 'SaaS · Robo-arm handling · Backoffice & Client Portal',
    logline:
      'Sole frontend ownership of two connected experiences — internal backoffice and client-facing portal for robotic-arm operations — shipped in the planned launch window.',
    stack: ['React', 'TypeScript', 'RBAC', 'REST APIs'],
    build: [
      'Became the sole frontend developer responsible for the internal backoffice and the client-facing portal.',
      'Delivered both applications within the planned launch window, with zero rejected pull requests and no post-launch production incidents.',
      'Implemented role-based access control, JWT-protected routes, session and expiry handling, multi-step configuration workflows, and reusable UI/API modules.',
      'Continued managing post-release enhancements and support for production applications.',
    ],
    features: [
      'Permission-aware interfaces',
      'JWT-protected routes & session handling',
      'Multi-step configuration workflows',
      'Shared UI and API modules across two apps',
      'Post-release ownership and support',
    ],
    metrics: [
      { value: '2', label: 'connected applications' },
      { value: '0', label: 'rejected pull requests' },
      { value: '0', label: 'post-launch incidents' },
      { value: '1', label: 'sole frontend owner' },
    ],
    palette: signal,
    motif: 'orbit',
  },
  {
    id: 'esg-platform',
    title: 'ESG Intelligence Platform',
    year: '2025',
    genre: 'Enterprise SaaS · ESG Configuration & Reporting',
    logline:
      'Frontend ownership across complex ESG business modules — indicators, materiality, report configuration, and subscriptions.',
    stack: ['React', 'API integration', 'State management', 'Enterprise UI'],
    build: [
      'Took frontend ownership of authentication, indicator management, materiality assessment, report configuration, subscriptions, and related enterprise modules.',
      'Returned for a subsequent change-request phase — implementation, UAT support, client walkthroughs, and user documentation through completion.',
      'Resolved 87 of 90 high- and highest-severity defects and helped drive major feature epics toward completion.',
    ],
    features: [
      'ESG Indicator Repository',
      'Materiality Assessment',
      'Report Configuration',
      'Subscription workflows',
      'Authentication & reusable layouts',
      'UAT support & client walkthroughs',
    ],
    metrics: [
      { value: '87/90', label: 'high-severity defects resolved' },
      { value: 'CR', label: 'phase owned end-to-end' },
      { value: 'ESG', label: 'enterprise modules' },
    ],
    palette: ocean,
    motif: 'matrix',
  },
  {
    id: 'contract-management',
    title: 'Contract Management System',
    year: '2025',
    genre: 'Enterprise · First Production Module',
    logline:
      'Independently built CRUD workflows for organizational contracts — create, review, multi-level approval, and role-based access.',
    stack: ['Forms', 'CRUD', 'Approval flows', 'RBAC'],
    build: [
      'First end-to-end frontend delivery in an enterprise setting at Pirai Infotech.',
      'Covered UI development, API integration, CRUD operations, approval workflows, and role-based access control.',
    ],
    features: [
      'Contract create & review flows',
      'Multi-level approval workflow',
      'Role-based access control',
      'CRUD template module',
    ],
    metrics: [
      { value: '1st', label: 'independent enterprise module' },
      { value: 'RBAC', label: 'permission-aware flows' },
    ],
    palette: amber,
    motif: 'stamp',
  },
  {
    id: 'financial-accounts',
    title: 'Financial Accounts Website',
    year: '2025',
    genre: 'Static Website · Next.js · Financial accounts',
    logline:
      'Self-learned Next.js and shipped a responsive static site for a financial-accounts product — reusable components, delivered on timeline with stakeholder appreciation.',
    stack: ['Next.js', 'Reusable UI', 'Responsive'],
    build: [
      'Independently delivered a complete static website implementation for financial-accounts messaging and product presence.',
      'Emphasis on clean structure, responsive behavior, and consistent reusable interface patterns.',
    ],
    features: [
      'Responsive static pages',
      'Reusable component structure',
      'On-timeline delivery',
      'Stakeholder appreciation',
    ],
    metrics: [
      { value: 'Next.js', label: 'self-learned & shipped' },
      { value: 'Static', label: 'product website' },
    ],
    palette: jade,
    motif: 'static',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
};

export const achievements: Achievement[] = [
  {
    id: 'budding-star',
    title: 'Budding Star of the Year',
    org: 'Pirai Infotech',
    detail: 'Recognized for impact across enterprise frontend delivery, ownership, and quality in 2025–2026.',
    laurel: '2025 – 2026',
  },
  {
    id: 'robotic-arm-launch',
    title: 'Platform Launch',
    org: 'Pirai Infotech',
    detail: 'Sole frontend owner for robotic-arm operations backoffice and client portal — zero rejected PRs, no post-launch production incidents.',
    laurel: 'Production',
  },
  {
    id: 'orchestration',
    title: 'Frontend Orchestration',
    org: 'Internal Initiative',
    detail: 'Majority contributor on a four-person initiative; authored a reusable library of 216 files covering components and patterns.',
    laurel: '216 Files',
  },
];

export type Certification = { issuer: string; name: string; link?: string; credentialId?: string };

export const certifications: Certification[] = [
  {
    issuer: 'Cisco Networking Academy',
    name: 'Python Essentials 1',
    credentialId: '003037dc-c2af-4726-9ae8-e4407dfb8326',
  },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    subtitle: 'Interfaces & the web platform',
    skills: [
      { name: 'React', mono: 'Re', note: 'Primary' },
      { name: 'Next.js', mono: 'Nx' },
      { name: 'TypeScript', mono: 'Ts' },
      { name: 'JavaScript', mono: 'Js' },
      { name: 'Tailwind CSS', mono: 'Tw' },
      { name: 'HTML5 / CSS3', mono: 'Ht' },
    ],
  },
  {
    id: 'ui-state',
    title: 'UI & State',
    subtitle: 'Component systems & data flow',
    skills: [
      { name: 'TanStack Query', mono: 'Tq' },
      { name: 'Zustand', mono: 'Zu' },
      { name: 'React Hook Form', mono: 'Rh' },
      { name: 'Zod', mono: 'Zd' },
      { name: 'shadcn / Radix', mono: 'Ui' },
      { name: 'Framer Motion', mono: 'Fm' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & APIs',
    subtitle: 'Enterprise delivery patterns',
    skills: [
      { name: 'REST APIs', mono: 'Ap' },
      { name: 'RBAC', mono: 'Rb' },
      { name: 'JWT Auth', mono: 'Jw' },
      { name: 'i18n', mono: 'I18' },
      { name: 'Error handling', mono: 'Er' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality & Performance',
    subtitle: 'Ship clean, stay fast',
    skills: [
      { name: 'Vitest / RTL', mono: 'Vt' },
      { name: 'Code splitting', mono: 'Cs' },
      { name: 'ESLint / Prettier', mono: 'Lp' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend (Growing)',
    subtitle: 'Full-stack direction',
    skills: [
      { name: 'Python', mono: 'Py' },
      { name: 'FastAPI', mono: 'Fa' },
      { name: 'PostgreSQL', mono: 'Pg' },
      { name: 'SQLAlchemy', mono: 'Sq' },
      { name: 'Pydantic', mono: 'Pd' },
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    subtitle: 'Day-to-day craft',
    skills: [
      { name: 'Git / GitHub', mono: 'Gt' },
      { name: 'Vite', mono: 'Vi' },
      { name: 'VS Code', mono: 'Vs' },
      { name: 'pnpm', mono: 'Pn' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  React: ['Robotic Arm Operations Platform', 'ESG Intelligence Platform', 'Contract Management System'],
  'Next.js': ['Financial Accounts Website'],
  TypeScript: ['Robotic Arm Operations Platform', 'ESG Intelligence Platform'],
  RBAC: ['Robotic Arm Operations Platform', 'Contract Management System'],
  'REST APIs': ['Robotic Arm Operations Platform', 'ESG Intelligence Platform', 'Contract Management System'],
  'JWT Auth': ['Robotic Arm Operations Platform', 'ESG Intelligence Platform'],
  Python: ['Cisco Python Essentials 1', 'Backend growth path'],
  FastAPI: ['Current full-stack direction'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    number: 1,
    title: 'Building the Foundation',
    period: '2019 – 2025',
    synopsis:
      'From diploma foundations in Pollachi to Computer Science at IRTT — discovering frontend development and practical software.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Diploma',
        description:
          'Diploma in Automobile Engineering at Nachimuthu Polytechnic College, Pollachi — discipline, systems thinking, and a path into tech.',
        tags: ['Diploma', 'Pollachi'],
        runtime: '2019 – 2022',
        palette: amber,
      },
      {
        code: 'S01 E02',
        title: 'Enter CSE',
        description:
          'B.E. Computer Science and Engineering at the Institute of Road and Transport Technology, Erode — HTML, CSS, JavaScript, React, and modern web.',
        tags: ['B.E. CSE', 'React', 'IRTT'],
        runtime: '2022 – 2025',
        palette: violet,
      },
      {
        code: 'S01 E03',
        title: 'The Builder',
        description:
          'Turned technical knowledge into practical, user-friendly web applications and prepared for a career in software development.',
        tags: ['Frontend', 'Web'],
        runtime: 'College years',
        palette: ocean,
      },
    ],
  },
  {
    number: 2,
    title: 'Independent Ownership',
    period: 'April 2025 – Present',
    synopsis:
      'Joined Pirai Infotech as a Frontend Developer — first modules, stakeholder trust, and enterprise platform ownership.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'First Module',
        description:
          'Independently delivered the Contract Management System — UI, API integration, CRUD, approvals, and RBAC.',
        tags: ['CRUD', 'RBAC', 'Approvals'],
        runtime: '2025',
        palette: amber,
      },
      {
        code: 'S02 E02',
        title: 'Static, Shipped',
        description:
          'Self-learned Next.js and delivered a responsive financial-accounts static website on timeline with stakeholder appreciation.',
        tags: ['Next.js', 'Static'],
        runtime: '2025',
        palette: jade,
      },
      {
        code: 'S02 E03',
        title: 'ESG Ownership',
        description:
          'Took frontend ownership of an ESG intelligence platform — authentication, indicators, materiality, reporting, subscriptions — plus CR phase, UAT, and docs.',
        tags: ['ESG', 'Enterprise', 'UAT'],
        runtime: '2025 – 2026',
        palette: ocean,
      },
      {
        code: 'S02 E04',
        title: 'Quality Arc',
        description: 'Resolved 87 of 90 high- and highest-severity defects and helped drive major feature epics toward completion.',
        tags: ['87/90', 'Quality'],
        runtime: 'ESG',
        palette: signal,
      },
    ],
  },
  {
    number: 3,
    title: 'Complete Frontend Ownership',
    period: 'April 2026 – Present',
    synopsis: 'Sole frontend developer for a robotic-arm operations SaaS — backoffice and client portal, production-ready.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Two Applications',
        description:
          'Owned both the internal backoffice and the client-facing portal — RBAC, JWT routes, sessions, multi-step workflows, shared modules.',
        tags: ['Robotics SaaS', 'RBAC', 'JWT'],
        runtime: '2026',
        palette: signal,
      },
      {
        code: 'S03 E02',
        title: 'Clean Launch',
        description:
          'Delivered within the planned launch window — zero rejected pull requests and no post-launch production incidents.',
        tags: ['0 rejected PRs', 'Production'],
        runtime: 'Launch',
        palette: jade,
      },
    ],
  },
  {
    number: 4,
    title: 'Beyond Feature Work',
    period: 'June – August 2026',
    synopsis:
      'Designed an internal frontend requirements-to-code orchestration pipeline — raising the team baseline.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'The Pipeline',
        description:
          'Structured flow: requirements analysis → architecture → component planning → dependency validation → code generation → validation.',
        tags: ['Orchestration', 'Architecture'],
        runtime: 'Jun – Aug 2026',
        palette: violet,
      },
      {
        code: 'S04 E02',
        title: '216 Files',
        description:
          'Majority contributor in a four-person initiative; authored a reusable library covering components, state, forms, routing, and UI primitives.',
        tags: ['216 files', 'Library'],
        runtime: 'Initiative',
        palette: amber,
      },
    ],
  },
  {
    number: 5,
    title: 'Full-Stack Horizon',
    period: '2026 – Present',
    synopsis:
      'Deepening frontend craft while growing into Python, FastAPI, and AI-assisted engineering workflows.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'Backend Growth',
        description:
          'Expanding with Python, FastAPI, SQLAlchemy, Pydantic, PostgreSQL, and authentication concepts through practical implementation.',
        tags: ['Python', 'FastAPI', 'PostgreSQL'],
        runtime: 'In progress',
        palette: ocean,
      },
      {
        code: 'S05 E02',
        title: 'Product Engineer',
        description:
          'Working toward full-stack product engineering — requirements, systems design, reliable apps, and lifecycle ownership.',
        tags: ['Full-stack', 'AI-assisted'],
        runtime: 'Now',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Primary craft', title: 'React + TypeScript', detail: 'Enterprise frontend ownership', palette: signal },
  { label: 'Flagship work', title: 'Robotics SaaS', detail: 'Sole FE · 2 apps · clean launch', palette: ocean },
  { label: 'Enterprise depth', title: 'ESG Platform', detail: '87/90 severity defects resolved', palette: amber },
  { label: 'Team multiplier', title: 'Orchestration', detail: '216-file reusable library', palette: violet },
  { label: 'Recognition', title: 'Budding Star', detail: 'Pirai Infotech 2025–2026', palette: jade },
  { label: 'First module', title: 'Contracts', detail: 'Independent CRUD + approvals + RBAC', palette: amber },
  { label: 'Static ship', title: 'Accounts Site', detail: 'Next.js static site on timeline', palette: jade },
  { label: 'Growing stack', title: 'Python / FastAPI', detail: 'Full-stack direction', palette: ocean },
  { label: 'Quality bar', title: '0 incidents', detail: 'Post-launch production stability', palette: signal },
  { label: 'Current mission', title: 'Product Engineer', detail: 'Frontend architecture → full lifecycle', palette: violet },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Role',
    title: 'Software Engineer',
    lines: ['Pirai Infotech · Frontend systems ownership', 'React · Next.js · TypeScript'],
    chips: ['Available for thoughtful product work'],
  },
  {
    kicker: 'Work',
    title: 'Robotics SaaS',
    lines: ['Sole frontend owner · backoffice + client portal', 'Zero rejected PRs · no post-launch incidents'],
    chips: ['RBAC', 'JWT', 'React'],
  },
  {
    kicker: 'Work',
    title: 'ESG Platform',
    lines: ['Enterprise ESG modules end-to-end', '87 of 90 high-severity defects resolved'],
    chips: ['SaaS', 'Enterprise UI'],
  },
  {
    kicker: 'Recognition',
    title: 'Budding Star',
    lines: ['Pirai Infotech · 2025–2026', 'From first module to platform ownership'],
  },
  {
    kicker: 'Systems',
    title: 'Orchestration',
    lines: ['Requirements-to-code pipeline', '216-file reusable frontend library'],
  },
  {
    kicker: 'Next',
    title: 'Full-stack horizon',
    lines: ['Python · FastAPI · PostgreSQL', 'Product engineer across the lifecycle'],
  },
];

export type ProfileId = 'gautam' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'gautam',
    name: 'Gautam',
    blurb: 'Full overview, in order',
    color: '#2dd4bf',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#38bdf8',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & craft first',
    color: '#34d399',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'Journey & highlights first',
    color: '#d4a574',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'Education & role', palette: violet },
  journey: {
    nav: 'Journey',
    card: 'My Journey',
    meta: `${seasons.length} chapters · ${seasons.reduce((n, s) => n + s.episodes.length, 0)} milestones`,
    palette: amber,
  },
  originals: { nav: 'Work', card: 'Selected Work', meta: `${projects.length} projects · Enterprise & web`, palette: signal },
  picks: { nav: 'Highlights', card: 'Highlights', meta: 'Top signals from the work', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: {
    nav: 'Impact',
    card: 'Achievements',
    meta: `${achievements.length} achievements · ${certifications.length} certifications`,
    palette: amber,
  },
  story: { nav: 'Resume', card: 'Resume', meta: 'Resume · View & download', palette: violet },
};

export const storyBlurb =
  'My journey began with learning the fundamentals of software development in college. At Pirai Infotech, I transformed that foundation into practical engineering experience by independently delivering enterprise features and taking ownership of production applications. Over time, my focus expanded from building interfaces to solving architectural problems, creating reusable engineering standards, and automating the frontend development process. Today, I am building on that experience to grow into a full-stack engineer with a strong foundation in frontend architecture, backend development, and AI-assisted engineering.';
