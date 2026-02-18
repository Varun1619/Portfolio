// Footer.jsx
import React from 'react';

const Footer = () => {
  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'ETL Sim', href: '#etl' },
    { label: 'Skills', href: '#skills' },
  ];

  const socialLinks = [
    { label: 'Email', href: 'mailto:singh.varun3@northeastern.edu' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/varunsinghtech', external: true },
    { label: 'GitHub', href: 'https://github.com/Varun1619', external: true },
  ];

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer
      id="contact"
      style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Main CTA area */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ minHeight: '60vh', padding: '80px 40px' }}
      >
        {/* Large background text */}
        <div
          className="absolute pointer-events-none select-none whitespace-nowrap"
          style={{
            bottom: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(100px, 20vw, 350px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.015)',
          }}
        >
          CONNECT
        </div>

        {/* Section label */}
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
          Get In Touch
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#f0f0f0',
            marginBottom: '24px',
          }}
        >
          Always building.{' '}
          <span style={{ color: '#00e87b' }}>Let's connect.</span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            color: '#888',
            fontSize: '1rem',
            marginBottom: '40px',
            maxWidth: '500px',
          }}
        >
          Open to data engineering, ML engineering, and automation roles. Currently based in
          Boston, MA.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center" style={{ gap: '16px' }}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="footer-cta-link"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#f0f0f0',
                textDecoration: 'none',
                padding: '14px 32px',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '2px',
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-block',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0a0a0a';
                e.currentTarget.style.borderColor = '#00e87b';
                e.currentTarget.querySelector('.fill').style.height = '100%';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#f0f0f0';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.querySelector('.fill').style.height = '0';
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
              <span
                className="fill"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '0',
                  background: '#00e87b',
                  transition: 'height 0.3s',
                  zIndex: 0,
                }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-wrap items-center justify-between"
        style={{
          padding: '24px 40px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          gap: '16px',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#f0f0f0',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          VS<span style={{ color: '#00e87b' }}>.</span>
        </a>

        {/* Nav links */}
        <div className="hidden sm:flex" style={{ gap: '24px' }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                color: '#888',
                textDecoration: 'none',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00e87b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: '0.7rem',
            color: '#888',
            letterSpacing: '0.1em',
          }}
        >
          © 2026 Varun Vinod Singh
        </p>
      </div>
    </footer>
  );
};

export default Footer;