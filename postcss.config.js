module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'autoprefixer': {
      browsers: ['last 2 versions'],
    },
    'cssnano': {}
  }
}
