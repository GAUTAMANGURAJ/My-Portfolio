# Gautam M A — Portfolio

Software Engineer portfolio (frontend systems) — Next.js static export on GitHub Pages.

## Local development

```bash
npm install
cp .env.example .env.local   # add Web3Forms key for inbox delivery
npm run dev
```

Open [http://localhost:3000/gautam-m-a-portfolio](http://localhost:3000/gautam-m-a-portfolio) (`basePath` is required).

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Local Next.js server |
| `npm run build` | Static export → `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |

## Contact form (Web3Forms)

1. Create a free key at [web3forms.com](https://web3forms.com).
2. Local: set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local`.
3. Production: add the same name as a **GitHub Actions repository secret**.

Without the key, the form falls back to the visitor’s mail app.

## Deploy (GitHub Pages)

Push to `main` — `.github/workflows/deploy.yml` builds `out/` and deploys.

Live URL pattern: `https://<user>.github.io/gautam-m-a-portfolio/`

Keep `basePath` in `next.config.js` aligned with the repo name.

## Deep links

| URL | Behavior |
|-----|----------|
| `?quick=1` | Skip opening + path picker → home |
| `?path=recruiter` | Enter as Recruiter path (also skips intro) |
| `?path=developer` | Enter as Developer path |
| `#work` / `#originals` | Jump to Selected Work |
| `#resume` / `#story` | Jump to Resume |
| `#contact` | Jump to contact |
| `#impact` | Jump to Impact |
| `#skills` · `#about` · `#journey` · `#highlights` | Section jumps |

Theme accent (Teal / Ember) persists in `localStorage`.

## Analytics (visitor stats)

Privacy-light, **no cookies**. Recommended free option: [GoatCounter](https://www.goatcounter.com).

1. Sign up at GoatCounter → create a site for your Pages URL  
2. Your code is the site subdomain (e.g. `gautam` → `gautam.goatcounter.com`)  
3. Local `.env.local`:

```bash
NEXT_PUBLIC_GOATCOUNTER_CODE=your-code-here
```

4. GitHub → Settings → Secrets → Actions → add `NEXT_PUBLIC_GOATCOUNTER_CODE`  
5. Redeploy — then open `https://your-code.goatcounter.com` for the dashboard  

Optional paid alternative: Plausible via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.  
If neither env is set, no analytics script loads.

## Print resume

On the Resume section, use **Print resume** (or browser Print). Styles hide chrome and print the on-page resume sheet for paper/PDF.

## Deferred (not in Phase 6)

- i18n (Tamil/English)
- Blog / notes section

## Performance notes

- Responsive portrait assets: `portrait-hero-480/640.jpg` + full `portrait-hero.jpg`
- Touch devices: grain/streaks off, lighter section motion, softer Lenis
- Heavy overlays (cursor, modals, highlights) load lazily
- Next.js major upgrade deferred (static export + `basePath` regression risk)

## Project layout

| Path | Purpose |
|------|---------|
| `components/studio/` | Live portfolio UI |
| `lib/content/portfolio.ts` | All facts / copy / projects |
| `components/ui/` | Unused shadcn scaffold (ignore) |
| `app/` | Next.js App Router entry |

## Content

Edit facts in `lib/content/portfolio.ts` — profile, projects, journey, skills, links.

Projects use **privacy-safe case studies** (problem → role → outcome) and abstract system blueprints.  
No client product screenshots are used.

SEO files: `public/robots.txt`, `public/sitemap.xml`.
