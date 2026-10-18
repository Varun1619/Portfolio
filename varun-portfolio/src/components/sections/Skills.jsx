// Skills.jsx
import { useReveal, revealClass } from '../../hooks/useReveal';

const skillGroups = [
  { title: 'Languages', tags: ['Java', 'Python', 'JavaScript', 'SQL', 'NoSQL', 'PL/SQL'] },
  { title: 'Data Processing', tags: ['Apache Spark', 'PySpark', 'Apache Kafka', 'ETL/ELT', 'Batch & Stream'] },
  { title: 'Databases', tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Data Lakes', 'Data Warehouses'] },
  { title: 'Cloud & Infra', tags: ['S3', 'Lambda', 'Glue', 'CloudWatch', 'EC2', 'IAM'] },
  { title: 'Frameworks', tags: ['REST APIs', 'Microservices', 'Spring Boot', 'LangChain'] },
  { title: 'DevOps & Tools', tags: ['Power BI', 'Tableau', 'Git', 'Docker', 'Kubernetes', 'CI/CD'] },
];

const Skills = () => {
  const [headRef, headVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal(0.1);

  return (
    <section id="skills" className="bg-canvas-light px-4 py-24 sm:px-6 md:py-36">
      <div className="mx-auto max-w-wide">
        <div ref={headRef} className={`text-center ${revealClass(headVisible)}`}>
          <p className="font-sans text-eyebrow font-semibold text-ink-dark-muted">Skills</p>
          <h2 className="mt-3 font-display text-headline font-bold text-ink-dark">The toolkit.</h2>
        </div>

        <div
          ref={gridRef}
          className={`mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 ${revealClass(gridVisible)}`}
        >
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-[22px] bg-canvas-white p-7 md:p-9">
              <h3 className="font-display text-[1.375rem] font-bold tracking-[-0.01em] text-ink-dark">
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-canvas-light px-3.5 py-1.5 font-sans text-[0.9rem] text-ink-dark"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
