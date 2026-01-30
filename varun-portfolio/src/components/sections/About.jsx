import React from 'react';
import { stats } from '../../data/experiences';
import { skills } from '../../data/skills';
import SkillIcon from '../../assets/icons/SkillIcons';

const About = ({ sectionClass }) => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${sectionClass}`}>
          <span className="text-violet-600 font-medium">About Me</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2">
            The{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Data Nerd
            </span>{' '}
            Behind the Code
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={sectionClass}>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              I'm not your typical data engineer. Sure, I build ETL pipelines
              and optimize queries, but I also believe data should tell a story.
              At{' '}
              <span className="font-semibold text-violet-600">
                Mass General Brigham
              </span>
              , I processed 140K+ medical records. At{' '}
              <span className="font-semibold text-violet-600">LTI Mindtree</span>
              , I trained 50+ engineers on Kafka.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              When I'm not wrangling data, you'll find me exploring new tech,
              gaming, or hunting for the perfect cup of coffee ☕
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.slice(0, 6).map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-violet-200 transition-all"
                >
                  <SkillIcon name={skill.name} size={20} />
                  <span className="text-sm font-medium text-slate-700">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-4 ${sectionClass}`}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <span className="text-3xl">{stat.icon}</span>
                <div
                  className={`text-3xl font-black mt-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.num}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;