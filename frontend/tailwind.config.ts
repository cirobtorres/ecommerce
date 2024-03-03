import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // "media" / "class"
  theme: {
    extend: {
      backgroundImage: {
        "header-linear-gradient":
          "linear-gradient(to right, var(--theme-07) 50%, var(--theme-06) 50%, var(--theme-06) 100%)",
        "category-carousel-gradient":
          "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        "product-left-button-carousel-gradient":
          "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        "selection-carousel-images-right-gradient":
          "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
      },
      backgroundColor: {},
      colors: {
        "theme-01": "var(--theme-01)",
        "theme-02": "var(--theme-02)",
        "theme-03": "var(--theme-03)",
        "theme-04": "var(--theme-04)",
        "theme-05": "var(--theme-05)",
        "theme-06": "var(--theme-06)",
        "theme-07": "var(--theme-07)",
        "theme-08": "var(--theme-08)",
        "theme-09": "var(--theme-09)",
        "light-gray": "var(--light-gray)",
        "very-light-gray": "var(--very-light-gray)",
        "side-bar": "var(--side-bar)",
        "side-bar-transparent": "var(--side-bar-transparent)",
      },
      boxShadow: {
        bright: "inset 0 0 100px 100px rgba(255, 255, 255, 0.2)",
        dark: "inset 0 0 100px 100px rgba(0, 0, 0, 0.2)",
        darker: "inset 0 0 100px 100px rgba(0, 0, 0, 0.5)",
        generic: "0 0 10px 3px rgba(40, 41, 61, 0.08)",
        "carousel-button": "0 0 10px 3px rgba(40, 41, 61, 0.08)",
      },
      width: {},
      maxWidth: {
        "login-form": "var(--login-form-max-width)",
        "register-form": "var(--register-form-max-width)",
        "flash-offer": "var(--flash-offer-max-width)",
        webpage: "var(--page-max-width)",
        userpage: "var(--userpage-max-width)",
        card: "var(--product-card-max-width)",
        "product-card-slider": "var(--product-card-slider-max-width)",
        category: "var(--category-max-width)",
        "category-carousel": "var(--category-carousel-max-width)",
      },
      minWidth: {
        "login-form": "var(--login-form-min-width)",
        "register-form": "var(--register-form-min-width)",
        card: "var(--product-card-min-width)",
        "product-card-slider": "var(--product-card-slider-min-width)",
        category: "var(--category-card-min-width)",
        "category-carousel": "var(--category-card-min-width)",
      },
      height: {
        card: "var(--product-card-height)",
        category: "var(--category-card-height)",
      },
      padding: {
        "product-card": "var(--product-card-padding)",
        "product-card-slider": "var(--product-card-slider-padding)",
        "category-card-slider": "var(--category-card-slider-padding)",
        "category-lateral-carousel": "var(--category-lateral-carousel-padding)",
      },
      gridTemplateColumns: {
        "mega-menu": "repeat(6, minmax(200px, 1fr))",
      },
      gridTemplateRows: {},
      gap: {
        "product-card-slider": "var(--product-card-slider-gap)",
        "category-card-slider": "var(--category-card-slider-gap)",
      },
      animation: {
        loading: "loading 1.5s ease-in-out infinite",
        "bounce-once": "bounce-once 0.15s linear",
      },
      keyframes: {
        loading: {
          "0%": {
            "stroke-dasharray": "1, 200",
            "stroke-dashoffset": "0",
            stroke: "var(--theme-01)",
          },
          "50%": {
            "stroke-dasharray": "89, 200",
            "stroke-dashoffset": "-35px",
            stroke: "var(--theme-01)",
          },
          "100%": {
            "stroke-dasharray": "89, 200",
            "stroke-dashoffset": "-124px",
            stroke: "var(--theme-01)",
          },
        },
        "bounce-once": {
          "0%, 80%": {
            transform: "rotate(45deg) translateY(30%) translateX(65%)",
          },
          "80%, 90%": {
            transform: "rotate(45deg) translateY(-20%) translateX(-45%)",
          },
          "90%, 100%": {
            transform: "rotate(45deg) translateY(0%) translateX(0%)",
          },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
export default config;
