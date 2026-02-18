// Navbar.jsx
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'ETL Sim', href: '#etl' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between"
      style={{
        padding: '20px 40px',
        mixBlendMode: 'difference',
        transition: 'all 0.3s',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="no-underline"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '0.05em',
          color: '#f0f0f0',
          textDecoration: 'none',
        }}
      >
        VS<span style={{ color: '#00e87b' }}>.</span>
      </a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center" style={{ gap: '28px' }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="nav-link"
            style={{
              color: '#888',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
              position: 'relative',
              paddingBottom: '4px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00e87b';
              e.currentTarget.querySelector('.link-underline').style.width = '100%';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#888';
              e.currentTarget.querySelector('.link-underline').style.width = '0';
            }}
          >
            {link.label}
            <span
              className="link-underline"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 0,
                height: '1px',
                background: '#00e87b',
                transition: 'width 0.3s',
              }}
            />
          </a>
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
        onClick={() => {
          const menu = document.getElementById('mobileMenu');
          if (menu) {
            const isOpen = menu.style.opacity === '1';
            menu.style.opacity = isOpen ? '0' : '1';
            menu.style.visibility = isOpen ? 'hidden' : 'visible';
            menu.style.transform = isOpen ? 'translateY(-10px)' : 'translateY(0)';
          }
        }}
      >
        <span style={{ width: '20px', height: '1.5px', background: '#f0f0f0' }} />
        <span style={{ width: '14px', height: '1.5px', background: '#f0f0f0' }} />
      </button>

      {/* Mobile dropdown */}
      <div
        id="mobileMenu"
        className="md:hidden absolute right-6"
        style={{
          top: '70px',
          background: '#161621',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          opacity: 0,
          visibility: 'hidden',
          transform: 'translateY(-10px)',
          transition: 'all 0.3s ease',
        }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              handleClick(e, link.href);
              const menu = document.getElementById('mobileMenu');
              if (menu) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
              }
            }}
            style={{
              color: '#888',
              textDecoration: 'none',
              fontSize: '0.75rem',
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
    </nav>
  );
};

export default Navbar;