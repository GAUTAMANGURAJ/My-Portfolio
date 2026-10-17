/**
 * Central portfolio data — Gautam M A.
 * Every fact on the site should come from this file.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

/** Injected from `next.config.js` `env.NEXT_PUBLIC_BASE_PATH` (GitHub Pages project URL). */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/gautam-m-a-portfolio';

export const profile = {
  fullName: 'Gautam M A',
  displayName: 'Gautam M A',
  firstName: 'GAUTAM',
  studioTag: 'FRONTEND SYSTEMS',
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
    srcSet: [
      `${BASE_PATH}/assets/portrait-hero-480.jpg 480w`,
      `${BASE_PATH}/assets/portrait-hero-640.jpg 640w`,
      `${BASE_PATH}/assets/portrait-hero.jpg 819w`,
    ].join(', '),
    sizes: '(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 54vw',
    width: 819,
    height: 905,
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
      'Sole frontend owner for a robotic-arm operations SaaS (backoffice + client portal) — shipped in the planned window with 0 rejected PRs and 0 post-launch incidents.',
      'Frontend ownership on an ESG intelligence platform — 87/90 high-severity defects resolved; CR phase, UAT, and docs through completion.',
      'Majority contributor on a frontend requirements-to-code orchestration initiative — 216-file reusable library (components, state, forms, routing).',
      'Independently delivered Contract Management (CRUD + multi-level approval + RBAC) and a Next.js static financial-accounts site on timeline.',
      'Recognized as Budding Star of the Year 2025–2026 for ownership, quality, and delivery impact.',
    ],
  },
];

/** How I work — short principles for About + resume. */
export const workingPrinciples: { title: string; detail: string }[] = [
  {
    title: 'Own the surface area',
    detail: 'Prefer clear ownership of modules end-to-end — UI, API contracts, edge cases, and post-launch support — over drive-by tickets.',
  },
  {
    title: 'Prove with outcomes',
    detail: 'Ship with measurable signals: defect burn-down, launch windows, reusable systems, and production stability — not just feature checklists.',
  },
  {
    title: 'Reuse before rewrite',
    detail: 'Extract shared modules, RBAC patterns, and form/state primitives so the next feature is cheaper and safer than the last.',
  },
  {
    title: 'Privacy by default',
    detail: 'Client product UI stays private. Case studies use problem → role → outcome and abstract system blueprints.',
  },
];

export type Metric = { value: string; label: string };

