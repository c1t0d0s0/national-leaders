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
        edo: {
          50: '#fbf8f1',
          100: '#f5efdf',
          200: '#ebdcb9',
          300: '#dfc28c',
          400: '#d2a460',
          500: '#b8853b',
          600: '#9d682e',
          700: '#7f4e27',
          800: '#684025',
          900: '#563522',
        },
        imperial: {
          50: '#fdf3f3',
          100: '#fce4e4',
          200: '#facece',
          300: '#f4a9a9',
          400: '#ea7575',
          500: '#dc4646',
          600: '#c52e2e',
          700: '#a52424',
          800: '#892222',
          900: '#722222',
        },
        usnavy: {
          50: '#f0f4fb',
          100: '#e1e9f6',
          200: '#c7d6ef',
          300: '#9ebbe4',
          400: '#6f9ad5',
          500: '#4c7cc4',
          600: '#3861a9',
          700: '#2f4f8b',
          800: '#2b4473',
          900: '#1b2d50',
          950: '#121d34',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Hiragino Sans"', '"Meiryo"', 'sans-serif'],
        gothic: ['"Noto Sans JP"', '"Inter"', 'sans-serif'],
        serif: ['"Noto Sans JP"', 'sans-serif'], // Fallback safely to gothic
      }
    },
  },
  plugins: [],
}
