import React from 'react';
import { colorMap } from '../../data/sampleData';

const DataPanel = ({
  title,
  subtitle,
  data,
  isActive,
  color,
  badge,
  showTransformed = false,
  placeholder,
  message,
  summary,
}) => {
  const colors = colorMap[color];

  const containerClasses = `rounded-2xl p-5 transition-all duration-500 backdrop-blur border ${
    isActive
      ? `${colors.bg} ${colors.border.replace('border', 'border')}`
      : 'bg-slate-800/50 border-slate-700/50'
  }`;

  const renderDataRow = (row, i) => {
    const emailInvalid = row.email?.includes('⚠️') || row.emailValid === false;
    const salaryInvalid = row.salary?.includes('⚠️') || row.salaryValid === false;

    return (
      <div
        key={i}
        className={`p-3 bg-slate-800/80 rounded-xl text-xs font-mono border border-slate-700/50 hover:border-${color}-500/30 transition-all animate-fade-in`}
        style={{ animationDelay: `${i * 150}ms` }}
      >
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">name:</span>
            <span className={`${colors.text} truncate ml-2`}>
              {showTransformed ? row.name : `"${row.name}"`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">email:</span>
            <span
              className={`truncate ml-2 ${
                emailInvalid ? 'text-red-400' : colors.text
              }`}
            >
              {showTransformed ? row.email : `"${row.email}"`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">salary:</span>
            <span
              className={
                salaryInvalid
                  ? 'text-red-400'
                  : showTransformed
                  ? 'text-emerald-400 font-medium'
                  : colors.text
              }
            >
              {showTransformed ? row.salary : `"${row.salary}"`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">status:</span>
            <span className={showTransformed ? '' : colors.text}>
              {showTransformed ? row.status : `"${row.status}"`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholder = () => (
    <div className="h-56 flex flex-col items-center justify-center text-slate-500 text-sm gap-3">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl opacity-50">
        {color === 'blue' ? '⚙️' : '🗄️'}
      </div>
      {placeholder}
    </div>
  );

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-lg ${
            isActive
              ? `bg-gradient-to-br ${colors.gradient} ${colors.shadow}`
              : 'bg-slate-700'
          }`}
        >
          {color === 'amber' ? '📁' : color === 'blue' ? '⚙️' : '🗄️'}
        </div>
        <div className="flex-1">
          <span
            className={`font-semibold ${
              isActive ? 'text-white' : 'text-slate-400'
            }`}
          >
            {title}
          </span>
          <div className="text-xs text-slate-500">{subtitle}</div>
        </div>
        {isActive && (
          <span
            className={`text-xs px-2 py-1 ${colors.bg} ${colors.text} rounded-full font-medium border ${colors.border}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Data Content */}
      {data && data.length > 0 ? (
        <div className="space-y-2 max-h-56 overflow-auto custom-scrollbar">
          {data.map((row, i) => renderDataRow(row, i))}
        </div>
      ) : (
        renderPlaceholder()
      )}

      {/* Footer Message */}
      {message && (
        <div
          className={`mt-4 p-3 ${colors.bg} rounded-xl text-xs ${colors.text.replace(
            '400',
            '300'
          )} border ${colors.border.replace('50', '20')}`}
        >
          {message}
        </div>
      )}

      {/* Summary for Load stage */}
      {summary && (
        <div
          className={`mt-4 p-3 ${colors.bg} rounded-xl text-xs border ${colors.border.replace(
            '50',
            '20'
          )} flex items-center justify-between`}
        >
          <span className="text-emerald-300">✅ {summary.loaded} records loaded</span>
          <span className="text-red-400">{summary.rejected} rejected</span>
        </div>
      )}
    </div>
  );
};

export default DataPanel;