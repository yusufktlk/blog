/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 0 40px red;',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      }
      
    },
  },
  plugins: [],
}