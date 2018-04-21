module.exports = {
  env: {
    node: true
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
    ecmaFeature: {
      modules: false,
    },
  },
  rules: {
    strict: [2, 'global'],
    "no-underscore-dangle": ['error', { allow: ['_id', '_message'] }],
  },
};