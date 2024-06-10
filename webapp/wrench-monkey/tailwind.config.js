/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Nico Moji'],
      },
      colors: {
        "primary" : "#000",
        "background" : "#00001B",
        "realBack" : "#000010",
        "blue" : "#3575E2",
        "button" : "#242438",
        "box" : "#D9D9D9",
      }
    },
  },
  plugins: [],
}

