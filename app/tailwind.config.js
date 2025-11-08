/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: "#4a9eff",
        input:"#f0f6fa",
        secondary: "#a8d5ba",
        muted: "#e8f0f5",
      },  
    },
    screens: {
      xs: "360px", 
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [],
};
