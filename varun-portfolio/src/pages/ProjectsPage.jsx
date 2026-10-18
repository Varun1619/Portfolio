import { projects } from '../data/projects';
import { ProjectTile } from '../components/sections/Projects';
import { useReveal, revealClass } from '../hooks/useReveal';

const ProjectsPage = ({ onBack }) => {
  const [headRef, headVisible] = useReveal(0);

  return (
    <div className="min-h-screen bg-canvas px-3 pb-24 pt-24 sm:px-4 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-wide">
        <div ref={headRef} className={`px-2 ${revealClass(headVisible)}`}>
          <button
            type="button"
            onClick={onBack}
            className="mb-8 font-sans text-[0.95rem] text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span aria-hidden="true">‹</span> Home
          </button>
          <h1 className="font-display text-headline font-bold text-ink">All projects.</h1>
          <p className="mt-4 max-w-[46ch] font-sans text-subhead font-medium text-ink-muted">
            Data engineering, analytics and AI projects built during my studies and beyond.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectTile key={project.id} project={project} delay={(i % 2) * 0.12} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
