export function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="container section">
        <div className="section-label eyebrow"><span className="index">02 /</span> The thinking behind the making</div>
        <div className="about-grid" data-reveal>
          <h2 className="section-heading" id="about-heading">Good software<br />feels obvious.<br /><span className="muted">Getting there<br />takes care.</span></h2>
          <div className="about-copy">
            <p className="about-lead">I’m Tharindu, a developer based in Matara, Sri Lanka. I care about the space where a useful idea becomes something people can actually use.</p>
            <p>That means thinking beyond the screen. What is someone trying to do? Where does the experience get in their way? How can the engineering make it feel simpler?</p>
            <p>I work across web and mobile, connecting React, Next.js, and Flutter with a product mindset. Studying Management Information Systems at NSBM adds another lens: understanding the people and processes behind the technology.</p>
            <div className="about-signature"><span className="signature-mark" aria-hidden="true">tn.</span><div>Tharindu Nimesh<span className="eyebrow">Curious by nature. Builder by practice.</span></div></div>
          </div>
        </div>
        <div className="about-principles"><span className="eyebrow">A few things I build by</span><p>Clarity over complexity.</p><p>Details that serve a purpose.</p><p>Care, all the way through.</p></div>
      </div>
    </section>
  );
}
