// Experience.jsx
import { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    role: 'Data & Automation Analyst, Study Space Operations',
    company: 'Northeastern University',
    period: 'Jan 2026 — Present',
    tech: ['MS Fabric', 'Delta Lake', 'PySpark', 'Dataverse', 'Power BI', 'DAX'],
    details: [
      'Built an hourly Fabric Data Pipeline ingesting 112 daily submissions from 4 station sources through Dataverse into a Delta Lake, standardizing inconsistent schemas with PySpark.',
      'Modeled booking, utilization, footfall, and rounds coverage into 7 fact and dimension tables, loaded through Dataflow Gen2 into a Power BI semantic layer.',
    ],
  },
  {
    role: 'Digital Data Engineer Intern',
    company: 'Mass General Brigham',
    period: 'Jun 2025 — Dec 2025',
    tech: ['MS Fabric', 'Fabric Data Pipelines', 'PySpark', 'MySQL', 'ServiceNow', 'Power BI'],
    details: [
      'Consolidated ServiceNow data from MySQL into an analytics-ready Fabric model through a scheduled data pipeline, joining and cleaning multiple source tables for 3 clinical operations teams.',
      'Anonymized patient PHI across 100,000+ records with PySpark, joining demographic and clinical tables to feed an AI model extracting key findings from doctor prescriptions.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'LTM Limited (formerly LTIMindtree)',
    period: 'Sep 2022 — Jul 2024',
    tech: ['Python', 'Java', 'Kafka', 'Spark', 'Airflow', 'AWS S3', 'Glue Data Catalog'],
    details: [
      'Engineered 3 streaming Kafka and Spark pipelines in Python and Java, landing 5 ServiceNow sources as partitioned Parquet on S3 at 1,500 records per minute, orchestrated as Airflow DAGs with retries, SLA alerts, and backfills.',
      'Designed a modular validation layer of schema rules, type checks, and deduplication over Glue Data Catalog tables, failing the DAG before publish and cutting data incidents 45%, from 11 to 6 a month.',
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
      style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 5vw, 40px)', background: '#0a0a0a' }}
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