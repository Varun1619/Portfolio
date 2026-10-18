// Footer.jsx
import { useReveal, revealClass } from '../../hooks/useReveal';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'ETL', href: '#etl' },
  { label: 'Skills', href: '#skills' },
];

const EMAIL = 'singh.varun3@northeastern.edu';

const Footer = () => {
  const [ref, visible] = useReveal(0.2);

  const handleNav = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const linkFocus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

  return (
    <footer id="contact" className="bg-canvas">
      {/* Contact call to action */}
      <div ref={ref} className={`px-4 py-28 text-center sm:px-6 md:py-40 ${revealClass(visible)}`}>
        <p className="font-sans text-eyebrow font-semibold text-ink-muted">Contact</p>
        <h2 className="mx-auto mt-3 max-w-[16ch] font-display text-headline font-bold text-ink">
          Always building. <span className="text-accent">Let’s connect.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[40ch] font-sans text-subhead font-medium text-ink-muted">
          Open to data engineering, ML engineering and automation roles in Boston, MA.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className={`rounded-full bg-accent px-6 py-3 font-sans text-[1.0625rem] font-medium text-black no-underline transition-colors duration-200 hover:bg-accent-hover ${linkFocus}`}
          >
            Email me
          </a>
          <a
            href="https://linkedin.com/in/varunsinghtech"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans text-[1.0625rem] font-medium text-accent no-underline hover:underline ${linkFocus}`}
          >
            LinkedIn <span aria-hidden="true">›</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href="https://github.com/Varun1619"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans text-[1.0625rem] font-medium text-accent no-underline hover:underline ${linkFocus}`}
          >
            GitHub <span aria-hidden="true">›</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 sm:px-6">
        <div className="mx-auto flex max-w-wide flex-wrap items-center justify-between gap-4 py-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Back to top"
            className={`font-display text-[1.05rem] font-bold tracking-[0.04em] text-ink no-underline ${linkFocus}`}
          >
            VS<span className="text-accent">.</span>
          </a>

          <ul className="hidden gap-6 sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`font-sans text-[0.8125rem] text-ink-muted no-underline transition-colors duration-200 hover:text-ink ${linkFocus}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="font-sans text-[0.8125rem] text-ink-muted">© 2026 Varun Vinod Singh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
