export default {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead'
      ]
    },
    cssnano: {
      preset: 'default'
    }
  }
}
