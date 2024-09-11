import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "refrigel-blue-primary": "#1d4f91",
        "refrigel-green-primary": "#16a34a",
        "refrigel-green-secondary": "#22c55e",
        "disabled-primary": "#969696",
        "disabled-secondary": "#7a7a7a",
      },
      backgroundImage: {
        "auth-header": "radial-gradient(circle, #41689c 0%, #34619c 100%)",
      },
      boxShadow: {
        "user-section-submenu": "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
      },
    },
  },
  plugins: [],
};
export default config;
