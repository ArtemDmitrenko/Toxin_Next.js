module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'string-quotes': 'single',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extend', 'mixin', 'include'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-empty-line-before': 'never',
  },
};
