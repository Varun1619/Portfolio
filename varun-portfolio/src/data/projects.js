export const projects = [
  {
    id: 'foodlens',
    num: '01',
    name: 'FoodLens — Food Inspection Analytics',
    tagline: 'Medallion pipeline processing 387K food inspection records from Chicago and Dallas, validated through DQX, modelled into a star schema, and served to Power BI.',
    desc: 'End-to-end Medallion Architecture pipeline on Databricks processing 387K+ inspections across Chicago & Dallas. Star schema with SCD Type 2, 1.3M+ violation records, and Power BI dashboards.',
    stack: ['Databricks', 'PySpark', 'Delta Lake', 'DQX', 'Power BI', 'Navicat', 'Git', 'Python'],
    tags: ['Data Engineering', 'Business Intelligence'],
    course: 'DAMG 7370 · Northeastern',
    date: 'Spring 2026',
    video: '/videos/foodlens.mp4',
    github: 'https://github.com/Varun1619/foodlens-data-engineering',
    metrics: [
      { label: 'Chicago inspections', value: '308,431', color: '#00e87b' },
      { label: 'Dallas inspections', value: '78,984', color: '#00e87b' },
      { label: 'Violations processed', value: '1.3M', color: '#f0f0f0' },
      { label: 'Gold tables', value: '9', color: '#f5a623' },
    ],

    pipeline: [
      { layer: 'BRONZE', label: 'Ingestion', sub: 'Raw CSVs → Delta', color: '#f5a623' },
      { layer: 'SILVER', label: 'Cleansing', sub: 'DQX · 17 rules', color: '#c8c8c8' },
      { layer: 'GOLD', label: 'Star Schema', sub: '7 dims + 2 facts', color: '#00e87b' },
      { layer: 'BI', label: 'Power BI', sub: 'Overview · Analysis · Report', color: '#4fc3f7' },
    ],

    overview: 'Medallion pipeline on Databricks processing 387K food inspection records from Chicago and Dallas, validated through DQX, modelled into a star schema, and served to Power BI.',

    architectureDesc: 'Four notebooks move data from raw CSVs through Bronze (raw Delta), Silver (validated and cleansed), and Gold (star schema) into Power BI. Each layer writes to its own Unity Catalog schema. Bad rows don\'t disappear — they go to quarantine tables with a full audit trail of which rules they failed.',

    dimensionalModelDesc: 'Star schema with fact_inspection at the center (one row per inspection, 294K rows) connected to 7 dimensions. fact_inspection_violation is a bridge table handling the many-to-many between inspections and violations. Chicago uses text results (Pass/Fail), Dallas uses numeric scores — dim_result unifies both with a derived_score column.',

    notebooks: [
      {
        num: '01',
        title: 'Bronze Ingestion',
        file: '01_Bronze_Ingestion.ipynb',
        bullets: [
          'Reads both CSVs with multiLine/escape options for embedded commas.',
          'Adds three metadata columns for lineage: _source_file, _load_timestamp, _source_city.',
          'Writes to Delta with column mapping enabled — Chicago has names like "License #" and "DBA Name" that Delta rejects by default.',
          'Full overwrite each run since the source is static.',
        ],
      },
      {
        num: '02',
        title: 'DQX Profiling',
        file: '02_DQX_Profiling.ipynb',
        bullets: [
          'Profiles both Bronze tables before writing any transformation.',
          'Runs DQX profiler, full-dataset null analysis, column distributions, violation structure analysis, and schema comparison.',
          'Found the casing mess in Chicago\'s City column, negative scores in Dallas, the 25 wide violation slots decaying from 92% to 0.01% fill rate, and a column name typo with a double space.',
        ],
      },
      {
        num: '03',
        title: 'Bronze to Silver',
        file: '03_Bronze_Silver.ipynb',
        bullets: [
          'Parses Chicago\'s pipe-delimited violation strings via regex.',
          'Unpivots Dallas\'s 25 slots using SQL UNION ALL — PySpark\'s reduce(DataFrame.unionByName) throws a _jdf JVM error on serverless compute.',
          'Generates SHA-256 inspection IDs for Dallas (no natural key). An earlier 16-char truncation had 118 collisions; full 64-char hash has zero.',
          'Derives Chicago scores from text results: Pass = 90, Fail = 70, Pass w/ Conditions = 80, No Entry = 0.',
          'Runs 17 DQX rules, quarantines bad rows with _errors column, deduplicates violations by content, trims Dallas to 3 violations for score ≥ 90.',
          'Writes 6 Silver tables.',
        ],
      },
      {
        num: '04',
        title: 'Silver to Gold',
        file: '04_Silver_to_Gold.ipynb',
        bullets: [
          'Builds 7 dimensions and 2 fact tables.',
          'Implements SCD Type 2 on dim_establishment with SHA-256 row hashing for change detection — old records expire with eff_end_date, new versions insert with is_current = Y.',
          'Validates referential integrity at the end — 0 orphan FKs.',
          'fact_inspection joins all 7 dimensions via surrogate keys; dim_risk_category is left null for Dallas rows since Dallas has no risk classification.',
        ],
      },
    ],

    dimensions: [
      { table: 'dim_establishment', desc: 'Business info. SCD Type 2 with row_hash change detection.', rows: '44,497' },
      { table: 'dim_date', desc: 'Calendar table, 2000 to 2031.', rows: '11,688' },
      { table: 'dim_location', desc: 'Addresses with lat/long from both cities.', rows: '36,947' },
      { table: 'dim_violation', desc: 'Unique violation codes and descriptions.', rows: '116' },
      { table: 'dim_inspection_type', desc: 'Canvass, Routine, Complaint, etc.', rows: '64' },
      { table: 'dim_result', desc: 'Chicago text results + Dallas score bands.', rows: '10' },
      { table: 'dim_risk_category', desc: 'Risk 1 / 2 / 3. Chicago only.', rows: '3' },
    ],

    facts: [
      { table: 'fact_inspection', desc: 'One row per inspection. FKs to all 7 dims.', rows: '294,164' },
      { table: 'fact_inspection_violation', desc: 'Bridge table. violation_points, is_critical.', rows: '1,332,652' },
    ],

    validationRules: [
      { rule: 'restaurant_name_not_null', city: 'Both', action: 'drop' },
      { rule: 'inspection_date_not_null', city: 'Both', action: 'drop' },
      { rule: 'inspection_type_not_null', city: 'Both', action: 'drop' },
      { rule: 'zip_not_null + zip_valid_format', city: 'Both', action: 'drop' },
      { rule: 'results_not_null', city: 'Chicago', action: 'drop' },
      { rule: 'score_not_over_100 + score_not_negative', city: 'Dallas', action: 'drop' },
      { rule: 'has_at_least_1_violation', city: 'Both', action: 'drop' },
      { rule: 'pass_no_urgent_critical', city: 'Both', action: 'drop' },
      { rule: 'score_90_max_3_violations', city: 'Dallas', action: 'trim' },
    ],

    engineeringDecisions: [
      {
        title: 'SCD2 on establishments',
        body: 'Restaurants rename themselves, change facility types, get reclassified. dim_establishment tracks changes by hashing tracked columns on each run. Old records expire with eff_end_date; new versions insert with is_current = Y.',
      },
      {
        title: 'Synthetic inspection IDs for Dallas',
        body: 'Dallas had no natural key. SHA-256 hashes from 5 fields (name, date, score, type, address) — full 64-character hash, zero collisions. An earlier version truncated to 16 characters and had 118 duplicates.',
      },
      {
        title: 'DQX over manual filters',
        body: 'DQX gives named rules, criticality levels, quarantine tables, and an _errors column on every bad row. Manual .filter() chains drop rows silently. When someone asks "where did those 86K rows go?" I can query quarantine_chicago and show exactly which rules each one failed.',
      },
      {
        title: 'SQL UNION ALL for Dallas unpivot',
        body: "PySpark's reduce(DataFrame.unionByName) throws a _jdf JVM error on serverless compute. SQL UNION ALL runs through Spark SQL instead of the JVM directly — works on serverless without issues.",
      },
      {
        title: 'Cross-city schema harmonization',
        body: 'Chicago says Pass or Fail. Dallas gives a number between 0 and 100. dim_result maps both into one dimension so the dashboard can filter by result across cities with a single slicer. Chicago scores are derived: Pass = 90, Fail = 70, Pass w/ Conditions = 80, No Entry = 0.',
      },
    ],
  },
  {
    id: 'chinook',
    num: '02',
    name: 'Chinook Data Pipeline',
    tagline: 'End-to-end metadata-driven pipeline over the Chinook music store dataset — Raw Parquet through Bronze, Silver, and Gold Delta layers on Databricks, fully orchestrated via Databricks Workflows.',
    desc: 'End-to-end metadata-driven pipeline over the Chinook music store dataset — Raw Parquet through Bronze, Silver, and Gold Delta layers on Databricks, fully orchestrated via Databricks Workflows.',
    stack: ['Databricks', 'PySpark', 'Delta Lake', 'Databricks DQX', 'Databricks Workflows', 'Unity Catalog', 'Azure SQL'],
    tags: ['Data Engineering'],
    course: 'INFO 7374 · Northeastern',
    date: 'Spring 2026',
    video: '/videos/chinook.mp4',
    github: null,

    metrics: [
      { label: 'Source tables', value: '11', color: '#00e87b' },
      { label: 'Gold dims', value: '7', color: '#00e87b' },
      { label: 'Fact tables', value: '2', color: '#f0f0f0' },
      { label: 'Notebooks', value: '5', color: '#4fc3f7' },
    ],

    pipeline: [
      { layer: 'RAW', label: 'Extract', sub: 'Parquet in Volume with dated paths', color: '#f0f0f0' },
      { layer: 'BRONZE', label: 'Load Raw', sub: 'Delta tables, exact copy, overwrite per run', color: '#f5a623' },
      { layer: 'SILVER', label: 'Cleansing', sub: 'DQX validation, nulls handled, quarantine', color: '#c8c8c8' },
      { layer: 'GOLD', label: 'Dimensional', sub: '7 SCD1 dims + 1 SCD2 + 2 facts', color: '#00e87b' },
      { layer: 'ORCH', label: 'Workflows', sub: 'Execution log + Databricks Workflows', color: '#4fc3f7' },
    ],

    overview: 'End-to-end metadata-driven pipeline over the Chinook music store dataset. The pipeline reads from Azure SQL via Connection Manager, stages Parquet files in Databricks Volumes with dated paths, loads Bronze Delta tables, applies DQX profiling and quarantine logic through Silver, and builds a fully typed Gold dimensional model orchestrated via Databricks Workflows.',

    notebooks: [
      {
        num: '01',
        title: 'extract_from_source',
        file: 'extract_from_source.ipynb',
        bullets: [
          'Reads pipeline_control to discover active tables',
          'Loops over tables and extracts via Connection Manager from Azure SQL',
          'Writes raw Parquet files to Databricks Volume with dated paths',
        ],
      },
      {
        num: '02',
        title: 'load_raw',
        file: 'load_raw.ipynb',
        bullets: [
          'Writes Parquet to Volume with dated paths',
          'Logs row counts and load status to execution_log',
        ],
      },
      {
        num: '03',
        title: 'raw_to_bronze',
        file: 'raw_to_bronze.ipynb',
        bullets: [
          'Reads the latest successful path from execution_log',
          'Writes Delta to Bronze with overwrite mode',
        ],
      },
      {
        num: '04',
        title: 'bronze_to_silver',
        file: 'bronze_to_silver.ipynb',
        bullets: [
          'DQX profiling on nulls, duplicates, and ranges',
          'Bad rows drop to quarantine, clean rows promoted to Silver',
        ],
      },
      {
        num: '05',
        title: 'silver_to_gold',
        file: 'silver_to_gold.ipynb',
        bullets: [
          'Builds 7 dims with SCD Type 1 (artist, album, genre, media_type, employee, track)',
          'dim_customer with SCD Type 2',
          'fact_sales (invoiceline + invoice + dim_customer)',
          'fact_sales_customer_agg (aggregate from gold.fact_sales)',
        ],
      },
    ],

    goldTables: [
      { table: 'dim_artist', scd: 'SCD1', source: 'silver.artist' },
      { table: 'dim_album', scd: 'SCD1', source: 'silver.album' },
      { table: 'dim_genre', scd: 'SCD1', source: 'silver.genre' },
      { table: 'dim_media_type', scd: 'SCD1', source: 'silver.mediatype' },
      { table: 'dim_employee', scd: 'SCD1', source: 'silver.employee' },
      { table: 'dim_track', scd: 'SCD1', source: 'silver.track' },
      { table: 'dim_customer', scd: 'SCD2', source: 'silver.customer' },
      { table: 'fact_sales', scd: 'Fact', source: 'invoiceline + invoice + dim_customer' },
      { table: 'fact_sales_customer_agg', scd: 'Aggregate', source: 'gold.fact_sales' },
    ],

    contributors: [
      { initials: 'VS', name: 'Varun Singh', role: 'Gold layer, mapping document, job orchestration' },
      { initials: 'KT', name: 'Krupali Tejani', role: 'Raw → Bronze → Silver, DQX validation' },
      { initials: 'AG', name: 'Akshay Govind', role: 'Environment setup, metadata tables, extract notebook' },
    ],

    engineeringDecisions: [],
  },
  {
    id: 'crypto-pulse',
    num: '03',
    name: 'Crypto Pulse',
    tagline: 'Real-time BTC/USDT trading dashboard — live Binance WebSocket feed through Kafka into DuckDB, surfaced on a Streamlit dashboard refreshing every 2 seconds.',
    desc: 'Real-time BTC/USDT pipeline: Binance WebSocket → Kafka → DuckDB → Streamlit dashboard with candlesticks, VWAP, and 3 moving averages refreshing every 2 seconds.',
    stack: ['Python', 'Apache Kafka', 'DuckDB', 'Streamlit', 'Plotly', 'Docker Compose'],
    tags: ['Data Engineering', 'Real-Time'],
    date: '2026',
    video: '/videos/crypto-pulse.mp4',
    github: 'https://github.com/Varun1619/crypto-pulse',

    metrics: [
      { label: 'Feed speed', value: '5–30 msg/s', color: '#00e87b' },
      { label: 'Dashboard refresh', value: 'Every 2s', color: '#4fc3f7' },
      { label: 'Moving averages', value: '3 (5/20/50)', color: '#f0f0f0' },
      { label: 'Candle interval', value: '15 seconds', color: '#f5a623' },
    ],

    pipeline: [
      { layer: 'SOURCE', label: 'Binance WS', sub: 'Live BTC/USDT public feed', color: '#f5a623' },
      { layer: 'QUEUE', label: 'Kafka', sub: 'Producer → topic → consumer', color: '#4fc3f7' },
      { layer: 'STORE', label: 'DuckDB', sub: 'Write-and-release lock', color: '#00e87b' },
      { layer: 'SERVE', label: 'Streamlit', sub: 'Candlestick + VWAP + MAs', color: '#a78bfa' },
    ],

    overview: "Crypto Pulse is a real-time data pipeline that tracks live BTC/USDT trades and surfaces them on a trading dashboard that updates every 2 seconds. Binance's public WebSocket stream pushes trade events at roughly 5 to 30 messages per second — no API key, no rate limits, just a raw JSON feed anyone can connect to. Each stage is a separate process: if the dashboard crashes, the consumer keeps writing; if the consumer restarts, Kafka holds the messages until it catches up. That separation is the point.",

    architectureNotes: [
      {
        title: 'Why Kafka for something this small',
        body: "Kafka is overkill for one trading pair. But the architecture question was: what happens when this isn't small? With 10 trading pairs, 3 consumers doing different things with the same feed, and one of them down for 20 minutes — direct writes fall apart immediately. Kafka persists messages to disk with configurable retention, tracks each consumer's offset independently, and lets a restarted consumer pick up exactly where it left off.",
      },
      {
        title: 'Why kafka-python and not Faust or Spark Streaming',
        body: "The processing here is dead simple: parse five fields, insert a row. The overhead of a Spark cluster or an async Faust application for a parse + insert loop would have been genuinely silly. kafka-python is the right tool for the scope.",
      },
      {
        title: 'Why DuckDB over SQLite or PostgreSQL',
        body: "Every query on this dashboard is an aggregation — average price over a rolling window, OHLCV per 15-second bucket, moving averages via window functions. SQLite is row-oriented: it reads every column to compute aggregates. DuckDB is column-oriented, so SELECT AVG(price) reads only the price column off disk. time_bucket() and arg_max() are also DuckDB-native aggregates that would need to be emulated in SQLite.",
      },
    ],

    sqlHighlights: [
      {
        title: 'OHLCV Candlestick Query',
        description: "time_bucket rounds each timestamp to the nearest 15-second boundary. arg_min(price, trade_time) returns the price at the earliest row within the group — the open. arg_max gives the close. Neither exists in standard SQL; they're DuckDB-specific aggregates.",
        code: `SELECT
    time_bucket(INTERVAL '15 seconds', trade_time) AS bucket,
    arg_min(price, trade_time)                      AS open,
    max(price)                                      AS high,
    min(price)                                      AS low,
    arg_max(price, trade_time)                      AS close,
    sum(quantity)                                   AS volume
FROM trades
WHERE trade_time >= CURRENT_TIMESTAMP - INTERVAL '300 seconds'
GROUP BY bucket
ORDER BY bucket`,
      },
      {
        title: 'Sliding Window Moving Averages',
        description: 'For each row, average the current price and the N rows before it. No GROUP BY, no subquery, no self-join. The first few rows get averaged over fewer points since there is no preceding history — expected behavior for MAs at the start of a dataset.',
        code: `avg(price) OVER (
    ORDER BY trade_time
    ROWS BETWEEN 5 PRECEDING AND CURRENT ROW
) AS ma_fast`,
      },
      {
        title: 'VWAP Calculation',
        description: 'Simple average weights every trade equally — a 0.001 BTC trade and a 2 BTC trade both contribute the same amount. VWAP weights by quantity, so large trades pull the average proportionally. If price sits above VWAP, buyers have been more aggressive than sellers during the session.',
        code: `SUM(price * quantity) / SUM(quantity) AS vwap`,
      },
    ],

    engineeringDecisions: [
      {
        title: 'The Windows file lock bug',
        body: "DuckDB uses an exclusive write lock on the .duckdb file. On Linux and Mac, file locks are advisory. On Windows they're mandatory — the kernel enforces them. The original consumer held a persistent connection from startup, so the dashboard crashed immediately with 'file in use'. The fix: open a connection, insert the row, close it. Every message. The lock is held for ~2ms. The dashboard connects in the gap.",
      },
      {
        title: 'Retry logic for Windows Defender',
        body: "Windows Defender sometimes scans newly written files before releasing them, extending the effective lock window unpredictably. Added 8 retries at 150ms spacing in both writer and reader. In practice the retries almost never trigger, but without them the dashboard would occasionally freeze on startup. This is the kind of thing that doesn't show up in tutorials because most tutorials run on Mac.",
      },
      {
        title: 'Mock pipeline for development',
        body: 'Running the full pipeline to test a dashboard change requires Docker, 15 seconds for Kafka to become healthy, two other terminal processes, then the dashboard — for a CSS tweak. mock_pipeline.py is a random walk price generator that writes directly to DuckDB with no Kafka or Docker. One terminal, realistic trade pacing. It\'s also what makes the Streamlit Cloud deploy work since a cloud deployment can\'t reach a local Kafka broker.',
      },
      {
        title: 'What to improve next',
        body: 'The consumer opens and closes a DuckDB connection per message — 20 cycles/second on a 20 msg/s feed. The better solution: buffer 50 messages in memory, batch-insert, close. The dashboard also re-runs the entire Python script on each 2s refresh. For a 150-line script this is imperceptible, but a proper async update model would be worth it at scale.',
      },
    ],
  },
  {
    id: 'ai-doc-assistant',
    num: '04',
    name: 'AI Document Assistant',
    tagline: 'GenAI-powered RAG system achieving 90% relevance accuracy over custom document collections with optimized retrieval and evaluation metrics.',
    desc: 'GenAI powered RAG system achieving 90% relevance accuracy over custom document collections with optimized retrieval and evaluation metrics.',
    stack: ['Python', 'LangChain', 'OpenAI', 'ChromaDB', 'RAG'],
    tags: ['AI/ML', 'GenAI'],
    video: null,
    github: null,
    metrics: [],
    pipeline: [],
    overview: 'GenAI-powered RAG system achieving 90% relevance accuracy over custom document collections with optimized retrieval and evaluation metrics.',
    engineeringDecisions: [],
  },
  {
    id: 'object-detection',
    num: '05',
    name: 'Object & Distance Detection',
    tagline: 'Assistive system for visually impaired using SSD with 98% detection accuracy. Published research findings in IRJMETS.',
    desc: 'Assistive system for visually impaired using SSD with 98% detection accuracy. Published research findings in IRJMETS.',
    stack: ['Python', 'OpenCV', 'SSD', 'ML'],
    tags: ['Computer Vision', 'ML'],
    video: null,
    github: null,
    metrics: [],
    pipeline: [],
    overview: 'Assistive system for visually impaired using SSD with 98% detection accuracy. Published research findings in IRJMETS.',
    engineeringDecisions: [],
  },
];
