import React from 'react';

const PipelineStage = ({
  stage,
  index,
  currentStage,
  isAnimating,
  onAction,
  colors,
}) => {
  const isComplete = currentStage >= index;
  const isActive = currentStage === index - 1 && !isAnimating;
  const isProcessing = isAnimating && currentStage === index - 1;
  const isDisabled = isAnimating || (index > 0 && currentStage < index - 1) || currentStage >= index;

  const getButtonClasses = () => {
    const base = 'relative p-5 rounded-2xl border-2 transition-all duration-500 text-left group';
    
    if (isComplete) {
      return `${base} bg-gradient-to-br ${colors.gradient} border-transparent shadow-lg ${colors.shadow}`;
    }
    
    if (isActive) {
      return `${base} bg-slate-800/80 ${colors.border} hover:shadow-lg hover:shadow-violet-500/20 cursor-pointer backdrop-blur`;
    }
    
    return `${base} bg-slate-800/40 border-slate-700/50 opacity-40 cursor-not-allowed`;
  };

  return (
    <button
      onClick={onAction}
      disabled={isDisabled}
      className={getButtonClasses()}
      style={{ zIndex: 1 }}
    >
      {/* Glow effect for active state */}
      {isActive && (
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-20 blur-xl animate-pulse`}
        />
      )}

      {/* Processing overlay */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded-2xl backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 spinner" />
            <span className="text-xs text-violet-300 font-medium">
              Processing...
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header with icon and step counter */}
        <div className="flex items-center justify-between mb-2">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
              isComplete ? 'bg-white/20' : 'bg-slate-700'
            } transition-all`}
          >
            {isComplete ? '✓' : stage.icon}
          </div>
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              isComplete
                ? 'bg-white/20 text-white'
                : 'bg-slate-700 text-slate-400'
            }`}
          >
            {index + 1}/4
          </span>
        </div>

        {/* Label and description */}
        <h4
          className={`font-bold text-lg ${
            isComplete ? 'text-white' : 'text-slate-200'
          }`}
        >
          {stage.label}
        </h4>
        <p
          className={`text-sm ${
            isComplete ? 'text-white/70' : 'text-slate-500'
          }`}
        >
          {stage.desc}
        </p>

        {/* Call to action for active state */}
        {isActive && (
          <div className="mt-3 flex items-center gap-2 text-violet-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Click to execute →
          </div>
        )}
      </div>
    </button>
  );
};

export default PipelineStage;