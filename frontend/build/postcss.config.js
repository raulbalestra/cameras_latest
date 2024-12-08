module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a56db',
          dark: '#1a3d8f',
        },
        secondary: {
          DEFAULT: '#ff6b6b',
        },
      },
    },
  },
  plugins: [],
};
