// About.jsx
import { useReveal, revealClass } from '../../hooks/useReveal';

const stats = [
  { value: '140K+', label: 'Records processed per batch' },
  { value: '48+', label: 'Engineers trained' },
  { value: '40%', label: 'Faster pipelines' },
  { value: '99%', label: 'SLA compliance' },
];

const About = () => {
  const [headRef, headVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal(0.3);

  return (
    <section id="about" data-nav-theme="light" className="bg-canvas-light px-4 py-24 sm:px-6 md:py-36">
      <div className="mx-auto max-w-content text-center">
        <div ref={headRef} className={revealClass(headVisible)}>
          <p className="font-sans text-eyebrow font-semibold text-ink-dark-muted">About</p>
          <h2 className="mx-auto mt-3 max-w-[18ch] font-display text-headline font-bold text-ink-dark">
            It doesn’t matter where you start. It’s how you{' '}
            <span className="text-accent-dark">progress.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[40ch] font-sans text-subhead font-medium text-ink-dark-muted">
            Engineering data at scale and building intelligent systems.
          </p>
        </div>

        <dl
          ref={statsRef}
          className={`mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-24 md:grid-cols-4 ${revealClass(statsVisible)}`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center gap-2">
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
