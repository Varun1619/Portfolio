// Hero.jsx
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const stagger = (delay) =>
    `transition-all duration-[800ms] ease-out ${
      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-[60px]'
    }`;

  const metaItems = [
    { label: 'Currently', value: 'MS @ Northeastern' },
    { label: 'Previously', value: 'Mass General Brigham' },
    { label: 'Focus', value: 'Data & ML Engineering' },
    { label: 'GPA', value: '3.85' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-10 pt-28 pb-16 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Giant background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(200px, 28vw, 500px)',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.02)',
          letterSpacing: '-0.03em',
        }}
      >
        VARUN
      </div>

      {/* Tag line */}
      <p
        className={stagger(0)}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#00e87b',
          marginBottom: '24px',
          transitionDelay: '0.2s',
        }}
      >
        Data Engineer · ML Enthusiast · Boston, MA
      </p>

      {/* Name */}
      <h1
        className={stagger(1)}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          marginBottom: '16px',
          color: '#f0f0f0',
          transitionDelay: '0.35s',
        }}
      >
        Varun
        <br />
        <span
          style={{
            WebkitTextStroke: '2px #f0f0f0',
            color: 'transparent',
          }}
        >
          Singh
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className={stagger(2)}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
          fontWeight: 300,
          color: '#888',
          letterSpacing: '0.02em',
          marginBottom: '40px',
          transitionDelay: '0.5s',
        }}
      >
        Building{' '}
        <strong style={{ color: '#00e87b', fontWeight: 600 }}>
          scalable data systems
        </strong>{' '}
        and intelligent automation
      </p>

      {/* Meta info row */}
      <div
        className={`flex flex-wrap gap-8 sm:gap-12 ${stagger(3)}`}
        style={{ transitionDelay: '0.65s' }}
      >
        {metaItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#888',
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1rem',
                fontWeight: 600,
                color: '#f0f0f0',
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transition: 'opacity 0.8s ease', transitionDelay: '0.8s' }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#888',
          }}
        >
          Scroll
        </span>
        <div
          className="animate-scroll-pulse"
          style={{
            width: '1px',
            height: '50px',
            background: 'linear-gradient(to bottom, #00e87b, transparent)',
          }}
        />
      </div>

      {/* Inline keyframes for scroll pulse */}
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        .animate-scroll-pulse {
          animation: scrollPulse 2s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;