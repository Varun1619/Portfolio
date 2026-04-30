export const projects = [
  {
    id: 'foodlens',
    num: '01',
    name: 'FoodLens — Food Inspection Analytics',
    tagline: 'End-to-end Medallion pipeline processing 387K inspection records across Chicago and Dallas, from raw CSV to interactive Power BI dashboards on Databricks.',
    desc: 'End-to-end Medallion Architecture pipeline on Databricks processing 387K+ inspections across Chicago & Dallas. Star schema with SCD Type 2, 1.3M+ violation records, and Power BI dashboards.',
    stack: ['Databricks', 'PySpark', 'Delta Lake', 'DQX', 'Power BI', 'Navicat', 'Git', 'Python'],
    tags: ['Data Engineering', 'Business Intelligence'],
    course: 'DAMG 7370 · Northeastern',
    date: 'Spring 2026',
    video: '/videos/foodlens.mp4',
    github: 'https://github.com/Varun1619/foodlens-data-engineering',

    metrics: [
      { label: 'Chicago inspections', value: '308,161', color: '#00e87b' },
      { label: 'Dallas inspections', value: '78,984', color: '#00e87b' },
      { label: 'Fact violations', value: '1,332,652', color: '#f0f0f0' },
      { label: 'Gold layer tables', value: '9', color: '#f5a623' },
    ],

    pipeline: [
      { layer: 'BRONZE', label: 'Ingestion', sub: 'Raw CSVs → Delta', color: '#f5a623' },
      { layer: 'SILVER', label: 'Cleansing', sub: 'DQX validation', color: '#c8c8c8' },
      { layer: 'GOLD', label: 'Star Schema', sub: '7 dims + 2 facts', color: '#00e87b' },
      { layer: 'BI', label: 'Power BI', sub: '3 dashboard pages', color: '#4fc3f7' },
    ],

    overview: 'Builds a complete data engineering and analytics pipeline on Databricks using the Medallion Architecture (Bronze → Silver → Gold) over food inspection datasets from two cities. Chicago contributed 308,161 inspections (2010–2026) and Dallas contributed 78,984 inspections (2016–2024). The pipeline covers ingestion, DQX profiling, cleansing, dimensional modeling, and Power BI dashboards.',

    notebooks: [
      {
        num: '01',
        title: 'Bronze — Ingestion',
        file: '01_Bronze_Ingestion.ipynb',
        bullets: [
          'Reads Chicago and Dallas raw CSVs from Databricks Volumes',
          'Adds metadata columns: _source_file, _load_timestamp, _source_city',
          'Writes to Bronze Delta tables with column mapping enabled',
        ],
      },
      {
        num: '02',
        title: 'DQX — Profiling',
        file: '02_DQX_Profiling.ipynb',
        bullets: [
          'Uses DQProfiler and dbutils.data.summarize for full profiling',
          'Null analysis, distribution analysis, schema comparison',
          'Documents data quality findings across both city datasets',
        ],
      },
      {
        num: '03',
        title: 'Bronze → Silver',
        file: '03_Bronze_Silver.ipynb',
        bullets: [
          'Parses Chicago violation strings (pipe-delimited) into structured fields',
          'Unpivots Dallas 25 violation slots into long format',
          'Derives Chicago violation scores from inspection results',
          'Generates SHA2 inspection_id for Dallas (no natural key)',
          'Applies all DQX validation rules — bad rows dropped to quarantine',
          'Trims Dallas violations to top 3 for inspections with score ≥ 90',
          'Writes 4 Silver tables + quarantine tables',
        ],
      },
      {
        num: '04',
        title: 'Silver → Gold',
        file: '04_Silver_to_Gold.ipynb',
        bullets: [
          'Builds full star schema dimensional model',
          'Implements SCD Type 2 on dim_establishment via Delta Lake MERGE',
          'Loads fact_inspection and fact_inspection_violation',
          'Validates referential integrity — 0 orphans across all FK relationships',
        ],
      },
    ],

    dimensions: [
      { table: 'dim_date', desc: 'Calendar dimension (2000–2031)', rows: '11,688' },
      { table: 'dim_location', desc: 'Address, city, state, zip, lat/long', rows: '36,947' },
      { table: 'dim_inspection_type', desc: 'Inspection type names per city', rows: '64' },
      { table: 'dim_result', desc: 'Inspection results / score buckets', rows: '10' },
      { table: 'dim_risk_category', desc: 'Risk levels (Chicago only)', rows: '3' },
      { table: 'dim_violation', desc: 'Unified violation codes and descriptions', rows: '116' },
      { table: 'dim_establishment', desc: 'Business info with SCD Type 2', rows: '44,497' },
    ],

    facts: [
      { table: 'fact_inspection', desc: 'One row per inspection (both cities)', rows: '294,164' },
      { table: 'fact_inspection_violation', desc: 'Bridge table — inspections to violations', rows: '1,332,652' },
    ],

    validationRules: [
      { rule: 'Restaurant Name not null', city: 'Both', level: 'error' },
      { rule: 'Inspection Date not null', city: 'Both', level: 'error' },
      { rule: 'Inspection Type not null', city: 'Both', level: 'error' },
      { rule: 'Zip Code not null', city: 'Both', level: 'error' },
      { rule: 'Zip Code valid format', city: 'Both', level: 'error' },
      { rule: 'Chicago Results not null', city: 'Chicago', level: 'error' },
      { rule: 'Dallas score ≤ 100', city: 'Dallas', level: 'error' },
      { rule: 'Dallas score ≥ 0', city: 'Dallas', level: 'error' },
      { rule: 'At least 1 violation per inspection', city: 'Both', level: 'error' },
      { rule: 'Pass result cannot have Urgent/Critical violations', city: 'Both', level: 'error' },
      { rule: 'Score ≥ 90 → max 3 violations (trimmed, not dropped)', city: 'Dallas', level: 'transform' },
    ],

    scoreDerivation: [
      { result: 'Pass', score: '90' },
      { result: 'Pass w/ Conditions', score: '80' },
      { result: 'Fail', score: '70' },
      { result: 'No Entry', score: '0' },
      { result: 'All other types', score: 'NULL' },
    ],

    engineeringDecisions: [
      {
        title: 'SCD Type 2 on establishments',
        body: 'Implemented manually via Delta Lake MERGE, hashing tracked columns (name, type, risk) to detect changes and expire old records with eff_end_date.',
      },
      {
        title: 'Synthetic ID generation for Dallas',
        body: 'Dallas had no natural inspection ID. Generated stable SHA-256 keys from restaurant name, date, score, type, and address — deterministic across pipeline runs.',
      },
      {
        title: 'Chicago violation string parsing',
        body: 'Each Chicago row packed all violations into one pipe-delimited string. Used regex to extract violation code, description, and comment from each segment.',
      },
      {
        title: 'Cross-city schema harmonization',
        body: 'Chicago uses text outcomes (Pass/Fail); Dallas uses numeric scores. Built dim_result to unify both into a single model with a derived_score bridge column.',
      },
    ],

    toolsTable: [
      { tool: 'Databricks (Free Edition)', purpose: 'Data processing, notebooks, Delta Lake' },
      { tool: 'Databricks DQX', purpose: 'Data quality profiling and validation' },
      { tool: 'PySpark', purpose: 'Data transformations' },
      { tool: 'Delta Lake', purpose: 'Storage format for all layers' },
      { tool: 'Navicat', purpose: 'ER diagram and dimensional modeling' },
      { tool: 'Power BI', purpose: 'BI dashboards and visualizations' },
      { tool: 'Git / GitHub', purpose: 'Version control' },
    ],

    schemas: [
      { layer: 'Bronze', schema: 'workspace.foodlens_bronze' },
      { layer: 'Silver', schema: 'workspace.foodlens_silver' },
      { layer: 'Gold', schema: 'workspace.foodlens_gold' },
    ],

    deliverables: [
      'Data profiling with DQX documentation',
      'Dimensional model (ER diagram via Navicat)',
      'Source-to-Target mapping document',
      'Bronze → Silver → Gold pipeline notebooks',
      'SCD Type 2 on dim_establishment',
      'BI Dashboard (Power BI)',
      'Git repository with all code',
    ],
  },
  {
    id: 'revenue-analytics',
    num: '02',
    name: 'Revenue Analytics Data Platform',
    tagline: 'Scalable cloud analytics platform ingesting engagement metrics from multiple REST APIs, supporting batch and near real-time queries with dimensional data models.',
    desc: 'Scalable cloud analytics platform ingesting engagement metrics from multiple REST APIs, supporting batch and near real time queries with dimensional data models.',
    stack: ['SQL', 'Spark', 'MongoDB', 'Data Modeling'],
    tags: ['Data Engineering', 'Analytics'],
    video: null,
    github: null,
    metrics: [],
    pipeline: [],
    overview: 'Scalable cloud analytics platform ingesting engagement metrics from multiple REST APIs, supporting batch and near real-time queries with dimensional data models.',
    engineeringDecisions: [],
  },
  {
    id: 'ai-doc-assistant',
    num: '03',
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
    num: '04',
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
