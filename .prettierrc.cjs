module.exports = {
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  singleQuote: true,
  importOrder: [
    '^nx$|^@nrwl/',
    '^@fabernovel',
    '^react|^next|^@nest',
    '<THIRD_PARTY_MODULES>',
    '^@Demo',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'importAssertions',
    'decorators-legacy',
  ],
};
