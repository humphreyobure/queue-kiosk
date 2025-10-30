/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        success: '#10b981',
      },
      fontSize: {
        '8xl': '6rem',
        '9xl': '8rem',
      }
    },
  },
  plugins: [],
}