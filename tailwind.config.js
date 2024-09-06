/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-landscape': "url('/background/light-landscape.webp')",
        'dark-landscape': "url('/background/dark-landscape.webp')",
        'light-portrait': "url('/background/light-portrait.webp')",
        'dark-portrait': "url('/background/dark-portrait.webp')",
      },
    },
  },
  plugins: [],
  darkMode : 'class',
}