/** Privacy-safe case study — no product screenshots or client UI. */
export type CaseStudy = {
  problem: string;
  role: string;
  outcome: string;
  /** One-line proof metric for cards / resume. */
  proof: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  /** Recruiter-facing narrative (problem → role → outcome). */
  caseStudy: CaseStudy;
  /** Abstract system stages for blueprint diagram (never real product UI). */
  systemFlow: string[];
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  live?: string;
  /** Shown when work is client/enterprise and has no public demo. */
  accessNote?: string;
  palette: Palette;
  motif: 'orbit' | 'matrix' | 'stamp' | 'static' | 'pipeline' | 'blueprint';
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
    caseStudy: {
      problem:
        'Operations needed two aligned apps (internal control + client access) without duplicating UI logic or weakening access control.',
      role: 'Sole frontend owner: RBAC, JWT sessions, multi-step flows, and shared UI/API modules across both apps.',
      outcome:
        'Both apps launched in the planned window — review-clean delivery and stable production after go-live.',
      proof: '2 apps · 0 rejected PRs · 0 post-launch incidents',
    },
    systemFlow: ['Auth & RBAC', 'Backoffice', 'Shared UI/API', 'Client portal', 'Production support'],
    stack: ['React', 'TypeScript', 'RBAC', 'REST APIs'],
    build: [
      'Sole frontend developer for the internal backoffice and the client-facing portal.',
      'Delivered both applications within the planned launch window — zero rejected pull requests and no post-launch production incidents.',
      'Implemented RBAC, JWT-protected routes, session/expiry handling, multi-step configuration workflows, and reusable UI/API modules.',
      'Continued post-release enhancements and production support.',
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
    accessNote: 'Enterprise · private systems · no product screenshots · walkthrough on request',
    palette: signal,
    motif: 'orbit',
  },
  {
    id: 'frontend-orchestration',
    title: 'Frontend Orchestration Pipeline',
    year: '2026',
    genre: 'Internal Platform · Requirements → Code',
    logline:
      'Majority contributor on a four-person initiative that designed a requirements-to-code orchestration flow and a 216-file reusable frontend library.',
    caseStudy: {
      problem:
        'Frontend delivery lacked a shared path from requirements to consistent components, state, forms, and routing — each feature reinvented patterns.',
      role:
        'Majority contributor: defined the six-stage orchestration flow and authored the reusable library used to raise the team baseline.',
      outcome:
        'A structured requirements→code pipeline plus a 216-file library covering components, state, forms, routing, and UI primitives.',
      proof: '216-file library · 6-stage pipeline · majority contributor',
    },
    systemFlow: [
      'Requirements analysis',
      'Architecture',
      'Component planning',
      'Dependency validation',
      'Code generation',
      'Validation & library',
    ],
    stack: ['Architecture', 'Component systems', 'State', 'Forms', 'Routing'],
    build: [
      'Designed a six-stage pipeline: requirements analysis → architecture → component planning → dependency validation → code generation → validation.',
      'Authored a reusable library (216 files) covering components, state, forms, routing, and UI primitives.',
      'Operated as majority contributor in a four-person internal initiative while shipping product work in parallel.',
      'Goal: fewer one-off patterns, faster reviews, and a clearer path from ticket to production-ready UI.',
    ],
    features: [
      'Six-stage requirements-to-code flow',
      'Reusable component & pattern library',
      'Shared state, forms, and routing modules',
      'Dependency validation before generation',
      'Team baseline acceleration',
    ],
    metrics: [
      { value: '216', label: 'library files authored' },
      { value: '6', label: 'orchestration stages' },
      { value: '4', label: 'person initiative' },
      { value: '1', label: 'majority contributor' },
    ],
    accessNote: 'Internal tooling · private · abstract overview only · details on request',
    palette: violet,
    motif: 'pipeline',
  },
  {
    id: 'esg-platform',
    title: 'ESG Intelligence Platform',
    year: '2025',
    genre: 'Enterprise SaaS · ESG Configuration & Reporting',
    logline:
      'Frontend ownership across complex ESG business modules — indicators, materiality, report configuration, and subscriptions.',
    caseStudy: {
      problem:
        'ESG configuration and reporting modules needed durable frontend ownership across auth, data flows, change requests, and UAT.',
      role:
        'Frontend owner for indicators, materiality, reporting, subscriptions — plus CR implementation, UAT, walkthroughs, and docs.',
      outcome:
        'Cleared the severity backlog and carried major feature epics through completion into a stable enterprise surface.',
      proof: '87/90 high-severity defects resolved · CR owned end-to-end',
    },
    systemFlow: ['Auth', 'Indicators', 'Materiality', 'Reporting', 'Subscriptions'],
    stack: ['React', 'API integration', 'State management', 'Enterprise UI'],
    build: [
      'Frontend ownership of authentication, indicator management, materiality assessment, report configuration, subscriptions, and related modules.',
      'Returned for a change-request phase — implementation, UAT support, client walkthroughs, and user documentation through completion.',
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
      { value: '5+', label: 'enterprise modules touched' },
      { value: 'UAT', label: 'walkthroughs & docs' },
    ],
    accessNote: 'Enterprise · private systems · no product screenshots · walkthrough on request',
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
    caseStudy: {
      problem:
        'Needed a first production-ready contract module with create, review, multi-level approval, and permission-aware access.',
      role: 'Independent frontend delivery: UI, API integration, CRUD, approvals, and RBAC.',
      outcome:
        'First end-to-end enterprise module shipped — became a reusable CRUD + approval template for later work.',
      proof: '1st independent enterprise module · CRUD + RBAC + approvals',
    },
    systemFlow: ['Create', 'Review', 'Multi-level approval', 'RBAC', 'Records'],
    stack: ['Forms', 'CRUD', 'Approval flows', 'RBAC'],
    build: [
      'First end-to-end frontend delivery in an enterprise setting at Pirai Infotech.',
      'Covered UI development, API integration, CRUD operations, approval workflows, and role-based access control.',
      'Established patterns later reused across modules (forms, permissions, review states).',
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
      { value: 'CRUD', label: 'template for later modules' },
    ],
    accessNote: 'Enterprise · private systems · no product screenshots · walkthrough on request',
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
    caseStudy: {
      problem:
        'A financial-accounts product needed a clean, responsive web presence delivered on a firm timeline.',
      role: 'Independent Next.js implementation with reusable components and consistent layout patterns.',
      outcome:
        'Shipped on timeline with stakeholder appreciation — validated Next.js static delivery under real constraints.',
      proof: 'Next.js self-learned · shipped on timeline',
    },
    systemFlow: ['Content model', 'Reusable UI', 'Responsive pages', 'Static export', 'Handoff'],
    stack: ['Next.js', 'Reusable UI', 'Responsive'],
    build: [
      'Independently delivered a complete static website for financial-accounts messaging and product presence.',
      'Emphasized clean structure, responsive behavior, and consistent reusable interface patterns.',
    ],
    features: [
      'Responsive static pages',
      'Reusable component structure',
      'On-timeline delivery',
      'Stakeholder appreciation',
    ],
    metrics: [
      { value: 'Next.js', label: 'self-learned & shipped' },
      { value: 'On time', label: 'stakeholder delivery' },
      { value: 'Static', label: 'product website' },
    ],
    accessNote: 'Client engagement · public URL available on request · no confidential UI shown',
    palette: jade,
    motif: 'static',
  },
  {
    id: 'studio-portfolio',
    title: 'Engineering Portfolio Studio',
    year: '2026',
    genre: 'Personal · Next.js · Static export · Case studies',
    logline:
      'Designed and shipped this portfolio as a privacy-safe case-study system — static Next.js on GitHub Pages, recruiter paths, and abstract system blueprints.',
    caseStudy: {
      problem:
        'Needed a hiring-facing site that proves frontend systems ownership without exposing client product UI or confidential screens.',
      role:
        'Sole designer/engineer: content model, case-study layout, motion system, contact inbox, analytics, and Pages deploy.',
      outcome:
        'Public static site with problem→role→outcome studies, path-based viewing, print resume, and privacy-light analytics.',
      proof: 'Public · static export · privacy-safe case studies',
    },
    systemFlow: ['Content model', 'Studio UI', 'Case studies', 'Static export', 'Pages + analytics'],
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'GitHub Pages'],
    build: [
      'Built a static-exported Next.js app with basePath for GitHub Pages.',
      'Centralized facts in a single content module; projects use privacy-safe case studies and abstract system diagrams.',
      'Added recruiter/developer viewing paths, contact via Web3Forms, print-friendly resume, and GoatCounter analytics.',
    ],
    features: [
      'Privacy-safe case studies (no product screenshots)',
      'Path-based viewing (recruiter / developer / creative)',
      'Print resume + downloadable PDF',
      'Contact Signal Desk (Web3Forms)',
      'Privacy-light visitor analytics',
    ],
    metrics: [
      { value: '1', label: 'public craft surface' },
      { value: '0', label: 'client UI leaked' },
      { value: '₹0', label: 'custom domain required' },
    ],
    live: 'https://gautamanguraj.github.io/gautam-m-a-portfolio/',
    github: 'https://github.com/GAUTAMANGURAJ/gautam-m-a-portfolio',
    palette: signal,
    motif: 'blueprint',
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
    detail: 'Sole frontend owner for robotic-arm operations backoffice and client portal — 0 rejected PRs, 0 post-launch production incidents.',
    laurel: 'Production',
  },
  {
    id: 'orchestration',
    title: 'Frontend Orchestration',
    org: 'Internal Initiative',
    detail: 'Majority contributor on a four-person initiative; six-stage requirements-to-code pipeline and a 216-file reusable library.',
    laurel: '216 Files',
  },
];

