# [1.0.0](https://github.com/xianshenglu/yapi-to-code/compare/v0.1...v1.0.0) (2020-11-23)

### Bug Fixes

- **inject:** hardcoded API_FORMATTER_STR and RESPONSE_TO_TABLE_CONF_STR to prevent babel compiling ([a1bfc2b](https://github.com/xianshenglu/yapi-to-code/commit/a1bfc2b9a7680eb78e88e09a82334a7a649c0424))
- **inject:** remove useless config set ([5325432](https://github.com/xianshenglu/yapi-to-code/commit/5325432bec0d424b4885068f7cc3cc4b91c00640))
- **manifest:** correct icon path ([5f9ef72](https://github.com/xianshenglu/yapi-to-code/commit/5f9ef725f102487dbae06572988b3bf4f97d5668))
- **options:** fix missing Message in element-ui ([250e8a6](https://github.com/xianshenglu/yapi-to-code/commit/250e8a6fb8d2478ff1aaf42bd74a2d26294a986b))
- correct publish zip files ([96b9d58](https://github.com/xianshenglu/yapi-to-code/commit/96b9d582165cc51ff7b0976cb604d032dedc6d75))
- remove useless function and permissions ([ecd3e05](https://github.com/xianshenglu/yapi-to-code/commit/ecd3e053118848dc124d235fb57e813e0875d04b))

### Features

- add support for customizing Table code generation ([830cd38](https://github.com/xianshenglu/yapi-to-code/commit/830cd38a80385a02981c717595c7851baa113087))
- change button and form-item label ([6baca55](https://github.com/xianshenglu/yapi-to-code/commit/6baca5532e6b98033de4e41080190046bf456cde))
- **inject:** add more support for apiFormatterStr ([9c05aba](https://github.com/xianshenglu/yapi-to-code/commit/9c05aba865902ebcd1a02d81a0d18007b1a92ea6))
- **options:** add code editor for apiFormatterStr ([96f2ab4](https://github.com/xianshenglu/yapi-to-code/commit/96f2ab44763dd7c386b21d72f4003ba9ec3ca5f6))
- add apiCodeGen and options page ([a00ea2f](https://github.com/xianshenglu/yapi-to-code/commit/a00ea2f7776a00a1c54b190e054382369f2cf5d0))
- change custom API formatter ([c5f6cab](https://github.com/xianshenglu/yapi-to-code/commit/c5f6caba86d291ae041c4e5de6f9e6ce81dd6f75))
- **options:** add onReset function ([43ace7f](https://github.com/xianshenglu/yapi-to-code/commit/43ace7f79af7ff62b594184e4bf730d2144609a3))
- **options:** add tip to tell users to reload ([1beca4b](https://github.com/xianshenglu/yapi-to-code/commit/1beca4b2ea28239f76174c07d253d7807db97064))
- **request:** add interceptors ([7e3d03a](https://github.com/xianshenglu/yapi-to-code/commit/7e3d03a4e9d8d6bb9bc5379c0ac07774f5086d9c))
- let options page formData use inject page's default value ([e36d023](https://github.com/xianshenglu/yapi-to-code/commit/e36d02340ad02b55fb6a20e078efbf295d3ac713))

### Performance Improvements

- **options:** import element-ui on demand and add babel support ([ce308f4](https://github.com/xianshenglu/yapi-to-code/commit/ce308f4814ed3bc89dc5b89a0b3141b95fc39e78))
- **options:** minimize monaco-editor bundle size ([795d1fe](https://github.com/xianshenglu/yapi-to-code/commit/795d1fe51c71db789d7fe11eaf30728eb3fb6b96))

### BREAKING CHANGES

- 1. change custom API formatter to a valid function string, the old function body style would not work

1. remove global variable hyphenToPascal
