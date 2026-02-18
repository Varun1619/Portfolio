// About.jsx
import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countersDone, setCountersDone] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  // Reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Counter animation observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !countersDone) setCountersDone(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [countersDone]);

  const stats = [
    { target: 140, suffix: 'K+', label: 'Records Processed' },
    { target: 48, suffix: '+', label: 'Engineers Trained' },
    { target: 40, suffix: '%', label: 'Faster Pipelines' },
    { target: 99, suffix: '%', label: 'SLA Compliance' },
  ];

  const reveal = (delay = 0) =>
    `transition-all duration-[800ms] ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[60px]'
    }`;

  return (
    <div ref={sectionRef}>
      {/* Ticker Tape */}
      <div
        style={{
          overflow: 'hidden',
          padding: '10px 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: '#0a0a0a',
        }}
      >
        <div className="ticker-track">
          {[...Array(2)].map((_, setIdx) =>
            [
              'Apache Spark', 'PySpark', 'Apache Kafka', 'MS Fabric', 'Power BI',
              'Python', 'Java', 'ETL Pipelines', 'Data Lakes', 'AWS', 'Docker', 'Kubernetes',
            ].map((item, i) => (
              <span
                key={`${setIdx}-${i}`}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#888',
                  padding: '0 40px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    background: '#00e87b',
                    borderRadius: '50%',
                    marginRight: '40px',
                    verticalAlign: 'middle',
                  }}
                />
                {item}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Quote Section */}
      <section
        className={`flex items-center justify-center text-center ${reveal()}`}
        style={{
          minHeight: '60vh',
          padding: '80px 40px',
          background: '#111111',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          transitionDelay: '0.1s',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
              fontWeight: 300,
              maxWidth: '800px',
              lineHeight: 1.4,
              color: '#f0f0f0',
            }}
          >
            It doesn't matter where you{' '}
            <strong style={{ color: '#00e87b', fontWeight: 600 }}>start</strong>, it's how you{' '}
            <strong style={{ color: '#00e87b', fontWeight: 600 }}>progress</strong> from there.
            Engineering data at scale, building{' '}
            <strong style={{ color: '#00e87b', fontWeight: 600 }}>intelligent</strong> systems.
          </p>
          <div
            style={{
              marginTop: '24px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.5rem',
              color: '#00e87b',
              opacity: 0.6,
              fontStyle: 'italic',
            }}
          >
            — Varun
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <div
        ref={statsRef}
        className={`grid grid-cols-2 md:grid-cols-4 ${reveal()}`}
        style={{
          background: '#0a0a0a',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          transitionDelay: '0.2s',
        }}
      >
        {stats.map((stat, idx) => (
          <StatItem
            key={idx}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            animate={countersDone}
            isLast={idx === stats.length - 1}
          />
        ))}
      </div>

      {/* Inline styles for ticker */}
      <style>{`
        .ticker-track {
          display: flex;
          animation: tickerScroll 30s linear infinite;
          white-space: nowrap;
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// ===== Counter Stat Component =====
const StatItem = ({ target, suffix, label, animate, isLast }) => {
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!animate) return;
    let current = 0;
    const increment = target / 60;
    let raf;
    const update = () => {
      current += increment;
      if (current < target) {
        setCount(Math.ceil(current));
        raf = requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [animate, target]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'clamp(32px, 4vw, 60px) clamp(20px, 3vw, 40px)',
        textAlign: 'center',
        borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.08)',
        transition: 'background 0.3s',
        background: hovered ? 'rgba(0,232,123,0.15)' : '#0a0a0a',
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800,
          color: '#00e87b',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {animate ? count : 0}{suffix}
      </div>
      <div
        style={{
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#888',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default About;