# Varun Singh | Data Engineer Portfolio

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

A modern portfolio website featuring an interactive ETL Pipeline Simulator that demonstrates real data engineering concepts.

## Live Demo

**[varunsingh.dev](https://varunsingh.dev)**

## Features

**Interactive ETL Pipeline Simulator**  
Watch data flow through Extract, Transform, and Load stages with real time visualization. See messy data get cleaned, validated, and loaded into a simulated warehouse.

**Modern Design**  
Clean violet/indigo theme with smooth animations, fully responsive across all devices.

**Sections**
- Hero with animated skill icons
- About with stats and skill badges
- Interactive Data Playground
- Work Experience timeline
- Contact with social links

## Tech Stack

React 18 • Tailwind CSS • Vite

## Quick Start

```bash
# Clone and install
git clone https://github.com/Varun1619/varun-portfolio.git
cd varun-portfolio
npm install

# Run locally
npm run dev
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## ETL Pipeline Demo

The simulator showcases these transformations:

| Raw Data | Cleaned Data |
|----------|--------------|
| `"  John DOE  "` | `"John Doe"` |
| `"JOHN@EMAIL.COM"` | `"john@email.com"` |
| `"50000"` | `"50,000"` |
| `"active"` | `"✅ Active"` |

Invalid records (bad emails) are filtered out during the Load stage.

## Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # Hero, About, Experience, Contact
│   └── playground/    # ETL Simulator components
├── hooks/             # Custom React hooks
├── data/              # Static content (experiences, skills)
└── utils/             # Data transformation functions
```

## Customization

Update your info in `src/data/`:
- `experiences.js` for work history
- `skills.js` for technical skills
- `sampleData.js` for ETL demo data

## Deploy

```bash
npm run build
```

Works with Vercel, Netlify, or GitHub Pages.

## Contact

**Varun Singh** | Data Engineer

📧 [varun1619singh@gmail.com](mailto:varun1619singh@gmail.com)  
💼 [LinkedIn](https://linkedin.com/in/varunsinghtech)  
🐙 [GitHub](https://github.com/Varun1619)

---

Built with ☕ and React

---
