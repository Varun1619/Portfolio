// Experience.jsx
import { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    role: 'Data Analyst Co-op',
    company: 'Mass General Brigham',
    period: 'Jan 2024 - Present',
    highlights: ['Processed 140,000+ records', 'Built automated reporting pipelines'],
  },
  {
    role: 'Software Engineer',
    company: 'LTI Mindtree',
    period: '2021 - 2023',
    highlights: ['Reduced manual intervention by 50%', 'Developed data integration solutions'],
  },
  {
    role: 'Data Engineer Intern',
    company: 'Nismotek',
    period: '2020 - 2021',
    highlights: ['Improved data accessibility by 25%', 'Optimized database queries'],
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className="relative py-16 px-4 bg-slate-950 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-slate-950 to-slate-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-600 via-purple-600 to-indigo-600" />
          
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col md:flex-row gap-4 mb-8 transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Timeline Dot with Glow */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-violet-500 rounded-full -translate-x-1/2 mt-6 ring-4 ring-slate-950 z-10 shadow-lg shadow-violet-500/50" />
              
              {/* Card */}
              <div className={`ml-12 md:ml-0 ${idx % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'} md:w-1/2`}>
                <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10">
                  <span className="text-violet-400 text-sm font-medium">{exp.period}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                  <p className="text-slate-400 mb-3">{exp.company}</p>
                  <ul className="space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-violet-400 mt-1">▹</span>
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