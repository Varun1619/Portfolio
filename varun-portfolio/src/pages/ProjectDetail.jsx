import { useState, useEffect } from 'react';

const C = {
  bg: '#0a0a0a',
  bg2: '#111111',
  bg3: '#161616',
  text: '#f0f0f0',
  muted: '#888',
  accent: '#00e87b',
  accentDim: 'rgba(0,232,123,0.10)',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.14)',
};

const pipelineColors = { BRONZE: '#f5a623', SILVER: '#c8c8c8', GOLD: '#00e87b', BI: '#4fc3f7' };

// ─── Shared primitives ────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.accent, marginBottom: '20px' }}>
    {children}
  </p>
);

const Divider = () => <div style={{ borderTop: `1px solid ${C.border}` }} />;

const Section = ({ label, children }) => (
  <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(36px, 6vw, 56px) clamp(16px, 5vw, 40px)' }}>
    {label && <SectionLabel>{label}</SectionLabel>}
    {children}
  </div>
);

const tagStyle = {
  fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
  background: 'rgba(255,255,255,0.06)', color: '#f0f0f0',
  border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '2px',
};

const tagStyleDark = {
  ...tagStyle, background: 'rgba(255,255,255,0.03)', color: '#888',
  border: '1px solid rgba(255,255,255,0.06)',
};

const actionBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '6px',
  padding: '11px 22px', border: `1px solid ${C.border}`, borderRadius: '3px',
  color: C.text, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600,
  letterSpacing: '0.05em', background: 'transparent', transition: 'all 0.2s',
  cursor: 'pointer', fontFamily: 'inherit',
};

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px', padding: 0, transition: 'color 0.2s' }}
    onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
    onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
  >
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
    All Projects
  </button>
);

// ─── FoodLens inline diagrams ────────────────────────────────────────────────
const FoodLensFlowchart = () => {
  const Arrow = () => (
    <div style={{ display: 'flex', justifyContent: 'center', height: '28px', alignItems: 'center' }}>
      <div style={{ width: '1px', height: '100%', background: 'rgba(255,255,255,0.15)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '6px solid rgba(255,255,255,0.25)' }} />
      </div>
    </div>
  );

  const Node = ({ label, sub, borderColor = 'rgba(255,255,255,0.15)', bg = 'transparent', minW = '170px' }) => (
    <div style={{ border: `1px solid ${borderColor}`, borderRadius: '4px', padding: '9px 16px', background: bg, minWidth: minW, textAlign: 'center', flexShrink: 0 }}>
      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{label}</div>
      {sub && <div style={{ fontSize: '0.68rem', color: C.muted, marginTop: '3px' }}>{sub}</div>}
    </div>
  );

  const Row = ({ children }) => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', width: '100%' }}>{children}</div>
  );

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '3px', padding: 'clamp(20px, 3vw, 36px)', overflowX: 'auto' }}>
      <div style={{ minWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Row>
          <Node label="Chicago CSV" sub="308K rows, 20 cols" />
          <Node label="Dallas CSV" sub="78K rows, 117 cols" />
        </Row>
        <Arrow />
        <Node label="Bronze Layer" sub="Notebook 01" borderColor="#f5a623" bg="rgba(245,166,35,0.07)" />
        <Arrow />
        <Node label="DQX Profiling" sub="Notebook 02" borderColor="#4fc3f7" bg="rgba(79,195,247,0.07)" />
        <Arrow />
        <Node label="Silver Layer" sub="Notebook 03" borderColor="#00e87b" bg="rgba(0,232,123,0.07)" />
        <Arrow />
        <Node label="Parse violations" />
        <Arrow />
        <Node label="DQX validation" sub="17 rules" />
        <Arrow />
        <Row>
          <Node label="Dedup + trim" />
          <Node label="93K quarantined" borderColor="#ff6b6b" bg="rgba(255,107,107,0.1)" />
        </Row>
        <Arrow />
        <Row>
          <Node label="221K Chicago" sub="inspections" minW="140px" />
          <Node label="72K Dallas" sub="inspections" minW="140px" />
          <Node label="1.3M" sub="violations" minW="120px" />
        </Row>
        <Arrow />
        <Node label="Gold Layer" sub="Notebook 04" borderColor="#f5a623" bg="rgba(245,166,35,0.07)" />
        <Arrow />
        <Row>
          <Node label="7 dimensions" sub="SCD2 on establishment" minW="155px" />
          <Node label="fact_inspection" sub="293K rows" minW="140px" />
          <Node label="fact_violation" sub="bridge table" minW="140px" />
        </Row>
        <Arrow />
        <Node label="Power BI Dashboard" sub="Overview / Analysis / Report" borderColor="#a78bfa" bg="rgba(167,139,250,0.07)" minW="230px" />
      </div>
    </div>
  );
};

