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
        mixify: {
          bg: '#08090E',
          surface: '#0F111A',
          card: '#141724',
          cardHover: '#1B2032',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.18)',
          emerald: '#00F5A0',
          cyan: '#00D9F5',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          pink: '#EC4899',
          muted: '#8F96AB',
          subtle: '#5C6279',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 24px -4px rgba(0, 245, 160, 0.35)',
        'glow-cyan': '0 0 24px -4px rgba(0, 217, 245, 0.35)',
        'studio-card': '0 12px 32px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      keyframes: {
        wavePulse: {
          '0%, 100%': { height: '6px' },
          '50%': { height: '22px' },
        },
        aurora: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1) rotate(10deg)', opacity: '0.45' },
        }
      },
      animation: {
        'wave-pulse-1': 'wavePulse 1.1s ease-in-out infinite',
        'wave-pulse-2': 'wavePulse 0.9s ease-in-out infinite 0.2s',
        'wave-pulse-3': 'wavePulse 1.3s ease-in-out infinite 0.4s',
        'wave-pulse-4': 'wavePulse 1.0s ease-in-out infinite 0.1s',
        'aurora': 'aurora 14s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
