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
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground, #ffffff)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
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
