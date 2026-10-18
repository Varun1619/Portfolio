/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Design tokens: one surface ramp, two text tones, one accent.
      colors: {
        canvas: {
          DEFAULT: '#000000',
          raised: '#161617',
          light: '#f5f5f7',
          white: '#ffffff',
        },
        ink: {
          DEFAULT: '#f5f5f7',
          muted: '#86868b',
          dark: '#1d1d1f',
          'dark-muted': '#6e6e73',
        },
        accent: {
          DEFAULT: '#00e87b',
          hover: '#33ed95',
          // Darker green for text on light panels (≥5:1 on white and #f5f5f7)
          dark: '#007a3d',
        },
        dark: {
          950: '#0a0a0f',
          900: '#0f0f1a',
          800: '#1a1a2e',
          700: '#252540',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }]
        'hero': ['clamp(3.5rem, 11vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'headline': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'subhead': ['clamp(1.25rem, 2.6vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        'eyebrow': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      maxWidth: {
        'content': '980px',
        'wide': '1260px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient': 'gradient-shift 3s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
