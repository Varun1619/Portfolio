import React from 'react';
import ETLSimulator from '../playground/ETLSimulator';

const Playground = ({ sectionClass }) => {
  return (
    <section
      id="playground"
      className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${sectionClass}`}>
          <span className="text-violet-600 font-medium">Interactive</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2">
            Data{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Playground
            </span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Experience data engineering concepts hands on. Click, interact, and
            learn!
          </p>
        </div>

        <div className={sectionClass}>
          <ETLSimulator />
        </div>
      </div>
    </section>
  );
};

export default Playground;