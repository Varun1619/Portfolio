// Projects.jsx
import { useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import { useReveal, revealClass } from '../../hooks/useReveal';
import { useScrollScrub, easeOut } from '../../hooks/useScrollScrub';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Projects = () => {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section id="projects" className="bg-canvas px-3 py-24 sm:px-4 md:py-32">
      <div className="mx-auto max-w-wide">
        <div
          ref={headerRef}
          className={`mb-12 flex flex-wrap items-end justify-between gap-4 px-2 md:mb-16 ${revealClass(headerVisible)}`}
        >
          <h2 className="font-display text-headline font-bold text-ink">Selected work.</h2>
          <a
            href="#/projects"
            className="font-sans text-body-lg font-medium text-accent no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View all projects <span aria-hidden="true">›</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== Project Tile =====
export const ProjectTile = ({ project }) => {
  const tileRef = useRef(null);

  // Scale up into place as the tile scrolls in.
  useScrollScrub(
    tileRef,
    (p) => {
      const e = easeOut(p);
      tileRef.current.style.transform = `scale(${0.9 + 0.1 * e})`;
      tileRef.current.style.opacity = String(0.35 + 0.65 * e);
    },
    { start: 1, end: 0.45 }
  );
  const videoRef = useRef(null);
  const hasVideo = Boolean(project.video) && !prefersReducedMotion();

  // Play only while the tile is on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [hasVideo]);

  return (
    <article
      ref={tileRef}
      className="group relative flex min-h-[560px] flex-col overflow-hidden rounded-[28px] bg-canvas-raised will-change-transform md:min-h-[640px]"
    >
      <div className="px-6 pt-12 text-center sm:px-10 md:pt-14">
        <p className="font-sans text-eyebrow font-semibold text-ink-muted">
          {project.tags.join(' · ')}
        </p>
        <h3 className="mt-2 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
          {project.name}
        </h3>
        <p className="mx-auto mt-3 max-w-[38ch] font-sans text-body-lg text-ink-muted">
          {project.pitch ?? project.desc}
        </p>

        {project.tileStats && (
          <dl className="mt-5 flex justify-center gap-10">
            {project.tileStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="font-sans text-[0.8rem] text-ink-muted">{stat.label}</dt>
                <dd className="font-display text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-ink">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {/* Stretched link: the whole tile opens the project */}
          <a
            href={`#/projects/${project.id}`}
            className="font-sans text-body-lg font-medium text-accent no-underline after:absolute after:inset-0 after:z-20 after:rounded-[28px] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Learn more <span aria-hidden="true">›</span>
            <span className="sr-only"> about {project.name}</span>
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-30 font-sans text-body-lg font-medium text-accent no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              GitHub <span aria-hidden="true">›</span>
              <span className="sr-only"> repository for {project.name} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      <div className="relative mt-10 flex flex-1 items-end justify-center px-6 pb-6 sm:px-10 sm:pb-10">
        <div className="aspect-[3/2] w-full overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-[cubic-bezier(0.28,0.11,0.32,1)] group-hover:scale-[1.02]">
          {hasVideo ? (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.image || undefined}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            project.image && (
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            )
          )}
        </div>
      </div>
    </article>
  );
};

export default Projects;
