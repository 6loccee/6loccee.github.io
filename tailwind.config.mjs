/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#121212',
        blue: '#10a2f5',
        green: '#24d05a',
        red: '#e4002b',
        gray: '#1d1d1d',
        darkGray: '#171717',
      },
      fontFamily: {
        inter: ['Inter'],
      },
    },
  },
  plugins: [],
}
