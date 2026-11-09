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
      colors: {
        carvex: {
          dark: '#0A0D14',
          surface: '#111622',
          card: '#151C2C',
          border: '#1E293B',
          hover: '#1E293B',
          cyan: '#00A2E8',
          'cyan-hover': '#0090D0',
          'cyan-glow': 'rgba(0, 162, 232, 0.25)',
          red: '#E50914',
          'red-hover': '#CC0812',
          muted: '#94A3B8',
          gold: '#F59E0B',
        },
      },
      fontFamily: {
        arabic: ['var(--font-readex)', 'sans-serif'],
        sans: ['var(--font-outfit)', 'var(--font-readex)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
