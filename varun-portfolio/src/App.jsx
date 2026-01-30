import React from 'react';
import { useScrollPosition, useIntersectionObserver, usePreloader } from './hooks';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Playground from './components/sections/Playground';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

// Preloader component
const Preloader = ({ loaded }) => (
  <div
    className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-all duration-700 ${
      loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}
  >
    <div className="text-5xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
      VS
    </div>
  </div>
);

function App() {
  const loaded = usePreloader(100);
  const scrollY = useScrollPosition();
  const visibleSections = useIntersectionObserver();

  // Helper function for section animation classes
  const getSectionClass = (sectionId) => {
    const baseClass = 'transition-all duration-1000 ease-out';
    const visibleClass = visibleSections[sectionId]
      ? 'translate-y-0 opacity-100'
      : 'translate-y-16 opacity-0';
    return `${baseClass} ${visibleClass}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 overflow-x-hidden">
      {/* Preloader */}
      <Preloader loaded={loaded} />

      {/* Navigation */}
      <Navbar scrollY={scrollY} />

      {/* Main Content */}
      <main>
        <Hero loaded={loaded} />
        
        <About 
          sectionClass={getSectionClass('about')} 
        />
        
        <Playground 
          sectionClass={getSectionClass('playground')} 
        />
        
        <Experience 
          sectionClass={getSectionClass('experience')} 
        />
        
        <Contact 
          sectionClass={getSectionClass('contact')} 
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;