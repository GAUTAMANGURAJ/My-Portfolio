'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';

const projects = [
  {
    number: '01',
    title: 'RoboLab: Robotics Operations & Backoffice Platform',
    summary: 'Frontend work across two B2B applications: robotics lab/client operations and internal administration.',
    tags: ['React', 'TypeScript', 'RBAC'],
    details: 'Workflows include fleet management, scan jobs, maintenance, CAD asset handling, tenant administration, API integration, reusable list/filter patterns, permission-aware interfaces, validation, localization, theme support, error states, testing and responsive UI.',
    featured: true,
  },
  {
    number: '02',
    title: 'Zice ESG: ESG Reporting SaaS Platform',
    summary: 'A focused reporting workspace for materiality assessment, configuration, subscription management and collaboration.',
    tags: ['React', 'ESG', 'API integration'],
    details: 'Frontend work across matrix configuration, report configuration, subscription management, organization-specific login branding, AI-assisted reporting, localization, responsive UI and testing.',
    featured: true,
  },
  {
    number: '03',
    title: 'Contract Management System',
    summary: 'A CRUD template module and contract creation, review and multi-level approval workflow.',
    tags: ['CRUD', 'Forms', 'Approval flows'],
    details: 'Independently developed frontend workflows for organizational contracts, including role-based access control and practical review flows.',
    featured: false,
  },
  {
    number: '04',
    title: 'IBM / EasytoAudit',
    summary: 'A responsive website implementation built with reusable components and Next.js.',
    tags: ['Next.js', 'Reusable UI', 'Responsive'],
    details: 'A complete website implementation with an emphasis on clean structure, responsive behavior and consistent reusable interface patterns.',
    featured: false,
  },
];

const expertise = [
  { icon: Code2, title: 'Frontend Engineering', items: 'React, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3, Responsive Design, Performance Optimization' },
  { icon: Sparkles, title: 'UI Engineering & State Management', items: 'React, Ant Design, Astrayx (lower or verify spelling), shadcn/ui, Headless UI, Radix UI, TanStack Query, TanStack Router, Zustand, React Context API, React Router DOM, React Hook Form, Zod, Framer Motion' },
  { icon: BriefcaseBusiness, title: 'API Integration & Application Architecture', items: 'REST APIs, Axios, authentication, RBAC, form validation, error handling, responsive design, i18n18next, react-i18next' },
  { icon: ArrowUpRight, title: 'Performance Optimization', items: 'code splitting, lazy loading, React.memo, useMemo, useCallback' },
  { icon: Check, title: 'Testing & Code Quality', items: 'Vitest, React Testing Library, Jest, Postman, ESLint, Prettier' },
  { icon: Database, title: 'Backend & Databases (Growing Skills)', items: 'Python, FastAPI, SQLAlchemy, Pydantic, PostgreSQL, JWT, OAuth2' },
  { icon: Github, title: 'Developer Tools', items: 'Git, GitHub, VS Code, Vite, pnpm' },
];

const milestones = [
  { date: '2022–2025', title: 'B.E. Computer Science and Engineering', kind: 'education' },
  { date: 'April 2025', title: 'Joined Pirai Infotech as Software Engineer', kind: 'work' },
  { date: '2025–present', title: 'Frontend Orchestration Initiative', kind: 'highlight' },
  { date: '2025–2026', title: 'Recognition: Budding Star of the Year', kind: 'award' },
  { date: '5 August 2026', title: 'Cisco Networking Academy: Python Essentials 1 completed', kind: 'certificate' },
];

