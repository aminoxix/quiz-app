/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "360px",
      sm: "412px",
      md: "640px",
      lg: "810px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        brand: "#3B46AA",
        accent: "#73D5A2",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
