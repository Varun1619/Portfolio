import React, { useState, useEffect } from 'react';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Playground from './components/sections/Playground';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Recommendations from './components/sections/Recommendations';

// Pages
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import { projects as allProjects } from './data/projects';

// Simple hash-based router — no extra dependencies
function useRouter() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/projects/')) return { page: 'project-detail', id: hash.slice(11) };
    if (hash === '#/projects') return { page: 'projects', id: null };
    return { page: 'home', id: null };
  });

  const navigate = (page, id = null) => {
    if (page === 'home') {
      window.location.hash = '';
    } else if (page === 'projects') {
      window.location.hash = '/projects';
    } else if (page === 'project-detail') {
      window.location.hash = `/projects/${id}`;
    }
    setRoute({ page, id });
  };

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/projects/')) {
        setRoute({ page: 'project-detail', id: hash.slice(11) });
      } else if (hash === '#/projects') {
        setRoute({ page: 'projects', id: null });
      } else {
        setRoute({ page: 'home', id: null });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return { route, navigate };
}

function App() {
  const { route, navigate } = useRouter();

  // Scroll to top when leaving home
  useEffect(() => {
    if (route.page !== 'home') {
      window.scrollTo({ top: 0 });
    }
  }, [route.page]);

  const renderPage = () => {
    if (route.page === 'projects') {
      return (
        <ProjectsPage
          onProjectSelect={(project) => navigate('project-detail', project.id)}
          onBack={() => navigate('home')}
        />
      );
    }

    if (route.page === 'project-detail') {
      const project = allProjects.find((p) => p.id === route.id);
      if (!project) {
        return (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            Project not found.{' '}
            <button onClick={() => navigate('projects')} style={{ color: '#00e87b', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }}>
              Back to projects
            </button>
          </div>
        );
      }
      return (
        <ProjectDetail
          project={project}
          onBack={() => navigate('projects')}
        />
      );
    }

    // Default: home
    return (
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Playground />
        <Skills />
        <Recommendations />
      </main>
    );
  };

  const isHome = route.page === 'home';

  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-clip">
      <Navbar route={route} navigate={navigate} />

      {renderPage()}

      {isHome && <Footer />}
    </div>
  );
}

export default App;
