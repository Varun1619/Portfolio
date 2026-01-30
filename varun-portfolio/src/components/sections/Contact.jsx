// Contact.jsx
const Contact = () => {
  return (
    <section id="contact" className="relative py-16 px-4 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-slate-950 to-slate-950" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          <span className="gradient-text">Let's Connect</span>
        </h2>
        <p className="text-slate-400 mb-8">
          I'm always open to discussing data engineering opportunities and interesting projects
        </p>

        <a href="mailto:varun1619singh@gmail.com" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30">
          <span>Say Hello</span>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        <div className="flex justify-center gap-8 mt-10">
          <a href="https://linkedin.com/in/varunsinghtech" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors duration-300">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl transition-all duration-300 group-hover:border-violet-500/40 group-hover:bg-slate-900/80 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-violet-500/10">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <span className="text-sm font-medium">LinkedIn</span>
          </a>

          <a href="https://github.com/Varun1619" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors duration-300">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl transition-all duration-300 group-hover:border-violet-500/40 group-hover:bg-slate-900/80 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-violet-500/10">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <span className="text-sm font-medium">GitHub</span>
          </a>

          <a href="mailto:varun1619singh@gmail.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors duration-300">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl transition-all duration-300 group-hover:border-violet-500/40 group-hover:bg-slate-900/80 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-violet-500/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Email</span>
          </a>
        </div>

        <p className="mt-16 text-slate-600 text-sm">Built with React & Tailwind CSS</p>
      </div>
    </section>
  );
};

export default Contact;