/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c2dcfd',
          300: '#94c2fa',
          400: '#609ef6',
          500: '#3b82f6', // Standard Blue
          600: '#1d5ed8', // Brand Blue (Lumixor) - HSL(215, 90%, 52%) approx
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#fbf7ff',
          100: '#f5eeff',
          200: '#ecdaff',
          300: '#deb9ff',
          400: '#cc8dff',
          500: '#b860fb',
          600: '#a33dec', // Creative Purple
          700: '#8e26cf',
          800: '#7521a9',
          900: '#611c8a',
        },
        surface: '#f8fafc', // Slate 50
      },
    },
  },
  plugins: [],
}
