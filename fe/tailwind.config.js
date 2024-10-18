/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // Sử dụng Open Sans cho font sans
        rubik: ['Rubik', 'sans-serif'], // Sử dụng Rubik cho font rubik
      }
    },
  },
  plugins: [],
}