/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This is the clean body font
        sans: ['Inter', 'sans-serif'],
        // This is the premium, high-impact heading font
        display: ['Bricolage Grotesque', 'sans-serif'],
      },
    },
  },
  plugins: [],
}