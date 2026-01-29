import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts}',
    './components/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}',
    './layouts/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        dm: {
          primary: 'var(--dm-color-primary)',
          'primary-hover': 'var(--dm-color-primary-hover)',
          'primary-light': 'var(--dm-color-primary-light)',
          secondary: 'var(--dm-color-secondary)',
          background: 'var(--dm-color-background)',
          surface: 'var(--dm-color-surface)',
          'surface-elevated': 'var(--dm-color-surface-elevated)',
          border: 'var(--dm-color-border)',
          text: 'var(--dm-color-text)',
          'text-secondary': 'var(--dm-color-text-secondary)',
          'text-muted': 'var(--dm-color-text-muted)',
          success: 'var(--dm-color-success)',
          warning: 'var(--dm-color-warning)',
          error: 'var(--dm-color-error)',
          info: 'var(--dm-color-info)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        'dm-xs': 'var(--dm-spacing-xs)',
        'dm-sm': 'var(--dm-spacing-sm)',
        'dm-md': 'var(--dm-spacing-md)',
        'dm-lg': 'var(--dm-spacing-lg)',
        'dm-xl': 'var(--dm-spacing-xl)',
      },
      borderRadius: {
        'dm-sm': 'var(--dm-radius-sm)',
        'dm-md': 'var(--dm-radius-md)',
        'dm-lg': 'var(--dm-radius-lg)',
      },
      boxShadow: {
        'dm-sm': 'var(--dm-shadow-sm)',
        'dm-md': 'var(--dm-shadow-md)',
        'dm-lg': 'var(--dm-shadow-lg)',
      },
    },
  },
  plugins: [],
} satisfies Config
