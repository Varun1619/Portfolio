// Projects.jsx
import { useEffect, useRef, useState } from 'react';
import { projects as allProjects } from '../../data/projects';

const C = {
  bg: '#0a0a0a', bg2: '#111111',
  text: '#f0f0f0', muted: '#888',
  accent: '#00e87b', accentDim: 'rgba(0,232,123,0.15)',
  border: 'rgba(255,255,255,0.08)',
};

// Shape the imported data to match the carousel card expectations
const projects = allProjects.map((p) => ({
  num: p.num,
  name: p.name,
  desc: p.desc,
  stack: p.stack,
  link: p.github || null,
  id: p.id,
  video: p.video || null,
  image: p.image || null,
}));

const Projects = ({ onViewAll = null, onProjectSelect = null }) => {
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
  const carouselProjects = [...projects, ...projects];

  return (
    <div
      ref={sectionRef}
      id="projects"
      style={{
        overflow: 'hidden',
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: 'clamp(48px, 8vw, 80px) 0',
        background: C.bg2,
      }}
    >
      {/* Header */}
      <div
        className={`transition-all duration-[800ms] ease-out ${reveal}`}
        style={{ padding: '0 clamp(16px, 5vw, 40px)', marginBottom: '48px', transitionDelay: '0.1s' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
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
          {onViewAll && (
            <button
              onClick={onViewAll}
              style={{
                background: 'none',
                border: `1px solid ${C.border}`,
                borderRadius: '3px',
                color: C.muted,
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '10px 20px',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.accent;
                e.currentTarget.style.color = C.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.color = C.muted;
              }}
            >
              View All
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Scrolling track */}
      <div
        className={`transition-all duration-[800ms] ease-out ${reveal}`}
        style={{ transitionDelay: '0.25s' }}
      >
        <div className="scroll-track">
          {carouselProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} onViewAll={onViewAll} onProjectSelect={onProjectSelect} />
          ))}
        </div>
      </div>

      <style>{`
        .scroll-track {
          display: flex;
          gap: 24px;
          padding: 0 clamp(16px, 5vw, 40px);
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
const ProjectCard = ({ project, onViewAll = null, onProjectSelect = null }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const handleClick = onProjectSelect ? () => onProjectSelect(project) : (onViewAll || undefined);

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        cursor: (onProjectSelect || onViewAll) ? 'pointer' : 'default',
        flexShrink: 0,
        width: 'clamp(280px, 80vw, 420px)',
        background: C.bg,
        border: `1px solid ${hovered ? C.accent : C.border}`,
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
          zIndex: 1,
        }}
      />

      {/* Media cover */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#0d0d0d', overflow: 'hidden' }}>
        {project.video ? (
          <>
            {project.image && (
              <img
                src={project.image}
                alt={project.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: hovered ? 0 : 0.85,
                  transition: 'opacity 0.4s',
                  pointerEvents: 'none',
                }}
              />
            )}
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s',
              }}
            />
          </>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: hovered ? 1 : 0.85,
              transition: 'opacity 0.4s',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0d0d0d 0%, #161616 100%)',
          }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '4rem',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.06)',
              userSelect: 'none',
            }}>
              {project.num}
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
        {/* Name */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.15rem',
            fontWeight: 700,
            color: C.text,
            marginBottom: '8px',
          }}
        >
          {project.name}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '0.82rem',
            color: C.muted,
            lineHeight: 1.6,
            marginBottom: '16px',
          }}
        >
          {project.desc}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: project.link ? '16px' : 0 }}>
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

        {/* GitHub link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: hovered ? '#9b4ff5' : C.muted,
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default Projects;