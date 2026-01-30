// Playground.jsx
import React from 'react';
import ETLSimulator from '../playground/ETLSimulator';

const Playground = ({ sectionClass }) => {
  return (
    <section id="playground" className="py-16 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${sectionClass || ''}`}>
          <span className="text-violet-400 font-medium">Interactive</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Data Playground
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Experience data engineering concepts hands on. Click, interact, and learn!
          </p>
        </div>

        <div className={`glass-card p-6 md:p-8 ${sectionClass || ''}`}>
          <ETLSimulator />
        </div>
      </div>
    </section>
  );
};

export default Playground;