import { useEffect, useRef, useState } from 'react';
import { recommendations } from '../../data/recommendations';

const C = {
  bg: '#0a0a0a',
  bg2: '#111111',
  bg3: '#161616',
  text: '#f0f0f0',
  muted: '#888',
  accent: '#00e87b',
  accentDim: 'rgba(0,232,123,0.1)',
  border: 'rgba(255,255,255,0.08)',
};

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
      fill="rgba(0,232,123,0.2)"
    />
  </svg>
);

const RecommendationCard = ({ rec, index, isVisible }) => {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = rec.text.split('\n\n');
  const preview = paragraphs[0];
  const hasMore = paragraphs.length > 1;

  return (
    <div
      style={{
        background: C.bg2,
        border: `1px solid ${C.border}`,
        borderRadius: '4px',
        padding: 'clamp(24px, 4vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.1 + 0.2}s, transform 0.6s ease ${index * 0.1 + 0.2}s`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top-left accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(to bottom, #00e87b, transparent)',
          opacity: 0.5,
        }}
      />

      {/* Quote mark */}
      <div style={{ position: 'absolute', top: '20px', right: '24px', opacity: 0.6 }}>
        <QuoteIcon />
      </div>

      {/* Author header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        {/* Initials avatar */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: C.accentDim,
            border: `1px solid rgba(0,232,123,0.25)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 700,
            color: C.accent,
            letterSpacing: '0.05em',
          }}
        >
          {rec.initials}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                color: C.text,
              }}
            >
              {rec.name}
            </span>
            <LinkedInIcon />
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: C.muted,
              marginTop: '2px',
              lineHeight: 1.4,
            }}
          >
            {rec.title} · {rec.company}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '6px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.accent,
                background: C.accentDim,
                padding: '2px 8px',
                borderRadius: '2px',
              }}
            >
              {rec.relationship}
            </span>
            <span style={{ fontSize: '0.68rem', color: '#555' }}>{rec.date}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: C.border }} />

      {/* Quote text */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#c8c8c8',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {expanded
            ? paragraphs.map((p, i) => (
                <span key={i}>
                  {p}
                  {i < paragraphs.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </span>
              ))
            : preview}
          {!expanded && hasMore && (
            <span style={{ color: '#555' }}>…</span>
          )}
        </p>

        {hasMore && (
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{
              marginTop: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: C.accent,
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'inherit',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {expanded ? 'Show less' : 'Read more'}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s',
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const Recommendations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="recommendations"
      style={{
        background: C.bg,
        borderTop: `1px solid ${C.border}`,
        padding: 'clamp(48px, 8vw, 80px) 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px, 5vw, 40px)',
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: '48px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: C.accent,
              marginBottom: '12px',
            }}
          >
            LinkedIn Recommendations
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: C.text,
              marginBottom: '16px',
            }}
          >
            What Colleagues{' '}
            <span style={{ WebkitTextStroke: '1.5px #f0f0f0', color: 'transparent' }}>
              Say
            </span>
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: C.muted,
              maxWidth: '500px',
              lineHeight: 1.6,
            }}
          >
            Recommendations from the team at Mass General Brigham during my internship.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(480px, 100%), 1fr))',
            gap: '24px',
          }}
        >
          {recommendations.map((rec, i) => (
            <RecommendationCard key={rec.id} rec={rec} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
