// Recommendations.jsx
import { useState } from 'react';
import { recommendations } from '../../data/recommendations';
import { useReveal, revealClass } from '../../hooks/useReveal';

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const RecommendationCard = ({ rec }) => {
  const [expanded, setExpanded] = useState(false);
  const [ref, visible] = useReveal(0.15);
  const paragraphs = rec.text.split('\n\n');
  const hasMore = paragraphs.length > 1;
  const shown = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <figure
      ref={ref}
      className={`flex flex-col rounded-[22px] bg-canvas-light p-7 md:p-10 ${revealClass(visible)}`}
    >
      <blockquote className="flex-1 space-y-4 font-sans text-[1.0625rem] leading-relaxed text-ink-dark">
        {shown.map((p, i) => (
          <p key={i}>
            {i === 0 && '“'}
            {p}
            {i === paragraphs.length - 1 && '”'}
          </p>
        ))}
      </blockquote>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-4 self-start font-sans text-[1.0625rem] font-medium text-accent-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-dark"
        >
          {expanded ? 'Show less' : 'Read more'} <span aria-hidden="true">{expanded ? '‹' : '›'}</span>
        </button>
      )}

      <figcaption className="mt-8 flex items-center gap-3 border-t border-black/10 pt-6">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-canvas-white font-display text-[0.8rem] font-bold text-ink-dark"
        >
          {rec.initials}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-2 font-sans text-[0.95rem] font-semibold text-ink-dark">
            {rec.name}
            <LinkedInIcon />
          </span>
          <span className="block font-sans text-[0.85rem] leading-snug text-ink-dark-muted">
            {rec.title} · {rec.relationship} · {rec.date}
          </span>
        </span>
      </figcaption>
    </figure>
  );
};

const Recommendations = () => {
  const [headRef, headVisible] = useReveal();

  return (
    <section id="recommendations" data-nav-theme="light" className="bg-canvas-white px-4 py-24 sm:px-6 md:py-36">
      <div className="mx-auto max-w-wide">
        <div ref={headRef} className={`text-center ${revealClass(headVisible)}`}>
          <p className="font-sans text-eyebrow font-semibold text-ink-dark-muted">Recommendations</p>
          <h2 className="mt-3 font-display text-headline font-bold text-ink-dark">What colleagues say.</h2>
          <p className="mx-auto mt-4 max-w-[40ch] font-sans text-subhead font-medium text-ink-dark-muted">
            From the team at Mass General Brigham.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-3 md:mt-16 lg:grid-cols-2">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
