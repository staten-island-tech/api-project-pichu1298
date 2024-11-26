/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pyro: {
          primary: "#ef4444", // e.g., bg-pyro-primary
          secondary: "#fecaca", // e.g., text-pyro-secondary
        },
        hydro: {
          primary: "#3b82f6",
          secondary: "#bae6fd",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};

//bg-color?
