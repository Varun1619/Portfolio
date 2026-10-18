// Experience.jsx
import { useRef } from 'react';
import { useReveal, revealClass } from '../../hooks/useReveal';
import { useScrollScrub, easeOut } from '../../hooks/useScrollScrub';

const experiences = [
  {
    role: 'Data & Automation Analyst, Study Space Operations',
    company: 'Northeastern University',
    period: 'Jan 2026 — Present',
    tech: ['Microsoft Fabric', 'Power BI', 'DAX', 'SQL', 'PySpark', 'Delta Lake', 'Fabric Data Pipeline', 'Dataverse'],
    details: [
      'Designed a Power BI semantic model on a 7-table star schema in Microsoft Fabric with 4 station teams, so every report draws on one consistent set of measures and definitions.',
      'Built hourly Fabric pipelines curating 112 daily submissions from 4 sources into validated Delta Lake tables, so every semantic model refresh runs on clean, current data.',
    ],
  },
  {
    role: 'Digital Intern',
    company: 'Mass General Brigham',
    period: 'Jun 2025 — Dec 2025',
    tech: ['SQL', 'Python', 'PySpark', 'Microsoft Fabric', 'Power BI', 'MySQL', 'ServiceNow', 'Azure DevOps'],
    details: [
      'Translated clinical requirements into a ServiceNow and MySQL model that let 3 clinical operations teams self-serve insights.',
      'Automated weekly ETL of 140,000+ metadata records with classification and quality validation, so governance stakeholders could trust every weekly refresh.',
      'Anonymized PHI across 100,000+ records while joining structured and unstructured data, producing governed, AI-ready datasets for downstream models.',
      'Moved the team from a Miro board to an Azure DevOps Scrum cycle, running sprints and stand-ups that gave every task a clear owner.',
    ],
  },
  {
    role: 'Data Engineer',
    company: 'LTM Limited',
    period: 'Sep 2022 — Jul 2024',
    tech: ['SQL', 'Python', 'Java', 'Spark', 'Kafka', 'Airflow', 'Git', 'CI/CD', 'AWS S3', 'Glue Data Catalog', 'MySQL', 'MongoDB'],
    details: [
      'Cut data incidents 45% (11 to 6 monthly) with SQL validation, type checks, and deduplication that kept bad records out of reports.',
      'Reduced pipeline maintenance 30% (10 to 7 hours weekly) by standardizing schema contracts with 5 engineering teams, freeing 3 engineering hours every week.',
      'Built 3 data pipelines processing 1,500 records/minute from 5 sources, with SLA monitoring, retries, and backfill recovery.',
      'Saved 5+ engineering hours per sprint across 20 weekly deployments by automating Docker builds with AWS CI/CD on every merge.',
    ],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Nismotek',
    period: 'Nov 2020 — Apr 2021',
    tech: ['Python', 'PySpark', 'MySQL'],
    details: [
      'Designed normalized data models and validation frameworks ensuring data integrity for operational reporting.',
      'Built automation mechanisms cutting data entry effort by 60%.',
    ],
  },
];

const Experience = () => {
  const [headRef, headVisible] = useReveal();

  return (
    <section id="experience" data-nav-theme="light" className="bg-canvas-white px-4 py-24 sm:px-6 md:py-36">
      <div className="mx-auto max-w-content">
        <div ref={headRef} className={revealClass(headVisible)}>
          <p className="font-sans text-eyebrow font-semibold text-ink-dark-muted">Experience</p>
          <h2 className="mt-3 font-display text-headline font-bold text-ink-dark">Where I’ve worked.</h2>
        </div>

        <ol className="mt-12 md:mt-16">
          {experiences.map((exp) => (
            <ExperienceRow key={exp.company} experience={exp} />
          ))}
        </ol>
      </div>
    </section>
  );
};

const ExperienceRow = ({ experience }) => {
  const ref = useRef(null);

  // Rise and fade in, tied to scroll position.
  useScrollScrub(
    ref,
    (p) => {
      const e = easeOut(p);
      ref.current.style.transform = `translateY(${(1 - e) * 48}px)`;
      ref.current.style.opacity = String(e);
    },
    { start: 0.98, end: 0.6 }
  );

  return (
    <li
      ref={ref}
      className={`grid gap-4 border-t border-black/10 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 md:py-12`}
    >
      <div>
        <p className="font-sans text-eyebrow font-semibold text-ink-dark-muted">{experience.period}</p>
        <h3 className="mt-2 font-display text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.02em] text-ink-dark">
          {experience.company}
        </h3>
        <p className="mt-1 font-sans text-[1.0625rem] text-ink-dark-muted">{experience.role}</p>
      </div>

      <div>
        <ul className="space-y-3">
          {experience.details.map((detail) => (
            <li key={detail} className="font-sans text-[1.0625rem] leading-relaxed text-ink-dark">
              {detail}
            </li>
          ))}
        </ul>
        <p className="mt-5 font-sans text-eyebrow font-semibold text-accent-dark">
          {experience.tech.join(' · ')}
        </p>
      </div>
    </li>
  );
};

export default Experience;
