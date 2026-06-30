// SECFilingRAG.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const C = {
  bg: '#0a0a0a',
  bg2: '#111111',
  bg3: '#161616',
  text: '#f0f0f0',
  muted: '#888',
  accent: '#00e87b',
  accentDim: 'rgba(0,232,123,0.12)',
  border: 'rgba(255,255,255,0.08)',
  borderAccent: 'rgba(0,232,123,0.3)',
};

const stack = [
  'Python', 'DuckDB', 'dbt', 'Qdrant', 'Dagster',
  'Streamlit', 'Pydantic', 'SEC EDGAR API', 'RAG', 'TF-IDF',
];

const archSteps = [
  {
    label: 'Bronze',
    sub: 'Raw filings',
    desc: 'Rate-limited, idempotent ingestion from SEC EDGAR. Accession-level dedup prevents re-downloads. Watermark tracks last-ingested date for incremental runs.',
    icon: '⬇',
    color: '#f59e0b',
  },
  {
    label: 'Silver',
    sub: 'Chunks + embeddings',
    desc: 'HTML/PDF parser → fixed-window chunker with overlap → NER entity extractor → pluggable embedder (hashing / SBERT / OpenAI). Chunks upserted into Qdrant.',
    icon: '⚙',
    color: '#60a5fa',
  },
  {
    label: 'Gold',
    sub: 'Star schema',
    desc: 'dbt transforms Silver into a dimensional model: fact_chunks, dim_company, dim_filing. Schema tests (not_null, unique, relationships) run on every dbt build.',
    icon: '✦',
    color: '#a78bfa',
  },
  {
    label: 'RAG',
    sub: 'Query pipeline',
    desc: 'Retrieve top-k chunks from Qdrant, optionally pass to an LLM (OpenAI / Anthropic / Groq). LLM_PROVIDER=none returns ranked chunks without generation — zero API keys needed.',
    icon: '↗',
    color: C.accent,
  },
];

const highlights = [
  {
    num: '01',
    title: 'Fully Offline by Default',
    body: 'HashingVectorizer embeddings need no model download. SEC_LLM_PROVIDER=none skips generation entirely. The entire pipeline — ingest, chunk, embed, index, eval — runs without a single API key.',
  },
  {
    num: '02',
    title: 'Pluggable Everything',
    body: 'Swap embedder (hashing → sentence-transformers → OpenAI), vector store (local file → memory → Qdrant Cloud), LLM (none → gpt-4o-mini → claude-3-haiku), and warehouse (DuckDB → Snowflake) via .env alone.',
  },
  {
    num: '03',
    title: 'Production-Grade Orchestration',
    body: 'Dagster software-defined assets model Bronze → Silver → Gold as a dependency graph. Asset materialisation is idempotent; partial failures resume from the last successful step.',
  },
  {
    num: '04',
    title: 'Evaluation Harness',
    body: 'Deterministic Hit@k sweep over a labeled QA set ships with the project — no LLM needed. RAGAS wiring (faithfulness, answer relevancy) is available when an OpenAI key is provided.',
  },
  {
    num: '05',
    title: 'Incremental Ingestion',
    body: 'A watermark file persists the last-seen filed_date. Re-running ingest only fetches filings newer than the watermark — safe to run nightly without re-downloading the corpus.',
  },
  {
    num: '06',
    title: 'dbt Semantic Layer',
    body: 'Staging models validate and cast raw Silver data. Mart models build the star schema. Schema tests catch data quality regressions on every build. Row-count reconciliation is logged end-to-end.',
  },
];

const decisions = [
  {
    q: 'Why DuckDB instead of Snowflake?',
    a: 'DuckDB runs locally with zero infrastructure and handles millions of rows comfortably. The dbt profile is the only change needed to point at Snowflake — the SQL models are identical standard SQL.',
  },
  {
    q: 'Why embedded Qdrant instead of Qdrant Cloud?',
    a: 'qdrant-client\'s embedded persistent mode (path=./qdrant_data) needs no server process. Application code is identical to Docker/Cloud mode — swap SEC_QDRANT_LOCATION and you\'re done.',
  },
  {
    q: 'Why HashingVectorizer as the default embedder?',
    a: 'Zero cold-start, no model download, fully offline, deterministic. It\'s not semantically meaningful but makes the pipeline runnable in under a minute. Switch to sentence_transformers for real retrieval quality.',
  },
  {
    q: 'Why is generation optional?',
    a: 'SEC_LLM_PROVIDER=none returns ranked chunks without generation. This keeps the pipeline runnable with no API key and makes retrieval quality independently measurable — decoupled from generation quality.',
  },
  {
    q: 'Why TF-IDF for the Streamlit demo instead of a neural embedder?',
    a: 'fastembed (ONNX) and sentence-transformers both failed to install reliably on Streamlit Community Cloud due to binary dependency conflicts (onnxruntime, pyarrow). A scikit-learn TfidfVectorizer fitted at startup is guaranteed to work, has IDF weighting that downweights common financial boilerplate, and adds zero install-time dependencies. Company names are prepended to each indexed chunk so company-specific queries anchor correctly.',
  },
];

