/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      pyro: "#b91c1c",
      dendro: "#059669",
      cryo: "#cffafe",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
