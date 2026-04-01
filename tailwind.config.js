/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: '#F2EDE4',
        'sand-dark': '#E8E0D4',
        driftwood: '#2C2416',
        'driftwood-mid': '#6B5D4F',
        ocean: '#1B6CA8',
        'ocean-dark': '#144F7A',
        seafoam: '#E8F4F0',
        coral: '#E8654A',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
