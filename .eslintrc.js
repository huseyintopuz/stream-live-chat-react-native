module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  env: {
    'react-native/react-native': true,
    browser: true, // Add browser environment to recognize 'SVGElement'
    es6: true,
  },
  rules: {
    'react/prop-types': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-undef': 'error',
    'no-dupe-else-if': 0,
    '@typescript-eslint/no-require-imports': 0,
  },
};
