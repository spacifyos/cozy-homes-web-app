/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Halyard"],
      },
      fontSize: {
        xxs: "10px",
      },
      fontWeight: {
        normal: "500",
      },
      spacing: {
        125: "500px",
      },
      colors: {
        primary: "#005566",
        "primary-background": "#E0DDD8",
        secondary: "#B3A17D",
        "secondary-background": "#F5F0E8",
        available: "#03b78c",
        "available-light": "#DFFFEA",
        error: "#ff2e2e",
        "error-light": "#FFEEF3",
        tertiary: "#006677",
        warning: "#ff8a00",
        disable: "#CCCCCC",
        muted: "#6B6B6B",
        black: "#2c2c2c",
        white: "#FFFFFF",
        aqua: "#4DB3A0",
        "owner-background":
          "linear-gradient(88.34deg, #005566 33.59%, #f9a533 131.55%)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        DEFAULT: "#CCCCCC",
        primary: "#005566",
        warning: "#ff8a00",
        available: "#03b78c",
        tertiary: "#006677",
        disable: "#CCCCCC",
        white: "#FFFFFF",
        "primary-background": "#E0DDD8",
        "secondary-background": "#F5F0E8",
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".btn-primary-background": {
          "background-color": "#E0DDD8",
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#005566",
          "primary-background": "#E0DDD8",
          secondary: "#B3A17D",
          black: "#2c2c2c",
          disable: "#CCCCCC",
        },
      },
    ],
  },
};
