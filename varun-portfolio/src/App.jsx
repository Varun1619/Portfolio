import { useState, useEffect, useCallback } from 'react';

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

// Minimal path router: /, /projects and /projects/:id, using the History API.
const parseRoute = (pathname) => {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (match) return { page: 'project-detail', id: decodeURIComponent(match[1]) };
  if (/^\/projects\/?$/.test(pathname)) return { page: 'projects', id: null };
  return { page: 'home', id: null };
};

const pathFor = (page, id) =>
  page === 'project-detail' ? `/projects/${encodeURIComponent(id)}` : page === 'projects' ? '/projects' : '/';

// Old links used hashes (#/projects/foodlens); move them to the equivalent path.
const legacyHashPath = () => {
  const hash = window.location.hash;
  return hash.startsWith('#/') ? hash.slice(1) : null;
};

function useRouter() {
  const [route, setRoute] = useState(() => {
    const legacy = legacyHashPath();
    if (legacy) window.history.replaceState(null, '', legacy);
    return parseRoute(window.location.pathname);
  });

  const go = useCallback((path) => {
    if (path !== window.location.pathname) window.history.pushState(null, '', path);
    setRoute(parseRoute(path));
  }, []);

  const navigate = useCallback((page, id = null) => go(pathFor(page, id)), [go]);

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname));

    // Handle plain <a href="/projects/..."> links inside the app without a full reload.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      const href = a?.getAttribute('href');
      if (!a || !href || href.startsWith('#') || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href);
      if (url.origin !== window.location.origin || !/^\/(projects(\/[^/.]+)?\/?)?$/.test(url.pathname)) return;
      e.preventDefault();
      go(url.pathname);
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onClick);
    };
  }, [go]);

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
