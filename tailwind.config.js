/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        'sub':'0.625rem',
        'email':'4px',

      },

    },
  },
  plugins: [],
}

