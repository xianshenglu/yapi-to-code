module.exports = (api) => {
  // eslint-disable-next-line
  const isTest = api.env('test')
  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-typescript'],
      ],
    }
  }
  return {
    presets: [
      ['babel-preset-typescript-vue'],
      ['@babel/preset-typescript'],
      [
        '@babel/preset-env',
        { useBuiltIns: 'usage', modules: false, corejs: 3 },
      ],
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
}
