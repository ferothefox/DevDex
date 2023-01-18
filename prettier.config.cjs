module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.cjs',
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  arrowParens: 'avoid',
  proseWrap: 'always',
  singleAttributePerLine: true,
}
