import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-outfit)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        'type-xs': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.015em' }],
        'type-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'type-base': ['1rem', { lineHeight: '1.5', letterSpacing: '0em' }],
        'type-lg': ['1.2rem', { lineHeight: '1.4', letterSpacing: '-0.005em' }],
        'type-xl': ['1.44rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'type-2xl': ['1.728rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'type-3xl': ['2.074rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'type-4xl': ['2.488rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
};

export default config;
