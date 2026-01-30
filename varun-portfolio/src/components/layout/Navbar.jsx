import React, { useState } from 'react';
import { navLinks } from '../../data/skills';

const Navbar = ({ scrollY }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isScrolled = scrollY > 50;

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 px-6 py-4 transition-all duration-500 ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            VS
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-500 hover:text-violet-600 transition-all relative group"
              >
                {link.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl text-slate-600 hover:text-violet-600 transition-colors"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6 text-xl animate-fade-in">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-2xl text-slate-600 hover:text-violet-600 transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>
          
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-600 hover:text-violet-600 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;