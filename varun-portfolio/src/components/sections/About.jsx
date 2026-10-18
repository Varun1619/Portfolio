// About.jsx
import { useRef } from "react";
import { useReveal, revealClass } from "../../hooks/useReveal";
import { useScrollScrub } from "../../hooks/useScrollScrub";

const stats = [
  { value: "~3 yrs", label: "Building data systems" },
  { value: "45%", label: "Fewer data incidents" },
  { value: "140K+", label: "Records validated weekly" },
  { value: "100K+", label: "Records anonymized for AI" },
];

// Headline words; the last one is highlighted in the accent colour.
const headline =
  "It doesn’t matter where you start. It’s how you progress.".split(" ");

const About = () => {
  const headRef = useRef(null);
  const wordRefs = useRef([]);

  // Each word lights up in turn as the headline scrolls through the viewport.
  useScrollScrub(
    headRef,
    (p) => {
      const n = wordRefs.current.length;
      wordRefs.current.forEach((word, i) => {
        if (!word) return;
        const lit = Math.min(Math.max(p * n - i, 0), 1);
        word.style.opacity = String(0.15 + 0.85 * lit);
      });
    },
    { start: 0.85, end: 0.3 },
  );
  const [statsRef, statsVisible] = useReveal(0.3);

  return (
    <section
      id="about"
      data-nav-theme="light"
      className="bg-canvas-light px-4 py-24 sm:px-6 md:py-36"
    >
      <div className="mx-auto max-w-wide">
        <div className="grid items-center gap-12 text-center lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:text-left">
          <img
            src="/images/varun-singh.webp"
            alt="Portrait of Varun Singh"
            width="720"
            height="960"
            loading="lazy"
            className="mx-auto aspect-[3/4] w-full max-w-[280px] rounded-[28px] object-cover shadow-[0_30px_60px_rgba(0,0,0,0.18)] sm:max-w-[340px] lg:max-w-none"
          />
          <div ref={headRef}>
            <p className="font-sans text-eyebrow font-semibold text-ink-dark-muted">
              About
            </p>
            <h2 className="mx-auto mt-3 max-w-[18ch] font-display text-headline font-bold text-ink-dark lg:mx-0">
              {headline.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (wordRefs.current[i] = el)}
                  className={
                    i === headline.length - 1 ? "text-accent-dark" : undefined
                  }
                >
                  {word}
                  {i < headline.length - 1 && " "}
                </span>
              ))}
            </h2>
            <p className="mx-auto mt-6 max-w-[40ch] font-sans text-subhead font-medium text-ink-dark-muted lg:mx-0">
              Engineering data at scale and building intelligent systems.
            </p>
          </div>
        </div>

        <dl
          ref={statsRef}
          className={`mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-24 md:grid-cols-4 ${revealClass(statsVisible)}`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse items-center gap-2"
            >
              <dt className="max-w-[16ch] font-sans text-[0.95rem] leading-snug text-ink-dark-muted">
                {stat.label}
              </dt>
              <dd className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.03em] text-ink-dark">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default About;
