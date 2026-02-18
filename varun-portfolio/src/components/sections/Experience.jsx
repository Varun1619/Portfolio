// Experience.jsx
import { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    role: 'Digital Data Engineer Intern',
    company: 'Mass General Brigham',
    period: 'Jun 2025 — Dec 2025',
    tech: ['MS Fabric', 'PySpark', 'Power BI', 'Power Apps'],
    details: [
      'Architected distributed data pipelines with built in observability to consolidate multi source data into a centralized cloud Data Lake, reducing manual intervention by 50%.',
      'Built scalable cloud based data applications processing 140K+ records per batch with 99%+ SLA compliance for downstream analytics.',
      'Designed reusable data ingestion frameworks using PySpark, reducing new pipeline development time by 40%.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'LTI Mindtree',
    period: 'Sep 2022 — Jul 2024',
    tech: ['Apache Kafka', 'Spark', 'Java', 'MySQL', 'PostgreSQL'],
    details: [
      'Engineered high throughput distributed ETL applications using Java, Apache Spark, and Apache Kafka with 25% improved data accessibility.',
      'Optimized Spark jobs through partition tuning and broadcast joins, reducing batch processing time by 40%.',
      'Trained 48+ engineers; recognized with Best Manager Award for technical mentorship.',
    ],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Nismotek',
    period: 'Nov 2020 — Apr 2021',
    tech: ['Python', 'PySpark', 'MySQL'],
    details: [
      'Designed normalized data models and validation frameworks ensuring data integrity for operational reporting.',
      'Built automation mechanisms cutting data entry effort by 60%.',
    ],
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const reveal = (delay = 0) =>
    `transition-all duration-[800ms] ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[60px]'
    }`;

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ padding: '120px 40px', background: '#0a0a0a' }}
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
          Career
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
          Work{' '}
          <span
            style={{
              WebkitTextStroke: '1.5px #f0f0f0',
              color: 'transparent',
            }}
          >
            Experience
          </span>
        </h2>
      </div>

      {/* Experience cards */}
      <div style={{ display: 'grid', gap: '2px' }}>
        {experiences.map((exp, idx) => (
          <ExperienceCard
            key={idx}
            experience={exp}
            isVisible={isVisible}
            delay={0.2 + idx * 0.15}
          />
        ))}
      </div>
    </section>
  );
};

// ===== Card Component =====
const ExperienceCard = ({ experience, isVisible, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`transition-all duration-[800ms] ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[60px]'
      }`}
      style={{
        background: hovered ? 'rgba(0,232,123,0.03)' : '#111111',
        padding: 'clamp(28px, 4vw, 48px)',
        border: `1px solid ${hovered ? 'rgba(0,232,123,0.15)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '2px',
        position: 'relative',
        overflow: 'hidden',
        transitionDelay: `${delay}s`,
        transition: 'opacity 0.8s ease, transform 0.8s ease, background 0.5s, border-color 0.5s',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: hovered ? '100%' : '0%',
          background: '#00e87b',
          transition: 'height 0.5s ease',
        }}
      />

      {/* Header row */}
      <div
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
        style={{ marginBottom: '20px' }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              fontWeight: 700,
              color: '#f0f0f0',
            }}
          >
            {experience.role}
          </div>
          <div
            style={{
              color: '#00e87b',
              fontWeight: 500,
              fontSize: '1rem',
              marginTop: '4px',
            }}
          >
            {experience.company}
          </div>
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#888',
            background: 'rgba(0,232,123,0.15)',
            padding: '6px 14px',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start',
          }}
        >
          {experience.period}
        </div>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: '20px' }}>
        {experience.tech.map((t) => (
          <span
            key={t}
            style={{
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#00e87b',
              border: '1px solid rgba(0,232,123,0.15)',
              padding: '4px 10px',
              borderRadius: '2px',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Detail paragraphs */}
      <div>
        {experience.details.map((detail, i) => (
          <p
            key={i}
            style={{
              color: '#888',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              marginBottom: i < experience.details.length - 1 ? '10px' : 0,
            }}
          >
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Experience;