import React from 'react';
import { funFacts } from '../../data/experiences';
import { socialLinks } from '../../data/skills';
import SkillIcon from '../../assets/icons/SkillIcons';

const Hero = ({ loaded }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-6 pt-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <div
          className={`text-center lg:text-left transition-all duration-1000 ${
            loaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Open to Opportunities
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Varun
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-slate-500 font-light mb-2">
            Data Engineer & Pipeline Architect
          </p>
          <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0">
            I turn messy data into clean insights. Currently crafting data magic at{' '}
            <span className="text-violet-600 font-medium">Northeastern University</span> 🎓
          </p>

          {/* Fun Facts */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
            {funFacts.map((fact, i) => (
              <div key={i} className="group relative">
                <div className="px-3 py-2 bg-white rounded-full shadow-sm border border-slate-100 text-sm flex items-center gap-2 hover:border-violet-200 hover:shadow-md transition-all cursor-default">
                  <span>{fact.icon}</span>
                  <span className="text-slate-600">{fact.text}</span>
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {fact.detail}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center lg:justify-start">
            <a
              href="#playground"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-violet-300 hover:-translate-y-1 transition-all"
            >
              Try the Playground ↓
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border-2 border-slate-200 text-slate-600 font-medium hover:border-violet-300 transition-all"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        {/* Right Column: Animated Avatar */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="relative mx-auto w-80 h-80">
            {/* Rotating Borders */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-violet-200"
              style={{ animation: 'spin 30s linear infinite' }}
            />
            <div
              className="absolute inset-4 rounded-full border-2 border-dashed border-indigo-200"
              style={{ animation: 'spin 25s linear infinite reverse' }}
            />

            {/* Gradient Ring */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-400 via-indigo-400 to-purple-500" />

            {/* Avatar Center */}
            <div className="absolute inset-10 rounded-full bg-white shadow-2xl flex items-center justify-center">
              <div className="text-6xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                VS
              </div>
            </div>

            {/* Floating Skill Icons */}
            <div
              className="absolute -top-2 right-4 p-2 bg-white rounded-xl shadow-lg"
              style={{ animation: 'bounce 3s infinite' }}
            >
              <SkillIcon name="Python" size={28} />
            </div>
            <div
              className="absolute bottom-8 -left-4 p-2 bg-white rounded-xl shadow-lg"
              style={{ animation: 'bounce 3.5s infinite' }}
            >
              <SkillIcon name="Apache Spark" size={28} />
            </div>
            <div
              className="absolute top-1/2 -right-4 p-2 bg-white rounded-xl shadow-lg"
              style={{ animation: 'bounce 4s infinite' }}
            >
              <SkillIcon name="Kafka" size={28} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;