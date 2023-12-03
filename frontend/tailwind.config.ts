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
        'theme-01-light-gray': '#e9eaed',
        'theme-02-light-gray': '#a8afb8',
        'theme-03-medium-gray': '#6a7481',
        'theme-04-medium-gray': '#353a41',
        'theme-05-dark-gray': '#25282d',
        'theme-06-light-blue': '#1dbaed',
        'theme-07-dark-blue': '#0d3e80',
        'theme-08-light-green': '#37a73b',
      },
      boxShadow: {
        'bright': 'inset 0 0 100px 100px rgba(255, 255, 255, 0.2)',
      },
    },
  },
}
export default config
