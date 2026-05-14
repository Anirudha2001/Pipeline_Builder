/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 8px 30px rgba(2, 6, 23, 0.08)',
      },
    },
  },
  plugins: [],
};
