# Validation record

Completed 21 October 2026 against a local production Next.js build. These are local lab measurements, not field measurements or a guarantee for a future hosting environment.

## Production Lighthouse

Measured sequentially using Lighthouse 13.5.0 and installed Chrome, with the standard mobile and desktop profiles. Source: `.qa/lighthouse-mobile.json`, `.qa/lighthouse-desktop.json`; HTML reports are beside them. Reports are ignored local artifacts.

| Metric                   | Mobile  | Desktop |
| ------------------------ | ------- | ------- |
| Performance              | **95**  | **100** |
| Accessibility            | **100** | **100** |
| Best practices           | **100** | **100** |
| SEO                      | **100** | **100** |
| First contentful paint   | 0.9 s   | 0.2 s   |
| Largest contentful paint | 2.9 s   | 0.7 s   |
| Total blocking time      | 30 ms   | 0 ms    |
| Cumulative layout shift  | 0       | 0       |

The hero image uses an accurate responsive `sizes` hint and eager/high-priority loading. The supplied 2,821,238-byte PNG was converted to a 218,138-byte WebP source (about 92% smaller); Next.js serves responsive variants. Product screenshots are local WebP files and lazy-loaded on the homepage. Motion uses Framer Motion's small DOM module, with no animation of the hero headline and no scrolling replacement.

## Checks performed

- `pnpm build`: passed; homepage and all three known case studies prerendered.
- `pnpm typecheck`: passed using installed Next.js route generation and TypeScript.
- `pnpm lint`: passed.
- `pnpm test:browser`: 12 passing viewport/route combinations. Homepage at 320, 360, 390, 768, 1024, and 1440px; each case study at 390 and 1440px.
- Browser checks include horizontal overflow, image loading, internal fragment targets, one primary heading, uncaught page errors, and axe WCAG 2/2.1/2.2 A/AA tags supported by the runner.
- The open mobile menu separately passes axe. Keyboard tests cover skip-to-content, menu opening, Escape, returned focus, section focus, and resize to desktop.
- Clipboard tests cover actual copied text and permission-denied feedback. Email links target the supplied address. No contact form or email delivery backend is implied.
- Motion tests confirm a reveal runs, a live reduced-motion preference change stops it, and all core content plus native mobile navigation remain usable with JavaScript disabled.
- Visual review covers desktop/mobile hero, project compositions, case studies, story, timeline, expertise, process, contact, and mobile navigation.
- Unknown routes render the custom not-found page. Unknown dynamic case-study URLs use Next.js streaming behavior (HTTP 200 with a not-found view and `noindex`); ordinary unknown paths return HTTP 404.
- `pnpm audit --prod`: no known vulnerabilities reported. A full dependency audit reports an unpatched `braces` advisory through development-only ESLint glob tooling (GHSA-vfj7-8cjw-p6xm). No unrelated dependency migration was attempted.

## Scope and caveats

- Automated accessibility checks and keyboard review do not replace testing with a screen reader or people with disabilities. Physical iOS/Android device testing has not been performed.
- Everlife and Go Surf imagery consists of actual captures of their public websites. Internly is explicitly an **interface study**, not a real app screenshot. See `ASSETS.md` for sources and the résumé/repository content discrepancy.
- Project outcomes describe supplied capabilities, not measured conversion, revenue, or adoption. Biography and dates are based on the supplied résumé.
- The contact action opens the visitor's mail client; copy-email requires browser clipboard support and provides fallback guidance on failure.
- This work updates the existing local repository. No hosting configuration, deployment, push, or external account change was performed.

## Reproduce

Run `pnpm build`, then `pnpm start --hostname 127.0.0.1 --port 3001` in one terminal. In another terminal, set `QA_URL` to `http://127.0.0.1:3001`, run the browser, interaction, and motion checks, then run `pnpm audit:lighthouse` on its own. Running Lighthouse alongside CPU-heavy tasks can distort the result. Chrome is the default; set `QA_BROWSER=msedge` to use an installed Edge browser instead.
