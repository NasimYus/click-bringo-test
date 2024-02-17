/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': 0,
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/attributes-order': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/no-parsing-error': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
