/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blue500: "hsl(220, 98%, 61%)",
        gray50: "hsl(0, 0%, 98%)",
        purple300: "hsl(234, 39%, 85%)",
        gray300: "hsl(233, 11%, 84%)",
        gray600: "hsl(236, 9%, 61%)",
        navy850: "hsl(235, 19%, 35%)",
        navy950: "hsl(235, 21%, 11%)",
        navy900: "hsl(235, 24%, 19%)",
        purple100: "hsl(236, 33%, 92%)",
        purple600: "hsl(235, 16%, 43%)",
        purple700: "hsl(233, 14%, 35%)",
        purple800: "hsl(237, 14%, 26%)",
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
      },
      fontSize: {
        body: "18px",
      },
      backgroundImage: {
        checkGradient:
          "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      },
    },
  },
  plugins: [],
};
