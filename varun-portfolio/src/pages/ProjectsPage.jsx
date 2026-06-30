import { useState } from 'react';
import { projects } from '../data/projects';

const C = {
  bg: '#0a0a0a',
  bg2: '#111111',
  text: '#f0f0f0',
  muted: '#888',
  accent: '#00e87b',
  accentDim: 'rgba(0,232,123,0.12)',
  border: 'rgba(255,255,255,0.08)',
};

const ProjectCard = ({ project, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.bg2,
        border: `1px solid ${hovered ? C.accent : C.border}`,
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 64px rgba(0,232,123,0.1)' : '0 2px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Media area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          background: '#0d0d0d',
          overflow: 'hidden',
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.85,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, #0d0d0d 0%, #161616 100%)`,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '4rem',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.04)',
                userSelect: 'none',
              }}
            >
              {project.num}
            </div>
          </div>
        )}

        {/* Tags overlay top-left */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'rgba(0,0,0,0.7)',
                color: C.accent,
                border: `1px solid rgba(0,232,123,0.3)`,
                padding: '3px 8px',
                borderRadius: '2px',
                backdropFilter: 'blur(4px)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.15rem',
            fontWeight: 700,
            color: C.text,
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          {project.name}
        </div>

        <div
          style={{
            fontSize: '0.82rem',
            color: C.muted,
            lineHeight: 1.6,
            marginBottom: '16px',
            flex: 1,
          }}
        >
          {project.tagline}
        </div>

        {/* Stack badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '0.6rem',
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
          {project.stack.length > 5 && (
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: C.muted,
                padding: '3px 8px',
              }}
            >
              +{project.stack.length - 5} more
            </span>
          )}
        </div>

        {/* View project arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: hovered ? C.accent : C.muted,
            transition: 'color 0.3s',
          }}
        >
          View Project
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s',
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = ({ onProjectSelect, onBack }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.bg,
        color: C.text,
        paddingTop: 'clamp(72px, 10vw, 100px)',
        paddingBottom: 'clamp(48px, 8vw, 80px)',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px, 5vw, 40px)',
          marginBottom: '60px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease',
        }}
      >
        {/* Back link */}
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: C.muted,
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '32px',
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

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
          Portfolio
        </p>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: C.text,
            marginBottom: '16px',
          }}
        >
          Selected{' '}
          <span style={{ WebkitTextStroke: '1.5px #f0f0f0', color: 'transparent' }}>Projects</span>
        </h1>
        <p style={{ fontSize: '1rem', color: C.muted, maxWidth: '560px', lineHeight: 1.6 }}>
          A collection of data engineering, analytics, and AI projects built during my studies and beyond.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px, 5vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(360px, 100%), 1fr))',
          gap: '28px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s ease 0.15s',
        }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectSelect(project)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
