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
        electro: {
          primary: "#c084fc",
          secondary: "#e9d5ff",
        },
        cryo: {
          primary: "#22d3ee",
          secondary: "#a5f3fc",
        },
        dendro: {
          primary: "#22c55e",
          secondary: "#bbf7d0",
        },
        anemo: {
          primary: "#2dd4bf",
          secondary: "#99f6e4",
        },
        geo: {
          primary: "#78350f",
          secondary: "#b45309",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};

//bg-color?
