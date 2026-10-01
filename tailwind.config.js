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
        party: {
          dark: '#0B0914',
          card: '#161329',
          border: '#282347',
          neonPink: '#FF2E93',
          neonCyan: '#00F0FF',
          neonAmber: '#FFB800',
          neonPurple: '#A855F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 25px -5px rgba(255, 46, 147, 0.5)',
        'neon-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.5)',
        'neon-purple': '0 0 25px -5px rgba(168, 85, 247, 0.5)',
        'card-depth': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
