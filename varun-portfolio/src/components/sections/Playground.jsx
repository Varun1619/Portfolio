// Playground.jsx — scroll-driven ETL walkthrough
import { useEffect, useRef, useState } from 'react';

// ===== DATA =====
const rawRows = [
  { name: 'BOB_Wilson', email: 'bob@company.com', salary: '"75000"', status: 'Active' },
  { name: ' ALICE brown', email: 'alice@test.org', salary: '"62000"', status: 'inactive' },
  { name: 'charlie DAVIS', email: 'charlie@data.io', salary: '"88000"', status: 'ACTIVE' },
  { name: '  diana Lee ', email: 'diana@corp.net', salary: '"91000"', status: 'Inactive' },
];

const cleanRows = [
  { name: 'Bob Wilson', email: 'bob@company.com', salary: '75000', status: 'active' },
  { name: 'Alice Brown', email: 'alice@test.org', salary: '62000', status: 'inactive' },
  { name: 'Charlie Davis', email: 'charlie@data.io', salary: '88000', status: 'active' },
  { name: 'Diana Lee', email: 'diana@corp.net', salary: '91000', status: 'inactive' },
];

const columns = [
  { key: 'name', rawType: 'STRING', cleanType: 'STRING' },
  { key: 'email', rawType: 'STRING', cleanType: 'STRING', hideOnMobile: true },
  { key: 'salary', rawType: 'STRING', cleanType: 'INT' },
  { key: 'status', rawType: 'STRING', cleanType: 'ENUM' },
];

const stages = [
  {
    label: 'Source',
    title: 'Messy data in.',
    body: 'Four employee records straight from the source system, with inconsistent casing, stray whitespace and salaries stored as text.',
    table: 'source_db.employees',
    log: { level: 'WARN', text: '4 rows · 11 cells need cleaning' },
  },
  {
    label: 'Extract',
    title: 'Pull it out.',
    body: 'Read every row and detect the schema. Nothing changes yet. Problems are flagged so the next step knows what to fix.',
    table: 'staging.employees_raw',
    log: { level: 'EXTRACT', text: 'schema {name, email, salary, status} · salary typed STRING' },
  },
  {
    label: 'Transform',
    title: 'Clean it up.',
    body: 'Trim whitespace, normalise names to Title Case, cast salary to an integer and lowercase status. All four rows pass validation.',
    table: 'staging.employees_clean',
    log: { level: 'TRANSFORM', text: '4/4 rows valid · 0 issues remaining' },
  },
  {
    label: 'Load',
    title: 'Ship it.',
    body: 'Commit the clean rows to the warehouse, ready for analysts and dashboards to query.',
    table: 'warehouse.employees_clean',
    log: { level: 'LOAD', text: '4 rows committed to warehouse.employees_clean' },
  },
];

const logColor = {
  WARN: 'text-amber-400',
  EXTRACT: 'text-sky-400',
  TRANSFORM: 'text-violet-400',
  LOAD: 'text-accent',
};

// Show leading/trailing whitespace so the problem is visible.
const RawValue = ({ value }) => {
  const [, lead, core, trail] = value.match(/^(\s*)(.*?)(\s*)$/);
  const dots = (s) => (s ? <span className="text-amber-400/70">{'·'.repeat(s.length)}</span> : null);
  return (
    <>
      {dots(lead)}
      {core}
      {dots(trail)}
    </>
  );
};

