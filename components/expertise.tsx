const capabilities = [
  { title: "Frontend engineering", detail: "Responsive interfaces with clear structure, considered interactions, and maintainable components.", tools: "React / Next.js / TypeScript" },
  { title: "Mobile development", detail: "Connected experiences that feel at home on a small screen, across Android and iOS.", tools: "Flutter / Dart / Riverpod" },
  { title: "UI systems", detail: "A consistent visual language that carries the same care from the first screen to the last.", tools: "Figma / Tailwind CSS / Framer Motion" },
  { title: "Performance", detail: "Fast loading, efficient assets, and responsive interactions built into the experience.", tools: "Image optimisation / SEO / Vercel" },
  { title: "Product thinking", detail: "Connecting what people need with what the interface and the underlying system can do.", tools: "User flows / API integration / Data modelling" },
];

export function Expertise() {
  return (
    <section id="expertise" className="expertise-section" aria-labelledby="expertise-heading">
      <div className="container section"><div className="section-top"><div><div className="section-label eyebrow"><span className="index">04 /</span> What I bring</div><h2 className="section-heading" id="expertise-heading">From interface<br /><span className="muted">to implementation.</span></h2></div><p>The right tools matter.<br />Knowing what to do with them matters more.</p></div>
        <div className="capabilities">{capabilities.map((capability, index) => <div className="capability" key={capability.title}><span className="eyebrow capability-index">0{index + 1}</span><h3>{capability.title}</h3><div><p>{capability.detail}</p><span className="eyebrow">{capability.tools}</span></div><span className="capability-symbol" aria-hidden="true">↗</span></div>)}</div>
      </div>
    </section>
  );
}
