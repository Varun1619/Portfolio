// Skills.jsx
import { useEffect, useRef, useState } from 'react';

const C = {
  bg: '#0a0a0a', bg2: '#111111',
  text: '#f0f0f0', muted: '#888',
  accent: '#00e87b', accentDim: 'rgba(0,232,123,0.15)',
  border: 'rgba(255,255,255,0.08)',
};

const skillGroups = [
  { title: 'Languages', tags: ['Java', 'Python', 'JavaScript', 'SQL', 'NoSQL', 'PL/SQL'] },
  { title: 'Data Processing', tags: ['Apache Spark', 'PySpark', 'Apache Kafka', 'ETL/ELT', 'Batch & Stream'] },
  { title: 'Databases', tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Data Lakes', 'Data Warehouses'] },
  { title: 'Cloud & Infra', tags: ['S3', 'Lambda', 'Glue', 'CloudWatch', 'EC2', 'IAM'] },
  { title: 'Frameworks', tags: ['REST APIs', 'Microservices', 'Spring Boot', 'LangChain'] },
  { title: 'DevOps & Tools', tags: ['Power BI', 'Tableau', 'Git', 'Docker', 'Kubernetes', 'CI/CD'] },
];

const Skills = () => {
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

  const reveal = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-[60px]';

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{ padding: '120px 40px', background: C.bg }}
    >
      {/* Header */}
      <div
        className={`transition-all duration-[800ms] ease-out ${reveal}`}
        style={{ transitionDelay: '0.1s' }}
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
          Toolkit
        </p>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '40px',
            color: C.text,
          }}
        >
          Technical{' '}
          <span style={{ WebkitTextStroke: '1.5px #f0f0f0', color: 'transparent' }}>
            Skills
          </span>
        </h2>
      </div>

      {/* Skills grid */}
      <div
        className={`transition-all duration-[800ms] ease-out ${reveal}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2px',
          transitionDelay: '0.25s',
        }}
      >
        {skillGroups.map((group) => (
          <SkillGroup key={group.title} title={group.title} tags={group.tags} />
        ))}
      </div>
    </section>
  );
};

// ===== Skill Group =====
const SkillGroup = ({ title, tags }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(0,232,123,0.02)' : C.bg2,
        padding: '40px',
        border: `1px solid ${hovered ? C.accentDim : C.border}`,
        transition: 'all 0.4s',
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: C.accent,
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <SkillTag key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
};

// ===== Skill Tag =====
const SkillTag = ({ label }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: '0.8rem',
        color: hovered ? C.accent : C.muted,
        padding: '6px 14px',
        border: `1px solid ${hovered ? C.accent : C.border}`,
        borderRadius: '2px',
        background: hovered ? C.accentDim : 'transparent',
        transition: 'all 0.3s',
        cursor: 'default',
      }}
    >
      {label}
    </span>
  );
};

export default Skills;