import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'theme-01': '#171e26',
        'theme-02': '#2c3a4a',
        'theme-03': '#36495f',
        'border-01': '#1f3038',
        'border-02': '#475c68',
      },
      boxShadow: {
        'bright': 'inset 0 0 100px 100px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
export default config
