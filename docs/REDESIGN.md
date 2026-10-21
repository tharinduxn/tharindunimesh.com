# Portfolio audit and redesign blueprint

Reviewed 21 October 2026. Baseline: commit `7140aeb`, Next.js 16.4.2, React 19.3.0. The existing repository is an untouched Create Next App screen, not an implemented portfolio. Preserve its App Router, TypeScript, pnpm, and Tailwind setup. Read the installed Next.js guides before implementation.

## Section audit

| Section | Current weakness / generic quality | Proposed improvement and UX reason | Motion |
| --- | --- | --- | --- |
| Navigation | Absent; framework links do not help a visitor explore work. | Compact typographic identity, direct Work / About / Approach anchors and a contact action. Solid, sticky surface; accessible mobile disclosure. | Short underline / arrow transitions; no glass or animated backdrop. |
| Hero | Starter instructions and framework logos have no personal positioning. | Oversized “Thoughtful products. Built with purpose.” with a binary portrait, short builder statement, and one primary path to work. The portrait supplies a distinctive signature. | Brief entrance of secondary details; headline immediately readable. |
| Projects | Absent; there is no evidence of craft. | Three full-width editorial showcases with real web screenshots, one clearly identified mobile interface study, and dedicated case-study routes. Problem, goal, approach, solution, and outcome become readable narratives. | Subtle image hover on pointer devices; short route entrance. |
| About | Absent; a generic skill summary would duplicate the hero. | A personal thesis about useful software, connecting web and mobile craft with the supplied MIS background. | One-time text reveal, no word-by-word hiding. |
| Experience | Absent; a résumé table would break the narrative. | A compact progression from banking to MIS to technical leadership, with exact résumé dates and no invented commercial metrics. | Reveal each milestone once. |
| Expertise | Absent; proficiency bars would provide little evidence. | Five capabilities tied to concrete deliverables and relevant tools. Show what each skill helps someone do. | Quiet hover / focus feedback. |
| Process | Absent; a decorative diagram would add noise. | Five numbered Discover / Define / Design / Build / Refine rows with specific decisions and outputs. Readable without interaction. | Reveal a row on entry; no scroll pinning. |
| Contact | Absent; no viable next action. | A large invitation, working email link, copy-email control with status feedback, and verified social links. No pretend submission form. | Arrow motion with keyboard-equivalent emphasis. |
| Footer | Starter links promote Next.js rather than the person. | Compact ownership, location, source profile, and back-to-top action. | Native anchor navigation. |

## Visual system

- **Sequence:** introduction → selected work → philosophy → growth → expertise and process → contact.
- **Layout:** 1280px content maximum; fluid side gutters from 22px to 72px; 12-column desktop compositions translated into deliberate single-column mobile reading order. Editorial dividers replace repeated cards.
- **Typography:** self-hosted Geist sans for confident display and readable body; Geist Mono for small index labels. Fluid display scale around 58–136px; section headings 40–76px; body 16–20px. Tight display tracking and comfortable body line height.
- **Palette:** paper `#f7f5f0`, ink `#242522`, muted `#62635d`, line `#d9d8d0`, rust `#a5432d`. One site accent; original product screenshots retain their own colors. Contrast must be measured.
- **Components:** container, section label, arrow link, project showcase, screenshot frame, case-study narrative, milestone, process row, copy-email control, mobile navigation.
- **Motion:** Framer Motion for small one-time reveals. Prefer native scrolling over adding GSAP and Lenis for overlapping jobs; this is an intentional performance decision. No continuous loops, fake cursors, forced scrolling, or parallax. Content remains readable without JS and respects reduced motion.
- **Mobile:** art-directed hero with compact portrait; naturally sized headline; full-width project images; vertical case-study flow; touch targets at least 44px; no horizontal scroll or hover-only information. Test 360, 390, 768, 1024, and 1440px plus narrow 320px coverage.

## Content and evidence

- The supplied résumé is the primary source for biography, dates, contact links, and project descriptions. Reference contacts and personal phone numbers are not reproduced on the page.
- User-supplied binary portrait is used as-is with format/size optimization only.
- Capture actual public pages at https://www.everlifeweddings.com/ and https://gosurfsrilanka.com/ for portfolio images. Preserve originals' visual identity.
- https://github.com/tharinduxn/internly has no published screenshots in its README and has naming/stack differences from the résumé. Use résumé naming, describe intended functionality without unsupported adoption claims, and label any authored mockup “Interface study.” Do not present a mockup as a real screenshot.
- Do not invent conversion gains, user counts, revenue, testimonials, employment, or research activities. Outcomes describe implemented capabilities supplied by the author.

## Incremental implementation and validation

1. Commit this audit and repeatable browser/accessibility checks.
2. Establish the hero and visual foundations; optimize the supplied portrait.
3. Build product showcases and complete case-study routes as one cohesive feature.
4. Add the personal story, then the growth timeline as separate features.
5. Add the expertise/process section.
6. Finish contact and footer.
7. Add responsive navigation across the completed narrative.
8. Add progressive motion and verify reduced-motion behavior.
9. Run production performance checks, resolve observed issues, and document results.

Before every commit: TypeScript, ESLint, browser responsive checks, axe accessibility checks, and review the relevant screenshot. Browser scripts also check console errors, broken internal anchors, and image loading. Final checks include all case-study routes, keyboard interactions, reduced motion, no-JS content, production build, and mobile/desktop Lighthouse. A Lighthouse score is reported only after measurement; 95+ is the target, not a guaranteed field result.