const SECFilingRAG = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [openDecision, setOpenDecision] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>

      {/* ── Top bar ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 40px',
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: C.muted,
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back
        </button>

        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
            color: C.text,
          }}
        >
          VS<span style={{ color: C.accent }}>.</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href="https://sec-filing-rag-pipeline.streamlit.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: C.accent,
              textDecoration: 'none',
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            Live Demo
          </a>
          <a
            href="https://github.com/Varun1619/sec-filing-rag-pipeline"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: C.muted,
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '100px',
          paddingLeft: '40px',
          paddingRight: '40px',
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '-20px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(80px, 12vw, 180px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.02)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          SEC
        </div>

        <p style={{ ...fade(0.1), fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.accent, marginBottom: '16px' }}>
          Case Study · Data Engineering + AI
        </p>

        <h1
          style={{
            ...fade(0.2),
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            marginBottom: '24px',
          }}
        >
          SEC Filing{' '}
          <span style={{ WebkitTextStroke: '1.5px #f0f0f0', color: 'transparent' }}>
            RAG Pipeline
          </span>
        </h1>

        <p
          style={{
            ...fade(0.3),
            fontSize: '1.05rem',
            color: C.muted,
            lineHeight: 1.7,
            maxWidth: '680px',
            marginBottom: '40px',
          }}
        >
          A production-grade data engineering pipeline that ingests messy SEC EDGAR HTML/PDF filings,
          parses and chunks them, enriches with entity extraction, embeds with pluggable backends, and
          makes them queryable in natural language — orchestrated with Dagster, modelled in dbt, and
          queryable through a Streamlit dashboard.
        </p>

        {/* Stack chips */}
        <div style={{ ...fade(0.4), display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
          {stack.map((t) => (
            <span
              key={t}
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.accent,
                fontWeight: 600,
                background: C.accentDim,
                padding: '5px 12px',
                borderRadius: '2px',
                border: `1px solid ${C.borderAccent}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stat row */}
        <div style={{ ...fade(0.5), display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
          {[
            { label: 'Filings indexed', value: '20 (demo)' },
            { label: 'Chunks', value: '2,342' },
            { label: 'Embedding backends', value: '4 (offline → cloud)' },
            { label: 'API keys required', value: 'Zero (default)' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: C.text }}>{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Architecture ── */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: '80px 40px', background: C.bg2 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>
            System Design
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '56px' }}>
            Architecture{' '}
            <span style={{ WebkitTextStroke: '1px #f0f0f0', color: 'transparent' }}>Overview</span>
          </h2>

          {/* Pipeline flow */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: '0', overflowX: 'auto', paddingBottom: '8px' }}>
            {archSteps.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'stretch', flex: 1, minWidth: '220px' }}>
                <div
                  style={{
                    flex: 1,
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                    borderRight: i < archSteps.length - 1 ? 'none' : `1px solid ${C.border}`,
                    padding: '32px 28px',
                    position: 'relative',
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: step.color }} />

                  <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{step.icon}</div>

                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: step.color, marginBottom: '4px' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: '16px' }}>
                    {step.sub}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: C.muted, lineHeight: 1.65 }}>
                    {step.desc}
                  </div>
                </div>

                {/* Arrow connector */}
                {i < archSteps.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px', color: C.muted, fontSize: '0.9rem', flexShrink: 0 }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quickstart */}
          <div
            style={{
              marginTop: '48px',
              background: C.bg3,
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${C.accent}`,
              padding: '28px 32px',
              borderRadius: '2px',
            }}
          >
            <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>
              Quickstart — zero API keys, runs offline
            </p>
            <pre
              style={{
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#c9d1d9',
                lineHeight: 1.8,
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`pip install -e ".[st,eval,dev]"
cp .env.example .env

python -m scripts.run_pipeline ingest   # fetch EDGAR filings
python -m scripts.run_pipeline build    # parse → chunk → embed → index
cd dbt && dbt build --profiles-dir . --project-dir . && cd ..
python -m scripts.run_pipeline eval     # Hit@k retrieval eval
streamlit run app.py                    # dashboard`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>
            What Makes It Interesting
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '56px' }}>
            Key{' '}
            <span style={{ WebkitTextStroke: '1px #f0f0f0', color: 'transparent' }}>Highlights</span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1px',
              background: C.border,
              border: `1px solid ${C.border}`,
            }}
          >
            {highlights.map((h) => (
              <HighlightCard key={h.num} item={h} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Switching backends ── */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: '80px 40px', background: C.bg2 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>
            Configuration
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '40px' }}>
            Switch Backends via{' '}
            <span style={{ WebkitTextStroke: '1px #f0f0f0', color: 'transparent' }}>.env</span>
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {['What', 'Variable', 'Options'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 20px', color: C.muted, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.65rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { what: 'Embedder', variable: 'SEC_EMBEDDER', options: 'hashing (default, offline) · fastembed (ONNX) · sentence_transformers · openai' },
                  { what: 'LLM', variable: 'SEC_LLM_PROVIDER', options: 'none (default) · openai · anthropic · groq' },
                  { what: 'Vector store', variable: 'SEC_QDRANT_LOCATION', options: './qdrant_data (default) · :memory: · http://localhost:6333' },
                  { what: 'Warehouse', variable: 'SEC_DUCKDB_PATH', options: './warehouse.duckdb · swap dbt profile for Snowflake' },
                ].map((row, i) => (
                  <tr key={row.what} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '16px 20px', color: C.text, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{row.what}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <code style={{ color: C.accent, fontSize: '0.8rem', background: C.accentDim, padding: '2px 8px', borderRadius: '2px' }}>{row.variable}</code>
                    </td>
                    <td style={{ padding: '16px 20px', color: C.muted }}>{row.options}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Eval Results ── */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>
            Retrieval Evaluation
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>
            Hit@k{' '}
            <span style={{ WebkitTextStroke: '1px #f0f0f0', color: 'transparent' }}>Results</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.7, maxWidth: '640px', marginBottom: '40px' }}>
            TF-IDF retriever evaluated over a labeled QA set on the demo corpus (20 filings, 2,342 chunks). 100% Hit@k across all k values — note this is a self-recall benchmark; questions were derived from corpus text. A held-out human-written eval would give a truer signal on semantic quality.
          </p>
          <div style={{ display: 'flex', gap: '1px', background: C.border, border: `1px solid ${C.border}`, maxWidth: '560px' }}>
            {[
              { k: 1, hit: '100%', latency: '~500 ms' },
              { k: 3, hit: '100%', latency: '~470 ms' },
              { k: 5, hit: '100%', latency: '~480 ms' },
              { k: 10, hit: '100%', latency: '~470 ms' },
            ].map((row) => (
              <div key={row.k} style={{ flex: 1, background: C.bg, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: '8px' }}>top_{row.k}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: C.accent, marginBottom: '4px' }}>{row.hit}</div>
                <div style={{ fontSize: '0.7rem', color: C.muted }}>{row.latency}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: C.muted, marginTop: '16px', fontStyle: 'italic' }}>
            20 questions · TF-IDF retriever · demo corpus
          </p>
        </div>
      </section>

      {/* ── Design Decisions ── */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: '80px 40px', background: C.bg2 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.accent, marginBottom: '12px' }}>
            Engineering Tradeoffs
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '48px' }}>
            Design{' '}
            <span style={{ WebkitTextStroke: '1px #f0f0f0', color: 'transparent' }}>Decisions</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: C.border, border: `1px solid ${C.border}` }}>
            {decisions.map((d, i) => (
              <DecisionItem
                key={i}
                item={d}
                open={openDecision === i}
                onToggle={() => setOpenDecision(openDecision === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: '80px 40px', background: C.bg, textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.accent, marginBottom: '16px' }}>
          Explore the Project
        </p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Try it live or explore the source
        </h2>
        <p style={{ fontSize: '0.9rem', color: C.muted, marginBottom: '40px' }}>
          Ask natural-language questions across 20 SEC filings — no login required.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href="https://sec-filing-rag-pipeline.streamlit.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              background: C.accent,
              color: '#000',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
          <a
            href="https://github.com/Varun1619/sec-filing-rag-pipeline"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              background: 'transparent',
              color: C.text,
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              border: `1px solid ${C.border}`,
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        <div style={{ marginTop: '40px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: C.muted,
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Back to Portfolio
          </button>
        </div>
      </section>
    </div>
  );
};

// ── Sub-components ──

const HighlightCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#111' : '#0a0a0a',
        padding: '36px 32px',
        transition: 'background 0.3s',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '3.5rem',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.04)',
          lineHeight: 1,
          marginBottom: '12px',
          userSelect: 'none',
        }}
      >
        {item.num}
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: hovered ? '#00e87b' : '#f0f0f0', marginBottom: '10px', transition: 'color 0.3s' }}>
        {item.title}
      </div>
      <div style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.65 }}>
        {item.body}
      </div>
    </div>
  );
};

const DecisionItem = ({ item, open, onToggle }) => (
  <div style={{ background: open ? '#111' : '#0a0a0a', transition: 'background 0.3s' }}>
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 32px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        gap: '20px',
      }}
    >
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 600, color: '#f0f0f0' }}>
        {item.q}
      </span>
      <span
        style={{
          color: '#00e87b',
          fontSize: '1.2rem',
          flexShrink: 0,
          transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          display: 'inline-block',
        }}
      >
        +
      </span>
    </button>
    {open && (
      <div style={{ padding: '0 32px 24px', fontSize: '0.85rem', color: '#888', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
        {item.a}
      </div>
    )}
  </div>
);

export default SECFilingRAG;
