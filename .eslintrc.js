module.exports = {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: [
    'airbnb-base',
  ],

  plugins: [
    'import',
    'node',
    'promise',
  ],

  // Custom rules
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [ 2, "never" ],
  }
}