export type Certification = { issuer: string; name: string; link?: string; credentialId?: string };

export const certifications: Certification[] = [
  {
    issuer: 'Cisco Networking Academy',
    name: 'Python Essentials 1',
    credentialId: '003037dc-c2af-4726-9ae8-e4407dfb8326',
    link: 'https://www.credly.com/badges/003037dc-c2af-4726-9ae8-e4407dfb8326',
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
      { name: 'Vitest / RTL', mono: 'Vt', note: 'Growing' },
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
  'Next.js': ['Financial Accounts Website', 'Engineering Portfolio Studio'],
  TypeScript: ['Robotic Arm Operations Platform', 'ESG Intelligence Platform', 'Engineering Portfolio Studio'],
  JavaScript: ['ESG Intelligence Platform', 'Contract Management System'],
  'Tailwind CSS': ['Financial Accounts Website', 'Engineering Portfolio Studio'],
  'HTML5 / CSS3': ['Marketing sites & enterprise UI'],
  'TanStack Query': ['ESG Intelligence Platform', 'Robotic Arm Operations Platform'],
  Zustand: ['ESG Intelligence Platform state patterns'],
  'React Hook Form': ['Contract Management System', 'Multi-step workflows'],
  Zod: ['Form validation · Contact Signal Desk'],
  'shadcn / Radix': ['Accessible UI primitives across apps'],
  'Framer Motion': ['Engineering Portfolio Studio · motion systems'],
  'REST APIs': ['Robotic Arm Operations Platform', 'ESG Intelligence Platform', 'Contract Management System'],
  RBAC: ['Robotic Arm Operations Platform', 'Contract Management System'],
  'JWT Auth': ['Robotic Arm Operations Platform', 'ESG Intelligence Platform'],
  i18n: ['Enterprise module localization patterns'],
  'Error handling': ['ESG defect resolution · production hardening'],
  'Vitest / RTL': ['Growing familiarity · expanding coverage'],
  'Code splitting': ['Lazy routes & modal bundles'],
  'ESLint / Prettier': ['Consistent delivery standards'],
  Python: ['Cisco Python Essentials 1', 'Backend growth path'],
  FastAPI: ['Current full-stack direction'],
  PostgreSQL: ['Backend learning track'],
  SQLAlchemy: ['Backend learning track'],
  Pydantic: ['Backend learning track'],
  'Git / GitHub': ['Day-to-day delivery & reviews'],
  Vite: ['App tooling in product work'],
  'VS Code': ['Primary editor'],
  pnpm: ['Package management'],
};

export type Milestone = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Chapter = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  milestones: Milestone[];
};

