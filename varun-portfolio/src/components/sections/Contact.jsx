import React from 'react';
import { socialLinks } from '../../data/skills';

const Contact = ({ sectionClass }) => {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-600" />

      <div
        className={`max-w-3xl mx-auto text-center relative z-10 ${sectionClass}`}
      >
        <span className="text-violet-200 font-medium">Let's Connect</span>
        <h2 className="text-4xl md:text-5xl font-black mt-2 text-white mb-6">
          Got Data Problems?{' '}
          <span className="text-violet-200">Let's Solve Them.</span>
        </h2>
        <p className="text-lg text-violet-100 mb-8">
          Currently looking for full time Data Engineer roles. I bring ETL
          expertise, cloud experience, and a passion for clean data.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a
            href={`mailto:${socialLinks.email}`}
            className="px-8 py-4 bg-white text-violet-600 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            📧 Send Email
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-violet-600 transition-all"
          >
            LinkedIn Profile
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white hover:text-violet-600 transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
