// Playground.jsx
import { useEffect, useRef, useState, useCallback } from 'react';

// ===== DATA =====
const rawData = [
  { name: '"BOB_Wilson"', email: '"bob@company.com"', salary: '"75000"', status: '"Active"' },
  { name: '" ALICE brown"', email: '"alice@test.org"', salary: '"62000"', status: '"inactive"' },
  { name: '"charlie DAVIS"', email: '"charlie@data.io"', salary: '"88000"', status: '"ACTIVE"' },
  { name: '"  diana Lee "', email: '"diana@corp.net"', salary: '"91000"', status: '"Inactive"' },
];

const cleanData = [
  { name: '"Bob Wilson"', email: '"bob@company.com"', salary: 75000, status: '"active"' },
  { name: '"Alice Brown"', email: '"alice@test.org"', salary: 62000, status: '"inactive"' },
  { name: '"Charlie Davis"', email: '"charlie@data.io"', salary: 88000, status: '"active"' },
  { name: '"Diana Lee"', email: '"diana@corp.net"', salary: 91000, status: '"inactive"' },
];

// ===== COLORS =====
const C = {
  bg: '#0a0a0a', bg2: '#111111', bg3: '#161621',
  text: '#f0f0f0', muted: '#888',
  accent: '#00e87b', accentDim: 'rgba(0,232,123,0.15)',
  orange: '#f97316', orangeDim: 'rgba(249,115,22,0.15)',
  purple: '#a855f7', purpleDim: 'rgba(168,85,247,0.15)',
  blue: '#3b82f6', blueDim: 'rgba(59,130,246,0.15)',
  yellow: '#eab308', yellowDim: 'rgba(234,179,8,0.08)',
  border: 'rgba(255,255,255,0.08)',
};

