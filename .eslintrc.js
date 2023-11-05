module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['*precompiled.js'],
  rules: {
    'import/no-cycle': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': 'off',
    'object-curly-spacing': 'off',
    'no-undef': 'off',
    'guard-for-in': 'off',
  },
};
