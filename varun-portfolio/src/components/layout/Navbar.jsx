// Navbar.jsx — frosted bar that adapts to the light/dark section beneath it
import { useEffect, useRef, useState } from 'react';

const NAV_HEIGHT = 52;

const homeLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'ETL', href: '#etl' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

// Which theme is the content directly under the bar? Sections opt in with data-nav-theme="light".
function useThemeUnderNav(navRef, route) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = NAV_HEIGHT / 2;
      const hit = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((el) => !navRef.current?.contains(el));
      setTheme(hit?.closest('[data-nav-theme]')?.dataset.navTheme === 'light' ? 'light' : 'dark');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [navRef, route]);

  return theme;
}

const Navbar = ({ route, navigate }) => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useThemeUnderNav(navRef, route);
  const isHome = !route || route.page === 'home';
  const onProjects = route?.page === 'projects' || route?.page === 'project-detail';
  const light = theme === 'light' && !menuOpen;

  // Close the menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const go = () => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (isHome) {
      go();
    } else {
      navigate?.('home');
      setTimeout(go, 300);
    }
  };

  const goHome = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate?.('home');
  };

  const goProjects = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate?.('projects');
  };

  const linkClass = (active) =>
    `font-sans text-[0.8125rem] no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
      light
        ? `focus-visible:outline-accent-dark ${active ? 'text-ink-dark' : 'text-ink-dark/70 hover:text-ink-dark'}`
        : `focus-visible:outline-accent ${active ? 'text-ink' : 'text-ink/70 hover:text-ink'}`
    }`;

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={`fixed inset-x-0 top-0 z-[1000] border-b backdrop-blur-xl backdrop-saturate-[1.8] transition-colors duration-300 ${
        menuOpen ? 'border-white/10 bg-black/95' : light ? 'border-black/10 bg-canvas-light/75' : 'border-white/10 bg-black/70'
      }`}
    >
      <div
        className="mx-auto flex max-w-wide items-center justify-between px-4 sm:px-6"
        style={{ height: NAV_HEIGHT }}
      >
        <a
          href="#"
          onClick={goHome}
          aria-label="Varun Singh, home"
          className={`font-display text-[1.05rem] font-bold tracking-[0.04em] no-underline ${light ? 'text-ink-dark' : 'text-ink'}`}
        >
          VS<span className={light ? 'text-accent-dark' : 'text-accent'}>.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <a
              href="#/projects"
              onClick={goProjects}
              aria-current={onProjects ? 'page' : undefined}
              className={linkClass(onProjects)}
            >
              Projects
            </a>
          </li>
          {homeLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className={linkClass(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="relative h-10 w-10 md:hidden"
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 transition-all duration-300 ${
                light ? 'bg-ink-dark' : 'bg-ink'
              } ${
                menuOpen
                  ? i === 0 ? 'rotate-45' : '-rotate-45'
                  : i === 0 ? '-translate-y-[4px]' : 'translate-y-[3px]'
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu: full-width panel under the bar */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100svh-52px)] overflow-y-auto px-8 pb-10 pt-6 md:hidden"
      >
        <ul className="space-y-1">
          <li>
            <a
              href="#/projects"
              onClick={goProjects}
              aria-current={onProjects ? 'page' : undefined}
              className="block py-2 font-display text-[1.75rem] font-bold text-ink no-underline"
            >
              Projects
            </a>
          </li>
          {homeLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block py-2 font-display text-[1.75rem] font-bold text-ink no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
