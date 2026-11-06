/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          base: 'var(--color-bg-base)',
          surface: 'var(--color-bg-surface)',
          card: 'var(--color-bg-card)',
          border: 'var(--color-border)',
          divider: 'var(--color-divider)',
          text: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          accent: 'var(--color-accent)',
          'accent-light': 'var(--color-accent-light)',
          badge: 'var(--color-badge-bg)',
          'badge-text': 'var(--color-badge-text)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
        editorial: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Instrument Serif', 'Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'float': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 25px -5px var(--color-accent-glow)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
    },
  },
  plugins: [],
};

