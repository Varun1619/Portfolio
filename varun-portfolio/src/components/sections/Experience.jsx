import React from 'react';
import { experiences } from '../../data/experiences';

const Experience = ({ sectionClass }) => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 ${sectionClass}`}>
          <span className="text-violet-600 font-medium">Journey</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2">
            Work{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-400 via-indigo-400 to-purple-400 md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } ${sectionClass}`}
            >
              <div
                className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 -translate-x-1/2 z-10 shadow-lg"
                style={{ borderColor: exp.color }}
              />

              <div
                className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                }`}
              >
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${exp.color}20`,
                      color: exp.color,
                    }}
                  >
                    {exp.type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-2 group-hover:text-violet-600 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-slate-500 font-medium">{exp.company}</p>
                  <p className="text-sm text-slate-400 mb-4">
                    {exp.location} • {exp.period}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: exp.color }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;