/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "h1": ["80px", { lineHeight: "50px", letterSpacing: "-0.03em" }]
      },
      colors: {
        'lightTeal': "#82d9d9",
        'darkTeal': "#6fbfbf",
        'greyBlue': "#393e59",
        'darkBlue': "#010326",
        'offWhite': "#f0f2f2",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
