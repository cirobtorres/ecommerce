import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // 'media' / 'class'
  theme: {
    extend: {
      backgroundImage: {
        "header-linear-gradient":
          "linear-gradient(to right, var(--theme-07) 50%, var(--theme-06) 50%, var(--theme-06) 100%)",
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
        "border-light": "var(--border-light)",
        "transparent-side-bar-bg": "var(--transparent-side-bar-bg)",
      },
      boxShadow: {
        bright: "inset 0 0 100px 100px rgba(255, 255, 255, 0.2)",
      },
      width: {},
      maxWidth: {
        webpage: "var(--page-max-width)",
      },
      gridTemplateColumns: {
        "mega-menu": "repeat(6, minmax(200px, 1fr))",
      },
      gap: {
        "product-card-slider": "var(--product-card-slider-gap)",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
export default config;