export const chapters: Chapter[] = [
  {
    number: 1,
    title: 'Building the Foundation',
    period: '2019 – 2025',
    synopsis:
      'From diploma foundations in Pollachi to Computer Science at IRTT — discovering frontend development and practical software.',
    milestones: [
      {
        code: 'CH01 M01',
        title: 'The Diploma',
        description:
          'Diploma in Automobile Engineering at Nachimuthu Polytechnic College, Pollachi — discipline, systems thinking, and a path into tech.',
        tags: ['Diploma', 'Pollachi'],
        runtime: '2019 – 2022',
        palette: amber,
      },
      {
        code: 'CH01 M02',
        title: 'Enter CSE',
        description:
          'B.E. Computer Science and Engineering at the Institute of Road and Transport Technology, Erode — HTML, CSS, JavaScript, React, and modern web.',
        tags: ['B.E. CSE', 'React', 'IRTT'],
        runtime: '2022 – 2025',
        palette: violet,
      },
      {
        code: 'CH01 M03',
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
    period: 'April 2025 – March 2026',
    synopsis:
      'Joined Pirai Infotech as a Software Engineer — first modules, stakeholder trust, and enterprise platform ownership.',
    milestones: [
      {
        code: 'CH02 M01',
        title: 'First Module',
        description:
          'Independently delivered the Contract Management System — UI, API integration, CRUD, approvals, and RBAC.',
        tags: ['CRUD', 'RBAC', 'Approvals'],
        runtime: '2025',
        palette: amber,
      },
      {
        code: 'CH02 M02',
        title: 'Static, Shipped',
        description:
          'Self-learned Next.js and delivered a responsive financial-accounts static website on timeline with stakeholder appreciation.',
        tags: ['Next.js', 'Static'],
        runtime: '2025',
        palette: jade,
      },
      {
        code: 'CH02 M03',
        title: 'ESG Ownership',
        description:
          'Took frontend ownership of an ESG intelligence platform — authentication, indicators, materiality, reporting, subscriptions — plus CR phase, UAT, and docs.',
        tags: ['ESG', 'Enterprise', 'UAT'],
        runtime: '2025 – 2026',
        palette: ocean,
      },
      {
        code: 'CH02 M04',
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
    milestones: [
      {
        code: 'CH03 M01',
        title: 'Two Applications',
        description:
          'Owned both the internal backoffice and the client-facing portal — RBAC, JWT routes, sessions, multi-step workflows, shared modules.',
        tags: ['Robotics SaaS', 'RBAC', 'JWT'],
        runtime: '2026',
        palette: signal,
      },
      {
        code: 'CH03 M02',
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
    milestones: [
      {
        code: 'CH04 M01',
        title: 'The Pipeline',
        description:
          'Structured flow: requirements analysis → architecture → component planning → dependency validation → code generation → validation.',
        tags: ['Orchestration', 'Architecture'],
        runtime: 'Jun – Aug 2026',
        palette: violet,
      },
      {
        code: 'CH04 M02',
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
    milestones: [
      {
        code: 'CH05 M01',
        title: 'Backend Growth',
        description:
          'Expanding with Python, FastAPI, SQLAlchemy, Pydantic, PostgreSQL, and authentication concepts through practical implementation.',
        tags: ['Python', 'FastAPI', 'PostgreSQL'],
        runtime: 'In progress',
        palette: ocean,
      },
      {
        code: 'CH05 M02',
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
  { label: 'Flagship work', title: 'Robotics SaaS', detail: '2 apps · 0 rejected PRs · 0 incidents', palette: ocean },
  { label: 'Enterprise depth', title: 'ESG Platform', detail: '87/90 high-severity defects closed', palette: amber },
  { label: 'Team multiplier', title: 'Orchestration', detail: '216-file library · 6-stage pipeline', palette: violet },
  { label: 'Recognition', title: 'Budding Star', detail: 'Pirai Infotech 2025–2026', palette: jade },
  { label: 'First module', title: 'Contracts', detail: 'Independent CRUD + approvals + RBAC', palette: amber },
  { label: 'Static ship', title: 'Accounts Site', detail: 'Next.js static site on timeline', palette: jade },
  { label: 'Public craft', title: 'Portfolio Studio', detail: 'Privacy-safe case studies · Pages', palette: signal },
  { label: 'Growing stack', title: 'Python / FastAPI', detail: 'Full-stack direction', palette: ocean },
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
    lines: ['Sole frontend owner · backoffice + client portal', '0 rejected PRs · 0 post-launch incidents'],
    chips: ['RBAC', 'JWT', 'React'],
  },
  {
    kicker: 'Work',
    title: 'ESG Platform',
    lines: ['Enterprise ESG modules end-to-end', '87/90 high-severity defects resolved'],
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
    lines: ['Six-stage requirements-to-code pipeline', '216-file reusable frontend library'],
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
  /** Optional path-picker badge (e.g. HIRE). */
  badge?: string;
}[] = [
  {
    id: 'gautam',
    name: 'Gautam',
    blurb: 'Full story — about → work → resume',
    color: '#2dd4bf',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
    badge: 'FULL',
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Hire-ready: resume → impact → work',
    color: '#38bdf8',
    order: ['story', 'moments', 'originals', 'skills', 'about', 'journey', 'picks'],
    badge: 'HIRE',
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & systems first',
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
  about: { nav: 'About', card: 'About Me', meta: 'Story · how I work', palette: violet },
  journey: {
    nav: 'Journey',
    card: 'My Journey',
    meta: `${chapters.length} chapters · ${chapters.reduce((n, s) => n + s.milestones.length, 0)} milestones`,
    palette: amber,
  },
  originals: { nav: 'Work', card: 'Selected Work', meta: `${projects.length} projects · case studies`, palette: signal },
  picks: { nav: 'Highlights', card: 'Highlights', meta: 'Top signals from the work', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: {
    nav: 'Impact',
    card: 'Achievements',
    meta: `${achievements.length} achievements · ${certifications.length} certifications`,
    palette: amber,
  },
  story: { nav: 'Resume', card: 'Resume', meta: 'One page · proof metrics', palette: violet },
};

export const storyBlurb =
  'I started with fundamentals in college, then turned them into production ownership at Pirai Infotech — independent enterprise modules, platform frontend ownership, and measurable quality (including 87/90 high-severity defects closed). The work grew from shipping interfaces to shaping reusable systems and a requirements-to-code orchestration pipeline. I am extending that foundation toward full-stack product engineering with Python, FastAPI, and AI-assisted workflows.';