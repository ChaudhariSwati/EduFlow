/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: '#6C63FF',
        accent: '#FF6584',
        dark: '#0F0E17',
        surface: '#1A1929',
        card: '#221F35',
        muted: '#A7A5B8',
      }
    },
  },
  plugins: [],
}