// Progress (0–1) through a tall section whose content is pinned with position: sticky.
function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      setProgress(travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

const Playground = () => {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const stage = Math.min(stages.length - 1, Math.floor(progress * stages.length));
  const current = stages[stage];
  const cleaned = stage >= 2;

  // Jump to the scroll position where a stage begins.
  const goToStage = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * (i + 0.5)) / stages.length, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="etl" className="relative h-[400vh] bg-canvas">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-4 sm:px-6">
        <div className="mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-6 pt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:pt-0">
          {/* ===== Story ===== */}
          <div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
              Watch a pipeline run.
            </h2>

            <ol className="mt-5 flex gap-1.5 md:mt-8" aria-label="Pipeline stages">
              {stages.map((s, i) => (
                <li key={s.label} className="flex-1">
                  <button
                    type="button"
                    onClick={() => goToStage(i)}
                    aria-current={i === stage ? 'step' : undefined}
                    className="group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="block h-1 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-accent"
                        style={{
                          width: `${Math.min(Math.max(progress * stages.length - i, 0), 1) * 100}%`,
                        }}
                      />
                    </span>
                    <span
                      className={`mt-2 block font-sans text-eyebrow font-semibold transition-colors duration-300 ${
                        i === stage ? 'text-ink' : 'text-ink-muted group-hover:text-ink'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            {/* All stage texts share one grid cell and cross-fade */}
            <div className="mt-6 grid md:mt-10" aria-live="polite">
              {stages.map((s, i) => (
                <div
                  key={s.label}
                  aria-hidden={i !== stage}
                  className={`col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.28,0.11,0.32,1)] ${
                    i === stage ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                  }`}
                >
                  <p className="font-sans text-eyebrow font-semibold text-accent">
                    Step {i + 1} of {stages.length}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[42ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted md:text-body-lg">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Data card ===== */}
          <div
            className={`overflow-hidden rounded-[22px] border bg-canvas-raised transition-[border-color,box-shadow] duration-500 ${
              stage === 3
                ? 'border-accent/40 shadow-[0_0_80px_rgba(0,232,123,0.12)]'
                : 'border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]'
            }`}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <span className="truncate font-mono text-xs text-ink-muted">{current.table}</span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-sans text-[0.7rem] font-semibold transition-colors duration-300 ${
                  cleaned ? 'bg-accent/15 text-accent' : 'bg-amber-400/15 text-amber-400'
                }`}
              >
                {stage === 3 ? 'Loaded' : cleaned ? 'Clean' : 'Raw'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-mono text-[0.72rem] sm:text-xs">
                <thead>
                  <tr className="text-left">
                    {columns.map((c) => (
                      <th
                        key={c.key}
                        scope="col"
                        className={`whitespace-nowrap px-4 pb-2 pt-3 font-semibold text-ink-muted sm:px-5 ${c.hideOnMobile ? 'hidden sm:table-cell' : ''}`}
                      >
                        {c.key}
                        <span
                          className={`ml-1.5 inline-block rounded px-1 py-px text-[0.62rem] font-medium transition-all duration-300 ${
                            stage === 0
                              ? 'opacity-0'
                              : cleaned
                                ? 'bg-accent/10 text-accent'
                                : c.rawType !== c.cleanType
                                  ? 'bg-amber-400/15 text-amber-400'
                                  : 'bg-white/5 text-ink-muted'
                          }`}
                        >
                          {cleaned ? c.cleanType : c.rawType}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rawRows.map((raw, r) => (
                    <tr key={raw.email} className="border-t border-white/5">
                      {columns.map((c) => {
                        const changes = raw[c.key] !== cleanRows[r][c.key];
                        const flagged = changes && stage === 1;
                        const fixed = changes && cleaned;
                        return (
                          <td
                            key={c.key}
                            className={`whitespace-pre px-4 py-2.5 transition-colors duration-500 sm:px-5 ${
                              c.hideOnMobile ? 'hidden sm:table-cell' : ''
                            } ${
                              flagged
                                ? 'bg-amber-400/10 text-amber-300'
                                : fixed
                                  ? stage === 2
                                    ? 'bg-accent/10 text-accent'
                                    : 'text-ink'
                                  : 'text-ink/80'
                            }`}
                          >
                            {cleaned ? cleanRows[r][c.key] : <RawValue value={raw[c.key]} />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-white/10 bg-black/30 px-4 py-3 font-mono text-[0.68rem] sm:px-5 sm:text-[0.72rem]">
              <span className={`${logColor[current.log.level]} font-semibold`}>{current.log.level}</span>{' '}
              <span className="text-ink-muted">{current.log.text}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;
