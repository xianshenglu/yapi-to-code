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
    Vue: true,
    chrome: true,
    axios: true,
    ClipboardJS: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'airbnb-base',
    // turn off ESLint default stylistic rules
    // https://github.com/prettier/eslint-config-prettier/blob/master/index.js
    'prettier',
  ],
  settings: {
    'import/extensions': ['off'],
  },
  // add your custom rules here
  rules: {
    //! avoid add stylistic rules
    'func-names': ['off'],
    // non stylistic rules which are conflict with airbnb-base
    'import/prefer-default-export': ['off'],
    'import/no-unresolved': ['off'],
    'import/extensions': ['off'],
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    // wait for support checkForEach
    'array-callback-return': [
      'error',
      { allowImplicit: true, checkForEach: true },
    ],
    // not compared with airbnb yet
    'require-atomic-updates': 'error',
    'no-implicit-coercion': 'error',
    'no-eq-null': 'error',
    'require-await': 'error',
  },
}