const Playground = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsState, setStepsState] = useState(['done', 'active', 'locked', 'locked']);
  const [srcData, setSrcData] = useState(rawData);
  const [transData, setTransData] = useState(null);
  const [loadData, setLoadData] = useState(null);
  const [transStatus, setTransStatus] = useState('awaiting');
  const [loadStatus, setLoadStatus] = useState('awaiting');
  const [logs, setLogs] = useState([]);
  const [showIssues, setShowIssues] = useState(true);
  const [pipelineComplete, setPipelineComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const sectionRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto scroll logs
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  // Init logs
  useEffect(() => {
    setLogs([
      { msg: 'SYSTEM: Pipeline initialized. 4 source records loaded.', cls: 'info' },
      { msg: 'SYSTEM: Click "Extract" to begin the pipeline.', cls: 'info' },
    ]);
  }, []);

  const addLog = useCallback((msg, cls) => {
    setLogs((prev) => [...prev, { msg, cls, ts: new Date().toLocaleTimeString() }]);
  }, []);

  const advanceStep = useCallback((from) => {
    setStepsState((prev) => {
      const next = [...prev];
      next[from] = 'done';
      if (from + 1 <= 3) next[from + 1] = 'active';
      return next;
    });
    setCurrentStep(from + 1);
  }, []);

  // ===== EXTRACT =====
  const doExtract = useCallback(() => {
    if (processing) return;
    setProcessing(true);
    addLog('EXTRACT: Connecting to source...', 'info');
    setTimeout(() => addLog('EXTRACT: Reading 4 records from source_db.employees', 'info'), 400);
    setTimeout(() => addLog('EXTRACT: Detected schema {name, email, salary, status}', 'process'), 800);
    setTimeout(() => addLog('WARN: Inconsistent casing in name, status fields', 'warn'), 1200);
    setTimeout(() => addLog('WARN: salary stored as string type', 'warn'), 1400);
    setTimeout(() => addLog('EXTRACT: ✓ 4 records extracted successfully', 'success'), 1800);
    setTimeout(() => {
      advanceStep(1);
      setTransData(rawData);
      setTransStatus('extracted');
      setProcessing(false);
    }, 2200);
  }, [processing, addLog, advanceStep]);

  // ===== TRANSFORM =====
  const doTransform = useCallback(() => {
    if (processing) return;
    setProcessing(true);
    addLog('TRANSFORM: Applying cleaning rules...', 'process');
    setTimeout(() => addLog('TRANSFORM: Trimming whitespace from all fields', 'process'), 400);
    setTimeout(() => addLog('TRANSFORM: Normalizing name to Title Case', 'process'), 800);
    setTimeout(() => addLog('TRANSFORM: Casting salary from STRING → INT', 'process'), 1200);
    setTimeout(() => addLog('TRANSFORM: Lowercasing status values', 'process'), 1600);
    setTimeout(() => addLog('TRANSFORM: Running validation checks...', 'info'), 2000);
    setTimeout(() => addLog('TRANSFORM: ✓ All 4 records passed validation', 'success'), 2400);
    setTimeout(() => {
      advanceStep(2);
      setTransData(cleanData);
      setTransStatus('clean');
      setShowIssues(false);
      setLoadStatus('ready');
      setProcessing(false);
    }, 2800);
  }, [processing, addLog, advanceStep]);

  // ===== LOAD =====
  const doLoad = useCallback(() => {
    if (processing) return;
    setProcessing(true);
    addLog('LOAD: Connecting to data warehouse...', 'info');
    setTimeout(() => addLog('LOAD: Creating table warehouse.employees_clean', 'info'), 400);
    setTimeout(() => addLog('LOAD: Inserting record 1/4 — Bob Wilson', 'process'), 800);
    setTimeout(() => addLog('LOAD: Inserting record 2/4 — Alice Brown', 'process'), 1100);
    setTimeout(() => addLog('LOAD: Inserting record 3/4 — Charlie Davis', 'process'), 1400);
    setTimeout(() => addLog('LOAD: Inserting record 4/4 — Diana Lee', 'process'), 1700);
    setTimeout(() => addLog('LOAD: ✓ 4 records committed. Pipeline complete!', 'success'), 2200);
    setTimeout(() => {
      advanceStep(3);
      setLoadData(cleanData);
      setLoadStatus('loaded');
      setPipelineComplete(true);
      setProcessing(false);
    }, 2600);
  }, [processing, addLog, advanceStep]);

  const executeStep = (step) => {
    if (step !== currentStep || processing) return;
    if (step === 1) doExtract();
    else if (step === 2) doTransform();
    else if (step === 3) doLoad();
  };

  const resetPipeline = () => {
    setCurrentStep(1);
    setStepsState(['done', 'active', 'locked', 'locked']);
    setSrcData(rawData);
    setTransData(null);
    setLoadData(null);
    setTransStatus('awaiting');
    setLoadStatus('awaiting');
    setShowIssues(true);
    setPipelineComplete(false);
    setProcessing(false);
    setLogs([{ msg: 'SYSTEM: Pipeline reset. Ready to execute.', cls: 'info' }]);
  };

  const reveal = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[60px]';

  const stepMeta = [
    { icon: '✓', name: 'Source', desc: 'Raw messy data' },
    { icon: '📥', name: 'Extract', desc: 'Pull from source' },
    { icon: '⚙', name: 'Transform', desc: 'Clean & validate' },
    { icon: '📦', name: 'Load', desc: 'Store clean data' },
  ];

  return (
    <section ref={sectionRef} id="etl" style={{ background: C.bg, padding: '120px 40px', overflow: 'hidden' }}>
      {/* Header */}
      <div className={`transition-all duration-[800ms] ease-out ${reveal}`} style={{ transitionDelay: '0.1s' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>
          Data Playground
        </p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px', color: C.text }}>
          ETL Pipeline{' '}
          <span style={{ WebkitTextStroke: '1.5px #f0f0f0', color: 'transparent' }}>Simulator</span>
        </h2>
        <p style={{ color: C.muted, fontSize: '0.95rem', marginBottom: '40px', maxWidth: '600px' }}>
          Experience data engineering concepts hands on. Click through each stage to watch messy source data get extracted, cleaned, and loaded into a warehouse.
        </p>
      </div>

      {/* Main container */}
      <div
        className={`transition-all duration-[800ms] ease-out ${reveal}`}
        style={{
          transitionDelay: '0.25s',
          maxWidth: '1100px',
          margin: '0 auto',
          background: C.bg3,
          border: `1px solid ${C.border}`,
          borderRadius: '12px',
          padding: 'clamp(24px, 3vw, 40px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top glow line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)` }} />

        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-3" style={{ marginBottom: '8px' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${C.accent}, #059669)`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: C.text }}>ETL Pipeline Simulator</span>
          </div>
          <ResetButton onClick={resetPipeline} />
        </div>
        <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '32px' }}>Watch data flow through each transformation stage</p>

        {/* Pipeline steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ marginBottom: '32px' }}>
          {stepMeta.map((s, i) => (
            <PipelineStep
              key={i}
              index={i}
              state={stepsState[i]}
              icon={stepsState[i] === 'done' ? '✓' : s.icon}
              name={s.name}
              desc={s.desc}
              processing={processing && currentStep === i}
              onClick={() => executeStep(i)}
            />
          ))}
        </div>

        {/* Data panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DataPanel
            icon="📁" iconClass="src" title="Source Data"
            tag={<Tag label="Raw" color={C.orange} bg={C.orangeDim} />}
            subtitle="4 records"
            records={srcData} colorClass=""
            showIssues={showIssues}
            borderColor={C.orange}
            active
          />
          <DataPanel
            icon="⚙" iconClass="trans" title="Transformed Data"
            tag={transStatus === 'clean' ? <Tag label="Clean" color={C.accent} bg={C.accentDim} /> : null}
            subtitle={transStatus === 'awaiting' ? 'Awaiting data' : transStatus === 'extracted' ? 'Extracted' : null}
            records={transData} colorClass={transStatus === 'clean' ? 'clean' : ''}
            borderColor={transStatus === 'clean' ? C.accent : transStatus === 'extracted' ? C.orange : null}
            active={transStatus === 'extracted'}
            done={transStatus === 'clean'}
          />
          <DataPanel
            icon="🗄" iconClass="load" title="Data Warehouse"
            tag={loadStatus === 'loaded' ? <Tag label="Loaded" color={C.blue} bg={C.blueDim} /> : null}
            subtitle={loadStatus === 'awaiting' ? 'Ready to receive' : loadStatus === 'ready' ? 'Ready' : null}
            records={loadData} colorClass={loadStatus === 'loaded' ? 'loaded' : ''}
            borderColor={loadStatus === 'loaded' ? C.accent : loadStatus === 'ready' ? C.orange : null}
            active={loadStatus === 'ready'}
            done={loadStatus === 'loaded'}
          />
        </div>

        {/* Success */}
        {pipelineComplete && (
          <div style={{ background: 'rgba(0,232,123,0.08)', border: '1px solid rgba(0,232,123,0.2)', borderRadius: 8, padding: 16, marginTop: 16, textAlign: 'center', animation: 'fadeUp 0.5s ease' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: C.accent, marginBottom: 4 }}>✓ Pipeline Complete!</div>
            <div style={{ fontSize: '0.8rem', color: C.muted }}>4 records extracted, cleaned, validated, and loaded into the warehouse. 0 data quality issues remaining.</div>
          </div>
        )}

        {/* Log panel */}
        <div style={{ marginTop: 24, background: 'rgba(0,0,0,0.3)', border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
          <div className="flex items-center gap-2" style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
            <div className="flex gap-1.5">
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.muted, marginLeft: 8 }}>pipeline.log</span>
          </div>
          <div ref={logRef} style={{ padding: 16, maxHeight: 180, overflowY: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', lineHeight: 1.9 }}>
            {logs.map((log, i) => {
              const clsMap = { info: C.blue, success: C.accent, warn: C.yellow, process: C.purple };
              return (
                <div key={i} style={{ animation: 'fadeInLeft 0.3s ease forwards' }}>
                  <span style={{ color: C.muted }}>[{log.ts || new Date().toLocaleTimeString()}]</span>{' '}
                  <span style={{ color: clsMap[log.cls] || C.muted }}>{log.msg}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInLeft { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.6); } }
        @keyframes procDot { 0%,100% { opacity:.2; transform:scale(.8); } 50% { opacity:1; transform:scale(1.2); } }
      `}</style>
    </section>
  );
};

// ===== Sub Components =====

const Tag = ({ label, color, bg }) => (
  <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, color, background: bg, marginLeft: 'auto' }}>
    {label}
  </span>
);

const ResetButton = ({ onClick }) => {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
        color: h ? C.accent : C.text, background: h ? C.accentDim : 'transparent',
        border: `1px solid ${h ? C.accent : C.border}`, padding: '10px 20px', borderRadius: 8,
        cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      ↻ Reset Pipeline
    </button>
  );
};

const PipelineStep = ({ index, state, icon, name, desc, processing, onClick }) => {
  const isDone = state === 'done';
  const isActive = state === 'active';
  const isLocked = state === 'locked';

  const borderColor = isDone ? C.accent : isActive ? C.orange : C.border;
  const bg = isDone
    ? 'linear-gradient(135deg, rgba(0,232,123,0.12), rgba(0,232,123,0.03))'
    : isActive
    ? 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.03))'
    : 'rgba(255,255,255,0.02)';

  return (
    <div
      onClick={onClick}
      style={{
        padding: '20px 16px', borderRadius: 10, border: `1px solid ${borderColor}`,
        background: bg, textAlign: 'left', cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.45 : 1, transition: 'all 0.4s',
      }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          background: isDone ? C.accentDim : isActive ? C.orangeDim : 'rgba(255,255,255,0.05)',
          color: isDone ? C.accent : isActive ? C.orange : C.text,
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: '0.65rem', fontWeight: 600, padding: '3px 8px', borderRadius: 20,
          color: isDone ? C.accent : isActive ? C.orange : C.muted,
          background: isDone ? C.accentDim : isActive ? C.orangeDim : 'rgba(255,255,255,0.06)',
        }}>
          {index + 1}/4
        </span>
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: C.text, marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: '0.75rem', color: C.muted }}>{desc}</div>
      {isActive && (
        <div className="flex items-center gap-1" style={{ fontSize: '0.75rem', color: C.orange, fontWeight: 600, marginTop: 10 }}>
          {processing ? (
            <>
              <span className="flex gap-1.5" style={{ marginRight: 6 }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent, animation: `procDot 1.2s infinite ${d * 0.2}s` }} />
                ))}
              </span>
              Processing...
            </>
          ) : (
            <>
              <span style={{ width: 6, height: 6, background: C.orange, borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
              Click to execute →
            </>
          )}
        </div>
      )}
    </div>
  );
};

const DataPanel = ({ icon, iconClass, title, tag, subtitle, records, colorClass, showIssues, borderColor, active, done }) => {
  const iconColors = { src: { bg: C.orangeDim, color: C.orange }, trans: { bg: C.purpleDim, color: C.purple }, load: { bg: C.blueDim, color: C.blue } };
  const ic = iconColors[iconClass] || {};

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: `1px solid ${borderColor || C.border}`,
      borderRadius: 10, padding: 24, minHeight: 320, transition: 'all 0.4s',
      boxShadow: active ? `0 0 30px ${C.orangeDim}` : done ? `0 0 30px ${C.accentDim}` : 'none',
    }}>
      <div className="flex items-center gap-2.5" style={{ marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: ic.bg, color: ic.color }}>
          {icon}
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: C.text }}>{title}</div>
        {tag}
        {subtitle && <span style={{ color: C.muted, fontSize: '0.75rem', marginLeft: 'auto' }}>{subtitle}</span>}
      </div>

      {records ? (
        <>
          {records.map((r, i) => (
            <Record key={i} data={r} colorClass={colorClass} delay={i * 120} />
          ))}
          {showIssues && (
            <div style={{ background: C.yellowDim, border: '1px solid rgba(234,179,8,0.2)', borderRadius: 8, padding: '12px 16px', marginTop: 12, fontSize: '0.75rem', color: C.yellow, display: 'flex', alignItems: 'center', gap: 8 }}>
              ⚠ Issues: Inconsistent casing, whitespace, string typed numbers, invalid statuses
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center" style={{ height: 200, gap: 12, color: C.muted }}>
          <div style={{ fontSize: 36, opacity: 0.3 }}>{icon}</div>
          <div style={{ fontSize: '0.8rem' }}>
            {iconClass === 'trans' ? 'Awaiting extraction...' : 'Awaiting transformation...'}
          </div>
        </div>
      )}
    </div>
  );
};

const Record = ({ data, colorClass, delay }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  const valColor = colorClass === 'clean' ? C.accent : colorClass === 'loaded' ? C.blue : C.orange;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, borderRadius: 8,
      padding: 14, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', lineHeight: 1.8,
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s',
    }}>
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="flex justify-between">
          <span style={{ color: C.muted }}>{k}:</span>
          <span style={{ color: valColor }}>{v}</span>
        </div>
      ))}
    </div>
  );
};

export default Playground;