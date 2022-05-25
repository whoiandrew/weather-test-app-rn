module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.yaml',
      options: {
        singleQuote: false,
      },
    },
  ],
};