export default function Home() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProject, setOpenProject] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.scroll-reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px' });

    revealItems.forEach((item) => observer.observe(item));

    const timeline = document.querySelector<HTMLElement>('.timeline-wrap');
    const path = document.querySelector<SVGPathElement>('.timeline-path');
    const traveler = document.querySelector<SVGCircleElement>('.timeline-traveler');
    const updateTimeline = () => {
      if (!timeline || !path || !traveler) return;
      const bounds = timeline.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.8 - bounds.top) / (bounds.height * 0.75)));
      const length = path.getTotalLength();
      const point = path.getPointAtLength(length * progress);
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      traveler.setAttribute('cx', point.x.toString());
      traveler.setAttribute('cy', point.y.toString());
      traveler.style.opacity = progress > 0.02 && progress < 0.99 ? '1' : '0';
    };
    window.addEventListener('scroll', updateTimeline, { passive: true });
    updateTimeline();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateTimeline);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Gautam M A home">
          <span className="brand-mark">G</span>
          <span>GAUTAM M A</span>
        </a>
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {['home', 'projects', 'expertise', 'experience', 'education', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} onClick={closeMenu}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="header-resume" href="/assets/resume/Gautam_MA_Resume.pdf" download>
            Resume <Download size={14} />
          </a>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero section-shell">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="status-dot" /> Available for thoughtful frontend work</div>
            <h1>Frontend Engineer —<br /><span>Building Scalable</span><br />Web Applications.</h1>
            <p className="hero-intro">I&apos;m Gautam, a frontend engineer focused on building responsive, maintainable web applications with React, Next.js, and TypeScript.</p>
            <p className="hero-support">From enterprise workflows and role-based interfaces to reusable component systems and API integrations, I turn complex requirements into clean, reliable user experiences.</p>
            <p className="hero-note">Currently expanding into backend engineering with Python and FastAPI.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View my work <ArrowDown size={17} /></a>
              <a className="button button-quiet" href="/assets/resume/Gautam_MA_Resume.pdf" download>Download Resume <Download size={16} /></a>
            </div>
            <div className="hero-meta"><span>01</span><span className="meta-line" /><span>Frontend engineering · Coimbatore, India</span></div>
          </div>
          <div className="hero-portrait reveal reveal-delay" aria-label="Portrait of Gautam M A">
            <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
            <div className="portrait-frame"><img className="portrait-image" src="/WhatsApp_Image_2026-10-15_at_11.08.36_PM.jpeg" alt="Gautam M A, frontend engineer" /><div className="portrait-fallback"><span>G</span></div><div className="portrait-caption">GAUTAM M A <span>／</span> FRONTEND ENGINEER</div></div>
            
          </div>
        </section>

        <section id="projects" className="section-shell section-block scroll-reveal">
          <div className="section-heading"><div><span className="section-kicker">02 — SELECTED WORK</span><h2>Systems built for<br /><em>real-world complexity.</em></h2></div><p>Frontend experiences for teams that need clarity, control and momentum.</p></div>
          <div className="projects-grid scroll-reveal">
            {projects.map((project, index) => (
              <article className={`project-card ${project.featured ? 'featured' : ''}`} key={project.number}>
                <div className="project-top"><span>{project.number}</span><span>{project.featured ? 'Featured project' : 'Independent build'}</span></div>
                <h3>{project.title}</h3><p>{project.summary}</p>
                <div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                <button className="project-toggle" onClick={() => setOpenProject(openProject === index ? null : index)} aria-expanded={openProject === index}>Explore project <ChevronDown size={16} className={openProject === index ? 'rotate' : ''} /></button>
                {openProject === index && <div className="project-details">{project.details}</div>}
              </article>
            ))}
          </div>
        </section>

        <section id="expertise" className="section-shell section-block expertise-section scroll-reveal">
          <div className="section-heading"><div><span className="section-kicker">03 — TECHNICAL EXPERTISE</span><h2>Tools for turning<br /><em>ideas into interfaces.</em></h2></div><p>A growing toolkit grounded in accessible, maintainable and performant product work.</p></div>
          <div className="expertise-grid scroll-reveal">{expertise.map(({ icon: Icon, title, items }) => <div className="expertise-card" key={title}><Icon size={21} /><h3>{title}</h3><p>{items}</p></div>)}</div>
        </section>

        <section id="experience" className="section-shell section-block experience-section scroll-reveal">
          <div className="section-heading"><div><span className="section-kicker">04 — PROFESSIONAL EXPERIENCE</span><h2>A timeline of<br /><em>building forward.</em></h2></div><p>Growing from frontend delivery into systems thinking, orchestration and backend fundamentals.</p></div>
          <div className="timeline-wrap scroll-reveal"><svg className="timeline-svg" viewBox="0 0 900 620" preserveAspectRatio="none" aria-hidden="true"><path className="timeline-path" d="M20 24 C 220 45, 420 32, 670 110 S 790 310, 610 380 S 330 520, 120 590" /><circle className="timeline-traveler" cx="20" cy="24" r="7" /></svg><div className="timeline-line" />{milestones.map((item, index) => <div className={`timeline-item ${index === 2 ? 'timeline-highlight' : ''}`} key={item.date}><div className="timeline-dot"><span>{index === 0 ? <GraduationCap size={15} /> : index === 3 ? <Award size={15} /> : <Check size={14} />}</span></div><div className="timeline-date">{item.date}</div><div className="timeline-content"><h3>{item.title}</h3>{item.kind === 'highlight' && <p>Leading a shift toward standardized frontend delivery and reusable orchestration patterns at Pirai Infotech.</p>}</div></div>)}</div>
          <div className="current-role scroll-reveal"><div className="role-icon"><BriefcaseBusiness size={21} /></div><div><span>Currently</span><h3>Software Engineer · Pirai Infotech Private Limited</h3><p>April 2025 to present · Pollachi, India</p></div><ArrowUpRight size={20} /></div>
        </section>

        <section id="education" className="section-shell section-block education-section scroll-reveal">
          <div className="education-card scroll-reveal"><div><span className="section-kicker">05 — EDUCATION & CERTIFICATIONS</span><h2>Foundation with<br /><em>forward motion.</em></h2></div><div className="education-list"><div><span>Degree</span><strong>B.E. Computer Science and Engineering</strong><small>Institute of Road and Transport Technology · 2022–2025</small></div><div><span>Certification</span><strong>Python Essentials 1</strong><small>Cisco Networking Academy · Completed 5 August 2026</small></div><div><span>Credential ID</span><strong>003037dc-c2af-4726-9ae8-e4407dfb8326</strong></div></div></div>
        </section>

        <section id="contact" className="section-shell contact-section scroll-reveal"><div className="contact-orb" /><div className="contact-content"><span className="section-kicker">06 — CONTACT</span><h2>Let&apos;s build something<br /><em>worth remembering.</em></h2><p>Have a complex frontend challenge or a product idea that needs shape? I&apos;d like to hear about it.</p><a className="button button-primary" href="mailto:gautamanguraj16@gmail.com">Start a conversation <Mail size={17} /></a></div><div className="contact-connect scroll-reveal"><span>Find me online</span><a href="https://github.com/GAUTAMANGURAJ/GAUTAMANGURAJ" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/gautam-anguraj-9599b2249" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} /></a><a href="mailto:gautamanguraj16@gmail.com"><Mail size={18} /> Email <ArrowUpRight size={14} /></a></div></section>
      </main>
      <footer className="site-footer section-shell"><span>© {new Date().getFullYear()} Gautam M A</span><span>Responsive by default · Maintainable by design</span><a href="#home" aria-label="Back to top"><ArrowUp size={16} /></a></footer>
    </div>
  );
}
