import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        kin: {
          green: {
            DEFAULT: '#2F4A32',
            light: '#3E5C42',
            dark: '#1F3322',
            vibrant: '#008751',
          },
          gold: {
            DEFAULT: '#C4A35A',
            light: '#D4B56E',
            dark: '#A6863F',
          },
          crimson: {
            DEFAULT: '#7A3A36',
            light: '#8F4A45',
            dark: '#5E2C29',
          },
          coffee: {
            DEFAULT: '#1C1612',
            subtle: '#261F1A',
            muted: '#3A312A',
            dark: '#120C0A',
            card: '#1C130E',
            elevated: '#261A14',
            border: '#3D2A20',
          },
          parchment: {
            DEFAULT: '#F6F1E8',
            light: '#FBF8F2',
            dark: '#EBE4D6',
          },
          ink: '#1C1612',
          mist: '#8A8176',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        geez: ['var(--font-geez)', 'var(--font-sans)', 'sans-serif'],
      },
      letterSpacing: {
        mark: '0.22em',
      },
      boxShadow: {
        kin: '0 24px 50px -28px rgb(28 22 18 / 0.35)',
        coffee: '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        grain:
          'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
