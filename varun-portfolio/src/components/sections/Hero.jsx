// Hero.jsx
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden py-12 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/20 via-transparent to-transparent" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-500" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Greeting */}
        <p className={`text-violet-400 text-lg mb-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          👋 Hello, I'm
        </p>
        
        {/* Name */}
        <h1 className={`text-5xl md:text-7xl font-bold mb-4 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
            Varun Singh
          </span>
        </h1>
        
        {/* Title */}
        <h2 className={`text-2xl md:text-3xl text-slate-300 mb-6 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Data Engineer
        </h2>
        
        {/* Description */}
        <p className={`text-slate-400 text-lg max-w-2xl mx-auto mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Building scalable data pipelines and transforming raw data into actionable insights
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <a 
            href="#playground" 
            className="group relative px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
          >
            <span className="relative z-10">View ETL Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 border border-slate-600 rounded-full font-medium text-slate-300 hover:border-violet-500 hover:text-violet-400 transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`mt-16 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-violet-500 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;