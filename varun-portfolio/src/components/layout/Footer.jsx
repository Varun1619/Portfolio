import React from 'react';
import { skills } from '../../data/skills';
import SkillIcon from '../../assets/icons/SkillIcons';

const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 text-sm">
        <div className="text-xl font-black text-white">VS</div>
        <p className="text-slate-400">Built with React & lots of ☕ © 2025</p>
        <div className="flex gap-4">
          {skills.slice(0, 4).map((skill) => (
            <SkillIcon key={skill.name} name={skill.name} size={20} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;