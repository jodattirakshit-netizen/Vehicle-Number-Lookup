/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        asphalt: '#070B14',
        slateDark: '#10182A',
        neonBlue: '#00E5FF',
        electric: '#1E90FF',
        mint: '#7CFFCB'
      },
      backgroundImage: {
        'auto-grid': 'radial-gradient(circle at 1px 1px, rgba(0,229,255,0.14) 1px, transparent 0)'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,229,255,0.25), 0 12px 40px rgba(0,0,0,0.35)',
        neon: '0 10px 35px rgba(30,144,255,0.35)'
      },
      keyframes: {
        drive: {
          '0%': { transform: 'translateX(-18px)' },
          '50%': { transform: 'translateX(18px)' },
          '100%': { transform: 'translateX(-18px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.65 },
          '50%': { opacity: 1 }
        }
      },
      animation: {
        drive: 'drive 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
