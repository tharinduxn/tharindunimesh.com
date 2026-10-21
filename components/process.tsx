const steps = [
  {
    name: "Discover",
    phase: "Phase 01",
    question: "Start with the right questions.",
    description:
      "Understand the people, the problem, and the operational context before deciding what to make.",
    output: "Context & constraints",
    checkpoints: ["User goals", "Business rules", "Technical feasibility"],
  },
  {
    name: "Define",
    phase: "Phase 02",
    question: "Make the problem specific.",
    description:
      "Turn a broad idea into a clear scope, a useful user journey, and a shared picture of success.",
    output: "Scope & user flows",
    checkpoints: ["Information architecture", "Core user journeys", "Data model"],
  },
  {
    name: "Design",
    phase: "Phase 03",
    question: "Find the simplest useful form.",
    description:
      "Shape the structure, visual language, and small interactions around what someone needs to do.",
    output: "Interface & interaction",
    checkpoints: ["Typography & grid", "Component states", "Mobile ergonomics"],
  },
  {
    name: "Build",
    phase: "Phase 04",
    question: "Make the details work together.",
    description:
      "Translate the design into responsive components and connect them to reliable application logic.",
    output: "A working product",
    checkpoints: ["Type-safe implementation", "API & data integration", "Edge-case handling"],
  },
  {
    name: "Refine",
    phase: "Phase 05",
    question: "Care for the last ten percent.",
    description:
      "Test across screens, review accessibility, measure performance, and improve the rough edges.",
    output: "A considered release",
    checkpoints: ["WCAG accessibility", "Core Web Vitals", "Cross-device QA"],
  },
];

export function Process() {
  return (
    <section
      className="section container process-section"
      id="approach"
      aria-labelledby="process-heading"
    >
      <div className="process-intro" data-reveal>
        <div className="section-label eyebrow">
          <span className="index">05 /</span> How I work
        </div>
        <h2 className="section-heading" id="process-heading">
          A clear process.
          <br />
          <span className="muted">
            Room for
            <br /> discovery.
          </span>
        </h2>
        <p>
          Good work comes from asking, making, and paying attention. This is how I bring an idea
          from initial ambiguity into a dependable digital product.
        </p>
        <div className="process-diagram" aria-hidden="true">
          <span className="eyebrow process-diagram-label">Workflow architecture</span>
          <div className="process-diagram-track">
            {steps.map((step, index) => (
              <div className="process-diagram-node" key={step.name}>
                <span className="eyebrow">0{index + 1}</span>
                <span>{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ol className="process-steps">
        {steps.map((step, index) => (
          <li data-reveal key={step.name}>
            <div className="process-step-header">
              <span className="process-number eyebrow">0{index + 1}</span>
              <h3>{step.name}</h3>
              <span className="process-output eyebrow">Output: {step.output}</span>
            </div>
            <div className="process-step-body">
              <h4>{step.question}</h4>
              <p>{step.description}</p>
              <div className="process-checkpoints" aria-label={`${step.name} checkpoints`}>
                {step.checkpoints.map((point) => (
                  <span key={point} className="eyebrow">
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
