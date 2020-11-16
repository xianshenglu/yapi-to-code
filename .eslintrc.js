module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  globals: {
    chrome: true,
  },
  extends: ['@xianshenglu/eslint-config/javascript-vue'],
  overrides: [
    {
      files: './build/**/*',
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
