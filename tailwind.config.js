/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FCF9F2',
        sand: '#C5B08A',
        'sand-line': '#B9A47C',
        clay: { DEFAULT: '#B5521F', hover: '#9C4417', soft: '#F5E7DC' },
        ink: { DEFAULT: '#2A1E12', soft: '#6B5F52' },
        line: '#E8E0D3',
      },
      borderRadius: {
        control: '4px',
        card: '6px',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
