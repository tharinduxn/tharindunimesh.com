const capabilities = [
  {
    title: "Frontend engineering",
    scope: "Web applications",
    detail:
      "Responsive interfaces with clear structure, considered interactions, and maintainable component architecture.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Mobile development",
    scope: "Android & iOS",
    detail:
      "Connected mobile experiences that feel natural in the hand, with predictable state and smooth transitions.",
    tools: ["Flutter", "Dart", "Riverpod", "Firebase"],
  },
  {
    title: "UI systems & motion",
    scope: "Design engineering",
    detail:
      "A consistent visual language and purposeful motion that carry the same care from the first screen to the last.",
    tools: ["Figma", "CSS Tokens", "Framer Motion", "GSAP"],
  },
  {
    title: "Performance & quality",
    scope: "Production readiness",
    detail:
      "Fast initial loads, optimised media, semantic HTML, and keyboard-first accessibility built into the workflow.",
    tools: ["Core Web Vitals", "WCAG 2.2 AA", "Playwright", "Vercel"],
  },
  {
    title: "Product & full-stack",
    scope: "End-to-end delivery",
    detail:
      "Connecting what people need on screen with authentication, data storage, payments, and transactional email.",
    tools: ["Supabase", "PayHere", "Resend", "Gemini AI"],
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="expertise-section" aria-labelledby="expertise-heading">
      <div className="container section">
        <div className="section-top" data-reveal>
          <div>
            <div className="section-label eyebrow">
              <span className="index">04 /</span> What I bring
            </div>
            <h2 className="section-heading" id="expertise-heading">
              From interface
              <br />
              <span className="muted">to implementation.</span>
            </h2>
          </div>
          <p>
            The right tools matter. Knowing how to combine them around a real user problem matters
            more.
          </p>
        </div>
        <div className="capabilities">
          {capabilities.map((capability, index) => (
            <div className="capability" data-reveal key={capability.title}>
              <span className="eyebrow capability-index">0{index + 1}</span>
              <div className="capability-heading">
                <h3>{capability.title}</h3>
                <span className="eyebrow capability-scope">{capability.scope}</span>
              </div>
              <p className="capability-detail">{capability.detail}</p>
              <div className="capability-tools" aria-label={`${capability.title} toolkit`}>
                {capability.tools.map((tool) => (
                  <span key={tool} className="eyebrow">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
