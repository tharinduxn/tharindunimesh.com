import { Arrow } from "./arrow";
import { CopyEmail } from "./copy-email";

export function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container section">
        <div className="section-label eyebrow">
          <span className="index">06 /</span> Make the next thing
        </div>
        <div className="contact-top" data-reveal>
          <h2 id="contact-heading">
            Have an idea?
            <br />
            <span>Let’s make it real.</span>
          </h2>
          <a
            className="contact-round-link"
            href="mailto:tharinduxn@gmail.com"
            aria-label="Email Tharindu about your project"
          >
            <Arrow />
          </a>
        </div>
        <div className="contact-bottom" data-reveal>
          <div className="contact-info">
            <p className="contact-description">
              A new product, a better interface, or something worth figuring out. Whether you are
              hiring for a product team or planning a web or mobile build, I’d love to hear about
              it.
            </p>
            <dl className="contact-meta">
              <div>
                <dt className="eyebrow">Collaboration</dt>
                <dd>Web &amp; Mobile Product Engineering</dd>
              </div>
              <div>
                <dt className="eyebrow">Location &amp; Time</dt>
                <dd>Matara, Sri Lanka (UTC+5:30)</dd>
              </div>
            </dl>
            <div className="contact-socials">
              <a
                className="text-link"
                href="https://github.com/tharinduxn"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span className="sr-only">(opens in a new tab)</span>
                <Arrow />
              </a>
              <a
                className="text-link"
                href="https://linkedin.com/in/tharinduxn"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span className="sr-only">(opens in a new tab)</span>
                <Arrow />
              </a>
            </div>
          </div>
          <div className="contact-email">
            <span className="eyebrow">Direct inquiry / Start a conversation</span>
            <a href="mailto:tharinduxn@gmail.com">tharinduxn@gmail.com</a>
            <CopyEmail />
          </div>
        </div>
      </div>
    </section>
  );
}
