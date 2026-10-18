// Experience.jsx
import { useReveal, revealClass } from '../../hooks/useReveal';

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
    role: 'Digital Data Engineer Intern',
    company: 'Mass General Brigham',
    period: 'Jun 2025 — Dec 2025',
    tech: ['MS Fabric', 'PySpark', 'Power BI', 'Power Apps'],
    details: [
      'Architected distributed data pipelines with built in observability to consolidate multi source data into a centralized cloud Data Lake, reducing manual intervention by 50%.',
      'Built scalable cloud based data applications processing 140K+ records per batch with 99%+ SLA compliance for downstream analytics.',
      'Designed reusable data ingestion frameworks using PySpark, reducing new pipeline development time by 40%.',
    ],
  },
  {
    role: 'Data Engineer',
    company: 'LTI Mindtree',
    period: 'Sep 2022 — Jul 2024',
    tech: ['Apache Kafka', 'Spark', 'Java', 'MySQL', 'PostgreSQL'],
    details: [
      'Engineered high throughput distributed ETL applications using Java, Apache Spark, and Apache Kafka with 25% improved data accessibility.',
      'Optimized Spark jobs through partition tuning and broadcast joins, reducing batch processing time by 40%.',
      'Trained 48+ engineers; recognized with Best Manager Award for technical mentorship.',
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
  const [ref, visible] = useReveal(0.2);

  return (
    <li
      ref={ref}
      className={`grid gap-4 border-t border-black/10 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 md:py-12 ${revealClass(visible)}`}
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
