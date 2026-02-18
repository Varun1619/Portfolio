// Projects.jsx
import { useEffect, useRef, useState } from 'react';

const C = {
  bg: '#0a0a0a', bg2: '#111111',
  text: '#f0f0f0', muted: '#888',
  accent: '#00e87b', accentDim: 'rgba(0,232,123,0.15)',
  border: 'rgba(255,255,255,0.08)',
};

const projects = [
  {
    num: '01',
    name: 'Revenue Analytics Data Platform',
    desc: 'Scalable cloud analytics platform ingesting engagement metrics from multiple REST APIs, supporting batch and near real time queries with dimensional data models.',
    stack: ['SQL', 'Spark', 'MongoDB', 'Data Modeling'],
  },
  {
    num: '02',
    name: 'AI Document Assistant',
    desc: 'GenAI powered RAG system achieving 90% relevance accuracy over custom document collections with optimized retrieval and evaluation metrics.',
    stack: ['Python', 'LangChain', 'OpenAI', 'ChromaDB', 'RAG'],
  },
  {
    num: '03',
    name: 'Object & Distance Detection',
    desc: 'Assistive system for visually impaired using SSD with 98% detection accuracy. Published research findings in IRJMETS.',
    stack: ['Python', 'OpenCV', 'SSD', 'ML'],
  },
];

const Projects = () => {
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

  // Duplicate for infinite scroll
  const allProjects = [...projects, ...projects];

  return (
    <div
      ref={sectionRef}
      id="projects"
      style={{
        overflow: 'hidden',
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: '80px 0',
        background: C.bg2,
      }}
    >
      {/* Header */}
      <div
        className={`transition-all duration-[800ms] ease-out ${reveal}`}
        style={{ padding: '0 40px', marginBottom: '48px', transitionDelay: '0.1s' }}
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
          Featured Work
        </p>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: C.text,
          }}
        >
          Selected{' '}
          <span style={{ WebkitTextStroke: '1.5px #f0f0f0', color: 'transparent' }}>
            Projects
          </span>
        </h2>
      </div>

      {/* Scrolling track */}
      <div
        className={`transition-all duration-[800ms] ease-out ${reveal}`}
        style={{ transitionDelay: '0.25s' }}
      >
        <div className="scroll-track">
          {allProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>

      <style>{`
        .scroll-track {
          display: flex;
          gap: 24px;
          padding: 0 40px;
          width: max-content;
          animation: scrollProjects 25s linear infinite;
        }
        .scroll-track:hover {
          animation-play-state: paused;
        }
        @keyframes scrollProjects {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// ===== Project Card =====
const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: '420px',
        background: C.bg,
        border: `1px solid ${hovered ? C.accent : C.border}`,
        padding: '40px',
        borderRadius: '2px',
        transition: 'all 0.4s',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,232,123,0.08)' : 'none',
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: hovered ? '100px' : '60px',
          height: hovered ? '100px' : '60px',
          background: 'linear-gradient(135deg, rgba(0,232,123,0.15) 0%, transparent 60%)',
          transition: 'all 0.4s',
          pointerEvents: 'none',
        }}
      />

      {/* Number */}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '4rem',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.04)',
          lineHeight: 1,
          marginBottom: '16px',
        }}
      >
        {project.num}
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.3rem',
          fontWeight: 700,
          color: C.text,
          marginBottom: '12px',
        }}
      >
        {project.name}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: '0.85rem',
          color: C.muted,
          lineHeight: 1.6,
          marginBottom: '20px',
        }}
      >
        {project.desc}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: C.accent,
              fontWeight: 500,
              background: C.accentDim,
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Projects;