import React from 'react';

export const PythonIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <linearGradient id="py1" x1="70" x2="17" y1="82" y2="14" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#5A9FD4"/>
      <stop offset="1" stopColor="#306998"/>
    </linearGradient>
    <linearGradient id="py2" x1="88" x2="55" y1="118" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#FFD43B"/>
      <stop offset="1" stopColor="#FFE873"/>
    </linearGradient>
    <path fill="url(#py1)" d="M63 11c-33 0-31 14-31 14v15h31v4H29S11 41 11 74s16 32 16 32h10V91s-1-16 16-16h27s15 0 15-15V33S98 11 63 11zm-17 12c3 0 5 2 5 5s-2 6-5 6-5-3-5-6 2-5 5-5z"/>
    <path fill="url(#py2)" d="M65 117c33 0 31-14 31-14v-15H65v-4h35s18 3 18-30-16-32-16-32H92v15s1 16-16 16H49s-15 0-15 15v27s-3 22 31 22zm17-12c-3 0-5-2-5-5s2-6 5-6 5 3 5 6-2 5-5 5z"/>
  </svg>
);

export const SparkIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="#E25A1C" d="M64 5L5 35v58l59 30 59-30V35L64 5zm0 10l49 25v48L64 113 15 88V40l49-25z"/>
    <circle cx="64" cy="64" r="15" fill="#E25A1C"/>
  </svg>
);

export const KafkaIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <circle cx="64" cy="64" r="50" fill="none" stroke="#231F20" strokeWidth="6"/>
    <circle cx="64" cy="40" r="10" fill="#231F20"/>
    <circle cx="44" cy="78" r="10" fill="#231F20"/>
    <circle cx="84" cy="78" r="10" fill="#231F20"/>
    <line x1="64" y1="50" x2="64" y2="64" stroke="#231F20" strokeWidth="4"/>
    <line x1="54" y1="72" x2="64" y2="64" stroke="#231F20" strokeWidth="4"/>
    <line x1="74" y1="72" x2="64" y2="64" stroke="#231F20" strokeWidth="4"/>
  </svg>
);

export const PostgreSQLIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="#336791" d="M94 22c-7-5-16-7-26-7-9 0-17 2-24 6-8 5-13 12-16 21-3 10-2 21 1 32 3 9 7 17 13 23 5 6 12 9 18 11 2 0 4-1 6-2 1-2 2-3 3-5 0-2 1-6 1-10v-3c0-3 0-5 1-6s1-1 3-2c2 0 3 0 4 0h1c4 0 6-1 8-2 3-2 4-4 5-7 1-5 1-10-2-16l-1-3-1-3c0-1 0-1 0-1 0-1 1-2 1-3l1-1c3-4 5-8 6-12 1-4 1-8-1-12z"/>
    <ellipse cx="55" cy="50" rx="8" ry="10" fill="#fff"/>
    <ellipse cx="78" cy="50" rx="8" ry="10" fill="#fff"/>
    <circle cx="55" cy="52" r="4" fill="#336791"/>
    <circle cx="78" cy="52" r="4" fill="#336791"/>
  </svg>
);

export const AWSIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="#FF9900" d="M25 82c10-6 22-9 35-9s25 3 35 9c2 1 4 0 4-2 0-1 0-2-1-3-10-6-24-10-38-10s-28 4-38 10c-1 1-1 2-1 3 0 2 2 3 4 2zm55-20c0-3-2-5-5-5H55c-3 0-5 2-5 5v25c0 3 2 5 5 5h10v-10h10c6 0 10-4 10-10v-10zm-10 10H65v-10h5c3 0 5 2 5 5v5z"/>
  </svg>
);

export const DockerIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="#2496ED" d="M125 52c-4-3-10-3-15-1-1-5-4-10-8-13l-2-1-1 2c-3 3-4 8-3 12 0 3 1 6 3 8-1 1-3 2-4 3-3 1-6 2-9 2H1l0 1c0 7 1 13 3 19l1 2c8 13 22 19 37 19 29 0 53-13 64-41 7 1 15-2 19-9l1-2-2-1zM28 39h10v10H28V39zm13 0h10v10H41V39zM28 52h10v10H28V52zm13 0h10v10H41V52zm13 0h10v10H54V52zm0-13h10v10H54V39zm-13 26h10v10H41V65zM28 65h10v10H28V65zm26 0h10v10H54V65zm13 0h10v10H67V65z"/>
  </svg>
);

export const MongoDBIcon = ({ size = 40 }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="#4FAA41" d="M90 53c-4-12-11-22-22-28l-3-4-1 1c0 2-1 3-2 4l-1 2-1-1c-12 5-20 14-25 27-2 4-3 9-3 14 0 2 0 4 1 6l1 2c4 11 12 19 23 24 3 1 7 2 10 2l3 1v-22l-1-2c-2-1-3-3-3-5 0-3 2-5 5-5s5 2 5 5c0 2-1 4-3 5l-1 2v22l3-1c13-3 24-12 29-25l1-4c1-5 1-10 0-15l-1-3c-2-7-6-13-11-18l-3-3z"/>
    <path fill="#3F9838" d="M64 93l1 28 2-1c0-9 1-18 1-27l-1-1-3 1z"/>
  </svg>
);

// Fallback icon for unknown skills
export const DefaultIcon = ({ name, size = 40 }) => (
  <div 
    className="rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold"
    style={{ width: size, height: size, fontSize: size * 0.35 }}
  >
    {name?.[0] || '?'}
  </div>
);

// Icon selector component
const iconMap = {
  'Python': PythonIcon,
  'Apache Spark': SparkIcon,
  'Kafka': KafkaIcon,
  'PostgreSQL': PostgreSQLIcon,
  'AWS': AWSIcon,
  'Docker': DockerIcon,
  'MongoDB': MongoDBIcon,
};

export const SkillIcon = ({ name, size = 40 }) => {
  const IconComponent = iconMap[name];
  
  if (IconComponent) {
    return <IconComponent size={size} />;
  }
  
  return <DefaultIcon name={name} size={size} />;
};

export default SkillIcon;