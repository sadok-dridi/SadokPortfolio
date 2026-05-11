# AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint v9 (flat config, Next.js core-web-vitals + TS rules)
```

No `typecheck`, `test`, or `format` scripts exist. There is no testing framework and no Prettier/formatting config.

## Tech Stack

- **Next.js 16** (App Router) + React 19
- **Tailwind CSS v4** — CSS-based config via `@theme` in `src/app/globals.css`. No `tailwind.config.ts` exists.
- **Animation**: GSAP + @gsap/react (ScrollTrigger), Framer Motion, Lenis smooth scroll, Swiper (cube-effect carousel)
- **Styling utilities**: `cn()` from `@/lib/utils` (clsx + tailwind-merge), path alias `@/*` → `./src/*`

## Architecture

- **All pages and most components are `'use client'`** — GSAP animations require browser APIs. Don't try to make them server components.
- **Page transitions** use `window.location.href` for navigation (full page reload), NOT `useRouter()` from `next/navigation`. The `PageTransitionProvider` wraps content and fires a GSAP wipe-out animation on link clicks before navigating.
- **Mobile handling**: Custom cursor and smooth scroll (Lenis) are disabled on touch devices via `matchMedia('(pointer: coarse)')` and `innerWidth < 768`. Always respect this pattern when adding interactive features.
- **Data is static**: All project data lives in `src/data/projects.ts` (two hardcoded entries). No CMS, no database, no API routes. The contact form uses a simulated `setTimeout` — no real backend.

## Directories

| Directory | Purpose |
|-----------|---------|
| `src/app/` | Next.js App Router: `/`, `/work`, `/work/[slug]`, `/about`, `/contact`, `/cv` |
| `src/components/` | React components (`layout/`, `sections/`, `ui/`, standalone) |
| `src/lib/` | Utilities (`cn`, `lerp`, `throttle`, etc.) and animation helpers |
| `src/data/` | Static data (`projects.ts`) |
| `src/hooks/` | Empty — reserved |
| `src/context/` | Empty — reserved |
| `public/projects/` | Project screenshots (radarx/, finhub-tn/) |

## Deployment

- `next.config.ts` sets `output: "standalone"` for Docker production builds.
- Multi-stage Dockerfile (`node:22-alpine`) → builds then runs as non-root `nextjs` user on port 3000.
- See `DEPLOYMENT_WORKFLOW.md` for the full VPS + Nginx reverse proxy flow.
- **No CI/CD pipelines** exist.

## Conventions

- Uses ESLint v9 flat config format (`eslint.config.mjs`), NOT `.eslintrc.*`.
- No `.env.example` — no environment variables needed for the app to run.
- `next-env.d.ts` is auto-generated and ignored by ESLint.
- `.gitignore` excludes yarn/pnpm lockfiles — only `package-lock.json` (npm) is used.
- `noise` CSS class adds an SVG noise texture overlay via `::before` pseudo-element.
