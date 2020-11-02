module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  extends: ['prestashop', 'plugin:vue/strongly-recommended', 'prettier', 'prettier/@typescript-eslint', 'prettier/vue'],
  rules: {
    'no-unused-labels': 'off',
    semi: 1,
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
};
