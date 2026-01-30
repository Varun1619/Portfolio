import React from 'react';
import { useETLPipeline } from '../../hooks';
import { pipelineStages, colorMap } from '../../data/sampleData';
import PipelineStage from './PipelineStage';
import DataPanel from './DataPanel';

const ETLSimulator = () => {
  const {
    pipelineStage,
    extractedData,
    transformedData,
    loadedData,
    isAnimating,
    handleExtract,
    handleTransform,
    handleLoad,
    resetPipeline,
    rawData,
  } = useETLPipeline();

  // Map stage to action handlers
  const stageActions = [null, handleExtract, handleTransform, handleLoad];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-8 overflow-hidden relative">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 grid-pattern" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg shadow-lg shadow-violet-500/30">
                🔄
              </span>
              ETL Pipeline Simulator
            </h3>
            <p className="text-sm text-slate-400 mt-1 ml-13">
              Watch data flow through each transformation stage
            </p>
          </div>
          <button
            onClick={resetPipeline}
            className="px-5 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 backdrop-blur rounded-xl text-sm font-medium text-slate-300 transition-all border border-slate-600 hover:border-slate-500 flex items-center gap-2"
          >
            ↺ Reset Pipeline
          </button>
        </div>

        {/* Pipeline Stages */}
        <div className="grid grid-cols-4 gap-4 mb-8 relative">
          {/* Connection Lines */}
          <svg
            className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 pointer-events-none hidden lg:block"
            style={{ zIndex: 0 }}
          >
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <line
                  x1={`${12.5 + i * 25}%`}
                  y1="50%"
                  x2={`${37.5 + i * 25}%`}
                  y2="50%"
                  stroke={pipelineStage > i ? '#8b5cf6' : '#334155'}
                  strokeWidth="3"
                  strokeDasharray={pipelineStage > i ? '0' : '8 4'}
                  className="transition-all duration-500"
                />
              </g>
            ))}
          </svg>

          {/* Stage Cards */}
          {pipelineStages.map((stage, i) => (
            <PipelineStage
              key={i}
              stage={stage}
              index={i}
              currentStage={pipelineStage}
              isAnimating={isAnimating}
              onAction={stageActions[i]}
              colors={colorMap[stage.color]}
            />
          ))}
        </div>

        {/* Data Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DataPanel
            title={pipelineStage >= 1 ? 'Extracted Data' : 'Source Data'}
            subtitle="4 records"
            data={pipelineStage >= 1 ? extractedData : rawData}
            isActive={pipelineStage >= 0}
            color="amber"
            badge="Raw"
            message={
              pipelineStage === 0
                ? '⚠️ Issues: Inconsistent casing, whitespace, invalid emails'
                : null
            }
          />

          <DataPanel
            title="Transformed Data"
            subtitle={
              pipelineStage >= 2
                ? '4 records processed'
                : 'Awaiting data'
            }
            data={transformedData}
            isActive={pipelineStage >= 2}
            color="blue"
            badge="Cleaned"
            showTransformed
            placeholder={
              pipelineStage === 1
                ? 'Waiting for Transform →'
                : 'Awaiting extraction...'
            }
            message={
              pipelineStage >= 2
                ? '✨ Applied: Trim, fix casing, validate emails, format currency'
                : null
            }
          />

          <DataPanel
            title="Data Warehouse"
            subtitle={
              pipelineStage >= 3
                ? `${loadedData.length} valid records`
                : 'Ready to receive'
            }
            data={loadedData}
            isActive={pipelineStage >= 3}
            color="green"
            badge="Loaded"
            placeholder={
              pipelineStage === 2
                ? 'Ready to Load →'
                : 'Awaiting transformation...'
            }
            summary={
              pipelineStage >= 3
                ? {
                    loaded: loadedData.length,
                    rejected: transformedData.length - loadedData.length,
                  }
                : null
            }
          />
        </div>

        {/* Completion Message */}
        {pipelineStage >= 3 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl border border-violet-500/30 text-center animate-fade-in">
            <div className="text-2xl mb-2">🎉</div>
            <h4 className="text-white font-bold">Pipeline Complete!</h4>
            <p className="text-violet-300 text-sm">
              Successfully extracted, transformed, and loaded {loadedData.length}{' '}
              clean records
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ETLSimulator;