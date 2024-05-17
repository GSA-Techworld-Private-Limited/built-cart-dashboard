/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(111.19deg, #FDC63A 5.29%, rgba(0, 0, 0, 0.96) 98.58%)",
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      backgroundColor: {
        primary: "#FDC63A",
        "light-gray": "#D9D9D9",
        dark: "#434444",
        light: "#F5F5F5",
      },
      fontSize: {
        "2xl": "24px",
        "3xl": "30px",
        "3xxl": "32px",
        "4xl": "36px",
      },
      colors: {
        primary: "#FDC63A",
        dark: "#434444",
      },
      boxShadow: {
        sm: "0px 2px 4px 0px #00000040",
        base: " 0px 2px 4px 0px #74747440",
        lg: " 0px 1px 4px 4px #96979754",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
