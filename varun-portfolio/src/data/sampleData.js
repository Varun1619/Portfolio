export const rawSourceData = [
  {
    id: 1,
    name: '  John DOE  ',
    email: 'JOHN@EMAIL.COM',
    salary: '50000',
    date: '2024/01/15',
    status: 'active',
  },
  {
    id: 2,
    name: 'jane smith',
    email: 'jane@email',
    salary: 'N/A',
    date: '15-01-2024',
    status: 'ACTIVE',
  },
  {
    id: 3,
    name: 'BOB_Wilson',
    email: 'bob@company.com',
    salary: '75000',
    date: '2024-01-15',
    status: 'Active',
  },
  {
    id: 4,
    name: '  ALICE   brown',
    email: 'alice@test.org',
    salary: '62000',
    date: '01/15/2024',
    status: 'inactive',
  },
];

export const pipelineStages = [
  {
    stage: 0,
    label: 'Source',
    icon: '📁',
    desc: 'Raw messy data',
    color: 'amber',
  },
  {
    stage: 1,
    label: 'Extract',
    icon: '📥',
    desc: 'Pull from source',
    color: 'orange',
  },
  {
    stage: 2,
    label: 'Transform',
    icon: '⚙️',
    desc: 'Clean & validate',
    color: 'blue',
  },
  {
    stage: 3,
    label: 'Load',
    icon: '📤',
    desc: 'Store clean data',
    color: 'green',
  },
];

export const colorMap = {
  amber: {
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/30',
    border: 'border-amber-500/50',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
  },
  orange: {
    gradient: 'from-orange-500 to-red-500',
    shadow: 'shadow-orange-500/30',
    border: 'border-orange-500/50',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
  },
  blue: {
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/30',
    border: 'border-blue-500/50',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
  green: {
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/30',
    border: 'border-emerald-500/50',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
  },
};