/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,tsx,ts,css,html}',
  './index.html'], 
  theme: {
    extend: {},
    fontFamily: {
      Titillium: ['Titillium Web', 'Helvetica', 'Arial', 'sans-serif'],
      Karla: ['Karla', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },

  plugins: [],
}
