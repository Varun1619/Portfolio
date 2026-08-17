// Resume.jsx
import { useEffect, useRef, useState } from 'react';

const RESUME_PATH = '/resume/Varun_Singh_Resume.pdf';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const reveal = () =>
    `transition-all duration-[800ms] ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[60px]'
    }`;

  const highlights = [
    { label: 'Experience', value: '3+ Years' },
    { label: 'Focus', value: 'Data & ML Engineering' },
    { label: 'Education', value: 'MS @ Northeastern' },
    { label: 'Format', value: 'PDF · 1 Page' },
  ];

  return (
    <section
      ref={sectionRef}
      id="resume"
      style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 5vw, 40px)', background: '#111111' }}
    >
      {/* Section header */}
      <div className={reveal()} style={{ transitionDelay: '0.1s' }}>
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#00e87b',
            marginBottom: '12px',
          }}
        >
          Credentials
        </p>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '40px',
            color: '#f0f0f0',
          }}
        >
          My{' '}
          <span
            style={{
              WebkitTextStroke: '1.5px #f0f0f0',
              color: 'transparent',
            }}
          >
            Resume
          </span>
        </h2>
      </div>

      {/* Content card */}
      <div
        className={`flex flex-col lg:flex-row items-center ${reveal()}`}
        style={{
          gap: 'clamp(24px, 4vw, 48px)',
          transitionDelay: '0.25s',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '4px',
          padding: 'clamp(28px, 4vw, 48px)',
          background: '#0a0a0a',
        }}
      >
        {/* Document preview */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 'clamp(140px, 20vw, 180px)',
            height: 'clamp(180px, 26vw, 230px)',
            border: '1px solid rgba(0,232,123,0.3)',
            borderRadius: '3px',
            background: 'rgba(0,232,123,0.05)',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#00e87b',
            }}
          >
            PDF
          </span>
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#00e87b',
            }}
          />
        </div>

        {/* Details */}
        <div className="flex-1 w-full">
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 600,
              color: '#f0f0f0',
              marginBottom: '10px',
            }}
          >
            Varun Vinod Singh
          </h3>
          <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '28px', maxWidth: '520px' }}>
            A complete snapshot of my experience, projects, and skills in data engineering
            and machine learning — download or view the full PDF below.
          </p>

          {/* Highlights */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{ gap: '20px', marginBottom: '32px' }}
          >
            {highlights.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#888',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#f0f0f0',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap" style={{ gap: '16px' }}>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredBtn('view')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: hoveredBtn === 'view' ? '#0a0a0a' : '#f0f0f0',
                textDecoration: 'none',
                padding: '14px 32px',
                border: '1px solid rgba(255,255,255,0.08)',
                borderColor: hoveredBtn === 'view' ? '#00e87b' : 'rgba(255,255,255,0.08)',
                background: hoveredBtn === 'view' ? '#00e87b' : 'transparent',
                borderRadius: '2px',
                display: 'inline-block',
                transition: 'all 0.3s',
              }}
            >
              View Resume
            </a>
            <a
              href={RESUME_PATH}
              download="Varun_Singh_Resume.pdf"
              onMouseEnter={() => setHoveredBtn('download')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: hoveredBtn === 'download' ? '#0a0a0a' : '#00e87b',
                textDecoration: 'none',
                padding: '14px 32px',
                border: '1px solid #00e87b',
                background: hoveredBtn === 'download' ? '#00e87b' : 'transparent',
                borderRadius: '2px',
                display: 'inline-block',
                transition: 'all 0.3s',
              }}
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
