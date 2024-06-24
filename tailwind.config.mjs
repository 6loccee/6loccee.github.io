/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'background-color': 'hsl(var(--background-color))',
        'primary-color': 'hsl(var(--text-color))',
        'secondary-color': 'hsl(var(--footer-color))',
        'underline-color': 'hsl(var(--underline-color))',
        'underline-hover-color': 'hsl(var(--footer-hover-color))',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
