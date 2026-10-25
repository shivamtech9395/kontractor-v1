/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyline: {
          blue: '#2563EB',
          teal: '#14B8A6',
          dark: '#0F172A',
          subtle: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
      },
      borderRadius: {
        '24': '24px',
        '32': '32px',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(37, 99, 235, 0.07), 0 0 15px 0 rgba(0, 0, 0, 0.03)',
        'luxury-hover': '0 30px 60px -12px rgba(37, 99, 235, 0.12), 0 18px 36px -18px rgba(20, 184, 166, 0.12)',
        'pop': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(226, 232, 240, 0.8)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
