/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'institutional-white': '#F5F5F5',
        'institutional-navy': '#0B1E3B',
        'institutional-charcoal': '#1A1A1A',
        'institutional-teal': '#0d9488',
        'institutional-red': '#8B0000',
        'institutional-slate': '#94a3b8',
        'analytics-bg': '#0B0F19',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
