// About.jsx
import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '140K+', label: 'Records Processed' },
    { value: '50%', label: 'Manual Work Reduced' },
    { value: '25%', label: 'Data Accessibility Improved' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-16 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="gradient-text">About Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I'm a Data Engineer pursuing my MS in Information Systems at Northeastern University. 
              I specialize in building robust data pipelines, optimizing ETL processes, and 
              creating scalable data architectures.
            </p>
            <p className="text-slate-400 leading-relaxed">
              With hands-on experience at Mass General Brigham, LTI Mindtree, and Nismotek, 
              I've developed solutions that process hundreds of thousands of records while 
              significantly reducing manual intervention.
            </p>
          </div>
          
          {/* Right: Stats */}
          <div className={`grid grid-cols-3 gap-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="glass-card p-6 text-center hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;