const FoodLensERDiagram = () => {
  const RH = 20, HH = 26;
  const calcH = (cols) => HH + cols.length * RH;

  const tdata = [
    { id: 'dim_date',       x:   5, y: 15, w: 160, color: '#f5a623',
      cols: [{ t:'int',n:'date_key',k:'PK'},{t:'date',n:'full_date'},{t:'int',n:'year'},{t:'int',n:'quarter'},{t:'int',n:'month'},{t:'string',n:'day_of_week'}] },
    { id: 'dim_establishment', x: 182, y: 15, w: 190, color: '#4fc3f7',
      cols: [{ t:'int',n:'establishment_key',k:'PK'},{t:'string',n:'dba_name'},{t:'string',n:'aka_name'},{t:'string',n:'license_number'},{t:'string',n:'facility_type'},{t:'string',n:'risk_category'},{t:'date',n:'eff_start_date'},{t:'date',n:'eff_end_date'},{t:'string',n:'is_current'},{t:'string',n:'row_hash'}] },
    { id: 'dim_location',   x: 390, y: 15, w: 172, color: '#00e87b',
      cols: [{ t:'int',n:'location_key',k:'PK'},{t:'string',n:'address'},{t:'string',n:'city'},{t:'string',n:'state'},{t:'string',n:'zip_code'},{t:'double',n:'latitude'},{t:'double',n:'longitude'}] },
    { id: 'dim_inspection_type', x: 580, y: 15, w: 200, color: '#a78bfa',
      cols: [{ t:'int',n:'inspection_type_key',k:'PK'},{t:'string',n:'inspection_type_name'},{t:'string',n:'city_source'}] },
    { id: 'dim_result',     x: 800, y: 15, w: 168, color: '#ff6b6b',
      cols: [{ t:'int',n:'result_key',k:'PK'},{t:'string',n:'result_description'},{t:'int',n:'derived_score'},{t:'string',n:'city_source'}] },
    { id: 'dim_risk_category', x: 988, y: 15, w: 170, color: '#eab308',
      cols: [{ t:'int',n:'risk_key',k:'PK'},{t:'string',n:'risk_description'},{t:'string',n:'city_source'}] },
    { id: 'fact_inspection', x: 358, y: 282, w: 224, color: '#f472b6',
      cols: [{ t:'int',n:'inspection_key',k:'PK'},{t:'string',n:'inspection_id'},{t:'int',n:'establishment_key',k:'FK'},{t:'int',n:'date_key',k:'FK'},{t:'int',n:'location_key',k:'FK'},{t:'int',n:'inspection_type_key',k:'FK'},{t:'int',n:'result_key',k:'FK'},{t:'int',n:'risk_key',k:'FK'},{t:'int',n:'violation_score'},{t:'int',n:'violation_count'},{t:'string',n:'city_source'}] },
    { id: 'dim_violation',  x: 876, y: 298, w: 198, color: '#c084fc',
      cols: [{ t:'int',n:'violation_key',k:'PK'},{t:'string',n:'violation_code'},{t:'string',n:'violation_description'},{t:'string',n:'city_source'},{t:'boolean',n:'is_critical'}] },
    { id: 'fact_inspection_violation', x: 358, y: 556, w: 224, color: '#4fc3f7',
      cols: [{ t:'int',n:'inspection_violation_key',k:'PK'},{t:'int',n:'inspection_key',k:'FK'},{t:'int',n:'violation_key',k:'FK'},{t:'int',n:'violation_points'},{t:'boolean',n:'is_critical'}] },
  ];

  tdata.forEach(t => { t.h = calcH(t.cols); });
  const gt = (id) => tdata.find(t => t.id === id);

  // Connection lines: [x1,y1, x2,y2, color]
  const fi = gt('fact_inspection'), dv = gt('dim_violation'), fiv = gt('fact_inspection_violation');
  const topDims   = ['dim_date','dim_establishment','dim_location','dim_inspection_type','dim_result','dim_risk_category'];
  const xFromFact = [396, 415, 440, 470, 506, 536];
  const connections = [
    ...topDims.map((id, i) => { const d = gt(id); return [xFromFact[i], fi.y, d.x + d.w/2, d.y + d.h, d.color]; }),
    [fi.x + fi.w, fi.y + fi.h/2,       dv.x,        dv.y + dv.h/2,  dv.color],
    [fi.x + fi.w/2, fi.y + fi.h,       fiv.x + fiv.w/2, fiv.y,      'rgba(255,255,255,0.25)'],
    [fiv.x + fiv.w, fiv.y + fiv.h/2,   dv.x + dv.w/2,   dv.y + dv.h, dv.color],
  ];

  const renderTable = (t) => (
    <g key={t.id}>
      <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="3" fill="#0d0d0d" stroke={t.color} strokeWidth="1" strokeOpacity="0.65" />
      <rect x={t.x} y={t.y} width={t.w} height={HH} rx="3" fill={`${t.color}18`} />
      <rect x={t.x} y={t.y + HH - 1} width={t.w} height="1" fill={t.color} fillOpacity="0.3" />
      <text x={t.x + t.w / 2} y={t.y + 17} textAnchor="middle" fill={t.color} fontSize="11" fontWeight="700" fontFamily="'Space Grotesk',sans-serif">{t.id}</text>
      {t.cols.map((col, i) => {
        const ry = t.y + HH + i * RH;
        return (
          <g key={col.n}>
            {i % 2 === 0 && <rect x={t.x} y={ry} width={t.w} height={RH} fill="rgba(255,255,255,0.014)" />}
            <line x1={t.x} y1={ry} x2={t.x + t.w} y2={ry} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <text x={t.x + 6}  y={ry + 14} fill="#555" fontSize="9.5" fontFamily="'Courier New',monospace">{col.t}</text>
            <text x={t.x + 50} y={ry + 14} fill={col.k ? '#f0f0f0' : '#999'} fontSize="10" fontFamily="'Courier New',monospace" fontWeight={col.k ? '600' : '400'}>{col.n}</text>
            {col.k && (
              <>
                <rect x={t.x + t.w - 25} y={ry + 5} width={21} height={11} rx="2" fill={col.k === 'PK' ? 'rgba(245,166,35,0.22)' : 'rgba(79,195,247,0.22)'} />
                <text x={t.x + t.w - 14} y={ry + 14} textAnchor="middle" fill={col.k === 'PK' ? '#f5a623' : '#4fc3f7'} fontSize="8.5" fontWeight="700" fontFamily="sans-serif">{col.k}</text>
              </>
            )}
          </g>
        );
      })}
    </g>
  );

  // viewBox: width = max right edge + 10 = 988+170+10 = 1168 ≈ 1180
  //          height = fiv bottom + 16 = 556 + calcH(fiv.cols) + 16
  const vbH = fiv.y + fiv.h + 20;

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: '4px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}>
      <svg viewBox={`0 0 1180 ${vbH}`} style={{ display: 'block', minWidth: '620px', width: '100%' }} xmlns="http://www.w3.org/2000/svg">
        <rect width="1180" height={vbH} fill="#0a0a0a" />
        {/* Connections behind tables */}
        {connections.map(([x1,y1,x2,y2,col], i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth="1" strokeOpacity="0.38" strokeDasharray="5,4" />
            <circle cx={x1} cy={y1} r="2.8" fill={col} fillOpacity="0.55" />
            <circle cx={x2} cy={y2} r="2.8" fill={col} fillOpacity="0.55" />
          </g>
        ))}
        {tdata.map(renderTable)}
      </svg>
    </div>
  );
};

