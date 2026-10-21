# Tharindu Nimesh

**Thoughtful products. Built right.**

An editorial portfolio built on the existing Next.js App Router project: three project case studies, a personal story, a growth timeline, expertise, process, and direct contact. Warm monochrome, a rust accent, real website captures, and restrained progressive motion.

[Design audit & blueprint](docs/REDESIGN.md) · [Validation results](docs/VALIDATION.md) · [Asset sources](docs/ASSETS.md)

## Develop

Requires Node.js, pnpm (the pinned version is in `package.json`), and an installed Chrome or Edge browser for browser checks.

```powershell
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). No environment variables or external services are required to run the portfolio.

## Edit the portfolio

| Area                                                | Source                                                     |
| --------------------------------------------------- | ---------------------------------------------------------- |
| Page composition                                    | `app/page.tsx`                                             |
| Typography, spacing, colors                         | `app/globals.css`                                          |
| Individual section layouts                          | `app/styles/`                                              |
| Hero, story, growth, expertise, process             | `components/`                                              |
| Project copy, tools, links, and case-study chapters | `lib/projects.ts`                                          |
| Case-study route                                    | `app/work/[slug]/page.tsx`                                 |
| Product images and device compositions              | `components/project-visual.tsx`, `public/images/projects/` |
| Email, social links, clipboard behavior             | `components/contact.tsx`, `components/copy-email.tsx`      |
| Navigation and motion                               | `components/header.tsx`, `components/motion-effects.tsx`   |
| Metadata and icon                                   | `app/layout.tsx`, `app/icon.svg`                           |

The Internly visual is a labeled interface study. Replace it with actual app captures when available and reconcile the supplied résumé with the current repository before publishing. Project copy deliberately avoids unsupported usage statistics and commercial claims.

## Verify an increment

Keep the dev server running, then run:

```powershell
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test:browser
pnpm test:interactions
pnpm test:motion
```

`pnpm test:browser /` checks just the homepage for an isolated homepage change. Without arguments it also checks all three case studies. Review screenshots in `.qa/`, then commit the completed feature separately. `pnpm format` formats maintained source and documentation.

## Production checks

```powershell
pnpm build
pnpm start --hostname 127.0.0.1 --port 3001
```

In a second terminal:

```powershell
$env:QA_URL = 'http://127.0.0.1:3001'
pnpm test:browser
pnpm test:interactions
pnpm test:motion
pnpm audit:lighthouse
```

Run Lighthouse by itself for consistent measurements. It writes HTML and JSON reports to `.qa/` and checks the 95+ performance / 100 accessibility target. Latest measured scores: **95 mobile performance, 100 desktop performance; 100 accessibility, best practices, and SEO on both.** See the validation record for conditions and limits.

The UI is server-rendered. Small client components handle navigation feedback, clipboard actions, and motion. Content is visible without animation JavaScript; reduced-motion preferences are respected. Native scrolling and semantic HTML remain the foundation.
