module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'indent': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    'semi': 'off',
    'space-in-parens': 'off',
    'arrow-parens': 'off',
    'no-console': 'off',
    'quotes': 'off',
    'no-multiple-empty-lines': 'off',
    'no-trailing-spaces': 'off',
    'object-shorthand': 'off',
    'eol-last': 'off',
    'no-undef': 'off',
    'no-labels': 'off',
    'no-unused-expressions': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-indent': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'prefer-const': 'off',
    'no-irregular-whitespace': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'comma-dangle': 'off',
    'no-var': 'off',
    'vue/singleline-html-element-content-newline' : 'off',
    'vue/require-default-prop': 'off',
    'no-multi-spaces': 'off'
  }
}