// ─── FoodLens detail ──────────────────────────────────────────────────────────
const FoodLensDetail = ({ project, onBack }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay = '0s') => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
  });

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>

      {/* ── Hero ── */}
      <div style={{ paddingTop: 'clamp(72px, 10vw, 100px)', paddingBottom: 'clamp(32px, 5vw, 56px)', borderBottom: `1px solid ${C.border}`, background: C.bg2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(16px, 5vw, 40px)' }}>
          <BackButton onClick={onBack} />

          <div style={{ ...fade('0.05s'), display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
            {project.tags.map((t) => <span key={t} style={tagStyle}>{t}</span>)}
            {project.course && <span style={tagStyleDark}>{project.course}</span>}
            {project.date && <span style={tagStyleDark}>{project.date}</span>}
          </div>

          <h1 style={{ ...fade('0.1s'), fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: C.text, marginBottom: '14px' }}>
            {project.name}
          </h1>

          <p style={{ ...fade('0.15s'), fontSize: '1rem', color: C.muted, lineHeight: 1.65, maxWidth: '680px', marginBottom: '28px' }}>
            {project.tagline}
          </p>

          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ ...actionBtnStyle, ...fade('0.2s') }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
              View on GitHub
            </a>
          )}
        </div>
      </div>

      {/* ── Metrics ── */}
      <Divider />
      <div style={{ background: C.bg }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(20px, 4vw, 40px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: '2px' }}>
          {project.metrics.map((m, i) => (
            <div key={i} style={{ padding: '24px 28px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '2px' }}>
              <div style={{ fontSize: '0.7rem', color: C.muted, marginBottom: '8px', letterSpacing: '0.04em' }}>{m.label}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700, color: m.color || C.text, lineHeight: 1 }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pipeline ── */}
      <Divider />
      <div style={{ background: C.bg2 }}>
        <Section label="Pipeline Architecture">
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', minWidth: '480px' }}>
            {project.pipeline.map((stage, i) => (
              <div key={i} style={{ position: 'relative', padding: '28px 20px', background: C.bg, border: `1px solid ${C.border}`, borderLeft: i > 0 ? 'none' : `1px solid ${C.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: pipelineColors[stage.layer] || C.muted, marginBottom: '8px' }}>{stage.layer}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: C.text, marginBottom: '5px' }}>{stage.label}</div>
                <div style={{ fontSize: '0.7rem', color: pipelineColors[stage.layer] || C.muted }}>{stage.sub}</div>
                {i < project.pipeline.length - 1 && (
                  <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, color: C.muted, fontSize: '1.1rem' }}>›</div>
                )}
              </div>
            ))}
          </div>
          </div>
        </Section>
      </div>

      {/* ── Architecture ── */}
      {(project.architectureDesc || project.flowchartImg) && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="Architecture">
              {project.architectureDesc && (
                <p style={{ fontSize: '0.95rem', color: C.text, lineHeight: 1.85, maxWidth: '740px', marginBottom: '28px' }}>
                  {project.architectureDesc}
                </p>
              )}
              <FoodLensFlowchart />
            </Section>
          </div>
        </>
      )}

      {/* ── Notebooks ── */}
      {project.notebooks && (
        <>
          <Divider />
          <Section label="Notebooks">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {project.notebooks.map((nb) => (
                <div key={nb.num}
                  style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '20px', padding: '24px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '3px', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                >
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.06)', lineHeight: 1, paddingTop: '2px' }}>{nb.num}</div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: C.text, marginBottom: '4px' }}>{nb.title}</div>
                    <code style={{ fontSize: '0.68rem', color: C.accent, fontFamily: 'monospace', display: 'block', marginBottom: '12px', opacity: 0.8 }}>{nb.file}</code>
                    <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {nb.bullets.map((b, i) => (
                        <li key={i} style={{ fontSize: '0.82rem', color: C.muted, lineHeight: 1.6 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── Dimensional Model ── */}
      {(project.dimensions || project.facts) && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="Dimensional Model">
              {project.dimensionalModelDesc && (
                <p style={{ fontSize: '0.9rem', color: C.muted, lineHeight: 1.8, marginBottom: '28px' }}>
                  {project.dimensionalModelDesc}
                </p>
              )}
              <div style={{ marginBottom: '32px' }}>
                <FoodLensERDiagram />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '32px' }}>
                {/* Dimensions */}
                <div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: '12px' }}>Dimensions</p>
                  <div style={{ border: `1px solid ${C.border}`, borderRadius: '3px', overflow: 'hidden' }}>
                    {project.dimensions.map((d, i) => (
                      <div key={d.table} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', padding: '11px 16px', background: i % 2 === 0 ? C.bg : 'transparent', borderBottom: i < project.dimensions.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center' }}>
                        <div>
                          <code style={{ fontSize: '0.72rem', color: C.accent, fontFamily: 'monospace' }}>{d.table}</code>
                          <div style={{ fontSize: '0.72rem', color: C.muted, marginTop: '2px' }}>{d.desc}</div>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: C.text, fontVariantNumeric: 'tabular-nums', textAlign: 'right', whiteSpace: 'nowrap' }}>{d.rows}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facts */}
                <div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: '12px' }}>Facts</p>
                  <div style={{ border: `1px solid ${C.border}`, borderRadius: '3px', overflow: 'hidden' }}>
                    {project.facts.map((f, i) => (
                      <div key={f.table} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', padding: '11px 16px', background: i % 2 === 0 ? C.bg : 'transparent', borderBottom: i < project.facts.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center' }}>
                        <div>
                          <code style={{ fontSize: '0.72rem', color: '#4fc3f7', fontFamily: 'monospace' }}>{f.table}</code>
                          <div style={{ fontSize: '0.72rem', color: C.muted, marginTop: '2px' }}>{f.desc}</div>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: C.text, fontVariantNumeric: 'tabular-nums', textAlign: 'right', whiteSpace: 'nowrap' }}>{f.rows}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </>
      )}

      {/* ── Validation Rules ── */}
      {project.validationRules && (
        <>
          <Divider />
          <Section label="Validation Rules">
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: `1px solid ${C.border}`, borderRadius: '3px' }}>
          <div style={{ minWidth: '420px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px', padding: '10px 16px', background: C.bg3, borderBottom: `1px solid ${C.border}` }}>
                {['Rule', 'City', 'Action'].map((h) => (
                  <span key={h} style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>{h}</span>
                ))}
              </div>
              {project.validationRules.map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px', padding: '11px 16px', background: i % 2 === 0 ? C.bg : 'transparent', borderBottom: i < project.validationRules.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: C.text, fontFamily: 'monospace' }}>{r.rule}</span>
                  <span style={{ fontSize: '0.72rem', color: C.muted }}>{r.city}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: r.action === 'drop' ? '#ff6b6b' : '#f5a623', background: r.action === 'drop' ? 'rgba(255,107,107,0.1)' : 'rgba(245,166,35,0.1)', padding: '3px 8px', borderRadius: '2px', display: 'inline-block' }}>{r.action || r.level}</span>
                </div>
              ))}
          </div>
            </div>
          </Section>
        </>
      )}

      {/* ── Engineering Decisions ── */}
      {project.engineeringDecisions?.length > 0 && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="Key Engineering Decisions">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '16px' }}>
                {project.engineeringDecisions.map((d, i) => (
                  <div key={i}
                    style={{ padding: '24px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '3px', transition: 'border-color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                  >
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', fontWeight: 600, color: C.text, marginBottom: '10px' }}>{d.title}</div>
                    <div style={{ fontSize: '0.8rem', color: C.muted, lineHeight: 1.65 }}>{d.body}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </>
      )}

      {/* ── Tools table ── */}
      {project.toolsTable && (
        <>
          <Divider />
          <Section label="Tools &amp; Stack">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px' }}>
              <div>
                <div style={{ border: `1px solid ${C.border}`, borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 16px', background: C.bg3, borderBottom: `1px solid ${C.border}` }}>
                    {['Tool', 'Purpose'].map((h) => (
                      <span key={h} style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>{h}</span>
                    ))}
                  </div>
                  {project.toolsTable.map((t, i) => (
                    <div key={t.tool} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '11px 16px', background: i % 2 === 0 ? C.bg : 'transparent', borderBottom: i < project.toolsTable.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ fontSize: '0.8rem', color: C.text, fontWeight: 500 }}>{t.tool}</span>
                      <span style={{ fontSize: '0.78rem', color: C.muted }}>{t.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginBottom: '14px' }}>Stack</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.stack.map((tech) => (
                    <span key={tech}
                      style={{ padding: '8px 16px', border: `1px solid ${C.border}`, borderRadius: '3px', fontSize: '0.78rem', fontWeight: 500, color: C.text, background: C.bg2, transition: 'all 0.2s', cursor: 'default' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
                    >{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </>
      )}

      {/* ── Deliverables ── */}
      {project.deliverables && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="Deliverables">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.deliverables.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: C.text }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    {d}
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </>
      )}

      {/* ── Footer ── */}
      <Divider />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(24px, 5vw, 40px)' }}>
        <p style={{ fontSize: '0.7rem', color: C.muted, marginBottom: '16px' }}>Northeastern University · Data Engineering Final Project · Spring 2026</p>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={actionBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = C.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.border; }}
          >
            View on GitHub ↗
          </a>
        )}
      </div>

    </div>
  );
};

// ─── Generic detail page ──────────────────────────────────────────────────────
const GenericDetail = ({ project, onBack }) => {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>
      <div style={{ paddingTop: 'clamp(72px, 10vw, 100px)', paddingBottom: 'clamp(32px, 5vw, 56px)', borderBottom: `1px solid ${C.border}`, background: C.bg2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(16px, 5vw, 40px)' }}>
          <BackButton onClick={onBack} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
            {project.tags.map((t) => <span key={t} style={tagStyle}>{t}</span>)}
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: C.text, marginBottom: '14px' }}>{project.name}</h1>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.65, maxWidth: '640px', marginBottom: '28px' }}>{project.tagline}</p>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={actionBtnStyle}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
            >View on GitHub ↗</a>
          )}
        </div>
      </div>
      <Section label="Stack">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: project.overview ? '40px' : 0 }}>
          {project.stack.map((tech) => <span key={tech} style={{ padding: '8px 16px', border: `1px solid ${C.border}`, borderRadius: '3px', fontSize: '0.8rem', color: C.text, background: C.bg2 }}>{tech}</span>)}
        </div>
        {project.overview && (
          <>
            <SectionLabel>Overview</SectionLabel>
            <p style={{ fontSize: '0.95rem', color: C.text, lineHeight: 1.8, maxWidth: '680px' }}>{project.overview}</p>
          </>
        )}
      </Section>
    </div>
  );
};

// ─── SCD badge colours ────────────────────────────────────────────────────────
const scdColor = { SCD1: '#00e87b', SCD2: '#f5a623', Fact: '#4fc3f7', Aggregate: '#a78bfa' };

// ─── Chinook inline diagrams ──────────────────────────────────────────────────
const ChinookFlowchart = () => {
  const Arrow = () => (
    <div style={{ display: 'flex', justifyContent: 'center', height: '28px', alignItems: 'center' }}>
      <div style={{ width: '1px', height: '100%', background: 'rgba(255,255,255,0.15)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '6px solid rgba(255,255,255,0.25)' }} />
      </div>
    </div>
  );
  const Node = ({ label, sub, borderColor = 'rgba(255,255,255,0.15)', bg = 'transparent', minW = '170px' }) => (
    <div style={{ border: `1px solid ${borderColor}`, borderRadius: '4px', padding: '9px 16px', background: bg, minWidth: minW, textAlign: 'center', flexShrink: 0 }}>
      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{label}</div>
      {sub && <div style={{ fontSize: '0.68rem', color: C.muted, marginTop: '3px' }}>{sub}</div>}
    </div>
  );
  const Row = ({ children }) => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', width: '100%' }}>{children}</div>
  );
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '3px', padding: 'clamp(20px, 3vw, 36px)', overflowX: 'auto' }}>
      <div style={{ minWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Row>
          <Node label="Azure SQL" sub="11 source tables" borderColor="#4fc3f7" bg="rgba(79,195,247,0.07)" />
          <Node label="pipeline_control" sub="Active tables metadata" borderColor="#888" bg="rgba(136,136,136,0.07)" />
        </Row>
        <Arrow />
        <Node label="Notebook 01: extract_from_source" sub="Loops over active tables via Connection Manager" borderColor="#f5a623" bg="rgba(245,166,35,0.07)" minW="300px" />
        <Arrow />
        <Node label="Parquet Volume" sub="Databricks Volume · dated paths" borderColor="#c8c8c8" bg="rgba(200,200,200,0.05)" />
        <Arrow />
        <Node label="execution_log" sub="Row counts + load status per table" borderColor="#888" bg="rgba(136,136,136,0.07)" />
        <Arrow />
        <Row>
          <Node label="Notebook 02: load_raw" sub="Writes Parquet to Volume" borderColor="#f5a623" bg="rgba(245,166,35,0.07)" minW="185px" />
          <Node label="Notebook 03: raw_to_bronze" sub="Delta · overwrite per run" borderColor="#f5a623" bg="rgba(245,166,35,0.07)" minW="185px" />
        </Row>
        <Arrow />
        <Node label="Bronze Delta Tables" sub="11 tables · exact copy of source" borderColor="#f5a623" bg="rgba(245,166,35,0.07)" />
        <Arrow />
        <Node label="Notebook 04: bronze_to_silver" sub="DQX profiling · nulls · duplicates · ranges" borderColor="#c8c8c8" bg="rgba(200,200,200,0.05)" />
        <Arrow />
        <Row>
          <Node label="Silver Tables" sub="Clean rows promoted" borderColor="#00e87b" bg="rgba(0,232,123,0.07)" minW="150px" />
          <Node label="Quarantine Tables" sub="Bad rows with _errors" borderColor="#ff6b6b" bg="rgba(255,107,107,0.1)" minW="150px" />
        </Row>
        <Arrow />
        <Node label="Notebook 05: silver_to_gold" sub="7 dims + 2 fact tables" borderColor="#00e87b" bg="rgba(0,232,123,0.07)" />
        <Arrow />
        <Row>
          <Node label="6 SCD1 dims" sub="artist · album · genre · media_type · employee · track" minW="200px" />
          <Node label="dim_customer" sub="SCD Type 2" borderColor="#a78bfa" bg="rgba(167,139,250,0.07)" minW="130px" />
          <Node label="fact_sales + agg" sub="2 fact tables" borderColor="#f472b6" bg="rgba(244,114,182,0.07)" minW="130px" />
        </Row>
        <Arrow />
        <Node label="Databricks Workflows" sub="Job orchestration · execution log" borderColor="#4fc3f7" bg="rgba(79,195,247,0.07)" minW="230px" />
      </div>
    </div>
  );
};

const ChinookERDiagram = () => {
  const RH = 20, HH = 26;
  const calcH = (cols) => HH + cols.length * RH;

  const tdata = [
    { id: 'dim_artist',     x: 10,  y: 15,  w: 155, color: '#f5a623',
      cols: [{t:'int',n:'artist_key',k:'PK'},{t:'int',n:'artist_id'},{t:'string',n:'name'}] },
    { id: 'dim_album',      x: 185, y: 15,  w: 175, color: '#c084fc',
      cols: [{t:'int',n:'album_key',k:'PK'},{t:'int',n:'album_id'},{t:'string',n:'title'},{t:'int',n:'artist_key',k:'FK'}] },
    { id: 'dim_genre',      x: 410, y: 15,  w: 150, color: '#00e87b',
      cols: [{t:'int',n:'genre_key',k:'PK'},{t:'int',n:'genre_id'},{t:'string',n:'name'}] },
    { id: 'dim_media_type', x: 580, y: 15,  w: 175, color: '#4fc3f7',
      cols: [{t:'int',n:'media_type_key',k:'PK'},{t:'int',n:'media_type_id'},{t:'string',n:'name'}] },
    { id: 'dim_employee',   x: 775, y: 15,  w: 185, color: '#ff6b6b',
      cols: [{t:'int',n:'employee_key',k:'PK'},{t:'int',n:'employee_id'},{t:'string',n:'first_name'},{t:'string',n:'last_name'},{t:'string',n:'title'},{t:'string',n:'city'},{t:'string',n:'country'}] },
    { id: 'dim_customer',   x: 10,  y: 240, w: 200, color: '#a78bfa',
      cols: [{t:'int',n:'customer_key',k:'PK'},{t:'int',n:'customer_id'},{t:'string',n:'first_name'},{t:'string',n:'last_name'},{t:'string',n:'email'},{t:'string',n:'city'},{t:'string',n:'country'},{t:'date',n:'eff_start_date'},{t:'date',n:'eff_end_date'},{t:'string',n:'is_current'},{t:'string',n:'row_hash'}] },
    { id: 'fact_sales',     x: 340, y: 240, w: 215, color: '#f472b6',
      cols: [{t:'int',n:'sales_key',k:'PK'},{t:'int',n:'invoice_id'},{t:'int',n:'track_key',k:'FK'},{t:'int',n:'customer_key',k:'FK'},{t:'int',n:'employee_key',k:'FK'},{t:'double',n:'unit_price'},{t:'int',n:'quantity'},{t:'double',n:'extended_price'},{t:'date',n:'invoice_date'}] },
    { id: 'dim_track',      x: 340, y: 520, w: 215, color: '#eab308',
      cols: [{t:'int',n:'track_key',k:'PK'},{t:'int',n:'track_id'},{t:'string',n:'track_name'},{t:'int',n:'album_key',k:'FK'},{t:'int',n:'genre_key',k:'FK'},{t:'int',n:'media_type_key',k:'FK'},{t:'string',n:'composer'},{t:'double',n:'unit_price'}] },
    { id: 'fact_sales_customer_agg', x: 625, y: 520, w: 215, color: '#38bdf8',
      cols: [{t:'int',n:'agg_key',k:'PK'},{t:'int',n:'customer_key',k:'FK'},{t:'double',n:'total_spent'},{t:'int',n:'invoice_count'},{t:'int',n:'track_count'},{t:'date',n:'first_purchase'},{t:'date',n:'last_purchase'}] },
  ];

  tdata.forEach(t => { t.h = calcH(t.cols); });
  const gt = (id) => tdata.find(t => t.id === id);

  const fs  = gt('fact_sales');
  const dt  = gt('dim_track');
  const dc  = gt('dim_customer');
  const de  = gt('dim_employee');
  const da  = gt('dim_album');
  const dar = gt('dim_artist');
  const dg  = gt('dim_genre');
  const dmt = gt('dim_media_type');
  const fsa = gt('fact_sales_customer_agg');

  const connections = [
    [fs.x,                          fs.y + Math.round(fs.h / 2),       dc.x + dc.w,                    dc.y + Math.round(dc.h / 2),      dc.color],
    [fs.x + Math.round(fs.w / 2),   fs.y,                              de.x + Math.round(de.w / 2),    de.y + de.h,                      de.color],
    [fs.x + Math.round(fs.w / 2),   fs.y + fs.h,                       dt.x + Math.round(dt.w / 2),    dt.y,                             dt.color],
    [fs.x + fs.w,                   fs.y + Math.round(fs.h * 0.7),     fsa.x,                          fsa.y + Math.round(fsa.h * 0.2),  fsa.color],
    [dt.x + Math.round(dt.w * 0.3), dt.y,                              da.x + Math.round(da.w / 2),    da.y + da.h,                      da.color],
    [dt.x + Math.round(dt.w * 0.5), dt.y,                              dg.x + Math.round(dg.w / 2),    dg.y + dg.h,                      dg.color],
    [dt.x + Math.round(dt.w * 0.7), dt.y,                              dmt.x + Math.round(dmt.w / 2),  dmt.y + dmt.h,                    dmt.color],
    [da.x,                          da.y + Math.round(da.h / 2),       dar.x + dar.w,                  dar.y + Math.round(dar.h / 2),    dar.color],
  ];

  const vbW = de.x + de.w + 10;
  const vbH = Math.max(dt.y + dt.h, fsa.y + fsa.h) + 20;

  const renderTable = (t) => (
    <g key={t.id}>
      <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="3" fill="#0d0d0d" stroke={t.color} strokeWidth="1" strokeOpacity="0.65" />
      <rect x={t.x} y={t.y} width={t.w} height={HH} rx="3" fill={`${t.color}18`} />
      <rect x={t.x} y={t.y + HH - 1} width={t.w} height="1" fill={t.color} fillOpacity="0.3" />
      <text x={t.x + t.w / 2} y={t.y + 17} textAnchor="middle" fill={t.color} fontSize="11" fontWeight="700" fontFamily="'Space Grotesk',sans-serif">{t.id}</text>
      {t.cols.map((col, i) => {
        const ry = t.y + HH + i * RH;
        return (
          <g key={col.n}>
            {i % 2 === 0 && <rect x={t.x} y={ry} width={t.w} height={RH} fill="rgba(255,255,255,0.014)" />}
            <line x1={t.x} y1={ry} x2={t.x + t.w} y2={ry} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <text x={t.x + 6}  y={ry + 14} fill="#555" fontSize="9.5" fontFamily="'Courier New',monospace">{col.t}</text>
            <text x={t.x + 50} y={ry + 14} fill={col.k ? '#f0f0f0' : '#999'} fontSize="10" fontFamily="'Courier New',monospace" fontWeight={col.k ? '600' : '400'}>{col.n}</text>
            {col.k && (
              <>
                <rect x={t.x + t.w - 25} y={ry + 5} width={21} height={11} rx="2" fill={col.k === 'PK' ? 'rgba(245,166,35,0.22)' : 'rgba(79,195,247,0.22)'} />
                <text x={t.x + t.w - 14} y={ry + 14} textAnchor="middle" fill={col.k === 'PK' ? '#f5a623' : '#4fc3f7'} fontSize="8.5" fontWeight="700" fontFamily="sans-serif">{col.k}</text>
              </>
            )}
          </g>
        );
      })}
    </g>
  );

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: '4px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}>
      <svg viewBox={`0 0 ${vbW} ${vbH}`} style={{ display: 'block', minWidth: '620px', width: '100%' }} xmlns="http://www.w3.org/2000/svg">
        <rect width={vbW} height={vbH} fill="#0a0a0a" />
        {connections.map(([x1,y1,x2,y2,col], i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth="1" strokeOpacity="0.38" strokeDasharray="5,4" />
            <circle cx={x1} cy={y1} r="2.8" fill={col} fillOpacity="0.55" />
            <circle cx={x2} cy={y2} r="2.8" fill={col} fillOpacity="0.55" />
          </g>
        ))}
        {tdata.map(renderTable)}
      </svg>
    </div>
  );
};

// ─── Chinook detail ───────────────────────────────────────────────────────────
const ChinookDetail = ({ project, onBack }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay = '0s') => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
  });

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>

      {/* ── Hero ── */}
      <div style={{ paddingTop: 'clamp(72px, 10vw, 100px)', paddingBottom: 'clamp(32px, 5vw, 56px)', borderBottom: `1px solid ${C.border}`, background: C.bg2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(16px, 5vw, 40px)' }}>
          <BackButton onClick={onBack} />
          <div style={{ ...fade('0.05s'), display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
            {project.tags.map((t) => <span key={t} style={tagStyle}>{t}</span>)}
            {project.course && <span style={tagStyleDark}>{project.course}</span>}
            {project.date && <span style={tagStyleDark}>{project.date}</span>}
          </div>
          <h1 style={{ ...fade('0.1s'), fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: C.text, marginBottom: '14px' }}>{project.name}</h1>
          <p style={{ ...fade('0.15s'), fontSize: '1rem', color: C.muted, lineHeight: 1.65, maxWidth: '680px', marginBottom: '28px' }}>{project.tagline}</p>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ ...actionBtnStyle, ...fade('0.2s') }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
              View on GitHub
            </a>
          )}
        </div>
      </div>

      {/* ── Metrics ── */}
      <Divider />
      <div style={{ background: C.bg }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(20px, 4vw, 40px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: '2px' }}>
          {project.metrics.map((m, i) => (
            <div key={i} style={{ padding: '24px 28px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '2px' }}>
              <div style={{ fontSize: '0.7rem', color: C.muted, marginBottom: '8px', letterSpacing: '0.04em' }}>{m.label}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700, color: m.color || C.text, lineHeight: 1 }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pipeline ── */}
      <Divider />
      <div style={{ background: C.bg2 }}>
        <Section label="Pipeline Architecture">
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${project.pipeline.length}, 1fr)`, minWidth: `${project.pipeline.length * 120}px` }}>
            {project.pipeline.map((stage, i) => (
              <div key={i} style={{ position: 'relative', padding: '24px 16px', background: C.bg, border: `1px solid ${C.border}`, borderLeft: i > 0 ? 'none' : `1px solid ${C.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: stage.color || C.muted, marginBottom: '8px' }}>{stage.layer}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.88rem', fontWeight: 600, color: C.text, marginBottom: '5px' }}>{stage.label}</div>
                <div style={{ fontSize: '0.68rem', color: stage.color || C.muted, lineHeight: 1.4 }}>{stage.sub}</div>
                {i < project.pipeline.length - 1 && (
                  <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, color: C.muted, fontSize: '1.1rem' }}>›</div>
                )}
              </div>
            ))}
          </div>
          </div>
        </Section>
      </div>

      {/* ── Architecture ── */}
      {project.architectureDesc && (
        <>
          <Divider />
          <div style={{ background: C.bg }}>
            <Section label="Architecture">
              <p style={{ fontSize: '0.95rem', color: C.text, lineHeight: 1.85, maxWidth: '740px', marginBottom: '28px' }}>
                {project.architectureDesc}
              </p>
              <ChinookFlowchart />
            </Section>
          </div>
        </>
      )}

      {/* ── Overview ── */}
      {project.overview && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="Project Overview">
              <p style={{ fontSize: '0.95rem', color: C.text, lineHeight: 1.85, maxWidth: '740px' }}>{project.overview}</p>
            </Section>
          </div>
        </>
      )}

      {/* ── Notebooks ── */}
      {project.notebooks && (
        <>
          <Divider />
          <Section label="Notebooks">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {project.notebooks.map((nb) => (
                <div key={nb.num}
                  style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '20px', padding: '24px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '3px', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                >
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.06)', lineHeight: 1, paddingTop: '2px' }}>{nb.num}</div>
                  <div>
                    <code style={{ fontSize: '0.82rem', color: C.accent, fontFamily: 'monospace', display: 'block', marginBottom: '6px', fontWeight: 600 }}>{nb.title}</code>
                    <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {nb.bullets.map((b, i) => (
                        <li key={i} style={{ fontSize: '0.82rem', color: C.muted, lineHeight: 1.6 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── Gold Layer ── */}
      {project.goldTables && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="Gold Layer">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '10px' }}>
                {project.goldTables.map((t) => (
                  <div key={t.table}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '3px', transition: 'border-color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                  >
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', padding: '3px 7px', borderRadius: '3px', background: `${scdColor[t.scd]}20`, color: scdColor[t.scd], border: `1px solid ${scdColor[t.scd]}40`, whiteSpace: 'nowrap' }}>{t.scd}</span>
                    <div>
                      <code style={{ fontSize: '0.82rem', color: C.text, fontFamily: 'monospace', fontWeight: 500 }}>{t.table}</code>
                      <div style={{ fontSize: '0.7rem', color: C.muted, marginTop: '2px' }}>{t.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </>
      )}

      {/* ── Schema Design ── */}
      {project.schemaDesc && (
        <>
          <Divider />
          <div style={{ background: C.bg }}>
            <Section label="Schema Design">
              <p style={{ fontSize: '0.9rem', color: C.muted, lineHeight: 1.8, marginBottom: '28px' }}>
                {project.schemaDesc}
              </p>
              <ChinookERDiagram />
            </Section>
          </div>
        </>
      )}

      {/* ── Stack ── */}
      <Divider />
      <Section label="Tech Stack">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.stack.map((tech) => (
            <span key={tech}
              style={{ padding: '8px 16px', border: `1px solid ${C.border}`, borderRadius: '3px', fontSize: '0.78rem', fontWeight: 500, color: C.text, background: C.bg2, transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
            >{tech}</span>
          ))}
        </div>
      </Section>

      {/* ── Contributors ── */}
      {project.contributors && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="Contributors">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {project.contributors.map((c) => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: C.accentDim, border: `1px solid rgba(0,232,123,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: C.accent, flexShrink: 0 }}>
                      {c.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: C.text }}>{c.name}</div>
                      <div style={{ fontSize: '0.78rem', color: C.muted, marginTop: '2px' }}>{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </>
      )}

      {/* ── Footer ── */}
      <Divider />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(24px, 5vw, 40px)' }}>
        <p style={{ fontSize: '0.7rem', color: C.muted }}>Northeastern University · INFO 7374 · Spring 2026</p>
      </div>
    </div>
  );
};

// ─── Crypto Pulse detail ─────────────────────────────────────────────────────
const CryptoPulseDetail = ({ project, onBack }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay = '0s') => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
  });

  const pipelineAccent = { SOURCE: '#f5a623', QUEUE: '#4fc3f7', STORE: '#00e87b', SERVE: '#a78bfa' };

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>

      {/* ── Hero ── */}
      <div style={{ paddingTop: 'clamp(72px, 10vw, 100px)', paddingBottom: 'clamp(32px, 5vw, 56px)', borderBottom: `1px solid ${C.border}`, background: C.bg2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(16px, 5vw, 40px)' }}>
          <BackButton onClick={onBack} />

          <div style={{ ...fade('0.05s'), display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
            {project.tags.map((t) => <span key={t} style={tagStyle}>{t}</span>)}
            {project.date && <span style={tagStyleDark}>{project.date}</span>}
          </div>

          <h1 style={{ ...fade('0.1s'), fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: C.text, marginBottom: '14px' }}>
            {project.name}
          </h1>

          <p style={{ ...fade('0.15s'), fontSize: '1rem', color: C.muted, lineHeight: 1.65, maxWidth: '680px', marginBottom: '28px' }}>
            {project.tagline}
          </p>

          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ ...actionBtnStyle, ...fade('0.2s') }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
              View on GitHub
            </a>
          )}
        </div>
      </div>

      {/* ── Metrics ── */}
      <Divider />
      <div style={{ background: C.bg }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(20px, 4vw, 40px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: '2px' }}>
          {project.metrics.map((m, i) => (
            <div key={i} style={{ padding: '24px 28px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '2px' }}>
              <div style={{ fontSize: '0.7rem', color: C.muted, marginBottom: '8px', letterSpacing: '0.04em' }}>{m.label}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700, color: m.color || C.text, lineHeight: 1 }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pipeline ── */}
      <Divider />
      <div style={{ background: C.bg2 }}>
        <Section label="Pipeline Architecture">
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${project.pipeline.length}, 1fr)`, minWidth: `${project.pipeline.length * 120}px` }}>
              {project.pipeline.map((stage, i) => (
                <div key={i} style={{ position: 'relative', padding: '28px 16px', background: C.bg, border: `1px solid ${C.border}`, borderLeft: i > 0 ? 'none' : `1px solid ${C.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: pipelineAccent[stage.layer] || stage.color || C.muted, marginBottom: '8px' }}>{stage.layer}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: C.text, marginBottom: '5px' }}>{stage.label}</div>
                  <div style={{ fontSize: '0.7rem', color: pipelineAccent[stage.layer] || stage.color || C.muted }}>{stage.sub}</div>
                  {i < project.pipeline.length - 1 && (
                    <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, color: C.muted, fontSize: '1.1rem' }}>›</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* ── Overview ── */}
      {project.overview && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="Project Overview">
              <p style={{ fontSize: '0.95rem', color: C.text, lineHeight: 1.85, maxWidth: '740px' }}>{project.overview}</p>
            </Section>
          </div>
        </>
      )}

      {/* ── Architecture Notes ── */}
      {project.architectureNotes?.length > 0 && (
        <>
          <Divider />
          <Section label="Architecture">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {project.architectureNotes.map((note, i) => (
                <div key={i}
                  style={{ padding: '24px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '3px', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                >
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', fontWeight: 600, color: C.text, marginBottom: '10px' }}>{note.title}</div>
                  <div style={{ fontSize: '0.82rem', color: C.muted, lineHeight: 1.7 }}>{note.body}</div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── SQL Highlights ── */}
      {project.sqlHighlights?.length > 0 && (
        <>
          <Divider />
          <div style={{ background: C.bg2 }}>
            <Section label="SQL Highlights">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {project.sqlHighlights.map((s, i) => (
                  <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, background: C.bg3 }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', fontWeight: 600, color: C.text, marginBottom: '6px' }}>{s.title}</div>
                      <div style={{ fontSize: '0.8rem', color: C.muted, lineHeight: 1.65 }}>{s.description}</div>
                    </div>
                    <pre style={{ margin: 0, padding: '18px 20px', background: '#0d0d0d', overflowX: 'auto', fontSize: '0.75rem', lineHeight: 1.75, color: C.accent, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", WebkitOverflowScrolling: 'touch' }}>
                      <code>{s.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </>
      )}

      {/* ── Engineering Decisions ── */}
      {project.engineeringDecisions?.length > 0 && (
        <>
          <Divider />
          <Section label="Engineering Decisions">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '16px' }}>
              {project.engineeringDecisions.map((d, i) => (
                <div key={i}
                  style={{ padding: '24px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '3px', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                >
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', fontWeight: 600, color: C.text, marginBottom: '10px' }}>{d.title}</div>
                  <div style={{ fontSize: '0.8rem', color: C.muted, lineHeight: 1.65 }}>{d.body}</div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── Stack ── */}
      <Divider />
      <div style={{ background: C.bg2 }}>
        <Section label="Tech Stack">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.stack.map((tech) => (
              <span key={tech}
                style={{ padding: '8px 16px', border: `1px solid ${C.border}`, borderRadius: '3px', fontSize: '0.78rem', fontWeight: 500, color: C.text, background: C.bg, transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
              >{tech}</span>
            ))}
          </div>
        </Section>
      </div>

      {/* ── Footer ── */}
      <Divider />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(24px, 5vw, 40px)' }}>
        <p style={{ fontSize: '0.7rem', color: C.muted, marginBottom: '16px' }}>Personal project · No cloud accounts needed to run locally</p>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={actionBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = C.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.border; }}
          >
            View on GitHub ↗
          </a>
        )}
      </div>

    </div>
  );
};

// ─── Router ───────────────────────────────────────────────────────────────────
const ProjectDetail = ({ project, onBack }) => {
  if (project.id === 'foodlens') return <FoodLensDetail project={project} onBack={onBack} />;
  if (project.id === 'chinook') return <ChinookDetail project={project} onBack={onBack} />;
  if (project.id === 'crypto-pulse') return <CryptoPulseDetail project={project} onBack={onBack} />;
  return <GenericDetail project={project} onBack={onBack} />;
};

export default ProjectDetail;
