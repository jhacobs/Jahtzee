module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'page': '30% 70%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
