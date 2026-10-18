// Hero.jsx
import { useEffect, useRef, useState } from 'react';

const metaItems = [
  { label: 'Currently', value: 'MS @ Northeastern' },
  { label: 'Previously', value: 'Mass General Brigham' },
  { label: 'Focus', value: 'Data & ML Engineering' },
  { label: 'GPA', value: '3.85' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll progress through the hero, 0 at the top and 1 once it has scrolled away.
function useHeroProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const height = el.offsetHeight || 1;
      setProgress(Math.min(Math.max(window.scrollY / height, 0), 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

const scrollToContact = (e) => {
  e.preventDefault();
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const progress = useHeroProgress(sectionRef);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const reveal = (delay) => ({
    className: `transition-all duration-[900ms] ease-[cubic-bezier(0.28,0.11,0.32,1)] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`,
    style: { transitionDelay: `${delay}s` },
  });

  // Content recedes slightly as the page scrolls past the hero.
  const contentStyle = {
    transform: `scale(${1 - progress * 0.08})`,
    opacity: 1 - progress * 1.2,
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-canvas px-4 sm:px-6 pt-28 pb-20"
    >
      {/* Soft accent glow behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div
        className="relative mx-auto w-full max-w-content text-center will-change-transform"
        style={contentStyle}
      >
        <p {...reveal(0.1)}>
          <span className="block font-sans text-eyebrow font-semibold text-ink-muted">
            Data Engineer · Boston, MA
          </span>
        </p>

        <h1 {...reveal(0.2)}>
          <span className="mt-4 block font-display text-hero font-bold text-ink">
            Varun Singh.
          </span>
        </h1>

        <p {...reveal(0.35)}>
          <span className="mx-auto mt-6 block max-w-[34ch] font-sans text-subhead font-medium text-ink-muted">
            Building <span className="text-ink">scalable data systems</span> and intelligent
            automation.
          </span>
        </p>

        <div {...reveal(0.5)}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href="#/projects"
              className="rounded-full bg-accent px-6 py-3 font-sans text-[1.0625rem] font-medium text-black no-underline transition-colors duration-200 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              View projects
            </a>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="font-sans text-[1.0625rem] font-medium text-accent no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Get in touch <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>

        <div {...reveal(0.65)}>
          <dl className="mx-auto mt-20 grid max-w-[760px] grid-cols-2 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
            {metaItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="font-sans text-eyebrow text-ink-muted">{item.label}</dt>
                <dd className="font-display text-base font-semibold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;
