module.exports = {
  presets: [
    ['babel-preset-typescript-vue'],
    ['@babel/preset-typescript'],
    ['@babel/preset-env', { useBuiltIns: 'usage', modules: false, corejs: 3 }],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
